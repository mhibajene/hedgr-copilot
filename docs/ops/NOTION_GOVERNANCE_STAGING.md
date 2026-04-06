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
| **Decision ID / ticket** | MC-S3-004 |
| **Title** | Regression resistance for already-shipped Stability Engine trust surfaces (test-only) |
| **Status** | Completed (merged) |
| **Decision Type** | Engineering / quality (regression contract) |
| **Strategic Horizon** | Short-term (MVP / immediate sprint) |
| **Visibility** | Internal |
| **Date** | 2026-04-06 |
| **Repo pointers** | `docs/ops/HEDGR_STATUS.md` §6 (`MC-S3-004`), §7, §7a, §35; `apps/frontend/__tests__/engine-notices-and-mock-contract.test.ts`; merged PR **#111** |

**Summary / notes (concise)**

- Vitest locks **`ENGINE_NOTICE_COPY`** (informational / non-ledger framing) and **`getMockEngineState`** notice wiring for non-`normal` postures.
- No ADR or doctrine change; no product semantics change under ticket intent; hermetic CI posture unchanged (`AGENTS.md`).

---

## 7. Decision Log — MC-S3-005 execution closeout (copy row)

Use when mirroring the completed **Warmth Layer v1** presentation ticket (not a new product doctrine ADR). Wording mirrors `docs/ops/HEDGR_STATUS.md` **§36** and **§6** (`MC-S3-005`).

| Field | Value |
| ----- | ----- |
| **Decision ID / ticket** | MC-S3-005 |
| **Title** | Warmth Layer v1: constrained presentation refinement for shipped Stability Engine trust surfaces |
| **Status** | Completed |
| **Decision Type** | UX / presentation (read-only engine posture unchanged) |
| **Strategic Horizon** | Short-term (MVP / immediate sprint) |
| **Visibility** | Internal |
| **Date** | 2026-04-06 |
| **Repo pointers** | `docs/ops/HEDGR_STATUS.md` §6 (`MC-S3-005`), §7, §7a, §36; `docs/decisions/0022-mc-s3-005-warmth-layer-v1-constrained-presentation-refinement-closeout.md`; `apps/frontend/app/(app)/dashboard/Engine*.tsx`; `apps/frontend/lib/engine/notices.ts`, `posture-context.ts`, `*-copy.ts` modules cited in §6 |

**Summary / notes (concise)**

- Presentation-only spacing, typography, and microcopy on shipped engine trust surfaces; **`MC-S3-004`** regression contract preserved.
- **ADR 0022** is a **closeout record** only; **ADR 0016** remains the binding Warmth boundary reference; **§7** still gates any successor ticket.
