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
  assert.equal(record.may_activate_ticket, false);
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

test("F8 correction binds the RAP to the superseding immutable main revision", async () => {
  const record = await readRepoJson(R1_RECORD_PATH);
  const projection = await readRepoJson(RAP_PATH);
  const verification = record.post_merge_revision_verification;
  const observation = verification.pre_correction_live_observation;
  const correction = verification.correction;

  assert.equal(
    verification.approval_target_merge_commit,
    "cbdd8bc546ef23c46f85734894ff7fa2163fce77"
  );
  assert.equal(
    verification.superseding_main_revision,
    "581a59592f4b557de759da11e107a0c6857a1376"
  );
  assert.equal(observation.authenticated_payload_observed, true);
  assert.equal(observation.live_response_revision, "05e64cfad12f9510e690effc4571b0fa34b3e627");
  assert.equal(observation.freshness, "CURRENT");
  assert.equal(observation.coverage, "COMPLETE");
  assert.equal(observation.mandatory_sources_share_live_revision, true);
  assert.equal(observation.material_fields_share_live_revision, true);
  assert.equal(observation.no_field_inference_confirmed, true);
  assert.equal(
    verification.f8_control.affected_rollout_status,
    "STOPPED_PENDING_CORRECTIVE_PR_AND_AUTHENTICATED_RECHECK"
  );
  assert.equal(correction.generated_rap_revision, verification.superseding_main_revision);
  assert.equal(correction.verification_status, "PENDING_AUTHENTICATED_POST_MERGE_RECHECK");
  assert.equal(projection.source_commit, correction.generated_rap_revision);
  assert.equal(projection.freshness, "CURRENT");
  assert.equal(projection.coverage, "COMPLETE");
  assert.equal(projection.conflicts.length, 0);
  assert.ok(
    projection.sources.every(
      (source) =>
        source.requirement === "MANDATORY" &&
        source.expected_revision === correction.generated_rap_revision &&
        source.actual_revision === correction.generated_rap_revision
    )
  );
  assert.ok(
    Object.values(projection.payload.fields).every(
      (field) => field.source_commit === correction.generated_rap_revision
    )
  );
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
