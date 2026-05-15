# HEDGR - Class B Liquidity / Withdrawal Control Memo

## 1. Status / Authority / Scope

**Status:** Liquidity / withdrawal control memo; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, and future operational evidence.

**Scope:** Frames liquidity, withdrawal-path, manual-control, unresolved-path, kill-criteria, and user-claim questions relevant to future Class B consideration.

**Mode:** Control requirement identification only, not withdrawal approval or liquidity operation activation.

This memo does not approve, activate, or operationalize withdrawals, liquidity buffers, treasury operations, rails, custody, deposits, stablecoin conversion, ledger mutation, Copilot execution, Class C automation, or customer fund movement.

## 2. Purpose

This memo exists to support the Class B governance spine by identifying liquidity and withdrawal-control requirements that constrain downstream artifacts.

It answers:

**What liquidity, withdrawal-control, unresolved-path, manual-review, and kill-criteria questions must be clarified before future Class B pilot implementation may be considered?**

It does not answer:

**Are withdrawals approved for Hedgr?**

It does not create:

- withdrawal approval
- liquidity approval
- treasury approval
- rail approval
- custody approval
- settlement approval
- customer-money approval
- implementation authority
- Class B readiness

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to identify liquidity / withdrawal control requirements and unresolved questions only. They do not create withdrawal approval, liquidity approval, treasury authority, or execution authority.

## 4. Liquidity / withdrawal control domains

| Domain | Requirement to clarify | Why it matters for Class B | Current repo evidence posture | Required future evidence |
|---|---|---|---|---|
| Withdrawal path definition | What exact withdrawal path is being considered? Which custody boundary does it touch? Which rail classification does it depend on? Which settlement, redemption, conversion, or manual treasury steps exist? | Withdrawal integrity cannot be assessed without knowing the path. | Existing withdrawal surfaces are read-only / informational and do not prove operational withdrawal reliability. | Withdrawal path map. Custody transition map. Rail classification row. Legal / compliance review. Reconciliation dependency. |
| Liquidity buffer logic | What liquidity reserve or buffer would be required before any pilot? Who calculates it? Who monitors it? What happens if the buffer falls below threshold? What assets count toward liquidity? | Liquidity is sacred under Hedgr doctrine; withdrawal fragility must not be hidden. | Doctrine requires liquidity integrity, but no Class B liquidity-buffer model exists. | Liquidity buffer policy draft. Monitoring assumptions. Manual control procedure. Kill criteria. ADR if material. |
| Withdrawal availability claims | What can Hedgr say about availability, timing, completion, pending states, reversibility, fallback paths, and delays? What wording is prohibited until operationally proven? | Withdrawal claims directly shape user trust and regulatory risk. | UX and withdrawal surfaces avoid guarantees, but no Class B claim register exists. | Withdrawal claim guardrails. Class B trust UX pack. Legal / compliance review. Ops review. |
| Manual approval / review controls | Which withdrawal actions require human review? Who approves, blocks, pauses, reverses, escalates, or resolves a withdrawal? What evidence is required before approval? | Class B means manual / limited execution; manual controls must be explicit. | No Class B manual withdrawal-review process exists. | Manual review workflow. Responsibility matrix. Audit evidence checklist. Support escalation path. |
| Pending, delayed, failed, and unresolved states | What states exist for a withdrawal? What distinguishes pending, delayed, failed, reversed, blocked, disputed, completed, and unresolved? What is shown to users? What is logged internally? | Ambiguous states create trust, support, and reconciliation risk. | Current frontend has read-only explanatory withdrawal-status clarity; no operational state machine is approved. | Withdrawal state taxonomy. Reconciliation SOP. Support escalation matrix. Trust UX pack. |
| Settlement and finality | Who determines finality? Which evidence proves completion? What happens when rail, custody, or ledger evidence disagrees? What is the source of truth? | Finality determines user balance, support response, reconciliation, and legal exposure. | No Class B settlement-finality model exists. | Settlement / finality evidence map. Ledger truth boundary memo if required. Reconciliation SOP. Vendor / partner evidence. |
| Liquidity stress and pause conditions | What conditions require pausing withdrawals, limiting withdrawals, delaying processing, increasing buffers, or stopping new deposits? Who can trigger a pause? How are users informed? | Crisis-first design requires predefined stress responses. | Constitutional doctrine requires crisis-first design, but no Class B stress-control process exists. | Stress trigger register. Pause / resume procedure. User communication constraints. Kill criteria. |
| Kill criteria | What objective conditions make a pilot unsafe? What triggers halt, rollback, manual-only mode, no-new-deposit mode, withdrawal prioritization, or release reversal? | Governance before scale requires reversibility and kill criteria. | No Class B withdrawal-specific kill criteria exist. | Kill-criteria table. Incident response policy. Escalation ownership. Audit trail expectations. |
| Support and dispute handling | Who handles failed, delayed, duplicate, mistaken, disputed, or ambiguous withdrawal events? What communication timeline exists? What remedy paths exist? | Withdrawal failures are high-trust events. | No Class B support / dispute process exists. | Support escalation matrix. Dispute handling process. Customer communication policy. |
| Audit and reconciliation evidence | What evidence must exist for each withdrawal event? What must be logged? What must be reconciled? What must be retained? | Class B pilots require traceable evidence before authority can widen. | Reconciliation visibility exists as read-only baseline; no Class B reconciliation SOP exists. | Reconciliation SOP. Audit evidence checklist. Data retention review. |

## 5. Withdrawal control matrix template

| Withdrawal state | User-facing meaning | Internal control owner | Required evidence | Permitted user claim | Prohibited user claim | Escalation / kill trigger |
|---|---|---|---|---|---|---|
| Not initiated | | | | | | |
| Initiated | | | | | | |
| Pending review | | | | | | |
| Pending rail action | | | | | | |
| Pending custody action | | | | | | |
| Pending settlement | | | | | | |
| Delayed | | | | | | |
| Blocked | | | | | | |
| Failed | | | | | | |
| Reversed | | | | | | |
| Disputed | | | | | | |
| Unresolved | | | | | | |
| Completed | | | | | | |
| Paused by control | | | | | | |
| Halted by kill criteria | | | | | | |

This matrix is a template only. It is not completed by this memo and must not be treated as withdrawal approval or liquidity approval.

## 6. Liquidity / withdrawal claim guardrails

### Prohibited assumptions

The repo must not assume:

- withdrawals are approved
- withdrawals are live
- withdrawals are instant
- withdrawals are guaranteed
- liquidity is sufficient
- a liquidity buffer exists
- a rail can settle withdrawals
- a custody provider can release assets
- stablecoin redemption is available
- FX conversion is available
- settlement timing is known
- failed withdrawals can always be reversed
- users can always withdraw anytime
- support can resolve all withdrawal issues
- current read-only UI proves operational withdrawal reliability

### Prohibited wording unless explicitly approved

- "Withdraw anytime"
- "Instant withdrawal"
- "Guaranteed withdrawal"
- "Always available"
- "Funds will arrive"
- "No failed withdrawals"
- "Fully liquid"
- "Available immediately"
- "Withdrawal complete" unless finality evidence exists
- "Your withdrawal is guaranteed"
- "Your money is safe"
- "No delay"
- "Automatic payout"
- "Settlement complete" unless supported by evidence
- "Liquidity secured" unless approved by governance

## 7. Kill-criteria template

| Trigger | Severity | Required response | User communication required? | Evidence required | Authority owner |
|---|---|---|---|---|---|
| Liquidity buffer breach | | | | | |
| Rail outage | | | | | |
| Custody provider outage | | | | | |
| Stablecoin depeg / instability | | | | | |
| FX quote unavailable | | | | | |
| Reconciliation mismatch | | | | | |
| Duplicate withdrawal | | | | | |
| Delayed settlement beyond approved window | | | | | |
| Compliance hold | | | | | |
| Fraud / suspicious activity flag | | | | | |
| Support backlog threshold breach | | | | | |
| Unresolved withdrawal count threshold breach | | | | | |

Trigger examples are illustrative only. They do not define approved thresholds, operations, or authority.

## 8. Downstream dependency effect

- **Class B trust UX pack:** must use only withdrawal and liquidity claims supported by control evidence.
- **Pilot ops runbook:** must define manual approval, review, pause, escalation, and kill-criteria procedures.
- **Reconciliation SOP:** must map withdrawal states to evidence, finality, mismatch handling, and audit logs.
- **Support escalation matrix:** must define ownership for delayed, failed, disputed, duplicate, and unresolved withdrawal states.
- **Audit evidence checklist:** must capture liquidity, withdrawal, finality, reconciliation, and communication evidence.
- **ADR scoping memo:** must include liquidity, withdrawal authority, settlement finality, and ledger truth boundaries if material.
- **Implementation-specific §7a brief:** must not exist for withdrawal-touching work until blockers are resolved or explicitly bounded.

## 9. Open liquidity / withdrawal questions for future review

- [ ] What withdrawal path is being considered?
- [ ] Which rail does the withdrawal use?
- [ ] Which custody boundary does the withdrawal touch?
- [ ] Does the path require stablecoin redemption, FX conversion, mobile money payout, bank payout, or manual treasury handling?
- [ ] Who approves withdrawal initiation?
- [ ] Who can pause or block withdrawal processing?
- [ ] What is the source of truth for withdrawal state?
- [ ] What proves settlement finality?
- [ ] What liquidity buffer is required?
- [ ] Who monitors the buffer?
- [ ] What happens if liquidity falls below threshold?
- [ ] What happens if a rail is delayed or unavailable?
- [ ] What happens if a custody provider is unavailable?
- [ ] What happens if stablecoin redemption or conversion fails?
- [ ] What claims can users see for pending, delayed, failed, and completed withdrawals?
- [ ] What claims are prohibited?
- [ ] What support escalation exists?
- [ ] What kill criteria must be satisfied before a pilot can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, operational design, vendor / partner evidence, and accepted ADRs where required.

## 10. Non-authorization statement

This memo is non-authoritative and documentation-only. It does not approve, activate, or operationalize withdrawals, liquidity buffers, treasury operations, rails, custody, deposits, stablecoin conversion, ledger mutation, Copilot execution, Class C automation, or customer fund movement. Any future liquidity- or withdrawal-related Class B implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, and operational evidence where applicable.
