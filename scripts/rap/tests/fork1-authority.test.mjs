import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildProjection, SOURCE_DEFINITIONS } from "../generate-repo-authority-projection.mjs";

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
  const registered = section(after, "## 9) Registered agent roles", "## 10) Execution modes and action controls");
  for (const [number, role, file, mode] of [
    ["9.1", "Implementer", "codex-implementer.md", "`PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised"],
    ["9.2", "Verifier", "codex-verifier.md", "`READ_ONLY`"],
    ["9.3", "Repo Steward", "codex-repo-steward.md", "`PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised"],
    ["9.4", "Synthesizer", "codex-synthesizer.md", "`READ_ONLY`"],
    ["9.8", "Product Experience Lead", "codex-product-experience-lead.md", "`PROPOSE_ONLY`"],
    ["9.9", "Human Narrative Lead", "codex-human-narrative-lead.md", "`PROPOSE_ONLY`"],
    ["9.10", "Narrative Steward", "codex-narrative-steward.md", "`PROPOSE_ONLY`"]
  ]) {
    const pointer = number === "9.8"
      ? `Canonical role: \`docs/agents/skills/${file}\`.`
      : `Canonical contract: \`docs/agents/skills/${file}\`.`;
    const contract = `${pointer} Execution mode: ${mode}.`;
    assert.ok(registered.includes(`### ${number} ${role}\n${contract}`), `${role} has the expected canonical contract and mode`);
    assert.equal(registered.split(`### ${number} ${role}`).length - 1, 1, `${role} must be registered once`);
  }
  assert.match(registered, /### 9\.8 Product Experience Lead/);
  assert.match(registered, /### 9\.9 Human Narrative Lead[\s\S]*?Governing principle: \*\*Humanise the meaning\. Never strengthen the claim\.\*\*/);
  assert.match(registered, /### 9\.10 Narrative Steward[\s\S]*?treat founder cognition \/ Vault material as context rather than repo truth/);
  for (const [number, role] of [["9.5", "Explorer"], ["9.6", "Tester"], ["9.7", "Reconstructor"]]) {
    assert.ok(registered.includes(`### ${number} ${role}\nCanonical contract: \`AGENTS.md inline\`.`));
  }
  assert.match(registered, /This topology describes functional separation only\. It creates no sequencing, approval, handoff, task-activation or execution authority\./);
  assert.match(after, /All agent outputs are non-authoritative by default unless and until absorbed into the governed repo chain under the applicable authority\./);
  const normalize = (text) => text.slice(text.lastIndexOf("## 1) Purpose"))
    // The authorised reading/maintenance addition is the only new standing section.
    .replace(/### Reading procedure\n[\s\S]*?(?=## 6\) Environment Flags)/, "")
    .replace("The repo requires Node 24.22.1 (pinned in `.nvmrc`). Use `nvm use 24.22.1` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.", "The repo requires Node 20 (pinned in `.nvmrc`). Use `nvm use 20` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.")
    .replace(/Current parallelism posture:[\s\S]*?(?=### Green Lane operator rules)/, "")
    .replace(/\n- \*\*TDD standing posture for Engine and Home runtime §7a briefs \(binding; §346\):[^\n]+/, "")
    .replace(/\n- Smallest durable change, then prove the real result:[^\n]+/, "")
    .replace(" — `magic` is local-only", "")
    .replace(" — `live` is local-only, never CI", "")
    .replace("## 9) Registered agent roles", "## 9) Approved agent roles")
    .replace(/### Role Registration Contract\n[\s\S]*?(?=### 9\.1 Implementer)/, "")
    .replace(/Canonical contract: `(?:docs\/agents\/skills\/codex-[^`]+|AGENTS\.md inline)`\.(?: Execution mode: [^\n]+)?\n\n/g, "")
    .replace(/### 9\.9 Human Narrative Lead[\s\S]*?(?=### Role topology — descriptive only)/, "")
    .replace(/### Role topology — descriptive only[\s\S]*?(?=\n## 10\) Execution modes and action controls)/, "")
    .replace("All agent outputs are non-authoritative by default unless and until absorbed into the governed repo chain under the applicable authority. Role-specific contracts may impose stricter limits.", "Verifier, Tester, Explorer, and Reconstructor outputs remain non-authoritative unless absorbed into the governed repo chain.")
    .replace(/### 9\.8 Product Experience Lead[\s\S]*?(?=### 9\.\d+ |## 10\) Execution modes and action controls)/, "");
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
  // The Founder-authorised Research Two-Beat ticket supersedes the archived
  // sequencing sentence. Keep the archive immutable, assert the exact replacement and
  // compare every other projected field without exception.
  const sequencing = before.projection.payload.fields.sequencing_posture;
  assert.equal((sequencing.value.match(/shared-baseline amendment/g) ?? []).length, 2);
  sequencing.value = sequencing.value.replaceAll(
    "shared-baseline amendment", "synthetic Home compact FX insight amendment"
  );
  const oldRelease = "draft PR #550 and existing unfinished Form are preserved. Participant distribution remains paused; no runtime scope beyond the bounded synthetic Home compact FX insight amendment, Lane G change, standing delegation, parent closeout or financial capability.";
  assert.equal(sequencing.value.split(oldRelease).length - 1, 1);
  const currentSequencing = "RESEARCH-RELEASE-001 closes only through §437 source/rebind/fetched-main RAP gates. Founder-confirmed invitations are recorded by checksum; confirmation 23 Oct 2026 AWST, send time/channel/count unspecified. Effective §434 gate-4 FIT/PASS at dc9c44a4, source #1013 and rebind #1014 preceded the invite-ready handoff. §410 D3/D4/D7 lifts research-unreleased/participant-paused holds only for the named route and authorised pool; invitation/pause/withdrawal custody stays exclusively Founder-owned, SME held. CLASS-A-VAL-002 and SE-REASON-001 stay open, no exit verdict or active nested successor; E has no nested ticket, G deferred. §431 bounded VoiceOver PASS remains; actual TalkBack/fractional-ZMW speech INCOMPLETE, never PASS. §438 D1 requires both closed before the next research pass, superseding the research-only non-blocking treatment for that pass only and activating no testing. §409/navigation limits remain. Post-invite fixes stay checksum-only, unactivated and not pre-staged; other QoL/§387 items queued only. SEC-DEPS-002/004 are closed under effective §447/§448; §6f.27/§6f.34 expired. SEC-DEPS-005 is closed under effective §450 at 0400c53e; §6f.35 expired. ZOD-CVE-001 is closed under effective §452 at b9576b9b; §6f.36 expired. SEC-DEPS-003 slice 1 is closed under effective §454 at ee524fd6; §6f.37 expired. SEC-DEPS-003 / #24 and four dev-only critical alerts stay open; no ticket holds pnpm-lock.yaml authority. Founder orders SEC-TEST-001 next under §455/§6f.38, effective only on source/rebind/fetched-main RAP gates; one-file test support only. Remaining queue after SEC-TEST-001, none activated: REPLIT-PURGE-001 (#33; waiting on Founder confirmations), DOCS-DRIFT-001 (#32), ZOD-CVE-001 follow-ups (#34; CI change needs separate approval), #24 sharp-alert slice (pending Founder decision), then #24 Vitest-major slice. Record PRs follow ready/arm-while-pending then STOP for Dex's independent exact-head PASS. CI-EFF-001 keeps §6f.31/§442 activation and §443 runtime prerequisites; the docs-only exception applies only with the classifier on main, otherwise full exact-head hosted E2E. IDENTITY-001 Step 0 keeps §6f.32/§444 gates and separate A/B/C/deferred-D PRs; Step 2 keeps §6f.33/§445 gates. D waits for the CI-EFF scanner switch; Step 0 stays open through D and closeout. Only the Founder enables code-owner review after D3, scanner switch and PR-D merge and both cutover dry-runs pass; until then OFF. No concurrent open validate.yml PRs or same-file/lockfile work; source records serialise with research priority. OPS-GOV-STATUS-RESTRUCTURE-001 retains only §441 closeout gates and §6f.30 expiry; no continuing support/successor. Rebind redesign Option 2 is a later unactivated proposal. §438 D1/D2 and §439 provenance correction stay current; completed material is indexed in history/RELOCATION_INDEX.md. BRIDGE-MCP-001 is closed/retired under §438 D2. observability.md:30 dev:docker remains an unauthorised follow-up. No permission inheritance, parent closure, Lane E/G activation, broader participant exposure or financial capability. NO CROSS-LANE IMPACT.";
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
