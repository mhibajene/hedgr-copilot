# HEDGR - Class B Support / Dispute Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001` through `EVID-B-015`, future qualified legal / compliance review, and future operational / vendor evidence where applicable.

**Scope:** Defines required support / dispute evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, support approval, dispute approval, complaint approval, incident approval, support-closure approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve support operations, dispute operations, complaint handling, incident handling, support scripts, support closure, transaction outcomes, deposit outcomes, withdrawal outcomes, custody outcomes, rail outcomes, settlement outcomes, reconciliation closure, customer-facing promises, Copilot support authority, external engagement, Class B execution, implementation, staging, live operations, Copilot execution, or customer fund movement.

This package does not provide legal advice or claim regulatory approval.

## 2. Purpose

This package exists to instantiate the Support / Dispute evidence package from the evidence gathering plan and registry.

It answers:

**What support / dispute evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Is Hedgr approved to support live customer-money activity, resolve disputes, close money-related cases, or make customer-facing promises?**

It does not create:

- support approval
- dispute approval
- complaint approval
- incident approval
- support-script approval
- support-closure approval
- transaction-outcome approval
- customer-communication approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RECONCILIATION_EVIDENCE_PACKAGE.md`
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
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
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

Source inputs are used to define support / dispute evidence requirements only. They do not create support approval, dispute approval, case closure approval, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Support / dispute evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | Support / incident evidence; operational dry-run evidence; reconciliation evidence; audit evidence; Trust UX evidence; external legal / compliance review where applicable; vendor / provider evidence where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No legal / compliance review; no jurisdiction selected; no customer eligibility policy; no KYC / AML owner; no custody model selected; no rail selected or approved; no settlement / finality evidence; no stablecoin / conversion evidence; no fee / FX / spread evidence; no liquidity / withdrawal control evidence; no Trust UX approval; no Pilot Ops owner; no reconciliation process; no support / dispute handling evidence; no complaint handling evidence; no incident routing evidence; no audit / retention policy; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future support / dispute assessment; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, support-ready, dispute-ready, complaint-ready, incident-ready, closure-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Support ownership evidence | Who would own future Class B support? | Support / incident evidence; operational dry-run evidence; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No support owner | No active owner is assigned. |
| Support triage owner evidence | Who triages support cases and assigns first response? | Support / incident evidence; operational dry-run evidence | Question framed / Missing | Review date required before downstream use | No support triage owner | No triage workflow is approved. |
| Support escalation owner evidence | Who owns escalation when evidence is missing, conflicting, stale, or sensitive? | Support / incident evidence; Pilot Ops evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No support escalation owner | Escalation authority is not assigned. |
| Support closure owner evidence | Who may review closure evidence before any support case closes? | Support / incident evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No support closure dependency evidence | No closure owner is approved. |
| Dispute owner evidence | Who owns dispute review? | Support / incident evidence; external legal / compliance review where applicable | Question framed / Missing | Dated review required before downstream use | No dispute classification evidence | No dispute process is approved. |
| Complaint owner evidence | Who owns complaint review and evidence retention? | Support / incident evidence; external legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No complaint handling evidence | No complaint process is approved. |
| Incident routing owner evidence | Who routes support cases into incident review? | Support / incident evidence; audit evidence; Pilot Ops evidence | Question framed / Missing | Review date required before downstream use | No incident routing evidence | No incident process is approved. |
| Copilot-to-support handoff evidence | When should Copilot hand off and what may it summarize? | Trust UX review; Support / incident evidence; Copilot governance evidence | Question framed / Missing | Review date required before downstream use | No Copilot handoff evidence | Copilot is not support authority. |
| Support handoff evidence | What user-visible and internal state may be handed to support? | Support / incident evidence; Trust UX review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No support handoff evidence | No handoff model is approved. |
| User-visible state dependency evidence | What visible state may support reference without creating transaction truth? | Trust UX review; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No Trust UX approval | UI state is not ledger, custody, rail, or finality truth. |
| Internal operational state dependency evidence | What internal state may support rely on? | Operational dry-run evidence; Pilot Ops evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No Pilot Ops owner | Internal state is not support closure authority. |
| Reconciliation-state dependency evidence | What reconciliation evidence is required before support may describe status or closure? | Reconciliation evidence; audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No reconciliation process | Reconciliation state is required before closure claims. |
| Audit receipt dependency evidence | What audit receipt is required for support handoff, escalation, dispute, complaint, incident, or closure? | Audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No audit / retention policy | Audit receipt is not correctness or finality. |
| Custody-state support evidence | What custody evidence may support reference and what must remain under review? | Custody evidence; vendor / provider documentation; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No custody model selected | No custody claim is approved. |
| Rail-state support evidence | What rail state may support describe, if any? | Rail evidence; vendor / provider documentation or confirmation; settlement / finality evidence | Question framed / Missing | Review date required before downstream use | No rail selected or approved | No rail claim is approved. |
| Settlement / finality support evidence | What proves finality before support may use finality or completion wording? | Settlement / finality evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No finality wording is approved. |
| Stablecoin / conversion support evidence | What evidence constrains conversion, redemption, transfer, stablecoin, or provider wording? | Stablecoin / conversion evidence; custody evidence; rail evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No conversion support process is approved. |
| Fee / FX / spread support evidence | What evidence constrains fee, FX, spread, quote, rate, and final-value support responses? | Fee / FX / spread evidence; settlement / finality evidence; Trust UX review | Question framed / Missing | Review date required before downstream use | No fee / FX / spread evidence | No pricing support claim is approved. |
| Liquidity / withdrawal support evidence | What evidence constrains liquidity, withdrawal availability, delay, pause, or completion support responses? | Liquidity / withdrawal evidence; custody evidence; rail evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No liquidity / withdrawal control evidence | No withdrawal support process is approved. |
| KYC / AML support evidence | What support may say about KYC / AML, sanctions, PEP, monitoring, and eligibility states? | KYC / AML evidence; external legal / compliance review; audit evidence | Question framed / Missing | Dated qualified review required before downstream use | No KYC / AML owner | No compliance support disclosure is approved. |
| Compliance hold support evidence | What evidence and review owner constrain support wording for holds or blocked states? | External legal / compliance review; support / incident evidence; audit evidence | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No hold process or wording is approved. |
| Deposit support evidence | What evidence is required before support may describe a deposit state? | Rail evidence; custody evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No deposit support evidence | No deposit support process is approved. |
| Withdrawal support evidence | What evidence is required before support may describe a withdrawal state? | Liquidity / withdrawal evidence; custody evidence; rail evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No withdrawal support evidence | No withdrawal support process is approved. |
| Failed-state support evidence | What evidence proves failure and permitted support posture? | Rail evidence; custody evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No failed-state support evidence | No failure closure is approved. |
| Delayed-state support evidence | What evidence proves delay, owner, and next review trigger? | Settlement / finality evidence; support / incident evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No delayed-state support evidence | No delay SLA is approved. |
| Reversed-state support evidence | What evidence proves reversal and before / after state? | Rail evidence; custody evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No reversed-state support evidence | No reversal claim is approved. |
| Disputed-state support evidence | What evidence links dispute, event state, support record, and legal / compliance review? | Support / incident evidence; reconciliation evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No dispute classification evidence | No dispute closure is approved. |
| Duplicate-event support evidence | What evidence identifies duplicate support, rail, custody, request, or audit events? | Reconciliation evidence; audit evidence; operational dry-run evidence | Question framed / Missing | Review date required before downstream use | No duplicate-event support evidence | No duplicate resolution is approved. |
| Unresolved-state support evidence | What evidence keeps customer-money state unresolved instead of forced closed? | Support / incident evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No unresolved-state support evidence | Unresolved state must remain visible. |
| Complaint classification evidence | When does a case become a complaint? | Support / incident evidence; external legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No complaint handling evidence | No complaint classification is approved. |
| Formal dispute classification evidence | When does a case become a formal dispute? | Support / incident evidence; external legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No dispute classification evidence | No dispute classification is approved. |
| Incident classification evidence | When does a case become incident review or governance escalation? | Support / incident evidence; audit evidence; Pilot Ops evidence | Question framed / Missing | Review date required before downstream use | No incident routing evidence | No incident classification is approved. |
| Prohibited promise evidence | Which claims must support, Copilot, and operators avoid unless evidence exists? | Trust UX review; external legal / compliance review; support / incident evidence | Question framed / Missing | Dated review required before downstream use | No prohibited promise review | No replacement wording is approved. |
| Permitted wording dependency evidence | What evidence and review is required before any support wording can be permitted? | Trust UX review; external legal / compliance review; support / incident evidence | Question framed / Missing | Dated review required before downstream use | No permitted wording evidence | No customer-facing support wording is approved. |
| Support closure dependency evidence | What reconciliation, audit, legal / compliance, and owner review is required before closure? | Support / incident evidence; reconciliation evidence; audit evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No support closure dependency evidence | No support closure rule is approved. |
| Support backlog threshold evidence | What backlog threshold triggers escalation, pause, or governance review? | Support / incident evidence; operational dry-run evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No support backlog threshold evidence | No SLA or threshold is approved. |
| Vendor / provider escalation evidence | When is vendor escalation required and what evidence must be retained? | Vendor / provider documentation; vendor / provider confirmation; support / incident evidence | Question framed / Missing | Review date required before downstream use | No vendor / provider escalation evidence | Vendor claim is insufficient by itself. |
| User communication evidence | What support response, update, and notice evidence must be retained? | Support / incident evidence; Trust UX review; audit evidence | Question framed / Missing | Review date required before downstream use | No user communication evidence | No customer communication template is approved. |
| Evidence retention requirements | What support, dispute, complaint, incident, closure, and communication records require retention review? | Audit evidence; external legal / compliance review; support / incident evidence | Question framed / Missing | Dated review required before downstream use | No audit / retention policy | No retention policy is approved. |
| Legal / compliance review requirements | Which support, dispute, complaint, customer-money, legal response, and communications risks require qualified review? | External legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No legal conclusion is provided. |
| ADR dependency for support / dispute boundary | Which support / dispute / complaint / incident / Copilot handoff boundaries require accepted ADRs? | Accepted ADR; ADR drafting readiness evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No accepted support / dispute ADR | No ADR is drafted or accepted. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, support-ready, dispute-ready, complaint-ready, incident-ready, closure-ready, or Class B ready.

## 6. Open Support / Dispute questions

Answers must come from future governed review, support evidence, reconciliation evidence, audit evidence, Trust UX evidence, legal / compliance review, vendor / provider evidence, and accepted ADRs where required, not this package.

### Support ownership and routing

- [ ] Who would own support for a future Class B pilot?
- [ ] Who triages support cases?
- [ ] Who owns escalation?
- [ ] Who owns closure?
- [ ] Who owns unresolved cases?
- [ ] Which support actions are explicitly prohibited without reconciliation, legal / compliance, or governance review?

### Support handoff

- [ ] What user-visible state is handed to support?
- [ ] What internal state is handed to support?
- [ ] What evidence has been checked?
- [ ] What evidence is missing?
- [ ] What wording is permitted?
- [ ] What wording is prohibited?
- [ ] What case states require escalation rather than reassurance?

### Disputes and complaints

- [ ] When does a support case become a dispute?
- [ ] When does a support case become a formal complaint?
- [ ] Who owns dispute review?
- [ ] Who owns complaint review?
- [ ] What legal / compliance review is required?
- [ ] What evidence must be retained?

### Transaction-adjacent support states

- [ ] How are deposit, withdrawal, custody, rail, settlement, stablecoin, conversion, fee / FX, liquidity, support, and reconciliation states represented to support?
- [ ] What evidence is required before support may describe a case as resolved?
- [ ] What states must remain pending, under review, escalated, disputed, or unresolved?

### Support closure dependency

- [ ] What reconciliation evidence is required before support closure?
- [ ] What audit evidence is required before support closure?
- [ ] What closure wording is allowed?
- [ ] What closure wording is prohibited?
- [ ] What states must support never close without governance escalation?

### Incident routing

- [ ] Which support cases escalate to incidents?
- [ ] Which support cases trigger pause, halt, or kill criteria review?
- [ ] Who owns incident communication?
- [ ] What evidence must be logged?
- [ ] What may users be told during incident review?

### Prohibited promises

- [ ] What promises are always prohibited unless accepted evidence exists?
- [ ] What may support say about safety, protection, recovery, reversal, completion, settlement, finality, custody, withdrawals, fees, and timing?
- [ ] What must support avoid saying when evidence is missing, stale, conflicting, or ambiguous?

### Copilot-to-support handoff

- [ ] When should Copilot hand off to support?
- [ ] What may Copilot summarize?
- [ ] What must Copilot avoid saying?
- [ ] How do support evidence and Copilot proximity constraints interact?
- [ ] What prevents Copilot from becoming accidental support authority?

### Vendor / provider escalation

- [ ] When is vendor escalation required?
- [ ] Who contacts the vendor?
- [ ] What vendor evidence is required before updating support state?
- [ ] What vendor claim is insufficient by itself?
- [ ] What support wording is allowed while vendor evidence is pending?

## 7. Support ownership template

| Role | Responsibility to define | Evidence required | Authority allowed? | Authority prohibited? | Status |
|---|---|---|---|---|---|
| Support owner | Overall support ownership and limits. | Support ownership evidence; governance review. | None active; future review may define bounded responsibility. | Support approval, closure authority, customer-money authority. | Question framed / Missing |
| First-response owner | First response, intake completeness, and routing. | Support triage evidence; audit receipt. | None active; future review may define response responsibility. | Outcome promises, transaction truth, closure authority. | Question framed / Missing |
| Escalation owner | Escalation to reconciliation, custody, rail, compliance, incident, or governance review. | Escalation owner evidence; support / incident evidence. | None active; future review may define escalation duty. | Live incident authority, pause authority, support scripts. | Question framed / Missing |
| Dispute owner | Dispute classification, evidence bundle, and review routing. | Dispute classification evidence; legal / compliance review. | None active; future review may define dispute review. | Dispute closure, legal resolution, customer-money outcome. | Question framed / Missing |
| Complaint owner | Complaint classification, retention, review, and response constraints. | Complaint classification evidence; qualified review. | None active; future review may define complaint review. | Complaint closure, legal response timeline, customer promise. | Question framed / Missing |
| Incident owner | Incident classification, communication constraints, and escalation. | Incident routing evidence; audit evidence. | None active; future review may define routing. | Incident handling approval, pause controls, live authority. | Question framed / Missing |
| Reconciliation reviewer | Reconciliation dependency review before support status or closure. | Reconciliation evidence; audit receipt. | None active; future review may define review responsibility. | Ledger truth, reconciliation closure, accounting truth. | Question framed / Missing |
| Audit evidence owner | Evidence preservation and receipt review. | Audit evidence; retention review. | None active; future review may define evidence custody. | Retention policy approval, audit operation approval. | Question framed / Missing |
| Legal / compliance reviewer | Qualified review of support, dispute, complaint, claims, and response risk. | Dated qualified review. | None active; future qualified review may inform governance. | Automatic implementation approval, customer-money authority. | Question framed / Missing |
| Vendor / provider contact | Provider escalation path and evidence preservation. | Vendor / provider documentation or confirmation. | None active; future review may define contact responsibility. | Vendor permission, provider override, live escalation authority. | Question framed / Missing |
| Copilot handoff reviewer | Copilot handoff constraints and proximity boundaries. | Trust UX review; Copilot governance evidence; support evidence. | None active; future review may define handoff constraints. | Copilot support authority, transaction authority, finality authority. | Question framed / Missing |
| Founder / governance approver | Future governance acceptance path. | Repo-native governance record; accepted ADR where required. | None active; future governance may name a ticket. | Silent approval, memory-led approval, customer-money movement. | Question framed / Missing |

This template does not assign active support roles, approve support authority, approve dispute handling, approve incident handling, or authorize customer-money movement.

## 8. Support case lifecycle template

| Case lifecycle state | Requirement to define | Evidence required | Owner placeholder | User-facing constraint | Status |
|---|---|---|---|---|---|
| Case received | Intake evidence and scope. | Support intake record; audit receipt. | TBD by future governed review | Must not imply review or resolution. | Question framed / Missing |
| Awaiting evidence | Missing evidence and owner. | Missing-evidence record; next review trigger. | TBD by future governed review | Must not reassure beyond evidence. | Question framed / Missing |
| Under review | Review owner and evidence set. | Support / incident evidence; reconciliation or legal review where applicable. | TBD by future governed review | Must not imply outcome. | Question framed / Missing |
| Escalated to reconciliation | Reconciliation dependency and evidence bundle. | Reconciliation evidence; audit receipt. | TBD by future governed review | Must not close before reconciliation evidence. | Question framed / Missing |
| Escalated to custody review | Custody evidence gap and provider dependency. | Custody evidence; vendor / provider evidence. | TBD by future governed review | Must not claim custody truth. | Question framed / Missing |
| Escalated to rail / vendor review | Rail or vendor evidence gap. | Rail evidence; vendor / provider confirmation. | TBD by future governed review | Must not claim vendor confirmed it unless retained evidence exists. | Question framed / Missing |
| Escalated to compliance review | Legal / compliance question and disclosure limits. | External legal / compliance review; audit receipt. | TBD by future governed review | Must not disclose or promise beyond qualified review. | Question framed / Missing |
| Escalated to incident review | Incident trigger and owner. | Incident routing evidence; audit evidence. | TBD by future governed review | Must not describe recovery, safety, or resolution. | Question framed / Missing |
| Pending user information | Required user evidence and limits. | User request or information record; privacy review where applicable. | TBD by future governed review | Must not imply user fault before review. | Question framed / Missing |
| Pending operational decision | Pending owner and decision evidence. | Pilot Ops evidence; governance evidence. | TBD by future governed review | Must not imply approval or processing. | Question framed / Missing |
| Dispute opened | Dispute classification and evidence bundle. | Dispute evidence; legal / compliance review where applicable. | TBD by future governed review | Must not imply dispute outcome. | Question framed / Missing |
| Complaint opened | Complaint classification and retention need. | Complaint evidence; qualified legal / compliance review. | TBD by future governed review | Must not imply legal response or closure. | Question framed / Missing |
| Correction / reversal pending | Correction or reversal evidence requirement. | Reconciliation evidence; settlement / finality evidence; audit receipt. | TBD by future governed review | Must not guarantee correction or reversal. | Question framed / Missing |
| Resolved after evidence review | Resolution standard and evidence review. | Reconciliation evidence; audit evidence; legal / compliance review where applicable. | TBD by future governed review | Must not use unless accepted evidence supports it. | Question framed / Missing |
| Closed after evidence review | Closure dependency and retained record. | Support closure evidence; reconciliation evidence; audit receipt. | TBD by future governed review | Must not close without defined evidence. | Question framed / Missing |
| Reopened | Reopen trigger and prior evidence conflict. | New evidence; conflict record; audit receipt. | TBD by future governed review | Must not imply prior closure was safe. | Question framed / Missing |
| Unresolved | Unresolved blocker and next review trigger. | Unresolved-state evidence; owner record. | TBD by future governed review | Must keep ambiguity visible. | Question framed / Missing |

This template does not approve support workflows, support closure, transaction outcomes, dispute outcomes, complaint outcomes, or customer-money authority.

## 9. Dispute / complaint classification template

| Classification area | Requirement to define | Evidence required | Required review owner | Closure dependency | Status |
|---|---|---|---|---|---|
| General support request | Support-only scope and evidence needs. | Support intake; audit receipt. | TBD by future governed review | Evidence review and owner signoff. | Question framed / Missing |
| Incorrect status report | Visible or support state conflict. | Trust UX evidence; reconciliation evidence; audit receipt. | TBD by future governed review | Corrected evidence and communication review. | Question framed / Missing |
| Deposit dispute | Deposit-state disagreement or missing evidence. | Rail, custody, reconciliation, support, and audit evidence. | TBD by future governed review | Reconciliation and legal / compliance review where required. | Question framed / Missing |
| Withdrawal dispute | Withdrawal-state disagreement or missing finality. | Liquidity / withdrawal, custody, rail, finality, support, and audit evidence. | TBD by future governed review | Reconciliation and finality review. | Question framed / Missing |
| Custody dispute | Custody claim, provider state, access, recovery, or lockout issue. | Custody evidence; vendor / provider evidence; qualified review where applicable. | TBD by future governed review | Custody and legal / compliance review. | Question framed / Missing |
| Rail dispute | Rail event, failure, reversal, delay, or vendor conflict. | Rail evidence; vendor / provider evidence; settlement evidence. | TBD by future governed review | Vendor and reconciliation evidence. | Question framed / Missing |
| Settlement / finality dispute | Finality, completion, reversal, or settlement conflict. | Settlement / finality evidence; reconciliation evidence; audit receipt. | TBD by future governed review | Finality evidence and qualified review where required. | Question framed / Missing |
| Stablecoin / conversion dispute | Conversion, redemption, transfer, stablecoin, or provider-state conflict. | Stablecoin / conversion evidence; custody and rail evidence. | TBD by future governed review | Provider and reconciliation evidence. | Question framed / Missing |
| Fee / FX / spread dispute | Quote, rate, fee, spread, stale quote, or final value conflict. | Fee / FX / spread evidence; Trust UX review; settlement evidence. | TBD by future governed review | Pricing evidence and legal / compliance review where required. | Question framed / Missing |
| Liquidity / withdrawal availability dispute | Withdrawal access, buffer, pause, stress, or availability conflict. | Liquidity / withdrawal evidence; audit evidence. | TBD by future governed review | Liquidity review and governance escalation where required. | Question framed / Missing |
| Compliance hold complaint | Hold, blocked state, eligibility, or KYC / AML concern. | External legal / compliance review; KYC / AML evidence; audit record. | TBD by future governed review | Qualified review and retained communication evidence. | Question framed / Missing |
| Support communication complaint | Claim, tone, promise, omission, or prohibited wording issue. | Support communication evidence; Trust UX review; audit receipt. | TBD by future governed review | Communication review and legal / compliance review where required. | Question framed / Missing |
| Formal complaint | Formal complaint criteria and required response path. | Complaint evidence; qualified legal / compliance review. | TBD by future governed review | Qualified review and retained complaint bundle. | Question framed / Missing |
| Incident-linked complaint | Complaint associated with incident or governance escalation. | Incident evidence; support evidence; audit evidence. | TBD by future governed review | Incident review and governance review. | Question framed / Missing |
| Unresolved customer-money complaint | Complaint involving unresolved customer-money state. | Reconciliation evidence; audit evidence; legal / compliance review where applicable. | TBD by future governed review | Evidence must remain unresolved until reviewed. | Question framed / Missing |

This template does not approve dispute handling, complaint handling, legal response timelines, support closure, or customer-money outcomes.

## 10. Support-to-reconciliation dependency template

| Support case area | Reconciliation evidence required | Audit evidence required | What support may need to know | What support must not close without | Status |
|---|---|---|---|---|---|
| Deposit pending | Deposit request, rail state, custody transition, and match status. | Support case receipt and event evidence. | Current known pending evidence and missing evidence. | Reconciled deposit evidence and closure owner review. | Question framed / Missing |
| Deposit failed | Failure source, reversal state, custody impact, and mismatch review. | Failure evidence and support communication record. | Failure evidence status and next review trigger. | Failure evidence, reconciliation review, and audit receipt. | Question framed / Missing |
| Deposit duplicate | Duplicate request, rail, custody, support, or audit signal. | Duplicate evidence and reviewer trail. | Duplicate status is under review. | Duplicate review and governance escalation where required. | Question framed / Missing |
| Deposit unresolved | Missing or conflicting deposit evidence. | Unresolved-state record and owner. | What is known, unknown, and escalated. | Reconciliation evidence and unresolved-state review. | Question framed / Missing |
| Withdrawal pending | Request, custody, liquidity, rail, and finality evidence. | Withdrawal request and review trail. | Current review state and missing evidence. | Reconciliation and finality evidence. | Question framed / Missing |
| Withdrawal delayed | Delay class, owner, and next review trigger. | Delay record and support update receipt. | Delay evidence is pending. | Delay review, finality evidence, and owner review. | Question framed / Missing |
| Withdrawal failed | Failure source, custody state, rail state, and reversal review. | Failure and support communication evidence. | Failure evidence status. | Reconciliation, finality, and audit evidence. | Question framed / Missing |
| Withdrawal disputed | Dispute bundle, rail / custody / finality conflict, and legal dependency. | Dispute receipt and reviewer trail. | Dispute is under review. | Dispute review, reconciliation evidence, and qualified review where required. | Question framed / Missing |
| Custody state unclear | Custody provider evidence and source-of-truth review. | Custody evidence receipt and support case link. | Custody evidence is under review. | Custody evidence and reconciliation review. | Question framed / Missing |
| Rail state unclear | Rail event evidence and vendor / provider confirmation where applicable. | Rail evidence receipt and escalation record. | Rail evidence is pending or conflicting. | Rail evidence and settlement / finality review. | Question framed / Missing |
| Settlement / finality missing | Finality marker, settlement evidence, and matched review. | Finality evidence receipt or missing-evidence record. | Finality cannot be confirmed. | Settlement / finality evidence. | Question framed / Missing |
| Stablecoin / conversion failed | Conversion, transfer, redemption, custody, and provider evidence. | Conversion event and support case receipt. | Conversion evidence is under review. | Provider, custody, and reconciliation evidence. | Question framed / Missing |
| Fee / FX / spread disputed | Quote, expiry, fee, spread, and final-value match. | Pricing evidence and communication record. | Pricing evidence status and missing evidence. | Fee / FX / spread evidence and review. | Question framed / Missing |
| Liquidity constrained | Liquidity evidence, withdrawal control state, and pause / escalation dependency. | Liquidity review and support update receipt. | Constraint is under review. | Liquidity / withdrawal evidence and governance review if required. | Question framed / Missing |
| Compliance hold | Hold evidence, KYC / AML state, and qualified review. | Hold record and permitted communication evidence. | Only permitted hold status after review. | Qualified legal / compliance review and audit evidence. | Question framed / Missing |
| Unresolved customer-money state | Evidence gap, conflict, owner, and escalation route. | Unresolved-state audit receipt. | Known / unknown / escalated status. | Reconciliation, audit, and governance review. | Question framed / Missing |

This template does not approve support closure, reconciliation closure, transaction outcomes, customer-facing wording, or operational authority.

## 11. Incident escalation template

| Trigger | Route as support / dispute / complaint / incident / governance escalation | Evidence required | Authority owner placeholder | User communication constraint | Status |
|---|---|---|---|---|---|
| Unresolved customer-money state | Governance escalation or incident review if threshold later defined. | Support, reconciliation, and audit evidence. | TBD by future governed review | Must not imply resolution, safety, or finality. | Question framed / Missing |
| Missing custody evidence | Support escalation to custody review. | Custody evidence gap; provider dependency. | TBD by future governed review | Must not claim custody state or protection. | Question framed / Missing |
| Missing rail evidence | Support escalation to rail / vendor review. | Rail evidence gap; vendor / provider evidence request. | TBD by future governed review | Must not claim rail completion or vendor confirmation. | Question framed / Missing |
| Missing settlement / finality evidence | Escalation to reconciliation and finality review. | Settlement / finality evidence gap. | TBD by future governed review | Must not use final, settled, complete, or arrived claims. | Question framed / Missing |
| Conflicting reconciliation evidence | Incident or governance escalation if material. | Conflict record and evidence bundle. | TBD by future governed review | Must keep state under review. | Question framed / Missing |
| Withdrawal delay threshold | Escalation path if future threshold is accepted. | Delay evidence, owner, and audit receipt. | TBD by future governed review | Must not create SLA or guaranteed timing. | Question framed / Missing |
| Duplicate withdrawal | Dispute / incident / reconciliation escalation. | Duplicate evidence and match review. | TBD by future governed review | Must not imply duplicate resolution. | Question framed / Missing |
| Duplicate deposit | Dispute / incident / reconciliation escalation. | Duplicate evidence and match review. | TBD by future governed review | Must not imply duplicate resolution. | Question framed / Missing |
| Failed withdrawal | Support, dispute, or incident escalation depending on evidence. | Failure evidence, custody, rail, and finality review. | TBD by future governed review | Must not guarantee recovery or reversal. | Question framed / Missing |
| Failed deposit | Support, dispute, or incident escalation depending on evidence. | Failure evidence, custody, rail, and reconciliation review. | TBD by future governed review | Must not guarantee recovery or completion. | Question framed / Missing |
| Compliance hold | Compliance review and possible complaint path. | KYC / AML and legal / compliance evidence. | TBD by future governed review | Must follow qualified disclosure limits. | Question framed / Missing |
| Suspicious activity flag | Compliance and governance escalation. | Monitoring, review, and audit evidence. | TBD by future governed review | Must not disclose prohibited compliance details. | Question framed / Missing |
| Stablecoin instability | Incident or governance escalation if future evidence supports it. | Provider, custody, conversion, and market evidence. | TBD by future governed review | Must not imply protection or recovery. | Question framed / Missing |
| FX quote unavailable | Support or governance escalation depending on scope. | Quote, rate-source, and provider evidence. | TBD by future governed review | Must not guarantee rate or no fees. | Question framed / Missing |
| Fee / spread dispute | Dispute or complaint review. | Fee / FX / spread evidence and Trust UX review. | TBD by future governed review | Must not imply pricing truth without evidence. | Question framed / Missing |
| Vendor / partner outage | Vendor escalation and incident review if material. | Vendor / provider evidence and support record. | TBD by future governed review | Must not blame or confirm without retained evidence. | Question framed / Missing |
| Support backlog threshold | Governance or incident review if threshold later defined. | Backlog evidence and capacity review. | TBD by future governed review | Must not create SLA by implication. | Question framed / Missing |
| Unauthorized user-facing claim | Incident or governance escalation. | Communication evidence; prohibited promise review. | TBD by future governed review | Must not repeat or validate unauthorized claim. | Question framed / Missing |
| Copilot authority drift | Copilot handoff and governance escalation. | Copilot transcript or evidence; Trust UX review. | TBD by future governed review | Must state Copilot is not support or transaction authority where permitted. | Question framed / Missing |
| Formal complaint received | Complaint review and legal / compliance review. | Complaint record and qualified review. | TBD by future governed review | Must follow qualified review constraints. | Question framed / Missing |

This template does not approve incident routing, incident authority, support scripts, user communication, pause controls, or customer-money movement.

## 12. Prohibited promise / closure template

| Promise / closure claim | Why risky | Evidence required before reconsideration | Required review | Status |
|---|---|---|---|---|
| Your funds are safe | Creates custody, liquidity, protection, and legal claims. | Custody, rail, liquidity, Trust UX, and qualified legal / compliance evidence. | Trust UX and legal / compliance review. | Prohibited until evidence and review exist |
| We guarantee recovery | Creates unsupported recovery and liability claims. | Recovery authority, provider evidence, and qualified review. | Legal / compliance and governance review. | Prohibited until evidence and review exist |
| We guarantee reversal | Creates unsupported reversal and rail / custody claims. | Reversal evidence and approved authority. | Reconciliation, rail, custody, and legal review. | Prohibited until evidence and review exist |
| We guarantee completion | Creates finality and timing claims. | Completion and finality evidence. | Reconciliation and finality review. | Prohibited until evidence and review exist |
| Your withdrawal will arrive today | Creates timing and settlement commitment. | Approved operating evidence and permitted wording. | Legal / compliance, support, and finality review. | Prohibited until evidence and review exist |
| Your deposit is complete | Creates deposit, rail, custody, conversion, or ledger truth. | Reconciled deposit evidence. | Reconciliation and audit review. | Prohibited until evidence and review exist |
| Your withdrawal is complete | Creates withdrawal finality. | Finality and settlement evidence. | Reconciliation and audit review. | Prohibited until evidence and review exist |
| Your funds have moved | Creates custody, rail, and ledger truth. | Movement evidence reconciled across relevant sources. | Custody, rail, reconciliation, and audit review. | Prohibited until evidence and review exist |
| Your funds are held securely | Creates custody and protection claims. | Custody evidence and qualified claims review. | Legal / compliance and custody review. | Prohibited until evidence and review exist |
| The rail is working | Creates rail reliability and vendor claims. | Rail evidence and provider evidence. | Rail and vendor review. | Prohibited until evidence and review exist |
| The vendor confirmed it | Creates vendor-evidence claim. | Retained vendor / provider confirmation. | Vendor / provider and audit review. | Prohibited until evidence and review exist |
| The issue is resolved | Creates support closure and transaction truth. | Closure evidence, reconciliation evidence, and audit receipt. | Support closure and reconciliation review. | Prohibited until evidence and review exist |
| No further action needed | May hide unresolved evidence or user obligations. | Closure criteria and user-action review. | Support closure and audit review. | Prohibited until evidence and review exist |
| You can withdraw anytime | Creates liquidity and withdrawal availability claims. | Approved withdrawal model and liquidity evidence. | Liquidity / withdrawal and legal review. | Prohibited until evidence and review exist |
| Settlement is final | Creates settlement finality. | Finality evidence and approved wording. | Settlement / finality and legal review. | Prohibited until evidence and review exist |
| Conversion is complete | Creates stablecoin, FX, custody, or provider truth. | Conversion, custody, and provider evidence. | Stablecoin / conversion and reconciliation review. | Prohibited until evidence and review exist |
| The rate is guaranteed | Creates FX or fee guarantee. | Quote terms, expiry, final rate evidence, and approved disclosure. | Fee / FX / spread and legal review. | Prohibited until evidence and review exist |
| There are no fees | Creates fee truth and disclosure risk. | Fee evidence and disclosure review. | Fee / FX / spread and legal review. | Prohibited until evidence and review exist |
| Hedgr can override the provider | Creates unauthorized provider / rail / custody authority. | Contractual and operational authority evidence. | Vendor, legal / compliance, and governance review. | Prohibited until evidence and review exist |
| Copilot confirmed this | Creates Copilot support authority. | Accepted Copilot handoff boundary and support evidence. | Copilot, Trust UX, and support review. | Prohibited until evidence and review exist |
| This is only a delay | Minimizes risk without evidence. | Evidence proving no other blocker or risk applies. | Reconciliation, support, and audit review. | Prohibited until evidence and review exist |
| This is not a risk | Hides visible-risk doctrine and evidence gaps. | Qualified evidence and approved risk review. | Legal / compliance and governance review. | Prohibited until evidence and review exist |

This template does not approve replacement support wording, closure wording, product copy, customer-facing claims, or support scripts.

## 13. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Support ownership evidence | Support / incident evidence; operational dry-run evidence; governance record | Founder assumption; internal analysis alone | Founder assumption is not support / dispute evidence. |
| Support handoff evidence | Support / incident evidence; reconciliation evidence; Trust UX review; audit evidence | Support intent; informal notes | Support intent is not support readiness. |
| Dispute classification evidence | Support / incident evidence; external legal / compliance review | Internal analysis alone; support wording | Internal analysis may frame questions only. |
| Complaint classification evidence | External legal / compliance review; support / incident evidence; audit evidence | Founder assumption; repo doctrine alone | Legal / compliance review must be dated and attributable to qualified review where complaint risk is implicated. |
| Incident routing evidence | Support / incident evidence; operational dry-run evidence; audit evidence | Support matrix alone | Repo doctrine is not support approval. |
| Support closure evidence | Reconciliation evidence; audit evidence; support / incident evidence; legal / compliance review where applicable | Support status; support wording | Support closure requires evidence compatible with reconciliation and audit requirements. |
| Reconciliation dependency evidence | Reconciliation evidence; audit evidence | Reconciliation SOP alone | Reconciliation SOP is not reconciliation evidence. |
| Audit dependency evidence | Audit evidence; retention review | Audit checklist alone | Audit checklist is not audit evidence. |
| Vendor escalation evidence | Vendor / provider documentation; vendor / provider confirmation; support / incident evidence | Vendor claim without retained source | Vendor evidence must be dated, source-linked, and preserved. |
| User communication evidence | Support / incident evidence; Trust UX review; audit evidence; qualified review where needed | Product copy or support intent alone | Support wording is not transaction truth. |
| Copilot handoff evidence | Copilot governance evidence; Trust UX review; support / incident evidence | Copilot explanation | Copilot explanation is not support authority. |
| Prohibited promise evidence | Trust UX review; legal / compliance review; support / incident evidence | Safer wording suggestion alone | This package does not approve replacement wording. |
| Legal / compliance support review | Qualified external legal / compliance review | Founder assumption; internal analysis; repo doctrine alone | Review must be dated and attributable where dispute, complaint, customer-money, or legal response risk is implicated. |

Dry-run evidence is not live support approval. Internal analysis is not operational readiness. Support closure requires evidence compatible with reconciliation and audit requirements.

## 14. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No legal / compliance review | Qualified review of support, dispute, complaint, claims, communication, and customer-money response risk. | Unresolved / Evidence missing | Support / dispute review; complaint classification; permitted wording; ADR readiness |
| No jurisdiction selected | Jurisdiction evidence and qualified review. | Unresolved / Evidence missing | Legal response requirements; complaint handling; customer eligibility |
| No customer eligibility policy | Eligibility evidence and policy review. | Unresolved / Evidence missing | Support routing; KYC / AML support; pilot scope |
| No KYC / AML owner | KYC / AML ownership and disclosure constraints. | Unresolved / Evidence missing | Compliance holds; support handoff; complaint review |
| No custody model selected | Custody model and provider responsibility evidence. | Unresolved / Evidence missing | Custody support; closure; prohibited promises |
| No rail selected or approved | Rail permission, role, state, and escalation evidence. | Unresolved / Evidence missing | Rail support; vendor escalation; finality claims |
| No settlement / finality evidence | Finality evidence and support wording constraints. | Unresolved / Evidence missing | Completion claims; support closure; disputes |
| No stablecoin / conversion evidence | Provider, conversion, custody, and final-value evidence. | Unresolved / Evidence missing | Conversion support; fee / FX disputes |
| No fee / FX / spread evidence | Quote, fee, spread, and final-value evidence. | Unresolved / Evidence missing | Pricing support; disclosure and disputes |
| No liquidity / withdrawal control evidence | Liquidity, withdrawal, pause, and delay evidence. | Unresolved / Evidence missing | Withdrawal support; incident routing |
| No Trust UX approval | Permitted / prohibited claims and state-label review. | Unresolved / Evidence missing | User communication; Copilot handoff |
| No Pilot Ops owner | Operating owner and escalation map. | Unresolved / Evidence missing | Support ownership; incident routing |
| No reconciliation process | Reconciliation source-of-truth and closure evidence. | Unresolved / Evidence missing | Support closure; dispute review |
| No support owner | Support owner evidence. | Unresolved / Evidence missing | Support triage and closure |
| No support handoff evidence | Handoff template and evidence bundle requirements. | Unresolved / Evidence missing | Support routing; Copilot handoff |
| No dispute classification evidence | Dispute taxonomy and qualified review. | Unresolved / Evidence missing | Dispute routing and closure |
| No complaint handling evidence | Complaint classification, retention, and qualified review. | Unresolved / Evidence missing | Complaint routing and response |
| No incident routing evidence | Incident trigger, owner, and communication constraints. | Unresolved / Evidence missing | Incident escalation; pause / halt review |
| No support closure dependency evidence | Closure evidence compatibility with reconciliation and audit. | Unresolved / Evidence missing | Closure claims and case resolution |
| No prohibited promise review | Prohibited claims table and legal / Trust UX review. | Unresolved / Evidence missing | Support scripts; customer-facing communication |
| No Copilot handoff evidence | Copilot-to-support handoff evidence and authority boundaries. | Unresolved / Evidence missing | Copilot proximity; support authority drift |
| No vendor / provider escalation evidence | Vendor path, contact, source class, and retained evidence. | Unresolved / Evidence missing | Vendor support; provider claims |
| No audit / retention policy | Support, dispute, complaint, incident, and communication retention review. | Unresolved / Evidence missing | Evidence preservation and closure review |
| No accepted support / dispute ADR | Accepted ADR where material boundaries require decision. | Unresolved / Evidence missing | ADR drafting readiness; implementation preflight |
| No implementation-specific §7a brief | Bounded future implementation brief if later authorized. | Unresolved / Evidence missing | Implementation proposal and §7 activation |

No blocker is closed by this package.

## 15. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Support ownership | Owners, capacity, and responsibilities may change. | Review date required before downstream use. | Role change, operating scope change, or stale owner evidence. |
| Support handoff | State labels, evidence sources, and dependencies may change. | Review with Trust UX, reconciliation, and audit evidence. | New state, new flow, new support channel, or missing evidence. |
| Support status constraints | Status language may become promissory or stale. | Review before permitted wording or closure use. | New support status, dispute, complaint, or incident class. |
| Dispute classification | Legal and operational thresholds may change. | Qualified review required before downstream use. | Jurisdiction, provider, product, or legal review change. |
| Complaint classification | Legal response requirements may change. | Dated qualified review required. | Jurisdiction, regulator, provider, or support process change. |
| Incident routing | Incident triggers and owners may change. | Review before downstream use. | New failure class, threshold, vendor outage, or support backlog issue. |
| Support closure dependency | Closure evidence can stale or conflict. | Review with reconciliation and audit evidence. | New evidence, conflicting source, or closure challenge. |
| Reconciliation dependency | Source-of-truth and matching evidence may change. | Review before support reliance. | New rail, custody, conversion, or settlement evidence. |
| Audit dependency | Retention, receipt, and access-control needs may change. | Review before evidence use. | New data class, retention review, access-control change, or legal review change. |
| Vendor / provider escalation | Provider contacts, limits, and evidence formats may change. | Review before support escalation use. | Vendor documentation or confirmation changes. |
| User communication constraints | Claims and permitted language may change with evidence. | Trust UX and legal / compliance review required. | New claim, dispute, complaint, or customer-money support scenario. |
| Copilot handoff constraints | Copilot proximity and support boundary may drift. | Review before any handoff use. | New Copilot capability, transcript pattern, support workflow, or governance decision. |
| Prohibited promises | Claims risk changes with evidence and jurisdiction. | Trust UX and qualified review required. | New promise, support phrase, product claim, or legal review change. |
| Legal / compliance review | Law, jurisdiction, provider terms, and support obligations may change. | Dated qualified review required. | New jurisdiction, product scope, complaint path, customer-money risk, or stale review date. |
| Trust UX / disclosure constraints | State-label and disclosure evidence may change. | Trust UX review before downstream use. | New state, route, copy, support script, Copilot response, or claim. |

Freshness expectations are planning constraints only. They are not approved SLAs, support policy, complaint policy, dispute policy, incident policy, legal conclusions, customer communication approval, or customer-money permission.

## 16. Downstream dependency effect

- **Audit / retention evidence package:** Must capture support handoffs, support responses, dispute classifications, complaint classifications, incident routing, prohibited promise review, reconciliation dependency, and closure evidence.
- **ADR drafting readiness:** Cannot proceed for support-sensitive, complaint-sensitive, dispute-sensitive, incident-sensitive, or Copilot handoff-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** Cannot treat support readiness, dispute readiness, complaint handling, incident routing, support closure, or customer communication boundaries as closed without accepted evidence.

## 17. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Support / dispute evidence package |
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
| Non-authorization note | Evidence intake does not approve support operations, dispute operations, complaint handling, support closure, Class B execution, implementation, or customer-money movement. |

## 18. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the Support / Dispute package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, support-ready, dispute-ready, complaint-ready, incident-ready, closure-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 19. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify Support / Dispute evidence and does not approve support operations, dispute operations, complaint handling, incident handling, support scripts, support closure, transaction outcomes, deposit outcomes, withdrawal outcomes, custody outcomes, rail outcomes, settlement outcomes, reconciliation closure, customer-facing promises, Copilot support authority, external engagement, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future Support / Dispute evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, custody evidence review, rail / vendor permission evidence review, settlement / finality evidence review, stablecoin / conversion evidence review, fee / FX / spread evidence review, liquidity / withdrawal evidence review, Trust UX / disclosure evidence review, Pilot Ops evidence review, Reconciliation evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
