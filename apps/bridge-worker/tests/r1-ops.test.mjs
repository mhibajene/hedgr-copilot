import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ALLOWED_FILES } from "../src/index.js";

const REPO_ROOT = new URL("../../../", import.meta.url);
const RAP_PATH = "docs/ops/bridge/repo-authority-projection.json";
const LEGACY_LIVE_PATH = "docs/ops/bridge/current-status.json";
const LEGACY_ARCHIVE_PATH = "docs/ops/bridge/archive/retired-legacy-current-status.json";
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

test("legacy placeholder is retired from the live path, byte-stable in archive, and outside authority routes", async () => {
  const record = await readRepoJson(R1_RECORD_PATH);
  const legacyBytes = await readRepoFile(LEGACY_ARCHIVE_PATH);
  const legacy = JSON.parse(legacyBytes);
  const legacySha256 = createHash("sha256").update(legacyBytes).digest("hex");

  assert.equal(existsSync(new URL(LEGACY_LIVE_PATH, REPO_ROOT)), false);
  assert.equal(legacySha256, record.legacy_artifact_sha256);
  assert.equal(legacy.generated_at, record.legacy_generated_at);
  assert.equal(legacy.execution_authority, false);
  assert.equal(legacy.mutation_allowed, false);
  assert.equal(legacy.ticket_activation_allowed, false);
  assert.equal(legacy.status.inferred_execution_state, false);
  assert.equal(legacy.status.inferred_active_ticket, false);
  assert.ok(!Object.values(ALLOWED_FILES).includes(LEGACY_LIVE_PATH));
  assert.ok(!Object.values(ALLOWED_FILES).includes(LEGACY_ARCHIVE_PATH));
  assert.equal(record.later_retirement.ticket_id, "BRIDGE-LEGACY-RETIRE-001");
  assert.equal(record.later_retirement.live_path_removed, true);
  assert.equal(record.later_retirement.archive_path, LEGACY_ARCHIVE_PATH);
  assert.equal(record.later_retirement.legacy_sha256_unchanged, true);
  assert.equal(record.later_retirement.phase_2_allowed, false);
  assert.equal(record.later_retirement.authority_routes_remain_rap_only, true);
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
  const postCorrection = verification.post_correction_live_observation;

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
    "RESUMED_AFTER_CORRECTIVE_PR_AND_AUTHENTICATED_RECHECK"
  );
  assert.equal(correction.corrective_pr, 312);
  assert.equal(
    correction.corrective_merge_commit,
    "f31fdf04f021c0054e413b1e0debe7111bd5681b"
  );
  assert.equal(correction.generated_rap_revision, verification.superseding_main_revision);
  assert.equal(correction.verification_status, "VERIFIED_AUTHENTICATED_CURRENT");
  assert.equal(postCorrection.operation_id, "getAuthoritySummaryAlias");
  assert.equal(postCorrection.authenticated_payload_observed, true);
  assert.equal(postCorrection.live_response_revision, correction.generated_rap_revision);
  assert.equal(postCorrection.freshness, "CURRENT");
  assert.equal(postCorrection.coverage, "COMPLETE");
  assert.equal(postCorrection.mandatory_source_count, 4);
  assert.equal(postCorrection.mandatory_sources_share_live_revision, true);
  assert.equal(postCorrection.conflict_count, 0);
  assert.equal(postCorrection.material_fields_share_live_revision, true);
  assert.equal(postCorrection.inference_indicator, "NOT_PRESENT_IN_AUTHENTICATED_RESPONSE");
  assert.equal(postCorrection.no_field_inference_confirmed, true);
  // F8 correction evidence is historical in the R1 record. Later Founder-authorized
  // authority updates may advance the committed RAP beyond that correction SHA;
  // assert live RAP self-consistency only (not eternal binding to the F8 revision).
  assert.equal(projection.freshness, "CURRENT");
  assert.equal(projection.coverage, "COMPLETE");
  assert.equal(projection.conflicts.length, 0);
  assert.ok(typeof projection.source_commit === "string" && projection.source_commit.length === 40);
  assert.ok(
    projection.sources.every(
      (source) =>
        source.requirement === "MANDATORY" &&
        source.expected_revision === projection.source_commit &&
        source.actual_revision === projection.source_commit
    )
  );
  assert.ok(
    Object.values(projection.payload.fields).every(
      (field) => field.source_commit === projection.source_commit
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
