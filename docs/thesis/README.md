# Hedgr Thesis Governance

Status: Governed interpretive documentation

## Purpose

`docs/thesis/` preserves evolving Hedgr thesis artifacts as repo-native institutional memory, including the Hedgr Governance System / AI-Native Operating Model thesis and support-layer interpretive doctrines such as Financial Fidelity.

The thesis directory exists to record how Hedgr's governance architecture and institutional product philosophy are understood over time. It is not an execution surface, implementation brief, roadmap, ADR substitute, accounting authority, treasury policy, or product approval mechanism.

## Authority Boundary

The thesis is subordinate to repo-native authority.

Binding execution truth remains:

1. `docs/ops/HEDGR_STATUS.md`
2. accepted ADRs under `docs/decisions/`
3. `.cursorrules`
4. `AGENTS.md`
5. repo-native doctrine and governance standards

If this directory conflicts with those sources, those sources win. Do not silently reconcile conflicts. Surface the conflict through the governed review chain.

## Non-Authoritative Status

Documents in this directory do not:

- authorize implementation
- name or activate tickets
- create roadmap authority
- widen execution posture
- create Class B or Class C authority
- approve runtime behavior
- redefine governance hierarchy
- substitute for ADRs
- override `docs/ops/HEDGR_STATUS.md`

`docs/ops/HEDGR_STATUS.md` remains execution truth. ADRs remain canonical decision authority. This thesis is interpretive and institutional, not executable authority.

## Versioning Model

The living governance-system thesis is maintained in `HEDGR_GOVERNANCE_SYSTEM.md`.

Support-layer interpretive theses may live as separate documents when the interpretation is durable enough to preserve independently. `FINANCIAL_FIDELITY.md` records Hedgr's Financial Fidelity interpretation and remains subordinate to the same authority boundary.

Major institutional shifts should be recorded in `CHANGELOG.md` when they change how the governance system is understood at the thesis level. The changelog is not git history, release notes, sprint tracking, or implementation status.

Historical versions are preserved as snapshots in `archive/` when the thesis reaches a meaningful milestone. Snapshots should preserve the historical posture of the thesis at that point in time.

## Snapshot Policy

Create a snapshot when:

- the governance thesis materially changes
- a major authority-boundary model is formalized
- repo-native governance posture materially evolves
- Financial Fidelity interpretation materially changes
- Financial Fidelity semantics become operationalized through governed repo authority
- Stability Engine posture widens in a way that changes Financial Fidelity interpretation
- execution authority evolves in a way that changes how thesis-level fidelity language should be read
- public-facing publication is being considered
- the living thesis is reorganized in a way that would obscure prior framing

Snapshots must not be silently rewritten. Corrections should be handled by adding a note or creating a later snapshot, not by erasing the historical record.

## Anti-Drift Constraints

This thesis system must not introduce:

- implementation authority leakage
- speculative roadmap authority
- public marketing reinterpretation
- AI-generated governance invention
- hidden historical rewriting
- repo-authority duplication
- unsupported execution claims
- speculative autonomy framing

It must require:

- reconciliation against repo authority
- clear historical preservation
- milestone snapshotting when warranted
- explicit governance boundaries
- calm institutional language

## Publication Posture

This directory is founder-only institutional memory unless and until a separate governed publication process approves public use.

Public or external versions must not reinterpret the thesis as marketing positioning, implementation authority, fundraising narrative, or speculative AI-autonomy claim. Any public derivative must remain subordinate to repo truth and preserve the authority boundary.
