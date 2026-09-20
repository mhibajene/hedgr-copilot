#!/usr/bin/env node
// Dormant Fork 2 preparation. A later explicit §7 activation and separately
// configured automation identity are both required before the workflow may run.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildProjection,
  OUTPUT_PATH,
  serializeProjection,
  SOURCE_DEFINITIONS
} from "../../apps/bridge-worker/scripts/generate-repo-authority-projection.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FULL_SHA = /^[0-9a-f]{40}$/;
const DATE_LINE = /^Last updated: \d{4}-\d{2}-\d{2}$/gm;
const METADATA_ONLY_PATHS = new Set(["AGENTS.md", "docs/ops/HEDGR_STATUS.md"]);
const SOURCE_PATHS = SOURCE_DEFINITIONS.map(({ source_path }) => source_path);
const ACTIVE_MARKER = "**Fork 2 operating status: ACTIVE**";

export class RebindError extends Error {
  constructor(message) {
    super(message);
    this.name = "RebindError";
  }
}

function requireCondition(condition, message) {
  if (!condition) throw new RebindError(message);
}

function git(root, ...args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 16 * 1024 * 1024
  }).trimEnd();
}

function sourceAt(root, revision, sourcePath) {
  return execFileSync("git", ["show", `${revision}:${sourcePath}`], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 16 * 1024 * 1024
  });
}

function commitTime(root, revision) {
  return git(root, "show", "-s", "--format=%cI", revision);
}

function readSources(root, revision) {
  return Object.fromEntries(
    SOURCE_PATHS.map((sourcePath) => [sourcePath, sourceAt(root, revision, sourcePath)])
  );
}

function normalizedDateOnly(source) {
  const matches = [...source.matchAll(DATE_LINE)];
  if (matches.length !== 1) return null;
  return source.replace(DATE_LINE, "Last updated: <date>");
}

export function classifyDocuments(before, after) {
  const changedPaths = SOURCE_PATHS.filter((sourcePath) =>
    before[sourcePath] !== after[sourcePath]
  );
  if (changedPaths.length === 0) {
    return { kind: "no_event", changedPaths, reason: "Mandatory-source content is identical." };
  }
  const metadataOnly = changedPaths.every((sourcePath) => {
    if (!METADATA_ONLY_PATHS.has(sourcePath)) return false;
    const previous = normalizedDateOnly(before[sourcePath]);
    const current = normalizedDateOnly(after[sourcePath]);
    return previous !== null && previous === current;
  });
  return metadataOnly
    ? {
        kind: "mechanical",
        changedPaths,
        reason: "Only the existing Last updated date line changed in each listed source."
      }
    : {
        kind: "review_required",
        changedPaths,
        reason: "Source changes exceed the exact metadata-only allowlist; materiality is not inferred."
      };
}

function validatedProjection(revision, documents, timestamp) {
  const result = buildProjection({
    sourceCommit: revision,
    generatedAt: timestamp,
    sourceDocuments: documents
  });
  requireCondition(
    result.validation.ok,
    `Mandatory authority context fails closed at ${revision}: ${result.validation.errors.map((error) => error.code).join(", ")}`
  );
  const projection = result.projection;
  requireCondition(
    projection.mode === "READ_ONLY" &&
      projection.execution_authority === false &&
      projection.mutation_allowed === false &&
      projection.ticket_activation_allowed === false &&
      projection.sequencing_allowed === false &&
      projection.freshness === "CURRENT" &&
      projection.coverage === "COMPLETE" &&
      projection.conflicts.length === 0 &&
      projection.sources.length === SOURCE_PATHS.length &&
      projection.sources.every((source) =>
        source.expected_revision === revision && source.actual_revision === revision
      ),
    "Generated projection lost a required read-only, common-revision, or fail-closed invariant."
  );
  return projection;
}

function assertLiveActivation(statusSource) {
  const start = statusSource.indexOf("## 7. Current sequence and active status");
  const end = statusSource.indexOf("\n## 7a.", start);
  requireCondition(start !== -1 && end > start, "Live §7 authority surface is missing.");
  requireCondition(
    statusSource.slice(start, end).split(ACTIVE_MARKER).length === 2,
    "Fork 2 lacks the single explicit ACTIVE marker in live §7; workflow remains dormant."
  );
}

export function planRebind(root = REPO_ROOT, { requireActive = false } = {}) {
  const head = git(root, "rev-parse", "HEAD");
  const observedMain = git(root, "rev-parse", "refs/remotes/origin/main");
  requireCondition(FULL_SHA.test(head) && head === observedMain, "HEAD is not the observed permanent-main revision.");
  requireCondition(git(root, "rev-parse", "--is-shallow-repository") === "false", "Shallow history cannot prove permanent-main ancestry.");
  const dirty = git(root, "status", "--porcelain", "--", ...SOURCE_PATHS, OUTPUT_PATH);
  requireCondition(dirty.length === 0, "Mandatory source or RAP working tree differs from committed main.");

  const artifactText = readFileSync(path.join(root, OUTPUT_PATH), "utf8");
  requireCondition(
    artifactText === sourceAt(root, head, OUTPUT_PATH),
    "RAP working file differs from the permanent-main artifact."
  );
  let artifact;
  try {
    artifact = JSON.parse(artifactText);
  } catch {
    throw new RebindError("RAP artifact is not valid JSON.");
  }
  const bound = artifact.source_commit;
  requireCondition(FULL_SHA.test(bound), "RAP source_commit is not an immutable full SHA.");
  try {
    git(root, "merge-base", "--is-ancestor", bound, head);
  } catch {
    throw new RebindError("RAP source_commit is not verified in permanent-main ancestry.");
  }

  const before = readSources(root, bound);
  const after = readSources(root, head);
  for (const sourcePath of SOURCE_PATHS) {
    requireCondition(
      readFileSync(path.join(root, sourcePath), "utf8") === after[sourcePath],
      `${sourcePath} working content differs from permanent main.`
    );
  }
  const oldProjection = validatedProjection(bound, before, commitTime(root, bound));
  requireCondition(
    artifactText === serializeProjection(oldProjection),
    "RAP artifact does not match deterministic generation for its bound sources."
  );
  if (requireActive) assertLiveActivation(after["docs/ops/HEDGR_STATUS.md"]);

  const classification = classifyDocuments(before, after);
  if (classification.kind !== "no_event") {
    validatedProjection(head, after, commitTime(root, head));
  }
  return {
    ...classification,
    source_commit: bound,
    target_commit: head,
    branch: `codex/rap-rebind-${head.slice(0, 12)}`
  };
}

export function writeRebind(root = REPO_ROOT, { requireActive = false } = {}) {
  const plan = planRebind(root, { requireActive });
  requireCondition(plan.kind === "mechanical", "Only a proven metadata-only change may be mechanically rebound.");
  const currentSources = readSources(root, plan.target_commit);
  const projection = validatedProjection(
    plan.target_commit,
    currentSources,
    commitTime(root, plan.target_commit)
  );
  const serialized = serializeProjection(projection);
  writeFileSync(path.join(root, OUTPUT_PATH), serialized);
  return {
    ...plan,
    artifact_sha256: createHash("sha256").update(serialized).digest("hex")
  };
}

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--write") ? "write" : "plan";
  requireCondition(args.every((arg) => ["--plan", "--write", "--require-active"].includes(arg)), "Unsupported argument.");
  requireCondition(!(args.includes("--plan") && args.includes("--write")), "Choose plan or write.");
  const options = { requireActive: args.includes("--require-active") };
  const result = mode === "write"
    ? writeRebind(REPO_ROOT, options)
    : planRebind(REPO_ROOT, options);
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.name}: ${error.message}\n`);
    process.exitCode = 1;
  }
}
