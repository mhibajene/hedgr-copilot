# HEDGR - Class B Evidence Registry

## 1. Status / Authority / Scope

**Status:** Evidence registry; documentation-only.

**Authority:** Non-authoritative registry subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001`, and future governed review.

**Scope:** Initializes the evidence register for required Class B evidence packages.

**Mode:** Evidence-state tracking only; not evidence acceptance, evidence approval, ADR drafting readiness, implementation readiness, or Class B readiness.

This registry does not approve, validate, accept, or certify evidence and does not approve, activate, sequence, or implement Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, or customer fund movement.

## 2. Purpose

This registry exists to instantiate the working evidence register defined by `EVID-B-001`.

It answers:

**What evidence packages are required, what is their current evidence state, what source class is expected, what blocker do they relate to, and what downstream review path may they eventually support?**

It does not answer:

**Has the evidence been gathered, reviewed, accepted, or approved?**

It does not create:

- evidence acceptance
- evidence sufficiency
- legal approval
- vendor approval
- custody approval
- rail approval
- ADR drafting readiness
- implementation-proposal readiness
- Class B readiness
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to initialize registry structure and evidence-package tracking only. They do not create evidence acceptance, implementation authority, or execution approval.

## 4. Registry principles

1. **Registry is not evidence**
   A row in this registry means evidence is required or being tracked. It does not mean evidence exists.

2. **Missing is a valid state**
   Where evidence is absent, the registry must say Missing or Question framed, not infer readiness.

3. **Source class matters**
   Evidence from founder assumptions, repo governance, vendor documentation, legal review, technical sandbox, internal test, or accepted ADRs must remain clearly classified.

4. **Evidence state is not approval**
   Even Evidence received or Accepted for planning does not authorize implementation, ADR acceptance, Class B execution, or customer-money movement.

5. **Freshness must be tracked**
   Any evidence that may expire or change must carry a freshness or review-date expectation.

6. **Blockers remain visible**
   Every evidence package should map to one or more blockers from the Class B spine closeout or `EVID-B-001` blocker register.

7. **Registry does not create sequencing**
   The registry may support future review, but it does not create backlog order, implementation order, ADR order, or §7 activation.

## 5. Evidence state legend

| Evidence state | Meaning | Registry use | Non-authorization boundary |
|---|---|---|---|
| Missing | Evidence has not been identified or preserved. | Marks an open evidence gap. | Does not close a blocker or imply evidence exists. |
| Question framed | The evidence need is defined, but evidence is absent. | Supports future evidence scoping. | Does not mean evidence has been gathered, reviewed, or approved. |
| Evidence requested | Evidence has been requested from an owner, reviewer, vendor, or source. | Tracks pending intake. | Does not prove approval, sufficiency, permission, or readiness. |
| Evidence received | Evidence has been received and preserved. | Allows future review to begin. | Does not mean evidence is current, complete, sufficient, or accepted. |
| Under review | Evidence is being reviewed against source quality, freshness, conflicts, and dependencies. | Tracks active evidence review posture. | Does not approve implementation, ADRs, Class B execution, or readiness. |
| Accepted for planning | Evidence is sufficient to support planning questions. | Allows bounded planning references with limits. | Does not authorize ADR drafting, implementation preflight, execution, or customer-money movement. |
| Accepted for ADR drafting readiness | Evidence is sufficient to consider whether ADR drafting may begin. | Supports a future ADR drafting readiness review. | Does not draft, accept, sequence, or approve any ADR or implementation. |
| Accepted for implementation-preflight consideration | Evidence is sufficient to consider whether an implementation-proposal preflight may be reviewed. | Supports a future implementation-preflight review. | Does not create §7 activation, §7a execution, implementation, staging, live operations, or customer-money authority. |
| Rejected / insufficient | Evidence does not satisfy the evidence need. | Keeps the related blocker unresolved or requires reframing. | Does not waive the evidence gap. |
| Stale / requires refresh | Evidence may have changed or exceeded a future review expectation. | Requires refresh before reliance. | Does not permit silent reuse as current evidence. |
| Conflicting / requires escalation | Evidence conflicts with another source or authority. | Requires governed escalation. | Does not permit inference-based reconciliation. |

No evidence state authorizes implementation, Class B readiness, live operations, or customer fund movement.

## 6. Source class legend

| Source class | Meaning | Registry use | Limitation |
|---|---|---|---|
| Founder assumption | Founder-framed assumption, constraint, target market, or open question. | Frames evidence questions and review scope. | Founder assumptions can frame questions, not close blockers. |
| Repo doctrine | Governing product, architecture, UX, and trust doctrine. | Constrains interpretation and identifies red lines. | Doctrine is not external approval, vendor permission, operational proof, or §7 activation. |
| Repo governance artifact | Repo-native standard, memo, register, assessment, or staging copy. | Defines constraints, questions, blockers, and review dependencies. | Repo governance artifacts define constraints, not external approval. |
| Accepted ADR | Accepted repo decision record. | Records material decisions and constrains future work. | Accepted ADRs record decisions but do not by themselves activate implementation. |
| Internal analysis | Hedgr-authored analysis, matrix, review, or evidence summary. | Organizes evidence and identifies gaps. | Internal analysis is not legal conclusion, vendor permission, live operational proof, or pilot approval. |
| External legal / compliance review | Qualified external review of law, regulation, compliance obligations, eligibility, claims, or related constraints. | May support future legal / compliance review when scoped, dated, and accepted through governance. | Legal / compliance review is not automatic implementation approval, customer-money authority, or vendor approval. |
| Vendor / provider documentation | Published or supplied documentation about vendor or provider capabilities, limits, fees, API behavior, controls, or policies. | Identifies capabilities and evidence needs. | Vendor documentation is not the same as vendor permission. |
| Vendor / provider confirmation | Direct confirmation from a vendor or provider about scope, permissions, limits, support path, or environment boundary. | May support provider-boundary review if dated, specific, and preserved. | Vendor confirmation is not legal approval, governance approval, or automatic implementation authority. |
| Technical sandbox evidence | Evidence from a sandbox or non-customer-money environment. | Supports technical-behavior review under bounded conditions. | Sandbox evidence is not live evidence. |
| Internal test evidence | Evidence from internal tests under controlled non-customer conditions. | Supports internal understanding when separately authorized. | Internal test evidence is not pilot approval. |
| Operational dry-run evidence | Evidence from rehearsed operating procedures under non-live or separately approved conditions. | Identifies operational gaps. | Dry-run evidence is not operational approval, live runbook approval, or customer-money authority. |
| User research evidence | Structured research on comprehension, trust, disclosure, or support expectations. | Improves review questions and Trust UX assessment. | User research is not legal approval, eligibility approval, operational proof, or implementation authority. |
| Support / incident evidence | Evidence from support cases, incident exercises, escalation reviews, or dispute analysis. | Informs support and dispute review. | Support / incident evidence is not transaction outcome approval, reconciliation truth, or legal resolution. |
| Reconciliation evidence | Evidence about matching, exceptions, source-of-truth boundaries, unresolved states, or closure logic. | Informs reconciliation and audit review. | Reconciliation evidence is not ledger truth, accounting truth, or operational approval unless separately accepted. |
| Audit evidence | Preserved receipts, records, access-control evidence, review logs, or retention evidence. | Supports future governance review. | Audit evidence is not retention policy approval, audit-operation approval, or ledger truth by itself. |

## 7. Evidence registry

| Evidence package | Current evidence state | Expected source class | Owner placeholder | Freshness / review expectation | Related blocker | Downstream use | Notes |
|---|---|---|---|---|---|---|---|
| Legal / compliance evidence package | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No accepted Class B ADRs; No implementation-specific §7a brief | Future legal / compliance review; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, or sufficient. |
| Jurisdiction selection evidence package | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD by future governed review | Review date required before use | No jurisdiction selected | Future legal / compliance review; customer eligibility evidence package; KYC / AML responsibility package; custody evidence package; rail / vendor evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, or jurisdiction-selected. |
| Customer eligibility evidence package | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No sanctions / PEP screening responsibility; No accepted Class B ADRs; No implementation-specific §7a brief | Future customer eligibility assessment; KYC / AML responsibility evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, customer-eligible, onboarding-ready, ADR-ready, implementation-ready, or Class B ready. |
| KYC / AML responsibility evidence package | Question framed / Missing | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC owner; No AML owner; No sanctions / PEP screening responsibility; No manual review / exception process; No audit / retention evidence for eligibility records; No accepted Class B ADRs; No implementation-specific §7a brief | Future KYC / AML responsibility assessment; customer eligibility evidence review; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, KYC-ready, AML-ready, onboarding-ready, compliance-sufficient, ADR-ready, implementation-ready, or Class B ready. |
| Custody provider / model evidence package | Question framed / Missing | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No custody model selected; No provider responsibility evidence; No custody legal boundary; No asset-control lifecycle evidence; No accepted Class B ADRs; No implementation-specific §7a brief | Future custody model assessment; provider responsibility review; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTODY_PROVIDER_MODEL_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, custody-ready, provider-ready, wallet-ready, ADR-ready, implementation-ready, or Class B ready. |
| Rail / vendor permission evidence package | Question framed / Missing | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No custody model selected; No provider responsibility evidence; No rail selected or approved; No rail permission evidence; No vendor / partner responsibility evidence; No environment-state evidence; No accepted Class B ADRs; No implementation-specific §7a brief | Future rail / vendor assessment; rail settlement / finality evidence package; stablecoin / conversion evidence package; fee / FX / spread evidence package; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_VENDOR_PERMISSION_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, rail-ready, vendor-ready, integration-ready, live-ready, ADR-ready, implementation-ready, or Class B ready. |
| Rail settlement / finality evidence package | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review where applicable; reconciliation evidence; audit evidence; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No custody model selected; No rail selected or approved; No rail permission evidence; No vendor / partner responsibility evidence; No settlement / finality evidence; No reconciliation process; No support / dispute process; No audit / retention policy; No accepted Class B ADRs; No implementation-specific §7a brief | Future settlement / finality assessment; stablecoin / conversion evidence package; fee / FX / spread evidence package; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_SETTLEMENT_FINALITY_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, settlement-ready, finality-ready, ledger-ready, reconciliation-ready, support-ready, ADR-ready, implementation-ready, or Class B ready. |
| Stablecoin / conversion evidence package | Question framed / Missing | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation where applicable; custody evidence; rail evidence; settlement / finality evidence; reconciliation evidence; audit evidence; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No custody model selected; No rail selected or approved; No rail permission evidence; No settlement / finality evidence; No stablecoin / digital asset handling review; No FX / fee / spread disclosure review; No reconciliation process; No audit / retention policy; No accepted Class B ADRs; No implementation-specific §7a brief | Future stablecoin / conversion assessment; fee / FX / spread evidence package; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STABLECOIN_CONVERSION_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, stablecoin-ready, conversion-ready, redemption-ready, FX-ready, treasury-ready, ADR-ready, implementation-ready, or Class B ready. |
| Fee / FX / spread evidence package | Question framed / Missing | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation where applicable; stablecoin / conversion evidence; rail evidence; settlement / finality evidence; reconciliation evidence; audit evidence; internal analysis may frame questions only | TBD by future governed review | Review date required before downstream use | No jurisdiction selected; No legal / compliance review; No customer eligibility policy; No KYC / AML owner; No custody model selected; No rail selected or approved; No rail permission evidence; No settlement / finality evidence; No stablecoin / digital asset handling review; No FX / fee / spread disclosure review; No fee / spread evidence; No quote expiry / stale quote handling evidence; No final settlement value evidence; No reconciliation process; No audit / retention policy; No accepted Class B ADRs; No implementation-specific §7a brief | Future fee / FX / spread assessment; stablecoin / conversion evidence review; liquidity / withdrawal control evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only | Package shell: `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_FEE_FX_SPREAD_EVIDENCE_PACKAGE.md`; registry row only; no evidence gathered, accepted, approved, sufficient, FX-ready, fee-ready, spread-ready, quote-ready, pricing-ready, treasury-ready, ADR-ready, implementation-ready, or Class B ready. |
| Liquidity / withdrawal control evidence package | Question framed / Missing | Internal analysis; operational dry-run evidence; external legal / compliance review; rail / custody evidence | TBD by future governed review | Review date required before use | No liquidity buffer policy; No withdrawal control evidence | Future implementation-proposal preflight review | No withdrawal or liquidity authority is approved. |
| Trust UX / disclosure evidence package | Question framed / Missing | Repo governance artifact; external legal / compliance review; user research evidence; support / incident evidence | TBD by future governed review | Freshness expectation to be defined by future review | No Trust UX approval | Future legal / compliance review; Future implementation-proposal preflight review | No UI, copy, or disclosure approval is created. |
| Pilot Ops evidence package | Question framed / Missing | Internal analysis; operational dry-run evidence; repo governance artifact | TBD by future governed review | Freshness expectation to be defined by future review | No Pilot Ops owner | Future implementation-proposal preflight review | No pilot operations authority is approved. |
| Reconciliation evidence package | Question framed / Missing | Reconciliation evidence; operational dry-run evidence; vendor / provider documentation; internal analysis | TBD by future governed review | Review date required before use | No reconciliation process | Future implementation-proposal preflight review | No reconciliation operation or ledger truth is approved. |
| Support / dispute evidence package | Question framed / Missing | Support / incident evidence; internal analysis; external legal / compliance review | TBD by future governed review | Review date required before use | No support / dispute process | Future implementation-proposal preflight review | No support or dispute operation is approved. |
| Audit / retention / access-control evidence package | Question framed / Missing | Audit evidence; external legal / compliance review; internal analysis | TBD by future governed review | Review date required before use | No audit / retention policy | Future implementation-proposal preflight review | No retention, audit, or access-control policy is approved. |
| Staging / live-state separation evidence package | Question framed / Missing | Repo governance artifact; technical sandbox evidence; internal test evidence | TBD by future governed review | Review date required before use | No staging / live-state separation evidence | Future implementation-proposal preflight review; Future §7 / §7a consideration only | No staging, sandbox, internal-test, live, or production state is approved. |
| ADR drafting readiness evidence package | Question framed / Missing | Repo governance artifact; accepted ADR; external legal / compliance review; evidence packages | TBD by future governed review | Review date required before use | No accepted Class B ADRs | Future ADR drafting readiness review | No ADR is drafted, accepted, or made ready. |
| Implementation-proposal preflight evidence package | Question framed / Missing | Evidence packages; accepted ADR; external legal / compliance review; vendor / provider confirmation; operational evidence | TBD by future governed review | Review date required before use | No implementation-specific §7a brief | Future implementation-proposal preflight review; Future §7 / §7a consideration only | No implementation proposal, activation, or successor ticket is created. |

## 8. Package-to-spine mapping

| Evidence package | Primary spine artifact dependency | Secondary dependency | Why mapping matters |
|---|---|---|---|
| Legal / compliance evidence package | Legal / Compliance Requirements Memo | Pilot Eligibility Standard | Legal and compliance evidence constrains all downstream Class B review. |
| Jurisdiction selection evidence package | Legal / Compliance Requirements Memo | Eligibility Gap Register | Jurisdiction affects eligibility, custody, rails, disclosures, and operations. |
| Customer eligibility evidence package | Pilot Eligibility Standard | Legal / Compliance Requirements Memo | Eligibility determines who could be reviewed for a future pilot. |
| KYC / AML responsibility evidence package | Legal / Compliance Requirements Memo | Pilot Ops Runbook | KYC / AML ownership affects onboarding, support, rail, and custody responsibilities. |
| Custody provider / model evidence package | Custody Boundary Memo | Legal / Compliance Requirements Memo | Custody truth constrains user claims, support, reconciliation, and ADR scope. |
| Rail / vendor permission evidence package | Rail Classification Register | Legal / Compliance Requirements Memo | Rail capability must be distinguished from permission and customer-money authority. |
| Rail settlement / finality evidence package | Rail Classification Register | Reconciliation SOP | Settlement evidence constrains status, support, and audit review. |
| Stablecoin / conversion evidence package | Custody Boundary Memo | Rail Classification Register | Conversion affects custody, rail, fee, FX, support, and disclosure questions. |
| Fee / FX / spread evidence package | Trust UX Pack | Legal / Compliance Requirements Memo | Costs and quote behavior must be reviewable before customer-facing claims. |
| Liquidity / withdrawal control evidence package | Liquidity / Withdrawal Control Memo | Reconciliation SOP | Withdrawal reliability and liquidity controls are core trust constraints. |
| Trust UX / disclosure evidence package | Trust UX Pack | Legal / Compliance Requirements Memo | Customer-facing claims must stay evidence-linked and non-promissory. |
| Pilot Ops evidence package | Pilot Ops Runbook | Support Escalation Matrix | Operational ownership must be understood before pilot review. |
| Reconciliation evidence package | Reconciliation SOP | Audit Evidence Checklist | Matching, exception, and source-of-truth evidence are needed before operational review. |
| Support / dispute evidence package | Support Escalation Matrix | Reconciliation SOP | Support must not become transaction, custody, rail, or finality authority. |
| Audit / retention / access-control evidence package | Audit Evidence Checklist | Legal / Compliance Requirements Memo | Evidence preservation, retention, and access controls require separate review. |
| Staging / live-state separation evidence package | Staging / Live-State Separation Memo | Trust UX Pack | Environment and money-state boundaries prevent simulation/live drift. |
| ADR drafting readiness evidence package | ADR Scoping Memo | Governance Spine Closeout Assessment | ADR consideration requires prerequisite evidence without treating scoping as acceptance. |
| Implementation-proposal preflight evidence package | Governance Spine Closeout Assessment | Artifact Dependency Map | Preflight review must stay downstream of evidence and §7 / §7a governance. |

## 9. Blocker mapping

| Blocker | Evidence package needed | Current posture | Escalation path | Blocks |
|---|---|---|---|---|
| No jurisdiction selected | Jurisdiction selection evidence package | Evidence missing | Future governed review required | Legal / compliance review; customer eligibility; rail and custody review |
| No legal / compliance review | Legal / compliance evidence package | Evidence missing | Future governed review required | Legal conclusions; disclosures; eligibility; ADR readiness |
| No customer eligibility policy | Customer eligibility evidence package | Evidence missing | Future governed review required | Pilot scope; onboarding; support; Trust UX |
| No KYC / AML owner | KYC / AML responsibility evidence package | Evidence missing | Future governed review required | Customer eligibility; rails; support; operations |
| No custody model selected | Custody provider / model evidence package | Framed only | Future governed review required | Custody review; Trust UX; reconciliation; ADR readiness |
| No provider responsibility evidence | Custody provider / model evidence package; Stablecoin / conversion evidence package | Evidence missing | Future governed review required | Custody, conversion, support, and rail responsibility |
| No rail selected or approved | Rail / vendor permission evidence package | Framed only | Future governed review required | Rail review; deposit / withdrawal review; reconciliation |
| No rail permission evidence | Rail / vendor permission evidence package | Evidence missing | Future governed review required | Vendor use; rail classification; staging or sandbox review |
| No settlement / finality evidence | Rail settlement / finality evidence package | Evidence missing | Future governed review required | Reconciliation; support; finality claims; audit |
| No fee / FX / spread evidence | Fee / FX / spread evidence package | Evidence missing | Future governed review required | Disclosure; support; reconciliation; Trust UX |
| No liquidity buffer policy | Liquidity / withdrawal control evidence package | Evidence missing | Future governed review required | Withdrawal review; stress controls; pilot review |
| No withdrawal control evidence | Liquidity / withdrawal control evidence package | Evidence missing | Future governed review required | Withdrawal claims; support; reconciliation; preflight |
| No Trust UX approval | Trust UX / disclosure evidence package | Framed only | Future governed review required | Customer-facing copy; support messages; Copilot proximity |
| No Pilot Ops owner | Pilot Ops evidence package | Evidence missing | Future governed review required | Manual review; operational controls; escalation |
| No reconciliation process | Reconciliation evidence package | Evidence missing | Future governed review required | Ledger truth review; support closure; audit review |
| No support / dispute process | Support / dispute evidence package | Evidence missing | Future governed review required | Customer support, disputes, incidents, and claims |
| No audit / retention policy | Audit / retention / access-control evidence package | Evidence missing | Future governed review required | Evidence preservation; access controls; retention review |
| No staging / live-state separation evidence | Staging / live-state separation evidence package | Evidence missing | Future governed review required | Sandbox, internal-test, staging, live, and production boundaries |
| No accepted Class B ADRs | ADR drafting readiness evidence package | Unresolved | Future governed review required | ADR drafting readiness; implementation-preflight consideration |
| No implementation-specific §7a brief | Implementation-proposal preflight evidence package | Unresolved | Future governed review required | Implementation proposal, §7 activation, and §7a execution brief |

No blocker in this registry is closed.

## 10. Registry update rules

- Evidence rows may be updated only through repo-governed tickets.
- Every evidence-state change must include a source pointer.
- Every source pointer must identify source class.
- Stale evidence must be marked stale rather than silently reused.
- Conflicting evidence must be marked conflicting and escalated.
- Accepted ADRs may be cited as decisions but do not activate implementation.
- External legal / compliance review must not be paraphrased into approval unless explicitly stated and governance accepts it.
- Vendor documentation must not be treated as vendor permission unless explicit.
- Registry updates must not change §7 / §7a activation state.

## 11. Evidence intake template

| Intake item | Required detail | Example / instruction |
|---|---|---|
| Evidence title | Clear title for the evidence item. | Use a stable, reviewable name. |
| Evidence package | Registry package the item relates to. | Select one package from Section 7. |
| Source class | Source class for the evidence. | Use one class from Section 6. |
| Source pointer | Repo path, document reference, vendor reference, review record, or preserved pointer. | Must be specific enough for future review. |
| Date received | Date evidence was received or preserved. | Use ISO date where possible. |
| Freshness / review date | Required refresh or review expectation. | Mark review date required before use if unknown. |
| Evidence owner | Owner responsible for preserving the evidence. | TBD unless future governed review assigns one. |
| Reviewer | Reviewer or review body. | TBD unless future governed review assigns one. |
| Related blocker | Blocker the evidence may inform. | Use Section 9 blocker wording. |
| Claim supported | Claim the evidence may support. | State narrowly. |
| Claim not supported | Claims the evidence does not support. | Include non-authorization limits. |
| Conflicts identified | Conflicts with repo authority or other evidence. | Mark none only when reviewed. |
| Recommended evidence state | Proposed state label. | Must remain subject to governed review. |
| Non-authorization note | Boundary statement for the intake item. | State that intake does not authorize implementation or customer-money movement. |

This intake template does not approve evidence intake, external engagement, data storage, retention, or operational evidence collection.

## 12. Evidence review log template

| Review date | Evidence item | Reviewer | Review result | Reason | Follow-up required | Authority boundary |
|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | Evidence-state label only; no implementation, ADR approval, Class B execution, or customer-money authority. |

Permitted review results:

- Accepted for planning
- Accepted for ADR drafting readiness
- Accepted for implementation-preflight consideration
- Rejected / insufficient
- Stale / requires refresh
- Conflicting / requires escalation

Review results are evidence-state labels only. They do not approve ADRs, implementation, Class B execution, or customer-money movement.

## 13. Non-authorization statement

This registry is non-authoritative and documentation-only. It does not approve, validate, accept, or certify evidence and does not approve, activate, sequence, or implement Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, or customer fund movement. Any future Class B evidence-gathering, evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, accepted ADRs where required, qualified legal / compliance review, relevant spine-artifact review, vendor / partner evidence where applicable, and operational evidence.
