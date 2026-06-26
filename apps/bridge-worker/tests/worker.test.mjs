import assert from "node:assert/strict";
import test from "node:test";

import worker, { ALLOWED_FILES } from "../src/index.js";

const env = {
  HEDGROPS_BRIDGE_API_KEY: "test-key",
  GITHUB_OWNER: "hedgr",
  GITHUB_REPO: "hedgr-copilot",
  GITHUB_BRANCH: "main",
  GITHUB_TOKEN: "read-only-token"
};

const snapshot = {
  artifact_type: "test_snapshot",
  generated_at: "2026-06-24T00:00:00.000Z",
  source_path: "docs/ops/bridge/current-status.json",
  authority_posture: { mode: "READ_ONLY" },
  non_authorization_statement:
    "This snapshot is evidence/retrieval only. It does not authorize implementation, sequencing, ticket activation, or repo mutation.",
  execution_authority: false,
  may_activate_ticket: false,
  mutation_allowed: false
};

function request(path, options = {}) {
  return new Request(`https://bridge.example.test${path}`, options);
}

async function json(response) {
  return response.json();
}

function mockGitHubFetch(body = snapshot) {
  const calls = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  return calls;
}

test("health is public and does not fetch snapshots", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(request("/health"), {});

  assert.equal(response.status, 200);
  assert.deepEqual(await json(response), { status: "ok", mode: "READ_ONLY" });
  assert.equal(calls.length, 0);
});

test("root route is public and lists available routes without fetching snapshots", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(request("/"), {});
  const body = await json(response);

  assert.equal(response.status, 200);
  assert.equal(body.bridge, "HedgrOps Read-Only Review Evidence Bridge");
  assert.equal(body.status, "ok");
  assert.equal(body.mode, "READ_ONLY");
  assert.equal(body.execution_authority, false);
  assert.equal(body.mutation_allowed, false);
  assert.equal(body.ticket_activation_allowed, false);
  assert.ok(body.routes.includes("/health"));
  assert.ok(body.routes.includes("/authority-summary"));
  assert.ok(body.routes.includes("/hedgr/status/authority-summary"));
  assert.equal(calls.length, 0);
});

test("snapshot routes require the bridge API key", async () => {
  const calls = mockGitHubFetch();

  const missing = await worker.fetch(
    request("/hedgr/status/authority-summary"),
    env
  );
  const invalid = await worker.fetch(
    request("/hedgr/status/authority-summary", {
      headers: { "x-hedgrops-api-key": "wrong" }
    }),
    env
  );
  const aliasMissing = await worker.fetch(request("/authority-summary"), env);

  assert.equal(missing.status, 401);
  assert.equal(invalid.status, 401);
  assert.equal(aliasMissing.status, 401);
  assert.equal(calls.length, 0);
});

test("unknown routes return 404 without fetching snapshots", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(
    request("/hedgr/reviews/not-allowed", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );

  assert.equal(response.status, 404);
  assert.equal(calls.length, 0);
});

test("non-GET methods are rejected", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(
    request("/hedgr/status/authority-summary", {
      method: "POST",
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );

  assert.equal(response.status, 405);
  assert.equal(calls.length, 0);
});

test("successful snapshot responses include the required read-only envelope", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(
    request("/hedgr/status/authority-summary", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );
  const body = await json(response);

  assert.equal(response.status, 200);
  assert.equal(body.bridge.name, "HedgrOps Read-Only Review Evidence Bridge");
  assert.equal(body.bridge.mode, "READ_ONLY");
  assert.equal(body.bridge.execution_authority, false);
  assert.equal(body.bridge.mutation_allowed, false);
  assert.equal(body.bridge.ticket_activation_allowed, false);
  assert.equal(body.bridge.source_path, ALLOWED_FILES["/hedgr/status/authority-summary"]);
  assert.equal(body.data.artifact_type, "test_snapshot");
  assert.equal(calls.length, 1);
});

test("snapshot retrieval uses the hard allowlist mapping", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(
    request("/hedgr/reviews/latest-mvp-process?file=../../AGENTS.md", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );

  assert.equal(response.status, 200);
  assert.match(
    calls[0].url,
    /docs\/ops\/bridge\/latest-mvp-process-review\.json\?ref=main$/
  );
});

test("alias routes use the same protected snapshot allowlist", async () => {
  const calls = mockGitHubFetch();
  const authority = await worker.fetch(
    request("/authority-summary", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );
  const weekly = await worker.fetch(
    request("/weekly-review", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    env
  );

  assert.equal(authority.status, 200);
  assert.equal(weekly.status, 200);
  assert.match(
    calls[0].url,
    /docs\/ops\/bridge\/current-status\.json\?ref=main$/
  );
  assert.match(
    calls[1].url,
    /docs\/ops\/bridge\/latest-weekly-review\.json\?ref=main$/
  );
  assert.equal(ALLOWED_FILES["/authority"], "docs/ops/bridge/current-status.json");
  assert.equal(ALLOWED_FILES["/current-status"], "docs/ops/bridge/current-status.json");
  assert.equal(ALLOWED_FILES["/weekly-review"], "docs/ops/bridge/latest-weekly-review.json");
});

test("missing GitHub configuration fails closed", async () => {
  const calls = mockGitHubFetch();
  const response = await worker.fetch(
    request("/hedgr/reviews/index", {
      headers: { "x-hedgrops-api-key": "test-key" }
    }),
    { HEDGROPS_BRIDGE_API_KEY: "test-key" }
  );

  assert.equal(response.status, 502);
  assert.equal(calls.length, 0);
});
