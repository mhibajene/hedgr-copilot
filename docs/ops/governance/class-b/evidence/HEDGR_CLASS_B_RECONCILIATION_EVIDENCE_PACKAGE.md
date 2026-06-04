# HEDGR - Class B Reconciliation Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001` through `EVID-B-014`, future qualified legal / compliance review, and future operational / vendor evidence where applicable.

**Scope:** Defines required reconciliation evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, reconciliation approval, ledger approval, accounting approval, support-closure approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve reconciliation operations, reconciliation closure, source-of-truth selection, ledger truth, accounting truth, transaction processing, deposit processing, withdrawal processing, custody operations, rail operations, stablecoin conversion, fee / FX / spread finality, liquidity operations, support closure, dispute closure, audit operations, external engagement, Class B execution, implementation, staging, live operations, Copilot execution, or customer fund movement.

This package does not provide legal advice or claim regulatory approval.

## 2. Purpose

This package exists to instantiate the Reconciliation evidence package from the evidence gathering plan and registry.

It answers:

**What reconciliation evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Is Hedgr approved to reconcile live customer-money activity or treat any system as ledger truth?**

It does not create:

- reconciliation approval
- reconciliation closure approval
- source-of-truth approval
- ledger truth approval
- accounting truth approval
- transaction-processing approval
- support-closure approval
- dispute-closure approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_PILOT_OPS_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_TRUST_UX_DISCLOSURE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_FEE_FX_SPREAD_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STABLECOIN_CONVERSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_SETTLEMENT_FINALITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_VENDOR_PERMISSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTODY_PROVIDER_MODEL_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_OPS_RUNBOOK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define reconciliation evidence requirements only. They do not create reconciliation approval, ledger truth, accounting truth, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Reconciliation evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | Reconciliation evidence; audit evidence; operational dry-run evidence; custody evidence; rail evidence; settlement / finality evidence; stablecoin / conversion evidence; fee / FX / spread evidence; liquidity / withdrawal evidence; support / incident evidence; external legal / compliance review where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No legal / compliance review; no jurisdiction selected; no custody model selected; no rail selected or approved; no settlement / finality evidence; no stablecoin / conversion evidence; no fee / FX / spread evidence; no liquidity / withdrawal control evidence; no Pilot Ops owner; no manual review workflow; no reconciliation process; no source-of-truth boundary evidence; no support / dispute handling evidence; no audit / retention policy; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future reconciliation assessment; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, reconciliation-ready, ledger-ready, accounting-ready, support-ready, audit-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Reconciliation owner evidence | Who would own reconciliation review? | Reconciliation evidence; operational dry-run evidence; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No reconciliation owner | No owner is assigned. |
| Reconciliation review cadence evidence | What cadence would apply across reconciliation domains? | Reconciliation evidence; operational dry-run evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No reconciliation process | No cadence is approved. |
| Source-of-truth boundary evidence | Which layer may prove each state and which layer must not become truth by itself? | Reconciliation evidence; audit evidence; accepted ADR where required | Question framed / Missing | Review date required before downstream use | No source-of-truth boundary evidence | No source of truth is selected. |
| Ledger / accounting boundary evidence | What ledger or accounting boundary would require separate governed decision? | External legal / compliance review; accepted ADR; audit evidence | Question framed / Missing | Dated review required before downstream use | No ledger / accounting truth ADR | No ledger or accounting truth is approved. |
| User request matching evidence | How is a user request matched to review and downstream records? | Reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No matching-rule evidence | No matching logic is approved. |
| Participant eligibility matching evidence | How is eligibility evidence matched to a transaction-adjacent request? | Customer eligibility evidence; audit evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Eligibility is not approved. |
| KYC / AML state matching evidence | How are KYC / AML, sanctions, PEP, and monitoring states matched to participant status? | KYC / AML evidence; external legal / compliance review; audit evidence | Question framed / Missing | Dated review required before downstream use | No KYC / AML owner | No KYC / AML matching process is approved. |
| Custody-state matching evidence | How are custody transitions, holds, releases, and provider states matched? | Custody evidence; vendor / provider documentation or confirmation; audit evidence | Question framed / Missing | Review date required before downstream use | No custody model selected | No custody state is accepted as truth. |
| Rail-state matching evidence | How are rail events matched to user requests, custody, settlement, and support states? | Rail evidence; vendor / provider documentation or confirmation; audit evidence | Question framed / Missing | Review date required before downstream use | No rail selected or approved | No rail is approved. |
| Settlement / finality matching evidence | What evidence proves settlement or finality for a specific event? | Settlement / finality evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No finality claim is approved. |
| Stablecoin / conversion matching evidence | How are stablecoin acquisition, transfer, conversion, redemption, and custody states matched? | Stablecoin / conversion evidence; custody evidence; rail evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No conversion path is approved. |
| Fee / FX / spread matching evidence | How are quote, fee, FX, spread, slippage, and final value matched? | Fee / FX / spread evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No fee / FX / spread evidence | No pricing truth is approved. |
| Liquidity / withdrawal matching evidence | How are withdrawal requests matched to liquidity checks, custody release, rail state, and finality? | Liquidity / withdrawal evidence; custody evidence; rail evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No liquidity / withdrawal control evidence | No withdrawal process is approved. |
| Support-state matching evidence | How are support cases matched to reconciliation and customer-money state? | Support / incident evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No support closure dependency evidence | Support state is not transaction truth. |
| Audit receipt matching evidence | How are audit receipts matched to operational events and reviews? | Audit evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No audit / retention policy | Audit receipt is not ledger truth. |
| Deposit reconciliation evidence | What proves deposit request, rail event, custody transition, support state, and audit receipt alignment? | Reconciliation evidence; custody evidence; rail evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No deposit reconciliation evidence | No deposit reconciliation is approved. |
| Withdrawal reconciliation evidence | What proves withdrawal request, custody release, rail action, liquidity state, support state, and audit receipt alignment? | Reconciliation evidence; liquidity / withdrawal evidence; custody evidence; rail evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No withdrawal reconciliation evidence | No withdrawal reconciliation is approved. |
| Conversion reconciliation evidence | What proves conversion request, quote, provider action, custody state, and final value alignment? | Stablecoin / conversion evidence; fee / FX / spread evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No conversion reconciliation is approved. |
| Redemption reconciliation evidence | What proves redemption request, provider action, rail event, and settlement state alignment? | Stablecoin / conversion evidence; rail evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No redemption reconciliation is approved. |
| Fee / FX final-value reconciliation evidence | What proves displayed estimate, quote, fees, spread, and final settlement value? | Fee / FX / spread evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No final settlement value evidence | No final amount is accepted. |
| Duplicate-event detection evidence | How are duplicate requests, rail events, custody events, support cases, or audit records detected? | Reconciliation evidence; audit evidence; operational dry-run evidence | Question framed / Missing | Review date required before downstream use | No duplicate handling evidence | No duplicate detection exists. |
| Delayed-state reconciliation evidence | How are delayed states identified, owned, reviewed, and preserved? | Settlement / finality evidence; support / incident evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No delayed-state handling evidence | No delay process is approved. |
| Failed-state reconciliation evidence | How are failed states proven and constrained? | Rail evidence; custody evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No failed-state handling evidence | No failure process is approved. |
| Reversed-state reconciliation evidence | What proves reversal and before / after state? | Rail evidence; custody evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No reversed-state handling evidence | No reversal process is approved. |
| Disputed-state reconciliation evidence | How are disputes linked to evidence and unresolved state? | Support / incident evidence; reconciliation evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No support / dispute handling evidence | No dispute closure is approved. |
| Blocked-state reconciliation evidence | How are compliance, rail, custody, liquidity, or operational blocks identified? | Support / incident evidence; custody evidence; rail evidence; liquidity / withdrawal evidence | Question framed / Missing | Review date required before downstream use | No blocked-state handling evidence | No blocked-state process is approved. |
| Ambiguous-state reconciliation evidence | How are ambiguous states classified without forced closure? | Reconciliation evidence; audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No ambiguous-state handling evidence | Ambiguity remains unresolved. |
| Unresolved-state reconciliation evidence | What evidence keeps customer-money state unresolved until reviewed? | Reconciliation evidence; audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No unresolved-state handling evidence | No unresolved state may be forced closed. |
| Mismatch classification evidence | What mismatch categories exist and what severity applies? | Reconciliation evidence; audit evidence; operational dry-run evidence | Question framed / Missing | Review date required before downstream use | No mismatch classification evidence | No taxonomy is approved. |
| Exception closure evidence | What evidence is required before any exception may close? | Reconciliation evidence; audit evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No exception closure evidence | No exception closure is approved. |
| Manual review dependency evidence | What manual review evidence constrains reconciliation? | Operational dry-run evidence; audit evidence; Pilot Ops evidence | Question framed / Missing | Review date required before downstream use | No manual review workflow | No manual review workflow is approved. |
| Support closure dependency evidence | What reconciliation evidence must support review before closure? | Support / incident evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No support closure dependency evidence | No support closure rule is approved. |
| Incident / pause dependency evidence | What reconciliation gaps trigger incident routing, pause, or escalation? | Support / incident evidence; audit evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No incident / pause dependency evidence | No incident or pause process is approved. |
| Correction / reversal evidence | What evidence proves correction, reversal, adjustment, and user-facing constraints? | Reconciliation evidence; audit evidence; settlement / finality evidence | Question framed / Missing | Review date required before downstream use | No correction / reversal evidence | No correction or reversal authority is approved. |
| Post-pilot review dependency evidence | What reconciliation evidence must be reviewed before authority can widen? | Audit evidence; reconciliation evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No post-pilot review dependency evidence | No authority widening is approved. |
| Legal / compliance review requirements | Which reconciliation, ledger, accounting, recordkeeping, dispute, or finality questions require qualified review? | External legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No legal conclusion is provided. |
| ADR dependency for reconciliation / ledger boundary | Which reconciliation or ledger boundaries require accepted ADRs before readiness can be considered? | Accepted ADR; ADR drafting readiness evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No accepted reconciliation ADR; no ledger / accounting truth ADR | No ADR is drafted or accepted. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, reconciliation-ready, ledger-ready, accounting-ready, support-ready, audit-ready, or Class B ready.

## 6. Open Reconciliation questions

Answers must come from future governed review, reconciliation evidence, audit evidence, operational evidence, legal / compliance review, support evidence, vendor / provider evidence, and accepted ADRs where required, not this package.

### Ownership and cadence

- [ ] Who would own reconciliation review?
- [ ] Who reviews event-level reconciliation?
- [ ] Who reviews batch reconciliation?
- [ ] Who owns unresolved items?
- [ ] What cadence applies to deposits, withdrawals, custody, rails, stablecoin / conversion, fees / FX, support cases, and exceptions?
- [ ] What cadence must not be treated as an SLA?

### Source-of-truth boundaries

- [ ] Which evidence layer may prove user request state?
- [ ] Which evidence layer may prove custody state?
- [ ] Which evidence layer may prove rail state?
- [ ] Which evidence layer may prove settlement / finality?
- [ ] Which evidence layer may prove support state?
- [ ] Which evidence layer may prove audit state?
- [ ] Which evidence layer may become ledger or accounting truth, if any?
- [ ] What future ADRs may be required?

### Matching rules

- [ ] How are user requests matched to operator review?
- [ ] How are rail events matched to custody events?
- [ ] How are conversion events matched to settlement evidence?
- [ ] How are fee / FX / spread values matched to final settlement value?
- [ ] How are support cases matched to reconciliation state?
- [ ] How are audit receipts matched to operational events?

### Deposits, withdrawals, and custody

- [ ] What evidence reconciles a deposit request, rail event, custody transition, settlement state, support state, and audit receipt?
- [ ] What evidence reconciles a withdrawal request, custody release, rail action, liquidity state, settlement state, support state, and audit receipt?
- [ ] What happens if custody evidence conflicts with rail evidence?

### Stablecoin, conversion, fee / FX / spread

- [ ] What evidence reconciles stablecoin acquisition, holding, transfer, conversion, redemption, FX rate, fee, spread, slippage, and final value?
- [ ] What happens if conversion evidence conflicts with fee / FX evidence?
- [ ] What happens if final settlement value differs from the displayed estimate?

### Exceptions and unresolved states

- [ ] How are duplicates detected?
- [ ] How are delayed, failed, reversed, disputed, blocked, ambiguous, and unresolved states classified?
- [ ] What evidence is required before exception closure?
- [ ] What requires pause, escalation, incident routing, or governance review?
- [ ] What must remain unresolved rather than forced closed?

### Support closure dependency

- [ ] What reconciliation evidence is required before support may close a case?
- [ ] What support statuses must not imply transaction truth?
- [ ] What support wording is prohibited while reconciliation remains incomplete?
- [ ] What happens if support state and reconciliation state disagree?

### Audit and post-pilot review

- [ ] What audit evidence must be retained for reconciliation review?
- [ ] What evidence supports post-pilot review?
- [ ] What unresolved reconciliation gaps block authority widening?
- [ ] What evidence must exist before implementation-preflight can even assess reconciliation readiness?

## 7. Source-of-truth boundary evidence template

| Evidence layer | What it may prove | Evidence required | What it must not prove by itself | Related ADR dependency | Status |
|---|---|---|---|---|---|
| User request | A user asked for an action or review. | Request timestamp, identity / eligibility context, audit receipt. | Completion, settlement, custody transition, ledger truth, or accounting truth. | TBD by future governed review. | Question framed / Missing |
| UI state | What the product displayed at a point in time. | UI receipt, route state, copy / state-label evidence, audit record. | Ledger truth, rail finality, custody truth, or support closure. | Trust UX / state-label ADR if required. | Question framed / Missing |
| Operator review state | That an operator reviewed evidence under a defined process. | Manual review record, reviewer identity, evidence checklist, audit receipt. | Settlement, finality, legal approval, ledger truth, or accounting truth. | Pilot Ops or reconciliation ADR if required. | Question framed / Missing |
| Support state | What support knew, communicated, or escalated. | Support case record, message record, escalation evidence, audit receipt. | Transaction truth, finality, custody truth, or reconciliation closure. | Support / dispute ADR if required. | Question framed / Missing |
| Custody state | Custody-side control, hold, release, lockout, or transition if supported. | Provider record, custody evidence, responsibility boundary, audit receipt. | Rail finality, fee truth, UI completion, ledger truth, or accounting truth. | Custody ADR if required. | Question framed / Missing |
| Rail / vendor event | Rail-side initiation, pending, failure, reversal, dispute, or completion depending on evidence. | Vendor / provider event, permission evidence, settlement / finality evidence, audit receipt. | Custody truth, customer balance, ledger truth, or finality without matching evidence. | Rail / vendor ADR if required. | Question framed / Missing |
| Settlement / finality evidence | A specific event reached a defined finality standard if evidence supports it. | Settlement confirmation, finality marker, reconciliation match, audit receipt. | System-wide readiness, support closure, accounting truth, or approval for future events. | Settlement / finality ADR if required. | Question framed / Missing |
| Stablecoin / conversion event | Conversion, redemption, holding, or transfer state if provider evidence supports it. | Provider record, custody evidence, rail evidence, fee / FX evidence, audit receipt. | Ledger truth, withdrawal availability, or final customer value by itself. | Stablecoin / conversion ADR if required. | Question framed / Missing |
| Fee / FX / spread value | The offered, estimated, charged, or final value depending on evidence class. | Quote ID, rate source, fee schedule, expiry, final-value evidence, audit receipt. | Settled value, customer balance, or accounting truth without finality evidence. | Fee / FX / spread ADR if required. | Question framed / Missing |
| Liquidity / withdrawal state | Whether a defined liquidity or withdrawal check was performed. | Liquidity / withdrawal evidence, custody evidence, rail evidence, audit receipt. | Withdrawal approval, treasury authority, or customer-money movement authority. | Liquidity / withdrawal ADR if required. | Question framed / Missing |
| Reconciliation review | Whether defined evidence matched or required exception handling. | Match result, mismatch note, owner review, closure dependency, audit receipt. | Accounting truth, ledger mutation approval, or live reconciliation authority. | Reconciliation / ledger ADR if required. | Question framed / Missing |
| Audit receipt | That evidence or a decision was recorded for later review. | Immutable record, reviewer trail, retention metadata, access-control evidence. | Correctness, finality, ledger truth, accounting truth, or operational approval by itself. | Audit / retention ADR if required. | Question framed / Missing |
| Ledger / accounting record | Ledger or accounting state only if future authority selects and governs it. | Accepted ledger / accounting model, review evidence, controls, audit trail. | Rail state, custody state, support state, UI truth, or source-of-truth selection by default. | Ledger / accounting truth ADR required where material. | Question framed / Missing |
| Governance decision | A repo-native decision was accepted under governance. | Accepted ADR or status record, source evidence, bounded scope, review trail. | Operational evidence, vendor permission, legal approval, or customer-money authority by itself. | Accepted ADR where required. | Question framed / Missing |

This template does not select a source of truth, approve ledger semantics, approve accounting truth, authorize reconciliation operations, or approve customer-money movement.

## 8. Reconciliation matching evidence template

| Matching area | Records to match | Evidence required | Exception condition | Review owner placeholder | Status |
|---|---|---|---|---|---|
| User request to operator review | User request; operator review record; audit receipt | Request evidence; review evidence; audit evidence | Missing request, missing review, duplicate request, conflicting reviewer record | TBD by future governed review | Question framed / Missing |
| Participant eligibility to transaction request | Eligibility record; request; KYC / AML state | Eligibility evidence; legal / compliance review; audit evidence | Missing, stale, conflicting, or changed eligibility | TBD by future governed review | Question framed / Missing |
| KYC / AML state to participant status | KYC / AML record; sanctions / PEP status; participant record | KYC / AML evidence; qualified review where applicable | Missing owner, failed verification, compliance hold, conflicting status | TBD by future governed review | Question framed / Missing |
| Deposit request to rail event | Request; rail event; support case if any | Rail evidence; request evidence; audit receipt | Missing rail event, duplicate rail event, delayed event, reversed event | TBD by future governed review | Question framed / Missing |
| Deposit rail event to custody transition | Rail event; custody record; audit receipt | Rail evidence; custody evidence; settlement / finality evidence | Rail and custody records disagree or custody evidence missing | TBD by future governed review | Question framed / Missing |
| Withdrawal request to custody release | Request; custody release; liquidity check | Liquidity / withdrawal evidence; custody evidence; audit receipt | Missing custody release, failed release, compliance hold | TBD by future governed review | Question framed / Missing |
| Withdrawal custody release to rail event | Custody release; rail event; settlement evidence | Custody evidence; rail evidence; settlement / finality evidence | Rail event missing, delayed, failed, reversed, disputed, or blocked | TBD by future governed review | Question framed / Missing |
| Rail event to settlement / finality evidence | Rail event; finality marker; reconciliation match | Vendor evidence; settlement / finality evidence; audit receipt | Finality missing, stale, disputed, or contradicted | TBD by future governed review | Question framed / Missing |
| Stablecoin conversion to custody state | Conversion record; custody record; provider evidence | Stablecoin / conversion evidence; custody evidence; audit receipt | Conversion and custody evidence conflict | TBD by future governed review | Question framed / Missing |
| Conversion final value to fee / FX / spread evidence | Quote; fee; FX rate; spread; final settlement value | Fee / FX / spread evidence; settlement / finality evidence; audit receipt | Final value differs from displayed estimate or quote stale | TBD by future governed review | Question framed / Missing |
| Redemption event to withdrawal state | Redemption record; custody state; rail event; withdrawal state | Stablecoin / conversion evidence; custody evidence; rail evidence | Redemption failed, delayed, reversed, disputed, or unmatched | TBD by future governed review | Question framed / Missing |
| Support case to reconciliation state | Support case; reconciliation record; event evidence | Support / incident evidence; reconciliation evidence; audit receipt | Support state and reconciliation state disagree | TBD by future governed review | Question framed / Missing |
| Audit receipt to operational event | Audit receipt; operational event; reviewer trail | Audit evidence; access-control evidence; reconciliation evidence | Missing, incomplete, stale, or unmatched audit receipt | TBD by future governed review | Question framed / Missing |
| Incident / pause decision to evidence record | Incident / pause record; affected events; support evidence | Support / incident evidence; audit evidence; reconciliation evidence | Pause lacks owner, trigger, scope, or evidence bundle | TBD by future governed review | Question framed / Missing |

This template does not approve matching logic, reconciliation closure, transaction processing, ledger truth, support closure, or customer-money movement.

## 9. Exception / mismatch / unresolved-state template

| Exception type | Evidence conflict or gap | Required review owner | User-facing constraint | Closure dependency | Status |
|---|---|---|---|---|---|
| Missing user request evidence | Request record absent or incomplete. | TBD by future governed review | Must not imply user authorized action. | Request evidence and audit receipt. | Question framed / Missing |
| Missing operator review evidence | Operator checklist, decision, or reviewer trail absent. | TBD by future governed review | Must not imply review occurred. | Operator review record and audit receipt. | Question framed / Missing |
| Missing custody evidence | Provider or custody-state evidence absent. | TBD by future governed review | Must not imply custody transition or asset-control truth. | Custody evidence and reconciliation review. | Question framed / Missing |
| Missing rail evidence | Rail event, permission, or settlement evidence absent. | TBD by future governed review | Must not imply rail processing, completion, or finality. | Rail evidence and settlement / finality review. | Question framed / Missing |
| Missing settlement / finality evidence | Finality marker, settlement confirmation, or match absent. | TBD by future governed review | Must not use completed, final, arrived, or settled claims. | Finality evidence and audit receipt. | Question framed / Missing |
| Missing stablecoin / conversion evidence | Conversion, redemption, transfer, or provider record absent. | TBD by future governed review | Must not imply conversion, redemption, holding, or final value. | Stablecoin / conversion evidence and match review. | Question framed / Missing |
| Missing fee / FX / spread evidence | Quote, fee, rate, spread, or final-value evidence absent. | TBD by future governed review | Must not imply final price or no variance. | Fee / FX / spread evidence and final-value review. | Question framed / Missing |
| Missing support handoff evidence | Support case, handoff, or wording constraint absent. | TBD by future governed review | Must not imply support can close or promise outcome. | Support evidence and reconciliation state. | Question framed / Missing |
| Duplicate deposit event | Deposit appears more than once across request, rail, support, or audit records. | TBD by future governed review | Must not imply both events are valid or closed. | Duplicate review and audit trail. | Question framed / Missing |
| Duplicate withdrawal event | Withdrawal appears more than once across request, custody, rail, support, or audit records. | TBD by future governed review | Must not imply withdrawal completion or available funds. | Duplicate review and audit trail. | Question framed / Missing |
| Conflicting custody and rail evidence | Custody and rail records disagree. | TBD by future governed review | Must keep state unresolved or under review. | Source-of-truth review and escalation. | Question framed / Missing |
| Conflicting settlement and support evidence | Support state conflicts with settlement / finality evidence. | TBD by future governed review | Support must not override settlement truth. | Finality review and support correction evidence. | Question framed / Missing |
| Conflicting final amount and displayed estimate | Final value differs from displayed estimate or quote. | TBD by future governed review | Must not imply estimate was final. | Fee / FX / spread review and disclosure evidence. | Question framed / Missing |
| Delayed settlement | Settlement evidence absent beyond future review boundary. | TBD by future governed review | Delay wording must remain non-promissory. | Settlement evidence or unresolved-state review. | Question framed / Missing |
| Failed settlement | Settlement failed or was rejected by relevant source. | TBD by future governed review | Failure wording must not imply remedy without evidence. | Failure evidence, support evidence, and audit receipt. | Question framed / Missing |
| Reversed event | Prior event appears reversed or corrected. | TBD by future governed review | Must not imply before / after state without proof. | Reversal evidence and reconciliation match. | Question framed / Missing |
| Disputed event | User, provider, rail, or support dispute exists. | TBD by future governed review | Must not imply dispute outcome. | Dispute evidence and qualified review where needed. | Question framed / Missing |
| Blocked event | Compliance, rail, custody, liquidity, or operator block exists. | TBD by future governed review | Must not promise progression. | Block reason, owner, and review evidence. | Question framed / Missing |
| Compliance hold | Compliance state blocks or delays review. | TBD by future governed review | Must not imply approval or timing. | Qualified review and audit receipt. | Question framed / Missing |
| Unresolved customer-money state | Records do not establish pending, failed, completed, reversed, or disputed state. | TBD by future governed review | Must stay unresolved; no closure claim. | Reconciliation review, support evidence, and audit trail. | Question framed / Missing |
| Stale reconciliation evidence | Evidence may no longer be current. | TBD by future governed review | Must not be reused as current. | Refresh or staleness record. | Question framed / Missing |
| Ambiguous source-of-truth state | Evidence layers conflict or no layer is selected. | TBD by future governed review | Must not select truth by inference. | Future governed decision or accepted ADR where required. | Question framed / Missing |

This template does not approve exception handling, mismatch handling, dispute handling, support closure, reconciliation closure, operational authority, or customer-money movement.

## 10. Reconciliation ownership / cadence template

| Reconciliation area | Candidate cadence | Owner placeholder | Evidence required | Escalation condition | Status |
|---|---|---|---|---|---|
| Participant eligibility | Event-based; manual review; not assessed | TBD by future governed review | Eligibility evidence; legal / compliance review; audit evidence | Eligibility missing, stale, conflicting, or changed. | Question framed / Missing |
| KYC / AML state | Event-based; vendor-driven; manual review; not assessed | TBD by future governed review | KYC / AML evidence; sanctions / PEP evidence; audit receipt | Failed, blocked, held, ambiguous, or stale status. | Question framed / Missing |
| Deposit events | Event-based; daily; batch; not assessed | TBD by future governed review | User request; rail evidence; custody evidence; audit receipt | Missing, duplicate, delayed, failed, reversed, disputed, or unresolved deposit. | Question framed / Missing |
| Withdrawal events | Event-based; daily; batch; not assessed | TBD by future governed review | Request; liquidity evidence; custody evidence; rail evidence; audit receipt | Missing, delayed, failed, reversed, disputed, blocked, or unresolved withdrawal. | Question framed / Missing |
| Custody transitions | Event-based; vendor-driven; not assessed | TBD by future governed review | Custody evidence; provider record; audit receipt | Custody conflict, provider outage, hold, release, or lockout. | Question framed / Missing |
| Rail events | Event-based; vendor-driven; batch; not assessed | TBD by future governed review | Rail event; permission evidence; settlement / finality evidence | Missing, duplicate, delayed, failed, reversed, blocked, or disputed rail event. | Question framed / Missing |
| Settlement / finality events | Event-based; vendor-driven; batch; not assessed | TBD by future governed review | Finality evidence; settlement evidence; reconciliation match | Missing, stale, conflicting, or disputed finality. | Question framed / Missing |
| Stablecoin / conversion events | Event-based; vendor-driven; not assessed | TBD by future governed review | Conversion record; custody evidence; rail evidence; audit receipt | Conversion failed, reversed, unmatched, stale, or disputed. | Question framed / Missing |
| Fee / FX / spread values | Event-based; batch; not assessed | TBD by future governed review | Quote; rate source; fee; spread; final-value evidence | Stale quote, mismatched amount, undisclosed fee, or final-value conflict. | Question framed / Missing |
| Liquidity / withdrawal states | Event-based; manual review; daily; not assessed | TBD by future governed review | Liquidity evidence; withdrawal evidence; custody / rail evidence | Liquidity constraint, withdrawal delay, stress trigger, pause, or unresolved state. | Question framed / Missing |
| Support cases | Event-based; manual review; not assessed | TBD by future governed review | Support evidence; reconciliation state; audit receipt | Support state conflicts with reconciliation or closure evidence missing. | Question framed / Missing |
| Disputes | Event-based; manual review; not assessed | TBD by future governed review | Support / incident evidence; reconciliation evidence; qualified review where needed | Dispute owner, evidence, or outcome unresolved. | Question framed / Missing |
| Incidents / pauses | Event-based; manual review; not assessed | TBD by future governed review | Incident record; pause decision; affected events; audit evidence | Customer-money uncertainty, unauthorized claim, or unresolved mismatch. | Question framed / Missing |
| Audit receipts | Event-based; batch; not assessed | TBD by future governed review | Immutable record; reviewer trail; retention metadata | Receipt missing, stale, inaccessible, or unmatched. | Question framed / Missing |
| Post-pilot review | Batch; manual review; not assessed | TBD by future governed review | Reconciliation evidence; support evidence; audit evidence; unresolved-state register | Unresolved gaps, stale evidence, missing ADR, or blocker remains open. | Question framed / Missing |

Candidate cadence labels are not approved operating cadence, support SLAs, reconciliation approval, or service commitments.

## 11. Support-closure dependency template

| Support case area | Reconciliation evidence required | What support may need to know | What support must not close without | Status |
|---|---|---|---|---|
| Deposit pending | Request, rail, custody, support, and audit state. | Pending owner, next review trigger, prohibited claims. | Reconciliation state and finality constraints. | Question framed / Missing |
| Deposit failed | Failure evidence, support evidence, audit receipt. | Failure source, escalation route, unresolved amount state. | Failure evidence and closure dependency review. | Question framed / Missing |
| Deposit duplicate | Duplicate detection evidence and affected records. | Duplicate class and review owner. | Duplicate review and evidence bundle. | Question framed / Missing |
| Deposit unresolved | Unresolved-state evidence and owner. | Why state remains unresolved and what cannot be promised. | Reconciliation review and support closure approval. | Question framed / Missing |
| Withdrawal pending | Request, liquidity, custody, rail, support, and audit state. | Pending owner, liquidity / rail constraints, user wording limits. | Withdrawal reconciliation evidence. | Question framed / Missing |
| Withdrawal delayed | Delay evidence, review owner, next review trigger. | Delay class, affected flow, prohibited SLA claims. | Delay review and finality evidence. | Question framed / Missing |
| Withdrawal failed | Failure evidence, custody / rail state, audit receipt. | Failure source and escalation route. | Failure evidence, support wording review, and reconciliation match. | Question framed / Missing |
| Withdrawal disputed | Dispute evidence, owner, affected records. | Dispute scope and prohibited outcome claims. | Dispute review and qualified review where needed. | Question framed / Missing |
| Custody state unclear | Custody evidence gap and conflicting records. | Custody state is not proven. | Custody evidence and reconciliation review. | Question framed / Missing |
| Rail state unclear | Rail evidence gap and conflicting records. | Rail state is not proven. | Rail evidence and settlement / finality review. | Question framed / Missing |
| Settlement / finality missing | Missing finality evidence and affected support state. | Completion or finality cannot be claimed. | Settlement / finality evidence. | Question framed / Missing |
| Stablecoin / conversion failed | Conversion failure evidence and custody impact. | Conversion state and final value are unresolved. | Conversion reconciliation and audit receipt. | Question framed / Missing |
| Fee / FX / spread disputed | Fee / FX / spread evidence and final-value conflict. | Estimate and final value may differ. | Fee / FX / spread review and disclosure evidence. | Question framed / Missing |
| Liquidity constrained | Liquidity evidence, pause / stress evidence, withdrawal impact. | Liquidity constraints may limit wording. | Liquidity / withdrawal review and reconciliation state. | Question framed / Missing |
| Compliance hold | Compliance hold evidence and support constraints. | Support may need restricted explanation. | Qualified review and audit receipt. | Question framed / Missing |
| Unresolved customer-money state | Unresolved-state evidence and owner. | Closure is not permitted until evidence resolves or remains explicitly unresolved. | Governed reconciliation review and closure dependency. | Question framed / Missing |

This template does not approve support operations, support scripts, support closure, transaction outcomes, or reconciliation closure.

## 12. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Reconciliation ownership evidence | Reconciliation evidence; operational dry-run evidence; audit evidence | Founder assumption; informal owner note | Owner evidence must be dated and reviewable. |
| Source-of-truth boundary evidence | Reconciliation evidence; audit evidence; accepted ADR where required | UI state; support state; internal analysis alone | Source-of-truth selection requires separate governed decision where material. |
| Ledger / accounting boundary evidence | Accepted ADR; external legal / compliance review; audit evidence | Audit receipt alone; reconciliation SOP alone | Ledger / accounting truth requires separate governed decision where material. |
| Deposit reconciliation evidence | Rail evidence; custody evidence; settlement / finality evidence; reconciliation evidence; audit evidence | UI display; support reassurance | Deposit reconciliation is not approved by this package. |
| Withdrawal reconciliation evidence | Liquidity / withdrawal evidence; custody evidence; rail evidence; settlement / finality evidence; audit evidence | Support state alone; internal analysis alone | Withdrawal integrity must not rely on optimistic status interpretation. |
| Custody reconciliation evidence | Custody evidence; provider documentation or confirmation; audit evidence | Rail evidence alone; UI state | Custody state needs provider-boundary evidence. |
| Rail reconciliation evidence | Rail evidence; vendor / provider documentation or confirmation; settlement / finality evidence | Vendor marketing page; UI state | Vendor documentation is not permission by itself. |
| Settlement / finality reconciliation evidence | Settlement / finality evidence; vendor / provider confirmation; audit evidence | Support state; operator belief | Finality evidence is not accounting truth unless separately accepted. |
| Stablecoin / conversion reconciliation evidence | Stablecoin / conversion evidence; custody evidence; rail evidence; fee / FX evidence | Internal analysis; product intent | Stablecoin / conversion evidence does not approve conversion operations. |
| Fee / FX / spread reconciliation evidence | Fee / FX / spread evidence; settlement / finality evidence; audit evidence | Displayed estimate; stale quote | Final-value evidence must distinguish estimate from settled amount. |
| Liquidity / withdrawal reconciliation evidence | Liquidity / withdrawal evidence; custody evidence; rail evidence; support / incident evidence | Reserve aspiration; doctrine | Liquidity evidence does not approve withdrawals or treasury operations. |
| Support closure evidence | Support / incident evidence; reconciliation evidence; audit evidence; legal / compliance review where applicable | Support status alone | Support state is not reconciliation truth. |
| Exception closure evidence | Reconciliation evidence; audit evidence; qualified review where needed | Informal note; unresolved support ticket closure | Exception closure cannot be inferred. |
| Audit receipt evidence | Audit evidence; access-control evidence; reviewer trail | Audit receipt alone as final truth | Audit receipt is not ledger truth. |
| Post-pilot review evidence | Audit evidence; reconciliation evidence; support evidence; operational evidence | Anecdote; internal summary without source pointers | Post-pilot evidence supports future review only. |

- Founder assumption is not reconciliation evidence.
- Repo doctrine is not reconciliation approval.
- Internal analysis is not operational readiness.
- UI state is not transaction truth.
- Support state is not reconciliation truth.
- Audit receipt is not ledger truth.
- Reconciliation SOP is not operational evidence.
- Dry-run evidence is not live reconciliation approval.
- Sandbox reconciliation evidence is not live customer-money evidence.
- Ledger / accounting truth requires separate governed decision where material.
- Legal / compliance review must be dated and attributable to qualified review where recordkeeping, customer-money, dispute, or legal finality risk is implicated.

## 13. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No legal / compliance review | Legal / compliance evidence package | Unresolved / Evidence missing | Legal conclusions; recordkeeping; dispute; finality; support closure |
| No jurisdiction selected | Jurisdiction selection evidence package | Unresolved / Evidence missing | Legal / compliance review; custody; rails; support; reconciliation |
| No customer eligibility policy | Customer eligibility evidence package | Unresolved / Evidence missing | Participant matching; KYC / AML; support; transaction-adjacent review |
| No KYC / AML owner | KYC / AML responsibility evidence package | Unresolved / Evidence missing | Compliance holds; participant status; support escalation |
| No custody model selected | Custody provider / model evidence package | Unresolved / Evidence missing | Custody-state matching; ledger boundary; support closure |
| No rail selected or approved | Rail / vendor permission evidence package | Unresolved / Evidence missing | Rail matching; settlement / finality; deposit / withdrawal reconciliation |
| No settlement / finality evidence | Rail settlement / finality evidence package | Unresolved / Evidence missing | Finality claims; support closure; audit review |
| No stablecoin / conversion evidence | Stablecoin / conversion evidence package | Unresolved / Evidence missing | Conversion / redemption reconciliation; final value; support |
| No fee / FX / spread evidence | Fee / FX / spread evidence package | Unresolved / Evidence missing | Final amount; disclosures; fee / FX disputes |
| No liquidity / withdrawal control evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Withdrawal reconciliation; liquidity constraints; support closure |
| No Pilot Ops owner | Pilot Ops evidence package | Unresolved / Evidence missing | Reconciliation ownership; manual review; escalation |
| No manual review workflow | Pilot Ops evidence package; reconciliation evidence package | Unresolved / Evidence missing | Event review; exception classification; closure |
| No reconciliation owner | Reconciliation evidence package | Unresolved / Evidence missing | Matching review; unresolved-state ownership; post-pilot review |
| No reconciliation process | Reconciliation evidence package | Unresolved / Evidence missing | Ledger truth review; support closure; audit review |
| No source-of-truth boundary evidence | Reconciliation evidence package; accepted ADR where required | Unresolved / Evidence missing | Ledger / accounting boundary; support; Trust UX |
| No matching-rule evidence | Reconciliation evidence package | Unresolved / Evidence missing | Deposit, withdrawal, custody, rail, conversion, support, and audit matching |
| No exception taxonomy evidence | Reconciliation evidence package | Unresolved / Evidence missing | Mismatch, duplicate, delayed, failed, disputed, blocked, ambiguous, unresolved states |
| No duplicate handling evidence | Reconciliation evidence package; audit evidence package | Unresolved / Evidence missing | Duplicate deposit / withdrawal / rail / support handling |
| No unresolved-state handling evidence | Reconciliation evidence package; support / dispute evidence package | Unresolved / Evidence missing | Customer-money state closure; support wording; incident routing |
| No support closure dependency evidence | Support / dispute evidence package; reconciliation evidence package | Unresolved / Evidence missing | Support closure; dispute closure; customer communication |
| No audit / retention policy | Audit / retention / access-control evidence package | Unresolved / Evidence missing | Evidence preservation; post-pilot review; access control |
| No ledger / accounting truth ADR | ADR drafting readiness evidence package | Unresolved / Evidence missing | Ledger semantics; accounting truth; source-of-truth selection |
| No accepted reconciliation ADR | ADR drafting readiness evidence package | Unresolved / Evidence missing | Reconciliation authority; source-of-truth boundary; implementation preflight |
| No implementation-specific §7a brief | Implementation-proposal preflight evidence package | Unresolved / Evidence missing | Any future implementation proposal, §7 activation, or execution brief |

No blocker in this package is closed.

## 14. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Reconciliation ownership | Owners and responsibilities may change. | Review date required before downstream use. | Any role, process, vendor, or governance change. |
| Source-of-truth boundary | Systems and evidence hierarchy may change. | Governed review required before reliance. | Any system, provider, ledger, accounting, support, or audit boundary change. |
| Matching rules | Matching assumptions may become stale with systems or vendors. | Review date required before downstream use. | Any record source, event taxonomy, provider, or closure rule change. |
| Exception taxonomy | Exception classes may change with rail, custody, support, or legal review. | Review date required before downstream use. | Any new failure, reversal, dispute, duplicate, blocked, or unresolved state. |
| Duplicate handling | Duplicate patterns and identifiers may change. | Review date required before downstream use. | Any event-id, provider, support, audit, or request model change. |
| Deposit reconciliation evidence | Deposit path and source records may change. | Review date required before downstream use. | Any deposit, rail, custody, settlement, support, or audit change. |
| Withdrawal reconciliation evidence | Withdrawal path and liquidity evidence may change. | Review date required before downstream use. | Any withdrawal, liquidity, custody, rail, settlement, support, or audit change. |
| Custody-state evidence | Provider custody records and responsibility may change. | Dated provider / custody review required before downstream use. | Any provider, asset-control, recovery, hold, release, or custody-boundary change. |
| Rail-state evidence | Rail event behavior and permissions may change. | Dated rail / vendor review required before downstream use. | Any vendor, rail, permission, environment, event, or finality change. |
| Settlement / finality evidence | Finality rules may change by rail or provider. | Review date required before downstream use. | Any rail, settlement, finality, reversal, or dispute change. |
| Stablecoin / conversion evidence | Conversion, redemption, and provider behavior may change. | Review date required before downstream use. | Any issuer, provider, custody, conversion, redemption, or stablecoin-risk change. |
| Fee / FX / spread evidence | Pricing, quotes, fees, rates, and spreads can stale quickly. | Review date required before downstream use. | Any rate source, fee, spread, quote-expiry, slippage, or final-value change. |
| Liquidity / withdrawal evidence | Liquidity and withdrawal constraints may change. | Review date required before downstream use. | Any liquidity buffer, withdrawal path, pause, stress, rail, custody, or treasury change. |
| Support closure dependency | Support constraints may change with evidence and policy. | Review date required before downstream use. | Any support state, closure rule, dispute handling, or wording change. |
| Audit / retention evidence | Retention and access-control expectations may change. | Dated review required before downstream use. | Any retention, access-control, evidence storage, or recordkeeping change. |
| Ledger / accounting boundary | Ledger and accounting truth are material authority questions. | Separate governed decision required where material. | Any ledger, accounting, source-of-truth, custody, rail, or regulatory change. |
| Legal / compliance review | Legal and regulatory posture is fact and jurisdiction dependent. | Dated, attributable qualified review required before downstream use. | Any jurisdiction, customer class, rail, custody, recordkeeping, dispute, finality, or customer-money claim change. |

Freshness expectations are planning constraints only. They are not approved SLAs, reconciliation policy, ledger policy, accounting policy, support policy, legal conclusions, or customer-money permission.

## 15. Downstream dependency effect

- **Support / dispute evidence package:** Must inherit reconciliation exception states, evidence gaps, mismatch categories, unresolved-state handling, and closure dependencies.
- **Audit / retention evidence package:** Must capture reconciliation review evidence, matching evidence, exception evidence, unresolved-state evidence, support closure evidence, and post-pilot review inputs.
- **ADR drafting readiness:** Cannot proceed for reconciliation-sensitive, ledger-sensitive, source-of-truth-sensitive, or accounting-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** Cannot treat reconciliation readiness, ledger truth, accounting truth, support closure, or customer-money state truth as closed without accepted evidence.

## 16. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Reconciliation evidence package |
| Source class | TBD |
| Source pointer | TBD |
| Date received | TBD |
| Freshness / review date | TBD |
| Evidence owner | TBD by future governed review |
| Reviewer | TBD |
| Related blocker | TBD |
| Claim supported | TBD |
| Claim not supported | TBD |
| Conflicts identified | TBD |
| Recommended evidence state | TBD |
| Non-authorization note | Evidence intake does not approve reconciliation operations, ledger truth, accounting truth, support closure, Class B execution, implementation, or customer-money movement. |

## 17. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the Reconciliation package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, reconciliation-ready, ledger-ready, accounting-ready, support-ready, audit-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 18. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify Reconciliation evidence and does not approve reconciliation operations, reconciliation closure, source-of-truth selection, ledger truth, accounting truth, transaction processing, deposit processing, withdrawal processing, custody operations, rail operations, stablecoin conversion, fee / FX / spread finality, liquidity operations, support closure, dispute closure, audit operations, external engagement, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future reconciliation evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, custody evidence review, rail / vendor permission evidence review, settlement / finality evidence review, stablecoin / conversion evidence review, fee / FX / spread evidence review, liquidity / withdrawal evidence review, Trust UX / disclosure evidence review, Pilot Ops evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
