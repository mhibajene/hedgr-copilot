# Notion governance staging (manual copy source)

**Status:** Operational  
**Purpose:** Canonical snippets for manual reconciliation of Hedgr Notion surfaces (Decision Log, Strategy & Insights, or equivalent executive views).  
**Repo-first:** This staging document **mirrors** repo wording after reconciliation; it **must not** interpret ADR **0016** **Acceptance** more broadly than the repo files do (ADR **0016**, `SPRINT-2-ADR-INDEX.md`, `HEDGR_STATUS.md` **§2** / **§3** / **§6b**).

**Authority:** The repository is source of truth. Wording here must match `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`, `docs/decisions/SPRINT-2-ADR-INDEX.md`, and `docs/ops/HEDGR_STATUS.md`. Wording must match **Accepted** ADR **0016** in repo; do not broaden scope or soften read-only / non-execution boundaries in Notion.

**Last reconciled:** 2026-04-06 (`MC-S3-005` closeout; presentation-only Warmth v1 — **ADR 0022** closeout record)

---

## 1. Decision Log — ADR 0016 (copy row)

Use one row per field below (or map to your Notion schema equivalents).

| Field | Value |
| ----- | ----- |
| **Decision ID / ADR** | ADR 0016 |
| **Title** | Warmth Layer as a doctrine-constrained retail refinement track during the read-only Stability Engine phase |
| **Status** | Accepted |
| **Decision Type** | UX/Trust |
| **Strategic Horizon** | Short-term (MVP / immediate sprint) |
| **Visibility** | Internal |
| **Date** | 2026-04-02 |
| **Repo file** | `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md` |

Notion Decision Log ID: D-016 ↔ Repo ADR: 0016

**Summary / notes (concise)**

- Allows a **parallel** Warmth Layer refinement track (presentation: layout, typography, microcopy, discoverability—per ADR 0016 and `SPRINT-2-ADR-INDEX.md`).
- Refines **presentation**, not product truth.
- Does **not** alter the read-only Stability Engine posture.
- Does **not** authorize execution semantics, accounting truth, hidden reallocation, ledger duplication, yield-first framing, or gamified stability language. (Same boundaries as ADR 0016 **Warmth Layer may not** and `HEDGR_STATUS.md` §2.)

---

## 2. Strategy & Insights / Executive Dashboard — Warmth Layer (copy block)

Use as a governed workstream line, **not** as a shipped-feature claim. Placement should stay **subordinate** to Stability Engine core posture (read-only, informational, non-executing).

**Short line**

- **Warmth Layer (ADR 0016, Accepted):** Parallel, doctrine-constrained **presentation** refinement only; does not change read-only Stability Engine posture. Must not introduce execution semantics, accounting truth, hidden reallocation, ledger duplication, yield-first framing, or gamified stability language. **§7** / **§7a** govern implementation tickets, not ADR acceptance alone. See ADR 0016 and `docs/ops/HEDGR_STATUS.md` §2.

**Supporting repo pointers (do not paraphrase into strategy)**

- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md` (ADR 0016 section)
- `docs/ops/HEDGR_STATUS.md` §2, §3

---

## 3. Field definitions

Decision Log field names follow `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md` §4 (Canonical Decision Structure).

---

## 4. Repo gaps (operational)

- There is **no** automated Notion sync in this repository; reconciliation is **manual** from this file and the cited paths above.
- **Visibility: Internal** — per governance standard, Internal decisions are not auto-exported as public ADRs; repo ADR 0016 exists for institutional traceability and remains the detailed record.

---

## 5. Stability Engine Foundation release row (manual alignment only)

**Not canonical.** Do not restate or redefine the closeout verdict here. Operators updating Notion release or portfolio rows should **read and mirror** repo language from:

- `docs/ops/HEDGR_STATUS.md` **§6a** — criteria, evidence table, and repo-native recommendation
- `docs/ops/HEDGR_STATUS.md` **§29** — completed ticket record for `MC-S2-023`

This section exists only to remind that **downstream copy is secondary**; repo `HEDGR_STATUS.md` is the sole authoritative source for Foundation release-closeout logic.

---

## 6. Decision Log — MC-S3-004 execution closeout (copy row)

Use when mirroring a completed **implementation** ticket (not a new ADR). Wording mirrors `docs/ops/HEDGR_STATUS.md` **§35** and **§6** (`MC-S3-004`).

| Field | Value |
| ----- | ----- |
| **Decision ID** | **D-021** (if your Notion schema still maps ADR **0021** ↔ D-021; otherwise use the next consistent id and fix this staging line) |
| **Decision ID / ticket** | MC-S3-004 |
| **Title** | Regression resistance for already-shipped Stability Engine trust surfaces (test-only) |
| **Status** | Completed (merged) |
| **Decision Type** | Engineering / quality (regression contract) |
| **Strategic Horizon** | Short-term (MVP / immediate sprint) |
| **Visibility** | Internal |
| **Date** | 2026-04-06 |
| **Related Release** | Stability Engine™️ - Transition Readiness *(optional relation)* |
| **Related Tickets** | MC-S3-004 |
| **Repo pointers** | `docs/ops/HEDGR_STATUS.md` §6 (`MC-S3-004`), §7, §7a, §35; `docs/decisions/0021-mc-s3-004-regression-resistance-for-shipped-trust-surfaces.md`; `apps/frontend/__tests__/engine-notices-and-mock-contract.test.ts`; merged PR **#111** |

**Summary / notes (concise)**

- Vitest locks **`ENGINE_NOTICE_COPY`** (informational / non-ledger framing) and **`getMockEngineState`** notice wiring for non-`normal` postures.
- No ADR or doctrine change; no product semantics change under ticket intent; hermetic CI posture unchanged (`AGENTS.md`).

**Optional light chain-of-record touch (post–MC-S3-005):** If the D-021 row body lacks it, add one line: *Superseded in sequence only by completion of **`MC-S3-005`** (D-022); the **`MC-S3-004`** regression contract remains in force per repo §6 / §35 / ADR 0021.* — Do not otherwise rewrite D-021.

---

## 7. Decision Log — D-022 / MC-S3-005 (full template)

**Notion Decision Log ID:** **D-022** ↔ Repo: **`docs/decisions/0022-mc-s3-005-warmth-layer-v1-constrained-presentation-refinement-closeout.md`** (non-authoritative mirror line in ADR 0022). If Notion numbering has diverged, use the next sequential Decision Log id and **update this section** plus the one-line mirror in ADR 0022 in a follow-up PR.

Use when mirroring the completed **Warmth Layer v1** presentation ticket. This is an **execution closeout** record, **not** new doctrine and **not** sequencing authority.

### Core fields (table)

| Field | Value |
| ----- | ----- |
| **Decision ID** | D-022 |
| **Title** | MC-S3-005 complete — Warmth Layer v1 constrained presentation refinement closed out |
| **Status** | Completed (merged) |
| **Decision Type** | UX / presentation (execution closeout; read-only engine posture unchanged) |
| **Strategic Horizon** | Short-term (MVP / immediate sprint) |
| **Visibility** | Internal |
| **Date** | 2026-04-06 |
| **Related Release** | Stability Engine™️ - Transition Readiness |
| **Related Tickets** | MC-S3-005 |
| **Repo file (canonical detail)** | `docs/decisions/0022-mc-s3-005-warmth-layer-v1-constrained-presentation-refinement-closeout.md` |
| **Repo pointers** | `docs/ops/HEDGR_STATUS.md` §6 (`MC-S3-005`), §7, §7a, §36; merged PR **#112** |

### Long-form fields (paste into Notion rich text as needed)

**Problem / trigger**

- Shipped Stability Engine dashboard trust surfaces needed **constrained retail presentation** refinement (spacing, typography, humane microcopy) under fixed doctrine.
- Work was authorized only as a **§7**-named scoped ticket, with **ADR 0016** as the **boundary** reference (not standalone implementation permission).

**Decision**

- **`MC-S3-005`** is **closed** as **presentation-only**, **meaning-preserving** refinement on the dashboard engine trust cluster and ticket-local `lib/engine` copy modules; test updates limited to tracking presentation/copy deltas.
- **`docs/ops/HEDGR_STATUS.md`** remains **canonical** for merged truth, sequencing, and authority (**§7** / **§7a**).
- **ADR 0022** exists for **closeout traceability only**; it does **not** name a successor or widen scope.
- **ADR 0016** remains an **Accepted boundary reference** for Warmth red lines; it does **not** bypass **§7** / **§7a** for future work.

**Rationale**

- Aligns with ADR **0013** (allocation informational), **0014** (read-only/non-executing), **0015** (engine as system center), **0016** (presentation-only Warmth), **0017** (tx-review dev seam unchanged).
- Preserves **`MC-S3-004`** / **D-021** / ADR **0021** Vitest regression contract for notice copy and mock notice wiring.

**Consequences**

- Repo-native closeout recorded in **§36** and **ADR 0022**; operators can mirror to Notion from this file.
- **No approved next ticket** until **`HEDGR_STATUS.md` §7** is explicitly updated; **§7a** has no active execution brief.

**Risk / trade-offs**

- **Misread risk:** Warmth or Transition Readiness could be interpreted as an open-ended workstream. **Mitigation:** Executive and Notion copy must state **one closed §7-scoped ticket**, **presentation-only**, **no successor unless §7 names one**.
- **Regression risk:** Low; **`MC-S3-004`** contract unchanged in intent.

**Revisit / kill criteria**

- Any new implementation requires a **fresh §7**-named ticket and **§7a** brief.
- Revisit if **§7** names a successor or doctrine/ADR boundaries materially change (would be a new decision row, not an edit that rewrites D-022 into new authority).

**Strategic pillar alignment**

- **Stability Engine as system center** (ADR 0015); **read-only / informational / non-executing** posture preserved (ADR 0014); **allocation bands informational, not accounting** (ADR 0013); **capital preservation / trust-first** presentation without execution or ledger-truth drift.

**Explicit negatives (required for Notion body if schema splits them)**

- **No** new product states, **no** new product behavior, **no** execution / accounting / ledger-truth widening.
- **No** Copilot authority expansion, **no** backend / live engine coupling, **no** widening of ADR **0017** transaction-review dev seam semantics.
- **No** implication that **ADR 0016 acceptance** authorizes further work without **§7**.

---

## 8. Releases — Stability Engine™️ - Transition Readiness (copy row)

**Not canonical.** Mirror **`docs/ops/HEDGR_STATUS.md`** (**§6b**, **§7**, **§32–§36**) for any conflict. This block is executive-readable **copy source** only.

| Field | Value |
| ----- | ----- |
| **Release name** | Stability Engine™️ - Transition Readiness |
| **Status** | Shipped (documentation + governed implementation milestones complete through **`MC-S3-005`**) |
| **Ship date (last merged milestone)** | 2026-04-06 *(**MC-S3-005**, PR **#112**)* |
| **Objective** | Establish and exercise **post–Foundation** boundary readiness (**§6b** taxonomy and scrutiny), governance handoff traceability, ADR **0016** acceptance as **boundary** (not queue authority), regression resistance for shipped trust surfaces (**MC-S3-004**), and **one** constrained **Warmth Layer v1** presentation pass (**MC-S3-005**) — all **subordinate** to read-only / informational Stability Engine posture. |
| **Non-goals** | Execution semantics; accounting or ledger-truth drift; backend/live engine coupling; Copilot runtime binding; treating **§6b** inventory or **ADR 0016** as **approved next** work; implying a **queued successor** ticket; widening ADR **0017** seam. **No approved next ticket** unless **`HEDGR_STATUS.md` §7** explicitly names one. |
| **Doctrine traceability** | ADR **0013**, **0014**, **0015**, **0016** (boundary), **0017** (where relevant); closeout records **ADR 0018–0022**; canonical ops **`HEDGR_STATUS.md`**. |
| **Success criteria (repo-grounded)** | **`MC-S3-001`** — §6b standard documented (**§32**); **`MC-S3-002`** — §6b/§7 handoff (**§33**); **`MC-S3-003`** — ADR **0016** Accepted + index/ops reconciliation (**§34**); **`MC-S3-004`** — Vitest regression contract merged (**§35**, PR **#111**); **`MC-S3-005`** — presentation-only Warmth v1 merged (**§36**, PR **#112**). **Foundation** remains prior closed baseline (**§6a**, **MC-S2-023**). |
| **Work items (completed)** | `MC-S3-001`, `MC-S3-002`, `MC-S3-003`, `MC-S3-004`, `MC-S3-005` — all merged per **§7** history and **§32–§36**. |
| **Progress %** | 100% *for this named Transition Readiness milestone set* — does **not** imply backlog completion or automatic follow-on. |
| **Notes / page body** | **§6b** remains **taxonomy and scrutiny input only**, not sequencing authority. **§7** / **§7a** gate all future execution. **Warmth** is **not** an open-ended stream: **MC-S3-005** was a **single** §7-scoped **presentation-only** ticket. **Cursor plans** and Notion are **not** authority (see `AGENTS.md`, `HEDGR_SPRINT_PLANNING_PROTOCOL.md`). |

---

## 9. Micro-Contracts / Work — MC-S3-005 (copy row)

| Field | Value |
| ----- | ----- |
| **Ticket ID** | MC-S3-005 |
| **Name / title** | Warmth Layer v1 — constrained presentation refinement for shipped Stability Engine trust surfaces |
| **Status** | Complete (merged) |
| **Done** | Yes |
| **Release** | Stability Engine™️ - Transition Readiness |
| **Work type** | Product / UX (presentation-only; trust surfaces) |
| **Reversible?** | Yes (revert PR **#112**; no ledger or execution state) |
| **Date (merged)** | 2026-04-06 |
| **Acceptance criteria (repo summary)** | Presentation-only changes on dashboard engine cluster + `lib/engine` copy modules; **no** new `EnginePosture` / trust states; **no** IA restructuring; **`MC-S3-004`** Vitest contract preserved; **no** backend / Copilot / ADR **0017** widening — per **`HEDGR_STATUS.md` §6** (`MC-S3-005`) and **§36**. |
| **PR link** | *(insert GitHub PR **#112** URL)* |
| **Related ADR / Decision Log** | Closeout: **ADR 0022** / **D-022**. Boundary reference: **ADR 0016** / **D-016** (not a substitute for **§7**). |
| **System role** | *(optional)* Stability Engine — consumer dashboard trust surfaces (read-only / informational). |

**Do not** create a placeholder “no active ticket” work row; that state lives in **`HEDGR_STATUS.md` §7** / **§7a** only.

---

## 10. Drift review checklist (post–MC-S3-005)

Apply **only** if the live Notion row contradicts repo truth. **Repo wins.** Do not rewrite historical decision bodies unless a line now reads as **false** or **mis-sequencing**.

| Notion row / topic | Repo alignment note |
| ------------------ | ------------------- |
| **Release: Transition Readiness** | Should list **`MC-S3-001`–`MC-S3-005`** as **shipped** milestones, **Foundation** as **prior** closed baseline, **no §7 successor**, **§6b** not authority — use **§8** above. |
| **D-021** (MC-S3-004) | Optional one-line: **`MC-S3-005`** completion does **not** retire the regression contract — see **§6** optional touch. |
| **D-020** (MC-S3-003) | No change required unless Notion implies **ADR 0016** alone authorizes ongoing UI work; if so, add: *Implementation still requires **§7** / **§7a**; **MC-S3-005** closed under D-022.* |
| **D-019** (MC-S3-002) | No change required. |
| **D-018** (MC-S3-001) | No change required. |
| **D-016** (ADR 0016) | No change required; remains **Accepted** boundary. Optional relation: **related decision** D-022 (execution closeout of first §7 Warmth ticket). |
| **Phase 2 - Trust Expression** | Ensure wording does **not** read as **approved next queue**; repo sequencing is **§7** only. |
| **Phase 3 - Operational Trust** | Same; **Foundation** and **Transition Readiness** milestones are **historical + taxonomy**, not automatic continuation. |
| **Phase 4 - Governance hardening** | **§6b** example row: **deferred** / **prerequisite-gated** — not **in progress** unless **§7** names it. |
| **Phase 5 - Copilot binding** | **Blocked** for execution-style binding per **§6b** inventory example; must **not** read as queued. |
| **Work: MC-S3-004** | Set **Release** to **Transition Readiness** if missing; **Status** complete/merged; optional link to **D-021**. No successor implied. |
