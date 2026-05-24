# HEDGR - Class B Evidence Gathering Plan

## 1. Status / Authority / Scope

**Status:** Evidence-gathering plan; documentation-only.

**Authority:** Non-authoritative planning artifact subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, doctrine, and future governed review.

**Scope:** Defines evidence packages, collection expectations, review dependencies, source quality rules, and sequencing logic after the completed Class B governance spine.

**Mode:** Evidence planning only; not evidence approval, implementation approval, ADR acceptance, or Class B readiness.

This plan does not approve, activate, sequence, or implement Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, or customer fund movement.

## 2. Purpose

This plan exists to move Hedgr from governance-spine completion into evidence gathering and governed review.

It answers:

**What evidence must be gathered, from what sources, under what review expectations, before any future Class B ADR drafting readiness or implementation-proposal preflight can be considered?**

It does not answer:

**Is Hedgr ready for Class B execution?**

It does not create:

- Class B readiness
- implementation sequencing
- legal approval
- vendor approval
- custody approval
- rail approval
- customer eligibility approval
- ADR acceptance
- operational approval
- live approval
- customer-money authority

## 3. Source inputs

Source inputs:

- `docs/ops/governance/class-b/HEDGR_CLASS_B_GOVERNANCE_SPINE_CLOSEOUT_ASSESSMENT.md`
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
- `docs/ops/governance/class-b/HEDGR_CLASS_B_STAGING_LIVE_STATE_SEPARATION_MEMO.md`
- `docs/ops/NOTION_GOVERNANCE_STAGING.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`

Source inputs are used to define evidence-gathering needs only. They do not create evidence approval, implementation authority, or execution approval.

## 4. Evidence gathering principles

1. **Evidence before ADR drafting**
   Class B ADR candidates should not be drafted until relevant evidence packages exist or blockers are explicitly recorded.

2. **Evidence before implementation preflight**
   No implementation-proposal preflight should begin until evidence gaps are assessed against the completed governance spine.

3. **Source quality matters**
   Evidence must distinguish founder assumptions, internal analysis, vendor documentation, legal / compliance review, technical validation, operational review, and accepted ADRs.

4. **Evidence is not approval**
   Collecting evidence does not approve the thing evidenced.

5. **Freshness must be tracked**
   Evidence that may change over time, including legal, regulatory, vendor, rail, custody, pricing, FX, fees, and operational constraints, must have a freshness / review date expectation.

6. **Blockers remain blockers**
   Where evidence is absent, stale, conflicting, non-authoritative, or incomplete, the correct posture is blocker / unresolved, not interpretation-by-optimism.

7. **Repo authority remains §7 / §7a**
   Evidence gathering does not create sequencing authority. Any future next ticket must still be explicitly named through repo governance.

## 5. Evidence package map

| Evidence package | Purpose | Source expectation | Review dependency | Current status | Downstream use |
|---|---|---|---|---|---|
| Legal / compliance evidence package | Establish jurisdiction, regulatory perimeter, KYC / AML, eligibility, disclosure, privacy, and claims evidence needs. | External legal / compliance review plus repo governance questions. | Qualified legal / compliance review; future governance review. | Not gathered / Framed only | May support future ADR drafting readiness or implementation-proposal preflight assessment. |
| Jurisdiction selection evidence package | Identify concrete jurisdiction assumptions for any future Class B review. | Founder assumption, legal / compliance review, jurisdiction-specific evidence. | Founder / governance review; qualified legal / compliance review. | Not gathered / Framed only | Constrains legal, eligibility, rail, custody, and disclosure evidence. |
| Customer eligibility evidence package | Define who could be eligible under future governed review. | Legal / compliance review, customer eligibility analysis, doctrine constraints. | Legal / compliance review; governance review. | Not gathered / Framed only | Constrains pilot, support, Trust UX, and operations review. |
| KYC / AML responsibility evidence package | Identify ownership, process, sanctions, PEP, and monitoring responsibility. | Legal / compliance review, vendor documentation, vendor confirmation where applicable. | Legal / compliance review; vendor / provider evidence. | Not gathered / Framed only | Constrains customer eligibility, rail, custody, and pilot operations review. |
| Custody provider / model evidence package | Preserve evidence about possible custody models, provider roles, asset-control boundaries, and recovery / failure responsibility. | Provider documentation, provider confirmation, legal / compliance review, internal analysis. | Custody boundary review; legal / compliance review; future ADR review if required. | Not gathered / Framed only | May support future custody ADR drafting readiness assessment. |
| Rail / vendor permission evidence package | Distinguish vendor documentation, permission, sandbox access, and live customer-money authority. | Vendor documentation and vendor / provider confirmation. | Legal / compliance review; vendor / partner review. | Vendor evidence required | Constrains rail, pilot, reconciliation, support, and Trust UX review. |
| Rail settlement / finality evidence package | Define settlement timing, finality, reversibility, dispute, failed / delayed / ambiguous state evidence needs. | Vendor documentation, provider confirmation, technical sandbox evidence, operational review. | Rail review; reconciliation review; support review. | Not gathered / Framed only | Constrains withdrawal, reconciliation, support, and audit evidence. |
| Stablecoin / conversion evidence package | Define conversion path, spread, timing, custody, settlement, failure, and disclosure evidence needs. | Vendor / provider documentation, legal / compliance review, technical validation. | Legal / compliance review; custody review; rail review. | Not gathered / Framed only | Constrains custody, rail, fee / FX, Trust UX, and reconciliation review. |
| Fee / FX / spread evidence package | Identify fee, FX, spread, timing, quote validity, and customer disclosure evidence needs. | Vendor / provider documentation, pricing evidence, internal analysis. | Legal / compliance review; Trust UX review; operational review. | Not gathered / Framed only | Constrains disclosures, support, reconciliation, and customer eligibility review. |
| Liquidity / withdrawal control evidence package | Define withdrawal path, buffer assumptions, stress triggers, pause controls, fallback routes, and unresolved-path handling evidence needs. | Internal analysis, legal / compliance review, operational review, rail / custody evidence. | Liquidity / withdrawal review; governance review. | Not gathered / Framed only | May support future implementation-proposal preflight consideration. |
| Trust UX / disclosure evidence package | Preserve allowed / prohibited claims and disclosure evidence for future Class B surfaces. | Trust UX pack, legal / compliance review, support review, operational evidence. | Trust UX review; legal / compliance review; governance review. | Partial internal evidence / Framed only | Constrains future UI, copy, support, and Copilot-proximity review. |
| Pilot Ops evidence package | Define owner, role matrix, manual review, pause / escalation, participant control, and workload evidence needs. | Internal operational analysis, governance artifacts, legal / compliance review where needed. | Pilot Ops review; support, reconciliation, audit reviews. | Not gathered / Framed only | Constrains future pilot operations assessment. |
| Reconciliation evidence package | Define source-of-truth, matching, exception, duplicate, delayed, failed, ambiguous, and unresolved-state evidence needs. | Internal analysis, rail / custody evidence, operational dry-run evidence where separately authorized. | Reconciliation review; audit review; future ADR review if required. | Not gathered / Framed only | Constrains ledger-truth, support, audit, and operations review. |
| Support / dispute evidence package | Define support ownership, escalation, prohibited promises, incident routing, complaint / dispute, and closure evidence needs. | Support matrix, operational analysis, legal / compliance review, vendor evidence where applicable. | Support review; legal / compliance review; reconciliation review. | Not gathered / Framed only | Constrains customer communication and operational readiness assessment. |
| Audit / retention / access-control evidence package | Define evidence owner, receipts, retention questions, access controls, audit exceptions, and post-pilot review evidence needs. | Audit checklist, legal / compliance review, security / access-control review. | Audit review; legal / compliance review; governance review. | Not gathered / Framed only | Constrains future review, retention, and evidence preservation. |
| Staging / live-state separation evidence package | Define environment taxonomy, labels, data separation, tagging, sandbox / internal-test / pilot / live boundaries, and ADR compatibility needs. | Staging / live-state memo, technical validation, governance review. | Staging / live-state review; ADR compatibility review. | Not gathered / Framed only | Constrains future environment proposals and evidence tagging. |
| ADR drafting readiness evidence package | Determine whether evidence packages are sufficient to consider drafting future Class B ADRs. | Evidence packages, blocker register, legal / compliance review where applicable. | Governance review; ADR process review. | Future governed review required | May support future ADR drafting readiness review only. |
| Implementation-proposal preflight evidence package | Determine whether evidence packages are sufficient to consider an implementation-proposal preflight. | Evidence packages, accepted ADRs where required, legal / compliance review, vendor evidence, operational evidence. | Governance review; §7 / §7a review where applicable. | Future governed review required | May support future implementation-proposal preflight review only. |

No evidence package in this map is approved.

## 6. Evidence source classification

| Source class | Meaning | Can support future review? | Cannot be used as |
|---|---|---|---|
| Founder assumption | Founder-framed assumption, constraint, target market, or open question. | Yes, to frame questions and review scope. | Blocker closure, legal approval, vendor approval, custody approval, or implementation authority. |
| Repo doctrine | Governing product, architecture, UX, and trust doctrine. | Yes, to constrain interpretation and identify red lines. | External approval, vendor permission, operational proof, or §7 activation. |
| Repo governance artifact | Repo-native standard, memo, register, assessment, or staging copy. | Yes, to define questions, blockers, and review dependencies. | External approval, evidence approval, implementation approval, or customer-money authority. |
| Accepted ADR | Accepted repo decision record. | Yes, to record material decisions and constrain future work. | Standalone implementation activation, external approval, or customer-money authority. |
| Internal analysis | Hedgr-authored analysis, matrix, review, or evidence summary. | Yes, to organize evidence and identify gaps. | Legal conclusion, vendor permission, live operational proof, or pilot approval. |
| External legal / compliance review | Qualified external review of law, regulation, compliance obligations, eligibility, claims, or related constraints. | Yes, if scoped, dated, and accepted through governance. | Automatic implementation approval, customer-money authority, or vendor approval. |
| Vendor / provider documentation | Published or supplied documentation about vendor or provider capabilities, limits, fees, API behavior, controls, or policies. | Yes, to identify capability and evidence needs. | Vendor permission, contractual approval, live authority, or guarantee. |
| Vendor / provider confirmation | Direct confirmation from a vendor or provider about scope, permissions, limits, support path, or environment boundary. | Yes, if dated, specific, and preserved. | Legal approval, governance approval, or automatic implementation authority. |
| Technical sandbox evidence | Evidence from a sandbox or non-customer-money environment. | Yes, to understand technical behavior under bounded conditions. | Live evidence, pilot approval, production readiness, or customer-money safety proof. |
| Internal test evidence | Evidence from internal tests under controlled non-customer conditions. | Yes, for internal understanding when separately authorized. | Pilot approval, customer eligibility approval, live authority, or external validation. |
| Operational dry-run evidence | Evidence from rehearsed operating procedures under non-live or separately approved conditions. | Yes, to identify operational gaps. | Operational approval, live runbook approval, or customer-money authority. |
| User research evidence | Structured research on comprehension, trust, disclosure, or support expectations. | Yes, to improve review questions and Trust UX assessment. | Legal approval, eligibility approval, operational proof, or implementation authority. |
| Support / incident evidence | Evidence from support cases, incident exercises, escalation reviews, or dispute analysis. | Yes, to inform support and dispute review. | Transaction outcome approval, reconciliation truth, or legal resolution. |
| Reconciliation evidence | Evidence about matching, exceptions, source-of-truth boundaries, unresolved states, or closure logic. | Yes, to inform reconciliation and audit review. | Ledger truth, accounting truth, or operational approval unless separately accepted. |
| Audit evidence | Preserved receipts, records, access-control evidence, review logs, or retention evidence. | Yes, to support future governance review. | Retention policy approval, audit-operation approval, or ledger truth by itself. |

Founder assumptions can frame questions, not close blockers. Repo governance artifacts define questions and constraints, not external approval. Vendor documentation is not the same as vendor permission. Sandbox evidence is not live evidence. Internal test evidence is not pilot approval. Accepted ADRs record decisions but do not by themselves activate implementation.

## 7. Evidence acceptance states

| Evidence state | Meaning | Permitted interpretation | Prohibited interpretation |
|---|---|---|---|
| Missing | Evidence has not been identified or preserved. | The blocker remains open. | The gap can be inferred closed from optimism or adjacent artifacts. |
| Question framed | The evidence need is defined, but evidence is absent. | Future collection can be scoped. | Evidence has been gathered or accepted. |
| Evidence requested | Evidence has been requested from an owner, reviewer, vendor, or source. | Intake is pending. | The request proves approval or sufficiency. |
| Evidence received | Evidence has been received and preserved. | It can enter review. | It is accepted, current, complete, or authoritative by default. |
| Under review | Evidence is being reviewed against source quality, freshness, conflicts, and dependencies. | It may inform blocker analysis. | Review has approved implementation or readiness. |
| Accepted for planning | Evidence is sufficient to support planning questions. | Planning can reference it with limits. | ADR drafting, implementation preflight, or execution is approved. |
| Accepted for ADR drafting readiness | Evidence is sufficient to consider whether ADR drafting may begin. | ADR drafting readiness review can cite it. | ADRs are drafted, accepted, or implementation is approved. |
| Accepted for implementation-preflight consideration | Evidence is sufficient to consider whether an implementation-proposal preflight may be reviewed. | A future preflight review may cite it. | §7 activation, §7a execution, implementation, staging, live operations, or customer-money movement is approved. |
| Rejected / insufficient | Evidence does not satisfy the evidence need. | The blocker remains unresolved or must be reframed. | The gap can be waived silently. |
| Stale / requires refresh | Evidence may have changed or exceeded a future review expectation. | Refresh is required before reliance. | The older evidence remains current by default. |
| Conflicting / requires escalation | Evidence conflicts with another source or authority. | The conflict must be surfaced to governance. | The conflict can be reconciled by inference. |

No evidence state in this plan authorizes implementation or customer-money movement.

## 8. Evidence package detail

### Legal / compliance evidence package

**Purpose:** Define legal, compliance, jurisdictional, eligibility, responsibility, disclosure, data, and claims evidence required before any future Class B ADR drafting readiness or implementation-proposal preflight can be considered.

**Required evidence:**

- jurisdiction assumptions
- regulatory perimeter review
- KYC / AML ownership
- sanctions / PEP expectations
- customer eligibility constraints
- disclosure requirements
- data retention and privacy constraints
- marketing / claims constraints

**Likely source:** Founder assumptions, external legal / compliance review, repo doctrine, governance artifacts, vendor / provider documentation where applicable.

**Review dependency:** Qualified legal / compliance review; governance review; future ADR review where required.

**Blocks:** Customer eligibility evidence, KYC / AML responsibility evidence, custody claims, rail claims, disclosures, pilot operations, support language, and ADR drafting readiness.

**Non-authorization note:** Legal evidence does not equal regulatory approval unless explicitly stated by qualified review and accepted by governance.

### Custody provider / model evidence package

**Purpose:** Define custody model, provider responsibility, user asset-control, failure, loss, recovery, and disclosure evidence needs.

**Required evidence:**

- custody model options
- provider role
- user asset-control boundary
- key / wallet control assumptions
- recovery process
- failure / loss responsibility
- provider documentation
- legal / compliance review

**Likely source:** Vendor / provider documentation, vendor / provider confirmation, legal / compliance review, internal analysis, custody boundary memo.

**Review dependency:** Custody boundary review; qualified legal / compliance review; future ADR review where required.

**Blocks:** Trust UX claims, reconciliation source-of-truth, support closure, audit evidence, ADR drafting readiness, and implementation-proposal preflight consideration.

**Non-authorization note:** Custody evidence does not select or activate a custody model.

### Rail / vendor evidence package

**Purpose:** Distinguish candidate rail capability, permission, environment boundary, settlement, fees, limits, failures, disputes, and support contact evidence.

**Required evidence:**

- candidate rail
- vendor / partner role
- sandbox vs live distinction
- customer-money permission
- settlement / finality evidence
- fees / limits
- failure / dispute handling
- support / vendor contact path

**Likely source:** Vendor / provider documentation, vendor / provider confirmation, legal / compliance review, technical sandbox evidence where separately authorized.

**Review dependency:** Rail classification review; legal / compliance review; custody review where applicable; support and reconciliation review.

**Blocks:** Settlement / finality review, fee / FX review, liquidity / withdrawal review, reconciliation review, support review, and Trust UX review.

**Non-authorization note:** Rail evidence does not approve, activate, integrate, or operationalize any rail.

### Liquidity / withdrawal evidence package

**Purpose:** Define withdrawal path, liquidity assumptions, stress controls, pause logic, fallback routes, unresolved-path handling, support, and dispute evidence needs.

**Required evidence:**

- withdrawal path
- liquidity buffer assumptions
- reserve logic
- pause / stress triggers
- kill criteria
- fallback routes
- unresolved-path handling
- support and dispute implications

**Likely source:** Internal analysis, rail / vendor evidence, custody evidence, legal / compliance review, operational dry-run evidence where separately authorized.

**Review dependency:** Liquidity / withdrawal control review; rail review; custody review; support, reconciliation, and audit review.

**Blocks:** Trust UX claims, pilot operations, support closure, audit review, and implementation-proposal preflight consideration.

**Non-authorization note:** Liquidity evidence does not approve withdrawals, buffers, treasury operations, or solvency claims.

### Trust UX / disclosure evidence package

**Purpose:** Preserve evidence for allowed and prohibited claims, state labels, failure states, fee / FX, custody, rail, settlement, Copilot proximity, and support-message constraints.

**Required evidence:**

- allowed / prohibited claims
- state labels
- failure-state wording constraints
- fee / FX disclosures
- custody disclosures
- rail and settlement disclosures
- Copilot proximity constraints
- support-message constraints

**Likely source:** Trust UX pack, legal / compliance review, user research evidence, support evidence, governance artifacts.

**Review dependency:** Trust UX review; qualified legal / compliance review; support review; governance review.

**Blocks:** Product copy review, UI implementation consideration, Copilot proximity review, support scripts, and implementation-proposal preflight consideration.

**Non-authorization note:** Trust UX evidence does not approve UI implementation or product copy.

### Pilot Ops evidence package

**Purpose:** Define owner, manual review, role responsibility, pause / escalation, participant control, support handoff, evidence, and workload evidence needs.

**Required evidence:**

- pilot owner
- manual review flow
- role responsibility matrix
- pause / escalation procedure
- participant control
- support handoff
- evidence checklist
- operational workload assumptions

**Likely source:** Internal operational analysis, pilot ops runbook, legal / compliance review, support evidence, reconciliation evidence, audit evidence.

**Review dependency:** Pilot Ops review; support, reconciliation, audit, and legal / compliance review.

**Blocks:** Operational review, implementation-proposal preflight consideration, and any future §7a brief for Class B implementation.

**Non-authorization note:** Pilot Ops evidence does not approve pilot operations.

### Reconciliation evidence package

**Purpose:** Define source-of-truth, event matching, exception, duplicate, delayed, failed, ambiguous, unresolved, cadence, and audit-trail evidence needs.

**Required evidence:**

- source-of-truth boundary
- event matching rules
- exception taxonomy
- duplicate handling
- delayed / failed / ambiguous / unresolved-state process
- cadence assumptions
- audit trail requirements

**Likely source:** Reconciliation SOP, rail / vendor evidence, custody evidence, audit evidence, operational dry-run evidence where separately authorized.

**Review dependency:** Reconciliation review; audit review; future ledger / accounting truth ADR review where required.

**Blocks:** Support closure, audit review, ledger-truth decisions, and implementation-proposal preflight consideration.

**Non-authorization note:** Reconciliation evidence does not approve reconciliation operations or ledger truth.

### Support / dispute evidence package

**Purpose:** Define support ownership, escalation, prohibited promises, handoff, incident routing, complaint / dispute handling, closure, and Copilot-to-support handoff evidence needs.

**Required evidence:**

- support ownership
- escalation matrix
- prohibited promises
- support handoff
- incident routing
- complaint / dispute handling
- closure dependencies
- Copilot-to-support handoff constraints

**Likely source:** Support escalation matrix, legal / compliance review, vendor / provider confirmation, reconciliation evidence, audit evidence.

**Review dependency:** Support review; legal / compliance review; reconciliation review; audit review.

**Blocks:** Trust UX support messaging, pilot operations, incident response, customer communication, and implementation-proposal preflight consideration.

**Non-authorization note:** Support evidence does not approve support operations, dispute handling, or transaction outcomes.

### Audit / retention / access-control evidence package

**Purpose:** Define evidence ownership, event receipts, retention, access-control, exceptions, post-pilot review, and legal / compliance evidence needs.

**Required evidence:**

- evidence owner
- event receipts
- retention questions
- access-control constraints
- audit exceptions
- post-pilot review inputs
- legal / compliance review

**Likely source:** Audit evidence checklist, legal / compliance review, security / access-control review, reconciliation evidence, support evidence.

**Review dependency:** Audit review; legal / compliance review; security / access-control review; governance review.

**Blocks:** Evidence preservation, post-pilot review, implementation-proposal preflight consideration, and future retention / audit policy review.

**Non-authorization note:** Audit evidence does not approve retention policy, audit operations, or ledger truth.

### Staging / live-state separation evidence package

**Purpose:** Define environment taxonomy, visual labels, data separation, evidence tagging, support / reconciliation separation, sandbox / internal-test / pilot / live boundaries, and ADR compatibility evidence needs.

**Required evidence:**

- environment taxonomy
- visual labeling requirements
- data separation
- evidence tagging
- support / reconciliation separation
- sandbox vs internal test vs pilot vs live boundaries
- ADR compatibility review

**Likely source:** Staging / live-state separation memo, technical validation, governance review, security / access-control review.

**Review dependency:** Staging / live-state review; ADR compatibility review; support, reconciliation, and audit review.

**Blocks:** Environment proposals, sandbox or internal-test evidence reliance, pilot / live-state claims, and implementation-proposal preflight consideration.

**Non-authorization note:** Environment evidence does not approve staging, sandbox, internal-test, pilot, live, or production environments.

## 9. Evidence sequencing logic

| Order | Evidence area | Should precede | Reason |
|---|---|---|---|
| 1 | Jurisdiction and legal / compliance assumptions | Customer eligibility, KYC / AML, custody, rail, disclosure, and ADR drafting readiness review. | Legal / compliance perimeter shapes downstream evidence questions and prohibited claims. |
| 2 | Customer eligibility and KYC / AML responsibility | Custody, rail, pilot operations, support, and Trust UX review. | User eligibility and responsibility boundaries must be known before customer-money controls are assessed. |
| 3 | Custody provider / model evidence | Rail, stablecoin / conversion, reconciliation, support, audit, and Trust UX review. | Asset-control and provider responsibility shape every customer-money state. |
| 4 | Rail / vendor permission and environment evidence | Settlement / finality, fee / FX, liquidity / withdrawal, reconciliation, and support review. | Capability, permission, and environment boundaries must be separated before evidence can be relied on. |
| 5 | Rail settlement / finality and fee / FX evidence | Liquidity / withdrawal, Trust UX, reconciliation, support, and audit review. | Timing, reversibility, cost, and failure evidence constrain customer claims and operations. |
| 6 | Liquidity / withdrawal control evidence | Trust UX, pilot operations, support, reconciliation, and implementation-proposal preflight review. | Withdrawal integrity and stress controls are core Class B blockers. |
| 7 | Trust UX / disclosure evidence | Pilot operations, support, implementation-proposal preflight, and any future product copy review. | Customer-facing claims must stay inside legal, custody, rail, liquidity, and support truth. |
| 8 | Pilot Ops evidence | Reconciliation, support, audit, and implementation-proposal preflight review. | Operations require owners, manual review, controls, and escalation before process evidence can be assessed. |
| 9 | Reconciliation evidence | Support, audit, ledger-truth review, and implementation-proposal preflight review. | Matching and exception rules determine what evidence can close a state. |
| 10 | Support / dispute evidence | Audit, Trust UX support messages, and implementation-proposal preflight review. | Customer communication and closure depend on support and dispute boundaries. |
| 11 | Audit / retention / access-control evidence | ADR drafting readiness and implementation-proposal preflight review. | Evidence preservation and access constraints must be known before relying on evidence packages. |
| 12 | Staging / live-state separation evidence | ADR drafting readiness and implementation-proposal preflight review. | Evidence must not cross from sandbox or internal-test interpretation into live authority. |
| 13 | ADR drafting readiness evidence | Future ADR drafting consideration. | ADR drafts should not begin until blockers, evidence sufficiency, and conflicts are reviewed. |
| 14 | Implementation-proposal preflight evidence | Any future §7 / §7a implementation proposal. | Implementation-preflight consideration must be evidence-backed and separately governed. |

This order is evidence dependency logic only. It is not backlog order, implementation sequencing, ADR approval order, §7 activation, or Class B readiness.

## 10. Evidence registry template

| Evidence item | Package | Source class | Evidence state | Owner | Freshness / review date | Related blocker | Notes |
|---|---|---|---|---|---|---|---|
| Legal / compliance evidence item | Legal / compliance evidence package | External legal / compliance review | Missing / Question framed | TBD | TBD | No legal / compliance review | Placeholder only. |
| Jurisdiction selection evidence item | Jurisdiction selection evidence package | Founder assumption / External legal / compliance review | Missing / Question framed | TBD | TBD | No jurisdiction selected | Placeholder only. |
| Customer eligibility evidence item | Customer eligibility evidence package | External legal / compliance review | Missing / Question framed | TBD | TBD | No customer eligibility policy | Placeholder only. |
| KYC / AML responsibility evidence item | KYC / AML responsibility evidence package | External legal / compliance review / Vendor documentation | Missing / Question framed | TBD | TBD | No KYC / AML owner | Placeholder only. |
| Custody provider / model evidence item | Custody provider / model evidence package | Vendor / provider documentation | Missing / Question framed | TBD | TBD | No custody model selected | Placeholder only. |
| Rail / vendor permission evidence item | Rail / vendor permission evidence package | Vendor / provider confirmation | Missing / Question framed | TBD | TBD | No rail permission evidence | Placeholder only. |
| Rail settlement / finality evidence item | Rail settlement / finality evidence package | Vendor / provider documentation | Missing / Question framed | TBD | TBD | No settlement / finality evidence | Placeholder only. |
| Stablecoin / conversion evidence item | Stablecoin / conversion evidence package | Vendor / provider documentation | Missing / Question framed | TBD | TBD | No stablecoin / conversion evidence | Placeholder only. |
| Fee / FX / spread evidence item | Fee / FX / spread evidence package | Vendor / provider documentation | Missing / Question framed | TBD | TBD | No fee / FX / spread evidence | Placeholder only. |
| Liquidity / withdrawal control evidence item | Liquidity / withdrawal control evidence package | Internal analysis | Missing / Question framed | TBD | TBD | No withdrawal control evidence | Placeholder only. |
| Trust UX / disclosure evidence item | Trust UX / disclosure evidence package | Repo governance artifact | Missing / Question framed | TBD | TBD | No Trust UX approval | Placeholder only. |
| Pilot Ops evidence item | Pilot Ops evidence package | Internal analysis | Missing / Question framed | TBD | TBD | No Pilot Ops owner | Placeholder only. |
| Reconciliation evidence item | Reconciliation evidence package | Internal analysis / Reconciliation evidence | Missing / Question framed | TBD | TBD | No reconciliation process | Placeholder only. |
| Support / dispute evidence item | Support / dispute evidence package | Support / incident evidence | Missing / Question framed | TBD | TBD | No support / dispute process | Placeholder only. |
| Audit / retention / access-control evidence item | Audit / retention / access-control evidence package | Audit evidence | Missing / Question framed | TBD | TBD | No audit / retention policy | Placeholder only. |
| Staging / live-state separation evidence item | Staging / live-state separation evidence package | Repo governance artifact / Technical sandbox evidence | Missing / Question framed | TBD | TBD | No staging / live-state separation evidence | Placeholder only. |
| ADR drafting readiness evidence item | ADR drafting readiness evidence package | Repo governance artifact | Missing / Question framed | TBD | TBD | No accepted Class B ADRs | Placeholder only. |
| Implementation-proposal preflight evidence item | Implementation-proposal preflight evidence package | Repo governance artifact | Missing / Question framed | TBD | TBD | No implementation-specific §7a brief | Placeholder only. |

This registry is a template only. It does not assert that evidence has been gathered, accepted, or approved.

## 11. Freshness and review expectations

| Evidence type | Freshness concern | Review expectation | Staleness trigger |
|---|---|---|---|
| Legal / regulatory evidence | Law, regulation, guidance, enforcement posture, and interpretation may change. | Qualified legal / compliance review with date and scope; future governance review. | Jurisdiction, law, guidance, operating model, product claim, or time boundary changes. |
| Jurisdiction evidence | User location, operating location, provider location, and regulatory perimeter may change. | Jurisdiction-specific review and documented assumptions. | New country, corridor, provider location, user segment, or operating entity assumption. |
| Vendor / provider documentation | Capabilities, limits, APIs, fees, and support policies may change. | Preserve dated documentation and confirm version / scope. | Vendor updates docs, API, terms, fees, limits, or support path. |
| Rail permission evidence | Sandbox access, pilot permission, and live authority are separate and may expire. | Dated vendor / provider confirmation and legal / compliance review. | Environment changes, permission scope changes, contract changes, or expiration. |
| Fee / FX / spread evidence | Pricing, spread, quote validity, and limits may change quickly. | Dated fee / FX evidence and disclosure review. | Any pricing, provider, corridor, quote, or limit change. |
| Stablecoin / conversion evidence | Conversion routes, settlement, providers, legal posture, and asset support may change. | Vendor / provider evidence, legal / compliance review, custody review. | Provider, asset, jurisdiction, rail, liquidity, or fee model changes. |
| Custody evidence | Provider role, asset-control, keys, recovery, and responsibility may change. | Provider documentation / confirmation and legal / compliance review. | Provider model, wallet model, contract, recovery, or control boundary changes. |
| Liquidity assumptions | Buffers, reserves, fallback routes, and stress triggers may become invalid. | Operational review and governance review with dated assumptions. | Volume, corridor, provider, rail, pricing, delay, failure, or market stress changes. |
| Operational process evidence | Owners, staffing, manual process, escalation, and workload may change. | Operational review with named owner and date. | Owner changes, process changes, staffing changes, incident findings, or volume changes. |
| Support / dispute evidence | Support paths, SLAs, vendor handoffs, and dispute expectations may change. | Support review, legal / compliance review where applicable, vendor evidence where applicable. | Support owner, vendor support path, dispute rule, user segment, or incident type changes. |
| Audit / retention evidence | Retention, access-control, privacy, and audit scope may change. | Legal / compliance review, security / access-control review, and governance review. | Data type, jurisdiction, access model, retention policy, or audit scope changes. |
| Security / access-control evidence | Access rights, controls, secrets, evidence storage, and review scope may change. | Security / access-control review with dated evidence. | System, owner, permission, data class, vendor, or evidence location changes. |

Freshness windows are not approved SLAs and must be reviewed by future governance.

## 12. Evidence blocker register

| Blocker | Evidence needed | Current posture | Escalation path | Blocks |
|---|---|---|---|---|
| No jurisdiction selected | Founder-approved jurisdiction assumption; qualified legal / compliance review. | Unresolved | Governance review; legal / compliance review. | Legal, eligibility, rail, custody, disclosures, ADR readiness. |
| No legal / compliance review | Qualified review covering regulatory perimeter, eligibility, KYC / AML, disclosures, data, and claims. | Evidence missing | Legal / compliance review; governance review. | ADR drafting readiness; implementation-proposal preflight. |
| No customer eligibility policy | Eligibility criteria, restrictions, review process, and evidence. | Framed only | Legal / compliance review; governance review. | Pilot Ops, Trust UX, support, implementation preflight. |
| No KYC / AML owner | Ownership matrix, responsibility boundary, sanctions / PEP expectations, vendor role. | Framed only | Legal / compliance review; vendor review. | Rail, custody, eligibility, Pilot Ops. |
| No custody model selected | Custody options, provider responsibility, asset-control, recovery, failure responsibility. | Unresolved | Custody review; legal / compliance review; future ADR review if required. | Trust UX, reconciliation, support, audit, ADR readiness. |
| No provider responsibility evidence | Vendor / provider documentation and confirmation of role, limits, support, and failure responsibility. | Evidence missing | Vendor / provider review; legal / compliance review. | Custody, rail, support, audit, implementation preflight. |
| No rail selected or approved | Candidate rail evidence, classification, permission scope, environment boundary. | Unresolved | Rail review; legal / compliance review; vendor review. | Settlement, fees, liquidity, reconciliation, support. |
| No rail permission evidence | Vendor / provider confirmation of sandbox, internal-test, pilot, or live permission scope. | Evidence missing | Vendor / provider review; governance review. | Any rail-dependent review. |
| No settlement / finality evidence | Settlement timing, reversibility, failure, delay, dispute, and finality evidence. | Evidence missing | Rail review; reconciliation review. | Trust UX, support, reconciliation, audit. |
| No fee / FX / spread evidence | Fees, spread, quote validity, limits, and disclosure evidence. | Evidence missing | Vendor review; legal / compliance review; Trust UX review. | Disclosures, support, reconciliation, customer eligibility. |
| No liquidity buffer policy | Buffer assumptions, reserve logic, stress triggers, and limits. | Framed only | Governance review; liquidity / withdrawal review. | Withdrawal control, pilot operations, implementation preflight. |
| No withdrawal control evidence | Withdrawal path, pause controls, fallback routes, unresolved-path handling, kill criteria. | Evidence missing | Liquidity / withdrawal review; operational review. | Trust UX, support, reconciliation, audit, implementation preflight. |
| No Trust UX approval | Allowed / prohibited claims, disclosures, state labels, support wording, Copilot proximity constraints. | Future governed review required | Trust UX review; legal / compliance review. | Product copy, UI implementation consideration, support messages. |
| No Pilot Ops owner | Named owner, role matrix, workload assumptions, manual review flow, pause / escalation path. | Unresolved | Governance review; Pilot Ops review. | Pilot operations assessment and implementation preflight. |
| No reconciliation process | Source-of-truth boundary, matching rules, exception taxonomy, cadence, audit trail. | Framed only | Reconciliation review; audit review; future ADR review if required. | Ledger-truth review, support, audit, implementation preflight. |
| No support / dispute process | Support owner, escalation matrix, dispute handling, prohibited promises, closure dependencies. | Framed only | Support review; legal / compliance review. | Trust UX, Pilot Ops, reconciliation, audit. |
| No audit / retention policy | Evidence owner, event receipts, retention questions, access-control constraints, audit exceptions. | Framed only | Audit review; legal / compliance review; security / access-control review. | Evidence acceptance, post-pilot review, implementation preflight. |
| No staging / live-state separation evidence | Environment taxonomy, labels, data separation, evidence tagging, sandbox / internal-test / pilot / live boundaries. | Framed only | Staging / live-state review; ADR compatibility review. | Environment proposals and evidence reliance. |
| No accepted Class B ADRs | Evidence-backed ADR drafting readiness review and accepted ADRs where required. | Future governed review required | ADR governance review. | ADR acceptance, implementation preflight where ADRs are required. |
| No implementation-specific §7a brief | Explicit future §7 naming and bounded §7a brief if implementation is ever proposed. | Unresolved | Repo governance. | Implementation proposal, execution, staging, live operations. |

## 13. Evidence review gates

| Gate | Purpose | Required inputs | Output | Non-authorization boundary |
|---|---|---|---|---|
| Evidence intake review | Confirm evidence was received, preserved, classified, and linked to a package. | Evidence item, package, source class, owner, freshness / review date, related blocker. | Intake record or request for missing metadata. | Intake review does not approve evidence. |
| Evidence quality review | Assess source quality, scope, conflicts, authority, and dependency fit. | Intake record, source material, package expectations, source classification. | Quality finding: sufficient for planning, insufficient, conflicting, or needs escalation. | Quality review does not approve implementation. |
| Evidence freshness review | Assess whether evidence is current enough for its intended review use. | Evidence item, date, freshness concern, staleness triggers. | Freshness finding: current for planning, stale / refresh required, or time-bound. | Freshness review does not create SLAs or approval. |
| Evidence blocker review | Determine which blockers remain open, reframed, or supported by evidence. | Blocker register, evidence states, quality / freshness findings. | Updated blocker posture for future governed review. | Blocker review does not approve Class B readiness. |
| ADR drafting readiness review | Determine whether evidence is sufficient to consider drafting specific Class B ADRs. | Evidence packages, blocker review, legal / compliance review where applicable, ADR scoping memo. | Readiness finding for possible future ADR drafting. | ADR drafting readiness does not accept ADRs. |
| Implementation-proposal preflight review | Determine whether evidence is sufficient to consider a future implementation proposal. | Evidence packages, blocker review, accepted ADRs where required, legal / compliance review, vendor evidence, operational evidence. | Preflight consideration finding for future governance. | Implementation-proposal preflight does not activate implementation. |

## 14. Relationship to future work

- Future `EVID-B-*` tickets may collect or assess specific evidence packages only if separately named.
- Future ADR drafting requires separate repo governance.
- Future implementation-proposal preflight requires separate repo governance.
- Future implementation requires separate §7 naming and bounded §7a.
- This plan does not create a backlog, queue, default next ticket, or implementation path.

## 15. Notion release posture

This plan should create or update a new Notion release container:

**Class B Evidence Gathering**

Recommended release posture:

| Field | Value |
|---|---|
| Status | Now / Active |
| Type | Governance-only / Evidence gathering |
| Authority | Non-authorizing |
| Relationship | follows closed Class B Pilot Governance Spine |

Release description:

Governance-only evidence-gathering track following the closed Class B Pilot Governance Spine. Defines and stages evidence packages, source expectations, review gates, blocker tracking, and freshness requirements needed before future ADR drafting readiness or implementation-proposal preflight can be considered. Does not authorize Class B execution, implementation, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, reconciliation operations, support operations, audit operations, ledger truth, ADR acceptance, Copilot execution, Class C automation, or customer fund movement.

## 16. Non-authorization statement

This plan is non-authoritative and documentation-only. It does not approve, activate, sequence, or implement Class B execution, staging, sandbox use, internal testing, live operations, deposits, withdrawals, custody, rails, stablecoin conversion, treasury operations, liquidity buffers, reconciliation operations, support operations, audit operations, ledger mutation, Copilot execution, Class C automation, external engagement, or customer fund movement. Any future Class B evidence-gathering, ADR drafting readiness, implementation-proposal preflight, or implementation work still requires separate HEDGR_STATUS.md §7 naming where applicable, a bounded §7a brief where applicable, accepted ADRs where required, qualified legal / compliance review, relevant spine-artifact review, vendor / partner evidence where applicable, and operational evidence.
