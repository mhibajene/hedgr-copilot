# HEDGR - Class B Audit Evidence Checklist

## 1. Status / Authority / Scope

**Status:** Audit evidence checklist; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, and future operational evidence.

**Scope:** Defines audit evidence requirements and unresolved audit / retention questions for future Class B consideration.

**Mode:** Audit-evidence model identification only; not audit approval, retention approval, ledger approval, live operations, or implementation approval.

This checklist does not approve, activate, or operationalize audit operations, retention policy, ledger truth, reconciliation operations, support operations, transaction processing, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This checklist exists to support the Class B governance spine by defining the audit evidence model that would be required before any future manual / limited Class B pilot may be considered.

It answers:

**What evidence records, event receipts, ownership expectations, retention assumptions, escalation artifacts, and post-pilot review inputs must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Is Hedgr approved to collect, retain, audit, or operate live customer-money records?**

It does not create:

- audit approval
- retention approval
- ledger truth approval
- reconciliation approval
- support approval
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
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify audit evidence requirements and unresolved audit questions only. They do not create audit approval, retention approval, ledger truth, implementation authority, or execution approval.

## 4. Audit evidence principles

1. **No claim without evidence**

   Future Class B user-facing, support-facing, operator-facing, or governance-facing claims must map to evidence records.

2. **Evidence before authority widening**

   No future authority widening should be considered unless the relevant pilot flow can produce reviewable evidence.

3. **Receipts must be event-level**

   Evidence should distinguish user request, operator review, rail event, custody event, reconciliation review, support handoff, incident decision, and governance review.

4. **Retention is not assumed**

   This checklist may identify retention questions. It must not approve retention periods, storage locations, data access, or privacy posture.

5. **Audit logs are not ledger truth by default**

   Audit evidence may support review. It must not automatically become accounting truth, ledger truth, settlement truth, or custody truth.

6. **Exceptions must be auditable**

   Delayed, failed, duplicate, disputed, ambiguous, blocked, unresolved, paused, and halted states must leave evidence if any future pilot is considered.

7. **Checklist does not create authority**

   An audit evidence checklist can define evidence shape and questions. It cannot authorize implementation, live audit operations, retention policy, ledger mutation, or customer fund movement.

## 5. Audit evidence domains

| Domain | Audit evidence requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
| --- | --- | --- | --- | --- |
| Evidence ownership | Who owns evidence capture? Who owns evidence review? Who owns evidence quality? Who can attest that evidence is complete? Who escalates missing or contradictory evidence? | Evidence without ownership becomes operational theater. | Pilot Ops, Reconciliation SOP, and Support Escalation roles are framed; no active audit evidence owner is approved. | Evidence owner matrix; role / responsibility map; escalation owner map; Pilot ops review; Reconciliation review. |
| Participant and eligibility evidence | What evidence proves participant eligibility, KYC / AML state, sanctions / PEP review where applicable, limits, approvals, and participant consent? | Class B pilot exposure depends on participant constraints and compliance evidence. | Legal / compliance questions are framed; no participant evidence process is approved. | Eligibility evidence checklist; Legal / compliance review; participant register requirements; consent / disclosure record requirements. |
| User request evidence | What evidence proves that a user requested, confirmed, cancelled, disputed, or did not authorize an action? | User request evidence constrains support, disputes, reversibility, and operator review. | No Class B user request evidence model is approved. | Request receipt model; confirmation / cancellation evidence; dispute evidence; Trust UX review. |
| Manual review evidence | What evidence proves an operator reviewed, approved, rejected, paused, escalated, or blocked a flow? What evidence was checked? | Class B is human-in-the-loop; manual review must be auditable. | Pilot Ops manual review is framed; no active manual review evidence process is approved. | Manual review evidence checklist; reviewer role map; approval / rejection record requirements; escalation evidence requirements. |
| Deposit evidence | What evidence proves deposit request, rail event, pending state, failure, reversal, dispute, completion, custody transition, and reconciliation status? | Deposit evidence constrains user-visible state, custody claims, conversion eligibility, and support closure. | Deposits remain future Class B / C capabilities only when authorized. | Deposit evidence checklist; rail event evidence; custody transition evidence; Reconciliation SOP; Support escalation review. |
| Withdrawal evidence | What evidence proves withdrawal request, approval, pending review, rail action, custody action, delay, block, failure, reversal, dispute, settlement, completion, and finality? | Withdrawal evidence is mission-critical because withdrawal integrity outranks optimization. | Withdrawal control and reconciliation questions are framed; no withdrawal evidence process is approved. | Withdrawal evidence checklist; settlement / finality evidence; Liquidity / withdrawal control review; Reconciliation SOP; Support escalation review. |
| Custody evidence | What evidence proves asset control, custody transition, provider state, account lockout, recovery, frozen assets, failed custody transition, or custody dispute? | Custody evidence constrains user claims, support closure, reconciliation, and legal risk. | Custody boundary questions are framed; no custody model or custody evidence process is approved. | Custody responsibility matrix; provider evidence pack; asset-control lifecycle evidence; Legal / compliance review. |
| Rail evidence | What evidence proves rail availability, rail event, rail failure, rail delay, duplicate rail event, reversal, block, dispute, fees, limits, and settlement state? | Rail evidence affects settlement truth, fee / FX claims, support routing, and reconciliation. | Rail classification is documentation-only; no rail is approved. | Rail responsibility matrix; vendor / partner evidence; settlement / finality evidence; Reconciliation SOP. |
| Stablecoin / conversion evidence | What evidence proves stablecoin acquisition, holding, transfer, redemption, conversion, FX rate, spread, fee, slippage, failure, or reversal? | Stablecoin and conversion evidence affects ledger truth, custody, risk disclosure, fees, and withdrawal readiness. | Stablecoin / conversion remains product intent unless separately authorized. | Stablecoin / conversion boundary review; fee / FX evidence requirements; vendor evidence; Legal / compliance review; ADR if required. |
| Fee / FX / spread evidence | What evidence proves quoted rate, final rate, fees, spreads, stale quotes, rejected quotes, displayed estimates, and settled values? | Fee / FX evidence prevents hidden extraction, misleading precision, and unsupported support claims. | No Class B fee / FX / spread evidence model is approved. | Fee / FX disclosure requirements; rate evidence retention model; Legal / compliance review; Trust UX review. |
| Liquidity evidence | What evidence proves liquidity checks, buffer state, threshold breach, withdrawal prioritization, pause / resume, stress trigger, or kill decision? | Liquidity is sacred; liquidity claims must be reviewable. | Liquidity / withdrawal controls are framed; no liquidity buffer or treasury operation is approved. | Liquidity evidence checklist; buffer policy if approved; stress / pause evidence; kill criteria evidence; ADR if material. |
| Reconciliation evidence | What evidence proves reconciliation review, mismatch detection, mismatch resolution, duplicate handling, exception closure, and source-of-truth review? | User-facing finality and support closure depend on reconciliation evidence. | Reconciliation SOP is framed; no reconciliation operations are approved. | Reconciliation event matrix; exception taxonomy; reconciliation owner map; Audit evidence checklist completion. |
| Support and dispute evidence | What evidence proves support handoff, first response, escalation, permitted wording, user communication, dispute classification, complaint receipt, closure, or incident routing? | Support must not become shadow transaction or custody authority. | Support Escalation Matrix is framed; no support operations are approved. | Support case evidence checklist; dispute evidence requirements; incident routing evidence; support closure evidence. |
| Incident and governance evidence | What evidence proves incident trigger, pause decision, resume decision, halt decision, governance escalation, override, post-incident review, and post-pilot review? | Governance before scale requires reversibility, accountability, and traceable decisions. | Pause / kill concepts are framed; no active incident or governance evidence process is approved. | Incident evidence checklist; governance escalation record; override record template; post-pilot review template. |

## 6. Evidence checklist template

| Event / control area | Evidence required | Source system or record | Owner | Retention assumption | Review / escalation condition | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Participant eligibility | TBD | TBD | TBD | TBD | TBD | Not assessed |
| KYC / AML review | TBD | TBD | TBD | TBD | TBD | Not assessed |
| User request | TBD | TBD | TBD | TBD | TBD | Not assessed |
| User confirmation | TBD | TBD | TBD | TBD | TBD | Not assessed |
| User cancellation | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Manual review approval | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Manual review rejection | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Deposit request | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Deposit rail event | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Deposit custody transition | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Deposit failure | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Deposit reconciliation review | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal request | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal approval | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal rail event | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal custody transition | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal finality | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal failure | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Withdrawal reconciliation review | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Custody state | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Rail state | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Stablecoin / conversion event | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Fee / FX quote | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Fee / FX final value | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Liquidity check | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Liquidity buffer breach | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Pause decision | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Resume decision | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Halt decision | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Support handoff | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Support response | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Dispute case | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Complaint case | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Incident review | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Reconciliation mismatch | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Exception closure | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Governance override | TBD | TBD | TBD | TBD | TBD | Not assessed |
| Post-pilot review | TBD | TBD | TBD | TBD | TBD | Not assessed |

This checklist defines evidence shape only. It does not approve evidence collection, retention, audit operations, ledger truth, or customer-money movement.

## 7. Event receipt template

| Receipt field | Required meaning | Applies to | Prohibited interpretation |
| --- | --- | --- | --- |
| Event ID | Unique reference for a specific future evidence event. | All event-level records. | Does not prove completion, finality, or correctness. |
| Timestamp | Time the event, review, or record was captured. | Requests, reviews, rail events, custody events, support events, incidents, governance decisions. | Does not prove that the event is valid or settled. |
| User / participant reference | Bounded reference to the participant or user context. | Eligibility, request, support, dispute, and review records. | Does not approve identity verification or data retention. |
| Event type | Classification of the event being evidenced. | Deposit, withdrawal, custody, rail, conversion, support, dispute, incident, reconciliation, governance review. | Does not create an approved state machine. |
| User-visible state | The state shown or eligible to be shown to a user. | Trust UX, support, and review evidence. | Does not prove ledger truth, custody truth, settlement truth, or finality. |
| Internal state | The internal review or operational state, if authorized later. | Operator review, reconciliation, support, incident, governance review. | Does not approve hidden operations or customer-money movement. |
| Evidence source | Source system, vendor record, operator record, support record, or governance artifact. | All evidence records. | Does not make the source authoritative by default. |
| Evidence owner | Role responsible for capture or quality review. | Evidence ownership and escalation. | Does not assign active operational authority. |
| Reviewed by | Role or reviewer that assessed the evidence. | Manual review, reconciliation, incident, governance review. | Does not imply approval unless separately authorized. |
| Review outcome | Result of the review, including unresolved or escalated states. | Manual review, reconciliation, support, incident, governance review. | Does not prove transaction outcome or ledger mutation. |
| Related rail record | Rail-side record linked to the event. | Deposit, withdrawal, settlement, finality, fee, FX, or rail exceptions. | Does not prove custody truth or ledger truth by itself. |
| Related custody record | Custody-side record linked to the event. | Custody transition, asset control, lockout, recovery, dispute. | Does not prove rail finality or support closure by itself. |
| Related reconciliation record | Reconciliation record linked to the event. | Mismatch, duplicate, exception, closure, source-of-truth review. | Does not create accounting truth by default. |
| Related support case | Support case linked to the event. | Support handoff, response, dispute, complaint, closure. | Does not prove transaction truth or finality. |
| Related incident record | Incident record linked to the event. | Pause, resume, halt, breach, failure, or governance escalation. | Does not prove safe recovery. |
| Related governance decision | Governance review or override linked to the event. | Governance escalation, override, post-pilot review. | Does not accept an ADR or widen authority by itself. |
| Missing evidence | Evidence absent or contradictory at review time. | Exceptions, escalations, unresolved states. | Does not allow silent progression. |
| Exception flag | Marker that the event needs exception review. | Delayed, failed, duplicate, disputed, ambiguous, blocked, unresolved, paused, or halted states. | Does not define approved thresholds or live controls. |
| Retention category | Future category used to ask retention and access-control questions. | All retained evidence categories, if later approved. | Does not approve retention duration, storage, access, or privacy posture. |

Receipt fields are future evidence-design inputs only. They do not approve a database schema, ledger model, event model, or production logging system.

## 8. Retention and access-control question template

| Evidence category | Retention question | Access-control question | Legal / compliance dependency | Current status |
| --- | --- | --- | --- | --- |
| Participant eligibility | How long may participant eligibility evidence be retained? | Who may view, update, attest, or export participant eligibility evidence? | Eligibility, privacy, and KYC / AML review. | Not approved |
| KYC / AML evidence | What KYC / AML records must or must not be retained? | Who may access sensitive identity, sanctions, PEP, or AML evidence? | Qualified legal / compliance review and vendor data-flow review. | Not approved |
| User request records | What user request, confirmation, cancellation, dispute, or non-authorization records must be retained? | Who may inspect or rely on user request evidence? | Privacy, consent, and dispute review. | Not approved |
| Transaction event evidence | What transaction-adjacent event evidence may be retained before ledger truth is approved? | Who may access event evidence without creating shadow transaction authority? | Legal / compliance, audit, and source-of-truth review. | Not approved |
| Custody evidence | What custody evidence must be retained for asset-control review? | Who may access custody, provider, lockout, recovery, or dispute evidence? | Custody boundary and legal / compliance review. | Not approved |
| Rail evidence | What rail records, vendor receipts, settlement markers, failures, reversals, and dispute records must be retained? | Who may access rail or vendor evidence? | Rail classification and vendor / partner review. | Not approved |
| Stablecoin / conversion evidence | What stablecoin acquisition, holding, transfer, redemption, conversion, FX, spread, fee, slippage, failure, or reversal evidence must be retained? | Who may access stablecoin / conversion evidence? | Stablecoin / conversion boundary, custody, and legal / compliance review. | Not approved |
| Fee / FX evidence | What quote, final rate, fee, spread, stale quote, rejected quote, estimate, or settled-value evidence must be retained? | Who may access rate, quote, spread, and fee evidence? | Fee / FX disclosure and legal / compliance review. | Not approved |
| Liquidity evidence | What liquidity check, buffer, breach, pause, resume, stress, or kill evidence must be retained? | Who may access liquidity and treasury-adjacent evidence? | Liquidity / withdrawal control and governance review. | Not approved |
| Reconciliation evidence | What match, mismatch, duplicate, exception, closure, or source-of-truth review evidence must be retained? | Who may access reconciliation evidence? | Reconciliation SOP and ledger / accounting truth review. | Not approved |
| Support evidence | What support handoff, response, permitted wording, user communication, escalation, and closure evidence must be retained? | Who may access support evidence? | Support Escalation review, privacy review, and legal / compliance review. | Not approved |
| Dispute / complaint evidence | What dispute classification, complaint receipt, communication, evidence bundle, and closure record must be retained? | Who may access dispute / complaint evidence? | Legal / compliance, support, and complaint-handling review. | Not approved |
| Incident evidence | What incident trigger, pause, resume, halt, escalation, communication, and post-incident evidence must be retained? | Who may access incident evidence? | Pilot Ops, liquidity / withdrawal control, support, and governance review. | Not approved |
| Governance override evidence | What override request, decision, rationale, approval, dissent, and reversal evidence must be retained? | Who may access governance override records? | Governance, ADR, and legal / compliance review where material. | Not approved |
| Post-pilot review evidence | What evidence must be retained for a future post-pilot review? | Who may access post-pilot review packs and underlying records? | Audit evidence design, retention review, legal / compliance input, and accepted ADRs where required. | Not approved |

This template does not approve retention duration, storage location, access rights, data processing, or privacy posture.

## 9. Audit exception template

| Audit exception | Description | Severity | Required owner | Required evidence | Escalation path | Closure dependency |
| --- | --- | --- | --- | --- | --- | --- |
| Missing participant evidence | Participant eligibility, consent, limit, approval, or compliance evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Missing user request evidence | Request, confirmation, cancellation, dispute, or non-authorization evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Missing rail evidence | Required rail event, settlement, failure, reversal, delay, fee, limit, or dispute evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Missing custody evidence | Required asset-control, transition, provider, lockout, recovery, frozen-asset, failure, or custody-dispute evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Missing reconciliation evidence | Required match, mismatch, duplicate, exception, source-of-truth, or closure evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Missing support handoff evidence | Required support handoff, response, communication, escalation, permitted wording, or closure evidence is absent. | TBD | TBD | TBD | TBD | TBD |
| Conflicting evidence | Evidence sources disagree across request, operator, rail, custody, reconciliation, support, incident, or governance records. | TBD | TBD | TBD | TBD | TBD |
| Duplicate event evidence | Duplicate request, rail, custody, support, operator, reconciliation, or governance evidence exists without resolution. | TBD | TBD | TBD | TBD | TBD |
| Delayed evidence arrival | Required evidence is delayed beyond a future approved review boundary. | TBD | TBD | TBD | TBD | TBD |
| Unverified finality | Settlement, completion, or finality is claimed without finality evidence. | TBD | TBD | TBD | TBD | TBD |
| Unverified custody transition | Custody transition is claimed without custody evidence. | TBD | TBD | TBD | TBD | TBD |
| Unverified rail event | Rail state is claimed without rail evidence. | TBD | TBD | TBD | TBD | TBD |
| Unverified fee / FX evidence | Quoted rate, final rate, fee, spread, estimate, or settled value lacks required evidence. | TBD | TBD | TBD | TBD | TBD |
| Unverified liquidity check | Liquidity check, buffer state, breach, pause, resume, stress, or kill evidence is missing. | TBD | TBD | TBD | TBD | TBD |
| Unauthorized support promise | Support language claims completion, finality, safety, recovery, availability, timing, or resolution without approved evidence. | TBD | TBD | TBD | TBD | TBD |
| Unauthorized user-facing claim | Product, support, Copilot, marketing, or governance-facing language implies authority or truth not supported by evidence. | TBD | TBD | TBD | TBD | TBD |
| Unlogged pause / resume decision | Pause or resume occurred or was claimed without required decision evidence. | TBD | TBD | TBD | TBD | TBD |
| Unlogged governance override | Override, exception, or governance escalation lacks required record evidence. | TBD | TBD | TBD | TBD | TBD |
| Unresolved audit gap | Evidence remains missing, contradictory, or unactionable after review. | TBD | TBD | TBD | TBD | TBD |

Audit exception examples are illustrative only. They do not define approved thresholds, live controls, or operational authority.

## 10. Post-pilot review input template

| Review area | Evidence needed | Question to answer | Possible blocker for authority widening |
| --- | --- | --- | --- |
| Participant eligibility | Eligibility, consent, limits, KYC / AML, sanctions / PEP, and approval evidence. | Were participants eligible under the future approved scope? | Missing, contradictory, or noncompliant participant evidence. |
| KYC / AML process | KYC / AML review, flag handling, escalation, and closure evidence. | Did financial-crime controls operate as approved? | Missing compliance evidence or unresolved flags. |
| Deposit evidence quality | Deposit request, rail, custody, failure, reversal, dispute, completion, and reconciliation evidence. | Could deposit states be reviewed without assumption? | Missing deposit evidence or unsupported completion claims. |
| Withdrawal evidence quality | Withdrawal request, approval, rail, custody, delay, block, failure, reversal, dispute, settlement, finality, and reconciliation evidence. | Could withdrawal states and finality be reviewed without assumption? | Missing withdrawal or finality evidence. |
| Custody evidence quality | Asset-control, custody-transition, provider-state, lockout, recovery, frozen-asset, failure, and dispute evidence. | Were custody claims supported by evidence? | Missing custody evidence or unresolved custody responsibility. |
| Rail evidence quality | Rail availability, event, failure, delay, duplicate, reversal, block, dispute, fee, limit, settlement, and vendor evidence. | Were rail claims and support states evidence-backed? | Missing rail or settlement evidence. |
| Stablecoin / conversion evidence quality | Acquisition, holding, transfer, redemption, conversion, FX, spread, fee, slippage, failure, and reversal evidence. | Were conversion and stablecoin states evidence-backed? | Missing conversion evidence or unresolved stablecoin boundary. |
| Fee / FX disclosure evidence | Quote, final rate, fee, spread, stale quote, rejected quote, estimate, settled value, and disclosure evidence. | Were fee / FX claims and user displays supported? | Hidden, missing, stale, or contradictory fee / FX evidence. |
| Liquidity evidence | Liquidity checks, buffer state, threshold breach, prioritization, pause, resume, stress, and kill evidence. | Were liquidity claims and controls reviewable? | Missing liquidity evidence or unresolved withdrawal solvency concerns. |
| Reconciliation exception handling | Mismatch, duplicate, exception, source-of-truth, closure, and reviewer evidence. | Were exceptions found, escalated, and closed under a governed process? | Unresolved or unauditable reconciliation exceptions. |
| Support case handling | Handoff, first response, escalation, permitted wording, user communication, and closure evidence. | Did support remain within evidence-backed authority? | Unsupported support promises or closure without evidence. |
| Dispute / complaint handling | Dispute classification, complaint receipt, communication, escalation, evidence bundle, and closure record. | Were disputes and complaints routed and closed appropriately? | Missing complaint evidence or unresolved disputes. |
| Incident response | Incident trigger, owner, communication, escalation, pause, resume, halt, and post-incident evidence. | Were incidents recognized and handled under governed controls? | Missing incident records or unresolved incident effects. |
| Pause / kill criteria use | Trigger, decision, authority owner, affected-flow, evidence, resume, and halt records. | Were pause, resume, halt, and kill decisions evidence-backed? | Unlogged or unsupported pause / kill decisions. |
| User-facing claim accuracy | UX, support, Copilot, marketing, and governance-facing claim evidence. | Did user-facing claims match evidence and authority? | Unsupported completion, safety, finality, or availability claims. |
| Copilot boundary adherence | Copilot interaction, handoff, advisory-boundary, support-proximity, and authority-drift evidence. | Did Copilot remain advisory and non-executing? | Copilot drift toward transaction, support, finality, or approval authority. |
| Governance override quality | Override request, rationale, approval, dissent, related evidence, and review record. | Were governance overrides bounded, recorded, and reviewable? | Missing override evidence or undocumented authority widening. |
| Operational workload | Manual review load, support load, exception volume, incident volume, and unresolved-state evidence. | Was workload compatible with the future approved operating model? | Unmanageable workload or hidden support / ops debt. |
| Residual unresolved issues | Open exceptions, missing evidence, unresolved disputes, post-incident issues, and post-pilot review gaps. | What remains unresolved before any authority widening? | Any unresolved issue material to customer-money, trust, legal, or operational safety. |

This template is for future review input only. It does not approve a pilot, post-pilot assessment, authority widening, or implementation sequencing.

## 11. Audit evidence prohibited assumptions

The repo must not assume:

- audit operations are approved
- evidence retention is approved
- data storage or access controls are approved
- a ledger source of truth exists
- audit records are accounting truth
- UI records are transaction truth
- support records are transaction truth
- reconciliation records are final by default
- rail evidence is final by default
- custody evidence is final by default
- stablecoin / conversion evidence is approved
- fee / FX evidence is final
- liquidity evidence proves withdrawal solvency
- incident records prove safe recovery
- post-pilot review is approved
- customer funds may move

## 12. Downstream dependency effect

- **Future ADRs:** must consider audit evidence, retention, access-control, source-of-truth, override, exception, and post-pilot review requirements where material.
- **Implementation-specific §7a brief:** must cite this checklist when any Class B flow depends on auditable evidence, receipts, logs, retention, support closure, reconciliation finality, or governance escalation.
- **Future frontend implementation:** must not claim completed, settled, available, recovered, reversed, reconciled, final, or safe states unless future authorized implementation has evidence mapped to this checklist.
- **Future backend / ledger implementation:** must not treat this checklist as schema approval, ledger approval, or audit-logging approval.
- **Future support implementation:** must not close support, dispute, complaint, or incident states without evidence compatible with this checklist.
- **Future implementation ticket:** must not rely on this checklist as audit approval, retention approval, operational readiness, or Class B readiness.

## 13. Open Audit Evidence questions for future review

- [ ] What Class B flow requires audit evidence?
- [ ] What event types must be evidenced?
- [ ] Who owns evidence capture?
- [ ] Who owns evidence review?
- [ ] Who owns evidence quality?
- [ ] What evidence proves participant eligibility?
- [ ] What evidence proves user request and confirmation?
- [ ] What evidence proves manual review?
- [ ] What evidence proves rail state?
- [ ] What evidence proves custody state?
- [ ] What evidence proves stablecoin / conversion state, if applicable?
- [ ] What evidence proves fee, FX, spread, or limit truth?
- [ ] What evidence proves liquidity state?
- [ ] What evidence proves reconciliation state?
- [ ] What evidence proves support or dispute closure?
- [ ] What evidence proves incident escalation, pause, resume, or halt decisions?
- [ ] What evidence proves governance override decisions?
- [ ] What evidence must be retained for post-pilot review?
- [ ] What retention and access-control rules apply?
- [ ] What must be true before audit evidence operations can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, audit evidence design, data retention review, vendor / partner evidence, and accepted ADRs where required.

## 14. Non-authorization statement

This checklist is non-authoritative and documentation-only. It does not approve, activate, or operationalize audit operations, retention policy, ledger truth, reconciliation operations, support operations, transaction processing, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B audit-evidence-related implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, data retention / access-control review, and operational evidence where applicable.
