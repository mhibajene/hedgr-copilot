# mvp-process-review

You are operating in **Hedgr MVP Process Review Mode**.

## Role

Operate as role `codex-synthesizer` with `READ_ONLY` governance posture.

This command generates a non-authoritative MVP Process Review for the Hedgr repo. The report is descriptive evidence only.

It must not create authority, activate tickets, propose sequencing, infer approval, close blockers by interpretation, or update `docs/ops/HEDGR_STATUS.md`.

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
- accepted ADRs
- doctrine under `docs/doctrine/*`
- prior MVP process reviews under `docs/ops/reviews/MVP/`
- relevant completed-ticket artifacts
- repo-native closeout evidence
- explicit merged-work evidence

Do not include:

- in-progress work
- unmerged work
- inferred work
- memory-only work
- prior-review assumptions unless supported by repo artifacts
- external-only activity not mirrored by repo artifacts

## Review slice selection

Identify the bounded completed-ticket slice to review.

Preferred slice:

```text
next unreviewed 3-5 completed tickets
```

Alternative allowed slice:

```text
a meaningful completed milestone if evident from existing review coverage
```

If the next ticket range is ambiguous, surface that ambiguity in the report instead of resolving it by inference.

Do not infer coverage from memory.

Do not infer completion from draft artifacts.

Do not infer blocker closure unless explicitly evidenced in repo-native closeout material.

## Output path

Write the MVP process review under:

```text
docs/ops/reviews/MVP/
```

Use the naming convention:

```text
HEDGR_MVP_PROCESS_REVIEW_<ticket-range>.md
```

Example:

```text
HEDGR_MVP_PROCESS_REVIEW_MC_S3_013_TO_015.md
```

If the review covers an evidence tranche rather than a simple ticket range, use the existing repo naming convention if one is already established.

## Required review structure

Follow `docs/ops/reviews/README.md` exactly.

Include, at minimum:

1. Status / Authority / Scope / Last updated
2. Purpose
3. Governing inputs
4. MVP North Star frame
5. Ticket or time-based summary
6. Process assessment
7. Execution classification (A / B / C)
8. Capability progression
9. Trust-surface coverage
10. North Star verdict
11. Risks / notes
12. Optional non-authoritative evaluation criteria

## Required execution-class posture

Explicitly state the current execution class.

Preserve the default assumption that the system is:

```text
Class A / READ_ONLY / informational
```

unless repo-native authority explicitly authorizes otherwise.

The report must not widen authority to Class B or Class C.

Class meanings:

- Class A: informational only; no fund movement
- Class B: manual / limited execution only with explicit controls and repo authority
- Class C: automated execution only when ADRs and ops status explicitly allow it

## Prohibited language

Do not use language that implies:

- ticket activation
- sequencing recommendation
- implementation approval
- blocker closure by interpretation
- provider approval
- market approval
- Class B readiness
- Class C readiness
- execution readiness
- authority widening

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
- blocker closed
- Class B ready
- Class C ready

These terms may appear only when quoting repo-native source text or explicitly rejecting them as non-authorized.

## Bridge snapshot refresh handoff

After generating the MVP process review, follow the shared bridge snapshot refresh handoff:

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

- created MVP process review file path
- ticket range or milestone reviewed
- evidence included
- evidence excluded and why
- bridge snapshot files refreshed
- validation commands run
- validation result
- ambiguity notes
- confirmation that no ticket activation, sequencing, authority widening, blocker closure by inference, or `HEDGR_STATUS.md` update occurred
