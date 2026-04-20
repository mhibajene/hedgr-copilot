# HEDGR CODEX USAGE CONVENTION

Status: Governance guidance only  
Authority: Non-sequencing, non-implementation  
Scope: Codex usage inside the Hedgr execution and review system  
Last updated: 2026-04-18

---

## 1. Purpose

This document defines how **Codex** may be used within Hedgr’s working system: as a **governed secondary operator** that expands exploration and validation capacity without becoming a competing authority surface.

It exists to:

- expand exploration and validation capacity in parallel with Cursor-led execution
- preserve **repo-native authority** (`docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, doctrine) as the institutional operating system
- prevent agent sprawl and duplicate decision surfaces
- keep execution disciplined as agent capability increases

It does **not**:

- authorize implementation, sequencing, or shipping
- create a second source of implementation or product truth
- override `docs/ops/HEDGR_STATUS.md` or the HedgrOps decision / ADR export standard
- replace founder approval, Project Ops governance (`docs/ops` framing and traceability), or **Cursor** as the primary repo execution surface

---

## 2. Authority boundary

Codex enters Hedgr as a **bounded secondary operator**, not as a primary authority surface. Repo-native documents and processes remain the institutional operating system; Codex does not interpret doctrine of record or approve next work.

**Governing order:**

1. **Founder** — direction, prioritization, approval  
2. **Repo authority** — `docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, repo-native doctrine (e.g. constitutional charter, UX constitution, MVP specification) and governance standards  
3. **Project Ops / docs/ops** — governance framing, review traceability, bounded refinement and critique artifacts (non-sequencing unless explicitly elevated through repo process)  
4. **Cursor** — primary repo execution surface  
5. **Codex** — parallel exploration, verification, and bounded testing only  

---

## 3. Why this convention is needed

Agent capability has materially increased. That creates leverage and **risk**: faster drafts, stronger rhetoric, and easier parallel work can outpace governance and documentation discipline.

Without an explicit role for Codex, it can drift into:

- implicit product or sequencing authority  
- ungoverned or duplicative repo mutation narratives  
- duplicate decision surfaces (what “counts” as approved)  
- undocumented design or copy drift  
- overconfident system or maturity claims  

Hedgr’s posture—**visible risk**, **governance before scale**, **explicit trade-offs**, and **disciplined documentation**—requires that secondary agents stay bounded. This convention makes that boundary explicit.

---

## 4. Core operating principle

**Codex may propose. Cursor may build. Docs may govern. Founder approves.**

Codex expands the system’s ability to:

- explore alternatives and bounded option sets  
- challenge assumptions and surface tensions  
- verify alignment against doctrine, guardrails, and governing docs  
- pressure-test outputs (including exploration artifacts, Paper boards, and `docs/ops` critique chains)  

It does **not** become:

- the main builder or default implementation path  
- the product arbiter of what ships or what doctrine “means”  
- the doctrine interpreter of record  
- the execution source of truth  

---

## 5. Approved Codex roles

### 5.1 Explorer

Use for:

- alternative UI patterns  
- wording variants  
- comparison hypotheses  
- competing refinement directions  
- bounded option sets  

Explorer output is **non-authoritative** until absorbed into repo docs, selected for execution review, or explicitly approved through normal governance.

### 5.2 Verifier

Use for:

- doctrine alignment  
- copy against guardrails  
- cross-doc consistency  
- trust-surface drift  
- scope-creep risk  
- overclaim or hidden-mechanics risk  

Verifier output should be framed as **findings**, not decisions.

### 5.3 Tester

Use for:

- same-frame micro-tests  
- fixed-rubric evaluations  
- alternative-pattern critiques  
- artifact-to-artifact review  
- adversarial challenge passes  

Tester output is **critique signal only**, not approval.

---

## 6. Where Codex is high leverage

### 6.1 Independent critique of exploration artifacts

Examples:

- pattern comparison docs  
- Paper review boards (per `docs/ops/HEDGR_PAPER_REVIEW_BOARD_CONVENTION.md`)  
- prototype variants and readouts (e.g. `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`)  
- wording guardrails and status vocabulary drafts  
- refinement briefs and legibility notes  

### 6.2 Parallel option generation

Examples:

- alternative supporting lines  
- alternate layout candidates  
- trust-surface naming sets  
- challenger variants to an existing centerline  

### 6.3 Adversarial review

Examples:

- hidden risk  
- implied system maturity  
- doctrine tension  
- strongest counterargument  

### 6.4 Consistency and drift checks

Examples:

- contradictions across docs  
- duplicated authority surfaces  
- silent widening of posture or execution boundary  

Use Codex here to **strengthen review**, not to bypass it.

---

## 7. Where Codex must not lead

Codex is **not** approved as the primary operator for:

### 7.1 Primary repo mutation

**Cursor** remains the main repo execution surface. Codex does not outrank Cursor for implementation work.

### 7.2 Final product judgment

Codex must not decide:

- what ships  
- which pattern wins  
- what doctrine means in a binding sense  
- what counts as acceptable trust language without founder / governance review  

### 7.3 Unguarded autonomous work

Avoid vague mandates such as:

- “go improve the product”  
- “fix the UX”  
- “make this better everywhere”  

### 7.4 Hidden authority creation

Outputs must not become active guidance unless reviewed and absorbed into the governed repo chain (see Sections 10–11).

---

## 8. Operating modes and constraints

### Mode A — Explorer

**Purpose:** generate bounded alternatives.

**Constraints:**

- options only  
- no approval logic  
- no execution authority  

### Mode B — Verifier

**Purpose:** check alignment and identify risks.

**Constraints:**

- findings only  
- no final arbitration  
- must reference governing inputs (status file, ADRs, doctrine, relevant `docs/ops` artifacts)  

### Mode C — Tester

**Purpose:** compare bounded alternatives against a fixed rubric.

**Constraints:**

- fixed frame  
- fixed assumptions  
- explicit criteria  
- critique output only  

No additional modes should be created unless a documented need emerges and is reflected through Project Ops / repo process.

---

## 9. Input discipline

Codex should work from **explicit artifacts**, not loose conversational memory.

Meaningful Codex tasks should specify:

- exact input docs (paths in repo)  
- exact prototype or Paper board state, if relevant  
- exact comparison question  
- exact scope boundaries  
- exact deliverable type (options, findings, rubric-scored critique, etc.)  

**Good inputs**

- specific `docs/ops` files  
- exact prototype route or Paper board context  
- fixed micro-test criteria  
- explicit guardrail or language doc  

**Bad inputs**

- open-ended product mandates  
- repo-wide improvement requests  
- vague strategy extrapolation  
- undocumented doctrine assumptions  

This supports **decision integrity** and reduces hallucinated or unmoored claims.

---

## 10. Output handling rule

Codex outputs are **non-authoritative by default**.

They become operationally relevant only if:

1. captured in a governed `docs/ops` artifact, **or**  
2. reviewed and accepted into a **Cursor** execution brief, **or**  
3. approved explicitly by **founder** direction, **or**  
4. exported into an ADR or governance flow per `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md` and repo process  

Until then, Codex output is exploratory support only.

---

## 11. Repo and documentation handoff rule

**Required chain:**

**Codex output → review artifact → repo-native doc or Cursor brief → founder / governance review**

Explicitly:

- no silent codification  
- no undocumented design adoption  
- no unreviewed authority drift  

The repo remains the institutional operating system; secondary agents feed **review**, not shadow policy.

---

## 12. Decision logging and traceability

If Codex materially influences:

- architecture  
- trust surfaces  
- design logic  
- execution posture  
- governance framing  

that influence must flow through normal decision and documentation channels (including ADRs where material), consistent with HedgrOps standards: **trade-offs**, **assumptions**, **reversibility**, **kill criteria**, and visible reasoning—**no hidden reasoning**.

---

## 13. Product and UX constraints Codex must respect

Any Codex-enabled exploration must remain inside Hedgr doctrine and product baseline, including:

- capital preservation above yield or growth  
- liquidity integrity  
- visible risk  
- no gamification  
- calm over urgency  
- advisory, never directive (including Copilot subordination)  
- plain language over technical theater  
- trust over optimization  

Codex may **challenge** artifacts and surface tension with doctrine; it must not **quietly violate** doctrine without making that tension explicit.

---

## 14. Recommended initial use policy

For the current phase, use Codex primarily in:

1. **Exploration review** — challenge pattern comparisons; critique Paper boards; generate bounded alternates.  
2. **Guardrail verification** — wording checks; overclaim detection; doctrine alignment review.  
3. **Micro-test evaluation** — fixed-rubric comparison; independent readouts; challenger analysis.  

Do **not** begin with Codex as the default repo implementation tool.

---

## 15. Failure modes to avoid

1. Codex becomes a second execution truth surface.  
2. Codex outputs are adopted without repo documentation or review.  
3. Cursor ceases to be the primary build surface.  
4. Codex is used with vague or unbounded mandates.  
5. Founder approval is bypassed by agent momentum.  
6. Agent-generated wording introduces overclaim or hidden-mechanics drift.  
7. Multiple agents begin making overlapping governance claims.  

---

## 16. Working convention

Default Hedgr posture:

- **Cursor** is primary execution.  
- **Project Ops** (`docs/ops`) governs framing and traceability for bounded artifacts.  
- **Founder** approves material direction.  
- **Codex** explores, verifies, and tests in bounded ways.  

Codex is an accelerator for disciplined work, not a substitute for discipline.

Repo-native execution authority remains governed by `docs/ops/HEDGR_STATUS.md`, accepted ADRs, and `AGENTS.md`.

---

## 17. Closing position

Codex should be incorporated into Hedgr **now**, but only as a **governed secondary operator**.

Used correctly, it increases exploration throughput, validation depth, critique quality, and review resilience. Used incorrectly, it creates **authority drift**.

**Codex expands exploration and validation capacity. It does not replace Cursor, governance, or founder judgment.**
