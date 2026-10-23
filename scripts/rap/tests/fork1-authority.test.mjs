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
  const currentSequencing = "QOL-BUNDLE-001 is technically closed under effective §432; §6f.28 has expired, with no nested runtime successor. RESEARCH-RELEASE-001 §339 gate-4 FIT/PASS is recorded under §434 at dc9c44a4, with 0 harmful readings, fresh Sue comprehension and Kip flow complete and one Founder-relayed HedgrOps verdict by checksum. Invite/briefing-only tester-script conditions are locked by that checksum, with no product, route or copy change. This outcome source merge, separate independently verified sole-JSON permanent-main §364 rebind and fetched-main RAP PASS precede Founder invitations under §410. RESEARCH-RELEASE-001 stays open until invitations and its closeout. §431 VoiceOver PASS is retained; TalkBack and fractional-ZMW actual speech remain INCOMPLETE, never PASS, with the Founder research-only non-blocking disposition carried by the verdict. §425 stays evidence for 17b75200 only. Post-invite fixes are carried by checksum only and remain unactivated. The §433 removal/relocation merged as #1016 at ac504894; frontend bytes remain identical to dc9c44a4. SEC-DEPS-002 remains independently open solely for conditional 27 Oct 2026 D3 and governed closeout under §6f.27/§427/§428/§433. SEC-NODE-001 is the finite non-lane repository tooling ticket under §6f.29/§435, effective only after source merge, separate independently verified sole-JSON permanent-main §364 rebind and fetched-main RAP PASS. The Founder proceed direction supersedes waiting for SEC-DEPS-002 closeout for activation only. Bounded overlap permits only remaining D3 and closeout, with no concurrent lockfile or same-file work, source records serialised on main, research priority and separate exact-head CI evidence. Actual Founder invitations are unconfirmed; Dex launches the distinct Implementer only after the Founder confirms invitations sent. Steward records the effective activation SHA and stops without implementation. §6f.29 expires on SEC-NODE-001 verified closeout/rebind/fetched-main RAP. CI-RUNNER-PIN-001 is closed under §426; §6f.26 expired. SEC-DEPS-001 is closed under §418; CODE-REVIEW-FIN-001 delivered under §419; §6f.24/§6f.25 expired. Both parents CLASS-A-VAL-002 and SE-REASON-001 remain open; E has no nested ticket, G deferred. Research unreleased, participant release paused, SME held, §409 and accepted navigation limitations retained. All other QoL including FIX-004 precision/CRF-006 and §387 deferred items remain queued only; §6f.23 expired. No parent verdict, closure or financial capability. NO CROSS-LANE IMPACT.";
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
