# HEDGR — Class B Eligibility Gap Register

## 1. Status / Authority / Scope

**Status:** Governance evidence register / documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and Hedgr doctrine.

**Scope:** Records current repo-native evidence gaps against `B-M1` through `B-M10` from `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`.

**Mode:** Evidence preservation only.

This register does not authorize implementation, execution, custody, rails, deposits, withdrawals, stablecoin conversion, ledger mutation, treasury operations, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This register exists to preserve repo-native memory of the Class B eligibility evidence inventory.

It answers:

**What evidence currently exists, and what gaps remain, against the Class B Pilot Eligibility Standard?**

It does not answer:

**Is Hedgr approved for Class B execution?**

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

## 3. Source assessment

The current posture recorded here comes from a read-only evidence inventory against `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`. Because that inventory was read-only, this register summarizes it as repo-memory input, not as authority.

- **Pass:** 3
- **Partial:** 7
- **Fail:** 0
- **Not assessed:** 0

This gap register does not conclude that Hedgr is Class B ready. It preserves the current evidence posture against the Class B Pilot Eligibility Standard.

## 4. Gap Register Table

| Criterion | Current status | Existing evidence posture | Gap / blocker | Future artifact type likely required | Authority note |
|---|---|---|---|---|---|
| B-M1 — Authority gate | Pass | `HEDGR_STATUS.md` §7 has no approved next ticket. §7a has no active execution ticket. Current posture blocks implied Class B implementation authority. | No current blocker for authority containment. | Future §7 / §7a only if implementation is separately proposed. | Pass confirms containment only; it does not authorize execution. |
| B-M2 — ADR gate | Partial | Repo ADR discipline exists. Class B standard identifies future ADR topics. | No accepted Class B ADR set exists for custody, rails/vendor boundary, execution authority, reconciliation / ledger truth, policy-runtime relationship, trust claims, failure, or rollback. | ADR scoping memo, then separate ADRs if implementation boundaries become concrete. | ADR path existence does not authorize implementation. |
| B-M3 — Legal / compliance gate | Partial | General doctrine references regulatory strategy, KYC / AML, data residency, and trust disclosures. Appendix-style examples say assumptions must be confirmed with counsel. | No concrete jurisdictional assumptions, KYC / AML responsibility, customer eligibility, rail permission, or pilot disclosure evidence. | Legal / compliance requirements memo; jurisdiction-specific review; disclosure checklist. | No legal conclusions may be invented by repo docs. |
| B-M4 — Custody gate | Partial | MVP spec identifies custodial infrastructure intent, subject to ADR. Current status denies custody activation authority. | No complete custody model, provider responsibility matrix, asset-control model, operational responsibility model, or custody-failure evidence. | Custody boundary memo; provider responsibility matrix; ADR if custody model is selected. | Custody intent is not custody activation. |
| B-M5 — Rails gate | Partial | MVP spec frames deposits / withdrawals as future Class B or Class C depending on phase and authorization. Current phase alignment separates rail intent from live rail proof. | No rail classification table exists for deposit / withdrawal rails by sandbox, internal test, manual pilot, limited live pilot, or not approved. | Rail classification register; vendor evidence pack; ADR if rail boundary is selected. | Rail mention is not rail approval. |
| B-M6 — Liquidity and withdrawal integrity gate | Partial | Doctrine treats liquidity and withdrawal access as mission-critical. Existing withdrawal surfaces are read-only / informational. | No Class B withdrawal-path assumptions, liquidity-buffer logic, manual-control model, unresolved-path handling, or kill criteria. | Liquidity / withdrawal control memo; pilot kill-criteria definition; operations runbook. | Withdrawal UX clarity is not withdrawal reliability. |
| B-M7 — UX / trust gate | Partial | UX doctrine requires users to know where money is, what it is doing, and how to exit. Existing trust surfaces are read-only / informational. | No Class B customer-money UX pack covering deposits, withdrawals, custody, rails, pending states, exits, failures, guarantees, and unsupported claims. | Class B trust UX pack; copy review; failure-state UX review. | UX principles do not authorize execution surfaces. |
| B-M8 — Ops / reconciliation gate | Partial | Reconciliation visibility exists as read-only / frontend-only baseline. PR template requires money-path risk classification and evidence receipts. | No manual review owner / process, reconciliation operating process, audit trail expectation, duplicate / ambiguous transaction handling, or support escalation path. | Pilot ops runbook; reconciliation SOP; support escalation matrix; audit evidence checklist. | Reconciliation copy is not pilot operations. |
| B-M9 — Simulation / staging gate | Pass | ADR 0017 and status records maintain dev-only simulator / review seam boundaries. Hermetic CI posture preserves no-live-dependency discipline. | No current blocker for existing simulation boundary. Future Class B staging plan would still be required if implementation is proposed. | Future staging/live-state separation memo if Class B implementation is proposed. | Safe simulation does not authorize live execution. |
| B-M10 — Exclusion gate | Pass | GOV-B-001 and `HEDGR_STATUS.md` explicitly exclude deposits, withdrawals, custody, rails, treasury, ledger mutation, Copilot runtime execution, Class C automation, and customer fund movement. | No current blocker for exclusion posture. | Future implementation briefs must restate exclusions and identify any explicitly authorized exception. | Exclusion clarity is defensive; it does not create implementation authority. |

## 5. Gap categories

**Authority / sequencing:** Current evidence preserves containment through no active §7 / §7a implementation ticket. Any future implementation posture would require separate explicit sequencing.

**ADR / governance:** Existing ADR discipline is present, but Class B-specific ADR coverage is not accepted for custody, rails/vendor boundary, execution authority, reconciliation / ledger truth, policy-runtime relationship, trust claims, failure, or rollback.

**Legal / compliance:** Doctrine records regulatory and compliance concerns at a general level, but concrete jurisdiction, eligibility, responsibility, permission, and disclosure evidence is absent.

**Custody:** Current doctrine contains custody intent, while current governance blocks custody activation. Provider roles, asset-control responsibilities, operational ownership, and failure evidence remain undefined.

**Rails:** Product doctrine names deposits and withdrawals as future execution-class surfaces, but rail readiness is not classified by sandbox, internal test, manual pilot, limited live pilot, or not-approved state.

**Liquidity / withdrawal integrity:** Liquidity and withdrawal access are doctrine-critical, but Class B withdrawal assumptions, buffer logic, manual controls, unresolved-path handling, and kill criteria remain absent.

**UX / trust:** UX doctrine requires verifiable money-state clarity, but there is no Class B trust UX pack for customer-money states, unsupported claims, guarantees, pending paths, exits, or failures.

**Ops / reconciliation:** Read-only reconciliation visibility exists, but pilot operating ownership, reconciliation procedure, audit expectations, duplicate / ambiguous handling, and support escalation remain undefined.

**Simulation / staging:** Existing simulation boundaries are contained by ADR 0017 and hermetic CI posture. A Class B staging/live-state separation artifact would still be needed if implementation is separately proposed.

**Exclusions / non-authorization:** Current governance explicitly excludes customer-money movement and adjacent authority expansion. This register preserves those exclusions rather than converting them into work approval.

## 6. Future artifact map

| Gap area | Future artifact type | Required before Class B implementation proposal? | Notes |
|---|---|---|---|
| ADR / governance | ADR scoping memo | Yes | Would identify which separate ADRs are needed before concrete implementation boundaries are proposed. |
| Custody | Custody boundary memo | Yes | Would define custody model assumptions, asset-control boundaries, and provider responsibility posture. |
| Rails | Rail classification register | Yes | Would distinguish sandbox, internal test, manual pilot, limited live pilot, and not-approved rail states. |
| Legal / compliance | Legal / compliance requirements memo | Yes | Would record jurisdictional, eligibility, KYC / AML, permission, and disclosure assumptions for review. |
| UX / trust | Class B trust UX pack | Likely | Would cover deposits, withdrawals, custody, rails, pending states, exits, failures, guarantees, and unsupported claims. |
| Liquidity / withdrawal integrity | Liquidity / withdrawal control memo | Yes | Would define assumptions, controls, unresolved-path handling, and reliability limits. |
| Ops / reconciliation | Pilot ops runbook | Yes | Would identify manual owners, controls, escalation path, and operating cadence for a pilot. |
| Ops / reconciliation | Reconciliation SOP | Yes | Would define reconciliation process, audit trail expectations, and exception handling. |
| Ops / support | Support escalation matrix | Likely | Would identify support ownership and escalation path for failed, delayed, duplicate, or ambiguous transactions. |
| Simulation / staging | Staging/live-state separation memo | Depends | Required if a future proposal introduces staging, sandbox, or pilot-live distinction. |
| Authority / sequencing | Implementation-specific §7a brief | Yes | Required only if `HEDGR_STATUS.md` §7 separately names a Class B implementation ticket. |

No item in this table is approved by this register.

## 7. Drift risks

| Term | Possible misread | Guardrail interpretation |
|---|---|---|
| readiness | Hedgr is ready for Class B execution. | Evidence posture only; readiness is not approval, sequencing, or execution authority. |
| pilot | A limited live customer-money flow is approved. | Pilot language remains future and gated unless §7 / §7a separately authorize it. |
| rails | Deposit or withdrawal integrations are approved or live. | Rails are future or conceptual until classified, reviewed, and separately authorized. |
| live | Simulated, staged, or read-only surfaces are production money truth. | Live customer-money truth requires explicit execution authority and supporting artifacts. |
| integration | Vendor or rail integration may proceed from doctrine references. | Integration requires separate vendor, legal, ADR, and §7 / §7a authority where applicable. |
| wallet | Wallet intent implies custody or fund movement authority. | The wallet is a proof surface in current posture; custody and movement remain gated. |
| custody | Custodial infrastructure intent authorizes custody activation. | Custody intent is not custody approval; model and responsibilities remain gaps. |
| withdrawal | Existing withdrawal UX proves withdrawal reliability. | Current withdrawal surfaces are read-only / informational; reliability evidence is absent. |
| deposit | Deposit flow references authorize receiving customer funds. | Deposits remain excluded unless separately approved under governed Class B scope. |
| yield | Yield routing intent allows protocol or treasury execution. | Yield remains subordinate and non-executing until explicit ADR and status authority exist. |
| Copilot | Advisory Copilot can guide or execute financial action. | Copilot remains advisory, non-directive, non-executing, and subordinate. |

## 8. Non-authorization statement

This gap register is non-authoritative and documentation-only. It does not activate, sequence, approve, or implement Class B execution. Any future Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, and any required accepted ADRs.
