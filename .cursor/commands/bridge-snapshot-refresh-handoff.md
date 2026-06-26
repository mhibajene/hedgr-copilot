# bridge-snapshot-refresh-handoff

You are operating in **Bridge Snapshot Refresh Handoff Mode**.

## Role

This shared handoff block is used after Codex generates or updates a Hedgr weekly review or MVP process review.

It refreshes static bridge-visible review snapshots.

It does not create authority.

It does not activate tickets.

It does not sequence implementation.

It does not alter bridge runtime behavior.

## Authority posture

The bridge is a `READ_ONLY` evidence-retrieval layer.

It is subordinate to:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs
- active doctrine under `docs/doctrine/*`
- repo-native governance files

Bridge snapshots are evidence only.

They must not become:

- implementation authority
- sequencing authority
- ticket activation authority
- repo mutation authority
- a substitute for `docs/ops/HEDGR_STATUS.md`
- a substitute for accepted ADRs
- a substitute for doctrine

Snapshot refresh does not resolve weekly-review authority treatment.

If a weekly review includes bridge snapshots, bridge runtime work, command files, or other support infrastructure, the review must still classify that material through the authority treatment note required by `docs/ops/reviews/README.md`. A refreshed snapshot can point to evidence; it cannot make support work a completed ticket, sequencing input, or implementation authority without repo-native authority such as `docs/ops/HEDGR_STATUS.md`.

## Commands

After creating or updating a weekly review or MVP process review, run:

```bash
pnpm bridge:snapshots:refresh
pnpm bridge:snapshots:check
```

If the repo has not yet implemented these commands, report:

```text
Bridge snapshot refresh/check commands unavailable.
No bridge snapshot freshness validation was completed.
```

Do not invent success.

## Expected changed files

The refresh may update only static bridge snapshot files such as:

- `docs/ops/bridge/latest-weekly-review.json`
- `docs/ops/bridge/latest-mvp-process-review.json`
- `docs/ops/bridge/review-index.json`

Do not update:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs
- `docs/doctrine/*`
- bridge runtime routes

unless separately authorized by repo-native authority.

## Required preserved guardrails

Every refreshed bridge snapshot must preserve:

- `mode: READ_ONLY`
- `execution_authority: false`
- `may_activate_ticket: false`
- `mutation_allowed: false`
- `ticket_activation_allowed: false`

Review snapshots must preserve:

- `evidence_only: true`
- `non_authoritative_evidence_only: true`

Weekly review snapshots must preserve:

- `next_ticket_proposals: false`
- `sequencing_recommendations: false`
- `activation_language: false`

MVP process review snapshots must preserve:

- `implementation_recommendations: false`
- `authority_inference: false`
- `blocker_closure_inference: false`

Review index snapshots must preserve:

- `evidence_discovery_only: true`
- `review_ranking: false`
- `review_prioritization: false`
- `review_interpretation: false`

## Prohibited snapshot drift

Stop and report a governance conflict if refresh output introduces or changes any field implying:

- execution authority
- ticket activation
- sequencing
- implementation approval
- provider approval
- market approval
- Class B readiness
- Class C readiness
- blocker closure
- authority inference
- dynamic repo scanning
- arbitrary repo retrieval

Prohibited field names include, but are not limited to:

- `recommended_next_ticket`
- `next_ticket`
- `priority`
- `sequencing`
- `implementation_ready`
- `approved`
- `selected`
- `provider_selected`
- `market_selected`
- `class_b_ready`
- `class_c_ready`
- `blocker_closed`
- `authority_granted`

## Runtime boundary

This handoff must not change the bridge worker into a dynamic repo scanner.

The bridge runtime must continue to serve bounded, allowlisted static snapshot files.

Do not add routes for arbitrary repo file retrieval.

Do not make bridge responses depend on runtime git inspection.

## Validation result

After running the commands, summarize:

```text
Bridge snapshot refresh:
- command run:
- result:
- files changed:

Bridge snapshot check:
- command run:
- result:
- ambiguity or failure notes:
```

If validation fails, stop and report the failure.

Do not claim the review automation is complete until the failure is either fixed or explicitly surfaced in the handoff.
