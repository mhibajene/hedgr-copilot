# HEDGR — Class B Custody Provider / Model Evidence Package

## 1. Status / Authority / Scope

**Status:** Evidence package skeleton; documentation-only.

**Authority:** Non-authoritative evidence-planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, `EVID-B-001`, `EVID-B-002`, `EVID-B-003`, `EVID-B-004`, `EVID-B-005`, `EVID-B-006`, future qualified legal / compliance review, and future provider evidence where applicable.

**Scope:** Defines required custody provider / model evidence items, source expectations, review questions, blockers, freshness expectations, and downstream dependencies for future Class B consideration.

**Mode:** Evidence package scaffolding only; not evidence gathering, evidence acceptance, custody approval, provider approval, wallet-provider approval, asset-control approval, recovery approval, legal advice, regulatory approval, or Class B readiness.

This package does not approve any custody provider, wallet provider, embedded wallet provider, custody model, asset-control model, key-management process, wallet recovery process, custody operation, custody claim, provider responsibility model, external engagement, Class B execution, implementation, staging, live operations, deposits, withdrawals, rails, stablecoin conversion, treasury operations, Copilot execution, or customer fund movement.

## 2. Purpose

This package exists to instantiate the custody provider / model evidence package from the evidence gathering plan and registry.

It answers:

**What custody provider / model evidence must be gathered and reviewed before future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Which custody model or provider is approved for Hedgr?**

It does not create:

- custody approval
- provider approval
- wallet-provider approval
- embedded wallet approval
- key-management approval
- asset-control approval
- recovery approval
- customer asset custody approval
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
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_CUSTOMER_ELIGIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_KYC_AML_RESPONSIBILITY_EVIDENCE_PACKAGE.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_OPS_RUNBOOK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_STAGING_LIVE_STATE_SEPARATION_MEMO.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define custody provider / model evidence requirements only. They do not create custody approval, provider approval, evidence acceptance, implementation authority, or execution approval.

This package does not provide legal advice or claim regulatory approval.

## 4. Evidence package summary

| Field | Value |
|---|---|
| Evidence package | Custody provider / model evidence package |
| Evidence state | Question framed / Missing |
| Source class expected | External legal / compliance review; vendor / provider documentation or confirmation where applicable; internal analysis may frame questions only |
| Owner placeholder | TBD by future governed review |
| Freshness expectation | Review date required before downstream use |
| Related blockers | No jurisdiction selected; no legal / compliance review; no customer eligibility policy; no KYC / AML owner; no custody model selected; no provider responsibility evidence; no custody legal boundary; no asset-control lifecycle evidence; no accepted Class B ADRs; no implementation-specific §7a brief |
| Downstream use | Future custody model assessment; provider responsibility review; Trust UX / disclosure evidence package; Pilot Ops evidence package; Reconciliation evidence package; Support / dispute evidence package; Audit / retention evidence package; ADR drafting readiness review; implementation-proposal preflight review; future §7 / §7a consideration only |

This summary is a registry entry scaffold only. It does not mark evidence as gathered, accepted, approved, sufficient, custody-ready, provider-ready, wallet-ready, or Class B ready.

## 5. Required evidence items

| Evidence item | Required question | Expected source class | Evidence state | Freshness / review expectation | Related blocker | Notes |
|---|---|---|---|---|---|---|
| Custody model options | What custody models are possible candidates for future Class B consideration? | Internal analysis may frame options; external legal / compliance review required for downstream significance | Question framed / Missing | Review date required before downstream use | No custody model selected | No custody model is approved, ranked, or selected. |
| Custody legal boundary | Who legally holds, controls, or is responsible for user assets under each possible model? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No custody legal boundary; no legal / compliance review | No legal custody conclusion is accepted. |
| Provider / vendor candidate class | What provider or vendor classes may need review? | Internal analysis may frame classes; vendor / provider documentation and confirmation required for provider facts | Question framed / Missing | Review date required before downstream use | No provider responsibility evidence | No provider or vendor is selected. |
| Provider role boundary | What would a provider control, operate, support, or disclaim? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No provider responsibility evidence | Provider marketing is not responsibility evidence. |
| Hedgr role boundary | What responsibility would remain with Hedgr under each model? | External legal / compliance review; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No custody legal boundary | No Hedgr custody role is approved. |
| User asset-control boundary | What control, access, ownership, or recovery rights would users have? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No asset-control lifecycle evidence | No user asset-control claim is approved. |
| Private-key / signing authority boundary | Who controls private keys, access credentials, or signing authority? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No private-key / signing authority evidence | No key-management process is approved. |
| Wallet creation responsibility | Who creates wallets and under what evidence-backed role? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No wallet creation responsibility evidence | No wallet creation flow is approved. |
| Wallet recovery responsibility | Who handles recovery, lost access, lockout, compromise, or incapacity? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No wallet recovery evidence | No recovery process is approved. |
| Account lockout handling | What happens when a user is locked out? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No wallet recovery evidence | No lockout support or custody outcome is approved. |
| Compromised account handling | What happens when credentials, devices, or signing authority may be compromised? | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No compromised-account evidence | No incident or recovery operation is approved. |
| Provider outage handling | What happens during provider outage or degraded service? | Vendor / provider documentation; vendor / provider confirmation; operational evidence where separately authorized | Question framed / Missing | Review date required before downstream use | No provider outage handling evidence | No availability, fallback, or support claim is approved. |
| Provider failure / loss responsibility | Who is responsible for provider failure, asset loss, freeze, delay, or unresolved state? | Vendor / provider confirmation; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No provider / vendor responsibility evidence | No loss responsibility claim is approved. |
| Asset-control lifecycle | What custody and control states exist from pre-onboarding through closure and retention? | External legal / compliance review; vendor / provider documentation; internal analysis may frame lifecycle only | Question framed / Missing | Review date required before downstream use | No asset-control lifecycle evidence | No wallet state or transaction semantics are created. |
| Deposit custody transition | When does deposit custody begin, transfer, fail, or remain unresolved? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No deposit custody transition evidence | No deposit flow or custody transition is approved. |
| Withdrawal custody transition | When does withdrawal custody transfer, complete, fail, delay, or remain unresolved? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No withdrawal custody transition evidence | No withdrawal flow or custody transition is approved. |
| Stablecoin custody boundary | Who holds or controls stablecoins, if any? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No stablecoin custody evidence | No stablecoin custody path is approved. |
| Conversion custody boundary | Who controls assets during conversion, redemption, transfer, or settlement? | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No conversion custody evidence | No conversion path is approved. |
| Yield exposure custody boundary, if ever applicable | Would yield exposure change custody, control, or responsibility? | External legal / compliance review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No custody model selected; no provider responsibility evidence | No yield exposure or custody path is approved. |
| Ledger / accounting truth dependency | What records are custody evidence versus ledger or accounting truth? | External legal / compliance review; reconciliation evidence; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No ledger / accounting truth dependency evidence | No ledger or accounting truth is approved. |
| Reconciliation evidence dependency | What custody evidence must reconciliation preserve or compare? | Reconciliation evidence; vendor / provider documentation; internal analysis may frame questions only | Question framed / Missing | Review date required before downstream use | No reconciliation evidence dependency | No reconciliation process is approved. |
| Support / dispute dependency | What support and dispute limits apply during custody uncertainty? | External legal / compliance review; support / incident evidence; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No support / dispute responsibility evidence | No support operation or remedy is approved. |
| Audit / retention dependency | What custody records, provider evidence, recovery evidence, and dispute evidence must be retained? | External legal / compliance review; audit evidence; vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No audit / retention evidence for custody records | No retention or audit policy is approved. |
| User-facing custody claim constraints | What may Hedgr say about custody, access, protection, recovery, ownership, and withdrawals? | External legal / compliance review; Trust UX review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No custody claim review | No customer-facing custody claim is approved. |
| Insurance / protection / guarantee claim constraints | What claims about insurance, protection, guarantees, or loss coverage are prohibited or require evidence? | External legal / compliance review; vendor / provider confirmation where applicable | Question framed / Missing | Review date required before downstream use | No custody claim review | No insurance, protection, or guarantee claim is approved. |
| Provider documentation requirements | What provider documentation must be preserved before downstream review? | Vendor / provider documentation | Question framed / Missing | Review date required before downstream use | No provider documentation requirements | Documentation availability is not provider approval. |
| Provider confirmation requirements | What explicit provider confirmations are required beyond public documentation? | Vendor / provider confirmation | Question framed / Missing | Review date required before downstream use | No provider confirmation requirements | No provider confirmation has been received or accepted. |
| Legal / compliance review requirements | What legal / compliance review is required before custody model assessment? | External legal / compliance review | Question framed / Missing | Review date required before downstream use | No legal / compliance review | No legal conclusion is accepted. |
| ADR dependency for custody model selection | Which custody model decisions would require accepted ADRs before implementation consideration? | Repo governance artifact; accepted ADR where future review creates one; external legal / compliance review | Question framed / Missing | Review date required before downstream use | No accepted custody ADR | No ADR is drafted, accepted, or made ready. |

Do not mark any evidence item as received, accepted, approved, selected, sufficient, custody-ready, provider-ready, wallet-ready, or Class B ready.

## 6. Open custody provider / model questions

Answers must come from qualified legal / compliance review, future governed acceptance, and provider evidence where applicable, not this package.

### Custody model and legal role

- [ ] What custody models are being considered?
- [ ] Is the model self-custody, embedded wallet custody, partner custody, qualified custodian, omnibus custody, segregated custody, internal-test-only, or another model?
- [ ] What legal role would Hedgr play under each model?
- [ ] What legal / compliance review is required before any model can be assessed?

### Provider / vendor boundary

- [ ] Which provider or vendor class is being considered?
- [ ] What does the provider control?
- [ ] What remains Hedgr's responsibility?
- [ ] What remains the user's responsibility?
- [ ] What documentation is required?
- [ ] What confirmation is required beyond public vendor documentation?

### Asset-control and signing authority

- [ ] Who controls private keys, access credentials, or signing authority?
- [ ] Who can initiate asset movement?
- [ ] Who can approve, block, pause, or reverse movement?
- [ ] Who controls assets during deposit, holding, conversion, withdrawal, failure, or dispute states?

### Wallet lifecycle and recovery

- [ ] Who creates the wallet?
- [ ] Who owns identity-binding assumptions?
- [ ] How are account recovery, lost access, device changes, lockout, compromise, or user death / incapacity handled?
- [ ] What recovery claims are prohibited until evidence exists?

### Deposit and withdrawal custody transitions

- [ ] When does deposit custody begin?
- [ ] When is a deposit pending, failed, completed, or unresolved?
- [ ] When does withdrawal custody transfer?
- [ ] What evidence proves finality?
- [ ] Who is responsible during delayed, failed, reversed, disputed, or unresolved states?

### Stablecoin and conversion custody

- [ ] Who holds stablecoins, if any?
- [ ] Is stablecoin exposure direct to the user, held by a provider, held by Hedgr, or abstracted?
- [ ] Who controls conversion, redemption, transfer, or settlement?
- [ ] What stablecoin custody risks must be disclosed?

### Failure, loss, and dispute responsibility

- [ ] Who is responsible if assets are lost, frozen, delayed, incorrectly credited, incorrectly debited, inaccessible, or disputed?
- [ ] What happens during provider outage, chain issue, compliance hold, rail failure, or account lockout?
- [ ] What support, dispute, and incident paths are required?

### User-facing custody claims

- [ ] What may Hedgr say about custody, protection, access, recovery, insurance, ownership, safety, guarantees, and withdrawal availability?
- [ ] What claims are prohibited until legal, provider, operational, and audit evidence exists?
- [ ] What Trust UX review is required before any customer-facing custody wording?

## 7. Custody model comparison template

| Candidate custody model | Evidence state | Source class | Key open questions | Known blocker | Downstream dependency | Notes |
|---|---|---|---|---|---|---|
| Self-custody model | Question framed / Missing | Internal analysis may frame; legal / compliance review required | Who controls keys, signs movement, recovers access, and bears loss? | No custody model selected | Custody ADR readiness; Trust UX; support; audit | No self-custody model is approved. |
| Embedded wallet custody model | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | What does the embedded wallet provider control and disclaim? | No provider responsibility evidence | Provider review; recovery; support; audit | No embedded wallet provider is approved. |
| Partner / provider custody model | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | Which partner controls assets, records, recovery, and disputes? | No provider responsibility evidence | Custody review; reconciliation; support | No partner or provider custody model is approved. |
| Qualified custodian model | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | What qualification, jurisdiction, segregation, and protection evidence exists? | No legal / compliance review; no provider evidence | Custody ADR readiness; claims review | No qualified custodian model is approved. |
| Omnibus custody model | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | What customer-level visibility, claims, reconciliation, and loss allocation exist? | No asset-control lifecycle evidence | Ledger / reconciliation review; support | No omnibus custody model is approved. |
| Segregated custody model | Question framed / Missing | Vendor / provider documentation; vendor / provider confirmation; legal / compliance review | What segregation evidence, account mapping, and audit evidence exist? | No audit / retention evidence | Audit; reconciliation; Trust UX | No segregated custody model is approved. |
| Internal-test-only custody model | Question framed / Missing | Internal analysis; legal / compliance review where required | What no-customer-money boundary, participant restriction, and evidence labels are required? | No implementation-specific §7a brief | Staging / live-state review; audit | No internal-test environment or custody operation is approved. |

This template does not approve, rank, recommend, reject, or select any custody model. It does not create custody approval, provider approval, wallet approval, implementation approval, or customer-money authority.

## 8. Custody responsibility boundary template

| Responsibility area | User role | Hedgr role | Provider / vendor role | Partner / regulated entity role | Evidence required | Status |
|---|---|---|---|---|---|---|
| Wallet creation | TBD | TBD | TBD | TBD | Wallet creation responsibility evidence | Question framed / Missing |
| Identity binding | TBD | TBD | TBD | TBD | KYC / AML and custody identity-binding evidence | Question framed / Missing |
| Private-key / signing authority | TBD | TBD | TBD | TBD | Private-key / signing authority evidence | Question framed / Missing |
| Asset custody | TBD | TBD | TBD | TBD | Custody legal boundary and provider responsibility evidence | Question framed / Missing |
| Deposit custody transition | TBD | TBD | TBD | TBD | Deposit custody transition evidence | Question framed / Missing |
| Withdrawal custody transition | TBD | TBD | TBD | TBD | Withdrawal custody transition evidence | Question framed / Missing |
| Stablecoin holding | TBD | TBD | TBD | TBD | Stablecoin custody evidence | Question framed / Missing |
| Conversion / redemption | TBD | TBD | TBD | TBD | Conversion custody and rail evidence | Question framed / Missing |
| Account recovery | TBD | TBD | TBD | TBD | Wallet recovery evidence | Question framed / Missing |
| Account lockout | TBD | TBD | TBD | TBD | Lockout handling evidence | Question framed / Missing |
| Compromised credentials | TBD | TBD | TBD | TBD | Compromised account handling evidence | Question framed / Missing |
| Provider outage | TBD | TBD | TBD | TBD | Provider outage handling evidence | Question framed / Missing |
| Failed transaction | TBD | TBD | TBD | TBD | Custody transition, rail, support, and reconciliation evidence | Question framed / Missing |
| Disputed transaction | TBD | TBD | TBD | TBD | Support / dispute and custody responsibility evidence | Question framed / Missing |
| Compliance hold | TBD | TBD | TBD | TBD | Legal / compliance, KYC / AML, and custody evidence | Question framed / Missing |
| Support handoff | TBD | TBD | TBD | TBD | Support / dispute responsibility evidence | Question framed / Missing |
| Audit evidence retention | TBD | TBD | TBD | TBD | Audit / retention requirements | Question framed / Missing |

This template does not assign active responsibility, approve any provider, approve custody sufficiency, or authorize wallet operations.

## 9. Asset-control lifecycle template

| Lifecycle state | Requirement to define | Evidence required | Owner placeholder | User-facing constraint | Status |
|---|---|---|---|---|---|
| Pre-onboarding | Define whether any custody or wallet assumption exists before onboarding. | Legal / compliance and eligibility evidence | TBD | Must not imply access or custody approval. | Question framed / Missing |
| Wallet creation | Define who creates wallet or account infrastructure. | Wallet creation responsibility evidence | TBD | Must not imply wallet approval. | Question framed / Missing |
| Wallet active | Define what active means and who controls access. | Provider responsibility and key-control evidence | TBD | Must not imply unrestricted access or guarantees. | Question framed / Missing |
| Deposit initiated | Define custody state when a deposit starts. | Deposit custody transition evidence | TBD | Must not imply deposit completion. | Question framed / Missing |
| Deposit pending | Define pending custody, rail, and support state. | Custody transition, rail, and support evidence | TBD | Must not promise timing or finality. | Question framed / Missing |
| Deposit failed | Define failure evidence, responsibility, and communication. | Provider, rail, reconciliation, and support evidence | TBD | Must not imply recovery or refund without evidence. | Question framed / Missing |
| Deposit completed | Define evidence proving completion and custody state. | Finality, custody, and reconciliation evidence | TBD | Must not imply ledger truth without approved source. | Question framed / Missing |
| Stable asset held | Define who holds or controls stable assets. | Stablecoin custody evidence | TBD | Must not imply insured, guaranteed, or risk-free status. | Question framed / Missing |
| Conversion pending | Define custody during conversion. | Conversion custody evidence | TBD | Must not imply price, timing, or completion. | Question framed / Missing |
| Conversion failed | Define failure state, responsibility, and user claim limits. | Conversion custody and support evidence | TBD | Must not promise automatic reversal or remedy. | Question framed / Missing |
| Conversion completed | Define evidence proving conversion completion and custody state. | Conversion finality and custody evidence | TBD | Must not imply accounting truth without approved source. | Question framed / Missing |
| Withdrawal initiated | Define custody state when withdrawal begins. | Withdrawal custody transition evidence | TBD | Must not imply approval or completion. | Question framed / Missing |
| Withdrawal pending review | Define review owner, blocker, and evidence. | KYC / AML, custody, rail, and support evidence | TBD | Must not promise release timing. | Question framed / Missing |
| Withdrawal pending custody action | Define provider or custody action state. | Provider confirmation and custody transition evidence | TBD | Must not imply provider action is guaranteed. | Question framed / Missing |
| Withdrawal pending rail action | Define rail handoff and custody state. | Rail and custody evidence | TBD | Must not imply settlement finality. | Question framed / Missing |
| Withdrawal delayed | Define delay cause, owner, and support path. | Support, rail, custody, and provider outage evidence | TBD | Must not promise resolution timing. | Question framed / Missing |
| Withdrawal failed | Define failure evidence and responsibility. | Withdrawal custody transition and dispute evidence | TBD | Must not imply refund, reversal, or remedy without evidence. | Question framed / Missing |
| Withdrawal completed | Define evidence proving finality and custody transfer. | Finality, rail, custody, and reconciliation evidence | TBD | Must not imply ledger truth without approved source. | Question framed / Missing |
| Account locked | Define lockout cause, owner, and permitted communication. | Account lockout handling evidence | TBD | Must not imply recovery entitlement. | Question framed / Missing |
| Account recovery pending | Define recovery process, limits, and evidence. | Wallet recovery evidence | TBD | Must not promise recovery. | Question framed / Missing |
| Provider outage | Define custody, support, and user communication during outage. | Provider outage handling evidence | TBD | Must not imply availability or fallback guarantee. | Question framed / Missing |
| Dispute / support case | Define dispute evidence, owner, and closure limits. | Support / dispute and audit evidence | TBD | Must not promise outcome. | Question framed / Missing |
| Account closure | Define custody, asset return, retention, and support implications. | Legal / compliance, custody, and retention evidence | TBD | Must not imply closure process approval. | Question framed / Missing |
| Record retention | Define custody records, provider evidence, and access controls. | Audit / retention evidence | TBD | Must not imply retention policy approval. | Question framed / Missing |

This lifecycle template does not create wallet state, custody state, transaction semantics, ledger truth, recovery logic, or customer-money authority.

## 10. Evidence source expectations

| Evidence type | Acceptable source class | Not sufficient as source | Notes |
|---|---|---|---|
| Custody legal boundary review | External legal / compliance review dated and attributable to qualified review | Founder assumption; repo doctrine; internal analysis | Custody legal role cannot be inferred from product intent. |
| Custody model review | External legal / compliance review; vendor / provider documentation and confirmation where applicable; internal analysis may frame candidate models | Product roadmap; provider availability; internal preference | Model review does not select or approve a model. |
| Provider role review | Vendor / provider documentation; explicit vendor / provider confirmation; external legal / compliance review | Vendor marketing pages; generic capability pages | Documentation and explicit confirmation must be distinguished. |
| Wallet creation responsibility review | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | UI flow intent; product assumptions | Wallet creation facts require provider and legal boundary evidence. |
| Private-key / signing authority review | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Internal architecture assumption; marketing copy | Key and signing authority require specific evidence. |
| Asset-control lifecycle review | External legal / compliance review; vendor / provider documentation; provider confirmation where applicable | Lifecycle template alone; internal analysis alone | Lifecycle evidence must map states to responsibility and claims. |
| Recovery process review | Vendor / provider documentation; vendor / provider confirmation; external legal / compliance review | Support preference; generic recovery examples | Recovery claims are prohibited until evidence exists. |
| Provider outage / failure review | Vendor / provider documentation; vendor / provider confirmation; operational evidence where separately authorized | Uptime marketing; generic status page | Outage and failure responsibility must be evidenced. |
| Deposit custody transition review | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; rail evidence | Product flow sketch; prototype copy | Deposit custody transition is not approved by describing it. |
| Withdrawal custody transition review | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation; rail evidence | Product flow sketch; support preference | Withdrawal custody transition requires custody and rail evidence. |
| Stablecoin custody review | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Stablecoin availability; repo doctrine; product intent | Stablecoin custody must not be inferred from USDC intent. |
| Conversion custody review | External legal / compliance review; vendor / provider documentation; vendor / provider confirmation | Conversion product intent; vendor availability | Conversion responsibility and settlement require evidence. |
| User-facing custody claim review | External legal / compliance review; Trust UX review; vendor / provider confirmation where applicable | Internal copy draft; founder assumption; product positioning | Custody, protection, access, insurance, guarantee, and recovery claims require review. |
| Support / dispute responsibility review | External legal / compliance review; vendor / provider confirmation; support / incident evidence where applicable | Support script alone; internal escalation preference | Support cannot become custody outcome authority. |
| Audit / retention requirement review | External legal / compliance review; audit evidence; provider documentation where applicable | Internal checklist alone | Retention and audit requirements must identify owner and source class. |

- Founder assumption is not custody evidence.
- Repo doctrine is not custody approval.
- Internal analysis is not legal or provider approval.
- Product intent is not custody model selection.
- Vendor marketing pages are not provider responsibility evidence.
- Provider availability is not custody sufficiency.
- Legal / compliance review must be dated and attributable to qualified review before downstream use.
- Provider / vendor responsibility evidence must distinguish public documentation from explicit provider confirmation.

## 11. Blocker mapping

| Blocker | Evidence needed | Current posture | Downstream blocked area |
|---|---|---|---|
| No jurisdiction selected | Jurisdiction-specific custody legal boundary evidence | Unresolved / Evidence missing | Legal / compliance review; custody model review; claims review |
| No legal / compliance review | Qualified custody, provider-role, asset-control, recovery, and claims review | Unresolved / Evidence missing | Custody model assessment; disclosures; ADR readiness; implementation-preflight review |
| No customer eligibility policy | Eligibility constraints affecting custody, wallet access, recovery, and support | Unresolved / Evidence missing | Wallet creation; recovery; support; Trust UX |
| No KYC / AML owner | KYC / AML dependencies for wallet access, custody holds, and transaction review | Unresolved / Evidence missing | Wallet lifecycle; custody holds; provider responsibility |
| No custody model selected | Custody model options, legal role, and provider evidence | Unresolved / Evidence missing | Custody review; Trust UX; reconciliation; ADR readiness |
| No provider / vendor responsibility evidence | Provider documentation, explicit confirmation, and responsibility boundary review | Unresolved / Evidence missing | Provider role; recovery; outage; support; audit |
| No custody legal boundary | Custody legal role, asset-control, loss, recovery, and claim evidence | Unresolved / Evidence missing | Customer-facing claims; ADR readiness; support |
| No asset-control lifecycle evidence | Lifecycle state map, responsibility owner, evidence, and claim limits | Unresolved / Evidence missing | Deposit / withdrawal states; reconciliation; support |
| No wallet creation responsibility evidence | Wallet creation owner and provider evidence | Unresolved / Evidence missing | Wallet lifecycle; onboarding; support |
| No private-key / signing authority evidence | Key-control, signing authority, and movement-initiation evidence | Unresolved / Evidence missing | Custody model; recovery; user claims |
| No wallet recovery evidence | Recovery process, lockout, compromise, incapacity, and support evidence | Unresolved / Evidence missing | Support; Trust UX; custody claims |
| No provider outage handling evidence | Outage, degraded service, fallback, communication, and responsibility evidence | Unresolved / Evidence missing | Support; withdrawal; recovery; audit |
| No failed / disputed transaction responsibility evidence | Failure, dispute, remedy, closure, and evidence-owner review | Unresolved / Evidence missing | Support; reconciliation; audit; Trust UX |
| No deposit custody transition evidence | Deposit pending, failed, completed, finality, and custody-owner evidence | Unresolved / Evidence missing | Deposit review; reconciliation; support |
| No withdrawal custody transition evidence | Withdrawal pending, delayed, failed, completed, finality, and custody-owner evidence | Unresolved / Evidence missing | Withdrawal review; liquidity; support |
| No stablecoin custody evidence | Stablecoin holding, control, protection, and risk evidence | Unresolved / Evidence missing | Stablecoin / conversion review; Trust UX |
| No conversion custody evidence | Conversion, redemption, transfer, settlement, and failure evidence | Unresolved / Evidence missing | Conversion review; rail review; support |
| No custody claim review | Allowed and prohibited custody, recovery, access, insurance, and guarantee claims | Unresolved / Evidence missing | Trust UX; marketing; support; Copilot-proximity review |
| No support / dispute responsibility evidence | Support handoff, dispute path, incident handling, and closure limits | Unresolved / Evidence missing | Support package; Pilot Ops; audit |
| No audit / retention evidence for custody records | Custody records, provider evidence, recovery evidence, dispute evidence, and access controls | Unresolved / Evidence missing | Audit / retention package; evidence acceptance |
| No accepted custody ADR | Accepted ADRs where material custody decisions require ADR treatment | Unresolved / Evidence missing | Custody model selection; ADR drafting readiness |
| No implementation-specific §7a brief | Bounded §7a brief after evidence and governance review | Unresolved / Evidence missing | Implementation proposal, §7 activation, and execution brief |

Do not mark any blocker as closed.

## 12. Freshness / review expectations

| Evidence area | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Custody legal boundary | Legal role and custody interpretation may change by jurisdiction, model, or provider. | Dated qualified review required before downstream use. | Jurisdiction, provider, user class, asset type, or legal posture changes. |
| Custody model options | Candidate models may change as providers, rails, and legal constraints change. | Review date required before downstream use. | Provider, jurisdiction, product scope, or operational scope changes. |
| Provider / vendor documentation | Provider capabilities, limits, terms, and controls may change. | Dated documentation required before downstream use. | Provider terms, API, custody model, support model, or service status changes. |
| Provider / vendor confirmation | Explicit confirmation may be scoped, time-limited, or conditional. | Dated and attributable confirmation required before downstream use. | Contract, account scope, environment, provider policy, or support scope changes. |
| Wallet creation responsibility | Wallet-creation roles may change by provider, customer class, or environment. | Dated provider and legal / compliance review required. | Provider flow, identity-binding, user class, or environment changes. |
| Private-key / signing authority | Key-control facts may change with provider architecture or account type. | Dated provider confirmation and legal / compliance review required. | Provider architecture, custody model, account type, or recovery model changes. |
| Asset-control lifecycle | Lifecycle states may change with deposit, withdrawal, conversion, recovery, support, or rail design. | Dated governed review required before downstream use. | New lifecycle state, rail, provider, asset, or support path changes. |
| Recovery process | Recovery capabilities and constraints may change by provider and legal posture. | Dated provider confirmation and legal / compliance review required. | Provider recovery policy, user class, identity-binding, or support process changes. |
| Provider outage / failure process | Outage handling and responsibility may change with provider terms and operations. | Dated provider evidence required before downstream use. | Provider SLA, support scope, incident process, or terms change. |
| Deposit custody transition | Deposit state and custody boundary may change by rail, provider, and settlement process. | Dated legal / compliance, provider, and rail evidence required. | Rail, provider, asset, finality, or process changes. |
| Withdrawal custody transition | Withdrawal state and custody boundary may change by rail, provider, and settlement process. | Dated legal / compliance, provider, and rail evidence required. | Rail, provider, asset, finality, or process changes. |
| Stablecoin custody | Stablecoin custody risk and responsibility may change by asset, provider, and jurisdiction. | Dated legal / compliance and provider evidence required. | Stablecoin, chain, provider, jurisdiction, or terms change. |
| Conversion custody | Conversion custody may change with provider, settlement, redemption, or rail path. | Dated provider, rail, and legal / compliance evidence required. | Conversion path, provider, settlement process, or asset changes. |
| Support / dispute responsibility | Support and dispute responsibility may change with provider role, custody model, and legal constraints. | Dated legal / compliance and provider evidence required. | Support owner, provider terms, dispute path, or user class changes. |
| Audit / retention requirements | Custody record requirements may change by legal posture, provider, and evidence use. | Dated legal / compliance and audit review required. | Record type, jurisdiction, provider, retention use case, or access-control change. |
| Custody claims / disclosures | Allowed claims may change with legal review, provider evidence, and operational evidence. | Dated legal / compliance and Trust UX review required. | Provider, model, asset, insurance/protection claim, or disclosure posture changes. |

Freshness expectations are planning constraints only. They are not approved SLAs, custody policy, legal conclusions, provider approval, wallet operations, onboarding rules, or customer asset-control approval.

## 13. Downstream dependency effect

- **Rail / vendor permission evidence package:** cannot treat rail movement as assessable without custody transition and asset-control boundaries.
- **Rail settlement / finality evidence package:** must reflect custody-state finality and provider evidence.
- **Stablecoin / conversion evidence package:** depends on stablecoin custody, conversion custody, and asset-control lifecycle evidence.
- **Liquidity / withdrawal control evidence package:** cannot mature without withdrawal custody transition, provider release assumptions, recovery path, and failure responsibility evidence.
- **Trust UX / disclosure evidence package:** must reflect custody-specific allowed and prohibited claims.
- **Pilot Ops evidence package:** must reflect custody review, approval, pause, escalation, and failure responsibilities.
- **Reconciliation evidence package:** must map custody evidence to user-visible state, support state, and audit evidence.
- **Support / dispute evidence package:** must define support limits around custody uncertainty, account lockout, provider outage, recovery, and disputed custody states.
- **Audit / retention evidence package:** must capture custody-state evidence, provider evidence, recovery evidence, dispute evidence, and retention requirements.
- **ADR drafting readiness:** cannot proceed for custody-sensitive ADRs until required custody evidence exists or blockers are explicitly recorded.
- **Implementation-proposal preflight:** cannot treat custody provider / model questions as closed without accepted evidence.

## 14. Evidence intake placeholders

| Intake field | Placeholder |
|---|---|
| Evidence title | TBD |
| Evidence package | Custody provider / model evidence package |
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
| Non-authorization note | Evidence intake does not approve custody provider, custody model, wallet provider, asset-control, Class B execution, implementation, or customer-money movement. |

## 15. Registry update instruction

After this package skeleton is merged:

- `HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` should reflect the custody provider / model package shell as created.
- Current evidence state must remain Question framed / Missing unless actual evidence is introduced by a future governed ticket.
- The registry must not mark the package as accepted, approved, sufficient, custody-ready, provider-ready, wallet-ready, ADR-ready, implementation-ready, or Class B ready.
- Future evidence-state changes require source pointers and separate governed review.

## 16. Non-authorization statement

This package is non-authoritative and documentation-only. It does not gather, approve, validate, accept, or certify custody provider / model evidence and does not approve any custody provider, wallet provider, embedded wallet provider, custody model, asset-control model, key-management process, wallet recovery process, custody operation, custody claim, provider responsibility model, external engagement, Class B execution, implementation, staging, sandbox use, internal testing, live operations, deposits, withdrawals, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future custody evidence acceptance, legal / compliance evidence acceptance, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, qualified legal / compliance review, jurisdiction evidence review, customer eligibility evidence review, KYC / AML evidence review, relevant spine-artifact review, accepted ADRs where required, vendor / provider evidence where applicable, and operational evidence where applicable.
