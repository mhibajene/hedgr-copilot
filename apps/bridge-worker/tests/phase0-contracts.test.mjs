import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  classifyConflict,
  compareSourcePrecedence,
  evaluateSourceManifest,
  policy,
  semanticStringify,
  validateConflict,
  validateResponseEnvelope,
  validateSourceManifestStructure
} from "../contracts/phase0/validate.mjs";
import {
  GENERATED_AT,
  SOURCE_COMMIT,
  authoritySources,
  conflict,
  invalidFixtures,
  partialSupportingEvidence,
  repoAuthorityProjection,
  validFixtures
} from "./fixtures/phase0-contract-fixtures.mjs";

const CONTRACT_ROOT = new URL("../contracts/phase0/", import.meta.url);

async function readJson(name) {
  return JSON.parse(await readFile(new URL(name, CONTRACT_ROOT), "utf8"));
}

test("all valid Phase 0 fixtures pass deterministic validation", () => {
  for (const fixture of validFixtures) {
    const first = validateResponseEnvelope(fixture.value);
    const second = validateResponseEnvelope(structuredClone(fixture.value));
    assert.equal(first.ok, true, fixture.name);
    assert.deepEqual(first, second, fixture.name);
  }
});

test("all fail-closed fixtures reject with their required deterministic error", () => {
  for (const fixture of invalidFixtures) {
    const first = validateResponseEnvelope(fixture.value);
    const second = validateResponseEnvelope(structuredClone(fixture.value));
    assert.equal(first.ok, false, fixture.name);
    assert.ok(
      first.errors.some((error) => error.code === fixture.expectedCode),
      `${fixture.name}: expected ${fixture.expectedCode}, received ${first.errors
        .map((error) => error.code)
        .join(", ")}`
    );
    assert.deepEqual(first, second, fixture.name);
    assert.ok(first.errors.every((error) => error.authorizing === false));
    assert.ok(first.errors.every((error) => error.freshness === "UNKNOWN"));
    assert.ok(first.errors.every((error) => error.coverage === "INSUFFICIENT"));
  }
});

test("initial authority manifest is a declaration, not a false completeness claim", async () => {
  const manifest = await readJson("initial-authority-source-manifest.json");
  const structure = validateSourceManifestStructure(manifest);
  const evaluation = evaluateSourceManifest(manifest);

  assert.equal(structure.ok, true);
  assert.equal(manifest.common_source_revision, null);
  assert.ok(manifest.sources.every((source) => source.inclusion_status === "NOT_EVALUATED"));
  assert.ok(manifest.sources.some((source) => source.source_role === "ACCEPTED_ADR_INDEX"));
  assert.ok(
    manifest.sources.some((source) => source.source_role.startsWith("ACTIVE_DOCTRINE_SET_"))
  );
  assert.equal(evaluation.ok, false);
  assert.equal(evaluation.freshness, "UNKNOWN");
  assert.equal(evaluation.coverage, "INSUFFICIENT");
  assert.ok(
    evaluation.errors.some((error) => error.code === "MISSING_MANDATORY_SOURCE")
  );
});

test("optional source omission is explicit PARTIAL coverage, not plausible completeness", () => {
  const fixture = partialSupportingEvidence();
  const result = validateResponseEnvelope(fixture);
  assert.equal(result.ok, true);
  assert.equal(result.coverage, "PARTIAL");
  assert.ok(fixture.sources.some((source) => source.inclusion_status === "OMITTED"));
});

test("source precedence is deterministic and classifies without resolving", () => {
  const status = {
    source_path: "docs/ops/HEDGR_STATUS.md",
    source_role: "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY",
    source_section: "§7",
    source_commit: SOURCE_COMMIT,
    source_classification: "REPO_AUTHORITY"
  };
  const review = {
    source_path: "docs/ops/reviews/weekly/2026-07-10-weekly-review.md",
    source_role: "WEEKLY_REVIEW",
    source_section: "Current status",
    source_commit: SOURCE_COMMIT,
    source_classification: "REVIEW_EVIDENCE"
  };

  assert.ok(compareSourcePrecedence(status, review) < 0);
  assert.ok(compareSourcePrecedence(review, status) > 0);

  const precedenceRoles = [
    "SUPPORTING_ARTIFACT",
    "WEEKLY_REVIEW",
    "PRODUCT_EVIDENCE",
    "ACTIVE_GOVERNANCE_REGISTER",
    "ACTIVE_DOCTRINE_SET_CONSTITUTIONAL_CHARTER",
    "ACCEPTED_ADR_INDEX",
    "REPO_EXECUTION_CONTRACT",
    "CURRENT_SEQUENCE_AND_ACTIVE_AUTHORITY"
  ];
  const orderedRoles = precedenceRoles
    .map((source_role) => ({ source_role }))
    .sort(compareSourcePrecedence)
    .map((item) => item.source_role);
  assert.deepEqual(orderedRoles, [...precedenceRoles].reverse());

  const first = classifyConflict({
    stronger: review,
    lower: status,
    concept: "repo.active_ticket_ids",
    description: "Conflict remains unresolved.",
    detectedAt: "2026-07-16T00:00:00.000Z"
  });
  const laterDetection = classifyConflict({
    stronger: status,
    lower: review,
    concept: "repo.active_ticket_ids",
    description: "Conflict remains unresolved.",
    detectedAt: "2026-07-17T00:00:00.000Z"
  });

  assert.equal(first.stronger_source_path, "docs/ops/HEDGR_STATUS.md");
  assert.equal(first.lower_source_path, review.source_path);
  assert.equal(first.resolved, false);
  assert.match(first.non_resolution_statement, /does not resolve/i);
  assert.equal(first.conflict_id, laterDetection.conflict_id);
  assert.equal(validateConflict(first).length, 0);
  assert.equal(validateConflict(laterDetection).length, 0);
});

test("conflict identity and semantic output are stable while timestamps are non-semantic", () => {
  assert.equal(validateConflict(conflict).length, 0);

  const first = repoAuthorityProjection();
  const second = structuredClone(first);
  second.generated_at = "2026-07-16T23:59:59.000Z";
  second.sources.reverse();

  assert.equal(semanticStringify(first), semanticStringify(second));
});

test("material provenance is bound to the common source revision", () => {
  const fixture = repoAuthorityProjection();
  fixture.payload.fields.active_ticket_ids.source_commit = "mixed-revision";
  const result = validateResponseEnvelope(fixture);

  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "REVISION_MISMATCH"));
});

test("machine-readable policy and schemas preserve closed enums", async () => {
  const envelopeSchema = await readJson("response-envelope.schema.json");
  const provenanceSchema = await readJson("provenance.schema.json");
  const errorSchema = await readJson("fail-closed-error.schema.json");

  assert.deepEqual(envelopeSchema.properties.authority_class.enum, policy.authority_classes);
  assert.deepEqual(envelopeSchema.properties.freshness.enum, policy.freshness);
  assert.deepEqual(envelopeSchema.properties.coverage.enum, policy.coverage);
  assert.deepEqual(
    provenanceSchema.properties.source_classification.enum,
    policy.source_classifications
  );
  assert.equal(errorSchema.properties.authorizing.const, false);
  assert.equal(policy.freshness_policy.ttl_seconds, null);
  assert.equal(policy.freshness_policy.ttl_status, "UNRESOLVED_CONFIGURATION");
});

test("source ordering and enum rendering remain stable", () => {
  const first = evaluateSourceManifest({
    manifest_id: "ordered",
    revision_policy: "COMMON_SOURCE_REVISION_REQUIRED",
    common_source_revision: SOURCE_COMMIT,
    freshness_policy_reference: "phase0-policy.json#/freshness_policy",
    sources: structuredClone(authoritySources)
  });
  const second = evaluateSourceManifest({
    manifest_id: "reversed",
    revision_policy: "COMMON_SOURCE_REVISION_REQUIRED",
    common_source_revision: SOURCE_COMMIT,
    freshness_policy_reference: "phase0-policy.json#/freshness_policy",
    sources: structuredClone([...authoritySources].reverse())
  });

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.deepEqual(first.sources, second.sources);
  assert.deepEqual(
    first.sources.map((source) => source.source_path),
    [...first.sources.map((source) => source.source_path)].sort()
  );
  assert.deepEqual(policy.freshness, ["CURRENT", "STALE", "UNKNOWN"]);
  assert.deepEqual(policy.coverage, ["COMPLETE", "PARTIAL", "INSUFFICIENT"]);
});

test("Phase 0 contracts are not imported by the live Worker", async () => {
  const workerSource = await readFile(
    new URL("../src/index.js", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(workerSource, /contracts\/phase0|validate\.mjs/);
});

test("fixtures contain no secrets, credentials, user data, or financial data", () => {
  const serialized = JSON.stringify({ validFixtures, invalidFixtures });
  assert.doesNotMatch(serialized, /api[_-]?key|password|secret|private[_-]?key/i);
  assert.doesNotMatch(serialized, /email|phone|account[_-]?number|customer[_-]?balance/i);
  assert.equal(GENERATED_AT, "2026-07-16T00:00:00.000Z");
});
