import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  ProjectionGenerationError,
  SOURCE_DEFINITIONS,
  assertFullGitSha,
  buildProjection,
  serializeProjection
} from "../scripts/generate-repo-authority-projection.mjs";

const REPO_ROOT = new URL("../../../", import.meta.url);
const SOURCE_COMMIT = "93c75ed1b2c4d5e6f708192a3b4c5d6e7f8091ab";
const GENERATED_AT = "2026-07-19T10:00:00.000Z";

async function currentSourceDocuments() {
  const entries = await Promise.all(
    SOURCE_DEFINITIONS.map(async ({ source_path: sourcePath }) => [
      sourcePath,
      await readFile(new URL(sourcePath, REPO_ROOT), "utf8")
    ])
  );
  return Object.fromEntries(entries);
}

test("generator uses the exact mandatory Phase 1 source allow-list", () => {
  assert.deepEqual(
    SOURCE_DEFINITIONS.map((source) => source.source_path),
    [
      "docs/ops/HEDGR_STATUS.md",
      "AGENTS.md",
      "docs/decisions/SPRINT-2-ADR-INDEX.md",
      "docs/doctrine/HEDGR_ACTIVE_DOCTRINE_INDEX.md"
    ]
  );
});

test("identical source revision produces byte-identical current RAP output", async () => {
  const sourceDocuments = await currentSourceDocuments();
  const first = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments
  });
  const second = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments: structuredClone(sourceDocuments)
  });

  assert.equal(first.validation.ok, true);
  assert.equal(first.projection.freshness, "CURRENT");
  assert.equal(first.projection.coverage, "COMPLETE");
  assert.equal(first.projection.generated_at, "2026-07-19T00:00:00.000Z");
  assert.equal(serializeProjection(first.projection), serializeProjection(second.projection));
  assert.deepEqual(first.projection.payload.fields.active_ticket_ids.value, [
    "CLASS-A-VAL-002",
    "NARRATIVE-003"
  ]);
  assert.equal(first.projection.execution_authority, false);
  assert.equal(first.projection.mutation_allowed, false);
  assert.equal(first.projection.ticket_activation_allowed, false);
  assert.equal(first.projection.sequencing_allowed, false);
});

test("all material RAP fields carry the common source revision", async () => {
  const result = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments: await currentSourceDocuments()
  });

  for (const field of Object.values(result.projection.payload.fields)) {
    assert.equal(field.source_commit, SOURCE_COMMIT);
    assert.equal(field.source_path, "docs/ops/HEDGR_STATUS.md");
    assert.equal(field.source_classification, "REPO_AUTHORITY");
    assert.equal(field.freshness, "CURRENT");
    assert.ok(field.source_section.length > 0);
  }
  assert.ok(
    result.projection.sources.every(
      (source) =>
        source.expected_revision === SOURCE_COMMIT &&
        source.actual_revision === SOURCE_COMMIT
    )
  );
});

test("missing explicit active-ticket records fail instead of being inferred", async () => {
  const sourceDocuments = await currentSourceDocuments();
  sourceDocuments["docs/ops/HEDGR_STATUS.md"] = sourceDocuments[
    "docs/ops/HEDGR_STATUS.md"
  ].replace(/^\s*- \*\*Lane [^\n]+$/gm, "");

  assert.throws(
    () =>
      buildProjection({
        sourceCommit: SOURCE_COMMIT,
        generatedAt: GENERATED_AT,
        sourceDocuments
      }),
    (error) =>
      error instanceof ProjectionGenerationError &&
      /does not explicitly record any active Lane ticket/.test(error.message)
  );
});

test("authority disagreement is attributed and never resolved", async () => {
  const sourceDocuments = await currentSourceDocuments();
  sourceDocuments["AGENTS.md"] = sourceDocuments["AGENTS.md"].replaceAll(
    " and **`NARRATIVE-003`** (Lane N, customer one-pager + strategy index)",
    ""
  ).replaceAll(
    " and `NARRATIVE-003` (Lane N, customer one-pager + strategy index)",
    ""
  );

  const result = buildProjection({
    sourceCommit: SOURCE_COMMIT,
    generatedAt: GENERATED_AT,
    sourceDocuments
  });

  assert.equal(result.projection.freshness, "UNKNOWN");
  assert.equal(result.projection.coverage, "INSUFFICIENT");
  assert.equal(result.projection.conflicts.length, 1);
  assert.equal(result.projection.conflicts[0].resolved, false);
  assert.equal(
    result.projection.conflicts[0].stronger_source_path,
    "docs/ops/HEDGR_STATUS.md"
  );
  assert.equal(result.projection.conflicts[0].lower_source_path, "AGENTS.md");
  assert.match(result.projection.conflicts[0].non_resolution_statement, /does not resolve/i);
  assert.equal(result.validation.ok, false);
  assert.ok(
    result.validation.errors.some(
      (error) => error.code === "UNRESOLVED_AUTHORITY_CONFLICT"
    )
  );
});

test("revision identifiers fail closed unless they are full lowercase git SHAs", () => {
  for (const invalid of ["HEAD", "93c75ed", "A".repeat(40), "", "g".repeat(40)]) {
    assert.throws(() => assertFullGitSha(invalid), ProjectionGenerationError);
  }
  assert.doesNotThrow(() => assertFullGitSha(SOURCE_COMMIT));
});

test("generator implementation contains no discovery or external retrieval", async () => {
  const generator = await readFile(
    new URL("../scripts/generate-repo-authority-projection.mjs", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(generator, /\breaddir\b|\bglob\b|\bfetch\b|https?:\/\//i);
});
