# weekly-review

You are operating in **Hedgr Weekly Review Mode**.

## Role

Operate as role `codex-synthesizer` with `READ_ONLY` governance posture.

This command generates a non-authoritative Hedgr Weekly Review for the current weekly time window ending on the run date. The review is descriptive evidence only.

It must not create authority, activate work, suggest sequencing, or update `docs/ops/HEDGR_STATUS.md`.

## Authority posture

Repo authority remains with:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs in `docs/decisions/`
- active doctrine under `docs/doctrine/*`
- active repo-native governance files

This command is subordinate to those files. If any conflict exists between this command and repo-native authority, repo-native authority wins.

## Required inputs

Use repo-native artifacts only, especially:

- `docs/ops/reviews/README.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADRs where relevant
- doctrine under `docs/doctrine/*`
- prior weekly reviews under `docs/ops/reviews/weekly/`
- explicit completed-ticket evidence
- explicit merged-work evidence
- git history for the bounded weekly window

Do not include:

- in-progress work
- unmerged work
- inferred work
- external-only activity not mirrored by repo artifacts
- future-track drafts unless explicitly classified as excluded or non-completed evidence

## Output path

Write the weekly review to:

```text
docs/ops/reviews/weekly/YYYY-MM-DD-weekly-review.md
```

Use the run date or weekly window end date for `YYYY-MM-DD`.

## Required review structure

Follow `docs/ops/reviews/README.md` exactly.

Include, at minimum:

1. Status / Authority / Scope / Last updated
2. Purpose
3. Governing inputs used
4. MVP North Star frame
5. Time-based summary or bounded completed-work summary
6. Process assessment
7. Execution classification (A / B / C)
8. Capability progression
9. Trust-surface coverage
10. North Star verdict
11. Risks / notes
12. Optional non-authoritative evaluation criteria

## Required statements

The review must explicitly state:

- Status is non-authoritative weekly review artifact.
- Execution mode is `READ_ONLY`.
- The review is descriptive evidence only.
- The review does not activate tickets.
- The review does not name next work.
- The review does not suggest sequencing.
- The review does not update or alter `docs/ops/HEDGR_STATUS.md`.
- The review does not alter `docs/ops/HEDGR_STATUS.md` `§7` / `§7a` authority.
- Current execution posture remains Class A / informational unless repo authority explicitly states otherwise.
- No customer-money, custody, rail execution, deposit, withdrawal, stablecoin conversion, Class B, or Class C authority is introduced by this review.

## Prohibited language

Do not use language that implies:

- next ticket
- recommended sequence
- implementation approval
- provider approval
- market approval
- Class B readiness
- Class C readiness
- execution readiness
- authority widening
- blocker closure by interpretation

Avoid terms such as:

- activate
- approve
- selected
- ready
- implementation-ready
- next up
- should proceed
- authorized
- greenlit
- Class B ready
- Class C ready

These terms may appear only when quoting repo-native source text or explicitly rejecting them as non-authorized.

## Bridge snapshot refresh handoff

After generating the weekly review, follow the shared bridge snapshot refresh handoff:

```text
.cursor/commands/bridge-snapshot-refresh-handoff.md
```

Expected commands:

```bash
pnpm bridge:snapshots:refresh
pnpm bridge:snapshots:check
```

If those commands are unavailable or fail, report the failure explicitly. Do not invent success.

## Completion summary

After completion, summarize:

- created weekly review file path
- weekly time window reviewed
- completed-ticket evidence included
- merged-work evidence included
- excluded evidence and why
- bridge snapshot files refreshed
- validation commands run
- validation result
- ambiguity notes
- confirmation that no ticket activation, sequencing, authority widening, or `HEDGR_STATUS.md` update occurred
