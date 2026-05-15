# HEDGR - Class B Pilot Ops Runbook

## 1. Status / Authority / Scope

**Status:** Pilot ops runbook; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, and future operational evidence.

**Scope:** Defines operational-control requirements and unresolved operating questions for future Class B consideration.

**Mode:** Operating-model identification only; not pilot approval, live operations, or implementation approval.

This runbook does not approve, activate, or operationalize pilot operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This runbook exists to support the Class B governance spine by defining the operational control model that would be required before any future manual / limited Class B pilot may be considered.

It answers:

**What manual operating assumptions, owner roles, review flows, escalation paths, pause procedures, support handoffs, and evidence expectations must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Is Hedgr approved to operate a Class B pilot?**

It does not create:

- operating approval
- customer support approval
- reconciliation approval
- custody approval
- rail approval
- deposit approval
- withdrawal approval
- implementation authority
- customer-money authority
- Class B readiness

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify pilot operations requirements and unresolved operational questions only. They do not create operational approval, implementation authority, or execution approval.

## 4. Pilot ops principles

1. **Human control before pilot execution**

   Any future Class B pilot must define who reviews, approves, pauses, escalates, and resolves manual / limited flows before customer-money movement can be considered.

2. **No invisible operations**

   Any operational status that affects user money must be observable, logged, and supportable. Hidden manual actions must not become shadow product behavior.

3. **Evidence before action**

   No manual step should be considered operationally valid without required evidence, including custody state, rail state, settlement state, reconciliation state, and support context where relevant.

4. **Pause beats ambiguity**

   Where rail, custody, liquidity, compliance, reconciliation, or support evidence is unclear, the default future posture should be pause / escalate, not proceed by assumption.

5. **Support must match operational truth**

   Support messaging must not promise timing, reversal, completion, settlement, recovery, or protection beyond evidence and governance.

6. **Kill criteria must exist before exposure**

   Any future pilot must define halt, rollback, pause, no-new-deposit, withdrawal-priority, and escalation triggers before exposure widens.

7. **Ops does not create authority**

   An ops runbook can define controls and questions. It cannot authorize implementation, live operations, or customer fund movement.

## 5. Operational domains

| Domain | Operational requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Pilot ownership | Who owns the future pilot? Who owns daily operations? Who has authority to pause, escalate, reject, approve, or halt a flow? Who is accountable for evidence quality? | Manual / limited execution cannot operate without clear accountability. | No Class B pilot owner or operating owner is approved. | Pilot ownership matrix; approval authority map; escalation owner map; governance review. |
| Participant control | Who may participate? Internal testers, invited users, employees, SMEs, or external customers? What eligibility, KYC / AML, sanctions, residency, and transaction limits apply? | Participant scope affects legal exposure, support load, transaction risk, and operational controls. | Legal / compliance questions are framed; no pilot participant class is approved. | Eligibility policy; legal / compliance review; participant register requirements; exposure cap assumptions. |
| Manual review workflow | What steps require human review? What evidence is checked before approval? Who approves or rejects? What happens when evidence is incomplete? | Class B requires explicit human-in-the-loop controls. | No Class B manual review workflow is approved. | Manual review workflow; role responsibility matrix; evidence checklist; review logging requirements. |
| Deposit operations | How would a future deposit be reviewed, confirmed, rejected, delayed, escalated, reconciled, or resolved? What custody and rail evidence is required? | Deposit operations can imply custody activation, rail approval, conversion, or ledger truth if not bounded. | Deposits remain future Class B / C capabilities only when authorized. | Deposit path map; rail classification row; custody transition map; reconciliation SOP; support escalation matrix. |
| Withdrawal operations | How would a future withdrawal be reviewed, approved, paused, blocked, delayed, failed, escalated, reconciled, or completed? What liquidity and finality evidence is required? | Withdrawal integrity is mission-critical and must be operationally controlled. | Withdrawal control questions are framed; no withdrawal operations are approved. | Withdrawal control matrix; liquidity / withdrawal control evidence; settlement / finality evidence; kill criteria; support / dispute path. |
| Custody operations | Who verifies custody state? Who can initiate or approve asset movement? How are custody failures, lockouts, provider outages, recovery issues, or disputes handled? | Custody responsibility shapes support, legal exposure, user trust, and reconciliation. | Custody boundary questions are framed; no custody model is approved. | Custody responsibility matrix; provider evidence; failure-mode register; legal / compliance review. |
| Rail operations | How are rail events initiated, confirmed, delayed, failed, reversed, disputed, reconciled, and escalated? Who owns rail-provider communication? | Rail operations determine settlement truth, fees, limits, timing, and user-facing status. | Rails are classification-only; no rail is approved. | Rail responsibility matrix; vendor / partner evidence; settlement / finality map; reconciliation SOP; support escalation path. |
| Liquidity and treasury controls | Who monitors liquidity? What reserve or buffer logic applies? What triggers pause, halt, or withdrawal prioritization? What treasury actions are manual, blocked, or out of scope? | Liquidity is sacred; withdrawal fragility must not be hidden behind manual workarounds. | Liquidity / withdrawal questions are framed; no liquidity buffer or treasury operation is approved. | Liquidity buffer policy; treasury control assumptions; stress / pause procedure; kill criteria; ADR if material. |
| Reconciliation operations | What records are reconciled? How often? By whom? What happens with mismatches, duplicates, ambiguous states, delayed events, or missing evidence? | Customer-money operations require traceable reconciliation discipline. | Reconciliation visibility exists as read-only baseline; no Class B reconciliation SOP exists. | Reconciliation SOP; audit evidence checklist; exception handling process; data retention review. |
| Support and dispute operations | How are support cases opened, triaged, escalated, updated, resolved, or closed? What may support say? What cannot support promise? | Support is a trust surface and cannot compensate for missing operational truth. | Trust UX constraints are framed; no Class B support operations are approved. | Support escalation matrix; dispute handling process; incident communication policy; Trust UX review. |
| Incident response and pause controls | What incidents require pausing a pilot? Who can pause? Who can resume? What must be communicated and logged? | Class B pilot exposure must remain reversible and governable. | Kill criteria are framed conceptually; no active incident process is approved. | Incident response process; pause / resume authority matrix; kill-criteria thresholds; communication templates. |
| Audit and evidence retention | What evidence must be captured for every reviewed action? Where is it stored? Who has access? How long is it retained? What is needed for post-pilot review? | Pilot activity must be reviewable before authority can widen. | No Class B audit evidence checklist or retention process is approved. | Audit evidence checklist; retention requirements; access-control review; legal / compliance review. |

## 6. Role and responsibility matrix template

| Role | Responsibility | Authority allowed? | Authority prohibited? | Evidence owned | Escalation path |
|---|---|---|---|---|---|
| Pilot owner | | | | | |
| Ops reviewer | | | | | |
| Compliance reviewer | | | | | |
| Custody reviewer | | | | | |
| Rail / vendor contact | | | | | |
| Liquidity monitor | | | | | |
| Treasury reviewer | | | | | |
| Reconciliation owner | | | | | |
| Support lead | | | | | |
| Incident lead | | | | | |
| Founder / governance approver | | | | | |
| Technical operator | | | | | |
| Copilot / support-content reviewer | | | | | |

This matrix is a template only. It does not assign active operational authority or approve any pilot role.

## 7. Manual review flow template

| Step | Trigger | Reviewer | Evidence required | Possible outcomes | Escalation / pause condition |
|---|---|---|---|---|---|
| Pilot participant check | | | | | |
| KYC / AML evidence check | | | | | |
| Deposit initiation review | | | | | |
| Deposit pending review | | | | | |
| Deposit failure review | | | | | |
| Custody-state check | | | | | |
| Rail-state check | | | | | |
| Conversion / stablecoin-state check | | | | | |
| Withdrawal initiation review | | | | | |
| Withdrawal pending review | | | | | |
| Liquidity check | | | | | |
| Settlement / finality check | | | | | |
| Reconciliation mismatch review | | | | | |
| Support case review | | | | | |
| Incident / pause review | | | | | |
| Post-pilot evidence review | | | | | |

This flow is a template only. It does not approve manual operations, customer-money movement, or transaction processing.

## 8. Pause / escalation / kill-control template

| Trigger | Severity | Required action | Authority owner | User communication required? | Evidence required | Resume condition |
|---|---|---|---|---|---|---|
| Missing KYC / AML evidence | | | | | | |
| Compliance hold | | | | | | |
| Rail outage | | | | | | |
| Custody provider outage | | | | | | |
| Liquidity buffer breach | | | | | | |
| Withdrawal delay beyond approved window | | | | | | |
| Reconciliation mismatch | | | | | | |
| Duplicate deposit | | | | | | |
| Duplicate withdrawal | | | | | | |
| Failed withdrawal | | | | | | |
| Unresolved customer-money state | | | | | | |
| Stablecoin instability | | | | | | |
| FX quote unavailable | | | | | | |
| Vendor / partner communication failure | | | | | | |
| Support backlog threshold breach | | | | | | |
| Suspicious activity flag | | | | | | |
| Unauthorized UI / claim drift | | | | | | |
| Copilot proximity drift | | | | | | |

Trigger examples are illustrative only. They do not define approved thresholds, live controls, or operational authority.

## 9. Evidence checklist template

| Event / control area | Evidence required | Source of evidence | Owner | Retention / audit note | Status |
|---|---|---|---|---|---|
| Participant eligibility | | | | | Not assessed |
| KYC / AML review | | | | | Not assessed |
| Deposit request | | | | | Not assessed |
| Deposit rail event | | | | | Not assessed |
| Deposit custody transition | | | | | Not assessed |
| Deposit failure | | | | | Not assessed |
| Withdrawal request | | | | | Not assessed |
| Withdrawal approval | | | | | Not assessed |
| Withdrawal rail event | | | | | Not assessed |
| Withdrawal custody transition | | | | | Not assessed |
| Withdrawal finality | | | | | Not assessed |
| Withdrawal failure | | | | | Not assessed |
| Liquidity check | | | | | Not assessed |
| Pause decision | | | | | Not assessed |
| Resume decision | | | | | Not assessed |
| Support case | | | | | Not assessed |
| Dispute case | | | | | Not assessed |
| Reconciliation batch | | | | | Not assessed |
| Incident review | | | | | Not assessed |
| Post-pilot review | | | | | Not assessed |

This checklist defines evidence shape only. It is not evidence that operations are approved or ready.

## 10. Support handoff constraints

Support handoffs for future Class B-adjacent operations must include:

- user-visible state
- internal state
- evidence checked
- evidence missing
- current blocker
- next review owner
- permitted user-facing wording
- prohibited promises
- escalation path
- expected update channel, if approved

Support handoffs must not include:

- unsupported settlement claims
- unsupported custody claims
- guaranteed timing
- guaranteed reversal
- guaranteed recovery
- claims that Hedgr can override vendors, rails, custody providers, banks, chains, or compliance holds unless approved
- informal operator assumptions treated as truth

Support handoff discipline must align with the Class B Trust UX Pack. Support language must not become hidden product authority.

## 11. Operational prohibited assumptions

The repo must not assume:

- a Class B pilot is approved
- pilot operations are active
- any operator has transaction authority
- deposits can be processed
- withdrawals can be processed
- liquidity buffers exist
- treasury operations are authorized
- a custody model is approved
- any rail is approved
- any vendor or partner is selected
- reconciliation operations exist
- support operations are ready
- evidence retention is approved
- manual review can substitute for legal / compliance approval
- manual review can substitute for ADR acceptance
- customer funds may move

## 12. Downstream dependency effect

- **Reconciliation SOP:** must align with review owners, evidence sources, exception handling, and mismatch escalation defined by future ops review.
- **Support escalation matrix:** must inherit support handoff constraints, escalation paths, prohibited promises, and incident ownership.
- **Audit evidence checklist:** must formalize event-level evidence required by manual review, pause, support, reconciliation, and post-pilot review.
- **Future ADRs:** must consider operational authority, manual-control roles, reversibility, kill criteria, and evidence requirements where material.
- **Implementation-specific §7a brief:** must cite this runbook when any Class B operational workflow is proposed.
- **Future implementation ticket:** must not rely on this runbook as pilot approval or operational readiness.

## 13. Open Pilot Ops questions for future review

- [ ] What exact Class B pilot flow is being considered?
- [ ] Who is the pilot owner?
- [ ] Who owns daily operations?
- [ ] Who can approve, reject, pause, resume, or halt a flow?
- [ ] Who may participate in the pilot?
- [ ] What eligibility, KYC / AML, sanctions, residency, and transaction limits apply?
- [ ] What custody boundary applies?
- [ ] What rail classification applies?
- [ ] What liquidity / withdrawal controls apply?
- [ ] What manual review steps exist?
- [ ] What evidence is required before approval?
- [ ] What happens when evidence is missing or contradictory?
- [ ] What reconciliation process exists?
- [ ] What support process exists?
- [ ] What dispute process exists?
- [ ] What pause / kill criteria exist?
- [ ] What audit evidence must be retained?
- [ ] What must be true before pilot operations can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, operational design, reconciliation design, support design, vendor / partner evidence, and accepted ADRs where required.

## 14. Non-authorization statement

This runbook is non-authoritative and documentation-only. It does not approve, activate, or operationalize pilot operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B operational implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, reconciliation review, support review, and operational evidence where applicable.
