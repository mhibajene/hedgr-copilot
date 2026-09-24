import assert from "node:assert/strict";
import { register } from "node:module";
import test from "node:test";
import { exportJWK, generateKeyPair, SignJWT } from "jose";

// Node cannot import Cloudflare's runtime entrypoint. This loader supplies only
// its base class; the real OAuth provider, token store, and Worker run unchanged.
register(`data:text/javascript,${encodeURIComponent(`
  export async function resolve(specifier, context, nextResolve) {
    if (specifier === "cloudflare:workers") return {
      url: "data:text/javascript,export class WorkerEntrypoint {}", shortCircuit: true
    };
    return nextResolve(specifier, context);
  }
`)}`);
const { default: worker } = await import("../src/index.js");

const ORIGIN = "https://bridge.example.test";
const ACCESS = "https://access.example.test";
const CALLBACK = `${ORIGIN}/callback`;
const CHATGPT_CALLBACK = "https://chatgpt.com/connector_platform_oauth_redirect";
const kv = () => {
  const values = new Map();
  return {
    values,
    async get(key, options) { const value = values.get(key); return value === undefined ? null : options?.type === "json" ? JSON.parse(value) : value; },
    async put(key, value) { values.set(key, value); },
    async delete(key) { values.delete(key); },
    async list({ prefix = "" } = {}) { return { keys: [...values.keys()].filter((name) => name.startsWith(prefix)).map((name) => ({ name })), list_complete: true }; }
  };
};
function environment() {
  return {
    MCP_RESOURCE: `${ORIGIN}/mcp`, MCP_ALLOWED_SUBJECT: "founder-subject",
    ACCESS_CLIENT_ID: "access-client", ACCESS_CLIENT_SECRET: "fixture-only-secret",
    ACCESS_ISSUER: ACCESS, ACCESS_AUTHORIZATION_URL: `${ACCESS}/authorize`,
    ACCESS_TOKEN_URL: `${ACCESS}/token`, ACCESS_JWKS_URL: `${ACCESS}/jwks`,
    OAUTH_KV: kv()
  };
}
const ctx = { waitUntil() {}, passThroughOnException() {} };
async function send(path, env, { method = "GET", headers = {}, body } = {}) {
  return worker.fetch(new Request(`${ORIGIN}${path}`, { method, headers, body }), env, ctx);
}
async function registerClient(env, redirect = CHATGPT_CALLBACK) {
  const response = await send("/oauth/register", env, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: "fixture", redirect_uris: [redirect], token_endpoint_auth_method: "none" })
  });
  return { response, body: await response.json() };
}
function oauthQuery(clientId, challenge) {
  const query = new URLSearchParams({ response_type: "code", client_id: clientId,
    redirect_uri: CHATGPT_CALLBACK, scope: "evidence:read", state: "chatgpt-state",
    resource: `${ORIGIN}/mcp`, code_challenge: challenge, code_challenge_method: "S256" });
  return `/authorize?${query}`;
}
async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Buffer.from(digest).toString("base64url");
}
function ticketFrom(html) { return /name="ticket" value="([a-f0-9]{64})"/.exec(html)?.[1]; }
function cookieFrom(response) { return response.headers.get("set-cookie")?.split(";")[0]; }

test("OAuth discovery, resource metadata, DCR policy, and missing configuration", async () => {
  const env = environment();
  const missing = await send("/mcp", { ...env, ACCESS_CLIENT_SECRET: undefined }, { method: "POST" });
  assert.equal(missing.status, 503);
  const noKv = await send("/mcp", { ...env, OAUTH_KV: undefined }, { method: "POST" });
  assert.equal(noKv.status, 503);
  const metadata = await send("/.well-known/oauth-protected-resource/mcp", env);
  assert.equal(metadata.status, 200);
  const resource = await metadata.json();
  assert.equal(resource.resource, `${ORIGIN}/mcp`);
  assert.deepEqual(resource.scopes_supported, ["evidence:read"]);
  const discovery = await send("/.well-known/oauth-authorization-server", env);
  assert.equal(discovery.status, 200);
  const auth = await discovery.json();
  assert.equal(auth.issuer, ORIGIN);
  assert.equal(auth.authorization_endpoint, `${ORIGIN}/authorize`);
  assert.equal(auth.token_endpoint, `${ORIGIN}/oauth/token`);
  assert.equal(auth.registration_endpoint, `${ORIGIN}/oauth/register`);
  assert.ok(auth.code_challenge_methods_supported.includes("S256"));
  assert.equal(auth.client_id_metadata_document_supported, false);
  const rejected = await registerClient(env, "https://other.example.test/callback");
  assert.notEqual(rejected.response.status, 201);
  const allowed = await registerClient(env);
  assert.equal(allowed.response.status, 201);
  assert.ok(allowed.body.client_id);
});

test("Founder Access OIDC flow issues a scoped MCP token with PKCE and no legacy-key fallback", async () => {
  const env = environment();
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const publicJwk = { ...await exportJWK(publicKey), kid: "fixture-key", alg: "RS256", use: "sig" };
  const originalFetch = globalThis.fetch;
  let seenTokenRequest;
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;
    if (url === `${ACCESS}/jwks`) return Response.json({ keys: [publicJwk] });
    if (url === `${ACCESS}/token`) {
      seenTokenRequest = new URLSearchParams(init.body);
      const nonce = env.__nonce;
      const idToken = await new SignJWT({ nonce })
        .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
        .setIssuer(ACCESS).setAudience(env.ACCESS_CLIENT_ID)
        .setSubject(env.MCP_ALLOWED_SUBJECT).setIssuedAt().setExpirationTime("5m")
        .sign(privateKey);
      return Response.json({ id_token: idToken, token_type: "Bearer" });
    }
    throw new Error("Unexpected external fetch");
  };
  try {
    const { body: client } = await registerClient(env);
    const verifier = "a".repeat(43);
    const consent = await send(oauthQuery(client.client_id, await sha256(verifier)), env);
    assert.equal(consent.status, 200);
    const ticket = ticketFrom(await consent.text());
    assert.ok(ticket);
    const accessRedirect = await send("/authorize", env, {
      method: "POST", headers: { cookie: cookieFrom(consent), "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ticket })
    });
    assert.equal(accessRedirect.status, 302);
    const upstream = new URL(accessRedirect.headers.get("location"));
    assert.equal(upstream.origin, ACCESS);
    assert.equal(upstream.searchParams.get("redirect_uri"), CALLBACK);
    assert.equal(upstream.searchParams.get("code_challenge_method"), "S256");
    env.__nonce = upstream.searchParams.get("nonce");
    const callback = await send(`/callback?code=access-code&state=${upstream.searchParams.get("state")}`, env,
      { headers: { cookie: cookieFrom(accessRedirect) } });
    assert.equal(callback.status, 302);
    assert.equal(seenTokenRequest.get("redirect_uri"), CALLBACK);
    assert.ok(seenTokenRequest.get("code_verifier"));
    const returned = new URL(callback.headers.get("location"));
    assert.equal(returned.origin, "https://chatgpt.com");
    const code = returned.searchParams.get("code");
    assert.ok(code);
    const tokenResponse = await send("/oauth/token", env, {
      method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: CHATGPT_CALLBACK,
        client_id: client.client_id, code_verifier: verifier, resource: `${ORIGIN}/mcp` })
    });
    assert.equal(tokenResponse.status, 200);
    const token = await tokenResponse.json();
    assert.equal(token.token_type.toLowerCase(), "bearer");
    assert.ok(token.access_token);
    const noBearer = await send("/mcp", env, { method: "POST",
      headers: { "x-hedgrops-api-key": "legacy-fixture", "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }) });
    assert.equal(noBearer.status, 401);
    const invalid = await send("/mcp", env, { method: "POST", headers: { authorization: "Bearer invalid" } });
    assert.equal(invalid.status, 401);
    const listed = await send("/mcp", env, { method: "POST", headers: {
      authorization: `Bearer ${token.access_token}`, "content-type": "application/json",
      accept: "application/json, text/event-stream"
    }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }) });
    assert.equal(listed.status, 200);
    const raw = await listed.text();
    const payload = JSON.parse(raw.split("\n").find((line) => line.startsWith("data: "))?.slice(6) ?? raw);
    assert.deepEqual(payload.result.tools.map((tool) => tool.name), [
      "authority_projection", "latest_weekly_review", "latest_mvp_process_review", "review_index"
    ]);
    for (const tool of payload.result.tools) assert.deepEqual(tool.securitySchemes,
      [{ type: "oauth2", scopes: ["evidence:read"] }]);
    assert.equal(token.scope, "evidence:read");
    const tokenKey = [...env.OAUTH_KV.values.keys()].find((key) => key.startsWith("token:"));
    assert.ok(tokenKey);
    const tokenRecord = JSON.parse(env.OAUTH_KV.values.get(tokenKey));
    env.OAUTH_KV.values.set(tokenKey, JSON.stringify({ ...tokenRecord, expiresAt: 0 }));
    const expired = await send("/mcp", env, { method: "POST", headers: { authorization: `Bearer ${token.access_token}` } });
    assert.equal(expired.status, 401);
    env.OAUTH_KV.values.set(tokenKey, JSON.stringify({ ...tokenRecord, scope: ["other:read"] }));
    const insufficient = await send("/mcp", env, { method: "POST", headers: {
      authorization: `Bearer ${token.access_token}`, "content-type": "application/json",
      accept: "application/json, text/event-stream"
    }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }) });
    assert.equal(insufficient.status, 403);
  } finally { globalThis.fetch = originalFetch; }
});

test("Access identity verification rejects wrong subject, issuer, audience, nonce, expiry and signature", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const { privateKey: wrongKey } = await generateKeyPair("RS256");
  const publicJwk = { ...await exportJWK(publicKey), kid: "fixture-key", alg: "RS256", use: "sig" };
  for (const variant of ["subject", "issuer", "audience", "nonce", "expired", "signature", "jwks-unavailable"]) {
    const env = environment();
    const originalFetch = globalThis.fetch;
    let nonce;
    globalThis.fetch = async (input) => {
      const url = typeof input === "string" ? input : input.url;
      if (url === `${ACCESS}/jwks`) return variant === "jwks-unavailable"
        ? new Response(null, { status: 503 }) : Response.json({ keys: [publicJwk] });
      if (url === `${ACCESS}/token`) {
        const now = Math.floor(Date.now() / 1000);
        const token = await new SignJWT({ nonce: variant === "nonce" ? "wrong-nonce" : nonce })
          .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
          .setIssuer(variant === "issuer" ? "https://wrong.example.test" : ACCESS)
          .setAudience(variant === "audience" ? "wrong-client" : env.ACCESS_CLIENT_ID)
          .setSubject(variant === "subject" ? "other-subject" : env.MCP_ALLOWED_SUBJECT)
          .setIssuedAt(now - 100)
          .setExpirationTime(variant === "expired" ? now - 1 : now + 300)
          .sign(variant === "signature" ? wrongKey : privateKey);
        return Response.json({ id_token: token });
      }
      throw new Error("Unexpected external fetch");
    };
    try {
      const { body: client } = await registerClient(env);
      const consent = await send(oauthQuery(client.client_id, await sha256("b".repeat(43))), env);
      assert.equal(consent.status, 200, variant);
      const ticket = ticketFrom(await consent.text());
      const upstream = await send("/authorize", env, { method: "POST", headers: {
        cookie: cookieFrom(consent), "content-type": "application/x-www-form-urlencoded"
      }, body: new URLSearchParams({ ticket }) });
      assert.equal(upstream.status, 302, variant);
      const url = new URL(upstream.headers.get("location"));
      nonce = url.searchParams.get("nonce");
      const callback = await send(`/callback?code=fixture&state=${url.searchParams.get("state")}`, env,
        { headers: { cookie: cookieFrom(upstream) } });
      assert.equal(callback.status, variant === "subject" ? 403 : variant === "jwks-unavailable" ? 503 : 401, variant);
      assert.equal(callback.headers.get("location"), null, variant);
      const replay = await send(`/callback?code=fixture&state=${url.searchParams.get("state")}`, env,
        { headers: { cookie: cookieFrom(upstream) } });
      assert.equal(replay.status, 401, variant);
    } finally { globalThis.fetch = originalFetch; }
  }
});

test("authorization rejects missing browser proof and unsupported scopes", async () => {
  const env = environment();
  const { body: client } = await registerClient(env);
  const consent = await send(oauthQuery(client.client_id, await sha256("c".repeat(43))), env);
  const ticket = ticketFrom(await consent.text());
  const withoutCookie = await send("/authorize", env, { method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ ticket }) });
  assert.equal(withoutCookie.status, 403);
  const wrongScope = await send(oauthQuery(client.client_id, await sha256("c".repeat(43))).replace("evidence%3Aread", "repository%3Awrite"), env);
  assert.equal(wrongScope.status, 403);
});
