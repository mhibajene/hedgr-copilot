# HEDGR - Class B Staging / Live-State Separation Memo

## 1. Status / Authority / Scope

**Status:** Staging / live-state separation memo; documentation-only.

**Authority:** Non-authoritative; subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, Audit Evidence review, and future operational evidence.

**Scope:** Defines environment-state separation requirements and unresolved staging / live-state questions for future Class B consideration.

**Mode:** Separation-requirement identification only; not staging approval, live approval, production approval, or implementation approval.

This memo does not approve, activate, or operationalize staging environments, live environments, production operations, customer-money movement, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement.

## 2. Purpose

This memo supports the Class B governance spine by defining how environment states must be separated before any future manual / limited Class B pilot may be considered.

It answers:

**What visual, operational, evidential, data, support, reconciliation, and governance separation requirements must exist before sandbox, internal test, manual pilot, limited live pilot, or production-like Class B states may be considered?**

It does not answer:

**Is any environment approved for Class B customer-money use?**

It does not create:

- staging approval
- live approval
- production approval
- sandbox approval
- internal-test approval
- customer-money approval
- implementation authority
- customer eligibility approval
- custody approval
- rail approval
- reconciliation approval
- audit approval
- support approval
- Class B readiness

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_ELIGIBILITY_STANDARD.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ELIGIBILITY_GAP_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ARTIFACT_DEPENDENCY_MAP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LEGAL_COMPLIANCE_REQUIREMENTS_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_CUSTODY_BOUNDARY_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RAIL_CLASSIFICATION_REGISTER.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_ADR_SCOPING_MEMO.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_TRUST_UX_PACK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_PILOT_OPS_RUNBOOK.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_RECONCILIATION_SOP.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_SUPPORT_ESCALATION_MATRIX.md`
- `docs/ops/governance/class-b/HEDGR_CLASS_B_AUDIT_EVIDENCE_CHECKLIST.md`
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`
- `docs/decisions/0017-transaction-review-simulator-dev-seam-mc-s2-021.md`

Source inputs are used to identify staging / live-state separation requirements and unresolved environment-state questions only. They do not create staging approval, live approval, implementation authority, or execution approval.

## 4. Separation principles

1. **Simulation must never look live**

   Any future simulation or sandbox state must be visually, operationally, and evidentially distinct from customer-money states.

2. **Internal test is not pilot approval**

   Internal testing may help validate process assumptions, but it must not imply customer eligibility, rail approval, custody approval, support readiness, or live operational authority.

3. **Candidate status is not live status**

   Manual pilot candidate or limited live pilot candidate language must remain governance-only and must not appear as user-facing readiness language.

4. **Environment labels must be visible where risk exists**

   Any future Class B-adjacent surface that could be mistaken for live fund movement must carry clear environment-state labeling.

5. **Data classes must not mix**

   Mock, sandbox, internal-test, pilot, and live customer-money records must have separation requirements before any implementation proposal.

6. **Evidence must identify environment state**

   Audit, reconciliation, support, and operational records must identify whether the evidence came from mock, sandbox, internal test, manual pilot, limited live pilot, or production-like context.

7. **Separation memo does not create authority**

   A separation memo can define required boundaries and questions. It cannot authorize staging environments, live operations, implementation, or customer fund movement.

## 5. Environment-state taxonomy

| Environment state | Meaning | Permitted interpretation | Prohibited interpretation | Required evidence before use |
| --- | --- | --- | --- | --- |
| Mock / local simulation | Local or deterministic simulation intended for development or review only. | May support local validation, review-path demonstration, and non-customer-money testing. | Must not be interpreted as live behavior, customer-money truth, rail readiness, custody readiness, settlement evidence, or transaction approval. | Dev-only guardrail. Visible simulator / mock label where user-like flows are shown. No-customer-money confirmation. Existing simulator ADR compatibility review. |
| Prototype / design-only | UI or workflow representation intended to explore experience shape only. | May support design critique and governance review. | Must not imply implementation approval, route approval, product launch, customer-money behavior, or operational readiness. | Prototype-only scope. Non-authorizing label. No shipped-route changes. No customer-money semantics. |
| Sandbox | Vendor, rail, or integration-like environment that does not touch customer money. | May support technical understanding and evidence gathering. | Must not imply legal permission, live integration, settlement reliability, customer-money safety, or production readiness. | Sandbox access evidence. Vendor / partner environment boundary. No-customer-money confirmation. Legal / compliance non-reliance note. |
| Internal test | Controlled non-public test involving internal participants, test funds, controlled funds, or no funds, as future governance may define. | May support operational learning if separately authorized. | Must not imply external pilot approval, customer eligibility, production readiness, marketing claims, or live service availability. | Internal participant scope. Test-fund / no-customer-money boundary. Legal / compliance review where required. Support and rollback assumptions. Audit evidence expectations. |
| Manual pilot candidate | A future rail, flow, or operating model may have enough evidence to be considered for a manual / limited pilot proposal. | May be referenced in future internal governance review only. | Must not be used as user-facing readiness, pilot approval, launch permission, or customer-money authority. | Class B eligibility criteria assessment. Legal / compliance framing. Custody boundary framing. Rail classification. Liquidity / withdrawal framing. Trust UX constraints. Pilot Ops framing. Reconciliation framing. Support escalation framing. Audit evidence framing. ADR scoping review. |
| Limited live pilot candidate | A future tightly bounded live customer-money pilot may be considered only after prerequisite evidence and governance gates are satisfied. | Candidate status permits future governance consideration only. | Must not imply live approval, customer-money movement, marketing permission, product launch, or production readiness. | Qualified legal / compliance review. Accepted ADRs where required. Custody model decision if in scope. Rail / vendor evidence. Liquidity / withdrawal controls. Pilot Ops controls. Reconciliation SOP completion. Support escalation completion. Audit evidence checklist completion. Future `§7` naming and bounded `§7a` execution brief. |
| Production / live | Live customer-money state, if ever authorized by repo governance. | Only valid after explicit future governance approval. | Must not be inferred from staging, sandbox, internal test, candidate language, prototype, Notion release status, or documentation-only artifacts. | Future explicit `HEDGR_STATUS.md` `§7` naming. Bounded `§7a` execution brief. Required accepted ADRs. Legal / compliance approval. Operational evidence. Vendor / partner evidence. Reconciliation and audit evidence. Support and incident readiness. Rollback / kill criteria. |

## 6. Separation domains

| Domain | Separation requirement to define | Why it matters for Class B | Current repo evidence posture | Required future evidence |
| --- | --- | --- | --- | --- |
| Visual environment labeling | How must mock, sandbox, internal test, manual pilot candidate, limited live pilot candidate, and production / live states be labeled? What labels are required on user-like surfaces? | Users, operators, and reviewers must not confuse simulated or candidate states with live customer-money truth. | Existing transaction review simulator has dev-only boundaries; no Class B environment-labeling system is approved. | Environment label rules. Trust UX review. ADR compatibility review where required. Implementation-specific `§7a` if UI changes are proposed. |
| Data separation | How must mock data, sandbox data, internal test data, pilot data, and live customer-money data be separated? | Mixed data can create false reconciliation, support, audit, ledger, or custody truth. | No Class B data separation model is approved. | Data classification rules. Retention / access-control review. Audit evidence review. Legal / compliance review. |
| Evidence separation | How must evidence records identify their environment state? What evidence is valid only for sandbox, internal test, or candidate review? What evidence may support future live consideration? | Evidence from one environment must not be used to claim readiness in another. | Audit Evidence Checklist is framed; no environment-state evidence model is approved. | Evidence environment tags. Audit evidence checklist extension. Reconciliation review. Support review. |
| Operational separation | How are mock, sandbox, internal-test, pilot, and live operations separated? Who can operate in each environment? What actions are prohibited in each environment? | Operational controls must not drift from internal testing into customer-money activity. | Pilot Ops Runbook is framed; no active operations are approved. | Environment-specific ops boundaries. Role / responsibility matrix. Pause / escalation process. Audit evidence requirements. |
| Rail and vendor separation | How are sandbox rail events, internal-test rail events, pilot rail events, and live rail events distinguished? What vendor / partner evidence is valid for each environment? | Rail evidence can be over-read as live integration or settlement reliability. | Rail classification exists as documentation-only; no rail is approved. | Rail environment classification. Vendor / partner evidence. Settlement / finality map. Legal / compliance review. |
| Custody separation | How are mock custody, sandbox custody, internal-test custody, pilot custody, and live custody distinguished? What custody claims are prohibited in each state? | Custody-state ambiguity creates legal, trust, support, and reconciliation risk. | Custody boundary questions are framed; no custody model is approved. | Custody responsibility matrix. Provider evidence. Asset-control lifecycle map. Trust UX review. |
| Reconciliation separation | How are reconciliation records separated by environment? What reconciliation evidence may support only sandbox or internal-test review versus live customer-money truth? | Reconciliation evidence can become accidental ledger truth if environment context is missing. | Reconciliation SOP is framed; no reconciliation operations are approved. | Environment-tagged reconciliation evidence. Source-of-truth boundary review. Audit evidence review. Ledger / accounting truth ADR if required. |
| Support separation | How are sandbox support cases, internal-test support cases, pilot support cases, and live support cases separated? What support wording is allowed in each environment? | Support must not treat non-live cases as customer-money truth or live customer support authority. | Support Escalation Matrix is framed; no support operations are approved. | Support environment labeling. Support handoff requirements. Trust UX review. Incident routing review. |
| Copilot separation | How must Copilot distinguish mock, sandbox, internal-test, pilot-candidate, and live contexts? What must Copilot avoid saying in non-live environments? | Copilot must not convert simulation or candidate states into perceived execution or account truth. | Copilot remains advisory; no Class B Copilot proximity implementation is approved. | Copilot Class B boundary review. Trust UX review. Support handoff review. ADR if required. |
| Governance separation | How must Notion release status, repo documents, candidate language, and `§7` / `§7a` activation be separated? | Governance staging must not be mistaken for implementation approval or live authority. | Notion staging is governance-only and subordinate to repo authority. | Governance wording review. `§7` / `§7a` activation review. ADR scoping review where required. |

## 7. Environment separation matrix template

| Surface / process | Mock / simulation | Prototype | Sandbox | Internal test | Manual pilot candidate | Limited live pilot candidate | Production / live |
| --- | --- | --- | --- | --- | --- | --- | --- |
| User-facing UI | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Operator dashboard | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Support workflow | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Reconciliation record | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Audit receipt | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Rail event | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Custody event | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Stablecoin / conversion event | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Fee / FX quote | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Liquidity check | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Copilot response | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Notion release status | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Governance document | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

This matrix is a template only. It does not approve any environment, surface, process, state transition, live operation, or customer-money movement.

## 8. Environment label template

| Environment state | Required label intent | Label must communicate | Label must not imply | Approval dependency |
| --- | --- | --- | --- | --- |
| Mock / local simulation | Identify local or deterministic review-only context. | Non-live review context; no customer-money truth. | Live behavior, transaction approval, settlement, custody, or rail readiness. | Dev-only guardrail review; existing simulator ADR compatibility review. |
| Prototype / design-only | Identify experience exploration only. | Design review context; not shipped product behavior. | Route approval, implementation approval, product launch, or customer-money behavior. | Prototype scope approval; Trust UX review if user-facing copy is later proposed. |
| Sandbox | Identify vendor, rail, or integration-like non-customer-money context. | Non-live environment boundary and evidence limits. | Legal permission, live integration, settlement reliability, or production readiness. | Vendor / partner boundary evidence; legal / compliance non-reliance review. |
| Internal test | Identify controlled non-public test context. | Internal-only participant scope and fund boundary. | External pilot approval, customer eligibility, live service availability, or marketing readiness. | Internal-test authorization if ever proposed; legal / compliance review where required. |
| Manual pilot candidate | Identify governance-only candidate status. | Eligible for internal governance consideration only. | User-facing readiness, pilot approval, launch permission, or customer-money authority. | Class B eligibility review; prerequisite GOV-B artifacts; ADR scoping review. |
| Limited live pilot candidate | Identify future candidate status for tightly bounded live consideration. | Candidate status only; live approval not granted. | Customer-money movement, marketing permission, product launch, or production readiness. | Future `§7` naming; bounded `§7a`; accepted ADRs and reviews where required. |
| Production / live | Identify explicitly approved live customer-money context, if ever authorized. | Future repo-governed live status and operating boundary. | That live status exists by inference from docs, staging, sandbox, prototype, or candidate language. | Future explicit repo approval, legal / compliance approval, operational evidence, and required accepted ADRs. |

Label intent is not product copy approval. Any future user-facing label requires separate Trust UX review and implementation authorization.

## 9. Environment evidence tagging template

| Evidence type | Required environment tag | Why tag is required | Prohibited cross-use | Review dependency |
| --- | --- | --- | --- | --- |
| User request | Mock / prototype / sandbox / internal test / manual pilot candidate / limited live pilot candidate / production-live. | User-intent evidence changes meaning by environment. | A mock or sandbox request must not prove live customer intent. | Trust UX review; legal / compliance review where required. |
| Manual review record | Environment state at review time. | Operator review authority differs by state. | Internal-test review must not become pilot or live approval. | Pilot Ops review; Audit Evidence review. |
| Rail event | Rail environment and vendor context. | Rail evidence can be over-read as settlement proof. | Sandbox rail evidence must not prove live rail readiness. | Rail classification review; vendor / partner evidence. |
| Custody event | Custody environment and provider context. | Custody claims depend on approved state and provider role. | Sandbox custody evidence must not prove live custody readiness. | Custody boundary review; legal / compliance review. |
| Stablecoin / conversion event | Conversion environment and evidence source. | Conversion evidence affects custody, fees, FX, and ledger truth. | Non-live conversion evidence must not prove live conversion authority or settlement. | Stablecoin / conversion boundary review; ADR if required. |
| Fee / FX quote | Quote environment and quote source. | Quote evidence can be mistaken for executable or settled values. | Mock or sandbox quotes must not become live pricing truth. | Legal / compliance review; Trust UX review. |
| Liquidity check | Liquidity environment and source. | Liquidity claims must not drift into treasury authority. | Non-live liquidity checks must not prove live liquidity buffers. | Liquidity / withdrawal control review; ADR if material. |
| Reconciliation review | Reconciliation environment and source-of-truth boundary. | Reconciliation meaning changes across mock, sandbox, internal-test, pilot, and live states. | Non-live reconciliation must not prove live transaction finality. | Reconciliation SOP review; Audit Evidence review. |
| Support case | Support environment and user-state boundary. | Support wording and closure authority differ by state. | Sandbox or internal-test support cases must not become live customer-money support truth. | Support Escalation review; Trust UX review. |
| Incident record | Incident environment and affected process. | Incident severity and authority differ by environment. | Internal incident evidence must not imply live incident readiness. | Pilot Ops review; Support Escalation review; Audit Evidence review. |
| Audit receipt | Audit environment and evidence source. | Audit receipts can be mistaken for ledger truth without tags. | Sandbox, internal-test, or candidate receipts must not prove live ledger truth. | Audit Evidence review; ledger / accounting truth ADR if required. |
| Governance decision | Governance state and authority surface. | Governance evidence must distinguish staging, candidate, and approved execution. | Notion release status or docs-only records must not become implementation approval. | `HEDGR_STATUS.md` `§7` / `§7a`; ADR scoping review. |
| Post-pilot review input | Environment state of source evidence. | Post-pilot review depends on knowing which evidence is live, non-live, or candidate-only. | Non-live evidence must not be used as live pilot outcome proof. | Audit Evidence review; legal / compliance review where required. |

Environment tags define evidence context only. They do not approve evidence collection, data storage, retention, reconciliation, ledger truth, or live operations.

## 10. Drift risks

| Drift risk | Possible misread | Required guardrail |
| --- | --- | --- |
| Sandbox being mistaken for live | Vendor or rail sandbox evidence is read as live integration, settlement reliability, or customer-money safety. | Sandbox labels; no-customer-money confirmation; vendor boundary evidence; legal / compliance non-reliance note. |
| Prototype being mistaken for shipped route | Design or prototype surfaces are treated as approved routes or launch-ready product. | Prototype-only labels; no shipped-route change; implementation-specific `§7a` required for any build. |
| Internal test being mistaken for pilot approval | Controlled internal learning is interpreted as customer eligibility or external pilot readiness. | Internal participant scope; test-fund / no-customer-money boundary; explicit no pilot approval language. |
| Candidate language being mistaken for readiness | Manual pilot candidate or limited live pilot candidate status is read as approved or ready. | Governance-only candidate labels; keep candidate language out of user-facing readiness claims. |
| Notion release status being mistaken for repo authority | A Notion row or release label is read as implementation sequencing or live authority. | Repo-first wording; `HEDGR_STATUS.md` `§7` / `§7a` authority note; staging remains mirror only. |
| Mock data being mistaken for customer-money truth | Deterministic or local data is read as account truth, transaction truth, or ledger truth. | Mock labels; no-customer-money confirmation; no ledger-truth claims. |
| Support state being mistaken for transaction finality | Support closure or support wording is read as settlement, custody, rail, or reconciliation finality. | Support environment labels; prohibited support promises; reconciliation and audit dependencies. |
| Reconciliation evidence from non-live states being mistaken for live proof | Sandbox or internal-test reconciliation is used to claim live transaction readiness. | Environment-tagged reconciliation records; source-of-truth boundary review; audit evidence review. |
| Audit receipts being mistaken for ledger truth | Evidence receipts are treated as accounting or ledger truth. | Evidence tags; ledger / accounting truth ADR if required; explicit no ledger-truth statement. |
| Copilot explanations being mistaken for execution confirmation | Copilot explains a simulated, sandbox, or candidate state as if money moved or an account state changed. | Copilot environment boundary review; advisory-only posture; prohibited execution-confirmation language. |

## 11. Prohibited assumptions

The repo must not assume:

- staging is approved
- sandbox is approved for customer-money use
- internal test means pilot approval
- candidate means ready
- limited live pilot candidate means live
- prototype means implementation approval
- Notion release status means repo authority
- mock data proves transaction truth
- sandbox rail evidence proves live rail readiness
- sandbox custody evidence proves live custody readiness
- support test cases prove support readiness
- reconciliation test records prove live reconciliation readiness
- audit receipts prove ledger truth
- production / live status exists
- customer funds may move

## 12. Downstream dependency effect

- **Future ADRs:** Must consider staging / live-state separation where any custody, rail, ledger, reconciliation, support, audit, Copilot, or execution boundary could be confused across environments.
- **Implementation-specific `§7a` brief:** Must cite this memo when any Class B work involves mock, sandbox, internal-test, pilot-candidate, limited-live, or production-like states.
- **Future frontend implementation:** Must not expose environment states without clear separation labels and governance approval.
- **Future backend / ledger implementation:** Must not mix mock, sandbox, internal-test, pilot, or live records without an approved separation model.
- **Future support implementation:** Must not treat sandbox, internal-test, or candidate support cases as live customer-money support cases.
- **Future reconciliation implementation:** Must not treat non-live evidence as live transaction finality.
- **Future implementation ticket:** Must not rely on this memo as staging approval, live approval, implementation approval, or Class B readiness.

## 13. Open Staging / Live-State questions for future review

- [ ] What environment state is being considered?
- [ ] Is the surface mock, prototype, sandbox, internal test, manual pilot candidate, limited live pilot candidate, or production / live?
- [ ] Does the surface or process touch customer-money movement?
- [ ] What data class is involved?
- [ ] What evidence class is involved?
- [ ] What user-facing label is required?
- [ ] What operator-facing label is required?
- [ ] What support-state label is required?
- [ ] What reconciliation-state label is required?
- [ ] What audit evidence tag is required?
- [ ] What custody boundary applies?
- [ ] What rail classification applies?
- [ ] What legal / compliance review exists?
- [ ] What Trust UX review exists?
- [ ] What Pilot Ops review exists?
- [ ] What Reconciliation SOP review exists?
- [ ] What Support Escalation review exists?
- [ ] What Audit Evidence review exists?
- [ ] What ADRs may be required?
- [ ] What must be true before any staging, internal-test, pilot, or live implementation can be proposed?

Answers must come from future governed review, legal / compliance input, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, Audit Evidence review, vendor / partner evidence, and accepted ADRs where required.

## 14. Non-authorization statement

This memo is non-authoritative and documentation-only. It does not approve, activate, or operationalize staging environments, live environments, production operations, customer-money movement, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class B execution, Class C automation, or customer fund movement. Any future Class B staging-, sandbox-, internal-test-, pilot-, limited-live-, or production-related implementation work still requires separate HEDGR_STATUS.md §7 naming, a bounded §7a execution brief, any required accepted ADRs, qualified legal / compliance review, custody boundary review, rail classification review, liquidity / withdrawal control review, Trust UX review, Pilot Ops review, Reconciliation SOP review, Support Escalation review, Audit Evidence review, and operational evidence where applicable.
