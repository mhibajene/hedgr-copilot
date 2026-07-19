import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import {
  SOURCE_DEFINITIONS,
  buildProjection,
  generateFromGit,
  serializeProjection
} from "../scripts/generate-repo-authority-projection.mjs";

const execFile = promisify(execFileCallback);

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);
const ARTIFACT_PATH = path.join(
  REPO_ROOT,
  "docs/ops/bridge/repo-authority-projection.json"
);

async function hasCommit(sourceCommit) {
  try {
    await execFile("git", ["cat-file", "-e", `${sourceCommit}^{commit}`], {
      cwd: REPO_ROOT
    });
    return true;
  } catch {
    return false;
  }
}

async function currentSourceDocuments() {
  const entries = await Promise.all(
    SOURCE_DEFINITIONS.map(async ({ source_path: sourcePath }) => [
      sourcePath,
      await readFile(path.join(REPO_ROOT, sourcePath), "utf8")
    ])
  );
  return Object.fromEntries(entries);
}

test("committed RAP matches deterministic generation for its immutable source revision", async (t) => {
  const artifactText = await readFile(ARTIFACT_PATH, "utf8");
  const artifact = JSON.parse(artifactText);
  const historicalCommitAvailable = await hasCommit(artifact.source_commit);
  const result = historicalCommitAvailable
    ? await generateFromGit({
        repoRoot: REPO_ROOT,
        requestedCommit: artifact.source_commit
      })
    : buildProjection({
        sourceCommit: artifact.source_commit,
        generatedAt: artifact.generated_at,
        sourceDocuments: await currentSourceDocuments()
      });

  if (!historicalCommitAvailable) {
    t.diagnostic(
      "Historical source commit is unavailable in this shallow checkout; verified byte equality from the exact current source allow-list."
    );
  }

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
