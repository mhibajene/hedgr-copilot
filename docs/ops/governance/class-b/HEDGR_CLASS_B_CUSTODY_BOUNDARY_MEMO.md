# HEDGR - Class B Custody Boundary Memo

## 1. Status / Authority / Scope

**Status:** Custody boundary memo; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, and qualified legal / compliance review.

**Scope:** Frames custody responsibility, asset-control, provider-role, failure-mode, and disclosure questions relevant to future Class B consideration.

**Mode:** Boundary identification only, not custody selection or activation.

This memo does not select, approve, or activate a custody model and does not authorize implementation, execution, custody, rails, deposits, withdrawals, stablecoin conversion, ledger mutation, treasury operations, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This memo exists to support the Class B governance spine by identifying custody boundary requirements that constrain downstream artifacts.

It answers:

**What custody responsibility, asset-control, provider-role, failure-mode, and disclosure questions must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Which custody model is approved for Hedgr?**

It does not create:

- custody approval
- provider approval
- wallet infrastructure approval
- asset-control approval
- legal advice
- regulatory approval
- Class B eligibility pass
- implementation authority
- customer fund movement authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify custody boundary requirements and unresolved questions only. They do not create custody approval or execution authority.

## 4. Custody boundary domains

| Domain | Requirement to clarify | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Custody model | Is custody self-custodial, embedded wallet custody, qualified custodian, partner custody, omnibus custody, segregated custody, internal test-only, or another model? Who has control over keys or access credentials? Who can initiate, approve, or block movement of assets? | Custody model determines legal role, user trust claims, operational controls, liability, recovery, and withdrawal reliability. | MVP spec identifies custodial wallet infrastructure intent subject to ADR / governance, but current repo posture denies custody activation. | Custody model options memo. Provider responsibility matrix. Qualified legal / compliance review. ADR if a custody model is selected. |
| Asset-control boundary | Who controls user assets at each point in the lifecycle? Before deposit completion? During conversion? While stable assets are held? During yield allocation if ever authorized? During withdrawal? During failure, delay, or dispute? | User-facing statements about "your money," "available," "protected," "pending," or "withdrawable" depend on asset-control truth. | Existing UI surfaces are read-only / informational and must not imply accounting truth or fund movement. | Asset-control lifecycle diagram. State-by-state responsibility matrix. Trust copy constraints. |
| Provider / partner role boundary | What role would a provider such as Privy, a mobile-money partner, bank, exchange, stablecoin provider, or other vendor play? Which responsibilities remain with Hedgr? Which responsibilities belong to the provider? Which responsibilities belong to the user? | Provider role shapes custody disclosures, support responsibility, recovery pathways, incident handling, and legal exposure. | Provider names or infrastructure intent do not equal provider selection or activation. | Provider role matrix. Vendor evidence pack. Counsel / compliance review. ADR if provider boundary is selected. |
| Wallet creation and recovery | Who creates the wallet? What identity or authentication flow is required? How are lost access, device changes, account recovery, key recovery, lockouts, or compromised credentials handled? What recovery claims are prohibited? | Recovery expectations affect user trust and liability. | No Class B wallet creation or recovery process is approved. | Wallet lifecycle memo. Recovery / lockout process. Support escalation path. User disclosure constraints. |
| Deposit custody transition | At what point does a user deposit become controlled, recognized, credited, held, or converted? Who holds funds during pending, failed, delayed, or ambiguous deposit states? What can Hedgr say before final confirmation? | Deposit custody transition determines pending-state UX, reconciliation, support, and ledger truth. | Deposit surfaces exist as read-only / local stub / trust surfaces only; they do not prove live deposit custody. | Deposit custody transition map. Reconciliation dependency. Pending / failed deposit disclosure constraints. |
| Withdrawal custody transition | At what point does a withdrawal become committed, pending, completed, failed, reversed, or unresolved? Who controls assets during each stage? What claims can be made about timing, reversibility, liquidity, and completion? | Withdrawal integrity is mission-critical; custody transition must not be ambiguous where user access is concerned. | Withdrawal trust surfaces exist as read-only / informational clarity; they do not prove operational withdrawal reliability. | Withdrawal custody transition map. Liquidity / withdrawal control memo. Kill criteria. Support / dispute process. |
| Stablecoin custody / conversion boundary | Who acquires, holds, transfers, redeems, or converts stablecoins? Is stablecoin exposure direct to user, held by Hedgr, held by vendor, or abstracted? What stablecoin risk disclosures are required? | Stablecoin handling affects custody, FX, liquidity, compliance, ledger truth, and user claims. | USDC or stable asset references remain product intent unless authorized by governance. | Stablecoin handling memo. Conversion boundary memo. Custody / legal review. ADR scoping if material. |
| Ledger / accounting truth boundary | Which system is the source of truth for user balances, pending states, settled states, fees, conversions, and custody status? How do UI surfaces avoid becoming shadow accounting? What does the Stability Engine know versus what a ledger knows? | Allocation bands and engine posture must not become accounting truth. | ADR 0013 and read-only engine doctrine block allocation-as-accounting interpretation. | Ledger truth boundary memo. Reconciliation SOP. Audit evidence checklist. ADR if ledger / accounting boundary is selected. |
| Failure and loss responsibility | Who is responsible if funds are delayed, lost, frozen, blocked, incorrectly credited, incorrectly debited, or inaccessible? What happens in vendor outage, chain issue, mobile-money failure, bank delay, compliance hold, account lockout, or suspected fraud? What user remedies and communications are required? | Custody trust depends on failure truth, not ideal-path assumptions. | No Class B failure / loss responsibility model exists. | Failure mode register. Responsibility matrix. Incident / dispute process. Legal / compliance review. |
| User-facing custody claims | What may Hedgr say about custody, protection, access, recovery, availability, withdrawal, ownership, insurance, guarantees, and risk? What wording is prohibited before custody approval? | UX trust requires accuracy; overclaiming custody protections creates doctrine and legal risk. | UX doctrine requires users to know where money is, what it is doing, and how to exit, but no Class B custody copy pack exists. | Custody claim register. Approved / prohibited wording list. Class B trust UX pack. Counsel / compliance review. |

## 5. Custody responsibility matrix template

| Lifecycle state | User role | Hedgr role | Provider / partner role | Source of truth | User-facing claim allowed? | Evidence required |
|---|---|---|---|---|---|---|
| Pre-onboarding | | | | | | |
| Wallet creation | | | | | | |
| Deposit initiated | | | | | | |
| Deposit pending | | | | | | |
| Deposit failed | | | | | | |
| Deposit completed | | | | | | |
| Conversion pending | | | | | | |
| Stable asset held | | | | | | |
| Yield exposure pending / not authorized | | | | | | |
| Withdrawal initiated | | | | | | |
| Withdrawal pending | | | | | | |
| Withdrawal delayed | | | | | | |
| Withdrawal failed | | | | | | |
| Withdrawal completed | | | | | | |
| Dispute / support case | | | | | | |
| Account recovery | | | | | | |
| Account closure | | | | | | |

This matrix is a template only. It is not completed by this memo and must not be treated as custody approval.

## 6. Custody claim guardrails

### Prohibited assumptions

The repo must not assume:

- Hedgr controls or safely holds user assets
- a provider has been selected
- a custody model is approved
- user assets are insured or guaranteed
- funds are always available
- withdrawals are guaranteed
- recovery is guaranteed
- stablecoin holdings are risk-free
- engine allocation bands represent asset custody or ledger truth
- internal stubs or simulations prove custody
- local UI copy proves operational custody

### Prohibited wording unless explicitly approved

- "Your funds are safe"
- "Guaranteed access"
- "Instant withdrawal"
- "Fully protected"
- "Insured"
- "Risk-free"
- "Held securely by Hedgr"
- "Automatically allocated"
- "Your balance has been moved"
- "Your funds are earning"
- "Withdraw anytime" unless legally and operationally verified
- "Custodied by [provider]" unless provider role is approved

## 7. Downstream dependency effect

- **Rail classification register:** Cannot classify rails safely without knowing where custody begins and ends.
- **Liquidity / withdrawal control memo:** Must depend on custody transition truth.
- **Class B trust UX pack:** Cannot make custody, access, recovery, withdrawal, or safety claims before custody boundaries are reviewed.
- **Pilot ops runbook:** Must reflect custody responsibility, approval steps, failure paths, and support duties.
- **Reconciliation SOP:** Must reconcile against the correct custody / ledger source of truth.
- **Support escalation matrix:** Must identify who owns custody-related failures and user remedies.
- **Audit evidence checklist:** Must capture custody-state evidence.
- **ADR scoping memo:** Must include custody model, provider role, ledger truth, and responsibility boundaries once concrete enough.
- **Implementation-specific §7a brief:** Must not exist for custody-touching work until custody blockers are resolved or explicitly bounded.

## 8. Open custody questions for future review

- [ ] What custody model is being considered?
- [ ] Who controls private keys, access credentials, or signing authority?
- [ ] Who can initiate asset movement?
- [ ] Who can approve, block, or reverse movement?
- [ ] Who is the legal custodian, if any?
- [ ] What role does each provider / partner play?
- [ ] What happens before deposit finality?
- [ ] What happens after deposit failure?
- [ ] What happens during conversion?
- [ ] Who holds stable assets?
- [ ] What happens if stablecoin redemption, transfer, or conversion fails?
- [ ] What is the source of truth for balance and custody state?
- [ ] How are pending, failed, delayed, and disputed states represented?
- [ ] What user claims are allowed around access and recovery?
- [ ] What user claims are prohibited around safety and guarantees?
- [ ] What happens if a vendor, rail, chain, or account provider is unavailable?
- [ ] What custody evidence must be logged for audit?
- [ ] What must be true before custody-related implementation can be proposed?

Answers must come from future governed review, legal / compliance input, vendor evidence, and accepted ADRs where required.

## 9. Non-authorization statement

This memo is non-authoritative and documentation-only. It does not select, approve, or activate a custody model and does not activate, sequence, approve, or implement Class B execution. Any future custody-related Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, and vendor / provider evidence where applicable.
