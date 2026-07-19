import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ALLOWED_FILES } from "../src/index.js";

const REPO_ROOT = new URL("../../../", import.meta.url);
const RAP_PATH = "docs/ops/bridge/repo-authority-projection.json";
const LEGACY_PATH = "docs/ops/bridge/current-status.json";
const R1_RECORD_PATH = "docs/ops/bridge/phase1-r1-compatibility-record.json";
const AUTHORITY_ROUTES = [
  "/authority",
  "/authority-summary",
  "/current-status",
  "/hedgr/status/authority-summary"
];

async function readRepoFile(repoPath) {
  return readFile(new URL(repoPath, REPO_ROOT));
}

async function readRepoJson(repoPath) {
  return JSON.parse(await readRepoFile(repoPath));
}

test("R1 record fixes the compatibility clock without authorizing retirement", async () => {
  const record = await readRepoJson(R1_RECORD_PATH);
  const firstServe = Date.parse(`${record.canonical_first_serve_date}T00:00:00Z`);
  const earliestRetirement = Date.parse(
    `${record.earliest_retirement_consideration_date}T00:00:00Z`
  );

  assert.equal(record.ticket_id, "BRIDGE-P1-OPS-001");
  assert.equal(record.authority_class, "SUPPORTING_EVIDENCE");
  assert.equal(record.canonical_first_serve_date, "2026-07-19");
  assert.equal(record.compatibility_period_days, 14);
  assert.equal(
    earliestRetirement - firstServe,
    record.compatibility_period_days * 24 * 60 * 60 * 1000
  );
  assert.equal(record.earliest_retirement_consideration_date, "2026-08-02");
  assert.equal(record.legacy_status, "DEPRECATED_RETAINED");
  assert.equal(record.retirement_allowed_under_this_ticket, false);
  assert.equal(record.retirement_ticket_active, false);
  assert.equal(record.retirement_requires_separate_founder_authorized_ticket, true);
  assert.equal(record.phase_2_allowed, false);
  assert.equal(record.cross_lane_impact, "NONE");
  assert.equal(record.execution_authority, false);
  assert.equal(record.mutation_allowed, false);
  assert.equal(record.ticket_activation_allowed, false);
  assert.equal(record.sequencing_allowed, false);
});

test("legacy placeholder remains byte-stable, Deprecated, and outside authority routes", async () => {
  const record = await readRepoJson(R1_RECORD_PATH);
  const legacyBytes = await readRepoFile(LEGACY_PATH);
  const legacy = JSON.parse(legacyBytes);
  const legacySha256 = createHash("sha256").update(legacyBytes).digest("hex");

  assert.equal(legacySha256, record.legacy_artifact_sha256);
  assert.equal(legacy.generated_at, record.legacy_generated_at);
  assert.equal(legacy.execution_authority, false);
  assert.equal(legacy.mutation_allowed, false);
  assert.equal(legacy.ticket_activation_allowed, false);
  assert.equal(legacy.status.inferred_execution_state, false);
  assert.equal(legacy.status.inferred_active_ticket, false);
  assert.ok(!Object.values(ALLOWED_FILES).includes(LEGACY_PATH));
});

test("all compatibility authority routes remain RAP-only", () => {
  for (const route of AUTHORITY_ROUTES) {
    assert.equal(ALLOWED_FILES[route], RAP_PATH, route);
  }
});

test("Phase 1 surfaces contain no Phase 2 routes or projection fields", async () => {
  const projection = await readRepoJson(RAP_PATH);
  const openapi = (await readRepoFile("apps/bridge-worker/openapi.yaml")).toString();
  const routes = Object.keys(ALLOWED_FILES);

  assert.deepEqual(Object.keys(projection.payload.fields).sort(), [
    "active_ticket_ids",
    "authority_boundaries",
    "sequencing_posture"
  ]);
  assert.ok(!routes.some((route) => /product-learning|experiment/i.test(route)));
  assert.doesNotMatch(
    openapi,
    /operationId:\s*(getProductLearningContext|getExperimentEvidence)/
  );
});
