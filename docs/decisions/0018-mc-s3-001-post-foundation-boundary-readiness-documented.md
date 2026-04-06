# ADR 0018 — MC-S3-001: post-foundation boundary readiness documented (closeout record)

**Status:** Accepted  
**Date:** 2026-04-03  
**Owners:** Hedgr Core  
**Scope:** Governance documentation and hand-off discipline only (`docs/ops/HEDGR_STATUS.md` **§6b** and **§32**)

**Notion mirror (non-authoritative):** D-018

---

## Interpretation

This document is a **repo-native record** that **`MC-S3-001`** completed as a **documentation-only** ticket. It does **not** name a next implementation ticket, widen execution authority, or replace **`docs/ops/HEDGR_STATUS.md`** as the source of merged truth and sequencing. **Only `HEDGR_STATUS.md` §7** (and **§7a** when active) authorizes implementation work.

---

## Context

After Foundation release closeout (**§6a** / `MC-S2-023`), governance needed a **Transition Readiness** standard: how to **classify** and **scrutinize** candidate work without treating taxonomy as approval.

The canonical deliverable is **`HEDGR_STATUS.md` §6b** (boundary categories, **classification is not authorization**, inherited phase inventory as reference, readiness checklist). Completed ticket record: **§32**.

---

## Decision

1. **`MC-S3-001`** is **closed** as **documentation-only** governance: post-foundation boundary readiness criteria live in **§6b**; completion is recorded in **§32**.

2. **§6b** is **taxonomy and scrutiny input**, not authorization to start implementation. Inventory labels (including *could-be-admitted-later*) are **not** “approved next.”

3. **Only §7** names the approved next implementation ticket; **§7a** holds the active execution brief when a ticket is active.

4. No product, runtime, or execution semantics were introduced under this ticket.

---

## Consequences

- Readers have a stable **ADR-shaped pointer** from repo decisions to the **§6b** standard and **§32** closeout.
- Assistants and reviewers should still open **`HEDGR_STATUS.md`** for current **§7** / **§7a** state; this ADR does not duplicate or override that authority.
- Future changes to transition taxonomy belong in **`HEDGR_STATUS.md`** (and governance tickets), not silent drift in this file alone.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§6b**, **§7**, **§7a**, **§30**, **§32** (`MC-S3-001`)
- `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md` (governance vs execution; §7 gate)
- `docs/decisions/SPRINT-2-ADR-INDEX.md` (§6b vs §7 traceability)
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md` (read-only posture, context)
- `docs/decisions/0015-stability-engine-is-the-system-center.md` (engine-led framing, context)
