# HEDGR - Class B Reconciliation SOP

## 1. Status / Authority / Scope

**Status:** Reconciliation SOP; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, and future operational evidence.

**Scope:** Defines reconciliation requirements and unresolved reconciliation questions for future Class B consideration.

**Mode:** Reconciliation-model identification only; not reconciliation approval, ledger approval, live operations, or implementation approval.

This SOP does not approve, activate, or operationalize reconciliation operations, ledger truth, transaction processing, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, support operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This SOP exists to support the Class B governance spine by defining the reconciliation control model that would be required before any future manual / limited Class B pilot may be considered.

It answers:

**What reconciliation evidence, ownership, exception handling, source-of-truth boundaries, mismatch treatment, audit trail, and review expectations must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Is Hedgr approved to reconcile live customer-money flows?**

It does not create:

- reconciliation approval
- ledger truth approval
- transaction processing approval
- deposit approval
- withdrawal approval
- custody approval
- rail approval
- stablecoin conversion approval
- operating approval
- implementation authority
- customer-money authority
- Class B readiness

## 3. Source inputs

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_OPS_RUNBOOK.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify reconciliation requirements and unresolved reconciliation questions only. They do not create reconciliation approval, ledger truth, implementation authority, or execution approval.

## 4. Reconciliation principles

1. **Reconciliation before user-visible finality**

   No future Class B surface should claim completion, settlement, finality, successful conversion, or available withdrawal state unless reconciliation evidence supports that claim.

2. **Source-of-truth boundaries must be explicit**

   The SOP must distinguish rail evidence, custody evidence, ledger evidence, UI state, support state, and operator review state.

3. **Ambiguity must pause, not resolve by assumption**

   Where rail, custody, liquidity, ledger, support, or operator evidence conflicts or is incomplete, the future default posture should be exception review, not silent progression.

4. **Reconciliation is not accounting truth by default**

   This SOP may define evidence requirements and review questions. It must not select a ledger, accounting system, or source of financial truth.

5. **Evidence must be durable**

   Any future Class B reconciliation flow must leave an audit trail sufficient for review, support, incident analysis, and governance escalation.

6. **User claims depend on reconciled evidence**

   Trust UX, support messages, and Copilot explanations must not outrun reconciled operational truth.

7. **SOP does not create authority**

   A reconciliation SOP can define controls and questions. It cannot authorize implementation, live reconciliation operations, ledger mutation, or customer fund movement.

## 5. Reconciliation domains

| Domain | Reconciliation requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
| --- | --- | --- | --- | --- |
| Reconciliation ownership | Who owns reconciliation? Who performs daily or event-level review? Who approves reconciled state? Who escalates exceptions? Who owns unresolved items? | Reconciliation without ownership creates hidden operational and trust risk. | Pilot ops ownership is framed; no Class B reconciliation owner is approved. | Reconciliation owner matrix; role / responsibility map; escalation owner map; Pilot ops review. |
| Source-of-truth boundary | Which systems or records represent rail state, custody state, ledger state, UI state, support state, and operator-review state? Which source wins when evidence conflicts? What is not allowed to become ledger truth? | Existing doctrine blocks UI allocation bands and engine output from becoming accounting truth. | Allocation bands and engine outputs remain informational; no Class B ledger truth is approved. | Ledger / accounting truth ADR if required; custody responsibility matrix; rail evidence map; reconciliation evidence map; audit evidence checklist. |
| Deposit reconciliation | What evidence confirms deposit initiation, pending state, failure, reversal, dispute, completion, custody transition, and user-visible status? What happens if deposit rail and custody evidence disagree? | Deposit reconciliation affects user balance, custody claims, support, and conversion eligibility. | Deposits remain future Class B / C capabilities only when authorized. | Deposit path map; rail classification row; custody transition map; deposit state taxonomy; support escalation path. |
| Withdrawal reconciliation | What evidence confirms withdrawal request, approval, pending rail action, pending custody action, delay, block, failure, reversal, dispute, settlement, and completion? What evidence proves finality? | Withdrawal integrity is mission-critical and must not rely on optimistic status interpretation. | Withdrawal control questions are framed; no withdrawal operations or reconciliation process is approved. | Withdrawal control matrix; settlement / finality evidence map; liquidity / withdrawal control evidence; kill criteria; support / dispute process. |
| Rail-event reconciliation | What rail events must be captured? How are rail events matched to user-visible states? What happens with missing, delayed, duplicate, reversed, blocked, or disputed rail events? | Rail state can diverge from UI state and operator expectations. | Rails are classification-only; no rail is approved or operationalized. | Rail responsibility matrix; vendor / partner event evidence; settlement / finality map; exception handling process. |
| Custody-state reconciliation | What custody evidence confirms asset control, release, hold, lockout, recovery, provider failure, or custody transition? How does custody evidence reconcile against rails and user-visible state? | Custody state affects trust claims, withdrawal reliability, loss responsibility, and support handling. | Custody boundary questions are framed; no custody model is approved. | Custody responsibility matrix; provider evidence; asset-control lifecycle map; failure-mode register. |
| Stablecoin / conversion reconciliation | What evidence confirms stablecoin acquisition, transfer, holding, redemption, conversion, FX rate, spread, fee, slippage, and failure? What happens if conversion state and rail state disagree? | Stablecoin and FX flows affect ledger truth, user claims, fees, risk disclosure, and withdrawal readiness. | Stablecoin / conversion remains product intent unless separately authorized. | Stablecoin / conversion boundary memo or ADR if required; fee / FX disclosure checklist; conversion evidence map; vendor evidence. |
| Fee / FX / spread reconciliation | What evidence confirms quoted rates, final rates, fees, spreads, stale quotes, rejected quotes, and final settlement values? What must be shown to users versus retained internally? | Fees and FX must be visible and cannot become hidden extraction or misleading precision. | No Class B fee / FX / spread reconciliation model is approved. | Fee / FX disclosure requirements; stale-rate handling rules; rate evidence retention model; legal / compliance review. |
| Duplicate and mismatch handling | How are duplicate deposits, duplicate withdrawals, duplicate rail events, duplicate support cases, and duplicate operator actions detected and handled? How are mismatches categorized? | Duplicate or mismatched states are high-risk customer-money events. | No Class B duplicate or mismatch handling process is approved. | Exception taxonomy; duplicate detection assumptions; manual review workflow; escalation matrix; audit evidence checklist. |
| Delayed / failed / ambiguous / unresolved state handling | How are delayed, failed, ambiguous, blocked, disputed, and unresolved states identified, reviewed, communicated, and eventually closed? What states require pause or kill criteria? | Ambiguous states must not be hidden behind generic "processing" language. | Trust UX and pilot ops questions are framed; no operational state process is approved. | Exception review workflow; support escalation matrix; incident / pause process; user communication constraints; kill criteria. |
| Reconciliation cadence | Is reconciliation event-based, daily, batch-based, manual, vendor-driven, rail-driven, custody-driven, or hybrid? What cadence is required for deposits, withdrawals, support cases, and exceptions? | Cadence affects support commitments, liquidity visibility, audit readiness, and operational risk. | Appendix-style operational examples exist in doctrine, but no Class B cadence is approved. | Reconciliation cadence policy; ops owner capacity review; vendor / partner evidence; legal / compliance review where required. |
| Audit trail and retention | What evidence is retained? Where is it stored? Who can access it? How long is it retained? What evidence is required for governance review, customer support, compliance, and post-pilot assessment? | Future Class B activity must be reviewable before authority can widen. | Audit and retention questions are framed; no Class B retention process is approved. | Audit evidence checklist; data retention requirements; access-control review; legal / compliance review. |

## 6. Source-of-truth boundary template

| Evidence layer | Example evidence | What it may prove | What it must not prove by itself | Owner | Future authority dependency |
| --- | --- | --- | --- | --- | --- |
| User-submitted request | Request timestamp, authenticated user action, submitted form, support intake. | A user asked for an action or review. | Completion, settlement, custody transition, or ledger truth. | TBD | Eligibility, support, and audit review. |
| UI state | Visible status label, route state, notification, activity item. | What the product displayed at a point in time. | Ledger truth, rail finality, custody finality, or support resolution. | TBD | Trust UX review and authorized implementation brief. |
| Support state | Case status, support note, user communication record. | What support knew, communicated, or escalated. | Transaction state, settlement finality, or custody truth. | TBD | Support review and audit evidence design. |
| Operator review state | Manual checklist, approval note, exception decision. | That an operator reviewed evidence under a defined process. | Settlement, finality, ledger truth, or legal approval. | TBD | Pilot Ops review and reconciliation owner matrix. |
| Rail event | Provider event, webhook record, bank / mobile-money receipt, partner statement. | Rail-side initiation, pending state, failure, reversal, dispute, or completion depending on evidence. | Custody truth, ledger truth, or user-visible finality without matching evidence. | TBD | Rail classification review and vendor evidence. |
| Custody state | Provider balance record, asset-control evidence, hold / release record. | Custody-side control, hold, release, lockout, or transition depending on evidence. | Rail finality, fee truth, or UI completion by itself. | TBD | Custody boundary review and provider evidence. |
| Stablecoin / conversion event | Conversion quote, execution record, transfer record, redemption evidence. | Conversion or transfer state if provider evidence supports it. | Ledger truth, withdrawal availability, or final customer value by itself. | TBD | Stablecoin / conversion review or ADR if required. |
| Fee / FX quote | Quote ID, timestamp, rate source, fee schedule, expiry. | The terms offered or available at a point in time. | Final charged value, settled value, or customer balance without settlement evidence. | TBD | Legal / compliance review and fee / FX disclosure requirements. |
| Settlement / finality evidence | Settlement confirmation, partner finality marker, reconciliation match. | That a specific event reached a defined finality standard. | System-wide readiness or approval for future transactions. | TBD | Settlement / finality evidence map and ADR where material. |
| Liquidity check | Buffer assessment, liquidity snapshot, exception threshold review. | Whether a defined liquidity check was performed. | Withdrawal approval, treasury authority, or customer-money movement authority. | TBD | Liquidity / withdrawal control review. |
| Reconciliation review | Match result, mismatch note, exception review record. | Whether defined evidence matched or required exception handling. | Accounting truth, ledger mutation approval, or live reconciliation authority. | TBD | Reconciliation SOP acceptance through future governed review. |
| Audit record | Immutable log, evidence bundle, reviewer trail, retention metadata. | That evidence and decisions were recorded for later review. | Correctness, finality, or operational approval by itself. | TBD | Audit evidence checklist and retention review. |
| Ledger / accounting record | Ledger entry, accounting journal, balance record. | Ledger or accounting state only if future authority selects and governs it. | Rail state, custody state, support state, or UI truth by default. | TBD | Ledger / accounting truth ADR if required. |

This table is a template only. It does not select a source of truth, approve ledger semantics, or authorize reconciliation operations.

## 7. Reconciliation event matrix template

| Event type | Required evidence | Matching rule to define | Exception condition | User-visible state dependency | Audit note |
| --- | --- | --- | --- | --- | --- |
| Deposit requested | TBD | TBD | Missing request evidence or duplicate request. | User request state only. | Record request evidence and identity context. |
| Deposit rail event received | TBD | TBD | Missing, delayed, duplicate, reversed, blocked, or disputed rail event. | No completion claim without matching custody / reconciliation evidence. | Preserve raw rail evidence and normalized review note. |
| Deposit pending | TBD | TBD | Pending state exceeds approved review boundary or lacks owner. | Pending wording must remain non-final. | Log owner and next review trigger. |
| Deposit failed | TBD | TBD | Failure reason unclear or reversal evidence missing. | Failure wording must not promise recovery. | Preserve failure and support evidence. |
| Deposit reversed | TBD | TBD | Reversal not matched across rail / custody / ledger evidence. | Reversal claim requires supporting evidence. | Preserve before / after evidence. |
| Deposit completed | TBD | TBD | Rail, custody, ledger, or review evidence conflicts. | Completion claim depends on reconciled evidence. | Preserve final match record. |
| Custody transition recorded | TBD | TBD | Custody evidence conflicts with rail or ledger state. | Custody claim depends on approved boundary. | Preserve provider evidence. |
| Conversion requested | TBD | TBD | Quote expired, missing, rejected, or mismatched. | Request state only. | Preserve quote and request metadata. |
| Conversion failed | TBD | TBD | Restored state, fee, or custody state unclear. | Failure wording must not imply restoration unless evidenced. | Preserve provider and exception evidence. |
| Conversion completed | TBD | TBD | FX, fee, spread, custody, or rail evidence conflicts. | Conversion claim depends on reconciled evidence. | Preserve final rate and evidence bundle. |
| Withdrawal requested | TBD | TBD | Missing request evidence, duplicate request, or eligibility conflict. | Request state only. | Record request and authorization evidence. |
| Withdrawal approved | TBD | TBD | Approval lacks required evidence or reviewer authority. | Approval must not imply settlement. | Preserve reviewer trail. |
| Withdrawal rail event received | TBD | TBD | Missing, delayed, duplicate, reversed, blocked, or disputed rail event. | No finality claim by rail event alone. | Preserve rail evidence and match note. |
| Withdrawal delayed | TBD | TBD | Delay class, owner, or next review is unclear. | Delay wording must remain explicit and non-promissory. | Record delay reason and owner. |
| Withdrawal blocked | TBD | TBD | Block reason or authority unclear. | Block wording depends on support / compliance constraints. | Preserve block evidence. |
| Withdrawal failed | TBD | TBD | Failure reason, reversal, or custody state unclear. | Failure wording must not imply resolution. | Preserve failure and support path evidence. |
| Withdrawal reversed | TBD | TBD | Reversal not matched across rail / custody / ledger evidence. | Reversal claim requires supporting evidence. | Preserve before / after evidence. |
| Withdrawal disputed | TBD | TBD | Dispute owner, evidence, or timeline unclear. | Dispute wording must not imply outcome. | Preserve dispute evidence and communications. |
| Withdrawal completed | TBD | TBD | Settlement / finality evidence missing or conflicting. | Completion claim depends on finality evidence. | Preserve finality evidence and match record. |
| Support case opened | TBD | TBD | Case not linked to event or owner. | Support opening must not imply resolution. | Preserve support intake evidence. |
| Support case resolved | TBD | TBD | Resolution lacks transaction / rail / custody evidence. | Resolution claim depends on evidence scope. | Preserve closure evidence. |
| Reconciliation mismatch found | TBD | TBD | Severity, owner, or pause relevance unclear. | User-visible state must not outrun exception review. | Preserve mismatch evidence. |
| Reconciliation mismatch resolved | TBD | TBD | Resolution does not identify winning evidence or audit trail. | Resolution claim depends on approved closure rule. | Preserve closure and reviewer evidence. |
| Pilot paused | TBD | TBD | Pause trigger or affected flows unclear. | Pause communication must reflect affected actions only. | Preserve pause decision evidence. |
| Pilot halted | TBD | TBD | Halt authority, affected flows, or support path unclear. | Halt communication must not imply normal operation. | Preserve halt decision and governance evidence. |

This matrix defines evidence shape only. It does not approve transaction processing, state transitions, ledger mutation, or customer-money movement.

## 8. Exception taxonomy template

| Exception type | Description | Severity | Required review owner | User communication required? | Pause / kill relevance | Evidence required |
| --- | --- | --- | --- | --- | --- | --- |
| Missing rail evidence | Rail evidence required for the event is absent or unavailable. | TBD | TBD | TBD | TBD | TBD |
| Missing custody evidence | Custody evidence required for the event is absent or unavailable. | TBD | TBD | TBD | TBD | TBD |
| Conflicting rail and custody evidence | Rail and custody records disagree. | TBD | TBD | TBD | TBD | TBD |
| Duplicate deposit event | Deposit appears more than once across request, rail, support, operator, or ledger-adjacent records. | TBD | TBD | TBD | TBD | TBD |
| Duplicate withdrawal event | Withdrawal appears more than once across request, rail, support, operator, or ledger-adjacent records. | TBD | TBD | TBD | TBD | TBD |
| Delayed settlement | Settlement evidence has not arrived within the future approved review boundary. | TBD | TBD | TBD | TBD | TBD |
| Failed settlement | Settlement failed or was rejected by a relevant evidence source. | TBD | TBD | TBD | TBD | TBD |
| Blocked transaction | A rail, custody, compliance, liquidity, or operator block prevents progression. | TBD | TBD | TBD | TBD | TBD |
| Compliance hold | Compliance review blocks or delays state progression. | TBD | TBD | TBD | TBD | TBD |
| Suspicious activity flag | Activity requires review before any continuation. | TBD | TBD | TBD | TBD | TBD |
| FX quote mismatch | Quoted, displayed, final, or retained rate evidence disagrees. | TBD | TBD | TBD | TBD | TBD |
| Fee mismatch | Quoted, displayed, charged, or retained fee evidence disagrees. | TBD | TBD | TBD | TBD | TBD |
| Stablecoin conversion mismatch | Conversion, transfer, holding, redemption, or provider evidence conflicts. | TBD | TBD | TBD | TBD | TBD |
| Support-state mismatch | Support state conflicts with rail, custody, ledger, UI, or operator state. | TBD | TBD | TBD | TBD | TBD |
| UI-state mismatch | UI state conflicts with operational evidence. | TBD | TBD | TBD | TBD | TBD |
| Unresolved customer-money state | Records do not establish a clear pending, failed, completed, reversed, or disputed state. | TBD | TBD | TBD | TBD | TBD |
| Manual review conflict | Operators disagree or review records conflict. | TBD | TBD | TBD | TBD | TBD |
| Vendor / partner evidence unavailable | Required third-party evidence is missing, delayed, or inaccessible. | TBD | TBD | TBD | TBD | TBD |

Exception examples are illustrative only. They do not define approved thresholds, live controls, or operational authority.

## 9. Reconciliation cadence template

| Reconciliation area | Candidate cadence | Trigger | Owner | Evidence required | Escalation condition |
| --- | --- | --- | --- | --- | --- |
| Participant eligibility | Manual review | Eligibility review or participant change. | TBD | TBD | TBD |
| Deposit events | Event-based | Deposit request, rail event, custody transition, failure, or mismatch. | TBD | TBD | TBD |
| Withdrawal events | Event-based | Withdrawal request, approval, rail event, delay, failure, dispute, or completion. | TBD | TBD | TBD |
| Custody transitions | Event-based | Asset control, hold, release, lockout, recovery, or provider event. | TBD | TBD | TBD |
| Rail events | Vendor-driven | Rail event, partner file, missing event, reversal, block, or dispute. | TBD | TBD | TBD |
| Stablecoin / conversion events | Event-based | Quote, conversion request, failure, completion, redemption, or transfer. | TBD | TBD | TBD |
| Fee / FX evidence | Event-based | Quote, expiry, rejection, final rate, fee, spread, or settlement value. | TBD | TBD | TBD |
| Liquidity checks | Manual review | Withdrawal request, stress trigger, threshold check, or pause review. | TBD | TBD | TBD |
| Support cases | Manual review | Case opened, updated, escalated, or closed. | TBD | TBD | TBD |
| Disputes | Manual review | User dispute, partner dispute, compliance hold, or unresolved state. | TBD | TBD | TBD |
| Duplicate events | Event-based | Duplicate signal across request, rail, custody, support, operator, or ledger-adjacent records. | TBD | TBD | TBD |
| Unresolved exceptions | Daily | Open exception review or aging threshold. | TBD | TBD | TBD |
| Post-pilot review | Batch | Future pilot closeout or governance review window. | TBD | TBD | TBD |

Candidate cadence labels are not approved operating cadence and must not be treated as service-level commitments.

## 10. Reconciliation prohibited assumptions

The repo must not assume:

- reconciliation operations are approved
- a ledger source of truth exists
- UI state is ledger truth
- engine outputs are accounting truth
- rail events are automatically final
- custody events are automatically final
- support state proves transaction state
- operator review proves settlement finality
- deposits can be reconciled
- withdrawals can be reconciled
- stablecoin conversion can be reconciled
- fee / FX / spread values are final
- duplicate detection exists
- mismatch handling exists
- daily reconciliation exists
- audit retention is approved
- customer funds may move

## 11. Downstream dependency effect

- **Support escalation matrix:** must reflect reconciliation exception states, evidence gaps, mismatch categories, and prohibited promises.
- **Audit evidence checklist:** must formalize the event-level evidence, retention, owner, and review requirements surfaced here.
- **Future ADRs:** must consider ledger / accounting truth, reconciliation authority, audit evidence, exception handling, and finality boundaries where material.
- **Implementation-specific §7a brief:** must cite this SOP when any Class B flow depends on reconciled transaction, custody, rail, conversion, fee, FX, support, or ledger state.
- **Future frontend implementation:** must not claim completed, settled, available, converted, reconciled, or final states unless the future authorized implementation provides supporting evidence.
- **Future implementation ticket:** must not rely on this SOP as reconciliation approval or operational readiness.

## 12. Open Reconciliation questions for future review

- [ ] What Class B flow is being reconciled?
- [ ] What evidence proves user request initiation?
- [ ] What evidence proves rail state?
- [ ] What evidence proves custody state?
- [ ] What evidence proves settlement finality?
- [ ] What evidence proves stablecoin / conversion state, if applicable?
- [ ] What evidence proves fee, FX, spread, or limit truth?
- [ ] What system is the ledger / accounting source of truth, if any?
- [ ] Which evidence source wins if records conflict?
- [ ] Who owns reconciliation review?
- [ ] Who owns exception review?
- [ ] What mismatch categories exist?
- [ ] What duplicate detection process exists?
- [ ] What delayed / failed / ambiguous / unresolved state process exists?
- [ ] What user-visible state depends on reconciliation?
- [ ] What support messaging is allowed before reconciliation is complete?
- [ ] What audit evidence must be retained?
- [ ] What must be true before reconciliation operations can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, support design, vendor / partner evidence, audit evidence design, and accepted ADRs where required.

## 13. Non-authorization statement

This SOP is non-authoritative and documentation-only. It does not approve, activate, or operationalize reconciliation operations, ledger truth, transaction processing, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, support operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B reconciliation-related implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, support review, audit evidence review, and operational evidence where applicable.
