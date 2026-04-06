# ADR 0020 — MC-S3-003: ADR 0016 accepted and authority surfaces reconciled (closeout record)

**Status:** Accepted  
**Date:** 2026-04-04  
**Owners:** Hedgr Core  
**Scope:** ADR status, Sprint 2 index, ops hand-off file, and Notion staging mirror (**§34**); **no** product or runtime changes

**Notion mirror (non-authoritative):** D-020

---

## Interpretation

This document records **`MC-S3-003`**: **ADR 0016** was set to **Accepted** in-repo with an **Acceptance note**, and governing surfaces were reconciled so **acceptance** cannot be misread as **implementation approval**. **Warmth Layer** work remains **boundary-gated** by **`HEDGR_STATUS.md` §7** / **§7a** and by **ADR 0013–0015** (and **ADR 0017** where the dev seam applies).

---

## Context

Repo surfaces risked stale *Proposed* framing for **ADR 0016** and inconsistent wording between the ADR, **`HEDGR_STATUS.md`**, and **`SPRINT-2-ADR-INDEX.md`**. Executive views needed a single, repo-first story: **0016 Accepted** as **scope and red lines** for presentation-only warmth during the read-only engine phase—not as automatic queue authorization.

Canonical completion detail: **`HEDGR_STATUS.md` §34**.

---

## Decision

1. **`MC-S3-003`** is **closed** as **documentation and ADR status only**: **ADR 0016** is **Accepted** with its **Acceptance note** (subordination to **`HEDGR_STATUS.md`**; **§7** / **§7a** still required for scoped implementation).

2. **`SPRINT-2-ADR-INDEX.md`** — **ADR 0016** section and **Usage Rule** item **6** reflect that acceptance is **not** a substitute for **§7**-named work.

3. **`HEDGR_STATUS.md`** — default path **§2** / **§3** / **§6b** reconciled for Warmth / companion ADR language; **§6a** evidence updated only where stale *Proposed* citations contradicted repo truth.

4. **`docs/ops/NOTION_GOVERNANCE_STAGING.md`** — aligned as **manual copy source**; repo remains SSoT.

5. **No** product or runtime files under this ticket.

---

## Consequences

- **ADR 0016** is institutionally **Accepted** for *what warmth may and may not do*; shipping warmth-scoped UI still requires **§7** / **§7a** and doctrine checks.
- Operators mirroring to Notion should copy from **`NOTION_GOVERNANCE_STAGING.md`** and **`HEDGR_STATUS.md`**, not the other way around.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§2**, **§3**, **§6a**, **§6b**, **§7**, **§7a**, **§34** (`MC-S3-003`)
- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md` (Warmth Layer boundary)
- `docs/decisions/SPRINT-2-ADR-INDEX.md` (ADR 0016; Usage Rule 6)
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0019-mc-s3-002-governance-continuity-and-handoff-traceability-documented.md`
