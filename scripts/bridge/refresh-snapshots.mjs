#!/usr/bin/env node
// Bridge snapshot automation is repo-side only. It refreshes static JSON files
// and must not add runtime repo scanning to the Cloudflare Worker.
//
// Discovery rules:
// - Weekly reviews must match docs/ops/reviews/weekly/YYYY-MM-DD-weekly-review.md;
//   the latest non-future filename date wins.
// - MVP process reviews must match HEDGR_MVP_PROCESS_REVIEW*.md; the latest
//   non-future "Last updated: YYYY-MM-DD" value wins, with lexicographic path
//   ordering as a deterministic tie-break.
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const NON_AUTHORIZATION_STATEMENT =
  "This snapshot is evidence/retrieval only. It does not authorize implementation, sequencing, ticket activation, or repo mutation.";

const BRIDGE_DIR = "docs/ops/bridge";
const WEEKLY_DIR = "docs/ops/reviews/weekly";
const MVP_DIR = "docs/ops/reviews/MVP";

const GENERATED_SNAPSHOTS = Object.freeze({
  latestWeekly: "docs/ops/bridge/latest-weekly-review.json",
  latestMvpProcess: "docs/ops/bridge/latest-mvp-process-review.json",
  reviewIndex: "docs/ops/bridge/review-index.json"
});

const REQUIRED_FALSE_GUARDRAILS = Object.freeze([
  "execution_authority",
  "may_activate_ticket",
  "mutation_allowed",
  "ticket_activation_allowed"
]);

const PROHIBITED_KEYS = Object.freeze([
  "recommended_next_ticket",
  "next_ticket",
  "priority",
  "sequencing",
  "implementation_ready",
  "approved",
  "selected",
  "provider_selected",
  "market_selected",
  "class_b_ready",
  "class_c_ready"
]);

class BridgeSnapshotError extends Error {
  constructor(message) {
    super(message);
    this.name = "BridgeSnapshotError";
  }
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function repoPath(root, relativePath) {
  return path.join(root, ...relativePath.split("/"));
}

function readText(root, relativePath) {
  return fs.readFileSync(repoPath(root, relativePath), "utf8");
}

function writeText(root, relativePath, contents) {
  fs.mkdirSync(path.dirname(repoPath(root, relativePath)), { recursive: true });
  fs.writeFileSync(repoPath(root, relativePath), contents);
}

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function parseIsoDateOnly(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new BridgeSnapshotError(`${label} is not a YYYY-MM-DD date: ${value}`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new BridgeSnapshotError(`${label} is not a valid date: ${value}`);
  }

  return value;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function assertNotFuture(dateValue, today, label) {
  if (dateValue > today) {
    throw new BridgeSnapshotError(`${label} is future-dated: ${dateValue}`);
  }
}

function generatedAt(dateValue) {
  return `${dateValue}T00:00:00.000Z`;
}

function listFilesRecursive(root, relativeDir) {
  const absoluteDir = repoPath(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = toPosixPath(path.relative(root, absolutePath));
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(root, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

function discoverLatestWeeklyReview(root, today = todayIsoDate()) {
  const files = listFilesRecursive(root, WEEKLY_DIR).filter((file) => file.endsWith(".md"));
  if (files.length === 0) {
    throw new BridgeSnapshotError(`No weekly review files found under ${WEEKLY_DIR}`);
  }

  const reviews = [];
  for (const file of files) {
    const basename = path.posix.basename(file);
    const match = basename.match(/^(\d{4}-\d{2}-\d{2})-weekly-review\.md$/);
    if (!match) {
      throw new BridgeSnapshotError(`Malformed weekly review filename: ${file}`);
    }

    const dateValue = parseIsoDateOnly(match[1], `Weekly review date for ${file}`);
    assertNotFuture(dateValue, today, `Weekly review ${file}`);
    reviews.push({ date: dateValue, sourcePath: file });
  }

  return reviews.sort((a, b) => a.date.localeCompare(b.date) || a.sourcePath.localeCompare(b.sourcePath)).at(-1);
}

function extractLastUpdated(root, sourcePath) {
  const text = readText(root, sourcePath);
  const match = text.match(/^Last updated:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
  if (!match) {
    throw new BridgeSnapshotError(`Missing Last updated date in MVP process review: ${sourcePath}`);
  }

  return parseIsoDateOnly(match[1], `Last updated date for ${sourcePath}`);
}

function discoverLatestMvpProcessReview(root, today = todayIsoDate()) {
  const files = listFilesRecursive(root, MVP_DIR).filter((file) =>
    /^HEDGR_MVP_PROCESS_REVIEW.*\.md$/.test(path.posix.basename(file))
  );

  if (files.length === 0) {
    throw new BridgeSnapshotError(`No MVP process review files found under ${MVP_DIR}`);
  }

  const reviews = files.map((file) => {
    const dateValue = extractLastUpdated(root, file);
    assertNotFuture(dateValue, today, `MVP process review ${file}`);
    return { date: dateValue, sourcePath: file };
  });

  return reviews.sort((a, b) => a.date.localeCompare(b.date) || a.sourcePath.localeCompare(b.sourcePath)).at(-1);
}

function buildLatestWeeklySnapshot(review) {
  return {
    artifact_type: "hedgrops_bridge_latest_weekly_review_snapshot",
    generated_at: generatedAt(review.date),
    source_path: review.sourcePath,
    authority_posture: {
      class: "A",
      mode: "READ_ONLY",
      review_posture: "non_authoritative_evidence_only",
      bridge_role: "evidence_retrieval_only"
    },
    non_authorization_statement: NON_AUTHORIZATION_STATEMENT,
    execution_authority: false,
    may_activate_ticket: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    review: {
      review_type: "weekly",
      evidence_only: true,
      non_authoritative_evidence_only: true,
      next_ticket_proposals: false,
      sequencing_recommendations: false,
      activation_language: false
    }
  };
}

function buildLatestMvpProcessSnapshot(review) {
  return {
    artifact_type: "hedgrops_bridge_latest_mvp_process_review_snapshot",
    generated_at: generatedAt(review.date),
    source_path: review.sourcePath,
    authority_posture: {
      class: "A",
      mode: "READ_ONLY",
      review_posture: "non_authoritative_evidence_only",
      bridge_role: "evidence_retrieval_only"
    },
    non_authorization_statement: NON_AUTHORIZATION_STATEMENT,
    execution_authority: false,
    may_activate_ticket: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    review: {
      review_type: "mvp_process",
      evidence_only: true,
      non_authoritative_evidence_only: true,
      implementation_recommendations: false,
      authority_inference: false,
      blocker_closure_inference: false
    }
  };
}

function buildReviewIndexSnapshot(weeklyReview, mvpReview) {
  const latestDate = [weeklyReview.date, mvpReview.date].sort().at(-1);

  return {
    artifact_type: "hedgrops_bridge_review_index_snapshot",
    generated_at: generatedAt(latestDate),
    source_path: "docs/ops/reviews/README.md",
    authority_posture: {
      class: "A",
      mode: "READ_ONLY",
      index_posture: "evidence_discovery_only",
      bridge_role: "evidence_retrieval_only"
    },
    non_authorization_statement: NON_AUTHORIZATION_STATEMENT,
    execution_authority: false,
    may_activate_ticket: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    index: {
      evidence_discovery_only: true,
      review_ranking: false,
      review_prioritization: false,
      review_interpretation: false,
      entries: [
        {
          review_type: "weekly",
          source_path: weeklyReview.sourcePath
        },
        {
          review_type: "mvp_process",
          source_path: mvpReview.sourcePath
        }
      ]
    }
  };
}

function buildExpectedSnapshots(root, options = {}) {
  const today = options.today ?? todayIsoDate();
  const weeklyReview = discoverLatestWeeklyReview(root, today);
  const mvpReview = discoverLatestMvpProcessReview(root, today);

  return {
    reviews: {
      weekly: weeklyReview,
      mvpProcess: mvpReview
    },
    files: {
      [GENERATED_SNAPSHOTS.latestWeekly]: buildLatestWeeklySnapshot(weeklyReview),
      [GENERATED_SNAPSHOTS.latestMvpProcess]: buildLatestMvpProcessSnapshot(mvpReview),
      [GENERATED_SNAPSHOTS.reviewIndex]: buildReviewIndexSnapshot(weeklyReview, mvpReview)
    }
  };
}

function parseJsonFile(root, relativePath) {
  try {
    return JSON.parse(readText(root, relativePath));
  } catch (error) {
    throw new BridgeSnapshotError(`Invalid JSON in ${relativePath}: ${error.message}`);
  }
}

function assertSourceExists(root, sourcePath, context) {
  if (typeof sourcePath !== "string" || sourcePath.length === 0) {
    throw new BridgeSnapshotError(`${context} has missing source_path`);
  }

  if (!fs.existsSync(repoPath(root, sourcePath))) {
    throw new BridgeSnapshotError(`${context} source_path points to missing file: ${sourcePath}`);
  }
}

function assertGeneratedAt(value, context) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/.test(value)) {
    throw new BridgeSnapshotError(`${context} generated_at must be deterministic ISO midnight UTC`);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date.toISOString() !== value) {
    throw new BridgeSnapshotError(`${context} generated_at is invalid: ${value}`);
  }
}

function visitObjectKeys(value, callback, pathParts = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visitObjectKeys(item, callback, [...pathParts, String(index)]));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    callback(key, child, [...pathParts, key]);
    visitObjectKeys(child, callback, [...pathParts, key]);
  }
}

function assertNoProhibitedKeys(snapshot, relativePath) {
  visitObjectKeys(snapshot, (key, _value, pathParts) => {
    if (PROHIBITED_KEYS.includes(key)) {
      throw new BridgeSnapshotError(
        `${relativePath} contains prohibited authority field: ${pathParts.join(".")}`
      );
    }
  });
}

function assertSnapshotGuardrails(snapshot, relativePath) {
  for (const key of REQUIRED_FALSE_GUARDRAILS) {
    if (!(key in snapshot)) {
      throw new BridgeSnapshotError(`${relativePath} is missing required guardrail: ${key}`);
    }
    if (snapshot[key] !== false) {
      throw new BridgeSnapshotError(`${relativePath} weakens required guardrail: ${key} must be false`);
    }
  }

  if (snapshot.non_authorization_statement !== NON_AUTHORIZATION_STATEMENT) {
    throw new BridgeSnapshotError(`${relativePath} has missing or changed non-authorization statement`);
  }
}

function validateSnapshotObject(root, relativePath, snapshot) {
  assertGeneratedAt(snapshot.generated_at, relativePath);
  assertNoProhibitedKeys(snapshot, relativePath);
  assertSnapshotGuardrails(snapshot, relativePath);

  if (snapshot.source_path) {
    assertSourceExists(root, snapshot.source_path, relativePath);
  }

  if (snapshot.index?.entries) {
    for (const [index, entry] of snapshot.index.entries.entries()) {
      assertSourceExists(root, entry.source_path, `${relativePath} index.entries[${index}]`);
    }
  }
}

function validateCommittedBridgeSnapshots(root) {
  const files = listFilesRecursive(root, BRIDGE_DIR).filter((file) => file.endsWith(".json"));
  if (files.length === 0) {
    throw new BridgeSnapshotError(`No bridge snapshot JSON files found under ${BRIDGE_DIR}`);
  }

  for (const file of files) {
    validateSnapshotObject(root, file, parseJsonFile(root, file));
  }
}

function compareSnapshots(root, expected) {
  const mismatches = [];

  for (const [relativePath, snapshot] of Object.entries(expected.files)) {
    const expectedText = formatJson(snapshot);
    let actualText = "";
    try {
      actualText = readText(root, relativePath);
    } catch {
      mismatches.push(`${relativePath} is missing`);
      continue;
    }

    if (actualText !== expectedText) {
      mismatches.push(`${relativePath} differs from generated output`);
    }
  }

  return mismatches;
}

function checkSnapshots(root, options = {}) {
  const expected = buildExpectedSnapshots(root, options);
  validateCommittedBridgeSnapshots(root);

  for (const [relativePath, snapshot] of Object.entries(expected.files)) {
    validateSnapshotObject(root, relativePath, snapshot);
  }

  const mismatches = compareSnapshots(root, expected);
  if (mismatches.length > 0) {
    const weeklyActual = fs.existsSync(repoPath(root, GENERATED_SNAPSHOTS.latestWeekly))
      ? parseJsonFile(root, GENERATED_SNAPSHOTS.latestWeekly).source_path
      : "<missing>";
    throw new BridgeSnapshotError(
      [
        "Bridge snapshot stale or nondeterministic:",
        `  Latest weekly review: ${expected.reviews.weekly.sourcePath}`,
        `  Snapshot points to:   ${weeklyActual}`,
        "",
        ...mismatches.map((item) => `  - ${item}`),
        "",
        "Run:",
        "  pnpm bridge:snapshots:refresh"
      ].join("\n")
    );
  }

  return expected;
}

function writeSnapshots(root, options = {}) {
  const expected = buildExpectedSnapshots(root, options);

  for (const [relativePath, snapshot] of Object.entries(expected.files)) {
    validateSnapshotObject(root, relativePath, snapshot);
    writeText(root, relativePath, formatJson(snapshot));
  }

  return expected;
}

function parseArgs(argv) {
  const args = {
    mode: null,
    root: process.cwd(),
    today: undefined
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--write") {
      args.mode = "write";
    } else if (arg === "--check") {
      args.mode = "check";
    } else if (arg === "--root") {
      args.root = path.resolve(argv[++index]);
    } else if (arg === "--today") {
      args.today = parseIsoDateOnly(argv[++index], "--today");
    } else {
      throw new BridgeSnapshotError(`Unknown argument: ${arg}`);
    }
  }

  if (!args.mode) {
    throw new BridgeSnapshotError("Expected --write or --check");
  }

  return args;
}

function runCli(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);

  if (args.mode === "write") {
    const result = writeSnapshots(args.root, { today: args.today });
    console.log("Bridge snapshots refreshed:");
    console.log(`  Weekly: ${result.reviews.weekly.sourcePath}`);
    console.log(`  MVP:    ${result.reviews.mvpProcess.sourcePath}`);
    return;
  }

  const result = checkSnapshots(args.root, { today: args.today });
  console.log("Bridge snapshots fresh:");
  console.log(`  Weekly: ${result.reviews.weekly.sourcePath}`);
  console.log(`  MVP:    ${result.reviews.mvpProcess.sourcePath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    runCli();
  } catch (error) {
    if (error instanceof BridgeSnapshotError) {
      console.error(error.message);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}

export {
  BridgeSnapshotError,
  buildExpectedSnapshots,
  checkSnapshots,
  discoverLatestMvpProcessReview,
  discoverLatestWeeklyReview,
  formatJson,
  writeSnapshots
};
