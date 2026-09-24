import { AuthorizationError, OAuthError, OAuthProvider } from "@cloudflare/workers-oauth-provider";
import { createLocalJWKSet, jwtVerify } from "jose";

import { createBridgeMcpHandler } from "./mcp.js";
import { callCoordinator, coordinatorStub } from "./oauth-coordinator.js";

const SCOPE = "evidence:read";
const CALLBACK_PATH = "/callback";
const STATE_TTL = 300;
class AccessKeysUnavailable extends Error {}

function fail(status = 503, code = status === 503 ? "MCP_AUTH_UNAVAILABLE" : "MCP_AUTH_FAILED") {
  return new Response(JSON.stringify({
    error: code,
    authorizing: false
  }), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function challenge(verifier) {
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  return btoa(String.fromCharCode(...hash)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function cookie(request, name) {
  const parts = (request.headers.get("cookie") ?? "").split(";");
  for (const part of parts) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return null;
}

function setCookie(name, value, maxAge = STATE_TTL) {
  return `${name}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

function validHttps(value) {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

function configFor(request, env) {
  const names = [
    "MCP_RESOURCE", "MCP_ALLOWED_SUBJECT", "ACCESS_CLIENT_ID", "ACCESS_CLIENT_SECRET",
    "ACCESS_ISSUER", "ACCESS_AUTHORIZATION_URL", "ACCESS_TOKEN_URL", "ACCESS_JWKS_URL"
  ];
  if (names.some((name) => typeof env?.[name] !== "string" || env[name].length === 0)) return null;
  if (!["get", "put", "delete"].every((method) => typeof env?.OAUTH_KV?.[method] === "function")) return null;
  if (!coordinatorStub(env)) return null;
  if (!validHttps(env.MCP_RESOURCE) || !validHttps(env.ACCESS_ISSUER)) return null;
  const resource = new URL(env.MCP_RESOURCE);
  const accessOrigin = new URL(env.ACCESS_ISSUER).origin;
  if (resource.pathname !== "/mcp" || resource.search || resource.hash) return null;
  if (new URL(request.url).origin !== resource.origin) return null;
  for (const name of ["ACCESS_AUTHORIZATION_URL", "ACCESS_TOKEN_URL", "ACCESS_JWKS_URL"]) {
    if (!validHttps(env[name]) || new URL(env[name]).origin !== accessOrigin) return null;
  }
  return { resource: resource.href, origin: resource.origin, callback: `${resource.origin}${CALLBACK_PATH}` };
}

function redirectAllowed(uri) {
  if (typeof uri !== "string") return false;
  try {
    const url = new URL(uri);
    return url.protocol === "https:" && url.origin === "https://chatgpt.com" &&
      !url.search && !url.hash &&
      (url.pathname === "/connector_platform_oauth_redirect" ||
        /^\/connector\/oauth\/[A-Za-z0-9_-]+$/.test(url.pathname));
  } catch { return false; }
}

function registrationPolicy({ clientMetadata }) {
  const redirects = clientMetadata.redirect_uris;
  if (!Array.isArray(redirects) || redirects.length === 0 || !redirects.every(redirectAllowed)) {
    return { code: "invalid_client_metadata", description: "Client redirect URI is not approved." };
  }
}

function authError(error) {
  if (!(error instanceof AuthorizationError)) return fail(400);
  if (!error.redirectUri) return fail(400);
  const url = new URL(error.redirectUri);
  url.searchParams.set("error", error.code);
  url.searchParams.set("error_description", error.description);
  if (error.state) url.searchParams.set("state", error.state);
  if (error.issuer) url.searchParams.set("iss", error.issuer);
  return Response.redirect(url, 302);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function consentPage(ticket, client, authRequest) {
  const name = typeof client.clientName === "string" && client.clientName.trim()
    ? client.clientName : "Unnamed registered client";
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>HedgrOps evidence access</title><h1>HedgrOps evidence access</h1><p>Requesting registered client: <strong>${escapeHtml(name)}</strong></p><p>Client ID: <code>${escapeHtml(authRequest.clientId)}</code></p><p>Exact return address: <code>${escapeHtml(authRequest.redirectUri)}</code></p><p>Requested access: read-only retrieval of the four fixed Bridge evidence tools (<code>evidence:read</code>).</p><p>Confirm this client and return address before approving. A Founder login alone does not approve a client.</p><form method="post" action="/authorize"><input type="hidden" name="ticket" value="${ticket}"><button type="submit">Approve this client</button></form></html>`;
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8", "cache-control": "no-store",
      "content-security-policy": "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "x-frame-options": "DENY", "referrer-policy": "no-referrer"
    }
  });
}

async function beginAuthorization(request, env) {
  let authRequest;
  try {
    authRequest = await env.OAUTH_PROVIDER.parseAuthRequest(request);
  } catch (error) { return authError(error); }
  if (authRequest.scope.length !== 1 || authRequest.scope[0] !== SCOPE) return fail(403);
  const client = await env.OAUTH_PROVIDER.lookupClient(authRequest.clientId);
  if (!client || client.clientId !== authRequest.clientId ||
    !Array.isArray(client.redirectUris) || !client.redirectUris.includes(authRequest.redirectUri) ||
    !redirectAllowed(authRequest.redirectUri)) return fail(403);
  const ticket = randomToken();
  const browserNonce = randomToken();
  const created = await callCoordinator(env, "/put-flow", {
    kind: "consent", id: ticket, value: { authRequest, browserNonce }
  });
  if (created.status !== 201) return fail(503);
  const response = consentPage(ticket, client, authRequest);
  response.headers.set("set-cookie", setCookie("hbo_consent", browserNonce));
  return response;
}

async function approveAuthorization(request, env, config) {
  let ticket;
  try { ticket = (await request.formData()).get("ticket"); } catch { return fail(400); }
  if (typeof ticket !== "string" || !/^[a-f0-9]{64}$/.test(ticket)) return fail(400);
  const consumed = await callCoordinator(env, "/consume-flow", {
    kind: "consent", id: ticket, browserNonce: cookie(request, "hbo_consent")
  });
  if (consumed.status !== 200) return fail(403);
  const stored = consumed.body.value;

  const state = randomToken();
  const verifier = randomToken();
  const nonce = randomToken();
  const browserNonce = randomToken();
  const created = await callCoordinator(env, "/put-flow", {
    kind: "access", id: state,
    value: { authRequest: stored.authRequest, verifier, nonce, browserNonce }
  });
  if (created.status !== 201) return fail(503);
  const upstream = new URL(env.ACCESS_AUTHORIZATION_URL);
  upstream.searchParams.set("response_type", "code");
  upstream.searchParams.set("client_id", env.ACCESS_CLIENT_ID);
  upstream.searchParams.set("redirect_uri", config.callback);
  upstream.searchParams.set("scope", "openid");
  upstream.searchParams.set("state", state);
  upstream.searchParams.set("nonce", nonce);
  upstream.searchParams.set("code_challenge", await challenge(verifier));
  upstream.searchParams.set("code_challenge_method", "S256");
  return new Response(null, { status: 302, headers: {
    location: upstream.href, "cache-control": "no-store",
    "set-cookie": setCookie("hbo_access", browserNonce)
  } });
}

async function verifyAccessIdToken(env, token, nonce) {
  let jwks;
  try {
    const response = await fetch(env.ACCESS_JWKS_URL, { redirect: "error", headers: { accept: "application/json" } });
    if (!response.ok) throw new Error();
    jwks = await response.json();
  } catch { throw new AccessKeysUnavailable(); }
  const keys = createLocalJWKSet(jwks);
  const { payload } = await jwtVerify(token, keys, {
    issuer: env.ACCESS_ISSUER,
    audience: env.ACCESS_CLIENT_ID,
    algorithms: ["RS256"],
    requiredClaims: ["exp", "iat", "sub", "nonce"]
  });
  if (!Number.isFinite(payload.exp) || !Number.isFinite(payload.iat) ||
    typeof payload.sub !== "string" || typeof payload.nonce !== "string") throw new Error("Missing OIDC claim");
  if (payload.nonce !== nonce) throw new Error("Access nonce mismatch");
  return payload.sub;
}

async function finishAuthorization(request, env, config) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!state || !/^[a-f0-9]{64}$/.test(state) || !code || url.searchParams.has("error")) return fail(401);
  const consumed = await callCoordinator(env, "/consume-flow", {
    kind: "access", id: state, browserNonce: cookie(request, "hbo_access")
  });
  if (consumed.status !== 200) return fail(401);
  const stored = consumed.body.value;

  const body = new URLSearchParams({
    grant_type: "authorization_code", code, client_id: env.ACCESS_CLIENT_ID,
    client_secret: env.ACCESS_CLIENT_SECRET, redirect_uri: config.callback,
    code_verifier: stored.verifier
  });
  const response = await fetch(env.ACCESS_TOKEN_URL, {
    method: "POST", redirect: "error", headers: { "content-type": "application/x-www-form-urlencoded", accept: "application/json" },
    body
  });
  if (!response.ok) return fail(401);
  let tokenResponse;
  try { tokenResponse = await response.json(); } catch { return fail(401); }
  if (typeof tokenResponse?.id_token !== "string") return fail(401);
  let subject;
  try { subject = await verifyAccessIdToken(env, tokenResponse.id_token, stored.nonce); }
  catch (error) { return error instanceof AccessKeysUnavailable
    ? fail(503, "MCP_AUTH_UPSTREAM_UNAVAILABLE") : fail(401); }
  if (subject !== env.MCP_ALLOWED_SUBJECT) return fail(403);
  const client = await env.OAUTH_PROVIDER.lookupClient(stored.authRequest.clientId);
  if (!client || client.clientId !== stored.authRequest.clientId ||
    !Array.isArray(client.redirectUris) || !client.redirectUris.includes(stored.authRequest.redirectUri) ||
    !redirectAllowed(stored.authRequest.redirectUri)) return fail(403);
  const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
    request: stored.authRequest, userId: subject,
    metadata: { bridge: "hedgrops-evidence" }, scope: [SCOPE], props: { sub: subject }
  });
  const redirect = new Response(null, { status: 302, headers: {
    location: redirectTo, "cache-control": "no-store",
    "set-cookie": setCookie("hbo_access", "", 0)
  } });
  return redirect;
}

async function interaction(request, env, config) {
  const path = new URL(request.url).pathname;
  try {
    if (path === "/authorize" && request.method === "GET") return await beginAuthorization(request, env);
    if (path === "/authorize" && request.method === "POST") return await approveAuthorization(request, env, config);
    if (path === CALLBACK_PATH && request.method === "GET") return await finishAuthorization(request, env, config);
    return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
  } catch {
    return fail(503);
  }
}

async function handleOAuthRequest(request, env, ctx, { readEvidence, sourcePaths }) {
  const config = configFor(request, env);
  if (!config) return fail(503, "MCP_AUTH_NOT_CONFIGURED");
  const provider = new OAuthProvider({
    apiRoute: "/mcp",
    apiHandler: { fetch: createBridgeMcpHandler({ readEvidence, sourcePaths }) },
    defaultHandler: { fetch: (req, environment) => interaction(req, environment, config) },
    authorizeEndpoint: "/authorize",
    tokenEndpoint: "/oauth/token",
    clientRegistrationEndpoint: "/oauth/register",
    clientRegistrationCallback: registrationPolicy,
    tokenExchangeCallback: async (exchange) => {
      if (exchange.grantType !== "authorization_code" ||
        exchange.userId !== env.MCP_ALLOWED_SUBJECT ||
        exchange.clientId !== exchange.subjectClientId ||
        exchange.resource !== config.resource ||
        exchange.scope.length !== 1 || exchange.scope[0] !== SCOPE ||
        exchange.requestedScope.length !== 1 || exchange.requestedScope[0] !== SCOPE) {
        throw new OAuthError("invalid_grant", { description: "Authorization is outside the Bridge evidence grant." });
      }
      let claim;
      try {
        claim = await callCoordinator(env, "/claim-code", {
          userId: exchange.userId, grantId: exchange.grantId
        });
      } catch {
        throw new OAuthError("temporarily_unavailable", {
          description: "Single-use authorization storage is unavailable.", statusCode: 503
        });
      }
      if (claim.status !== 200) throw new OAuthError("invalid_grant", {
        description: "Authorization code already consumed. Start a new authorization."
      });
    },
    scopesSupported: [SCOPE],
    accessTokenTTL: 900,
    refreshTokenTTL: 0,
    resourceMetadata: {
      resource: config.resource,
      authorization_servers: [config.origin],
      scopes_supported: [SCOPE],
      resource_name: "HedgrOps evidence Bridge"
    }
  });
  try { return await provider.fetch(request, env, ctx); } catch { return fail(503); }
}

export { handleOAuthRequest };
