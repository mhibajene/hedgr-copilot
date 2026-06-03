# HEDGR - Class B Liquidity / Withdrawal Control Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001` through `EVID-B-011`, future qualified legal / compliance review, and future vendor / provider evidence where applicable.

**Scope:** Defines required liquidity / withdrawal control evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, withdrawal approval, liquidity approval, reserve approval, treasury approval, solvency approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve withdrawals, withdrawal readiness, available-to-withdraw claims, liquidity buffers, reserve policy, solvency claims, withdrawal priority rules, pause controls, kill criteria, treasury operations, redemption operations, custody operations, rail operations, settlement finality, ledger truth, accounting truth, support closure, external engagement, Class B execution, implementation, staging, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

This package does not provide legal advice or claim regulatory approval.

## 2. Purpose

This package exists to instantiate the liquidity / withdrawal control evidence package from the evidence gathering plan and registry.

It answers:

**What liquidity / withdrawal control evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Are withdrawals, liquidity buffers, reserve policy, treasury controls, or withdrawal availability approved for Hedgr?**

It does not create:

- withdrawal approval
- liquidity approval
- reserve approval
- treasury approval
- solvency approval
- withdrawal priority approval
- pause / kill-control approval
- redemption approval
- available-to-withdraw approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_FEE_FX_SPREAD_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STABLECOIN_CONVERSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_SETTLEMENT_FINALITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_VENDOR_PERMISSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTODY_PROVIDER_MODEL_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_OPS_RUNBOOK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define liquidity / withdrawal control evidence requirements only. They do not create withdrawal approval, liquidity approval, treasury approval, solvency approval, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Liquidity / withdrawal control evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | External legal / compliance review; vendor / provider documentation or confirmation where applicable; custody evidence, rail evidence, settlement / finality evidence, stablecoin / conversion evidence, fee / FX / spread evidence, reconciliation evidence, support evidence, and audit evidence where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no customer eligibility policy; no KYC / AML owner; no custody model selected; no rail selected or approved; no rail permission evidence; no settlement / finality evidence; no stablecoin / conversion evidence; no fee / FX / spread evidence; no liquidity buffer policy; no withdrawal control evidence; no treasury / liquidity dependency evidence; no support / dispute handling evidence; no reconciliation process; no audit / retention policy; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future liquidity / withdrawal control assessment; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, withdrawal-ready, liquidity-ready, reserve-ready, treasury-ready, solvency-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Withdrawal path definition | What withdrawal path is being considered and which dependencies does it touch? | External legal / compliance review; vendor / provider documentation; custody evidence; rail evidence; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No withdrawal path evidence | No withdrawal path is approved. |
| Available-to-withdraw boundary | What does available to withdraw mean and what evidence proves it? | External legal / compliance review; custody evidence; rail evidence; settlement / finality evidence; reconciliation evidence | Question framed / Missing | Dated review required before downstream use | No available-to-withdraw boundary evidence | UI state is not availability truth. |
| Withdrawal readiness evidence | What evidence is required before a withdrawal can be treated as ready for review? | External legal / compliance review; custody evidence; rail evidence; liquidity evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No withdrawal readiness evidence | No readiness state is approved. |
| Liquidity buffer assumptions | What buffer assumptions are being considered and who would monitor them? | External legal / compliance review; vendor / provider confirmation where applicable; internal analysis may frame only | Question framed / Missing | Dated review required before downstream use | No liquidity buffer policy | No buffer is approved. |
| Reserve policy assumptions | What reserve policy assumptions would need evidence and review? | External legal / compliance review; treasury / liquidity evidence; vendor / provider confirmation where applicable | Question framed / Missing | Dated qualified review required before downstream use | No reserve policy evidence | No reserve policy or solvency claim is approved. |
| Treasury operation dependency | Would withdrawals require treasury operations and what controls would constrain them? | External legal / compliance review; treasury / liquidity evidence; audit evidence; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No treasury dependency evidence | No treasury operation is approved. |
| Redemption dependency | Would withdrawal depend on redemption and what evidence proves that dependency? | Stablecoin / conversion evidence; vendor / provider documentation; settlement / finality evidence | Question framed / Missing | Review date required before downstream use | No redemption evidence | No redemption path is approved. |
| Stablecoin liquidity dependency | What stablecoin liquidity evidence is required before withdrawal claims? | Stablecoin / conversion evidence; vendor / provider documentation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No stablecoin / conversion evidence | No stablecoin liquidity claim is approved. |
| Custody release dependency | What evidence proves custody release or custody-state change? | Custody evidence; vendor / provider confirmation; audit evidence | Question framed / Missing | Review date required before downstream use | No custody release evidence | No custody release process is approved. |
| Rail withdrawal dependency | What rail evidence is required before withdrawal processing or status claims? | Rail evidence; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No rail withdrawal evidence | No rail withdrawal path is approved. |
| Settlement / finality dependency | What evidence proves settlement or finality for withdrawal states? | Settlement / finality evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No finality or completion claim is approved. |
| Fee / FX / spread dependency | What fee, FX, spread, and quote evidence attaches to withdrawals? | Fee / FX / spread evidence; external legal / compliance review; vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No fee / FX / spread evidence | No pricing claim is approved. |
| Final amount dependency | What proves the final amount sent, received, failed, reversed, or disputed? | Settlement / finality evidence; fee / FX / spread evidence; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No final amount evidence | No final amount truth is approved. |
| Withdrawal priority assumptions | Would any withdrawal priority rule be considered and what evidence constrains it? | External legal / compliance review; support / incident evidence; internal analysis may frame only | Question framed / Missing | Dated review required before downstream use | No withdrawal priority evidence | No priority rule is approved. |
| Withdrawal queue assumptions | Would withdrawals queue and what evidence defines queue state? | Vendor / provider documentation; support / incident evidence; reconciliation evidence; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No withdrawal queue evidence | No queue model is approved. |
| Withdrawal cap assumptions | Would caps apply and what review constrains them? | External legal / compliance review; liquidity evidence; internal analysis may frame only | Question framed / Missing | Review date required before downstream use | No withdrawal cap evidence | No cap is approved. |
| Participant-level withdrawal limits | What participant-level limits would require evidence? | External legal / compliance review; customer eligibility evidence; KYC / AML evidence | Question framed / Missing | Review date required before downstream use | No participant withdrawal-limit evidence | No participant limit is approved. |
| Pilot-level withdrawal limits | What pilot-level limits would require evidence? | External legal / compliance review; liquidity evidence; pilot ops evidence | Question framed / Missing | Review date required before downstream use | No pilot withdrawal-limit evidence | No pilot limit is approved. |
| Stress trigger evidence | What evidence defines stress conditions? | External legal / compliance review where applicable; liquidity evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No stress / pause evidence | No stress trigger is approved. |
| Pause trigger evidence | What evidence triggers pause? | Liquidity evidence; support / incident evidence; reconciliation evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No stress / pause evidence | No pause authority is approved. |
| Resume trigger evidence | What evidence is required before resuming? | Liquidity evidence; reconciliation evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No resume evidence | No resume authority is approved. |
| Kill criteria evidence | What evidence defines halt or kill criteria? | External legal / compliance review; liquidity evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No kill criteria evidence | No kill criteria are approved. |
| No-new-deposit trigger evidence | What evidence triggers no-new-deposit posture? | External legal / compliance review; liquidity evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No no-new-deposit trigger evidence | No deposit posture is approved. |
| Withdrawal-priority trigger evidence | What evidence triggers priority treatment if ever considered? | External legal / compliance review; liquidity evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No withdrawal priority evidence | No priority treatment is approved. |
| Delayed withdrawal handling | What proves delay and what evidence constrains user communication? | Rail evidence; custody evidence; support / incident evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No delayed withdrawal handling evidence | No delay handling is approved. |
| Failed withdrawal handling | What proves failure and what evidence constrains remedy or support response? | Rail evidence; custody evidence; reconciliation evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No failed withdrawal handling evidence | No failure handling is approved. |
| Blocked withdrawal handling | What proves a withdrawal is blocked and who can review it? | External legal / compliance review; KYC / AML evidence; rail evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No blocked withdrawal handling evidence | No blocked handling is approved. |
| Reversed withdrawal handling | What proves reversal and its source-of-truth boundary? | Settlement / finality evidence; reconciliation evidence; audit evidence; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No reversed withdrawal handling evidence | No reversal handling is approved. |
| Disputed withdrawal handling | What evidence supports disputed withdrawal review? | Support / incident evidence; reconciliation evidence; audit evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No dispute handling evidence | No dispute handling is approved. |
| Duplicate withdrawal handling | What evidence identifies duplicates and prevents unsupported closure? | Reconciliation evidence; audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No duplicate withdrawal handling evidence | No duplicate handling is approved. |
| Unresolved withdrawal handling | What evidence keeps unresolved states visible until resolved? | Reconciliation evidence; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No unresolved withdrawal handling evidence | No unresolved handling is approved. |
| Ambiguous withdrawal-state handling | What happens when custody, rail, settlement, support, and reconciliation evidence disagree? | Reconciliation evidence; support / incident evidence; settlement / finality evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No ambiguous withdrawal-state evidence | No source-of-truth hierarchy is approved. |
| Liquidity shortfall handling | What evidence identifies shortfall and constrains response? | Liquidity evidence; external legal / compliance review; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No liquidity shortfall handling evidence | No shortfall handling is approved. |
| Provider outage handling | What evidence identifies provider outage and user-facing constraints? | Vendor / provider confirmation; support / incident evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No provider outage evidence | No outage handling is approved. |
| Rail outage handling | What evidence identifies rail outage and dependency effects? | Rail evidence; vendor / provider confirmation; support / incident evidence | Question framed / Missing | Review date required before downstream use | No rail outage handling evidence | No rail outage handling is approved. |
| Custody provider outage handling | What evidence identifies custody provider outage and control limits? | Custody evidence; vendor / provider confirmation; support / incident evidence | Question framed / Missing | Review date required before downstream use | No custody provider outage handling evidence | No custody outage handling is approved. |
| Support escalation dependency | What support evidence is required before communication or closure? | Support / incident evidence; external legal / compliance review where applicable; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No support / dispute handling evidence | No support closure is approved. |
| Incident response dependency | What incident evidence is required for withdrawal-sensitive events? | Support / incident evidence; audit evidence; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No incident response evidence | No incident process is approved. |
| Reconciliation matching dependency | What matching evidence is required before state or closure claims? | Reconciliation evidence; audit evidence; vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No reconciliation matching evidence | No reconciliation operation is approved. |
| Audit receipt dependency | What receipts must be retained for requests, reviews, failures, pauses, and decisions? | Audit evidence; vendor / provider documentation; external legal / compliance review where applicable | Question framed / Missing | Review date required before downstream use | No audit / retention evidence | No audit operation is approved. |
| User disclosure requirements | What must users be told about liquidity, withdrawal, pause, and unresolved states? | External legal / compliance review; Trust UX evidence; support / incident evidence | Question framed / Missing | Dated review required before downstream use | No disclosure review | No disclosure is approved. |
| Withdrawal claim constraints | What claims are prohibited without accepted evidence? | External legal / compliance review; Trust UX evidence; support / incident evidence | Question framed / Missing | Dated review required before downstream use | No withdrawal claim evidence | No withdrawal claim is approved. |
| Solvency claim constraints | What claims around solvency, reserves, reliability, and liquidity are prohibited? | External legal / compliance review; liquidity evidence; audit evidence | Question framed / Missing | Dated qualified review required before downstream use | No solvency evidence | No solvency claim is approved. |
| Legal / compliance review requirements | Which liquidity / withdrawal questions require qualified review? | External legal / compliance review | Question framed / Missing | Dated qualified review required before downstream use | No legal / compliance review | No legal conclusion is accepted. |
| ADR dependency for liquidity / withdrawal authority | Which liquidity / withdrawal decisions require accepted ADRs before implementation consideration? | Repo governance artifact; accepted ADR where future review creates one; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No accepted Class B ADRs; no implementation-specific §7a brief | No ADR is drafted, accepted, or made ready. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, withdrawal-ready, liquidity-ready, reserve-ready, treasury-ready, solvency-ready, or Class B ready.

## 6. Open liquidity / withdrawal control questions

Answers must come from qualified legal / compliance review, vendor / provider evidence, custody evidence, rail evidence, settlement / finality evidence, stablecoin / conversion evidence, fee / FX / spread evidence, reconciliation evidence, support evidence, audit evidence, and future governed acceptance where applicable, not this package.

### Withdrawal path and readiness

- [ ] What withdrawal path is being considered?
- [ ] Which custody, rail, stablecoin, redemption, FX, fee, and settlement dependencies apply?
- [ ] What evidence is required before a withdrawal can be described as requested, pending, delayed, failed, reversed, disputed, completed, or final?
- [ ] What states must never be collapsed into "available" or "completed" by default?

### Available-to-withdraw boundary

- [ ] What does "available to withdraw" mean?
- [ ] What evidence proves availability?
- [ ] Is availability based on custody state, rail state, stablecoin state, liquidity state, settlement state, reconciliation state, or operator review?
- [ ] What must not be presented as available-to-withdraw truth?

### Liquidity buffers and reserves

- [ ] What liquidity buffer assumptions are being considered?
- [ ] What reserve logic would be required?
- [ ] Who owns reserve monitoring?
- [ ] What evidence proves buffer state?
- [ ] What claims around solvency, access, reserve sufficiency, or withdrawal reliability are prohibited without accepted evidence?

### Treasury and liquidity operations

- [ ] Would future withdrawals require treasury operations?
- [ ] Which treasury actions are manual, blocked, or out of scope?
- [ ] Who can initiate, review, approve, pause, or reject treasury actions?
- [ ] What evidence is required before any treasury dependency can be assessed?

### Stress, pause, and kill criteria

- [ ] What triggers pause?
- [ ] What triggers no-new-deposit posture?
- [ ] What triggers withdrawal priority?
- [ ] What triggers full halt or kill criteria?
- [ ] What evidence is required before resuming?
- [ ] Who owns pause, resume, and halt decisions?

### Delayed, failed, blocked, disputed, and unresolved withdrawals

- [ ] What evidence proves a delayed withdrawal?
- [ ] What evidence proves a failed withdrawal?
- [ ] What evidence proves a reversed or disputed withdrawal?
- [ ] What happens when rail, custody, stablecoin, settlement, support, and reconciliation evidence disagree?
- [ ] What requires escalation, incident response, governance review, or customer communication?

### Support, Trust UX, and disclosure

- [ ] What may Hedgr say about withdrawal availability?
- [ ] What may support say during pending, delayed, failed, reversed, disputed, blocked, or unresolved withdrawals?
- [ ] What claims are prohibited around "withdraw anytime," "guaranteed," "safe," "available," "completed," "settled," "instant," and "fully liquid"?
- [ ] What may Copilot explain or avoid?

### Audit, reconciliation, and source-of-truth

- [ ] What audit evidence must be retained for withdrawal requests, reviews, failures, reversals, disputes, pauses, resumes, and kill decisions?
- [ ] What reconciliation evidence must exist before support closure?
- [ ] Which evidence source wins if records conflict?
- [ ] What future ADR may be required for liquidity / withdrawal authority or ledger truth?

## 7. Withdrawal readiness template

| Readiness area | What must be proven | Evidence required | What it must not prove by itself | Status |
|---|---|---|---|---|
| User eligibility | TBD | TBD | Must not prove withdrawal approval or customer-money authority. | Question framed / Missing |
| KYC / AML state | TBD | TBD | Must not prove legal sufficiency, withdrawal readiness, or rail permission by itself. | Question framed / Missing |
| Custody state | TBD | TBD | Must not prove rail readiness, settlement finality, or ledger truth by itself. | Question framed / Missing |
| Stablecoin / conversion state | TBD | TBD | Must not prove redemption availability, liquidity sufficiency, or withdrawal completion by itself. | Question framed / Missing |
| Redemption state | TBD | TBD | Must not prove withdrawal readiness, final amount truth, or settlement finality by itself. | Question framed / Missing |
| Rail permission | TBD | TBD | Must not prove rail availability, settlement finality, or customer-money authority by itself. | Question framed / Missing |
| Rail availability | TBD | TBD | Must not prove legal permission, finality, or liquidity sufficiency by itself. | Question framed / Missing |
| Settlement / finality | TBD | TBD | Must not prove ledger truth, accounting truth, or support closure by itself. | Question framed / Missing |
| Fee / FX / final amount | TBD | TBD | Must not prove withdrawal readiness, finality, or solvency by itself. | Question framed / Missing |
| Liquidity buffer | TBD | TBD | Must not prove solvency, reserve sufficiency, or withdrawal approval by itself. | Question framed / Missing |
| Treasury action | TBD | TBD | Must not prove operation approval, customer-money movement authority, or reserve policy approval by itself. | Question framed / Missing |
| Reconciliation match | TBD | TBD | Must not prove ledger truth, accounting truth, or legal closure by itself. | Question framed / Missing |
| Support state | TBD | TBD | Must not prove withdrawal truth, finality, or closure by itself. | Question framed / Missing |
| Audit receipt | TBD | TBD | Must not prove ledger truth, accounting truth, finality, or evidence acceptance by itself. | Question framed / Missing |
| Governance approval | TBD | TBD | Must not prove legal approval, vendor permission, or operational evidence by itself. | Question framed / Missing |

This template does not approve withdrawal readiness, available-to-withdraw claims, transaction processing, support closure, ledger truth, or customer-money movement.

## 8. Liquidity buffer / reserve assumption template

| Control area | Requirement to define | Evidence required | Owner placeholder | User-facing constraint | Status |
|---|---|---|---|---|---|
| Buffer policy | TBD | TBD | TBD | Must not imply liquidity approval. | Question framed / Missing |
| Reserve calculation | TBD | TBD | TBD | Must not imply solvency proof. | Question framed / Missing |
| Reserve location | TBD | TBD | TBD | Must not imply custody or treasury approval. | Question framed / Missing |
| Reserve asset type | TBD | TBD | TBD | Must not imply reserve policy approval. | Question framed / Missing |
| Reserve monitoring | TBD | TBD | TBD | Must not imply live monitoring or operational authority. | Question framed / Missing |
| Stress threshold | TBD | TBD | TBD | Must not imply threshold approval. | Question framed / Missing |
| Pause threshold | TBD | TBD | TBD | Must not imply pause authority. | Question framed / Missing |
| Withdrawal priority threshold | TBD | TBD | TBD | Must not imply priority-rule approval. | Question framed / Missing |
| No-new-deposit threshold | TBD | TBD | TBD | Must not imply deposit or no-new-deposit policy approval. | Question framed / Missing |
| Kill threshold | TBD | TBD | TBD | Must not imply kill authority. | Question framed / Missing |
| Treasury action threshold | TBD | TBD | TBD | Must not imply treasury operation approval. | Question framed / Missing |
| Resume threshold | TBD | TBD | TBD | Must not imply resume authority. | Question framed / Missing |
| Post-incident review | TBD | TBD | TBD | Must not imply incident closure or support closure. | Question framed / Missing |

This template does not approve liquidity buffers, reserve policy, treasury operations, solvency claims, withdrawal priority, pause controls, or customer-money authority.

## 9. Withdrawal state / exception template

| Withdrawal state / exception | Evidence conflict or requirement | Required review owner | User-facing constraint | Escalation / pause relevance | Status |
|---|---|---|---|---|---|
| Withdrawal requested | TBD | TBD | Must not imply approval, processing, or availability. | TBD | Question framed / Missing |
| Withdrawal pending review | TBD | TBD | Must not imply approval or completion. | TBD | Question framed / Missing |
| Withdrawal pending custody action | TBD | TBD | Must not imply custody release or finality. | TBD | Question framed / Missing |
| Withdrawal pending rail action | TBD | TBD | Must not imply rail availability or settlement. | TBD | Question framed / Missing |
| Withdrawal pending treasury action | TBD | TBD | Must not imply treasury approval or customer-money movement. | TBD | Question framed / Missing |
| Withdrawal delayed | TBD | TBD | Must not imply guaranteed timing or harmless delay. | TBD | Question framed / Missing |
| Withdrawal failed | TBD | TBD | Must not imply reversal, restoration, or closure without evidence. | TBD | Question framed / Missing |
| Withdrawal blocked | TBD | TBD | Must not imply user fault or guaranteed resolution. | TBD | Question framed / Missing |
| Withdrawal reversed | TBD | TBD | Must not imply all failures can reverse or are resolved. | TBD | Question framed / Missing |
| Withdrawal disputed | TBD | TBD | Must not imply outcome or support closure. | TBD | Question framed / Missing |
| Duplicate withdrawal | TBD | TBD | Must not imply duplication has been resolved. | TBD | Question framed / Missing |
| Withdrawal finality missing | TBD | TBD | Must not imply completed, settled, or final. | TBD | Question framed / Missing |
| Withdrawal amount mismatch | TBD | TBD | Must not imply final amount truth. | TBD | Question framed / Missing |
| Liquidity buffer breach | TBD | TBD | Must not imply normal availability. | TBD | Question framed / Missing |
| Reserve evidence missing | TBD | TBD | Must not imply solvency, reserve sufficiency, or withdrawal reliability. | TBD | Question framed / Missing |
| Rail outage | TBD | TBD | Must not imply fallback availability. | TBD | Question framed / Missing |
| Custody provider outage | TBD | TBD | Must not imply Hedgr can override provider constraints. | TBD | Question framed / Missing |
| Stablecoin redemption unavailable | TBD | TBD | Must not imply redemption can proceed or withdrawal is available. | TBD | Question framed / Missing |
| Unresolved withdrawal state | TBD | TBD | Must keep unresolved state visible and not collapse it into pending, failed, completed, or available. | TBD | Question framed / Missing |

This template does not approve exception handling, dispute handling, reversal handling, support closure, reconciliation closure, withdrawal processing, or operational authority.

## 10. Pause / stress / kill criteria template

| Trigger | Evidence required | Required action to define | Authority owner placeholder | Resume condition | Status |
|---|---|---|---|---|---|
| Liquidity buffer breach | TBD | TBD | TBD | TBD | Question framed / Missing |
| Reserve evidence missing | TBD | TBD | TBD | TBD | Question framed / Missing |
| Withdrawal failure threshold | TBD | TBD | TBD | TBD | Question framed / Missing |
| Withdrawal delay threshold | TBD | TBD | TBD | TBD | Question framed / Missing |
| Rail outage | TBD | TBD | TBD | TBD | Question framed / Missing |
| Custody outage | TBD | TBD | TBD | TBD | Question framed / Missing |
| Stablecoin instability | TBD | TBD | TBD | TBD | Question framed / Missing |
| Redemption unavailable | TBD | TBD | TBD | TBD | Question framed / Missing |
| Settlement / finality evidence missing | TBD | TBD | TBD | TBD | Question framed / Missing |
| Reconciliation mismatch | TBD | TBD | TBD | TBD | Question framed / Missing |
| Support backlog threshold | TBD | TBD | TBD | TBD | Question framed / Missing |
| Suspicious activity / compliance hold | TBD | TBD | TBD | TBD | Question framed / Missing |
| Unauthorized withdrawal claim | TBD | TBD | TBD | TBD | Question framed / Missing |
| Unauthorized liquidity claim | TBD | TBD | TBD | TBD | Question framed / Missing |
| Unresolved customer-money state | TBD | TBD | TBD | TBD | Question framed / Missing |

This template does not approve thresholds, pause authority, kill authority, resume authority, treasury operations, or customer-money movement.

## 11. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Withdrawal readiness evidence | External legal / compliance review; custody evidence; rail evidence; settlement / finality evidence; reconciliation evidence | Product intent; UI state; founder assumption | Readiness requires dated, attributable evidence before downstream use. |
| Available-to-withdraw evidence | Custody evidence; rail evidence; liquidity evidence; settlement / finality evidence; reconciliation evidence | UI state; support state; internal analysis alone | Availability must not become shadow ledger truth. |
| Liquidity buffer evidence | Liquidity evidence; qualified review; audit evidence where applicable | Buffer concept; reserve theory; product doctrine alone | Buffer evidence is not liquidity approval by itself. |
| Reserve evidence | Qualified legal / compliance review where claims are implicated; treasury / liquidity evidence; audit evidence | Reserve theory; founder assumption; internal analysis alone | Reserve evidence is not solvency evidence unless specifically reviewed and accepted. |
| Treasury dependency evidence | Treasury / liquidity evidence; audit evidence; external legal / compliance review where applicable | Internal analysis alone; product intent | No treasury operation is approved by this package. |
| Redemption evidence | Stablecoin / conversion evidence; vendor / provider documentation; vendor / provider confirmation; settlement / finality evidence | Stablecoin intent; sandbox evidence | Redemption evidence must distinguish public documentation from explicit confirmation. |
| Custody release evidence | Custody evidence; vendor / provider confirmation; audit evidence | UI state; support note; internal assumption | Custody release evidence is not ledger truth by itself. |
| Rail withdrawal evidence | Rail evidence; vendor / provider documentation; vendor / provider confirmation | Generic rail capability; public marketing page alone | Rail evidence must distinguish capability from permission. |
| Settlement / finality evidence | Settlement / finality evidence; reconciliation evidence; audit evidence | Support state; internal analysis; incomplete rail status | Finality evidence is not accounting truth unless separately accepted. |
| Fee / FX / final amount evidence | Fee / FX / spread evidence; settlement / finality evidence; reconciliation evidence; audit evidence | Estimate; stale quote; UI display | Final amount claims require reviewed evidence. |
| Stress / pause evidence | Liquidity evidence; support / incident evidence; reconciliation evidence; audit evidence | Informal concern; roadmap intent | Stress and pause thresholds are not approved here. |
| Kill criteria evidence | Qualified review where applicable; support / incident evidence; liquidity evidence; audit evidence | Founder assumption; internal analysis alone | Kill criteria require separate governed acceptance. |
| Support escalation evidence | Support / incident evidence; external legal / compliance review where applicable; reconciliation evidence | Support state alone; support reassurance | Support closure is not withdrawal truth. |
| Reconciliation evidence | Reconciliation evidence; vendor / provider documentation; audit evidence | Audit receipt alone; UI state | Reconciliation evidence is not ledger or accounting truth by itself. |
| Audit receipt evidence | Audit evidence; vendor / provider documentation; access-control evidence | Audit receipt alone as final truth | Audit receipt is not ledger truth. |
| Legal / disclosure review | Dated, attributable qualified legal / compliance review | Internal analysis; doctrine; product intent | Required before downstream use where withdrawal, solvency, disclosure, or customer-claim risk is implicated. |

- Founder assumption is not liquidity / withdrawal evidence.
- Repo doctrine is not withdrawal approval.
- Internal analysis is not legal, provider, custody, rail, settlement, liquidity, or treasury evidence.
- Product intent is not withdrawal readiness.
- UI state is not available-to-withdraw truth.
- Support state is not withdrawal truth.
- Audit receipt is not ledger truth.
- Sandbox withdrawal evidence is not live withdrawal evidence.
- Reserve theory is not solvency evidence.
- Liquidity buffer concept is not liquidity approval.
- Legal / compliance review must be dated and attributable to qualified review before downstream use where withdrawal, solvency, disclosure, or customer-claim risk is implicated.
- Vendor / provider responsibility evidence must distinguish public documentation from explicit confirmation.

## 12. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction selection evidence package | Unresolved / Evidence missing | Legal / compliance review; withdrawal claims; customer eligibility |
| No legal / compliance review | Legal / compliance evidence package | Unresolved / Evidence missing | Legal conclusions; disclosure; solvency and withdrawal claims |
| No customer eligibility policy | Customer eligibility evidence package | Unresolved / Evidence missing | Participant limits; withdrawal review; support constraints |
| No KYC / AML owner | KYC / AML responsibility evidence package | Unresolved / Evidence missing | Compliance holds; blocked withdrawals; support escalation |
| No custody model selected | Custody provider / model evidence package | Unresolved / Evidence missing | Custody release evidence; withdrawal path; Trust UX |
| No rail selected or approved | Rail / vendor permission evidence package | Unresolved / Evidence missing | Rail withdrawal evidence; settlement review; support states |
| No rail permission evidence | Rail / vendor permission evidence package | Unresolved / Evidence missing | Vendor use; rail availability claims; withdrawal path |
| No settlement / finality evidence | Rail settlement / finality evidence package | Unresolved / Evidence missing | Completion, finality, support closure, reconciliation |
| No stablecoin / conversion evidence | Stablecoin / conversion evidence package | Unresolved / Evidence missing | Redemption, liquidity, conversion, withdrawal path |
| No fee / FX / spread evidence | Fee / FX / spread evidence package | Unresolved / Evidence missing | Final amount, pricing claims, disclosure, disputes |
| No withdrawal path evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Withdrawal readiness; Pilot Ops; Trust UX |
| No available-to-withdraw boundary evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Availability claims; support wording; Copilot constraints |
| No liquidity buffer policy | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Withdrawal reliability; stress controls; pilot review |
| No reserve policy evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Solvency claims; reserve claims; treasury review |
| No treasury dependency evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Treasury review; pause / resume; withdrawal processing |
| No withdrawal priority evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Priority rules; stress response; support constraints |
| No stress / pause evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Pause posture; incident response; Trust UX |
| No kill criteria evidence | Liquidity / withdrawal control evidence package | Unresolved / Evidence missing | Halt posture; governance review; rollback planning |
| No delayed / failed / unresolved withdrawal handling evidence | Liquidity / withdrawal control evidence package; Support / dispute evidence package; Reconciliation evidence package | Unresolved / Evidence missing | Support closure; reconciliation closure; user-state claims |
| No support / dispute handling evidence | Support / dispute evidence package | Unresolved / Evidence missing | Support responses; disputes; incident routing |
| No reconciliation matching evidence | Reconciliation evidence package | Unresolved / Evidence missing | Source-of-truth boundaries; closure; audit review |
| No audit / retention evidence | Audit / retention / access-control evidence package | Unresolved / Evidence missing | Evidence preservation; post-incident review; retention |
| No accepted liquidity / withdrawal ADR | ADR drafting readiness evidence package | Unresolved / Evidence missing | Liquidity / withdrawal authority; ledger truth; implementation preflight |
| No implementation-specific §7a brief | Implementation-proposal preflight evidence package | Unresolved / Evidence missing | Implementation proposal, §7 activation, and §7a execution brief |

No blocker in this package is closed.

## 13. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Withdrawal path | Path dependency can change with custody, rail, stablecoin, or treasury assumptions. | Review date required before downstream use. | Any path, vendor, rail, custody, or jurisdiction change. |
| Available-to-withdraw boundary | Availability meaning can drift into customer-money claims. | Dated legal / compliance and evidence review required. | Any user-facing availability wording or state change. |
| Liquidity buffer assumptions | Buffer assumptions can become stale as exposure, volatility, or provider conditions change. | Review date required before downstream use. | Any exposure, reserve, treasury, or market-stress assumption change. |
| Reserve assumptions | Reserve location, calculation, and asset assumptions can affect solvency claims. | Dated qualified review required before downstream use. | Any reserve method, asset type, location, or claim change. |
| Treasury dependency | Treasury roles and manual controls can change operational risk. | Review date required before downstream use. | Any treasury action, owner, threshold, or control change. |
| Rail withdrawal evidence | Rail availability, permissions, and statuses can change. | Dated provider / rail review required before downstream use. | Any rail, vendor, environment, or permission change. |
| Custody release evidence | Custody states and provider responsibility can change. | Dated custody evidence review required before downstream use. | Any custody provider, model, responsibility, or outage change. |
| Stablecoin / redemption evidence | Stablecoin and redemption evidence can become stale with provider or market changes. | Review date required before downstream use. | Any stablecoin, conversion, redemption, or provider change. |
| Settlement / finality evidence | Settlement and finality rules can change by rail or provider. | Review date required before downstream use. | Any rail, settlement, finality, or reconciliation change. |
| Fee / FX / final amount evidence | Quote, fee, spread, and amount evidence can become stale quickly. | Review date required before downstream use. | Any rate source, fee, spread, quote, or final-amount logic change. |
| Stress / pause triggers | Stress criteria can become stale with exposure or operations. | Review date required before downstream use. | Any stress, threshold, incident, or liquidity assumption change. |
| Kill criteria | Halt criteria require current governance and operational evidence. | Review date required before downstream use. | Any incident, threshold, governance, or operational owner change. |
| Support / dispute handling | Support constraints can drift from evidence truth. | Review date required before downstream use. | Any support path, dispute process, or user messaging change. |
| Reconciliation evidence | Matching and source-of-truth boundaries can change with systems or providers. | Review date required before downstream use. | Any record source, reconciliation process, or closure rule change. |
| Audit / retention evidence | Retention and receipt requirements can change with legal or operational review. | Review date required before downstream use. | Any record type, access, retention, or legal requirement change. |
| Trust UX / disclosure constraints | Customer-facing wording can create unsupported claims. | Dated legal / compliance and Trust UX review required. | Any public, product, support, or Copilot wording change. |
| Legal / compliance review | Legal and disclosure positions are jurisdiction and fact dependent. | Dated, attributable qualified review required before downstream use. | Any jurisdiction, customer class, rail, custody, reserve, or withdrawal claim change. |

Freshness expectations are planning constraints only. They are not approved SLAs, withdrawal policy, liquidity policy, reserve policy, treasury policy, solvency claims, legal conclusions, provider approval, or customer-money permission.

## 14. Downstream dependency effect

- **Trust UX / disclosure evidence package:** Must not claim available to withdraw, withdraw anytime, instant, guaranteed, fully liquid, safe, completed, settled, or final without accepted evidence.
- **Pilot Ops evidence package:** Must reflect withdrawal owner, liquidity monitor, treasury dependency, manual review, pause, resume, kill criteria, support handoff, and escalation responsibilities.
- **Reconciliation evidence package:** Must map withdrawal evidence to custody state, rail state, stablecoin state, fee / FX state, liquidity state, support state, audit receipts, and source-of-truth boundaries.
- **Support / dispute evidence package:** Must define support constraints around pending, delayed, failed, reversed, disputed, blocked, duplicate, liquidity-constrained, and unresolved withdrawal states.
- **Audit / retention evidence package:** Must capture withdrawal requests, review outcomes, liquidity checks, pause decisions, kill decisions, support evidence, reconciliation evidence, and retention requirements.
- **ADR drafting readiness:** Cannot proceed for liquidity / withdrawal-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** Cannot treat liquidity / withdrawal control questions as closed without accepted evidence.

## 15. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Liquidity / withdrawal control evidence package |
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
| Non-authorization note | Evidence intake does not approve withdrawals, liquidity buffers, reserve policy, treasury operations, solvency claims, Class B execution, implementation, or customer-money movement. |

## 16. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the liquidity / withdrawal control package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, withdrawal-ready, liquidity-ready, reserve-ready, treasury-ready, solvency-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 17. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify liquidity / withdrawal control evidence and does not approve withdrawals, withdrawal readiness, available-to-withdraw claims, liquidity buffers, reserve policy, solvency claims, withdrawal priority rules, pause controls, kill criteria, treasury operations, redemption operations, custody operations, rail operations, settlement finality, ledger truth, accounting truth, support closure, external engagement, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future liquidity / withdrawal evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, custody evidence review, rail / vendor permission evidence review, settlement / finality evidence review, stablecoin / conversion evidence review, fee / FX / spread evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
