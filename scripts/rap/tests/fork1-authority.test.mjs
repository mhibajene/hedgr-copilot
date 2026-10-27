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
  const currentSequencing = "RESEARCH-RELEASE-001 closes under §437 after independently verified source merge, separate independently verified sole-JSON permanent-main §364 rebind and fetched-main RAP PASS. Founder-confirmed invitations are recorded by receipt checksum only; confirmation recorded 23 Oct 2026 AWST, actual send time, channel and count unspecified. Effective §434 gate-4 FIT/PASS at dc9c44a4 and its source #1013/rebind #1014 preceded the invite-ready handoff. Under §410 D3/D4/D7, research unreleased and participant release paused lift only for the named research route and authorised pool. Founder invitation, pause and withdrawal custody remains exclusive; SME remains held. Parents CLASS-A-VAL-002 and SE-REASON-001 remain open, with no exit verdict or active nested successor; E has no nested ticket and G stays deferred. §431 bounded VoiceOver PASS remains; actual TalkBack and fractional-ZMW speech remain INCOMPLETE, never PASS. TalkBack and fractional-ZMW actual speech testing must close before the next research pass (§438 D1); this replaces the research-only non-blocking treatment for that next pass only. §409 and accepted navigation limitations remain. Post-invite fixes are carried only by verdict checksum, unactivated and not pre-staged; all other QoL and §387 deferred items remain queued only. SEC-DEPS-002 #999/#1016/#1056 are delivered; only §447 source/rebind/fetched-main RAP closeout gates remain, then §6f.27 expires. No continuing support or overlap follows. OPS-GOV-STATUS-RESTRUCTURE-001 closeout and §6f.30 expiry retain §441 source/rebind/fetched-main RAP gates; no continuing support or successor. The rebind redesign (Option 2) remains a separate later proposal, unactivated. D1/D2 and the §439 provenance correction remain current; completed execution material is indexed in docs/ops/history/RELOCATION_INDEX.md. BRIDGE-MCP-001 is formally closed and retired by §438 D2. The observability.md:30 dev:docker mention remains a separate unauthorised follow-up. No parent closure, Lane E/G activation, broader participant exposure or financial capability follows. CI-EFF-001 retains the complete §6f.31/§442 source/rebind/fetched-main RAP activation gates. Its runtime PR cannot merge until the §443 evidence-rule record and its rebind/RAP gates are effective. The §443 docs-only exception takes practical effect only once the classifier is on main; every other PR still requires successful full exact-head hosted E2E. Coexistence covers only SEC-DEPS-002 closeout; no concurrent open PRs edit validate.yml, source records serialise on main and research keeps priority. IDENTITY-001 Step 0 activates only after §444 source/rebind/fetched-main RAP gates under finite §6f.32, then separate draft PRs A, B, C and deferred D. Coexistence is limited to SEC-DEPS-002 D3/closeout and CI-EFF-001; source records and validate.yml PRs serialise. D waits for D3 and the CI-EFF scanner-switch disposition. Step 2 activates only on §445 source/rebind/RAP gates under §6f.33; Step 0 stays open through D and closeout. Code-owner review stays OFF until D3, the scanner switch and PR-D merge and both cutover dry-runs pass; only the Founder switches it ON. SEC-DEPS-004 activates only on §446 source/rebind/fetched-main RAP gates under finite §6f.34. It alone may change the lockfile until SEC-DEPS-002 closes; the implementation changes only the two frontend pins and regenerated lockfile. The implementation PR has no auto-merge: exact-head live-chat evidence, independent PASS and the Founder's explicit go precede merge. D3 #1056 is merged; the named dependency-audit step now blocks on high/critical findings. The later CI-EFF scanner switch and PR-D remain separate gates. Close SEC-DEPS-002 first, then SEC-DEPS-004 through each source/rebind/fetched-main RAP chain before any separate SEC-DEPS-005 activation. Governance records follow normal runbook readiness/arming before independent verification. NO CROSS-LANE IMPACT.";
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
