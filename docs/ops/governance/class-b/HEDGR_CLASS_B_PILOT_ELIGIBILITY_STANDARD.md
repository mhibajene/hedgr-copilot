# HEDGR — Class B Pilot Eligibility Standard

## 1. Status / Authority / Scope

**Status:** Governance standard / documentation-only.

**Authority:** This standard is subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and Hedgr doctrine. If this document conflicts with those sources, the higher-authority source controls and the conflict must be surfaced explicitly.

**Scope:** This document defines criteria for future Class B pilot eligibility only.

This document does **not** authorize implementation, execution, customer funds movement, custody activation, rails activation, ledger mutation, automated execution, or Class C behavior.

## 2. Purpose

This standard answers:

**What must be true before a future manual / limited pilot execution ticket may be proposed for `HEDGR_STATUS.md` §7?**

It does **not** answer:

**Are deposits, withdrawals, custody, or rails approved to build now?**

## 3. Definition of Class B in Hedgr

`docs/doctrine/hedgr-mvp-project-specification.md` §5 defines MVP execution classes as:

- **Class A - Informational only:** educates, discloses, simulates, or displays engine-aligned posture; no fund movement.
- **Class B - Manual / limited execution:** human-in-the-loop, pilot, or capped flows with explicit operational controls.
- **Class C - Automated execution:** programmatic movement or commitment of funds subject to policy and engine rules, only when ADRs and ops status explicitly allow.

Hedgr is currently **not** in active Class B implementation mode. Class B eligibility is a precondition for future sequencing discussion, not an execution state.

## 4. Eligibility Is Not Authorization

**A Class B Pilot Eligibility finding means only that a future scoped Class B ticket may be considered for §7 / §7a. It does not itself authorize deposits, withdrawals, custody, rail integration, treasury operations, stablecoin movement, ledger mutation, or customer fund movement.**

- `HEDGR_STATUS.md` §7 remains the only ticket activation surface.
- `HEDGR_STATUS.md` §7a remains the active execution brief surface.
- A future Class B implementation ticket must still define scope, exclusions, acceptance criteria, validation, rollback, and evidence.

## 5. Mandatory Eligibility Criteria

| ID | Criterion | Required evidence | Why it matters |
|----|-----------|-------------------|----------------|
| B-M1 | Authority gate | `HEDGR_STATUS.md` §7 names only documentation or eligibility-standard work until implementation is separately approved. §7a bounds scope before work begins. No implementation work is inferred from this standard. | Prevents this governance artifact from becoming an execution approval surface. |
| B-M2 | ADR gate | Required ADRs are identified before any Class B implementation proposal. At minimum, future ADR coverage must be considered for custody model, rails / vendor boundary, execution authority, reconciliation and ledger truth, policy-runtime relationship, trust / disclosure claims, and failure and rollback posture. These ADRs are prerequisites for implementation consideration; this standard does not draft or accept them. | Ensures material authority expansion is reviewed through the repo ADR process before implementation. |
| B-M3 | Legal / compliance gate | Jurisdictional assumptions are identified. KYC / AML responsibility is identified. Rail permissions and customer eligibility constraints are identified. User disclosures required for pilot execution are listed at a high level. No legal conclusions are invented by this standard. | Prevents operational or UX claims from running ahead of legal and compliance review. |
| B-M4 | Custody gate | Custody model is identified. Provider role is identified. User asset control and operational responsibility are described. Failure modes are documented. No UI claim may imply custody guarantees beyond approved truth. | Keeps custody truth explicit before customer-money surfaces are proposed. |
| B-M5 | Rails gate | Deposit and withdrawal rails are classified as sandbox, internal test, manual pilot, limited live pilot, or not approved. Rail readiness distinguishes integration existence from customer-money authorization. No vague "rails live" language is used. | Separates technical integration from authority to move or receive customer money. |
| B-M6 | Liquidity and withdrawal integrity gate | Withdrawal path assumptions are documented. Liquidity buffer logic or manual control expectation is identified. Failure, delay, and unresolved-path handling are documented. Kill criteria for withdrawal fragility are defined. | Hedgr doctrine treats liquidity and withdrawal integrity as mission-critical: liquidity is mandatory, users must retain reliable access to capital, and any feature that increases withdrawal fragility must be rejected. |
| B-M7 | UX / trust gate | User-facing surfaces explain where money is, what is happening, how to exit, what is pending, and what is not guaranteed. Copy avoids urgency, yield-first framing, hidden mechanics, and unsupported certainty. | Trust UX requires users to verify product state rather than rely on vague confidence or hidden mechanics. |
| B-M8 | Ops / reconciliation gate | Manual review flow is defined. Reconciliation owner / process is identified. Audit trail expectations are documented. Failed, delayed, duplicate, and ambiguous transaction handling is described. Support escalation path is identified. | Class B pilots require human controls, auditability, and failure handling before any customer-money workflow is proposed. |
| B-M9 | Simulation / staging gate | Sandbox, simulation, mock, and staging states are visually and operationally distinct from live execution. No simulated state may be presented as customer-money truth. Existing dev-only simulator boundaries remain preserved. | Preserves ADR 0017 and read-only simulator boundaries so review aids do not become product semantics. |
| B-M10 | Exclusion gate | Future eligibility review explicitly excludes Class C automation, autonomous reallocation, protocol yield routing, live treasury execution, ledger mutation from engine output, Copilot execution, hidden fund movement, backend execution workers, production rail integration, and customer-money movement unless separately authorized by a future §7 / §7a ticket and required ADR/governance review. | Keeps Class B eligibility from silently approving adjacent execution, automation, or fund-movement authority. |

## 6. Supporting Criteria

The following supporting criteria may be used in a future eligibility evaluation. They are not automatically authorizing:

- Vendor readiness
- Operational staffing
- Monitoring and incident response
- Data retention and audit evidence
- Pilot caps and exposure limits
- Customer support readiness
- Regulatory review status
- Rollback / kill-switch readiness

## 7. Evidence Table Template

This template is not currently a completed pass assessment. It exists to define the evidence shape required for a future eligibility review.

| Criterion | Pass / Partial / Fail / Not assessed | Evidence pointer | Blocker or note |
|-----------|--------------------------------------|------------------|-----------------|
| B-M1 | Not assessed | | |
| B-M2 | Not assessed | | |
| B-M3 | Not assessed | | |
| B-M4 | Not assessed | | |
| B-M5 | Not assessed | | |
| B-M6 | Not assessed | | |
| B-M7 | Not assessed | | |
| B-M8 | Not assessed | | |
| B-M9 | Not assessed | | |
| B-M10 | Not assessed | | |

## 8. Non-Authorization Clauses

This standard does not authorize:

- deposits
- withdrawals
- stablecoin conversion
- custody activation
- mobile money integration
- bank integration
- Circle or vendor integration
- live FX execution
- treasury operations
- yield routing execution
- policy-runtime binding
- backend workers
- ledger mutation
- customer-facing automation
- Copilot runtime execution
- Class C automation
- customer fund movement

## 9. Relationship to Future Tickets

- A future Class B implementation ticket must be separately named in `HEDGR_STATUS.md` §7.
- A future Class B implementation ticket must have a bounded §7a brief.
- The future ticket must cite which eligibility criteria are satisfied, deferred, or blocked.
- Any material Class B implementation must include ADR review.
- This standard does not create a backlog, queue order, or default next ticket.

## 10. Closeout Meaning

If this standard is merged, the closeout meaning is only:

**Hedgr now has a repo-native governance standard for assessing future Class B pilot eligibility.**

It does **not** mean:

**Hedgr is Class B ready, approved to execute, or authorized to move customer funds.**
