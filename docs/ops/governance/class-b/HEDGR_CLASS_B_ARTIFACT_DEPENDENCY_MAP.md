# HEDGR — Class B Artifact Dependency Map

## 1. Status / Authority / Scope

**Status:** Governance dependency map / documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and Hedgr doctrine.

**Scope:** Maps dependency relationships between future Class B prerequisite artifacts identified in `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`.

**Mode:** Sequencing logic only, not activation.

This dependency map does not authorize implementation, execution, custody, rails, deposits, withdrawals, stablecoin conversion, ledger mutation, treasury operations, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This artifact exists to consolidate the Class B governance spine.

It answers:

**Which future Class B prerequisite artifacts should precede, inform, or constrain others before any future Class B implementation proposal may be considered?**

It does not answer:

**Which implementation ticket should be opened next?**

It does not create:

- a backlog
- a queue order
- a default next ticket
- implementation authority
- ADR acceptance
- vendor approval
- legal approval
- custody approval
- rail approval
- pilot approval

## 3. Source inputs

The source inputs for this map are:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Inputs are used for dependency mapping only. They do not create new execution authority.

## 4. Artifact classes

| Class | Meaning | Examples | Authority effect |
|---|---|---|---|
| Foundation artifact | Defines broad prerequisite context or constraints. | legal / compliance requirements memo; custody boundary memo; rail classification register; liquidity / withdrawal control memo | informs later decisions; does not authorize implementation. |
| Decision-prep artifact | Narrows options and prepares future ADR consideration. | ADR scoping memo; vendor boundary memo; policy-runtime boundary memo | may prepare ADRs; does not accept ADRs. |
| Operational artifact | Defines pilot operations, controls, support, reconciliation, and incident handling. | pilot ops runbook; reconciliation SOP; support escalation matrix; audit evidence checklist | documents operating assumptions; does not activate operations. |
| UX / trust artifact | Defines customer-facing communication, copy, states, failures, and unsupported claims. | Class B trust UX pack; failure-state UX review; deposit / withdrawal pending-state copy review | constrains product surfaces; does not authorize surfaces. |
| Activation artifact | Only relevant if future governance separately considers implementation. | implementation-specific §7a brief; future scoped Class B ticket; required accepted ADRs | only effective if separately named and approved through repo governance. |

## 5. Dependency map

| Artifact | Class | Depends on | Informs / constrains | Why dependency matters | Current status |
|---|---|---|---|---|---|
| Legal / compliance requirements memo | Foundation artifact | `HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`; doctrine / constitutional constraints | custody boundary memo; rail classification register; trust UX pack; pilot ops runbook; ADR scoping memo | Jurisdiction, eligibility, KYC / AML, rail permission, and disclosure constraints shape every future Class B boundary. | Not created. |
| Custody boundary memo | Foundation artifact | legal / compliance requirements memo; MVP spec custody intent; current non-authorization posture | ADR scoping memo; trust UX pack; pilot ops runbook; reconciliation SOP; implementation-specific §7a brief | Asset-control, provider responsibility, failure modes, and custody guarantees must be known before trust claims or implementation boundaries. | Not created. |
| Rail classification register | Foundation artifact | legal / compliance requirements memo; custody boundary memo where asset custody or settlement boundaries are implicated; Class B gap register | ADR scoping memo; liquidity / withdrawal control memo; trust UX pack; pilot ops runbook; reconciliation SOP; implementation-specific §7a brief | Sandbox, internal test, manual pilot, limited live pilot, and not-approved rail states must be separated before any rail language can be used safely. | Not created. |
| Liquidity / withdrawal control memo | Foundation artifact | legal / compliance requirements memo; custody boundary memo; rail classification register; constitutional liquidity constraints | trust UX pack; pilot ops runbook; reconciliation SOP; ADR scoping memo; implementation-specific §7a brief | Withdrawal reliability, unresolved-path handling, liquidity buffers, and kill criteria must exist before a pilot can make customer-money claims. | Not created. |
| ADR scoping memo | Decision-prep artifact | legal / compliance requirements memo; custody boundary memo; rail classification register; liquidity / withdrawal control memo; gap register | future ADR drafting; future scoped Class B ticket; implementation-specific §7a brief | ADRs should be scoped after prerequisite boundaries are understood, not drafted prematurely. | Not created. |
| Class B trust UX pack | UX / trust artifact | legal / compliance requirements memo; custody boundary memo; rail classification register; liquidity / withdrawal control memo; UX constitution | future frontend implementation; support scripts; pilot ops runbook; implementation-specific §7a brief | Customer-facing states must not imply unsupported custody, rail, withdrawal, or liquidity guarantees. | Not created. |
| Pilot ops runbook | Operational artifact | legal / compliance requirements memo; custody boundary memo; rail classification register; liquidity / withdrawal control memo; trust UX pack | reconciliation SOP; support escalation matrix; audit evidence checklist; implementation-specific §7a brief | Manual / limited execution requires owner, controls, cadence, escalation, and fallback logic before activation can be considered. | Not created. |
| Reconciliation SOP | Operational artifact | custody boundary memo; rail classification register; liquidity / withdrawal control memo; pilot ops runbook | audit evidence checklist; support escalation matrix; implementation-specific §7a brief | Duplicate, delayed, failed, ambiguous, and unresolved transaction states must be operationally reconciled before pilot execution. | Not created. |
| Support escalation matrix | Operational artifact | trust UX pack; pilot ops runbook; reconciliation SOP | customer support posture; incident response; implementation-specific §7a brief | Failed, delayed, duplicate, and ambiguous customer-money issues need escalation ownership before any pilot. | Not created. |
| Audit evidence checklist | Operational artifact | pilot ops runbook; reconciliation SOP; support escalation matrix; legal / compliance requirements memo | implementation-specific §7a brief; future post-pilot review | Pilot activity must produce traceable evidence before expanding authority. | Not created. |
| Staging/live-state separation memo | Foundation artifact | simulation / staging boundary evidence; rail classification register if rails are involved; trust UX pack if customer-facing states are involved | future frontend implementation; CI / E2E posture; implementation-specific §7a brief | Simulated, sandbox, staged, and live customer-money states must remain visually and operationally distinct. | Not created. |
| Implementation-specific §7a brief | Activation artifact | legal / compliance requirements memo; custody boundary memo; rail classification register; liquidity / withdrawal control memo; ADR scoping memo; trust UX pack; pilot ops runbook; reconciliation SOP; support escalation matrix; audit evidence checklist; staging/live-state separation memo; any required accepted ADRs | only the future scoped implementation ticket it belongs to | Implementation authority must be bounded by concrete prerequisites, not general readiness language. | Not active. |

## 6. Recommended dependency order

| Order | Artifact | Reason | May run in parallel with |
|---|---|---|---|
| 1 | Legal / compliance requirements memo | Frames jurisdiction, eligibility, KYC / AML, rail permission, and disclosure assumptions before downstream claims are shaped. | None as a dependency predecessor. |
| 2 | Custody boundary memo | Defines asset-control, provider responsibility, custody guarantees, and failure boundaries. | Rail classification register only after legal / compliance assumptions are framed. |
| 3 | Rail classification register | Separates sandbox, internal test, manual pilot, limited live pilot, and not-approved rail states. | Custody boundary memo only after legal / compliance assumptions are framed. |
| 4 | Liquidity / withdrawal control memo | Establishes withdrawal reliability, liquidity-buffer, unresolved-path, and kill-criteria constraints. | ADR scoping memo discovery notes, if explicitly non-authorizing. |
| 5 | ADR scoping memo | Narrows future decision records after legal, custody, rail, and liquidity boundaries are known. | Trust UX discovery after custody, rail, and liquidity assumptions are stable enough. |
| 6 | Class B trust UX pack | Constrains customer-facing claims, states, failures, exits, and unsupported guarantees. | Pilot ops runbook only after custody, rail, and liquidity constraints are known. |
| 7 | Pilot ops runbook | Defines owner, controls, cadence, escalation, and fallback logic before activation can be considered. | Reconciliation SOP drafting only after the runbook operating assumptions are clear. |
| 8 | Reconciliation SOP | Defines duplicate, delayed, failed, ambiguous, and unresolved transaction handling. | Support escalation matrix once pilot ops and trust UX constraints are known. |
| 9 | Support escalation matrix | Assigns escalation ownership for failed, delayed, duplicate, and ambiguous customer-money issues. | Audit evidence checklist once reconciliation expectations are clear. |
| 10 | Audit evidence checklist | Defines traceable evidence expectations before any authority expansion is considered. | Staging/live-state separation memo if staging or sandbox distinctions are in scope. |
| 11 | Staging/live-state separation memo | Keeps simulated, sandbox, staged, and live customer-money states distinct. | Audit evidence checklist where staging evidence needs to be captured. |
| 12 | Implementation-specific §7a brief | Binds any future scoped proposal to concrete prerequisite artifacts and accepted ADRs. | None. This remains last and inactive unless separately authorized. |

Parallelization guidance:

- Custody boundary memo and rail classification register may be drafted in parallel only after legal / compliance assumptions are framed.
- Trust UX pack may begin once custody, rail, and liquidity assumptions are stable enough to avoid unsupported claims.
- Pilot ops runbook may begin once custody, rail, liquidity, and trust UX constraints are known.
- ADR scoping memo should not precede legal, custody, rail, and liquidity framing.
- Implementation-specific §7a brief must remain last and inactive unless separately authorized.

This order is dependency logic, not a backlog, queue, activation order, or implementation sequence.

## 7. Dependency principles

1. Legal / compliance before claims
    - No custody, rail, or customer-money claim should be shaped before jurisdiction, eligibility, KYC / AML, permissions, and disclosure assumptions are known.
2. Custody before trust copy
    - Users cannot be told where money is or who controls it before custody boundaries are defined.
3. Rails before transaction promises
    - Deposit / withdrawal timing, pending states, failure paths, and limits depend on rail classification.
4. Liquidity before withdrawal confidence
    - Withdrawal copy and pilot controls must be constrained by liquidity buffers, unresolved-path handling, and kill criteria.
5. Ops before activation
    - Manual / limited execution cannot be considered without owners, review flow, reconciliation, support, audit trail, and incident handling.
6. ADRs after boundary discovery
    - ADRs should record material decisions once boundaries are known enough to avoid speculative decision records.
7. §7a last
    - An implementation-specific execution brief should only exist after prerequisite artifacts and accepted ADRs are ready for a scoped proposal.

## 8. Non-authorization statement

This dependency map is non-authoritative and documentation-only. It does not activate, sequence, approve, or implement Class B execution. Any future Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, and any required accepted ADRs.
