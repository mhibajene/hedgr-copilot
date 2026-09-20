import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildProjection,
  OUTPUT_PATH,
  serializeProjection,
  SOURCE_DEFINITIONS
} from "../../apps/bridge-worker/scripts/generate-repo-authority-projection.mjs";
import { planRebind, RebindError, writeRebind } from "./rap-provenance-rebind.mjs";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_PATHS = SOURCE_DEFINITIONS.map(({ source_path }) => source_path);

function git(root, ...args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function write(root, relativePath, contents) {
  const absolute = path.join(root, relativePath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, contents);
}

function updateMain(root) {
  git(root, "update-ref", "refs/remotes/origin/main", "HEAD");
}

function commit(root, message) {
  git(root, "add", "-A");
  git(root, "commit", "-qm", message);
  updateMain(root);
}

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "hedgr-rap-rebind-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  git(root, "init", "-q");
  git(root, "config", "user.name", "RAP fixture");
  git(root, "config", "user.email", "rap-fixture@example.invalid");
  for (const sourcePath of SOURCE_PATHS) {
    const target = path.join(root, sourcePath);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(PROJECT_ROOT, sourcePath), target);
  }
  commit(root, "mandatory sources");
  const sourceCommit = git(root, "rev-parse", "HEAD");
  const sourceDocuments = Object.fromEntries(SOURCE_PATHS.map((sourcePath) => [
    sourcePath,
    readFileSync(path.join(root, sourcePath), "utf8")
  ]));
  const projection = buildProjection({
    sourceCommit,
    generatedAt: git(root, "show", "-s", "--format=%cI", sourceCommit),
    sourceDocuments
  });
  assert.equal(projection.validation.ok, true);
  write(root, OUTPUT_PATH, serializeProjection(projection.projection));
  commit(root, "source-bound RAP");
  return { root, sourceCommit };
}

function amend(root, sourcePath, change, message = "change source") {
  const absolute = path.join(root, sourcePath);
  writeFileSync(absolute, change(readFileSync(absolute, "utf8")));
  commit(root, message);
}

test("no mandatory-source change creates no RAP event, including after delivery", (t) => {
  const { root } = fixture(t);
  assert.equal(planRebind(root).kind, "no_event");
  write(root, "docs/ops/governance/delivery-note.md", "non-authoritative delivery evidence\n");
  commit(root, "delivery only");
  assert.equal(planRebind(root).kind, "no_event");
});

test("a committed metadata-only mandatory-source change plans a main-bound mechanical rebind", (t) => {
  const { root, sourceCommit } = fixture(t);
  amend(root, "AGENTS.md", (content) => content.replace(
    "Last updated: 2026-09-20", "Last updated: 2026-09-21"
  ));
  const result = planRebind(root);
  assert.equal(result.kind, "mechanical");
  assert.deepEqual(result.changedPaths, ["AGENTS.md"]);
  assert.equal(result.source_commit, sourceCommit);
  assert.equal(result.target_commit, git(root, "rev-parse", "HEAD"));
  assert.match(result.branch, /^codex\/rap-rebind-[0-9a-f]{12}$/);
});

test("mechanical write is deterministic, read-only and becomes a no-event merge", (t) => {
  const { root } = fixture(t);
  amend(root, "docs/ops/HEDGR_STATUS.md", (content) => content.replace(
    "Last updated: 2026-09-20", "Last updated: 2026-09-21"
  ));
  const target = git(root, "rev-parse", "HEAD");
  const result = writeRebind(root);
  const rebound = readFileSync(path.join(root, OUTPUT_PATH), "utf8");
  const projection = JSON.parse(rebound);
  assert.equal(result.target_commit, target);
  assert.match(result.artifact_sha256, /^[0-9a-f]{64}$/);
  assert.equal(projection.source_commit, target);
  assert.equal(projection.freshness, "CURRENT");
  assert.equal(projection.execution_authority, false);
  assert.equal(projection.mutation_allowed, false);
  assert.equal(projection.ticket_activation_allowed, false);
  assert.equal(projection.sequencing_allowed, false);
  assert.deepEqual(projection.conflicts, []);
  assert.ok(projection.sources.every((source) => source.actual_revision === target));
  commit(root, "mechanical artifact only");
  assert.equal(planRebind(root).kind, "no_event");
});

test("authority text and accepted-index changes return to review instead of self-classifying", (t) => {
  const { root } = fixture(t);
  amend(root, "AGENTS.md", (content) => content.replace(
    "No standing delegation follows.", "No standing delegation follows. New authority is proposed."
  ));
  assert.equal(planRebind(root).kind, "review_required");
  amend(root, "docs/decisions/SPRINT-2-ADR-INDEX.md", (content) => `${content}\n<!-- changed index -->\n`);
  assert.equal(planRebind(root).kind, "review_required");
});

test("conflicting current sources fail closed even when change otherwise returns to review", (t) => {
  const { root } = fixture(t);
  amend(root, "AGENTS.md", (content) => content.replace(
    /^(Current parallelism posture:.*)CLASS-A-VAL-002/m,
    "$1NARRATIVE-007"
  ));
  assert.throws(() => planRebind(root), /fail|conflict|inconsistent/i);
});

test("mismatched RAP bytes, unbound revision and dirty mandatory source fail closed", (t) => {
  const { root } = fixture(t);
  const artifactPath = path.join(root, OUTPUT_PATH);
  const valid = readFileSync(artifactPath, "utf8");
  writeFileSync(artifactPath, valid.replace('"freshness": "CURRENT"', '"freshness": "UNKNOWN"'));
  commit(root, "tamper RAP");
  assert.throws(() => planRebind(root), /does not match deterministic generation/);

  writeFileSync(artifactPath, valid.replace(/"source_commit": "[0-9a-f]{40}"/, `"source_commit": "${"a".repeat(40)}"`));
  commit(root, "unbound RAP");
  assert.throws(() => planRebind(root), /not verified in permanent-main ancestry/);

  writeFileSync(artifactPath, valid);
  commit(root, "restore RAP");
  writeFileSync(path.join(root, "AGENTS.md"), `${readFileSync(path.join(root, "AGENTS.md"), "utf8")}\n`);
  assert.throws(() => planRebind(root), /working tree differs/);
});

test("the dormant workflow rejects an unrecorded ACTIVE state", (t) => {
  const { root } = fixture(t);
  assert.throws(
    () => planRebind(root, { requireActive: true }),
    (error) => error instanceof RebindError && /remains dormant/.test(error.message)
  );
});
