# Retired Bridge legacy placeholder

**Status:** Retired under Internal **D-082** / `HEDGR_STATUS.md` **§214** / ticket `BRIDGE-LEGACY-RETIRE-001`.  
**Date:** 2026-08-23  
**Class:** Class A / execution-neutral Bridge hygiene. Not Phase 2. Not RAP. Not CURRENT.

This directory preserves the byte-identical legacy Bridge placeholder that previously lived at `docs/ops/bridge/current-status.json`.

| Field | Value |
| --- | --- |
| Live path after retirement | **removed** — `docs/ops/bridge/current-status.json` is no longer a live artifact |
| Archive path | `docs/ops/bridge/archive/retired-legacy-current-status.json` |
| SHA-256 | `181dfa46feb0f25149b81cc17516cce0efc89eab95d3e30e9f2b82affcc1fc2a` |
| Historical `generated_at` | `2026-06-24T00:00:00.000Z` |
| R1 first-serve | **2026-07-19** |
| Earliest retirement consideration | **2026-08-02** |
| Authority routes | Unchanged RAP-only mapping for `/authority`, `/authority-summary`, `/current-status`, and `/hedgr/status/authority-summary` |

This archive is historical evidence only. It is not served by the Worker, is not a Repo Authority Projection, and must not be date-bumped into CURRENT. Rollback is a bounded restore of the live path from this archive plus revert of D-082 / §214.
