# HEDGR - Class B Rail Classification Register

## 1. Status / Authority / Scope

**Status:** Rail classification register; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, and vendor / partner evidence.

**Scope:** Frames how future Class B deposit and withdrawal rails must be classified before implementation consideration.

**Mode:** Rail-state classification only, not rail approval or activation.

This register does not approve, activate, integrate, or operationalize any rail and does not authorize implementation, execution, custody, deposits, withdrawals, stablecoin conversion, ledger mutation, treasury operations, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This register exists to support the Class B governance spine by defining rail classification states and evidence requirements.

It answers:

**How should future deposit and withdrawal rails be classified before any Class B pilot implementation may be considered?**

It does not answer:

**Which rail is approved for Hedgr?**

It does not create:

- rail approval
- vendor approval
- partner approval
- mobile-money approval
- bank approval
- stablecoin rail approval
- deposit approval
- withdrawal approval
- payment processing approval
- implementation authority
- customer fund movement authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify rail classification requirements and unresolved questions only. They do not create rail approval, vendor approval, or execution authority.

## 4. Rail classification states

| State | Meaning | Permitted interpretation | Prohibited interpretation | Evidence required to enter state |
|---|---|---|---|---|
| Not approved | Rail has no approved Class B use. | Rail may be mentioned only as future intent, candidate, or blocked / not approved. | Do not imply integration, readiness, reliability, or customer-money use. | None; default state. |
| Research only | Rail may be studied conceptually or commercially, but no technical or operational use is approved. | Can support market research, vendor comparison, and future evidence gathering. | Cannot be described as available, integrated, live, or pilot-ready. | Founder-approved research scope. Non-authorizing research note or vendor comparison. |
| Sandbox | Rail or vendor environment may be reviewed in a non-customer-money environment only. | Supports technical understanding and non-production validation. | Sandbox does not prove live availability, legal permission, operational readiness, settlement reliability, or customer-money safety. | Sandbox access evidence. Environment boundary. No-customer-money confirmation. Legal / compliance non-reliance note. |
| Internal test | Rail may be tested internally under controlled, non-public, non-customer conditions. | Supports internal operational learning only. | Internal testing does not authorize external pilot, customer eligibility, marketing claims, or production use. | Internal test scope. Participant restrictions. No-customer-money or controlled-funds boundary. Support / rollback notes. Legal / compliance review where required. |
| Manual pilot candidate | Rail has enough evidence to be considered for a future manual / limited pilot proposal, but is not approved. | May be referenced in a future §7 / §7a proposal only if supporting criteria are satisfied. | Candidate status is not approval, not readiness, and not launch permission. | Legal / compliance requirements framed. Custody boundary framed. Rail role and responsibility evidence. Deposit / withdrawal flow assumptions. Reconciliation assumptions. Support and dispute path assumptions. ADR scoping determination. |
| Limited live pilot candidate | Rail may be considered for a tightly bounded future live pilot only after all prerequisite evidence and governance gates are satisfied. | Candidate status allows future governance consideration only. | Does not authorize live use, customer fund movement, marketing, or product launch. | Qualified legal / compliance review. Vendor / partner permission evidence. Custody model and responsibility matrix. Reconciliation SOP. Support escalation matrix. Liquidity / withdrawal control memo. Trust UX pack. Accepted ADRs where required. Future §7 naming and §7a execution brief. |

## 5. Rail types and classification template

| Rail / pathway | Direction | Rail type | Current classification | Evidence pointer | Missing evidence | Notes |
|---|---|---|---|---|---|---|
| Mobile money deposit rail | Deposit | Mobile-money rail | Research only | Product doctrine references mobile money and local rails as future intent. | Rail permission, vendor / partner evidence, legal / compliance review, custody boundary, reconciliation assumptions, support path. | MTN, Airtel, Zamtel, or similar providers may be discussed only as examples / future intent unless separately evidenced and approved. |
| Mobile money withdrawal rail | Withdrawal | Mobile-money rail | Research only | Product doctrine references mobile money and local rails as future intent. | Rail permission, vendor / partner evidence, legal / compliance review, custody boundary, liquidity / withdrawal controls, failure / dispute process. | No mobile-money withdrawal path is live, selected, or approved. |
| Bank deposit rail | Deposit | Bank rail | Research only | Product doctrine references local rails as future intent. | Bank role evidence, legal / compliance review, custody boundary, settlement-state map, reconciliation SOP. | No bank rail or bank partner is selected or approved. |
| Bank withdrawal rail | Withdrawal | Bank rail | Research only | Product doctrine references local rails as future intent. | Bank role evidence, legal / compliance review, liquidity / withdrawal controls, settlement / finality evidence, support / dispute path. | No bank withdrawal path is live, selected, or approved. |
| Stablecoin acquisition / conversion pathway | Conversion | Stablecoin / digital asset pathway | Research only | MVP spec references USDC as initial intent unless doctrine changes. | Stablecoin handling memo, custody / conversion boundary, FX / fee disclosure requirements, qualified legal / compliance review, ADR scoping if material. | USDC and similar assets remain product intent only; no stablecoin purchase or conversion path is approved. |
| Stablecoin withdrawal / redemption pathway | Redemption / withdrawal | Stablecoin / digital asset pathway | Research only | MVP spec references stable digital assets as target intent. | Redemption role evidence, custody boundary, settlement / finality evidence, legal / compliance review, support / dispute path. | No redemption or stablecoin withdrawal path is approved. |
| Internal test rail | Internal test | Internal test path | Not approved | No Class B internal rail test scope is approved. | Internal test scope, participant restrictions, no-customer-money or controlled-funds boundary, support / rollback notes. | May not be treated as customer-facing or production evidence. |
| Sandbox vendor rail | Sandbox | Vendor / partner sandbox | Not approved | No sandbox vendor rail evidence is approved by this register. | Sandbox access evidence, environment boundary, no-customer-money confirmation, legal / compliance non-reliance note. | Sandbox access, if later obtained, would not prove live readiness or permission. |
| Manual treasury operation pathway | Deposit / withdrawal / settlement | Manual treasury path | Not approved | Class B standard references manual / limited execution as future class only. | Manual operation scope, custody model, approval controls, reconciliation SOP, audit evidence checklist, legal / compliance review. | Manual treasury activity remains unapproved and non-operational. |

Rules:

- Default all rows to Not approved or Research only unless repo evidence supports another state.
- Do not name a rail as live.
- Do not name a vendor as selected.
- Do not imply customer-money authority.
- If MTN, Airtel, Zamtel, banks, Circle, USDC, or similar are mentioned, frame them as examples / future intent only unless repo evidence clearly says otherwise.

## 6. Rail boundary domains

| Domain | Requirement to clarify | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Rail role | Is the rail a payment rail, mobile-money rail, bank rail, stablecoin rail, settlement rail, vendor rail, internal test path, or manual treasury path? | Rail role determines legal, custody, reconciliation, UX, support, and operational obligations. | Product doctrine references local rails and mobile money as future intent, but no Class B rail is approved. | Rail classification register row. Vendor / partner role evidence. Legal / compliance review. |
| Directionality | Is the rail used for deposit, withdrawal, conversion, redemption, settlement, reconciliation, or internal testing? | Deposit and withdrawal rails create different timing, failure, liquidity, support, and disclosure obligations. | Deposit and withdrawal are future Class B / C capabilities only when authorized. | Direction-specific rail flow map. Pending / failed / completed state definitions. Reconciliation dependency. |
| Customer-money exposure | Does the rail touch customer funds, internal funds, simulated funds, sandbox balances, vendor test balances, or no funds? | Customer-money exposure determines whether Class B governance, legal review, custody boundaries, and operational controls are required. | No customer-money movement authority exists. | Customer-money exposure classification. Legal / compliance review. Custody boundary mapping. Support / dispute path. |
| Settlement and finality | When is a transaction initiated, pending, settled, failed, reversed, disputed, or unresolved? Who provides finality evidence? | Settlement truth constrains UI copy, reconciliation, support, liquidity, and ledger claims. | Existing status surfaces are read-only / informational and do not prove settlement behavior. | Settlement-state map. Provider evidence. Reconciliation SOP. Ledger truth boundary memo if required. |
| Reconciliation dependency | What evidence reconciles rail events to user-visible status? Who owns mismatches, duplicates, delays, and ambiguous states? | Rail use without reconciliation creates trust and accounting risk. | Reconciliation visibility exists as read-only baseline; no Class B reconciliation process exists. | Reconciliation SOP. Audit evidence checklist. Support escalation matrix. |
| Fees, FX, spread, and limits | What fees, FX rates, spreads, transaction limits, settlement windows, and failure fees may apply? | Costs and limits must be disclosed before any user action. | No Class B fee / FX / spread disclosure model exists. | Fee / FX disclosure requirements. Rail-specific limits evidence. Trust UX pack. |
| Vendor / partner responsibility | What is the vendor or partner responsible for? What remains Hedgr's responsibility? What is the user responsible for? | Responsibility boundaries affect claims, support, custody, incident handling, and legal exposure. | Vendor references are future intent only unless separately approved. | Vendor / partner responsibility matrix. Provider evidence pack. ADR if boundary is material. |
| Failure and dispute handling | What happens when the rail fails, delays, reverses, duplicates, blocks, freezes, or disputes a transaction? | Rail failure is a user-trust and operational-risk surface. | No Class B rail failure / dispute process exists. | Failure-mode register. Support escalation matrix. Dispute handling process. Kill criteria. |

## 7. Rail claim guardrails

### Prohibited assumptions

The repo must not assume:

- any rail is approved
- any rail is live
- any rail is reliable
- any vendor is selected
- any partner has granted permission
- any deposit path is operational
- any withdrawal path is operational
- any stablecoin conversion path is operational
- any FX rate, fee, spread, or limit is approved
- any settlement timing is guaranteed
- any reconciliation process exists
- any customer-money movement is authorized

### Prohibited wording unless explicitly approved

- "MTN is live"
- "Airtel is integrated"
- "Bank transfers are supported"
- "Withdraw instantly"
- "Deposit instantly"
- "Live rails"
- "Production rail"
- "Guaranteed settlement"
- "Funds will arrive"
- "No failed withdrawals"
- "Conversion complete"
- "USDC purchase complete"
- "Customer funds moved"
- "Fully integrated"
- "Ready for pilot"

## 8. Downstream dependency effect

- **Liquidity / withdrawal control memo:** must depend on rail directionality, settlement timing, limits, failure modes, and customer-money exposure.
- **Class B trust UX pack:** must use only rail claims supported by classification and evidence.
- **Pilot ops runbook:** must reflect rail-specific manual review, escalation, fallback, and kill criteria.
- **Reconciliation SOP:** must map rail events to user-visible status and audit evidence.
- **Support escalation matrix:** must reflect vendor / partner responsibility and dispute path.
- **Audit evidence checklist:** must capture rail event, finality, fee, FX, and status evidence.
- **ADR scoping memo:** must include rail/vendor boundary if material.
- **Implementation-specific §7a brief:** must not exist for rail-touching work until rail blockers are resolved or explicitly bounded.

## 9. Open rail questions for future review

- [ ] Which rail is being considered?
- [ ] Is it deposit, withdrawal, conversion, settlement, redemption, or internal test?
- [ ] Is it mobile money, bank, stablecoin, vendor, partner, or manual treasury path?
- [ ] Does it touch customer money?
- [ ] What jurisdiction does the rail operate in?
- [ ] Who owns KYC / AML obligations tied to the rail?
- [ ] Who owns settlement evidence?
- [ ] Who owns failed, delayed, reversed, duplicate, blocked, or disputed transactions?
- [ ] What fees, FX rates, spreads, limits, and settlement windows apply?
- [ ] What claims can be made to users?
- [ ] What claims are prohibited?
- [ ] What reconciliation evidence is available?
- [ ] What support escalation exists?
- [ ] What vendor / partner permission exists?
- [ ] What legal / compliance review is required?
- [ ] What custody boundary does the rail touch?
- [ ] What ADRs may be required?
- [ ] What must be true before rail-related implementation can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, vendor / partner evidence, and accepted ADRs where required.

## 10. Non-authorization statement

This register is non-authoritative and documentation-only. It does not approve, activate, integrate, or operationalize any rail and does not activate, sequence, approve, or implement Class B execution. Any future rail-related Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, and vendor / partner evidence where applicable.
