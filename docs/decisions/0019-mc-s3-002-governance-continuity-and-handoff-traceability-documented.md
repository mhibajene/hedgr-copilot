# ADR 0019 — MC-S3-002: governance continuity and §6b / §7 handoff traceability documented (closeout record)

**Status:** Accepted  
**Date:** 2026-04-03  
**Owners:** Hedgr Core  
**Scope:** Cross-links and read-order clarity across ops docs, ADR index, and `AGENTS.md` (**§33**)

**Notion mirror (non-authoritative):** D-019

---

## Interpretation

This document records completion of **`MC-S3-002`** as **documentation and process only**. It reinforces where **sequencing authority** lives in the repo. It does **not** approve new implementation work. **`.cursor/plans`** and similar paths are **execution aids**, not governance authority.

---

## Context

After **§6b** (`MC-S3-001`), assistants and executive surfaces could still confuse **classification** with **authorization**, or treat auxiliary artifacts as sequencing sources.

**§33** records the deliverables: reinforced **§6b** vs **§7** / **§7a** language in **`HEDGR_STATUS.md`**, traceability in **`SPRINT-2-ADR-INDEX.md`** (including Usage Rule item 5), and the engine-facing read-order note in **`AGENTS.md`**.

---

## Decision

1. **`MC-S3-002`** is **closed** as **docs/process only**: handoff traceability and anti-drift cross-links are captured in **§33** and cited files.

2. **`docs/ops/HEDGR_STATUS.md`** remains **canonical** for strategic continuity, merged implementation truth, and **§7** / **§7a** execution authority.

3. **§6b** remains **input to judgment**, not a backlog approval mechanism.

4. **Cursor plans**, Notion, and roadmap narrative do **not** substitute for an explicit **§7** update when naming the next ticket.

---

## Consequences

- Repo decision index and onboarding paths can cite **ADR 0019** for “why §7 wins over §6b” without rereading full **§33** prose.
- Misreads of inventory tables as queued work remain a **process risk**, mitigated by **§2**, **§6b**, **§3**, and index usage rules—not by this ADR alone.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§2**, **§3**, **§6b**, **§7**, **§7a**, **§30**, **§33** (`MC-S3-002`)
- `docs/decisions/SPRINT-2-ADR-INDEX.md` (MC-S3-002 traceability; Usage Rule 5)
- `AGENTS.md` (engine-facing read order: **§7** / **§7a** vs **§6b**)
- `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md` (governance vs execution mode)
- `docs/decisions/0018-mc-s3-001-post-foundation-boundary-readiness-documented.md` (prior Transition Readiness record)
