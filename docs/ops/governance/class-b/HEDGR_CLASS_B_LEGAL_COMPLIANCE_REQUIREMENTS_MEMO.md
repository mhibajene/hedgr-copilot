# HEDGR - Class B Legal / Compliance Requirements Memo

## 1. Status / Authority / Scope

**Status:** Legal / compliance requirements memo; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, and qualified legal / compliance review.

**Scope:** Frames legal / compliance requirements and unresolved questions relevant to any future Class B pilot consideration.

**Mode:** Requirements identification only, not legal advice.

This memo does not provide legal advice, does not claim regulatory approval, and does not authorize implementation, execution, custody, rails, deposits, withdrawals, stablecoin conversion, ledger mutation, treasury operations, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This memo exists to support the Class B governance spine by identifying legal / compliance requirements that constrain downstream artifacts.

It answers:

**What legal / compliance assumptions, questions, and evidence requirements must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Is Hedgr legally approved to operate a Class B pilot?**

It does not create:

- legal advice
- regulatory approval
- licensing determination
- Class B eligibility pass
- implementation authority
- rail approval
- custody approval
- customer eligibility approval
- product launch approval

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify requirements and unresolved questions only. They do not create legal conclusions or execution authority.

## 4. Legal / compliance requirement domains

| Domain | Requirement to clarify | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Jurisdictional scope | Which jurisdiction or jurisdictions would the first Class B pilot touch? Where are users located? Where is Hedgr operating from? Where are custody, rail, vendor, and treasury operations performed? | Class B pilot obligations depend on jurisdictional facts. | Current repo doctrine references volatile economies and Sub-Saharan Africa broadly, but does not establish a concrete Class B pilot jurisdiction. | Founder-approved jurisdiction assumption. Qualified legal / compliance review. Jurisdiction-specific regulatory requirements memo. |
| Customer eligibility | Who may participate in a future pilot? Individual users, SMEs, internal testers, invited users, employees, or external customers? Any residency, sanctions, KYC, age, business-type, or transaction-limit constraints? | Eligibility affects onboarding, disclosures, KYC / AML, rail access, custody, support, and risk controls. | Target user segments exist in product doctrine, but no Class B pilot eligibility rules are approved. | Eligibility policy draft. Compliance review. Pilot participant classification. |
| KYC / AML responsibility | Who performs KYC? Who performs AML monitoring? Who screens sanctions / PEPs? Which vendor, partner, or internal process owns each control? What happens when onboarding fails, flags, or requires manual review? | Class B customer-money activity cannot be considered without identity and financial-crime-control responsibility. | MVP spec references KYC / AML expectations and AML examples as confirmation-required, but no owner or process is established. | KYC / AML responsibility matrix. Vendor control evidence. Manual review / escalation rules. Counsel / compliance validation. |
| Licensing / regulatory perimeter | Would the future Class B pilot involve regulated activity? Is Hedgr acting as wallet provider, agent, technology provider, introducer, treasury manager, payment facilitator, remittance participant, or another role? What licensing, registration, exemption, sandbox, partner, or agent arrangement would be required? | Product role determines legal exposure, disclosures, and operating permission. | No licensing determination exists. | Regulatory perimeter memo from qualified counsel / compliance. Role classification. Approved operating model constraints. |
| Custody legal boundary | Who legally holds or controls user assets? Is custody held by Hedgr, a vendor, a partner, or the user? What representations can Hedgr make about custody, access, recovery, protections, and loss? | Custody claims shape trust UX, support, liability, and risk posture. | MVP spec identifies custodial infrastructure intent subject to ADR; current repo posture denies custody activation. | Custody boundary memo. Provider responsibility matrix. Counsel-reviewed custody disclosure constraints. |
| Rail / payment permissions | Which deposit and withdrawal rails are contemplated? Are they mobile money, bank, stablecoin, payment processor, on-chain, internal test, sandbox, or partner-operated? What permissions are needed to use each rail? Who is the merchant, agent, collector, sender, recipient, or settlement party? | Rails determine legal obligations, transaction risk, user disclosures, settlement timing, and reconciliation requirements. | Product doctrine mentions local rails / mobile money as future intent, but no rail is approved or classified for Class B. | Rail classification register. Vendor / partner permission evidence. Rail-specific compliance checklist. |
| Stablecoin / digital asset handling | Would the pilot involve stablecoin acquisition, holding, conversion, transfer, redemption, or yield exposure? Who is responsible for exchange, custody, transfer, and reporting? What stablecoin-specific user disclosures are required? | Stablecoin handling changes financial, regulatory, custody, FX, and disclosure obligations. | MVP spec references USDC as initial intent unless doctrine changes, but no execution authority exists. | Digital asset handling memo. Custody / conversion boundary. Stablecoin disclosure review. ADR scoping if material decisions are required. |
| FX / conversion disclosure | Would users see FX rates, conversion quotes, spreads, fees, settlement timing, or slippage? Which claims can be made about rate accuracy, timing, and finality? How are stale, failed, or delayed quotes handled? | FX and conversion claims create trust and regulatory risk. | Appendix guidance warns against instant claims that ignore third-party ramp latency; no Class B FX disclosure model exists. | FX / conversion disclosure checklist. Fee and rate display requirements. Failure / stale-rate handling rules. |
| Fees and spread disclosure | What fees could exist? Which party charges them? Are fees fixed, variable, embedded, spread-based, vendor-charged, or Hedgr-charged? How must they be disclosed before user action? | Hidden or unclear fees violate trust doctrine and may create compliance risk. | Monetisation is subordinate to trust; no Class B fee disclosure model exists. | Fee disclosure requirements. Spread disclosure policy. Counsel / compliance review. |
| Withdrawal and liquidity claims | What can Hedgr claim about withdrawal availability, timing, reliability, liquidity buffers, fallback routes, and failure handling? What claims are prohibited until operational evidence exists? | Liquidity is sacred under the constitutional charter; withdrawal fragility must not be hidden or understated. | Doctrine treats withdrawal reliability as mission-critical, but no Class B withdrawal-control model exists. | Liquidity / withdrawal control memo. Kill criteria. Counsel-reviewed withdrawal wording constraints. |
| Consumer disclosure and risk warnings | What must users be told before any Class B pilot action? What must be visible around risk, custody, fees, timing, settlement, finality, reversibility, and failure states? | Hedgr UX doctrine requires risk to be visible and user trust to be verifiable. | Strong UX doctrine exists; Class B-specific disclosure pack does not. | Class B disclosure checklist. Class B trust UX pack. Copy review. |
| Data privacy and retention | What user data is collected for pilot operations? Where is it stored? Who has access? How long is it retained? How are KYC, support, transaction, audit, and Copilot-adjacent records handled? | Financial product data requires clear retention, privacy, and access boundaries. | Appendix examples reference financial logs and chat/support retention considerations, but no Class B policy exists. | Data retention memo. Privacy / access-control checklist. Vendor data-flow review. |
| Support, complaints, and dispute handling | How will failed, delayed, duplicate, mistaken, disputed, or ambiguous transactions be handled? Who owns support escalation? What user remedies or communication timelines exist? | Class B pilot support posture directly affects user trust and regulatory exposure. | No Class B support / dispute process exists. | Support escalation matrix. Dispute handling process. Incident communication policy. |
| Marketing and public claims | What claims can Hedgr make publicly before Class B execution is legally and operationally approved? What claims are prohibited around yield, safety, stability, custody, rails, withdrawals, regulation, insurance, and guarantees? | Narrative integrity is a constitutional requirement; overclaiming creates legal and trust risk. | Strong doctrine prohibits overpromising and guaranteed yield claims; no Class B marketing-claims review exists. | Claims review checklist. Approved / prohibited wording register. Counsel / compliance review. |

## 5. Requirement classification table

| Requirement area | Status | Class B blocker? | Needs counsel / compliance review? | Downstream artifacts constrained |
|---|---|---|---|---|
| Jurisdictional scope | Not defined | Yes | Yes | custody boundary memo; rail classification register; pilot ops runbook; implementation-specific §7a brief |
| Customer eligibility | Not defined | Yes | Yes | Class B trust UX pack; pilot ops runbook; support escalation matrix; implementation-specific §7a brief |
| KYC / AML responsibility | Not defined | Yes | Yes | pilot ops runbook; support escalation matrix; reconciliation SOP; implementation-specific §7a brief |
| Licensing / regulatory perimeter | Not defined | Yes | Yes | custody boundary memo; rail classification register; ADR scoping memo; implementation-specific §7a brief |
| Custody legal boundary | Partially framed | Yes | Yes | custody boundary memo; Class B trust UX pack; pilot ops runbook; ADR scoping memo |
| Rail / payment permissions | Partially framed | Yes | Yes | rail classification register; liquidity / withdrawal control memo; reconciliation SOP; pilot ops runbook |
| Stablecoin / digital asset handling | Partially framed | Yes | Yes | custody boundary memo; rail classification register; ADR scoping memo; Class B trust UX pack |
| FX / conversion disclosure | Not defined | Yes | Yes | Class B trust UX pack; pilot ops runbook; reconciliation SOP; implementation-specific §7a brief |
| Fees and spread disclosure | Not defined | Yes | Yes | Class B trust UX pack; pilot ops runbook; support escalation matrix |
| Withdrawal and liquidity claims | Partially framed | Yes | Yes | liquidity / withdrawal control memo; Class B trust UX pack; pilot ops runbook; support escalation matrix |
| Consumer disclosure and risk warnings | Partially framed | Yes | Yes | Class B trust UX pack; pilot ops runbook; implementation-specific §7a brief |
| Data privacy and retention | Not defined | Yes | Yes | pilot ops runbook; reconciliation SOP; support escalation matrix; audit evidence checklist |
| Support, complaints, and dispute handling | Not defined | Yes | Yes | support escalation matrix; pilot ops runbook; reconciliation SOP; audit evidence checklist |
| Marketing and public claims | Partially framed | Yes | Yes | Class B trust UX pack; claims review checklist; ADR scoping memo |

No requirement area in this table is legally approved. Status values identify repo evidence posture only.

## 6. Prohibited assumptions

The repo must not assume:

- Hedgr is licensed for Class B execution
- any jurisdiction is approved
- any customer class is approved
- any KYC / AML arrangement is sufficient
- any rail is permitted for live use
- any custody model is approved
- any stablecoin conversion is allowed
- any FX, fee, spread, or settlement claim is approved
- any withdrawal reliability claim is proven
- any yield claim is permitted
- any vendor integration is approved
- any customer-money flow is authorized

## 7. Counsel / compliance review questions

Future qualified legal / compliance review must answer:

1. What jurisdiction is the first Class B pilot being assessed for?
2. What legal role would Hedgr play?
3. Is the contemplated activity regulated?
4. What licenses, registrations, exemptions, sandbox approvals, partner arrangements, or agent structures may be required?
5. Who performs KYC?
6. Who performs AML monitoring?
7. Who screens sanctions and PEPs?
8. What user eligibility limits are required?
9. What transaction caps, volume caps, or exposure caps may be required?
10. Who legally controls or custodies user assets?
11. What disclosures are required before user funds move?
12. What fees, FX rates, spreads, timing, and settlement information must be disclosed?
13. What withdrawal timing or liquidity claims are permitted?
14. What failure, delay, dispute, or complaint process is required?
15. What user data is collected and retained?
16. What marketing claims are prohibited?
17. What records must be retained for audit or regulatory review?
18. What must be true before a manual / limited pilot can be proposed internally?

Answers must come from qualified legal / compliance review, not this memo.

## 8. Downstream dependency effect

- **Custody boundary memo:** cannot define final responsibility without legal role and custody review.
- **Rail classification register:** cannot classify live use without permission / regulatory review.
- **Liquidity / withdrawal control memo:** must respect permitted withdrawal claims and operational obligations.
- **Class B trust UX pack:** must use only counsel / compliance-safe claims.
- **Pilot ops runbook:** must reflect required KYC / AML, dispute, support, and recordkeeping controls.
- **Reconciliation SOP:** must reflect audit and regulatory evidence expectations.
- **ADR scoping memo:** must wait until legal / compliance assumptions are stable enough to avoid speculative ADRs.
- **Implementation-specific §7a brief:** must not exist until legal / compliance blockers are resolved or explicitly bounded.

## 9. Non-authorization statement

This memo is non-authoritative and documentation-only. It does not provide legal advice, does not claim regulatory approval, and does not activate, sequence, approve, or implement Class B execution. Any future Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, and qualified legal / compliance review.
