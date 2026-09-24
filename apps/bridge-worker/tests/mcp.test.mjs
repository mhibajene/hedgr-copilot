import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker, { ALLOWED_FILES } from "../src/index.js";
import { createBridgeMcpHandler, TOOL_ROUTES } from "../src/mcp.js";

const env = {
  MCP_ALLOWED_SUBJECT: "founder-fixture",
  MCP_RESOURCE: "https://bridge.example.test/mcp"
};
const authContext = () => ({
  props: { sub: env.MCP_ALLOWED_SUBJECT },
  auth: { userId: env.MCP_ALLOWED_SUBJECT, audience: env.MCP_RESOURCE,
    expiresAt: Math.floor(Date.now() / 1000) + 3600, scope: ["evidence:read"] },
  waitUntil() {}
});
const fixturePaths = {
  authority_projection: "../../../docs/ops/bridge/repo-authority-projection.json",
  latest_weekly_review: "../../../docs/ops/bridge/latest-weekly-review.json",
  latest_mvp_process_review: "../../../docs/ops/bridge/latest-mvp-process-review.json",
  review_index: "../../../docs/ops/bridge/review-index.json"
};
const fixture = (toolName) => JSON.parse(readFileSync(new URL(fixturePaths[toolName], import.meta.url), "utf8"));
const envelope = (toolName, data = fixture(toolName)) => ({
  bridge: {
    name: "HedgrOps Read-Only Institutional Evidence Bridge",
    mode: "READ_ONLY",
    execution_authority: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    sequencing_allowed: false,
    retrieved_at: "2026-09-24T00:00:00.000Z",
    source_path: ALLOWED_FILES[TOOL_ROUTES[toolName]],
    non_authorization_statement: "This response is evidence/retrieval only. It does not authorize implementation, sequencing, ticket activation, or repo mutation."
  },
  data
});
const toolForRoute = (route) => Object.entries(TOOL_ROUTES).find(([, value]) => value === route)?.[0];
const handler = (overrides = {}) => createBridgeMcpHandler({
  sourcePaths: ALLOWED_FILES,
  readEvidence: async (route) => envelope(toolForRoute(route)),
  ...overrides
});

async function rpc(mcpHandler, method, params = {}, options = {}) {
  const request = new Request("https://bridge.example.test/mcp", {
    method: "POST",
    headers: {
      authorization: "Bearer fixture-token",
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      ...options.headers
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  const response = await mcpHandler(request, options.env ?? env, options.ctx ?? authContext());
  const body = await response.text();
  const dataLine = body.split("\n").find((line) => line.startsWith("data: "));
  return { response, payload: dataLine ? JSON.parse(dataLine.slice(6)) : JSON.parse(body) };
}

test("stateless Streamable HTTP initializes and discovers exactly four no-argument tools", async () => {
  const mcp = handler();
  const init = await rpc(mcp, "initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "fixture", version: "1" }
  });
  assert.equal(init.response.status, 200);
  assert.equal(init.payload.result.protocolVersion, "2025-06-18");
  assert.equal(init.response.headers.get("mcp-session-id"), null);

  const listed = await rpc(mcp, "tools/list");
  assert.equal(listed.response.status, 200);
  assert.deepEqual(listed.payload.result.tools.map((tool) => tool.name), Object.keys(TOOL_ROUTES));
  for (const tool of listed.payload.result.tools) {
    assert.equal(tool.inputSchema.additionalProperties, false);
    assert.deepEqual(tool.inputSchema.properties, {});
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.deepEqual(tool.securitySchemes, [{ type: "oauth2", scopes: ["evidence:read"] }]);
  }
});

test("all tools use the existing fixed mappings and retain complete evidence qualifications", async () => {
  const routes = [];
  const mcp = handler({ readEvidence: async (route) => {
    routes.push(route);
    return envelope(toolForRoute(route));
  } });
  for (const toolName of Object.keys(TOOL_ROUTES)) {
    const result = await rpc(mcp, "tools/call", { name: toolName, arguments: {} });
    assert.equal(result.response.status, 200, toolName);
    assert.equal(result.payload.result.isError, undefined, toolName);
    assert.deepEqual(JSON.parse(result.payload.result.content[0].text), envelope(toolName), toolName);
  }
  assert.deepEqual(routes, Object.values(TOOL_ROUTES));
});

test("MCP session methods remain stateless and legacy GET route methods are unchanged", async () => {
  const mcp = handler();
  for (const method of ["GET", "DELETE"]) {
    const response = await mcp(new Request("https://bridge.example.test/mcp", {
      method,
      headers: { authorization: "Bearer fixture-token" }
    }), env, authContext());
    assert.equal(response.status, 405);
  }
  const legacy = await worker.fetch(new Request("https://bridge.example.test/authority", {
    method: "POST",
    headers: { "x-hedgrops-api-key": "fixture-legacy-key" }
  }), { HEDGROPS_BRIDGE_API_KEY: "fixture-legacy-key" });
  assert.equal(legacy.status, 405);
});

test("protected handler enforces expiry, audience, Founder identity, and evidence scope", async () => {
  const mcp = handler();
  const unverified = await rpc(mcp, "tools/list", {}, { ctx: { waitUntil() {} } });
  assert.equal(unverified.response.status, 503);

  for (const [update, status, code] of [
    [{ auth: { expiresAt: Math.floor(Date.now() / 1000) - 1 } }, 401, "MCP_EXPIRED_TOKEN"],
    [{ auth: { audience: "https://other.example.test/mcp" } }, 401, "MCP_INVALID_TOKEN"],
    [{ props: { sub: "other-identity" } }, 403, "MCP_INSUFFICIENT_AUTHORIZATION"],
    [{ auth: { scope: ["other:read"] } }, 403, "MCP_INSUFFICIENT_AUTHORIZATION"]
  ]) {
    const base = authContext();
    const ctx = { ...base, props: { ...base.props, ...update.props }, auth: { ...base.auth, ...update.auth } };
    const result = await rpc(handler(), "tools/list", {}, { ctx });
    assert.equal(result.response.status, status);
    assert.equal(result.payload.error, code);
    assert.equal(result.payload.authorizing, false);
  }
});

test("unknown tools and unexpected arguments cannot retrieve evidence", async () => {
  let reads = 0;
  const mcp = handler({ readEvidence: async () => { reads++; return null; } });
  const unknown = await rpc(mcp, "tools/call", { name: "browse_repository", arguments: {} });
  const args = await rpc(mcp, "tools/call", { name: "authority_projection", arguments: { path: "AGENTS.md" } });
  assert.equal(unknown.payload.error.code, -32602);
  assert.equal(args.payload.result.isError, true);
  assert.equal(reads, 0);
});

test("unavailable and malformed upstream evidence is an error with no authority claim", async () => {
  for (const readEvidence of [async () => null, async () => { throw new Error("upstream down"); }, async () => ({ data: {} })]) {
    const result = await rpc(handler({ readEvidence }), "tools/call", { name: "authority_projection", arguments: {} });
    const error = JSON.parse(result.payload.result.content[0].text);
    assert.equal(result.payload.result.isError, true);
    assert.equal(error.authorizing, false);
    assert.equal(error.freshness, "UNKNOWN");
    assert.equal(error.coverage, "INSUFFICIENT");
  }
});

test("RAP runtime validation rejects stale, partial, conflicted, and mismatched provenance", async () => {
  const cases = [
    ["stale", (data) => { data.freshness = "STALE"; }, "STALE_OR_UNKNOWN_EVIDENCE"],
    ["partial", (data) => { data.coverage = "PARTIAL"; }, "PARTIAL_EVIDENCE"],
    ["conflict", (data) => { data.conflicts = [{ conflict_id: "fixture" }]; }, "CONFLICTED_EVIDENCE"],
    ["revision", (data) => { data.sources[0].actual_revision = "other-revision"; }, "MALFORMED_EVIDENCE"]
  ];
  for (const [label, mutate, expectedCode] of cases) {
    const data = fixture("authority_projection");
    mutate(data);
    const result = await rpc(handler({ readEvidence: async () => envelope("authority_projection", data) }), "tools/call", { name: "authority_projection", arguments: {} });
    assert.equal(result.payload.result.isError, true, label);
    assert.equal(JSON.parse(result.payload.result.content[0].text).error, expectedCode, label);
  }
});

test("review snapshots reject stale, partial, conflicted, and missing evidence qualifiers", async () => {
  for (const toolName of ["latest_weekly_review", "latest_mvp_process_review", "review_index"]) {
    for (const mutate of [
      (data) => { data.freshness = "STALE"; },
      (data) => { data.coverage = "PARTIAL"; },
      (data) => { data.conflicts = [{ conflict_id: "fixture" }]; },
      (data) => { delete data.non_authorization_statement; }
    ]) {
      const data = fixture(toolName);
      mutate(data);
      const result = await rpc(handler({ readEvidence: async () => envelope(toolName, data) }), "tools/call", { name: toolName, arguments: {} });
      assert.equal(result.payload.result.isError, true, toolName);
    }
  }
});
