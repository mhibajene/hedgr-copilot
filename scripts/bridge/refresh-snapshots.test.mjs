import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  BridgeSnapshotError,
  checkSnapshots,
  discoverLatestWeeklyReview,
  writeSnapshots
} from "./refresh-snapshots.mjs";

const TODAY = "2026-06-26";

function writeFile(root, relativePath, contents = "") {
  const absolutePath = path.join(root, ...relativePath.split("/"));
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, contents);
}

function writeJson(root, relativePath, value) {
  writeFile(root, relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, ...relativePath.split("/")), "utf8"));
}

function makeRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "hedgr-bridge-snapshots-"));

  writeFile(root, "docs/ops/HEDGR_STATUS.md", "# status\n");
  writeFile(root, "docs/ops/reviews/README.md", "# reviews\n");
  writeFile(root, "docs/ops/reviews/weekly/2026-06-20-weekly-review.md", "# 2026-06-20 Weekly Review\n");
  writeFile(root, "docs/ops/reviews/weekly/2026-06-26-weekly-review.md", "# 2026-06-26 Weekly Review\n");
  writeFile(
    root,
    "docs/ops/reviews/MVP/HEDGR_MVP_PROCESS_REVIEW_EVID_B_010_TO_014.md",
    "# MVP\n\nLast updated: 2026-06-13\n"
  );
  writeFile(
    root,
    "docs/ops/reviews/MVP/HEDGR_MVP_PROCESS_REVIEW_EVID_B_015_TO_019.md",
    "# MVP\n\nLast updated: 2026-06-20\n"
  );
  writeJson(root, "docs/ops/bridge/current-status.json", {
    artifact_type: "hedgrops_bridge_current_status_snapshot",
    generated_at: "2026-06-24T00:00:00.000Z",
    source_path: "docs/ops/HEDGR_STATUS.md",
    authority_posture: {
      class: "A",
      mode: "READ_ONLY",
      source_of_truth: ["docs/ops/HEDGR_STATUS.md"],
      bridge_role: "evidence_retrieval_only"
    },
    non_authorization_statement:
      "This snapshot is evidence/retrieval only. It does not authorize implementation, sequencing, ticket activation, or repo mutation.",
    execution_authority: false,
    may_activate_ticket: false,
    mutation_allowed: false,
    ticket_activation_allowed: false,
    status: {
      source_of_truth_references_only: true,
      inferred_execution_state: false,
      inferred_active_ticket: false
    }
  });

  return root;
}

function assertBridgeSnapshotError(fn, pattern) {
  assert.throws(fn, (error) => {
    assert.ok(error instanceof BridgeSnapshotError);
    assert.match(error.message, pattern);
    return true;
  });
}

test("refresh writes deterministic latest weekly, MVP, and index snapshots", () => {
  const root = makeRepo();

  writeSnapshots(root, { today: TODAY });
  const result = checkSnapshots(root, { today: TODAY });

  assert.equal(result.reviews.weekly.sourcePath, "docs/ops/reviews/weekly/2026-06-26-weekly-review.md");
  assert.equal(
    result.reviews.mvpProcess.sourcePath,
    "docs/ops/reviews/MVP/HEDGR_MVP_PROCESS_REVIEW_EVID_B_015_TO_019.md"
  );
  assert.equal(
    readJson(root, "docs/ops/bridge/latest-weekly-review.json").source_path,
    "docs/ops/reviews/weekly/2026-06-26-weekly-review.md"
  );
  assert.equal(readJson(root, "docs/ops/bridge/review-index.json").ticket_activation_allowed, false);
});

test("check fails when latest weekly snapshot points to an older review", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const stale = readJson(root, "docs/ops/bridge/latest-weekly-review.json");
  stale.source_path = "docs/ops/reviews/weekly/2026-06-20-weekly-review.md";
  writeJson(root, "docs/ops/bridge/latest-weekly-review.json", stale);

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /Bridge snapshot stale/);
});

test("weekly discovery rejects malformed filenames", () => {
  const root = makeRepo();
  writeFile(root, "docs/ops/reviews/weekly/latest-weekly-review.md", "# malformed\n");

  assertBridgeSnapshotError(() => discoverLatestWeeklyReview(root, TODAY), /Malformed weekly review filename/);
});

test("weekly discovery rejects future-dated files", () => {
  const root = makeRepo();
  writeFile(root, "docs/ops/reviews/weekly/2026-06-27-weekly-review.md", "# future\n");

  assertBridgeSnapshotError(() => discoverLatestWeeklyReview(root, TODAY), /future-dated/);
});

test("check fails when index references a missing source file", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });
  fs.unlinkSync(path.join(root, "docs/ops/reviews/weekly/2026-06-26-weekly-review.md"));

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /missing file/);
});

test("check fails when a required guardrail is missing", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const snapshot = readJson(root, "docs/ops/bridge/latest-mvp-process-review.json");
  delete snapshot.mutation_allowed;
  writeJson(root, "docs/ops/bridge/latest-mvp-process-review.json", snapshot);

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /missing required guardrail/);
});

test("check fails when a required guardrail is true", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const snapshot = readJson(root, "docs/ops/bridge/current-status.json");
  snapshot.execution_authority = true;
  writeJson(root, "docs/ops/bridge/current-status.json", snapshot);

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /must be false/);
});

test("check fails when prohibited authority fields are present", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const snapshot = readJson(root, "docs/ops/bridge/review-index.json");
  snapshot.index.entries[0].recommended_next_ticket = "DO-NOT-DO-THIS";
  writeJson(root, "docs/ops/bridge/review-index.json", snapshot);

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /prohibited authority field/);
});

test("check fails when generated_at is invalid", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const snapshot = readJson(root, "docs/ops/bridge/latest-weekly-review.json");
  snapshot.generated_at = "2026-06-26";
  writeJson(root, "docs/ops/bridge/latest-weekly-review.json", snapshot);

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /generated_at/);
});

test("check fails when JSON formatting differs from deterministic output", () => {
  const root = makeRepo();
  writeSnapshots(root, { today: TODAY });

  const snapshot = readJson(root, "docs/ops/bridge/latest-weekly-review.json");
  writeFile(root, "docs/ops/bridge/latest-weekly-review.json", JSON.stringify(snapshot));

  assertBridgeSnapshotError(() => checkSnapshots(root, { today: TODAY }), /differs from generated output/);
});
