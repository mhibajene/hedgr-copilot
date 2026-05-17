# Thesis Archive

Status: Historical snapshot governance

## Purpose

`docs/thesis/archive/` preserves milestone snapshots of the Hedgr Governance System thesis.

Archive files are historical records. They do not authorize implementation, sequencing, execution posture, public claims, or authority expansion.

## Snapshot Rules

Create a snapshot when the living thesis materially changes in a way that should remain historically observable.

Appropriate triggers include:

- major governance-thesis version changes
- material changes to authority-boundary framing
- public-publication preparation
- substantial reorganization of the living thesis
- milestone-level shifts in repo-native governance interpretation

Snapshots should preserve the thesis posture at the time they were created.

## Naming Convention

Use lowercase, versioned, descriptive filenames:

```text
v1-foundational-governance-thesis.md
v2-repo-native-governance-transition.md
v3-transition-readiness-operating-model.md
```

The version number should identify the historical snapshot sequence. The slug should identify the thesis milestone, not a sprint, ticket, or implementation release.

## Immutability Expectations

Do not silently rewrite archived snapshots.

If a snapshot contains an error, add a dated correction note or create a later snapshot that supersedes the earlier interpretation. Do not erase the historical record to make past language conform to later governance understanding.

## Anti-Drift Constraints

Archived thesis files must not be treated as:

- current execution truth
- roadmap authority
- ADR replacements
- public marketing copy
- implementation briefs
- evidence of approved execution posture

Current execution truth remains in `docs/ops/HEDGR_STATUS.md`. Canonical decision authority remains in accepted ADRs.
