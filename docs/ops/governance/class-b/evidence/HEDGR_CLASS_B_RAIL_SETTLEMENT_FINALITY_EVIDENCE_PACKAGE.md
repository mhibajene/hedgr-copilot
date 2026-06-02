# HEDGR - Class B Rail Settlement / Finality Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001` through `EVID-B-008`, future qualified legal / compliance review, and future vendor / partner evidence where applicable.

**Scope:** Defines required rail settlement / finality evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, settlement approval, finality approval, ledger approval, reconciliation approval, support closure approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve settlement finality, rail finality, ledger truth, accounting truth, source-of-truth boundaries, rail operations, transaction processing, deposit completion, withdrawal completion, conversion completion, redemption completion, reconciliation operations, support closure, customer-visible completion claims, external engagement, Class B execution, implementation, staging, live operations, deposits, withdrawals, custody, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

This package does not provide legal advice or claim regulatory approval.

## 2. Purpose

This package exists to instantiate the rail settlement / finality evidence package from the evidence gathering plan and registry.

It answers:

**What rail settlement / finality evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Which rail events are final, settled, completed, ledger-valid, or safe to expose as customer-money truth?**

It does not create:

- settlement approval
- finality approval
- rail operation approval
- deposit completion approval
- withdrawal completion approval
- conversion completion approval
- redemption completion approval
- ledger truth approval
- accounting truth approval
- reconciliation approval
- support closure approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_VENDOR_PERMISSION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTODY_PROVIDER_MODEL_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define rail settlement / finality evidence requirements only. They do not create settlement approval, finality approval, ledger truth, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Rail settlement / finality evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | Vendor / provider documentation or confirmation where applicable; external legal / compliance review where applicable; reconciliation evidence and audit evidence where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no custody model selected; no rail selected or approved; no rail permission evidence; no vendor / partner responsibility evidence; no settlement / finality evidence; no reconciliation process; no support / dispute process; no audit / retention policy; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future settlement / finality assessment; stablecoin / conversion evidence package; fee / FX / spread evidence package; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, settlement-ready, finality-ready, reconciliation-ready, support-ready, ledger-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Rail event taxonomy | What rail events may exist? | Internal analysis may frame; vendor / provider documentation and confirmation required for downstream significance | Question framed / Missing | Review date required before downstream use | No rail event taxonomy | No rail event is approved. |
| Settlement-state taxonomy | What states may indicate settlement, non-settlement, or partial settlement? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No settlement state is approved. |
| Finality-state taxonomy | What states may indicate finality, reversibility, or unresolved finality? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No finality-state taxonomy | No finality state is approved. |
| Deposit settlement evidence | What proves deposit settlement? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No deposit settlement evidence | No deposit completion claim is approved. |
| Withdrawal settlement evidence | What proves withdrawal settlement? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No withdrawal settlement evidence | No withdrawal completion claim is approved. |
| Conversion settlement evidence | What proves conversion settlement? | Vendor / provider documentation; vendor / provider confirmation; custody evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No conversion / redemption settlement evidence | No conversion completion claim is approved. |
| Redemption settlement evidence | What proves redemption settlement? | Vendor / provider documentation; vendor / provider confirmation; custody evidence; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No conversion / redemption settlement evidence | No redemption completion claim is approved. |
| Custody-state dependency | How does custody state constrain settlement or finality evidence? | Custody evidence; vendor / provider documentation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No custody-state dependency evidence | No custody state is selected or approved. |
| Rail-state dependency | How does rail state constrain custody, support, reconciliation, UI, ledger, and audit states? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No rail selected or approved | No rail state is approved. |
| Vendor / partner event evidence | What vendor or partner event evidence must be preserved? | Vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No vendor / partner responsibility evidence | Marketing material is not enough by itself. |
| Provider confirmation evidence | Which confirmations must come directly from provider sources? | Vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No provider confirmation evidence | No provider confirmation has been received or accepted. |
| Settlement timestamp evidence | What timestamp proves settlement, and whose clock/source controls it? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No timestamp source is approved. |
| Finality timestamp evidence | What timestamp proves finality, and what evidence layer owns it? | Vendor / provider confirmation; external legal / compliance review; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No settlement / finality evidence | No finality timestamp source is approved. |
| Pending-state evidence | What proves an event remains pending? | Vendor / provider documentation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No rail event taxonomy | Pending is not completion. |
| Delayed-state evidence | What proves delay and required review or escalation? | Vendor / provider documentation; vendor / provider confirmation; support / incident evidence | Question framed / Missing | Review date required before downstream use | No duplicate / reversal / dispute evidence | No delay rule is approved. |
| Failed-state evidence | What proves failure and correction requirements? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No duplicate / reversal / dispute evidence | No failure rule is approved. |
| Reversed-state evidence | What proves reversal and the correction path? | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No duplicate / reversal / dispute evidence | No reversal handling is approved. |
| Duplicate-event evidence | How are duplicate events detected and evidenced? | Vendor / provider documentation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No duplicate / reversal / dispute evidence | No duplicate handling is approved. |
| Disputed-event evidence | What proves dispute state, owner, and resolution boundary? | Vendor / provider documentation; support / incident evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No support / dispute process | No dispute operation is approved. |
| Blocked-event evidence | What proves blocked state and pause criteria? | Vendor / provider documentation; external legal / compliance review; support / incident evidence | Question framed / Missing | Review date required before downstream use | No support / dispute process | No block handling is approved. |
| Unresolved-state evidence | What proves unresolved state and required governance review? | Reconciliation evidence; audit evidence; support / incident evidence | Question framed / Missing | Review date required before downstream use | No source-of-truth boundary evidence | No unresolved-state closure is approved. |
| Ambiguous-state evidence | What evidence must exist when sources conflict or are ambiguous? | Reconciliation evidence; audit evidence; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No source-of-truth boundary evidence | Ambiguity must not be collapsed into completion. |
| Timeout / stale-state evidence | When does an event become stale and require review? | Vendor / provider documentation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No finality-state taxonomy | No timeout rule is approved. |
| Reconciliation matching rule evidence | What evidence supports matching and exception closure? | Reconciliation evidence; audit evidence; vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No reconciliation matching evidence | No reconciliation operation is approved. |
| Source-of-truth boundary evidence | Which evidence source wins when states disagree? | External legal / compliance review; reconciliation evidence; accepted ADR where future review creates one | Question framed / Missing | Review date required before downstream use | No source-of-truth boundary evidence | No source of truth is selected. |
| Ledger / accounting truth dependency | What future ADR or evidence is required before ledger or accounting truth can be assigned? | Accepted ADR where future review creates one; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No ledger / accounting truth ADR | No ledger or accounting truth is approved. |
| Support closure dependency | What evidence is required before support can close an event? | Support / incident evidence; reconciliation evidence; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No support closure evidence | No support closure rule is approved. |
| User-visible state dependency | What evidence is required before user-facing state wording? | Trust UX evidence; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No user-visible state dependency | No UI label is approved. |
| Audit receipt dependency | What records must be preserved for each event and state? | Audit evidence; vendor / provider documentation; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No audit receipt evidence | No audit operation is approved. |
| Incident / escalation dependency | What requires incident handling, pause, or escalation? | Support / incident evidence; external legal / compliance review; reconciliation evidence | Question framed / Missing | Review date required before downstream use | No incident / escalation dependency | No incident workflow is approved. |
| Rollback / correction evidence | What proves correction, rollback, or remediation? | Vendor / provider confirmation; reconciliation evidence; audit evidence | Question framed / Missing | Review date required before downstream use | No duplicate / reversal / dispute evidence | No correction operation is approved. |
| Legal / compliance review requirements | Which settlement / finality issues require qualified review? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No legal / compliance review | No legal conclusion is accepted. |
| ADR dependency for settlement / finality boundary | Which settlement / finality decisions require accepted ADRs before implementation consideration? | Repo governance artifact; accepted ADR where future review creates one; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No accepted Class B ADRs; no implementation-specific §7a brief | No ADR is drafted, accepted, or made ready. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, settled, final, ledger-ready, reconciliation-ready, or Class B ready.

## 6. Open settlement / finality questions

Answers must come from vendor / provider evidence, qualified legal / compliance review, future governed acceptance, reconciliation evidence, and audit evidence where applicable, not this package.

### Rail event and state taxonomy

- [ ] What rail events may exist?
- [ ] Which states are initiated, pending, delayed, failed, reversed, duplicate, disputed, blocked, unresolved, completed, or final?
- [ ] What distinguishes rail state from custody state, support state, reconciliation state, UI state, ledger state, and audit state?
- [ ] What states must never be collapsed into "complete" by default?

### Settlement evidence

- [ ] What evidence proves settlement for each rail or pathway?
- [ ] Who provides settlement evidence?
- [ ] Is settlement evidence vendor-provided, provider-provided, rail-provided, custody-provided, bank-provided, chain-provided, internal-review-provided, or reconciliation-derived?
- [ ] What evidence is insufficient by itself?

### Finality evidence

- [ ] What evidence proves finality?
- [ ] Is finality legal, operational, rail-level, custody-level, chain-level, bank-level, vendor-level, or reconciliation-level?
- [ ] Can an event be settled but not final?
- [ ] Can an event be visible to support but not final?
- [ ] Can an event be final on one evidence layer but unresolved on another?

### Deposit and withdrawal dependency

- [ ] What proves a deposit is complete?
- [ ] What proves a withdrawal is complete?
- [ ] What evidence is required before user-facing "completed" wording?
- [ ] What evidence is required before support closure?
- [ ] What evidence is required before reconciliation closure?

### Conversion and redemption dependency

- [ ] What proves stablecoin conversion completion?
- [ ] What proves redemption completion?
- [ ] What evidence proves FX, fee, spread, and settlement value?
- [ ] What happens if conversion state and rail state disagree?
- [ ] What happens if custody state and conversion state disagree?

### Reversal, duplicate, dispute, and unresolved states

- [ ] How are duplicate events detected?
- [ ] How are reversed or disputed events evidenced?
- [ ] What evidence proves correction?
- [ ] What happens when evidence is conflicting, stale, missing, or ambiguous?
- [ ] What requires escalation, pause, kill criteria, or governance review?

### Source-of-truth and ledger boundary

- [ ] Which evidence source wins when rail, custody, support, UI, audit, and reconciliation states disagree?
- [ ] What cannot become ledger truth?
- [ ] What future ADR may be required for ledger / accounting truth?
- [ ] What prevents support state or UI state from becoming accidental settlement truth?

### Trust UX and support closure

- [ ] What may the product say before settlement evidence exists?
- [ ] What may support say before finality evidence exists?
- [ ] What claims are prohibited around "complete," "arrived," "settled," "final," "reversed," "recovered," and "safe"?
- [ ] What Copilot explanations are allowed or prohibited near these states?

## 7. Rail event taxonomy template

| Event / state | Meaning to define | Evidence required | Evidence source class | User-visible constraint | Status |
|---|---|---|---|---|---|
| Not initiated | TBD | TBD | TBD | Must not imply transaction creation. | Question framed / Missing |
| Initiated | TBD | TBD | TBD | Must not imply settlement or finality. | Question framed / Missing |
| Pending rail action | TBD | TBD | TBD | Must not imply completion. | Question framed / Missing |
| Pending vendor action | TBD | TBD | TBD | Must not imply Hedgr control or completion. | Question framed / Missing |
| Pending custody action | TBD | TBD | TBD | Must not imply rail settlement. | Question framed / Missing |
| Pending reconciliation | TBD | TBD | TBD | Must not imply source-of-truth closure. | Question framed / Missing |
| Delayed | TBD | TBD | TBD | Must not imply normal completion timing. | Question framed / Missing |
| Failed | TBD | TBD | TBD | Must not imply correction or recovery. | Question framed / Missing |
| Reversed | TBD | TBD | TBD | Must not imply resolved customer-money state. | Question framed / Missing |
| Duplicate | TBD | TBD | TBD | Must not imply ignored or corrected by default. | Question framed / Missing |
| Disputed | TBD | TBD | TBD | Must not imply legal or support closure. | Question framed / Missing |
| Blocked | TBD | TBD | TBD | Must not imply outcome certainty. | Question framed / Missing |
| Compliance hold | TBD | TBD | TBD | Must not imply approval or rejection. | Question framed / Missing |
| Timed out | TBD | TBD | TBD | Must not imply failure or reversal without evidence. | Question framed / Missing |
| Ambiguous | TBD | TBD | TBD | Must surface uncertainty. | Question framed / Missing |
| Unresolved | TBD | TBD | TBD | Must not imply closure. | Question framed / Missing |
| Settled | TBD | TBD | TBD | Must not be used until evidence and approval exist. | Question framed / Missing |
| Final | TBD | TBD | TBD | Must not be used until evidence and approval exist. | Question framed / Missing |
| Corrected | TBD | TBD | TBD | Must not imply customer remedy without evidence. | Question framed / Missing |
| Closed after review | TBD | TBD | TBD | Must not imply ledger truth without separate authority. | Question framed / Missing |

This template does not approve rail states, transaction states, UI labels, ledger truth, reconciliation operations, support closure, or customer-money movement.

## 8. Settlement / finality evidence template

| Pathway | Settlement evidence required | Finality evidence required | Evidence owner placeholder | What evidence must not prove by itself | Status |
|---|---|---|---|---|---|
| Deposit rail | TBD | TBD | TBD | Deposit completion, ledger truth, or customer-money safety. | Question framed / Missing |
| Withdrawal rail | TBD | TBD | TBD | Withdrawal completion, liquidity approval, or support closure. | Question framed / Missing |
| Conversion pathway | TBD | TBD | TBD | Conversion completion, FX final value, or custody state. | Question framed / Missing |
| Redemption pathway | TBD | TBD | TBD | Redemption completion or withdrawal completion. | Question framed / Missing |
| Custody transition | TBD | TBD | TBD | Custody approval or asset-control truth. | Question framed / Missing |
| Stablecoin transfer | TBD | TBD | TBD | Stablecoin conversion approval or chain finality. | Question framed / Missing |
| Fee / FX settlement | TBD | TBD | TBD | Fee approval, spread approval, or accounting truth. | Question framed / Missing |
| Manual review correction | TBD | TBD | TBD | Operational approval or customer remedy. | Question framed / Missing |
| Reversal / refund path | TBD | TBD | TBD | Reversal handling approval or recovery guarantee. | Question framed / Missing |
| Dispute resolution path | TBD | TBD | TBD | Legal resolution, support closure, or finality. | Question framed / Missing |

This template defines evidence shape only. It does not approve settlement, finality, transaction processing, ledger truth, or customer-money movement.

## 9. Mismatch / reversal / dispute template

| Exception type | Evidence conflict | Required review owner | User-facing constraint | Escalation / pause relevance | Status |
|---|---|---|---|---|---|
| Rail says completed but custody missing | TBD | TBD | Must not say funds are fully available without custody evidence. | TBD | Question framed / Missing |
| Custody says released but rail missing | TBD | TBD | Must not say rail completion without rail evidence. | TBD | Question framed / Missing |
| Support says resolved but reconciliation missing | TBD | TBD | Must not present support state as transaction truth. | TBD | Question framed / Missing |
| UI says completed but finality missing | TBD | TBD | Must not let UI state become finality truth. | TBD | Question framed / Missing |
| Duplicate deposit event | TBD | TBD | Must not imply duplicate ignored or credited. | TBD | Question framed / Missing |
| Duplicate withdrawal event | TBD | TBD | Must not imply duplicate ignored or paid. | TBD | Question framed / Missing |
| Delayed settlement | TBD | TBD | Must avoid arrival, settled, or final claims. | TBD | Question framed / Missing |
| Failed settlement | TBD | TBD | Must avoid recovery or correction guarantees. | TBD | Question framed / Missing |
| Reversed event | TBD | TBD | Must avoid resolved or recovered claims without evidence. | TBD | Question framed / Missing |
| Disputed event | TBD | TBD | Must avoid legal or support closure claims. | TBD | Question framed / Missing |
| Missing vendor evidence | TBD | TBD | Must show uncertainty where user-visible. | TBD | Question framed / Missing |
| Conflicting timestamps | TBD | TBD | Must not pick a timestamp by inference. | TBD | Question framed / Missing |
| Stale status | TBD | TBD | Must not present stale state as current. | TBD | Question framed / Missing |
| Unresolved customer-money state | TBD | TBD | Must not claim completion, safety, or closure. | TBD | Question framed / Missing |

This template does not approve exception handling, reversal handling, dispute handling, support closure, reconciliation closure, or operational authority.

## 10. Source-of-truth boundary template

| Evidence layer | What it may prove | What it must not prove by itself | Related future ADR? | Status |
|---|---|---|---|---|
| User request | TBD | Transaction creation, settlement, or finality. | TBD | Question framed / Missing |
| UI state | TBD | Settlement truth, ledger truth, or support closure. | TBD | Question framed / Missing |
| Support state | TBD | Transaction truth, finality, or legal closure. | TBD | Question framed / Missing |
| Operator review state | TBD | Ledger truth or customer-money outcome. | TBD | Question framed / Missing |
| Rail / vendor event | TBD | Legal finality, custody state, or ledger truth. | TBD | Question framed / Missing |
| Custody state | TBD | Rail finality or reconciliation closure. | TBD | Question framed / Missing |
| Stablecoin / conversion state | TBD | Rail settlement or accounting truth. | TBD | Question framed / Missing |
| Fee / FX quote | TBD | Final settlement value or accounting truth. | TBD | Question framed / Missing |
| Settlement evidence | TBD | Finality, ledger truth, or support closure. | TBD | Question framed / Missing |
| Finality evidence | TBD | Legal conclusion or implementation authority. | TBD | Question framed / Missing |
| Reconciliation review | TBD | Ledger truth unless separately governed. | TBD | Question framed / Missing |
| Audit receipt | TBD | Ledger truth, retention approval, or operational approval. | TBD | Question framed / Missing |
| Ledger / accounting record | TBD | External settlement or finality by itself. | TBD | Question framed / Missing |
| Governance decision | TBD | Vendor evidence, legal approval, or customer-money movement. | TBD | Question framed / Missing |

This template does not select a source of truth, approve ledger semantics, or authorize reconciliation operations.

## 11. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Rail event evidence | Vendor / provider documentation; vendor / provider confirmation | Founder assumption; UI state | Public docs must clearly state the relevant event boundary. |
| Settlement evidence | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence | Internal analysis; sandbox evidence for live claims | Sandbox settlement evidence is not live settlement evidence. |
| Finality evidence | Vendor / provider confirmation; external legal / compliance review; reconciliation evidence | Repo doctrine; founder assumption | Legal / compliance review must be dated and attributable where legal finality or customer claim risk is implicated. |
| Vendor / provider status evidence | Vendor / provider documentation; vendor / provider confirmation | Vendor marketing pages | Public docs are not explicit confirmation unless specific. |
| Custody-state evidence | Custody evidence; vendor / provider confirmation; external legal / compliance review | UI state; support state | Custody evidence does not select a custody model. |
| Conversion-state evidence | Vendor / provider documentation; custody evidence; reconciliation evidence | Internal analysis | Conversion state is not rail finality. |
| Fee / FX settlement evidence | Vendor / provider documentation; vendor / provider confirmation; reconciliation evidence | Quote display; product copy | Quote evidence is not final value evidence by itself. |
| Reconciliation matching evidence | Reconciliation evidence; audit evidence | Support state; UI state | Reconciliation evidence is not ledger truth by itself. |
| Duplicate-event evidence | Vendor / provider documentation; reconciliation evidence; audit evidence | Operator assumption | Duplicate handling requires explicit evidence. |
| Reversal evidence | Vendor / provider confirmation; reconciliation evidence; audit evidence | Support note alone | Reversal evidence must not imply recovery by default. |
| Dispute evidence | Support / incident evidence; external legal / compliance review; vendor / provider confirmation | UI state; founder assumption | Dispute evidence is not legal resolution by itself. |
| Support closure evidence | Support / incident evidence; reconciliation evidence; external legal / compliance review | Support state alone | Support state is not transaction truth. |
| Audit receipt evidence | Audit evidence | Audit receipt alone as ledger truth | Audit receipt is not ledger truth. |
| Ledger / accounting boundary evidence | Accepted ADR where future review creates one; reconciliation evidence; external legal / compliance review | Repo doctrine alone; UI state | Internal analysis is not rail finality evidence. |

Founder assumption is not settlement evidence. Repo doctrine is not finality approval. Internal analysis is not rail finality evidence. UI state is not settlement truth. Support state is not transaction truth. Audit receipt is not ledger truth. Vendor marketing pages are not settlement evidence. Sandbox settlement evidence is not live settlement evidence. Public docs are not explicit vendor confirmation unless they clearly state the relevant responsibility or event boundary.

## 12. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction-specific settlement / finality implications | Unresolved / Evidence missing | Legal / compliance review; customer claims; rail review |
| No legal / compliance review | Qualified review of finality, reversibility, customer claims, and dispute obligations | Unresolved / Evidence missing | Finality claims; disclosures; ADR drafting readiness |
| No custody model selected | Custody-state dependency evidence | Unresolved / Evidence missing | Settlement / custody boundary; support; reconciliation |
| No rail selected or approved | Rail-specific event and settlement evidence | Unresolved / Evidence missing | Rail review; pathway templates; vendor evidence |
| No rail permission evidence | Permission and environment-state evidence | Unresolved / Evidence missing | Settlement review; customer-money claims |
| No vendor / partner responsibility evidence | Responsibility and event-source evidence | Unresolved / Evidence missing | Support; incident; reconciliation; audit |
| No settlement / finality evidence | Settlement and finality evidence package evidence | Unresolved / Evidence missing | Completion claims; Trust UX; support closure |
| No rail event taxonomy | Event taxonomy evidence | Unresolved / Evidence missing | UI status; reconciliation; support |
| No finality-state taxonomy | Finality state evidence | Unresolved / Evidence missing | Finality claims; ledger / accounting boundary |
| No deposit settlement evidence | Deposit pathway settlement evidence | Unresolved / Evidence missing | Deposit completion; support closure |
| No withdrawal settlement evidence | Withdrawal pathway settlement evidence | Unresolved / Evidence missing | Withdrawal completion; liquidity claims |
| No conversion / redemption settlement evidence | Conversion and redemption settlement evidence | Unresolved / Evidence missing | Stablecoin / conversion; fee / FX review |
| No custody-state dependency evidence | Custody state and evidence owner mapping | Unresolved / Evidence missing | Source-of-truth boundary; support closure |
| No reconciliation matching evidence | Matching, exception, and closure evidence | Unresolved / Evidence missing | Ledger truth review; audit; support |
| No duplicate / reversal / dispute evidence | Exception evidence and escalation path | Unresolved / Evidence missing | Support / dispute; Trust UX; operational review |
| No source-of-truth boundary evidence | Winning-source and conflict-resolution evidence | Unresolved / Evidence missing | Ledger / accounting ADR; reconciliation |
| No support closure evidence | Support closure dependency evidence | Unresolved / Evidence missing | Support operations; customer claims |
| No audit receipt evidence | Event, review, and exception receipt requirements | Unresolved / Evidence missing | Audit / retention review |
| No ledger / accounting truth ADR | Future ADR and evidence prerequisites | Unresolved / Evidence missing | Ledger truth; accounting semantics |
| No accepted rail / vendor ADR | Accepted decision where future review requires one | Unresolved / Evidence missing | ADR drafting readiness; implementation preflight |
| No implementation-specific §7a brief | Bounded future execution brief | Unresolved / Evidence missing | Implementation proposal; §7 activation |

No blocker in this package is closed.

## 13. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Rail event taxonomy | Vendor states and API/event semantics may change. | Review date required before downstream use. | Vendor docs, provider behavior, or pathway changes. |
| Settlement evidence | Settlement timing and evidence source may change. | Dated source pointer required before reliance. | New provider docs, terms, or operational model. |
| Finality evidence | Legal, rail, chain, bank, or vendor finality may change. | Qualified review and source date required where implicated. | Legal / compliance update or provider-state change. |
| Vendor / provider status evidence | Provider status semantics may change. | Dated provider source or confirmation required. | Documentation, API, or support policy change. |
| Custody-state dependency | Custody model and provider boundary may change. | Review after custody evidence changes. | Custody provider, model, or control-boundary change. |
| Conversion-state dependency | Conversion and redemption behavior may change. | Review before downstream use. | Conversion provider, stablecoin, fee, or rail change. |
| Fee / FX settlement evidence | Quote, spread, settlement value, and stale quote behavior may change. | Review before customer-facing or accounting-sensitive use. | Pricing model, vendor terms, or FX behavior change. |
| Reconciliation matching evidence | Matching and exception rules may change. | Review before reconciliation reliance. | Source-of-truth, rail, custody, or ledger change. |
| Duplicate / reversal / dispute evidence | Exception handling and support obligations may change. | Review before support or dispute reliance. | Vendor terms, incident path, or legal review change. |
| Support closure constraints | Support language and closure criteria may change. | Review before support use. | Support matrix, legal review, or event-state change. |
| Audit receipt requirements | Evidence preservation and retention requirements may change. | Review before audit reliance. | Retention policy, legal review, or access-control change. |
| Source-of-truth boundary | Winning source may change with future ADRs or systems. | Review before ledger / accounting reliance. | ADR, ledger, reconciliation, or provider change. |
| Legal / compliance review | Legal finality and claim risk may change. | Dated, attributable qualified review required before downstream use. | Jurisdiction, product claim, rail, provider, or customer class change. |

Freshness expectations are planning constraints only. They are not approved SLAs, settlement rules, finality rules, ledger policy, legal conclusions, support policy, reconciliation policy, or customer-money permission.

## 14. Downstream dependency effect

- **Stablecoin / conversion evidence package:** Cannot mature without conversion settlement, redemption settlement, fee / FX settlement, and custody-state evidence.
- **Fee / FX / spread evidence package:** Must reflect settlement value, quote expiry, stale quote handling, final value evidence, and dispute handling.
- **Liquidity / withdrawal control evidence package:** Cannot mature without withdrawal settlement, finality evidence, delayed / failed / reversed handling, and support escalation assumptions.
- **Trust UX / disclosure evidence package:** Must not claim completed, arrived, settled, final, reversed, recovered, or safe states without settlement / finality evidence.
- **Pilot Ops evidence package:** Must reflect settlement review, finality review, exception review, pause, escalation, and closure ownership.
- **Reconciliation evidence package:** Must map settlement / finality evidence to source-of-truth boundaries, matching rules, and exception closure.
- **Support / dispute evidence package:** Must define support constraints around pending, delayed, failed, reversed, disputed, duplicate, ambiguous, and unresolved states.
- **Audit / retention evidence package:** Must capture settlement evidence, finality evidence, support evidence, reconciliation evidence, and exception records.
- **ADR drafting readiness:** Cannot proceed for settlement / finality-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** Cannot treat settlement / finality questions as closed without accepted evidence.

## 15. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Rail settlement / finality evidence package |
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
| Non-authorization note | Evidence intake does not approve settlement finality, ledger truth, reconciliation closure, support closure, Class B execution, implementation, or customer-money movement. |

## 16. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the rail settlement / finality package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, settlement-ready, finality-ready, ledger-ready, reconciliation-ready, support-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 17. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify rail settlement / finality evidence and does not approve settlement finality, rail finality, ledger truth, accounting truth, source-of-truth boundaries, rail operations, transaction processing, deposit completion, withdrawal completion, conversion completion, redemption completion, reconciliation operations, support closure, customer-visible completion claims, external engagement, Class B execution, implementation, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future settlement / finality evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, custody evidence review, rail / vendor permission evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / partner evidence where applicable, and operational evidence where applicable.
