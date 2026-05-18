# HEDGR - Class B Support Escalation Matrix

## 1. Status / Authority / Scope

**Status:** Support escalation matrix; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, and future operational evidence.

**Scope:** Defines support escalation requirements and unresolved support / dispute / incident questions for future Class B consideration.

**Mode:** Support-escalation model identification only; not support approval, dispute approval, live operations, or implementation approval.

This matrix does not approve, activate, or operationalize support operations, dispute operations, incident handling, transaction outcomes, custody outcomes, rail outcomes, reconciliation outcomes, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This matrix exists to support the Class B governance spine by defining the support escalation model that would be required before any future manual / limited Class B pilot may be considered.

It answers:

**What support ownership, escalation paths, evidence handoffs, prohibited promises, dispute routing, incident triggers, and user-communication boundaries must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Is Hedgr approved to provide support for live customer-money flows?**

It does not create:

- support approval
- dispute approval
- incident approval
- transaction outcome approval
- custody outcome approval
- rail outcome approval
- reconciliation outcome approval
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
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify support escalation requirements and unresolved support questions only. They do not create support approval, dispute approval, implementation authority, or execution approval.

## 4. Support escalation principles

1. **Support cannot become shadow authority**

   Support language, case status, or operator notes must not create transaction truth, custody truth, rail truth, ledger truth, or settlement finality.

2. **Evidence before reassurance**

   Support may explain what is known, unknown, pending, blocked, or escalated. Support must not reassure beyond evidence.

3. **Reconciliation before resolution**

   No support case should be marked resolved for a customer-money event unless reconciliation evidence supports the resolution state.

4. **Escalation before assumption**

   Where support lacks custody, rail, liquidity, compliance, reconciliation, or operator evidence, the future default posture should be escalation, not assumption.

5. **User-facing clarity without guarantees**

   Support must be clear and calm while avoiding guaranteed timing, guaranteed reversal, guaranteed recovery, guaranteed completion, or guaranteed protection.

6. **Incident routing must be predefined**

   Future Class B support must define which events become support issues, operational exceptions, compliance reviews, incident reviews, or governance escalations.

7. **Support matrix does not create authority**

   A support escalation matrix can define routing and questions. It cannot authorize live support operations, transaction handling, or customer fund movement.

## 5. Support escalation domains

| Domain | Support requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
| --- | --- | --- | --- | --- |
| Support ownership | Who owns Class B support? Who triages cases? Who escalates exceptions? Who can close cases? Who owns unresolved support states? | Customer-money support without ownership creates trust and operational risk. | Pilot ops and reconciliation ownership are framed; no Class B support owner is approved. | Support ownership matrix; escalation owner map; Pilot ops review; Reconciliation SOP review. |
| User-state handoff | What user-visible state is handed to support? What internal state is handed to support? What evidence is missing? What wording is permitted? What wording is prohibited? | Support must not improvise around ambiguous operational states. | Trust UX and Pilot Ops handoff constraints are framed; no live support handoff process is approved. | Support handoff template; Trust UX review; reconciliation evidence map; support script constraints. |
| Deposit support | How should support route deposit initiated, pending, delayed, failed, duplicate, reversed, disputed, or unresolved cases? What evidence is required before support can describe deposit status? | Deposit support can imply rail, custody, conversion, or ledger truth. | Deposits remain future Class B / C capabilities only when authorized. | Deposit state taxonomy; rail evidence; custody transition evidence; Reconciliation SOP; support escalation path. |
| Withdrawal support | How should support route withdrawal pending review, pending rail action, pending custody action, delayed, blocked, failed, reversed, disputed, unresolved, paused, halted, or completed cases? What evidence is required before support can describe withdrawal finality? | Withdrawal support is high-trust and must not overpromise access, timing, or completion. | Withdrawal control and reconciliation questions are framed; no withdrawal support process is approved. | Withdrawal control matrix; settlement / finality evidence map; liquidity / withdrawal control evidence; Reconciliation SOP; support wording constraints. |
| Custody-related support | How should support route asset-control uncertainty, provider outage, account lockout, recovery, frozen asset, failed custody transition, or disputed custody-state cases? What may support say about custody, access, recovery, safety, or protection? | Custody support can accidentally create legal or trust claims. | Custody boundary questions are framed; no custody model or support process is approved. | Custody responsibility matrix; provider evidence; legal / compliance review; Trust UX review. |
| Rail-related support | How should support route rail outage, delayed rail event, failed rail event, duplicate rail event, reversed rail event, blocked rail event, or vendor / partner communication failure? Who contacts the rail or vendor? | Rail support depends on vendor / partner responsibility and settlement evidence. | Rail classification is documentation-only; no rail is approved. | Rail responsibility matrix; vendor / partner contact path; rail event evidence map; Reconciliation SOP. |
| Stablecoin / conversion support | How should support route conversion pending, conversion failed, stablecoin transfer delay, redemption issue, FX quote mismatch, spread dispute, fee dispute, or stablecoin instability cases? | Stablecoin and conversion support can imply execution, custody, FX, or settlement truth. | Stablecoin / conversion remains product intent unless separately authorized. | Stablecoin / conversion boundary review; fee / FX evidence map; legal / compliance review; Reconciliation SOP; Trust UX review. |
| Reconciliation exception support | How should support route mismatches, duplicate events, ambiguous records, unresolved customer-money states, missing evidence, or conflicting evidence? What can support say while reconciliation is incomplete? | Support must not close or reassure while reconciliation remains unresolved. | Reconciliation SOP is framed; no reconciliation operations are approved. | Exception taxonomy; reconciliation owner map; audit evidence checklist; support escalation matrix completion. |
| Compliance / risk escalation | How should support route KYC / AML flags, sanctions concerns, suspicious activity, compliance holds, blocked transactions, or user eligibility issues? What may support disclose? | Compliance support has legal, privacy, and user-trust implications. | Legal / compliance questions are framed; no Class B compliance support process is approved. | Legal / compliance review; compliance escalation path; disclosure constraints; support script constraints. |
| Incident escalation | Which support cases escalate to incident response? Who owns incident communication? When must pilot operations pause or halt? What must be logged? | Incidents must not be handled as ordinary support tickets where customer-money or trust risk is elevated. | Pilot Ops and Liquidity / Withdrawal Control define pause / kill concepts; no active incident process is approved. | Incident response process; pause / kill trigger review; communication constraints; audit evidence checklist. |
| Complaint and dispute handling | How are formal complaints, disputes, incorrect credits, incorrect debits, missing funds, delays, fees, FX, custody, or rail issues handled? What response timelines are required or prohibited? | Complaints and disputes are legal, trust, and operational risk surfaces. | No Class B complaint or dispute handling process is approved. | Dispute handling process; complaint classification; legal / compliance review; evidence retention requirements; support escalation owner. |
| Copilot-to-support handoff | When should Copilot direct users to support? What may Copilot summarize? What must Copilot avoid saying before support or reconciliation evidence exists? | Copilot must not become support authority, transaction authority, or finality authority. | Copilot advisory posture and Trust UX guardrails are framed; no Class B Copilot handoff process is approved. | Copilot Class B boundary review; support script constraints; Trust UX review; ADR if required. |

## 6. Escalation matrix template

| Case type | Initial owner | Required evidence before response | Escalation owner | User-facing wording constraint | Closure dependency |
| --- | --- | --- | --- | --- | --- |
| Deposit pending | TBD | TBD | TBD | TBD | TBD |
| Deposit delayed | TBD | TBD | TBD | TBD | TBD |
| Deposit failed | TBD | TBD | TBD | TBD | TBD |
| Deposit duplicate | TBD | TBD | TBD | TBD | TBD |
| Deposit unresolved | TBD | TBD | TBD | TBD | TBD |
| Withdrawal pending review | TBD | TBD | TBD | TBD | TBD |
| Withdrawal pending rail action | TBD | TBD | TBD | TBD | TBD |
| Withdrawal pending custody action | TBD | TBD | TBD | TBD | TBD |
| Withdrawal delayed | TBD | TBD | TBD | TBD | TBD |
| Withdrawal blocked | TBD | TBD | TBD | TBD | TBD |
| Withdrawal failed | TBD | TBD | TBD | TBD | TBD |
| Withdrawal reversed | TBD | TBD | TBD | TBD | TBD |
| Withdrawal disputed | TBD | TBD | TBD | TBD | TBD |
| Withdrawal unresolved | TBD | TBD | TBD | TBD | TBD |
| Custody state unclear | TBD | TBD | TBD | TBD | TBD |
| Rail unavailable | TBD | TBD | TBD | TBD | TBD |
| Vendor / partner unavailable | TBD | TBD | TBD | TBD | TBD |
| Stablecoin / conversion failed | TBD | TBD | TBD | TBD | TBD |
| FX quote mismatch | TBD | TBD | TBD | TBD | TBD |
| Fee / spread dispute | TBD | TBD | TBD | TBD | TBD |
| Reconciliation mismatch | TBD | TBD | TBD | TBD | TBD |
| Compliance hold | TBD | TBD | TBD | TBD | TBD |
| Suspicious activity flag | TBD | TBD | TBD | TBD | TBD |
| Support state mismatch | TBD | TBD | TBD | TBD | TBD |
| Pilot paused | TBD | TBD | TBD | TBD | TBD |
| Pilot halted | TBD | TBD | TBD | TBD | TBD |
| Copilot handoff | TBD | TBD | TBD | TBD | TBD |
| Formal complaint | TBD | TBD | TBD | TBD | TBD |

This matrix is a template only. It does not approve support operations, case routing, user-facing wording, closure authority, or customer-money movement.

## 7. Support handoff template

| Handoff field | Required content | Source of truth dependency | Prohibited content |
| --- | --- | --- | --- |
| User-visible state | TBD | Trust UX review and reconciled state evidence. | Finality, safety, recovery, or completion claims without evidence. |
| Internal state | TBD | Pilot Ops review and operational evidence. | Undocumented assumptions or hidden authority. |
| Customer action requested | TBD | Approved support / compliance constraints. | Instructions that imply execution approval or guaranteed outcome. |
| Evidence checked | TBD | Audit evidence checklist and reconciliation evidence map. | Unsupported conclusions. |
| Evidence missing | TBD | Support handoff record and owner review. | Silence around blockers that affect user understanding. |
| Current blocker | TBD | Custody, rail, compliance, liquidity, reconciliation, or support owner evidence. | Blame assignment before review. |
| Reconciliation status | TBD | Reconciliation SOP evidence. | Resolution or closure without reconciliation evidence. |
| Custody status | TBD | Custody boundary review and provider evidence. | Custody truth, safety, or recovery claims without evidence. |
| Rail status | TBD | Rail classification review and vendor / partner evidence. | Rail finality or vendor confirmation without evidence. |
| Liquidity / withdrawal status | TBD | Liquidity / withdrawal control review. | Withdrawal availability, timing, or completion promises. |
| Compliance status | TBD | Legal / compliance review and disclosure constraints. | Private, speculative, or prohibited compliance disclosures. |
| Support owner | TBD | Support ownership matrix. | Unowned or informal closure authority. |
| Escalation owner | TBD | Escalation owner map. | Escalation by assumption or untracked handoff. |
| Permitted user-facing wording | TBD | Trust UX review and support script constraints. | Final customer scripts or unapproved promises. |
| Prohibited promises | TBD | Prohibited support promises table and legal / compliance review. | Guarantees, blame, finality, or protection claims without evidence. |
| Next review trigger | TBD | Pilot Ops, reconciliation, incident, or dispute design. | Open-ended delay without owner or review condition. |
| Audit note | TBD | Audit evidence checklist and retention requirements. | Missing evidence provenance or unsupported closure. |

This handoff template defines required information shape only. It does not approve support workflows or operational authority.

## 8. Prohibited support promises

| Promise / wording | Risk | Prohibited unless | Safer direction |
| --- | --- | --- | --- |
| Your funds are safe | Creates custody, rail, liquidity, and protection claims. | Qualified evidence and approved wording support the exact claim. | State what evidence is currently under review. |
| We guarantee recovery | Creates unsupported recovery and liability claims. | A future governed process and evidence explicitly allow the statement. | Explain that recovery status cannot be confirmed yet. |
| We guarantee reversal | Creates unsupported reversal and rail / custody claims. | Reversal authority and evidence are approved and documented. | Say reversal evidence is required before any outcome can be described. |
| We guarantee completion | Creates finality and timing claims. | Completion evidence and approved support wording exist. | Say the case remains under review or awaiting evidence. |
| Your withdrawal will arrive today | Creates timing and settlement commitments. | Approved operating evidence and wording permit the statement. | Provide only the current review state and next review trigger. |
| Your deposit is complete | Creates deposit, rail, custody, ledger, or conversion truth. | Reconciled evidence supports completion. | Say completion cannot be confirmed until required evidence is reviewed. |
| Your withdrawal is complete | Creates withdrawal finality. | Settlement / finality evidence supports completion. | Say finality evidence is required before completion can be stated. |
| Your funds have moved | Creates custody, rail, and ledger truth. | Movement evidence is reconciled and approved for disclosure. | Refer to the evidence layer currently being reviewed. |
| Your funds are held securely | Creates custody and protection claims. | Custody evidence and legal / compliance review support the wording. | Say custody evidence or provider status is under review. |
| The rail is working | Creates rail reliability claims. | Rail evidence supports the claim and disclosure is approved. | Say rail status has not been confirmed or is being checked. |
| The vendor confirmed it | Creates vendor evidence claims. | A retained vendor / partner record supports the statement. | Say vendor / partner evidence is pending or under review. |
| The issue is resolved | Creates support closure and transaction truth. | Closure evidence and reconciliation evidence support resolution. | Say the case cannot close until evidence supports closure. |
| No further action needed | May hide unresolved evidence or user obligations. | Approved closure criteria and user-action review support it. | State whether user information is pending or no action is currently requested. |
| You can withdraw anytime | Creates liquidity and withdrawal availability claims. | A future approved withdrawal model supports the claim. | Avoid availability promises; state current withdrawal authority is not approved by this matrix. |
| Settlement is final | Creates settlement finality. | Finality evidence and approved legal / operational wording support it. | Say settlement finality requires evidence review. |
| Conversion is complete | Creates stablecoin / FX / custody truth. | Conversion evidence is reconciled and approved for disclosure. | Say conversion status requires provider and reconciliation evidence. |
| The rate is guaranteed | Creates FX or fee guarantee. | Approved quote terms, expiry, and disclosure support it. | Say rate evidence or quote status must be reviewed. |
| There are no fees | Creates fee truth and disclosure risk. | Approved fee evidence and disclosure review support it. | Say fee / spread evidence must be confirmed. |
| Hedgr can override the provider | Creates unauthorized provider / rail / custody authority. | A future approved provider contract and process explicitly allow it. | State that provider-dependent issues require escalation and evidence. |
| Copilot confirmed this | Creates Copilot support authority. | A future approved Copilot boundary allows the exact statement. | Say Copilot is not transaction, support, or finality authority. |
| This is only a delay | Minimizes risk without evidence. | Evidence proves no other blocker or risk applies. | Say the current state is pending, blocked, or under review as applicable. |
| This is not a risk | Hides visible-risk doctrine and evidence gaps. | Qualified evidence and approved risk review support it. | State what is known, unknown, and escalated. |

Safer directions are generic and non-implementing. They are not final customer support scripts.

## 9. Incident and dispute routing template

| Trigger | Route as support / dispute / incident / governance escalation | Required owner | User communication allowed? | Evidence required | Pause / kill relevance |
| --- | --- | --- | --- | --- | --- |
| Unresolved customer-money state | TBD | TBD | TBD | TBD | TBD |
| Missing custody evidence | TBD | TBD | TBD | TBD | TBD |
| Missing rail evidence | TBD | TBD | TBD | TBD | TBD |
| Conflicting reconciliation evidence | TBD | TBD | TBD | TBD | TBD |
| Withdrawal delay beyond approved window | TBD | TBD | TBD | TBD | TBD |
| Duplicate withdrawal | TBD | TBD | TBD | TBD | TBD |
| Duplicate deposit | TBD | TBD | TBD | TBD | TBD |
| Failed withdrawal | TBD | TBD | TBD | TBD | TBD |
| Failed deposit | TBD | TBD | TBD | TBD | TBD |
| Compliance hold | TBD | TBD | TBD | TBD | TBD |
| Suspicious activity flag | TBD | TBD | TBD | TBD | TBD |
| Stablecoin instability | TBD | TBD | TBD | TBD | TBD |
| FX quote unavailable | TBD | TBD | TBD | TBD | TBD |
| Fee / spread dispute | TBD | TBD | TBD | TBD | TBD |
| Vendor / partner outage | TBD | TBD | TBD | TBD | TBD |
| Support backlog threshold breach | TBD | TBD | TBD | TBD | TBD |
| Unauthorized user-facing claim | TBD | TBD | TBD | TBD | TBD |
| Copilot authority drift | TBD | TBD | TBD | TBD | TBD |
| Formal complaint received | TBD | TBD | TBD | TBD | TBD |

Trigger examples are illustrative only. They do not define approved thresholds, live incident routing, dispute handling, or operational authority.

## 10. Support status and closure constraints

Future Class B-adjacent support cases may be marked as:

- received
- awaiting evidence
- under review
- escalated to reconciliation review
- escalated to custody review
- escalated to rail / vendor review
- escalated to compliance review
- escalated to incident review
- pending user information
- pending operational decision
- closed after evidence review

Support cases must not be marked as:

- resolved before reconciliation evidence supports closure
- completed before finality evidence exists
- safe before custody / rail / liquidity evidence supports the statement
- recovered before evidence supports recovery
- reversed before reversal evidence exists
- customer fault before review
- vendor fault before evidence
- Hedgr fault before review
- no-risk before evidence

Support status is not transaction status, ledger truth, custody truth, rail truth, or reconciliation truth.

## 11. Support prohibited assumptions

The repo must not assume:

- support operations are approved
- support can resolve customer-money events
- support can confirm settlement finality
- support can confirm custody state
- support can confirm rail state
- support can confirm reconciliation state
- support can guarantee timing
- support can guarantee recovery
- support can reverse transactions
- support can override vendors, rails, custody providers, banks, chains, or compliance holds
- support scripts are approved
- dispute operations exist
- incident response operations exist
- complaint handling requirements are approved
- Copilot may act as support authority
- customer funds may move

## 12. Downstream dependency effect

- **Audit evidence checklist:** Must capture evidence needed for support case routing, closure, escalation, dispute, and incident review.
- **Future ADRs:** Must consider support authority, support-state truth, dispute handling, incident routing, and user-communication boundaries where material.
- **Implementation-specific §7a brief:** Must cite this matrix when any Class B support, dispute, incident, customer-facing state, or Copilot handoff is proposed.
- **Future frontend implementation:** Must not expose support status as transaction finality, custody truth, rail truth, ledger truth, or reconciliation truth.
- **Future Copilot implementation:** Must not route, summarize, or advise around Class B support cases beyond approved advisory boundaries.
- **Future implementation ticket:** Must not rely on this matrix as support approval or operational readiness.

## 13. Open Support Escalation questions for future review

- [ ] What Class B flow creates the support need?
- [ ] What user-visible state is involved?
- [ ] What internal state is involved?
- [ ] What evidence has been checked?
- [ ] What evidence is missing?
- [ ] What reconciliation status applies?
- [ ] What custody status applies?
- [ ] What rail status applies?
- [ ] What liquidity / withdrawal status applies?
- [ ] What compliance status applies?
- [ ] Who owns first response?
- [ ] Who owns escalation?
- [ ] Who owns closure?
- [ ] What may support say?
- [ ] What must support avoid saying?
- [ ] When does the case become a dispute?
- [ ] When does the case become an incident?
- [ ] When must pilot operations pause or halt?
- [ ] What audit evidence must be retained?
- [ ] What must be true before support operations can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, support design, incident response design, dispute handling design, vendor / partner evidence, audit evidence design, and accepted ADRs where required.

## 14. Non-authorization statement

This matrix is non-authoritative and documentation-only. It does not approve, activate, or operationalize support operations, dispute operations, incident handling, transaction outcomes, custody outcomes, rail outcomes, reconciliation outcomes, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B support-related implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, audit evidence review, and operational evidence where applicable.
