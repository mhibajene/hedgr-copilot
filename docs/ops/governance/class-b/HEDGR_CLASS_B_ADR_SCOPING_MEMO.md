# HEDGR - Class B ADR Scoping Memo

## 1. Status / Authority / Scope

**Status:** ADR scoping memo; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, and future operational evidence.

**Scope:** Identifies future decision-record subjects, decision boundaries, evidence prerequisites, and non-decision areas relevant to future Class B consideration.

**Mode:** ADR scope identification only, not ADR drafting, ADR acceptance, implementation approval, sequencing, or Class B readiness.

This memo does not draft, accept, amend, supersede, or activate any ADR. It does not approve implementation, custody, rails, deposits, withdrawals, liquidity buffers, treasury operations, stablecoin conversion, ledger mutation, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This memo exists to support the Class B governance spine by identifying which future decisions may require ADR treatment after prerequisite Class B boundaries are sufficiently understood.

It answers:

**Which Class B topics appear material enough to require future ADR scoping, and what evidence must exist before any ADR is drafted or accepted?**

It does not answer:

**Which ADR should be written or accepted now?**

It does not create:

- an ADR draft
- an ADR acceptance
- an ADR status change
- an implementation ticket
- a backlog or queue order
- Class B readiness
- custody approval
- rail approval
- liquidity approval
- withdrawal approval
- treasury approval
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`
- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

Source inputs are used to identify ADR scope and unresolved decision questions only. They do not create ADR approval, ADR status changes, implementation authority, or execution authority.

## 4. ADR scoping domains

| Domain | Potential future ADR subject | Why ADR treatment may be required | Current repo evidence posture | Required future evidence before ADR drafting |
|---|---|---|---|---|
| Class B execution boundary | Whether and how a manual / limited Class B pilot may be considered without widening Class C automation or runtime authority. | Execution-class boundaries affect doctrine, user trust, system authority, and rollback posture. | Class B eligibility and gap artifacts exist, but no Class B execution proposal is approved. | Completed prerequisite artifacts, bounded founder / governance direction, legal / compliance input, pilot scope, risk controls, and explicit §7 / §7a authorization. |
| Custody model boundary | Whether Hedgr, a partner, a custodian, a wallet provider, or another role controls assets at each state. | Custody decisions shape asset control, liability, recovery, disclosures, and user claims. | Custody questions are framed, but no custody model is selected or approved. | Custody responsibility matrix, legal / compliance review, provider evidence, recovery model, failure responsibility, and claim guardrails. |
| Rail classification / activation boundary | Which rail state, if any, may be used for sandbox, internal test, manual pilot, or limited live pilot consideration. | Rail state decisions can introduce customer-money exposure, settlement risk, operational dependencies, and vendor obligations. | Rail classifications are defined, but no rail is approved, activated, integrated, or operationalized. | Rail candidate evidence, legal / compliance review, custody interaction map, settlement / finality evidence, failure handling, and reconciliation requirements. |
| Liquidity and withdrawal authority | Whether a Class B pilot may make any liquidity, withdrawal, availability, timing, or finality claims. | Withdrawal integrity and liquidity claims are core trust surfaces and high-risk operational commitments. | Liquidity / withdrawal control questions are framed, but no liquidity buffer, withdrawal path, or kill criteria are approved. | Withdrawal path map, liquidity buffer policy draft, pause / kill criteria, settlement evidence, support escalation, and audit / reconciliation evidence. |
| Ledger truth / accounting boundary | Which system, if any, records authoritative balances, pending states, settlement states, and reconciliation truth. | Ledger and accounting truth decisions affect user balances, operational controls, dispute handling, and regulatory posture. | Current Stability Engine and allocation bands remain informational and non-accounting. No Class B ledger truth boundary is approved. | Reconciliation SOP, data model boundary, source-of-truth map, audit evidence checklist, and legal / compliance review. |
| Stablecoin / conversion boundary | Whether stablecoin holding, conversion, redemption, or FX behavior is in scope for any Class B pilot. | Stablecoin and conversion decisions can affect custody, liquidity, rails, disclosures, settlement, and legal / compliance obligations. | Stablecoin conversion and redemption are not approved; current repo posture is non-executing. | Stablecoin policy review, conversion path map, provider evidence, liquidity impact, custody boundary, and disclosure requirements. |
| Manual operations and control authority | Who may approve, pause, block, reverse, escalate, or halt Class B actions, and under what evidence standard. | Manual / limited execution cannot be governed without clear owners, controls, and kill criteria. | No pilot ops runbook, support escalation matrix, or audit evidence checklist exists. | Pilot ops runbook, responsibility matrix, support escalation matrix, incident procedure, and audit evidence checklist. |
| Trust UX / claims boundary | What user-facing claims, states, labels, and limitations may appear for Class B pilot surfaces. | UX claims can imply approval, safety, availability, custody, finality, liquidity, or execution authority. | Existing doctrine constrains claims; no Class B trust UX pack exists. | Trust UX pack, prohibited-claims register, legal / compliance review, state taxonomy, support scripts, and evidence-linked copy constraints. |
| Staging / live-state separation | How simulated, sandbox, internal, staged, and live customer-money states remain visually and operationally distinct. | Class B work must not blur simulation, pilot, and live money states. | CI / E2E posture is hermetic and read-only; no Class B staging / live separation memo exists. | State taxonomy, staging / sandbox evidence, UI labeling rules, QA checks, operational ownership, and rollback procedure. |

## 5. ADR scoping matrix template

| Potential ADR | Decision question | Required prerequisite artifacts | Evidence still missing | Prohibited assumptions | Status |
|---|---|---|---|---|---|
| Class B execution boundary ADR | | | | | Not drafted |
| Custody model boundary ADR | | | | | Not drafted |
| Rail activation boundary ADR | | | | | Not drafted |
| Liquidity / withdrawal authority ADR | | | | | Not drafted |
| Ledger truth / accounting boundary ADR | | | | | Not drafted |
| Stablecoin / conversion boundary ADR | | | | | Not drafted |
| Manual operations control ADR | | | | | Not drafted |
| Trust UX / claims boundary ADR | | | | | Not drafted |
| Staging / live-state separation ADR | | | | | Not drafted |

This matrix is a template only. It does not draft, accept, prioritize, or sequence any ADR.

## 6. ADR drafting guardrails

### Required before any future ADR draft

Future ADR drafting should not begin until the relevant scope has:

- an explicit §7 / §7a authorization if the ADR is tied to a ticket
- source artifacts named in the ADR preconditions
- unresolved questions separated from decisions
- legal / compliance input where customer-money, custody, rail, disclosure, KYC / AML, stablecoin, or jurisdictional claims are implicated
- custody boundary input where asset control, recovery, or provider role is implicated
- rail classification input where settlement, directionality, fees, FX, limits, or rail failure is implicated
- liquidity / withdrawal control input where availability, timing, finality, or kill criteria is implicated
- an explicit non-authorization statement
- rollback / reversal implications identified
- no hidden implementation or runtime dependency

### Prohibited assumptions

The repo must not assume:

- ADR scoping means ADR approval
- a future ADR is already drafted
- an ADR will be accepted
- ADR acceptance alone authorizes implementation
- Class B is ready
- a custody model is selected
- a rail is approved
- withdrawals are approved
- liquidity is approved
- stablecoin conversion is approved
- ledger mutation is approved
- manual operations can proceed
- support and dispute handling are ready
- customer funds may move

### Prohibited wording unless explicitly approved

- "ADR approved"
- "ADR accepted"
- "Decision made"
- "Class B ready"
- "Pilot approved"
- "Custody model approved"
- "Rail approved"
- "Withdrawals approved"
- "Liquidity approved"
- "Ledger ready"
- "Stablecoin conversion approved"
- "Ready for implementation"
- "Execution can proceed"
- "Customer funds may move"

## 7. Downstream dependency effect

- **Future ADR drafts:** must cite the relevant prerequisite artifacts and distinguish scope questions from accepted decisions.
- **Class B trust UX pack:** must not use ADR scoping language as user-facing approval or readiness language.
- **Pilot ops runbook:** must not treat this memo as operational authority; it may use scoped decision questions as inputs.
- **Reconciliation SOP:** must identify which ledger truth or finality questions remain undecided before implementation can be proposed.
- **Support escalation matrix:** must not assume operational authority from ADR scoping.
- **Audit evidence checklist:** must track which evidence would be needed before any future ADR acceptance or pilot proposal.
- **Implementation-specific §7a brief:** must not rely on this memo alone; any future implementation brief requires separately approved scope, prerequisites, and any required accepted ADRs.

## 8. Open ADR scoping questions for future review

- [ ] Which Class B decisions require ADRs rather than ordinary ops artifacts?
- [ ] Which decisions can remain in governance memos without ADR treatment?
- [ ] Which ADRs, if any, are mandatory before a future implementation-specific §7a brief?
- [ ] Which prerequisite artifacts must be complete before each potential ADR?
- [ ] Which decisions require qualified legal / compliance review before drafting?
- [ ] Which decisions require custody provider, rail provider, or partner evidence?
- [ ] Which decisions could alter accepted ADR boundaries?
- [ ] Which decisions could affect Stability Engine read-only posture?
- [ ] Which decisions could imply ledger truth, accounting truth, or customer balance truth?
- [ ] Which decisions could imply customer-money movement?
- [ ] Which decisions require explicit rollback, pause, or kill criteria?
- [ ] Which decisions require founder / governance acceptance before drafting?

Answers must come from future governed review, prerequisite Class B artifacts, qualified legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, operational design, vendor / partner evidence, and accepted ADRs where required.

## 9. Non-authorization statement

This memo is non-authoritative and documentation-only. It does not draft, accept, amend, supersede, or activate any ADR. It does not approve implementation, custody, rails, deposits, withdrawals, liquidity buffers, treasury operations, stablecoin conversion, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future Class B ADR drafting or implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, required prerequisite artifacts, qualified legal / compliance review where applicable, accepted ADRs where required, and operational evidence where applicable.
