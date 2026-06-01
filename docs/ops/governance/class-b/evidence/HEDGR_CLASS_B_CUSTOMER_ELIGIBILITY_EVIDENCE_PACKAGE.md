# HEDGR — Class B Customer Eligibility Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001`, `EVID-B-002`, `EVID-B-003`, `EVID-B-004`, and future qualified legal / compliance review.

**Scope:** Defines required customer eligibility evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, customer eligibility approval, onboarding approval, KYC / AML approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve any customer class, user segment, participant type, eligibility policy, onboarding flow, KYC / AML process, customer outreach, pilot participation, Class B execution, implementation, staging, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

## 2. Purpose

This package exists to instantiate the customer eligibility evidence package from the evidence gathering plan and registry.

It answers:

**What customer eligibility evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Which users or customers are approved to participate in a future Class B pilot?**

It does not create:

- customer eligibility approval
- participant approval
- user onboarding approval
- KYC / AML approval
- customer outreach approval
- pilot approval
- legal approval
- regulatory approval
- implementation authority
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_GATHERING_PLAN.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_JURISDICTION_SELECTION_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`

Source inputs are used to define customer eligibility evidence requirements only. They do not create customer eligibility approval, legal conclusions, evidence acceptance, implementation authority, or execution approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Customer eligibility evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | External legal / compliance review; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no customer eligibility policy; no KYC / AML owner; no sanctions / PEP screening responsibility; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future customer eligibility assessment; KYC / AML responsibility evidence package; Trust UX / disclosure evidence package; Pilot Ops evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, or customer-eligible.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Candidate participant classes | Which participant classes are being considered for future Class B evidence review? | Internal analysis may frame candidate types; external legal / compliance review required for downstream eligibility significance | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | No participant class is approved. |
| Internal tester eligibility assumptions | Could internal testers participate, and under what constraints? | Internal analysis may frame assumptions; external legal / compliance review required for eligibility significance | Question framed / Missing | Review date required before downstream use | No participant class approved | Internal testing is not approved. |
| Employee / founder tester eligibility assumptions | Could employees or founders participate, and what conflict, consent, or legal constraints apply? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No participant class approved | Employee or founder participation is not approved. |
| Invited user eligibility assumptions | Could invited users participate, and what invitation, consent, and eligibility controls apply? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Invited-user participation is not approved. |
| Individual customer eligibility assumptions | Could individual customers participate, and what residency, age, KYC, sanctions, and limit constraints apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Individual customer eligibility is not approved. |
| SME eligibility assumptions | Could SMEs participate, and what business verification, industry, jurisdiction, and exposure constraints apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | SME eligibility is not approved. |
| Freelancer eligibility assumptions | Could freelancers participate as individuals or businesses, and which evidence class applies? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Freelancer eligibility is not approved. |
| Business customer eligibility assumptions | Could business customers participate, and what entity, beneficial-owner, industry, and transaction-purpose constraints apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | Business customer eligibility is not approved. |
| Residency constraints | Where must participants reside for future eligibility consideration? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No residency constraints | No residency constraint is approved. |
| Jurisdiction-specific eligibility constraints | Which eligibility constraints apply by candidate jurisdiction? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No jurisdiction selected; no legal / compliance review | No jurisdiction-specific eligibility rule is approved. |
| Age / capacity constraints | What minimum age, legal capacity, or authorized-signatory requirements apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No age / capacity constraints | No age or capacity rule is approved. |
| Sanctions / PEP exclusion criteria | Which sanctions, PEP, watchlist, or escalation criteria would exclude or flag a participant? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No sanctions / PEP screening responsibility | No exclusion process is approved. |
| KYC threshold requirements | What identity, entity, beneficial-owner, or document verification thresholds apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No KYC owner | No KYC threshold is approved. |
| AML monitoring applicability | What AML monitoring obligations apply by participant class, activity, and transaction pattern? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No AML owner | No AML process is approved. |
| Transaction-limit requirements | What transaction caps may apply by participant class, jurisdiction, rail, or risk posture? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No transaction-limit evidence | No transaction limit is approved. |
| Exposure-limit requirements | What exposure caps may apply by participant class, balance, asset, rail, or pilot state? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No exposure-limit evidence | No exposure limit is approved. |
| Pilot-size constraints | What total participant, volume, corridor, or duration limits may apply? | External legal / compliance review; internal analysis may frame operational questions | Question framed / Missing | Review date required before downstream use | No pilot-size evidence | No pilot size is approved. |
| Customer consent / acknowledgment requirements | What must participants consent to or acknowledge before any future Class B action? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No consent / disclosure evidence | No consent flow is approved. |
| Risk-disclosure prerequisites | What risk, custody, rail, FX, fee, withdrawal, liquidity, support, and dispute disclosures are required? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No consent / disclosure evidence | No disclosure is approved. |
| Financial-literacy or suitability considerations | Are any comprehension, suitability, or financial-literacy checks required? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | No suitability process is approved. |
| Unsupported customer classes | Which customer classes are prohibited or unsupported? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No unsupported participant-class evidence | No class is approved or rejected. |
| Restricted industries or business types | Which industries, business types, geographies, transaction purposes, or customer profiles are restricted? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No restricted business-type evidence | No restriction list is approved. |
| Onboarding evidence requirements | What evidence must exist before any participant could be onboarded in a future approved flow? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No onboarding evidence requirements | No onboarding flow is approved. |
| Offboarding / removal criteria | What criteria require removal, pause, suspension, or loss of eligibility? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No offboarding / removal criteria | No offboarding process is approved. |
| Failed eligibility review handling | What happens when eligibility review fails, flags, or cannot be completed? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No manual review / exception process | No failed-review process is approved. |
| Manual review / exception handling | Who reviews exceptions, what evidence is required, and what outcomes are allowed? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No manual review / exception process | No exception process is approved. |
| Support and complaint implications | What support, complaint, dispute, and ineligibility communication obligations apply? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No support / complaint obligation evidence | No support operation is approved. |
| Audit and retention requirements | What eligibility, KYC / AML, consent, review, and decision records must be retained? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No audit / retention evidence for eligibility records | No retention policy is approved. |
| Eligibility freshness / reassessment cadence | How often must eligibility evidence be refreshed or reassessed? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No customer eligibility policy | No reassessment cadence is approved. |

## 6. Open customer eligibility questions

Answers must come from qualified legal / compliance review and future governed acceptance, not this package.

### Candidate participant classes

- [ ] Which participant classes are being considered for future Class B evidence review?
- [ ] Are participants internal testers, founders, employees, invited users, individual customers, freelancers, SMEs, or business customers?
- [ ] Which participant classes are explicitly out of scope for now?
- [ ] Which assumptions are founder assumptions only?

### Jurisdiction and residency

- [ ] Which jurisdiction-specific eligibility constraints apply?
- [ ] Where must participants reside?
- [ ] Would operating location, user location, custody location, rail location, or treasury location affect eligibility?
- [ ] Would cross-border participation be prohibited or require additional review?

### KYC / AML / sanctions

- [ ] What identity verification requirements apply to each participant class?
- [ ] Who performs KYC?
- [ ] Who performs AML monitoring?
- [ ] Who screens sanctions and PEPs?
- [ ] What happens when a participant fails, flags, or requires manual review?

### Participant limits and exposure controls

- [ ] What transaction caps may apply?
- [ ] What exposure caps may apply?
- [ ] What pilot-size limits may apply?
- [ ] What participant-level risk caps may be required?
- [ ] What conditions require pausing or removing participant access?

### Customer consent and disclosures

- [ ] What must participants acknowledge before any future Class B action?
- [ ] What risk, custody, rail, stablecoin, fee, FX, withdrawal, liquidity, support, and dispute disclosures are required?
- [ ] What claims are prohibited before participant consent?
- [ ] What evidence of consent must be retained?

### Unsupported or restricted participant types

- [ ] Which participant classes are prohibited?
- [ ] Are any industries, business types, geographies, user profiles, age groups, or transaction purposes restricted?
- [ ] What evidence is required to classify a participant as unsupported?
- [ ] What happens if a participant becomes ineligible after onboarding?

### Support, complaints, and audit

- [ ] What support obligations apply to each participant class?
- [ ] What complaint or dispute paths are required?
- [ ] What audit evidence must be retained?
- [ ] What participant records must be refreshed or reviewed over time?

## 7. Candidate participant class template

| Candidate participant class | Evidence state | Source class | Key open questions | Known blocker | Downstream dependency | Notes |
|---|---|---|---|---|---|---|
| Internal tester | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD | No participant class approved | Future customer eligibility assessment | Placeholder only. |
| Employee / founder tester | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD | No participant class approved | Future customer eligibility assessment | Placeholder only. |
| Invited individual user | Question framed / Missing | External legal / compliance review; internal analysis may frame questions only | TBD | No participant class approved | Future customer eligibility assessment | Placeholder only. |
| Individual customer | Question framed / Missing | External legal / compliance review | TBD | No customer eligibility policy | Future customer eligibility assessment | Placeholder only. |
| Freelancer | Question framed / Missing | External legal / compliance review | TBD | No customer eligibility policy | Future customer eligibility assessment | Placeholder only. |
| SME | Question framed / Missing | External legal / compliance review | TBD | No customer eligibility policy | Future customer eligibility assessment | Placeholder only. |
| Business customer | Question framed / Missing | External legal / compliance review | TBD | No customer eligibility policy | Future customer eligibility assessment | Placeholder only. |

This template does not approve, rank, recommend, or reject any participant class. It does not create customer eligibility, onboarding approval, pilot approval, or customer-money authority.

## 8. Eligibility criteria template

| Eligibility criterion | Requirement to define | Evidence required | Source class expected | Related blocker | Status |
|---|---|---|---|---|---|
| Jurisdiction / residency | Define eligible jurisdiction and residency facts. | Dated jurisdiction and eligibility review. | External legal / compliance review | No jurisdiction selected; no residency constraints | Question framed / Missing |
| Age / capacity | Define age, capacity, and authorized-signatory constraints. | Dated eligibility review. | External legal / compliance review | No age / capacity constraints | Question framed / Missing |
| Identity verification | Define identity evidence required by participant class. | KYC / eligibility review. | External legal / compliance review | No KYC owner | Question framed / Missing |
| Sanctions / PEP screening | Define screening responsibility, thresholds, and escalation. | Sanctions / PEP review. | External legal / compliance review | No sanctions / PEP screening responsibility | Question framed / Missing |
| KYC completion | Define when KYC is complete, failed, stale, or escalated. | KYC responsibility and completion evidence. | External legal / compliance review | No KYC owner | Question framed / Missing |
| AML monitoring applicability | Define monitoring triggers and responsibility. | AML responsibility evidence. | External legal / compliance review | No AML owner | Question framed / Missing |
| Participant type | Define supported and unsupported participant categories. | Participant class review. | External legal / compliance review; internal analysis may frame questions only | No participant class approved | Question framed / Missing |
| Business type | Define eligible, unsupported, and restricted business categories. | Business-type review. | External legal / compliance review | No restricted business-type evidence | Question framed / Missing |
| Transaction purpose | Define permitted and prohibited transaction purposes. | Eligibility and AML review. | External legal / compliance review | No customer eligibility policy | Question framed / Missing |
| Transaction limit | Define caps by participant class, jurisdiction, or rail. | Transaction-limit evidence. | External legal / compliance review | No transaction-limit evidence | Question framed / Missing |
| Exposure limit | Define exposure caps by participant, asset, or pilot state. | Exposure-limit evidence. | External legal / compliance review | No exposure-limit evidence | Question framed / Missing |
| Pilot-size cap | Define total participant, volume, or duration limits. | Pilot-size evidence. | External legal / compliance review; internal analysis may frame operational questions | No pilot-size evidence | Question framed / Missing |
| Consent / acknowledgment | Define required acknowledgments before any future Class B action. | Consent evidence and disclosure review. | External legal / compliance review | No consent / disclosure evidence | Question framed / Missing |
| Risk disclosure acceptance | Define required risk disclosure acceptance evidence. | Risk-disclosure review. | External legal / compliance review | No consent / disclosure evidence | Question framed / Missing |
| Support / complaint pathway | Define required support, complaint, and dispute path by participant class. | Support / complaint obligation evidence. | External legal / compliance review | No support / complaint obligation evidence | Question framed / Missing |
| Audit / retention record | Define retained eligibility, consent, KYC / AML, and review records. | Audit / retention evidence. | External legal / compliance review | No audit / retention evidence for eligibility records | Question framed / Missing |
| Offboarding condition | Define removal, pause, suspension, or ineligibility conditions. | Offboarding criteria evidence. | External legal / compliance review | No offboarding / removal criteria | Question framed / Missing |
| Manual review requirement | Define manual-review triggers, reviewer role, evidence, and outcomes. | Manual-review process evidence. | External legal / compliance review | No manual review / exception process | Question framed / Missing |

This template does not define active eligibility rules or approve onboarding logic.

## 9. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Participant class review | External legal / compliance review dated and attributable to qualified review; internal analysis may frame candidate types | Founder assumption; product target segments; user demand | Participant class framing is not eligibility approval. |
| Residency / jurisdiction eligibility review | External legal / compliance review dated and attributable to qualified review | Founder assumption; market intent; repo doctrine alone | Residency and jurisdiction constraints require qualified review. |
| Age / capacity review | External legal / compliance review dated and attributable to qualified review | Generic age assumptions; internal analysis alone | Capacity and signatory questions require qualified review. |
| KYC requirements review | External legal / compliance review dated and attributable to qualified review; vendor / provider confirmation may support control facts | Founder assumption; internal analysis; KYC vendor availability alone | Vendor capability is not KYC sufficiency. |
| AML monitoring review | External legal / compliance review dated and attributable to qualified review; vendor / provider confirmation may support control facts | Founder assumption; internal analysis; generic AML policy examples | Monitoring obligations need scoped evidence. |
| Sanctions / PEP review | External legal / compliance review dated and attributable to qualified review; vendor / provider confirmation may support screening facts | Founder assumption; internal policy draft alone; generic vendor documentation | Screening responsibility and escalation need scoped evidence. |
| Transaction-limit review | External legal / compliance review dated and attributable to qualified review | Founder target caps; internal risk preference alone | Limits must not be inferred from risk appetite. |
| Exposure-limit review | External legal / compliance review dated and attributable to qualified review | Founder target exposure; product risk language alone | Exposure caps need evidence before downstream use. |
| Consent / disclosure review | External legal / compliance review dated and attributable to qualified review | Draft UX copy; repo doctrine; internal analysis alone | Consent evidence must be retained before reliance. |
| Unsupported participant review | External legal / compliance review dated and attributable to qualified review | Founder preference; product segmentation alone | Unsupported classes require evidence, not inference. |
| Restricted business-type review | External legal / compliance review dated and attributable to qualified review | Generic restricted-industry lists without scoped review | Business-type restrictions must match jurisdiction and model. |
| Support / complaint obligation review | External legal / compliance review dated and attributable to qualified review; support / incident evidence may support operating facts | Support template alone; internal escalation preference | Support obligations vary by participant class and jurisdiction. |
| Audit / retention requirement review | External legal / compliance review dated and attributable to qualified review; audit evidence may support internal facts | Generic retention examples; internal spreadsheet alone | Retention expectations require scoped review. |

- Founder assumption is not eligibility evidence.
- Repo doctrine is not customer eligibility approval.
- Internal analysis is not legal or compliance approval.
- Product target segments are not pilot eligibility approval.
- User demand is not eligibility approval.
- KYC vendor availability is not KYC sufficiency.
- Legal / compliance review must be dated and attributable to qualified review before downstream use.

## 10. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction-specific eligibility constraints and residency evidence | Unresolved / Evidence missing | Customer eligibility assessment; KYC / AML; Trust UX |
| No legal / compliance review | Qualified legal / compliance review of eligibility, KYC / AML, consent, support, and retention obligations | Unresolved / Evidence missing | Customer eligibility conclusions; ADR drafting readiness; implementation-preflight review |
| No customer eligibility policy | Eligibility criteria, restrictions, review process, and evidence | Unresolved / Evidence missing | Pilot scope; onboarding; support; Trust UX |
| No participant class approved | Participant class review and accepted eligibility evidence | Unresolved / Evidence missing | Customer eligibility assessment; Pilot Ops; support |
| No residency constraints | Residency and location evidence by candidate jurisdiction | Unresolved / Evidence missing | Customer eligibility assessment; KYC / AML scope |
| No age / capacity constraints | Age, capacity, and authorized-signatory evidence | Unresolved / Evidence missing | Onboarding consideration; participant review |
| No KYC owner | KYC responsibility, completion, failure, and evidence-owner review | Unresolved / Evidence missing | Customer eligibility; onboarding consideration; Pilot Ops |
| No AML owner | AML monitoring responsibility and escalation evidence | Unresolved / Evidence missing | Customer eligibility; rail review; support |
| No sanctions / PEP screening responsibility | Screening owner, criteria, escalation, and failed-review evidence | Unresolved / Evidence missing | Customer eligibility; onboarding consideration; support |
| No transaction-limit evidence | Transaction cap evidence by participant class, jurisdiction, rail, and risk posture | Unresolved / Evidence missing | Pilot Ops; Trust UX; implementation-preflight review |
| No exposure-limit evidence | Exposure cap evidence by participant class, asset, balance, and pilot state | Unresolved / Evidence missing | Pilot Ops; liquidity / withdrawal review; Trust UX |
| No pilot-size evidence | Participant count, volume, duration, and corridor evidence | Unresolved / Evidence missing | Pilot Ops; implementation-preflight review |
| No consent / disclosure evidence | Consent, acknowledgment, disclosure, and evidence-retention review | Unresolved / Evidence missing | Trust UX / disclosure package; onboarding consideration |
| No unsupported participant-class evidence | Unsupported class review and classification evidence | Unresolved / Evidence missing | Customer eligibility; support; Trust UX |
| No restricted business-type evidence | Restricted industry, business type, geography, profile, and purpose evidence | Unresolved / Evidence missing | Business customer eligibility; AML review |
| No support / complaint obligation evidence | Participant-specific support, complaint, dispute, and ineligibility handling evidence | Unresolved / Evidence missing | Support / dispute package; Trust UX |
| No audit / retention evidence for eligibility records | Eligibility, consent, KYC / AML, review, and decision retention evidence | Unresolved / Evidence missing | Audit / retention package; evidence acceptance |
| No manual review / exception process | Manual-review triggers, reviewer role, evidence, escalation, and outcome constraints | Unresolved / Evidence missing | KYC / AML; support; Pilot Ops |
| No offboarding / removal criteria | Removal, pause, suspension, and ineligibility handling evidence | Unresolved / Evidence missing | Pilot Ops; support; Trust UX |

No blocker in this package is closed.

## 11. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Customer eligibility policy | Eligibility posture may change with law, jurisdiction, product state, or participant class. | Review date required before downstream use. | New jurisdiction, participant class, product role, rail, or compliance direction. |
| Participant class assumptions | Candidate classes may change as governance or founder assumptions evolve. | Review date required before downstream use. | New target segment, pilot shape, invitation model, or operational assumption. |
| Jurisdiction / residency constraints | Location facts and jurisdiction rules may change. | Dated qualified review required before downstream use. | New jurisdiction, residency model, operating location, custody location, or rail location. |
| KYC requirements | Identity and entity-verification obligations may change. | Dated qualified review required before downstream use. | New participant class, vendor, jurisdiction, rail, or control owner. |
| AML monitoring requirements | Monitoring obligations may change with participant activity and jurisdiction. | Dated qualified review required before downstream use. | New transaction purpose, volume, rail, jurisdiction, or monitoring owner. |
| Sanctions / PEP requirements | Lists, screening obligations, and escalation rules may change. | Dated qualified review required before downstream use. | Sanctions list change, participant location change, vendor change, or screening-owner change. |
| Transaction limits | Caps may change with jurisdiction, participant type, rail, and risk posture. | Dated qualified review required before downstream use. | New rail, participant type, risk posture, legal update, or pilot-size assumption. |
| Exposure limits | Exposure constraints may change with model, asset path, custody, and pilot state. | Dated qualified review required before downstream use. | New asset, balance model, custody model, pilot state, or risk policy. |
| Pilot-size assumptions | Participant count, volume, duration, and corridor assumptions may change. | Review date required before downstream use. | New pilot model, corridor, scope, duration, or participant class. |
| Consent / disclosure requirements | Required acknowledgments and claims constraints may change. | Dated qualified review required before downstream use. | New disclosure surface, claim, participant class, jurisdiction, rail, or custody model. |
| Restricted participant classes | Unsupported classes and restrictions may change over time. | Dated qualified review required before downstream use. | New business type, geography, transaction purpose, risk policy, or legal update. |
| Support / complaint obligations | Participant support and complaint obligations may change with class and jurisdiction. | Dated qualified review required before downstream use. | New participant class, rail, jurisdiction, dispute path, or support owner. |
| Audit / retention requirements | Eligibility record, consent, KYC / AML, and review retention obligations may change. | Dated qualified review required before downstream use. | New data type, vendor, access model, retention use case, or jurisdiction. |
| Manual review / exception handling | Exception criteria and reviewer obligations may change. | Dated qualified review required before downstream use. | New participant class, vendor, escalation owner, risk trigger, or compliance direction. |

Freshness expectations are planning constraints only. They are not approved SLAs, eligibility policy, legal conclusions, compliance policy, onboarding rules, or customer eligibility approval.

## 12. Downstream dependency effect

- **KYC / AML responsibility evidence package:** cannot close without eligibility class and participant-scope assumptions.
- **Trust UX / disclosure evidence package:** must reflect eligibility-specific disclosures, consent, unsupported participant messaging, and prohibited claims.
- **Pilot Ops evidence package:** must reflect participant control, eligibility checks, manual review, limits, and offboarding criteria.
- **Reconciliation evidence package:** must know which participant records, limits, and eligibility states affect transaction review.
- **Support / dispute evidence package:** must reflect participant-type support obligations and ineligibility handling.
- **Audit / retention evidence package:** must reflect eligibility evidence, consent records, KYC / AML evidence, and participant review history.
- **ADR drafting readiness:** cannot proceed for eligibility-sensitive ADRs until required eligibility evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** cannot treat customer eligibility as closed without accepted evidence.

## 13. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Customer eligibility evidence package |
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
| Non-authorization note | Evidence intake does not approve customer eligibility, onboarding, KYC / AML sufficiency, Class B execution, implementation, or customer-money movement. |

## 14. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the customer eligibility package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, customer-eligible, onboarding-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 15. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify customer eligibility evidence and does not approve any customer class, user segment, participant type, eligibility policy, onboarding flow, KYC / AML process, customer outreach, pilot participation, Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future customer eligibility evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / partner evidence where applicable, and operational evidence where applicable.
