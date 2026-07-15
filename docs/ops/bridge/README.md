# HedgrOps Read-Only Review Evidence Bridge Snapshots

Status: Class A informational support layer
Mode: READ_ONLY
Authority: Non-authoritative evidence retrieval only

## Purpose

This directory holds the static JSON snapshots served by the HedgrOps read-only review evidence bridge.

The snapshots are retrieval artifacts only. They do not create authority, activate tickets, set sequencing, close blockers, authorize implementation, or permit repo mutation.

## Adopted Capability Contract

The governing documentation contract for the Bridge's proposed evolution into a read-only institutional evidence layer is:

- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`

The refined historical proposal is preserved at:

- `docs/ops/bridge/PROPOSED_HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`

Contract adoption establishes evidence-observability boundaries only. It does not change the current snapshot runtime, activate Phase 0 or any later phase, add endpoints or routes, implement schemas or generators, widen retrieval, authorize mutation, accept evidence, sequence tickets, or create product, architecture, founder-disposition, financial-execution, or customer-money authority.

The adopted target terminology for any separately authorized future implementation is **HedgrOps Read-Only Institutional Evidence Bridge**. The current runtime remains the bounded snapshot bridge documented in this README.

## Snapshot Files

- `current-status.json` - legacy bounded status placeholder; not a Repo Authority Projection and not an authority source
- `latest-weekly-review.json` - latest weekly review evidence pointer
- `latest-mvp-process-review.json` - latest MVP process review evidence pointer
- `review-index.json` - evidence-discovery index

## Repo-native review command handoff

Review-generation operator commands live under:

- `.cursor/commands/weekly-review.md`
- `.cursor/commands/mvp-process-review.md`
- `.cursor/commands/bridge-snapshot-refresh-handoff.md`

After generating weekly or MVP process reviews, operators should refresh and check static bridge snapshots using:

```bash
pnpm bridge:snapshots:refresh
pnpm bridge:snapshots:check
```

These commands and snapshots remain operator-support evidence only. They do not create authority, activate tickets, sequence implementation, or alter bridge runtime behavior.

## Governance Boundary

The bridge and these files remain subordinate to:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs
- `docs/doctrine/*`
- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md` for the adopted Bridge evidence-observability contract
- `docs/ops/reviews/README.md`

Reviews remain evidence, not direction. These snapshots must not be used as implementation authority.

## Review Use Boundary

When weekly reviews cite bridge snapshots, bridge runtime work, command files, or other support infrastructure, reviewers must preserve the authority distinction required by `docs/ops/reviews/README.md`.

Classify the material as one of:

- recorded as a completed ticket in `docs/ops/HEDGR_STATUS.md`
- mirrored or reconciled in `docs/ops/HEDGR_STATUS.md`
- closed through local verification or closeout evidence
- included as merged support evidence only
- excluded as draft, review-draft, in-progress, or non-authorizing material

A snapshot refresh, bridge response, command prompt, or local verification file is evidence only. It does not activate tickets, sequence implementation, or widen authority unless repo-native authority explicitly says so.
