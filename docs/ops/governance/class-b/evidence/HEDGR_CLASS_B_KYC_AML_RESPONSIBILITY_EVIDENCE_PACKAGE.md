# HEDGR — Class B KYC / AML Responsibility Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001`, `EVID-B-002`, `EVID-B-003`, `EVID-B-004`, `EVID-B-005`, and future qualified legal / compliance review.

**Scope:** Defines required KYC / AML responsibility evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, KYC approval, AML approval, onboarding approval, sanctions approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve any KYC provider, AML process, sanctions / PEP process, onboarding flow, customer eligibility, manual review process, compliance hold process, transaction monitoring process, external engagement, Class B execution, implementation, staging, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

## 2. Purpose

This package exists to instantiate the KYC / AML responsibility evidence package from the evidence gathering plan and registry.

It answers:

**What KYC / AML responsibility evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Which KYC / AML arrangement is approved for Hedgr?**

It does not create:

- KYC approval
- AML approval
- sanctions screening approval
- PEP screening approval
- onboarding approval
- customer eligibility approval
- vendor approval
- legal approval
- regulatory approval
- compliance sufficiency
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define KYC / AML responsibility evidence requirements only. They do not create KYC / AML approval, legal conclusions, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | KYC / AML responsibility evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | External legal / compliance review; vendor / provider documentation or confirmation where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no customer eligibility policy; no KYC owner; no AML owner; no sanctions / PEP screening responsibility; no manual review / exception process; no audit / retention evidence for eligibility records; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future KYC / AML responsibility assessment; customer eligibility evidence review; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, KYC-ready, AML-ready, onboarding-ready, or compliance-sufficient.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| KYC responsibility owner | Who would own KYC responsibility in any future Class B pilot? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No KYC owner | No KYC owner is approved. |
| AML monitoring responsibility owner | Who would own AML monitoring responsibility? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No AML owner | No AML monitoring process is approved. |
| Sanctions screening responsibility owner | Who would own sanctions screening responsibility? | External legal / compliance review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No sanctions / PEP screening responsibility | No sanctions screening control is approved. |
| PEP screening responsibility owner | Who would own PEP screening responsibility? | External legal / compliance review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No sanctions / PEP screening responsibility | No PEP screening control is approved. |
| Customer eligibility dependency | Which eligibility constraints affect KYC / AML scope? | External legal / compliance review; customer eligibility evidence review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Eligibility is not approved by this dependency. |
| Jurisdiction-specific KYC obligations | What KYC obligations apply in the candidate jurisdiction or jurisdictions? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No jurisdiction selected; no legal / compliance review | No jurisdiction-specific obligation is accepted. |
| Jurisdiction-specific AML obligations | What AML obligations apply in the candidate jurisdiction or jurisdictions? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No jurisdiction selected; no legal / compliance review | No AML obligation is accepted. |
| Identity verification requirements | What identity verification evidence is required? | External legal / compliance review; vendor / provider documentation where applicable | Question framed / Missing | Review date required before downstream use | No identity verification requirements | No identity verification process is approved. |
| Business verification requirements | What business verification evidence is required? | External legal / compliance review; vendor / provider documentation where applicable | Question framed / Missing | Review date required before downstream use | No business verification requirements | No business verification process is approved. |
| Beneficial ownership requirements, if applicable | Is beneficial ownership evidence required, and for whom? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No beneficial ownership requirements, if applicable | No beneficial ownership process is approved. |
| Risk-rating requirements | What risk-rating model or criteria are required? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No risk-rating evidence | No risk-rating model is approved. |
| Onboarding pass / fail criteria | What conditions would pass, fail, or block onboarding? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy; no manual review / exception process | No onboarding criteria are approved. |
| Manual review criteria | What cases require manual review? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No manual review / exception process | No manual review process is approved. |
| Enhanced due diligence criteria | What triggers enhanced due diligence? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No manual review / exception process | No EDD process is approved. |
| Failed verification handling | What happens when identity or business verification fails? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No manual review / exception process | No failed-verification handling is approved. |
| Flagged customer handling | What happens when a customer is flagged? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No sanctions / PEP screening responsibility; no manual review / exception process | No flagged-customer handling is approved. |
| Compliance hold handling | What states require a compliance hold and what does that hold mean? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No compliance hold process | No compliance hold process is approved. |
| Suspicious activity escalation | What activity triggers suspicious activity escalation and who owns review? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No suspicious activity escalation process | No escalation process is approved. |
| Transaction monitoring applicability | Is transaction monitoring required, and if so by whom? | External legal / compliance review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No transaction monitoring evidence | No transaction monitoring process is approved. |
| Transaction-limit dependency | What transaction limits affect KYC / AML scope? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No transaction-limit evidence | No transaction limit is approved. |
| Exposure-limit dependency | What exposure limits affect KYC / AML scope? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No exposure-limit evidence | No exposure limit is approved. |
| Ongoing monitoring requirements | What ongoing monitoring is required after initial review? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No AML owner | No ongoing monitoring is approved. |
| Periodic rescreening requirements | Is periodic sanctions, PEP, KYC, or AML rescreening required? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No offboarding / removal criteria | No rescreening cadence is approved. |
| Offboarding / removal criteria | What KYC / AML conditions require removal, pause, or offboarding? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No offboarding / removal criteria | No offboarding process is approved. |
| Vendor / provider responsibility boundary | Which controls could a vendor or provider perform and what evidence proves scope? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No vendor / provider responsibility evidence | No vendor or provider is selected or approved. |
| Internal responsibility boundary | Which controls could remain with Hedgr and what review is required? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No KYC owner; no AML owner | No internal owner is approved. |
| Support handoff constraints | What support handoff is allowed during KYC / AML review, failure, hold, or escalation? | External legal / compliance review; support / incident evidence where applicable | Question framed / Missing | Review date required before downstream use | No support / complaint obligation evidence | No support operation is approved. |
| User disclosure constraints | What may users be told about KYC / AML review states and outcomes? | External legal / compliance review; Trust UX review | Question framed / Missing | Review date required before downstream use | No Trust UX approval | No disclosure is approved. |
| Data privacy requirements | What KYC / AML data is collected, stored, accessed, and restricted? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No privacy / retention evidence for KYC / AML records | No privacy posture is approved. |
| Data retention requirements | How long must KYC / AML records, screening evidence, and review logs be retained? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No privacy / retention evidence for KYC / AML records | No retention policy is approved. |
| Audit evidence requirements | What audit evidence must exist for KYC / AML decisions and review events? | External legal / compliance review; audit evidence | Question framed / Missing | Review date required before downstream use | No audit / recordkeeping evidence | No audit process is approved. |
| Recordkeeping requirements | What records must be preserved, by whom, and under what access controls? | External legal / compliance review; audit evidence | Question framed / Missing | Review date required before downstream use | No audit / recordkeeping evidence | No recordkeeping policy is approved. |
| Incident / escalation requirements | What incidents require escalation, reporting, hold, or governance review? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No incident / escalation requirements | No incident process is approved. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, KYC-ready, AML-ready, or compliance-sufficient.

## 6. Open KYC / AML responsibility questions

Answers must come from qualified legal / compliance review, future governed acceptance, and provider evidence where applicable, not this package.

### Responsibility ownership

- [ ] Who would own KYC responsibility in a future Class B pilot?
- [ ] Who would own AML monitoring responsibility?
- [ ] Who would own sanctions / PEP screening?
- [ ] Which responsibilities could belong to Hedgr, a vendor, a partner, or another regulated entity?
- [ ] Which responsibilities cannot be delegated without review?

### Jurisdiction and customer eligibility dependency

- [ ] Which jurisdiction-specific KYC / AML obligations apply?
- [ ] Which participant classes require identity checks?
- [ ] Which participant classes require business checks?
- [ ] What eligibility assumptions affect KYC / AML scope?
- [ ] What changes if users, rails, custody, or operations span multiple jurisdictions?

### Identity and business verification

- [ ] What identity evidence may be required?
- [ ] What business evidence may be required for SMEs or business customers?
- [ ] Is beneficial ownership evidence required?
- [ ] What verification levels apply to different participant classes?
- [ ] What happens if verification is incomplete, stale, or conflicting?

### AML monitoring and risk rating

- [ ] Is transaction monitoring required?
- [ ] Who performs monitoring?
- [ ] What risk-rating model is required?
- [ ] What activity triggers manual review?
- [ ] What activity triggers escalation, hold, pause, offboarding, or suspicious activity review?

### Sanctions / PEP screening

- [ ] Who screens sanctions and PEPs?
- [ ] When does screening occur?
- [ ] Is periodic rescreening required?
- [ ] What happens on a possible match?
- [ ] What may support or Copilot say during screening or review?

### Manual review and exception handling

- [ ] Who reviews failed, flagged, ambiguous, or incomplete KYC / AML cases?
- [ ] Who can approve, reject, hold, pause, or escalate?
- [ ] What evidence must be logged?
- [ ] What user-facing status is allowed?
- [ ] What promises are prohibited?

### Vendor / provider boundary

- [ ] Would a vendor perform KYC / AML functions?
- [ ] What vendor documentation is required?
- [ ] What vendor confirmation is required?
- [ ] What responsibilities remain with Hedgr?
- [ ] What vendor claims must not be treated as regulatory approval?

### Privacy, retention, and audit

- [ ] What KYC / AML data is collected?
- [ ] Where is it stored?
- [ ] Who can access it?
- [ ] How long is it retained?
- [ ] What audit evidence must exist?
- [ ] What must be deleted, anonymized, or restricted under privacy requirements?

### Support, disputes, and disclosures

- [ ] What can support say when a user fails KYC?
- [ ] What can support say during AML review or compliance hold?
- [ ] What complaint or dispute path exists?
- [ ] What disclosures must users acknowledge?
- [ ] What claims are prohibited around approval, safety, access, or fund movement?

## 7. Responsibility boundary template

| Control area | Hedgr role | Vendor / provider role | Partner / regulated entity role | User role | Evidence required | Status |
|---|---|---|---|---|---|---|
| Customer eligibility check | TBD | TBD | TBD | TBD | Customer eligibility and legal / compliance review | Question framed / Missing |
| Identity verification | TBD | TBD | TBD | TBD | KYC requirement evidence and responsibility evidence | Question framed / Missing |
| Business verification | TBD | TBD | TBD | TBD | Business verification and legal / compliance evidence | Question framed / Missing |
| Beneficial ownership review | TBD | TBD | TBD | TBD | Beneficial ownership requirement evidence | Question framed / Missing |
| Sanctions screening | TBD | TBD | TBD | TBD | Sanctions screening responsibility evidence | Question framed / Missing |
| PEP screening | TBD | TBD | TBD | TBD | PEP screening responsibility evidence | Question framed / Missing |
| Risk rating | TBD | TBD | TBD | TBD | Risk-rating requirement evidence | Question framed / Missing |
| AML monitoring | TBD | TBD | TBD | TBD | AML monitoring responsibility evidence | Question framed / Missing |
| Transaction monitoring | TBD | TBD | TBD | TBD | Transaction monitoring applicability evidence | Question framed / Missing |
| Manual review | TBD | TBD | TBD | TBD | Manual-review criteria and owner evidence | Question framed / Missing |
| Enhanced due diligence | TBD | TBD | TBD | TBD | EDD criteria and review evidence | Question framed / Missing |
| Compliance hold | TBD | TBD | TBD | TBD | Compliance-hold handling evidence | Question framed / Missing |
| Suspicious activity escalation | TBD | TBD | TBD | TBD | Suspicious-activity escalation evidence | Question framed / Missing |
| Offboarding / removal | TBD | TBD | TBD | TBD | Offboarding and removal criteria evidence | Question framed / Missing |
| Support handoff | TBD | TBD | TBD | TBD | Support / complaint obligation evidence | Question framed / Missing |
| Audit evidence retention | TBD | TBD | TBD | TBD | Privacy, retention, audit, and recordkeeping evidence | Question framed / Missing |

This template does not assign active responsibility, approve any provider, approve KYC / AML sufficiency, or authorize onboarding.

## 8. KYC / AML lifecycle template

| Lifecycle state | Requirement to define | Evidence required | Owner placeholder | User-facing constraint | Status |
|---|---|---|---|---|---|
| Pre-eligibility | Define whether KYC / AML facts are required before eligibility review. | Eligibility and KYC / AML dependency evidence | TBD | Must not imply access approval. | Question framed / Missing |
| Eligibility screening | Define eligibility checks and KYC / AML dependency. | Customer eligibility evidence; legal / compliance review | TBD | Must not imply onboarding approval. | Question framed / Missing |
| KYC initiated | Define initiation trigger and data requirements. | KYC requirement and privacy evidence | TBD | Must not imply completion. | Question framed / Missing |
| KYC pending | Define pending state, timeout, and user communication. | KYC process and support evidence | TBD | Must not promise approval timing. | Question framed / Missing |
| KYC failed | Define failure criteria and next steps. | Failed verification handling evidence | TBD | Must not disclose prohibited details or imply appeal rights without review. | Question framed / Missing |
| KYC passed | Define what evidence supports pass state. | KYC completion and legal / compliance evidence | TBD | Must not imply Class B readiness or fund movement. | Question framed / Missing |
| KYC requires manual review | Define trigger, reviewer, and evidence log. | Manual review criteria evidence | TBD | Must not promise outcome. | Question framed / Missing |
| AML monitoring pending | Define monitoring scope and owner. | AML monitoring evidence | TBD | Must not imply transaction approval. | Question framed / Missing |
| Sanctions / PEP screening pending | Define screening timing and owner. | Sanctions / PEP responsibility evidence | TBD | Must not imply access approval. | Question framed / Missing |
| Possible sanctions / PEP match | Define review, hold, escalation, and communication. | Sanctions / PEP match handling evidence | TBD | Must not provide prohibited match details. | Question framed / Missing |
| Compliance hold | Define hold meaning, owner, and permitted actions. | Compliance hold evidence | TBD | Must not imply custody, rail, or fund-movement authority. | Question framed / Missing |
| Enhanced due diligence | Define EDD trigger and evidence requirements. | Enhanced due diligence evidence | TBD | Must not promise approval. | Question framed / Missing |
| Participant approved for planning only | Define planning-only interpretation. | Governed evidence acceptance if future review allows | TBD | Must state planning only, not onboarding or execution. | Question framed / Missing |
| Participant rejected | Define rejection evidence and communication. | Rejection / offboarding evidence | TBD | Must avoid unsupported claims about legal status or safety. | Question framed / Missing |
| Participant removed / offboarded | Define removal criteria and recordkeeping. | Offboarding and retention evidence | TBD | Must not imply funds can move. | Question framed / Missing |
| Periodic rescreening | Define cadence, trigger, and owner. | Rescreening evidence | TBD | Must not imply continuous approval. | Question framed / Missing |
| Record retention | Define retained records and access control. | Retention and audit evidence | TBD | Must not imply retention policy approval. | Question framed / Missing |
| Record deletion / restriction | Define deletion, restriction, and anonymization requirements. | Privacy and deletion evidence | TBD | Must not promise deletion rights without review. | Question framed / Missing |

This lifecycle template does not create onboarding state, customer records, approval logic, transaction semantics, or customer-money authority.

## 9. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| KYC responsibility review | External legal / compliance review dated and attributable to qualified review; vendor / provider confirmation may support responsibility facts | Founder assumption; repo doctrine; internal analysis alone; vendor marketing pages | Responsibility evidence must distinguish legal obligation from operational control. |
| AML responsibility review | External legal / compliance review dated and attributable to qualified review; vendor / provider confirmation where applicable | Founder assumption; internal analysis; generic AML examples | AML monitoring responsibility requires scoped review. |
| Sanctions / PEP responsibility review | External legal / compliance review dated and attributable to qualified review; vendor / provider documentation and confirmation where applicable | Internal policy draft alone; vendor marketing pages | Screening responsibility and escalation must be evidenced. |
| Identity verification requirement review | External legal / compliance review; vendor / provider documentation may support control facts | Product target segments; generic identity examples | Identity requirements must match jurisdiction and participant class. |
| Business verification requirement review | External legal / compliance review; vendor / provider documentation where applicable | SME product intent alone | Business verification must not be inferred from target segment. |
| Beneficial ownership review | External legal / compliance review | Internal analysis alone; generic beneficial-owner examples | Applicability must be scoped before downstream use. |
| Manual review requirement review | External legal / compliance review; internal analysis may frame operating questions only | Support preference; product intent | Manual review authority and evidence must be reviewed. |
| Transaction monitoring review | External legal / compliance review; vendor / provider documentation or confirmation where applicable | Generic monitoring examples; vendor availability | Monitoring applicability is not closed by tool availability. |
| Risk-rating requirement review | External legal / compliance review | Internal risk preference; product segmentation | Risk rating must not be treated as approved policy. |
| Compliance hold handling review | External legal / compliance review | Internal support script; operational preference | Holds require legal / compliance constraints before use. |
| Vendor / provider control review | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Vendor marketing pages; vendor availability | Documentation and explicit confirmation must be distinguished. |
| Privacy / retention review | External legal / compliance review; security / access-control review may support internal facts | Generic privacy templates; internal analysis alone | KYC / AML data handling requires scoped review. |
| Support / complaint obligation review | External legal / compliance review; support / incident evidence where applicable | Support template alone | Support language must not become approval, legal advice, or outcome promise. |
| Audit / recordkeeping review | External legal / compliance review; audit evidence | Internal checklist alone | Recordkeeping evidence must define retention, owner, and access boundaries. |

- Founder assumption is not KYC / AML evidence.
- Repo doctrine is not KYC / AML approval.
- Internal analysis is not legal or compliance approval.
- Product target segments are not KYC / AML sufficiency.
- Vendor marketing pages are not vendor control evidence.
- Vendor availability is not compliance sufficiency.
- Legal / compliance review must be dated and attributable to qualified review before downstream use.
- Vendor / provider responsibility evidence must distinguish documentation from explicit confirmation.

## 10. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction-specific KYC / AML responsibility evidence | Unresolved / Evidence missing | Legal / compliance review; KYC / AML assessment; customer eligibility |
| No legal / compliance review | Qualified KYC / AML, sanctions / PEP, monitoring, privacy, and support review | Unresolved / Evidence missing | Responsibility model; disclosures; ADR readiness; implementation-preflight review |
| No customer eligibility policy | Eligibility dependency evidence and participant-class constraints | Unresolved / Evidence missing | KYC / AML scope; onboarding consideration; support |
| No KYC owner | KYC responsibility owner and control evidence | Unresolved / Evidence missing | Customer eligibility; identity verification; Pilot Ops |
| No AML owner | AML monitoring owner and escalation evidence | Unresolved / Evidence missing | Monitoring review; transaction review; Pilot Ops |
| No sanctions / PEP screening responsibility | Screening owner, match handling, escalation, and evidence-retention review | Unresolved / Evidence missing | Eligibility; support; compliance hold |
| No identity verification requirements | Identity evidence requirements by participant class | Unresolved / Evidence missing | KYC review; onboarding consideration |
| No business verification requirements | Business verification evidence by participant class | Unresolved / Evidence missing | SME / business eligibility; beneficial ownership review |
| No beneficial ownership requirements, if applicable | Beneficial ownership applicability and evidence requirements | Unresolved / Evidence missing | Business verification; AML review |
| No transaction monitoring evidence | Monitoring applicability, owner, triggers, and records | Unresolved / Evidence missing | Reconciliation; support; audit; preflight |
| No risk-rating evidence | Risk-rating criteria and review owner | Unresolved / Evidence missing | AML monitoring; manual review; EDD |
| No manual review / exception process | Manual-review criteria, reviewer role, evidence log, and outcomes | Unresolved / Evidence missing | KYC / AML review; support; Pilot Ops |
| No compliance hold process | Hold criteria, owner, user state, and permitted action evidence | Unresolved / Evidence missing | Trust UX; support; reconciliation |
| No suspicious activity escalation process | Escalation triggers, owner, records, and reporting constraints | Unresolved / Evidence missing | AML review; support; audit |
| No vendor / provider responsibility evidence | Provider documentation, explicit confirmation, and responsibility boundary review | Unresolved / Evidence missing | Vendor boundary; custody / rail review; support |
| No privacy / retention evidence for KYC / AML records | Data collection, access, storage, retention, deletion, and restriction review | Unresolved / Evidence missing | Audit / retention; support; evidence acceptance |
| No support / complaint obligation evidence | Support constraints, complaint path, dispute path, and prohibited promises | Unresolved / Evidence missing | Trust UX; support / dispute package |
| No audit / recordkeeping evidence | Required KYC / AML records, screening logs, review logs, and access controls | Unresolved / Evidence missing | Audit / retention package; evidence acceptance |
| No offboarding / removal criteria | Removal, pause, rejection, and periodic rescreening evidence | Unresolved / Evidence missing | Pilot Ops; support; Trust UX |
| No accepted Class B ADRs | Accepted ADRs where material decisions require ADR treatment | Unresolved / Evidence missing | ADR drafting readiness; implementation-preflight consideration |
| No implementation-specific §7a brief | Bounded §7a brief after evidence and governance review | Unresolved / Evidence missing | Implementation proposal, §7 activation, and execution brief |

No blocker in this package is closed.

## 11. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| KYC responsibility model | Responsibility boundaries may change with jurisdiction, participant class, provider, or legal review. | Dated qualified review required before downstream use. | Jurisdiction, customer class, provider, onboarding model, or legal posture changes. |
| AML monitoring responsibility | Monitoring obligations may change with transaction activity, rail, jurisdiction, or vendor scope. | Dated qualified review required before downstream use. | New rail, transaction type, customer class, vendor, or regulatory update. |
| Sanctions / PEP screening requirements | Screening obligations, lists, and escalation rules may change. | Dated qualified review and provider evidence where applicable. | Sanctions regime, user location, vendor, list source, or control owner changes. |
| Identity verification requirements | Identity requirements may change by jurisdiction and participant class. | Dated qualified review required before downstream use. | New customer class, jurisdiction, document type, or vendor. |
| Business verification requirements | Business verification and entity checks may change by participant class. | Dated qualified review required before downstream use. | New SME/business class, jurisdiction, industry, or ownership model. |
| Beneficial ownership requirements | Applicability may change with business type and jurisdiction. | Dated qualified review required before downstream use. | New business segment, ownership structure, jurisdiction, or legal update. |
| Manual review / exception handling | Manual-review triggers and authority may change with policy, vendor, and legal constraints. | Dated qualified review and governed operating review required before downstream use. | New flags, vendor workflow, support model, or escalation path. |
| Transaction monitoring requirements | Monitoring scope may change with product activity and rails. | Dated qualified review required before downstream use. | New transaction type, rail, custody model, customer class, or provider. |
| Risk-rating requirements | Risk criteria may change with legal posture and participant risk. | Dated qualified review required before downstream use. | New participant type, geography, rail, transaction limit, or compliance direction. |
| Vendor / provider control evidence | Provider capabilities, limits, and responsibility scope may change. | Dated documentation and explicit confirmation where required. | Provider terms, API, control model, support scope, or contract changes. |
| Privacy / retention requirements | KYC / AML data handling obligations may change. | Dated legal / compliance review required before downstream use. | Data class, storage location, vendor, user jurisdiction, retention use case, or privacy law changes. |
| Support / complaint obligations | Communication and complaint obligations may change by jurisdiction and state. | Dated legal / compliance review required before downstream use. | User class, review state, hold process, support owner, or jurisdiction changes. |
| Audit / recordkeeping requirements | Required logs, retention, and access controls may change. | Dated legal / compliance and audit review required before downstream use. | Record type, reviewer, provider, jurisdiction, or evidence acceptance use changes. |
| Offboarding / rescreening requirements | Rescreening and removal criteria may change over time. | Dated qualified review required before downstream use. | New screening obligation, match process, participant class, or legal update. |

Freshness expectations are planning constraints only. They are not approved SLAs, KYC policy, AML policy, legal conclusions, compliance policy, onboarding rules, or customer eligibility approval.

## 12. Downstream dependency effect

- **Customer eligibility evidence package:** eligibility cannot be treated as mature unless KYC / AML responsibility evidence is available or blockers are explicitly recorded.
- **Trust UX / disclosure evidence package:** must reflect KYC / AML pending, failed, flagged, review, hold, and unsupported states without implying approval or fund movement.
- **Pilot Ops evidence package:** must reflect KYC / AML owner, manual review, escalation, compliance hold, rescreening, and offboarding controls.
- **Reconciliation evidence package:** must know which KYC / AML states can block or pause transaction review.
- **Support / dispute evidence package:** must define support constraints around failed KYC, AML review, sanctions / PEP matches, compliance holds, and complaints.
- **Audit / retention evidence package:** must reflect KYC / AML evidence, screening evidence, manual review records, access controls, retention, and deletion / restriction requirements.
- **Custody and rail evidence packages:** cannot treat user access, rail use, or custody operations as assessable without KYC / AML responsibility boundaries.
- **ADR drafting readiness:** cannot proceed for KYC / AML-sensitive ADRs until required evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** cannot treat KYC / AML responsibility as closed without accepted evidence.

## 13. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | KYC / AML responsibility evidence package |
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
| Non-authorization note | Evidence intake does not approve KYC / AML sufficiency, onboarding, customer eligibility, Class B execution, implementation, or customer-money movement. |

## 14. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the KYC / AML responsibility package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, KYC-ready, AML-ready, onboarding-ready, compliance-sufficient, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 15. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify KYC / AML responsibility evidence and does not approve any KYC provider, AML process, sanctions / PEP process, onboarding flow, customer eligibility, manual review process, compliance hold process, transaction monitoring process, external engagement, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future KYC / AML evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
