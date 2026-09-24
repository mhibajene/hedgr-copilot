import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

// Node cannot import Cloudflare's runtime entrypoint. This loader supplies only
// its base class; the real OAuth provider, token store, and Worker run unchanged.
register(`data:text/javascript,${encodeURIComponent(`
  export async function resolve(specifier, context, nextResolve) {
    if (specifier === "cloudflare:workers") return {
      url: "data:text/javascript,export class WorkerEntrypoint {}; export class DurableObject { constructor(ctx) { this.ctx = ctx; } }", shortCircuit: true
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
// Unit-flow fixture only. Concurrency guarantees are tested against a real
// local Durable Object in oauth-coordinator.test.mjs.
function coordinator() {
  const values = new Map();
  const stub = { async fetch(request) {
    const input = await request.json();
    const path = new URL(request.url).pathname;
    const key = path === "/claim-code"
      ? `code:${JSON.stringify([input.userId, input.grantId])}`
      : `flow:${input.kind}:${input.id}`;
    if (path === "/put-flow") {
      if (values.has(key)) return Response.json({ ok: false }, { status: 409 });
      values.set(key, input.value);
      return Response.json({ ok: true }, { status: 201 });
    }
    if (path === "/consume-flow") {
      const value = values.get(key);
      if (!value || value.browserNonce !== input.browserNonce) return Response.json({ ok: false }, { status: 409 });
      values.delete(key);
      return Response.json({ ok: true, value });
    }
    if (path === "/claim-code") {
      if (values.has(key)) return Response.json({ ok: false }, { status: 409 });
      values.set(key, true);
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false }, { status: 404 });
  } };
  return { idFromName: () => "fixed-object", get: () => stub, values };
}
function environment() {
  return {
    MCP_RESOURCE: `${ORIGIN}/mcp`, MCP_ALLOWED_SUBJECT: "founder-subject",
    ACCESS_CLIENT_ID: "access-client", ACCESS_CLIENT_SECRET: "fixture-only-secret",
    ACCESS_ISSUER: ACCESS, ACCESS_AUTHORIZATION_URL: `${ACCESS}/authorize`,
    ACCESS_TOKEN_URL: `${ACCESS}/token`, ACCESS_JWKS_URL: `${ACCESS}/jwks`,
    OAUTH_KV: kv(), OAUTH_SINGLE_USE: coordinator()
  };
}
const ctx = { waitUntil() {}, passThroughOnException() {} };
async function send(path, env, { method = "GET", headers = {}, body } = {}) {
  return worker.fetch(new Request(`${ORIGIN}${path}`, { method, headers, body }), env, ctx);
}
async function registerClient(env, redirect = CHATGPT_CALLBACK, name = "fixture") {
  const response = await send("/oauth/register", env, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ client_name: name, redirect_uris: [redirect], token_endpoint_auth_method: "none" })
  });
  return { response, body: await response.json() };
}
async function actualCoordinator() {
  const scriptPath = fileURLToPath(new URL("./fixtures/oauth-coordinator-worker.js", import.meta.url));
  const coordinatorPath = fileURLToPath(new URL("../src/oauth-coordinator.js", import.meta.url));
  const mf = new Miniflare(convertV4MiniflareOptions({
    name: "oauth-coordinator-test", modulesRoot: fileURLToPath(new URL("../", import.meta.url)),
    modules: [
      { type: "ESModule", path: scriptPath, contents: readFileSync(scriptPath, "utf8") },
      { type: "ESModule", path: coordinatorPath, contents: readFileSync(coordinatorPath, "utf8") }
    ], compatibilityDate: "2026-06-24", cf: false,
    durableObjects: { OAUTH_SINGLE_USE: { className: "OAuthSingleUse", useSQLite: true } }
  }));
  return { mf, binding: await mf.getDurableObjectNamespace("OAUTH_SINGLE_USE", "oauth-coordinator-test") };
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
  const noCoordinator = await send("/mcp", { ...env, OAUTH_SINGLE_USE: undefined }, { method: "POST" });
  assert.equal(noCoordinator.status, 503);
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

test("consent identifies the registered client and escapes display metadata without auto-approval", async () => {
  const env = environment();
  const first = await registerClient(env, CHATGPT_CALLBACK, "Founder-approved client");
  const second = await registerClient(env, CHATGPT_CALLBACK, '<script>alert("x")</script>');
  assert.equal(first.response.status, 201);
  assert.equal(second.response.status, 201);
  const firstConsent = await send(oauthQuery(first.body.client_id, await sha256("d".repeat(43))), env);
  const secondConsent = await send(oauthQuery(second.body.client_id, await sha256("e".repeat(43))), env);
  assert.equal(secondConsent.status, 200);
  const page = await secondConsent.text();
  assert.ok(page.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"));
  assert.ok(!page.includes("<script>"));
  assert.ok(page.includes(second.body.client_id));
  assert.ok(page.includes(CHATGPT_CALLBACK));
  assert.ok(page.includes("evidence:read"));
  assert.ok(!page.includes(first.body.client_id));
  const crossed = await send("/authorize", env, { method: "POST", headers: {
    cookie: cookieFrom(firstConsent), "content-type": "application/x-www-form-urlencoded"
  }, body: new URLSearchParams({ ticket: ticketFrom(page) }) });
  assert.equal(crossed.status, 403);
  const approved = await send("/authorize", env, { method: "POST", headers: {
    cookie: cookieFrom(secondConsent), "content-type": "application/x-www-form-urlencoded"
  }, body: new URLSearchParams({ ticket: ticketFrom(page) }) });
  assert.equal(approved.status, 302);
});

test("provider validates parameters before durable code claim; stale KV cannot redeem twice", async () => {
  const { mf, binding } = await actualCoordinator();
  const env = { ...environment(), OAUTH_SINGLE_USE: binding };
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const publicJwk = { ...await exportJWK(publicKey), kid: "fixture-key", alg: "RS256", use: "sig" };
  const originalFetch = globalThis.fetch;
  let nonce;
  globalThis.fetch = async (input) => {
    const url = typeof input === "string" ? input : input.url;
    if (url === `${ACCESS}/jwks`) return Response.json({ keys: [publicJwk] });
    if (url === `${ACCESS}/token`) {
      const idToken = await new SignJWT({ nonce })
        .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
        .setIssuer(ACCESS).setAudience(env.ACCESS_CLIENT_ID)
        .setSubject(env.MCP_ALLOWED_SUBJECT).setIssuedAt().setExpirationTime("5m")
        .sign(privateKey);
      return Response.json({ id_token: idToken });
    }
    throw new Error("Unexpected external fetch");
  };
  try {
    const { body: client } = await registerClient(env);
    const { body: otherClient } = await registerClient(env);
    const verifier = "f".repeat(43);
    const consent = await send(oauthQuery(client.client_id, await sha256(verifier)), env);
    assert.equal(consent.status, 200);
    const upstream = await send("/authorize", env, { method: "POST", headers: {
      cookie: cookieFrom(consent), "content-type": "application/x-www-form-urlencoded"
    }, body: new URLSearchParams({ ticket: ticketFrom(await consent.text()) }) });
    assert.equal(upstream.status, 302);
    const upstreamUrl = new URL(upstream.headers.get("location"));
    nonce = upstreamUrl.searchParams.get("nonce");
    const callbackPath = `/callback?code=access-code&state=${upstreamUrl.searchParams.get("state")}`;
    const callback = await send(callbackPath, env, { headers: { cookie: cookieFrom(upstream) } });
    assert.equal(callback.status, 302);
    const callbackReplay = await send(callbackPath, env, { headers: { cookie: cookieFrom(upstream) } });
    assert.equal(callbackReplay.status, 401);
    const code = new URL(callback.headers.get("location")).searchParams.get("code");
    assert.ok(code);
    const grantKey = [...env.OAUTH_KV.values.keys()].find((key) => key.startsWith("grant:"));
    const staleGrant = env.OAUTH_KV.values.get(grantKey);
    const get = env.OAUTH_KV.get.bind(env.OAUTH_KV);
    env.OAUTH_KV.get = async (key, options) => key === grantKey
      ? options?.type === "json" ? JSON.parse(staleGrant) : staleGrant
      : get(key, options);
    const token = (overrides = {}) => send("/oauth/token", env, {
      method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "authorization_code", code,
        client_id: client.client_id, code_verifier: verifier, resource: `${ORIGIN}/mcp`, ...overrides })
    });
    for (const overrides of [
      { client_id: otherClient.client_id },
      { code_verifier: "wrong-verifier" },
      { redirect_uri: "https://chatgpt.com/connector/oauth/wrong" },
      { resource: "https://other.example.test/mcp" },
      { scope: "repository:write" }
    ]) {
      const rejected = await token(overrides);
      assert.notEqual(rejected.status, 200, JSON.stringify(overrides));
    }
    // OAuth 2.1 with PKCE permits omission of redirect_uri at the token
    // endpoint. Its exact registered value was fixed at authorization time.
    const simultaneous = await Promise.all([token(), token()]);
    assert.equal(simultaneous.filter((response) => response.status === 200).length, 1);
    assert.equal(simultaneous.filter((response) => response.status !== 200).length, 1);
    const again = await token();
    assert.notEqual(again.status, 200);
    assert.equal((await again.json()).error, "invalid_grant");

    const secondConsent = await send(oauthQuery(client.client_id, await sha256(verifier)), env);
    const secondUpstream = await send("/authorize", env, { method: "POST", headers: {
      cookie: cookieFrom(secondConsent), "content-type": "application/x-www-form-urlencoded"
    }, body: new URLSearchParams({ ticket: ticketFrom(await secondConsent.text()) }) });
    assert.equal(secondUpstream.status, 302);
    const secondUpstreamUrl = new URL(secondUpstream.headers.get("location"));
    nonce = secondUpstreamUrl.searchParams.get("nonce");
    const secondCallback = await send(`/callback?code=access-code-2&state=${secondUpstreamUrl.searchParams.get("state")}`, env,
      { headers: { cookie: cookieFrom(secondUpstream) } });
    assert.equal(secondCallback.status, 302);
    const secondCode = new URL(secondCallback.headers.get("location")).searchParams.get("code");
    const suppliedExactRedirect = await token({ code: secondCode, redirect_uri: CHATGPT_CALLBACK });
    assert.equal(suppliedExactRedirect.status, 200, "the registered exact redirect is also permitted");
  } finally {
    globalThis.fetch = originalFetch;
    await mf.dispose();
  }
});

test("a provider storage failure after the durable claim burns the code and requires new authorization", async () => {
  const { mf, binding } = await actualCoordinator();
  const env = { ...environment(), OAUTH_SINGLE_USE: binding };
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const publicJwk = { ...await exportJWK(publicKey), kid: "fixture-key", alg: "RS256", use: "sig" };
  const originalFetch = globalThis.fetch;
  let nonce;
  globalThis.fetch = async (input) => {
    const url = typeof input === "string" ? input : input.url;
    if (url === `${ACCESS}/jwks`) return Response.json({ keys: [publicJwk] });
    if (url === `${ACCESS}/token`) return Response.json({ id_token: await new SignJWT({ nonce })
      .setProtectedHeader({ alg: "RS256", kid: "fixture-key" })
      .setIssuer(ACCESS).setAudience(env.ACCESS_CLIENT_ID)
      .setSubject(env.MCP_ALLOWED_SUBJECT).setIssuedAt().setExpirationTime("5m")
      .sign(privateKey) });
    throw new Error("Unexpected external fetch");
  };
  try {
    const { body: client } = await registerClient(env);
    const verifier = "g".repeat(43);
    const consent = await send(oauthQuery(client.client_id, await sha256(verifier)), env);
    const upstream = await send("/authorize", env, { method: "POST", headers: {
      cookie: cookieFrom(consent), "content-type": "application/x-www-form-urlencoded"
    }, body: new URLSearchParams({ ticket: ticketFrom(await consent.text()) }) });
    nonce = new URL(upstream.headers.get("location")).searchParams.get("nonce");
    const state = new URL(upstream.headers.get("location")).searchParams.get("state");
    const callback = await send(`/callback?code=access-code&state=${state}`, env,
      { headers: { cookie: cookieFrom(upstream) } });
    assert.equal(callback.status, 302);
    const code = new URL(callback.headers.get("location")).searchParams.get("code");
    const grantKey = [...env.OAUTH_KV.values.keys()].find((key) => key.startsWith("grant:"));
    const originalPut = env.OAUTH_KV.put.bind(env.OAUTH_KV);
    env.OAUTH_KV.put = async (key, value) => {
      if (key === grantKey) throw new Error("mocked grant storage interruption");
      return originalPut(key, value);
    };
    const redeem = () => send("/oauth/token", env, { method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "authorization_code", code,
        client_id: client.client_id, code_verifier: verifier, resource: `${ORIGIN}/mcp` }) });
    const interrupted = await redeem();
    assert.equal(interrupted.status, 503);
    env.OAUTH_KV.put = originalPut;
    const retry = await redeem();
    assert.equal(retry.status, 400);
    assert.equal((await retry.json()).error, "invalid_grant");
  } finally {
    globalThis.fetch = originalFetch;
    await mf.dispose();
  }
});
