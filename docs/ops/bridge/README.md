# HedgrOps Read-Only Review Evidence Bridge Snapshots

Status: Class A informational support layer
Mode: READ_ONLY
Authority: Non-authoritative evidence retrieval only

## Purpose

This directory holds the static JSON snapshots served by the HedgrOps read-only review evidence bridge.

The snapshots are retrieval artifacts only. They do not create authority, activate tickets, set sequencing, close blockers, authorize implementation, or permit repo mutation.

## Snapshot Files

- `current-status.json` - authority-summary placeholder contract
- `latest-weekly-review.json` - latest weekly review evidence pointer
- `latest-mvp-process-review.json` - latest MVP process review evidence pointer
- `review-index.json` - evidence-discovery index

## Governance Boundary

The bridge and these files remain subordinate to:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs
- `docs/doctrine/*`
- `docs/ops/reviews/README.md`

Reviews remain evidence, not direction. These snapshots must not be used as implementation authority.
