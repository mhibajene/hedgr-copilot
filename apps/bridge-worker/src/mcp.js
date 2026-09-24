import { McpServer, createMcpHandler } from "@modelcontextprotocol/server";
import { z } from "zod";

import { validateResponseEnvelope } from "../contracts/phase0/validate.mjs";

const REQUIRED_SCOPE = "evidence:read";
const TOOL_SECURITY = Object.freeze([{ type: "oauth2", scopes: [REQUIRED_SCOPE] }]);
const TOOL_ROUTES = Object.freeze({
  authority_projection: "/hedgr/status/authority-summary",
  latest_weekly_review: "/hedgr/reviews/latest-weekly",
  latest_mvp_process_review: "/hedgr/reviews/latest-mvp-process",
  review_index: "/hedgr/reviews/index"
});

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function deny(status, code) {
  return jsonResponse(status, {
    error: code,
    authorizing: false,
    freshness: "UNKNOWN",
    coverage: "INSUFFICIENT"
  });
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validReviewSnapshot(snapshot, toolName) {
  const expectedTypes = {
    latest_weekly_review: ["hedgrops_bridge_latest_weekly_review_snapshot", "review", "weekly"],
    latest_mvp_process_review: ["hedgrops_bridge_latest_mvp_process_review_snapshot", "review", "mvp_process"],
    review_index: ["hedgrops_bridge_review_index_snapshot", "index", null]
  };
  const [artifactType, bodyKey, reviewType] = expectedTypes[toolName];
  const body = snapshot?.[bodyKey];
  return (
    isRecord(snapshot) &&
    snapshot.artifact_type === artifactType &&
    typeof snapshot.generated_at === "string" &&
    !Number.isNaN(Date.parse(snapshot.generated_at)) &&
    typeof snapshot.source_path === "string" &&
    snapshot.source_path.length > 0 &&
    !snapshot.source_path.startsWith("/") &&
    !snapshot.source_path.split("/").includes("..") &&
    isRecord(snapshot.authority_posture) &&
    snapshot.authority_posture.class === "A" &&
    snapshot.authority_posture.mode === "READ_ONLY" &&
    snapshot.authority_posture.bridge_role === "evidence_retrieval_only" &&
    (bodyKey === "index"
      ? snapshot.authority_posture.index_posture === "evidence_discovery_only"
      : snapshot.authority_posture.review_posture === "non_authoritative_evidence_only") &&
    typeof snapshot.non_authorization_statement === "string" &&
    snapshot.non_authorization_statement.length > 0 &&
    snapshot.execution_authority === false &&
    snapshot.may_activate_ticket === false &&
    snapshot.mutation_allowed === false &&
    snapshot.ticket_activation_allowed === false &&
    isRecord(body) &&
    (reviewType === null || body.review_type === reviewType) &&
    (bodyKey === "index"
      ? body.evidence_discovery_only === true &&
        body.review_ranking === false &&
        body.review_prioritization === false &&
        body.review_interpretation === false &&
        Array.isArray(body.entries)
      : body.evidence_only === true && body.non_authoritative_evidence_only === true) &&
    (reviewType !== "weekly" || (
      body.next_ticket_proposals === false &&
      body.sequencing_recommendations === false &&
      body.activation_language === false
    )) &&
    (reviewType !== "mvp_process" || (
      body.implementation_recommendations === false &&
      body.authority_inference === false &&
      body.blocker_closure_inference === false
    )) &&
    snapshot.freshness !== "STALE" &&
    snapshot.coverage !== "PARTIAL" &&
    snapshot.coverage !== "INSUFFICIENT" &&
    (snapshot.conflicts === undefined || (Array.isArray(snapshot.conflicts) && snapshot.conflicts.length === 0))
  );
}

function validateEvidence(envelope, toolName, expectedSourcePath) {
  if (!isRecord(envelope) || !isRecord(envelope.bridge) || !isRecord(envelope.data)) {
    return "MALFORMED_EVIDENCE";
  }
  if (
    typeof expectedSourcePath !== "string" ||
    typeof envelope.bridge.name !== "string" ||
    envelope.bridge.mode !== "READ_ONLY" ||
    envelope.bridge.execution_authority !== false ||
    envelope.bridge.mutation_allowed !== false ||
    envelope.bridge.ticket_activation_allowed !== false ||
    envelope.bridge.sequencing_allowed !== false ||
    envelope.bridge.source_path !== expectedSourcePath ||
    typeof envelope.bridge.non_authorization_statement !== "string" ||
    envelope.bridge.non_authorization_statement.length === 0 ||
    typeof envelope.bridge.retrieved_at !== "string" ||
    Number.isNaN(Date.parse(envelope.bridge.retrieved_at))
  ) {
    return "MALFORMED_EVIDENCE";
  }
  const data = envelope.data;
  if (toolName === "authority_projection") {
    let result;
    try {
      result = validateResponseEnvelope(data);
    } catch {
      return "MALFORMED_EVIDENCE";
    }
    if (!result.ok || data.authority_class !== "REPO_AUTHORITY_PROJECTION") {
      const codes = new Set(result.errors.map((error) => error.code));
      if (codes.has("UNRESOLVED_AUTHORITY_CONFLICT")) return "CONFLICTED_EVIDENCE";
      if (codes.has("UNKNOWN_FRESHNESS")) return "STALE_OR_UNKNOWN_EVIDENCE";
      if (codes.has("INSUFFICIENT_COVERAGE")) return "PARTIAL_EVIDENCE";
      return "MALFORMED_EVIDENCE";
    }
    return null;
  }
  if (Array.isArray(data.conflicts) && data.conflicts.length > 0) return "CONFLICTED_EVIDENCE";
  if (data.freshness === "STALE" || data.freshness === "UNKNOWN") return "STALE_OR_UNKNOWN_EVIDENCE";
  if (data.coverage === "PARTIAL" || data.coverage === "INSUFFICIENT") return "PARTIAL_EVIDENCE";
  return validReviewSnapshot(data, toolName) ? null : "MALFORMED_EVIDENCE";
}

function evidenceError(code) {
  return {
    isError: true,
    content: [{ type: "text", text: JSON.stringify({
      error: code,
      authorizing: false,
      freshness: "UNKNOWN",
      coverage: "INSUFFICIENT"
    }) }]
  };
}

function createServer(readEvidence, sourcePaths) {
  const server = new McpServer({ name: "hedgrops-evidence-bridge", version: "0.1.0" });
  for (const [toolName, route] of Object.entries(TOOL_ROUTES)) {
    server.registerTool(toolName, {
      description: `Retrieve the fixed ${toolName.replaceAll("_", " ")} evidence snapshot. Evidence only; no execution authority.`,
      inputSchema: z.strictObject({}),
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }
    }, async () => {
      let envelope;
      try {
        envelope = await readEvidence(route);
      } catch {
        return evidenceError("SNAPSHOT_SOURCE_UNAVAILABLE");
      }
      if (envelope === null) return evidenceError("SNAPSHOT_SOURCE_UNAVAILABLE");
      const error = validateEvidence(envelope, toolName, sourcePaths[route]);
      if (error) return evidenceError(error);
      return { content: [{ type: "text", text: JSON.stringify(envelope) }] };
    });
  }
  return server;
}

// SDK 2.0 emits the MCP tool descriptor without securitySchemes. Add the
// required OAuth declaration to the four fixed descriptors after serialization.
async function addToolSecurity(method, response) {
  if (method !== "tools/list" || response.status !== 200) return response;
  const decorate = (payload) => {
    if (!Array.isArray(payload?.result?.tools) ||
      payload.result.tools.length !== Object.keys(TOOL_ROUTES).length ||
      new Set(payload.result.tools.map((tool) => tool.name)).size !== Object.keys(TOOL_ROUTES).length ||
      payload.result.tools.some((tool) => !Object.hasOwn(TOOL_ROUTES, tool.name))) {
      throw new Error("Unexpected tool discovery");
    }
    for (const tool of payload.result.tools) tool.securitySchemes = TOOL_SECURITY;
    return JSON.stringify(payload);
  };
  try {
    const raw = await response.text();
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("text/event-stream")
      ? raw.split("\n").map((line) => line.startsWith("data: ") ? `data: ${decorate(JSON.parse(line.slice(6)))}` : line).join("\n")
      : decorate(JSON.parse(raw));
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(body, { status: response.status, headers });
  } catch { return deny(502, "MCP_TOOL_DISCOVERY_FAILED"); }
}

// The OAuth provider validates the opaque bearer token before this handler runs.
// Enforce the Bridge's narrower Founder and evidence scope on every request.
function createBridgeMcpHandler({ readEvidence, sourcePaths } = {}) {
  return async (request, env, ctx) => {
    if (!env?.MCP_ALLOWED_SUBJECT || !env?.MCP_RESOURCE) return deny(503, "MCP_AUTH_NOT_CONFIGURED");
    if (!isRecord(ctx?.auth) || !isRecord(ctx?.props)) return deny(503, "MCP_AUTH_NOT_CONFIGURED");
    if (!Number.isFinite(ctx.auth.expiresAt) || ctx.auth.expiresAt <= Date.now() / 1000) {
      return deny(401, "MCP_EXPIRED_TOKEN");
    }
    if (ctx.auth.audience !== env.MCP_RESOURCE) {
      return deny(401, "MCP_INVALID_TOKEN");
    }
    if (ctx.props.sub !== env.MCP_ALLOWED_SUBJECT || ctx.auth.userId !== env.MCP_ALLOWED_SUBJECT ||
      !Array.isArray(ctx.auth.scope) || !ctx.auth.scope.includes(REQUIRED_SCOPE)) {
      return deny(403, "MCP_INSUFFICIENT_AUTHORIZATION");
    }
    if (typeof readEvidence !== "function" || !isRecord(sourcePaths)) {
      return deny(503, "MCP_EVIDENCE_NOT_CONFIGURED");
    }
    let method;
    try { method = (await request.clone().json()).method; } catch { /* Let MCP handle malformed requests. */ }
    const response = await createMcpHandler(() => createServer(readEvidence, sourcePaths)).fetch(request);
    return addToolSecurity(method, response);
  };
}

export { createBridgeMcpHandler, TOOL_ROUTES };
