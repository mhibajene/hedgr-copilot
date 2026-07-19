import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  generateFromGit,
  serializeProjection
} from "../scripts/generate-repo-authority-projection.mjs";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);
const ARTIFACT_PATH = path.join(
  REPO_ROOT,
  "docs/ops/bridge/repo-authority-projection.json"
);

test("committed RAP matches deterministic generation for its immutable source revision", async () => {
  const artifactText = await readFile(ARTIFACT_PATH, "utf8");
  const artifact = JSON.parse(artifactText);
  const result = await generateFromGit({
    repoRoot: REPO_ROOT,
    requestedCommit: artifact.source_commit
  });

  assert.equal(result.validation.ok, true);
  assert.equal(artifact.freshness, "CURRENT");
  assert.equal(artifact.coverage, "COMPLETE");
  assert.equal(artifact.conflicts.length, 0);
  assert.equal(artifact.execution_authority, false);
  assert.equal(artifact.mutation_allowed, false);
  assert.equal(artifact.ticket_activation_allowed, false);
  assert.equal(artifact.sequencing_allowed, false);
  assert.equal(artifactText, serializeProjection(result.projection));
});
