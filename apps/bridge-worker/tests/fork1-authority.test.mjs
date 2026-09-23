import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildProjection, SOURCE_DEFINITIONS } from "../scripts/generate-repo-authority-projection.mjs";

const ROOT = new URL("../../../", import.meta.url);
const read = (file) => readFile(new URL(file, ROOT), "utf8");
function section(text, start, end) {
  const from = text.indexOf(start);
  assert.ok(from >= 0, `Missing ${start}`);
  const to = text.indexOf(end, from + start.length);
  assert.ok(to >= 0, `Missing ${end}`);
  return text.slice(from, to);
}
function original(text, name) {
  return section(text, `<!-- BEGIN ORIGINAL ${name} -->\n`, `<!-- END ORIGINAL ${name} -->`)
    .split(`<!-- BEGIN ORIGINAL ${name} -->\n`)[1];
}
async function sources() {
  return Object.fromEntries(await Promise.all(SOURCE_DEFINITIONS.map(async ({source_path: file}) => [file, await read(file)])));
}
const project = (sourceDocuments) => buildProjection({
  sourceCommit: "8580c2639489c14c59e7010a0c4bcdf941b9e30f",
  generatedAt: "2026-09-20T00:00:00.000Z", sourceDocuments
});

test("Fork 1 archives preserve exact baseline bytes and cannot become mandatory RAP sources", async () => {
  const history = await read("docs/ops/HEDGR_AUTHORITY_HISTORY_PRE_FORK_1.md");
  const agents = await read("docs/ops/governance/AGENTS_PRE_FORK_1.md");
  for (const [text, name, hash] of [
    [history, "PREFIX", "89184b7aaa25716dfda568e38cc3e9114fc7442d2a3837f04fe57079e8d972c0"],
    [history, "LIVE SECTIONS", "26e96efa037c37ff9545d2681bdf9b6f99bfc51a410f923ac8e783d716b2138d"],
    [agents, "AGENTS", "16f7df58760234566575c6563af6386ed13ec971fdf1bf60b9ad9aad16f1ea6e"]
  ]) {
    assert.match(text, /HISTORICAL \/ NON-OPERATIVE/);
    assert.equal(createHash("sha256").update(original(text, name)).digest("hex"), hash);
  }
  assert.ok(SOURCE_DEFINITIONS.every(({source_path: file}) => !/PRE_FORK_1/.test(file)));
});

test("Fork 1 retains current nested scope, amendment and release controls verbatim", async () => {
  const history = original(await read("docs/ops/HEDGR_AUTHORITY_HISTORY_PRE_FORK_1.md"), "LIVE SECTIONS");
  const live = section(await read("docs/ops/HEDGR_STATUS.md"), "## 7a.", "## 8.");
  for (const [start, end] of [
    ["### Lane G — no active research", "### Completed nested Lane V"],
    ["### Shared Home / Activity / Settings baseline amendment", "### Active remaining nested Lane V"],
    ["**Required participant outcomes:**", "### Archived Lane N brief"]
  ]) {
    assert.ok(live.includes(section(history, start, end).trim()), `Changed protected block: ${start}`);
  }
  const oldWeekend = section(history, "### Active remaining nested Lane V", "### Completed temporary repository support");
  assert.ok(live.includes(oldWeekend.slice(oldWeekend.indexOf("\n") + 1).trim()), "Changed retained weekend scope");
  assert.match(live, /### Deferred nested Lane V — CLASS-A-VAL-002-WEEKEND-PREP-001 \(retained brief\)/);
  const oldE = section(history, "### Lane E — `SE-REASON-001`", "#### Completed nested research brief");
  const newE = section(live, "### Lane E — `SE-REASON-001`", "**Historical briefs:**");
  assert.ok(newE.includes(oldE.slice(oldE.indexOf("**Current nested posture (§290):**")).trim()));
  const oldV = section(history, "### Lane V — `CLASS-A-VAL-002`", "#### Completed nested refinement brief");
  assert.ok(live.includes(section(oldV, "**Objective:**", "**Current posture (lanes):**").trim()));
});

test("Fork 1 retains the standing AGENTS execution contract without dated overrides", async () => {
  const before = original(await read("docs/ops/governance/AGENTS_PRE_FORK_1.md"), "AGENTS");
  const after = await read("AGENTS.md");
  const normalize = (text) => text.slice(text.lastIndexOf("## 1) Purpose"))
    .replace(/Current parallelism posture:[\s\S]*?(?=### Green Lane operator rules)/, "")
    .replace(" — `magic` is local-only", "")
    .replace(" — `live` is local-only, never CI", "");
  assert.equal(normalize(after), normalize(before));
  assert.equal((after.match(/^# AGENTS.md/gm) ?? []).length, 1);
  assert.equal((after.match(/^Current parallelism posture:/gm) ?? []).length, 1);
});

test("Fork 1 preserves projected occupancy, sequencing and all non-authorising flags", async () => {
  const current = await sources();
  const history = await read("docs/ops/HEDGR_AUTHORITY_HISTORY_PRE_FORK_1.md");
  const baseline = {...current,
    "AGENTS.md": original(await read("docs/ops/governance/AGENTS_PRE_FORK_1.md"), "AGENTS"),
    "docs/ops/HEDGR_STATUS.md": original(history, "PREFIX") + original(history, "LIVE SECTIONS")
  };
  const before = project(baseline);
  const after = project(current);
  assert.equal(before.validation.ok, true);
  assert.equal(after.validation.ok, true);
  // The verified interpretation stimulus closeout supersedes the archived
  // sequencing sentence. Keep the archive immutable, assert the exact replacement and
  // compare every other projected field without exception.
  const sequencing = before.projection.payload.fields.sequencing_posture;
  assert.equal((sequencing.value.match(/shared-baseline amendment/g) ?? []).length, 2);
  sequencing.value = sequencing.value.replaceAll(
    "shared-baseline amendment", "synthetic Home compact FX insight amendment"
  );
  const oldRelease = "draft PR #550 and existing unfinished Form are preserved. Participant distribution remains paused; no runtime scope beyond the bounded synthetic Home compact FX insight amendment, Lane G change, standing delegation, parent closeout or financial capability.";
  assert.equal(sequencing.value.split(oldRelease).length - 1, 1);
  const currentSequencing = "Controlled Parallelism v22 / §6f.22 retains V/E parents while §285 defers G. §301 convergence is completed; §302 stimulus technical work closes only after effective source merge and separate verified RAP rebind. No successor is activated. The weekend ticket remains deferred, not completed or cancelled. The separately released Digital Feedback v1 pulse and Founder-owned participant selection, invitations and raw-response custody continue under their existing conditions; moderated v2.1 and other parent distribution remain paused. The Stability research route is not released for participant use. No participant session, new Form, response collection, telemetry, personal-input collection, limited manipulation or “Use My Numbers” is activated. Lane E remains open without a nested ticket; §290 responsibilities remain non-executable and current EngineState/posture is preserved. No Lane G restart, Green delegation, financial capability or cross-lane authority follows. NO CROSS-LANE IMPACT.";
  assert.equal(after.projection.payload.fields.sequencing_posture.value, currentSequencing);
  sequencing.value = currentSequencing;
  const normalized = structuredClone(after.projection);
  normalized.payload.fields.authority_boundaries.value = before.projection.payload.fields.authority_boundaries.value;
  assert.deepEqual(normalized, before.projection);
  assert.match(after.projection.payload.fields.authority_boundaries.value, /Historical passes and completed briefs cannot supply current occupancy/);
  assert.match(after.projection.payload.fields.authority_boundaries.value, /Accepted ADRs, active doctrine, AGENTS/);
  assert.equal(after.projection.execution_authority, false);
  assert.equal(after.projection.mutation_allowed, false);
  assert.equal(after.projection.ticket_activation_allowed, false);
  assert.equal(after.projection.sequencing_allowed, false);
});

test("current-source conflict still fails with history unable to reconcile it", async () => {
  const current = await sources();
  current["AGENTS.md"] = current["AGENTS.md"].replaceAll("CLASS-A-VAL-002", "UNAUTHORISED-001");
  const result = project(current);
  assert.equal(result.validation.ok, false);
  assert.equal(result.projection.conflicts.length, 1);
  assert.equal(result.projection.execution_authority, false);
});
