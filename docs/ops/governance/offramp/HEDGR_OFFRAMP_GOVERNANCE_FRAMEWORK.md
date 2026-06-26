# HEDGR - Off-Ramp Governance Framework

## 1. Status / Authority / Scope

**Status:** Governance framework; documentation-only.

**Authority:** Repo-native governance framework subordinate to `.cursorrules`, `AGENTS.md`, `docs/ops/HEDGR_STATUS.md`, accepted ADRs, the Hedgr Constitutional Charter, the MVP project specification, the completed Class B Governance Spine, the completed Class B Evidence Gathering program, the Class B Evidence Intake Governance Model, and the current Stability Engine read-only / informational boundary.

**Ticket:** `OFFRAMP-GOV-001` - Establish Hedgr Off-Ramp Governance Framework.

**Mode:** Documentation-only governance. This framework does not gather evidence, accept evidence, select markets, select providers, approve rails, approve custody, approve stablecoin conversion, approve deposits, approve withdrawals, approve implementation, or authorize customer-money activity.

**Primary repo path:** `docs/ops/governance/offramp/HEDGR_OFFRAMP_GOVERNANCE_FRAMEWORK.md`

This framework establishes how off-ramp work should be interpreted inside Hedgr governance. It does not replace Class B governance. It defines off-ramp as a cross-cutting governance framework that routes future evidence questions into the existing Class B evidence architecture.

---

## 2. Institutional Role

Off-ramp is a core stability-wallet concern because stable value is incomplete if the user cannot safely convert it back into usable local value.

That does not make off-ramp an independent governance institution.

The governing model is:

```text
Constitution
     |
     v
MVP Doctrine
     |
     v
Class B Governance
     |
     +----------------+
     |                |
     v                v
Market Strategy   Off-Ramp Framework
     |                |
     +--------+-------+
              v
    Class B Evidence Records
```

Interpretation rules:

1. The Constitutional Charter supplies the highest-order constraints: capital preservation, liquidity integrity, visible risk, governance before scale, and institutional conduct.
2. The MVP specification defines off-ramp as part of the stability-wallet utility and execution-class model.
3. Class B governance remains the container for any future manual / limited execution evidence path.
4. Off-ramp is a cross-cutting framework for withdrawal, payout, provider, market, support, reconciliation, and Trust UX questions.
5. Research artifacts are decision-support inputs only. They do not define governance by themselves.
6. Class B evidence records remain the future evidence surface if evidence intake is separately authorized.

---

## 3. Constitutional Alignment

### Article I - Capital Preservation Above All

An off-ramp path must not be framed as a growth unlock if it introduces unresolved custody, settlement, liquidity, or provider-risk exposure. The framework treats exit reliability as part of principal-preservation discipline.

### Article II - Liquidity Is Sacred

Off-ramp is directly related to liquidity integrity. A stable balance that cannot be converted into local usable value may create practical liquidity risk for the user.

This framework therefore requires future off-ramp evidence to distinguish:

- quote availability from executable conversion;
- provider receipt from settlement finality;
- payout initiation from local credit or cash collection;
- local endpoint presence from available liquidity;
- Hedgr application status from provider or local-rail source of truth.

### Article III - Risk Must Be Visible

Future off-ramp Trust UX must show provider role, timing, limits, fees, quote expiry, local endpoint uncertainty, failed-payout paths, and support responsibility where relevant. It must avoid unsupported claims such as instant, guaranteed, final, always available, or withdraw anytime.

### Article IV - Governance Before Scale

Off-ramp cannot move from research into evidence intake, ADR drafting readiness, implementation-preflight, pilot, or live operations without separate repo-governed authority. Naming this framework does not approve those later gates.

---

## 4. Relationship To Current Repo Posture

Current repo posture remains:

- read-only;
- non-executing;
- governance-constrained;
- evidence-gated;
- no Class B implementation authority;
- no customer-money authority.

The Class B evidence program currently records every relevant evidence package as `Question framed / Missing`. This framework preserves that state.

This framework does not modify:

- `apps/`;
- `packages/`;
- `scripts/`;
- `.github/`;
- tests;
- `apps/frontend/lib/engine/**`;
- CI workflows;
- Copilot runtime;
- ADR status.

---

## 5. Responsibility Model

A future off-ramp design may need to distinguish at least five responsibility layers. This framework assigns no live owner to any layer.

| Layer | Future question | Current boundary |
| --- | --- | --- |
| User authorization | What must the user explicitly approve before stable-value conversion or transfer? | No authorization flow is approved. |
| Hedgr orchestration | What may Hedgr display, route, disclose, or preserve as status pointers? | No orchestration runtime is approved. |
| Provider-of-record | Which qualified entity owns KYC, AML, conversion, payout, refunds, and complaints? | No provider is selected or approved. |
| Local payout endpoint | Which bank, wallet, MNO, card, agent, or cash network actually provides usable value? | No endpoint is selected or approved. |
| Source of truth | Which provider, rail, or settlement record determines transaction state? | Hedgr application data is not ledger, settlement, or payout truth. |

Future evidence must not collapse these layers into a single "rail" label.

---

## 6. Relationship To Stability Engine

The Stability Engine remains read-only and informational.

Off-ramp evidence may become relevant to future liquidity communication, because local exit reliability affects how users experience liquidity. That future relationship is informational unless separately authorized by accepted ADRs and `HEDGR_STATUS.md` `§7` / `§7a`.

This framework does not authorize:

- engine execution;
- automated allocation;
- accounting truth;
- ledger truth;
- hidden reallocation;
- provider routing logic in engine code;
- withdrawal or payout state in engine code;
- customer-specific off-ramp decisions.

---

## 7. Relationship To Market Strategy

Market strategy and off-ramp strategy are sibling lenses under Class B governance.

Market strategy asks which jurisdictions and user segments may warrant future evidence review. Off-ramp strategy asks whether a user in a candidate market can safely, lawfully, and legibly convert stable value into usable local value through a qualified provider path.

Neither lens selects a market or provider by itself.

Future market work should preserve the following distinctions:

- crypto adoption is not off-ramp evidence;
- country coverage is not endpoint evidence;
- provider marketing is not Hedgr-specific permission;
- endpoint availability is not liquidity proof;
- local payout submission is not finality;
- founder familiarity is not regulatory approval.

---

## 8. Relationship To Trust UX

Off-ramp Trust UX must be evidence-linked and non-promissory.

Future Trust UX review should require copy and state models that distinguish:

- estimated timing from guaranteed timing;
- quote expiry from final cost;
- provider received from provider completed;
- payout initiated from local credit;
- cash available from cash collected;
- failed payout from refunded value;
- Hedgr support handoff from provider dispute ownership.

This framework does not approve product copy, shipped UI, Copilot guidance, or customer-facing claims.

---

## 9. Class B Evidence Architecture

Off-ramp should be implemented through the existing Class B evidence architecture if future evidence intake is separately authorized.

Relevant existing evidence packages include:

| Class B package | Off-ramp relevance |
| --- | --- |
| Legal / compliance | Determines whether stablecoin conversion, payout, remittance, VASP, FX, or money-transmission obligations apply. |
| Jurisdiction selection | Determines whether a candidate market can support the intended flow. |
| Customer eligibility | Determines who may use an off-ramp flow and under what limits. |
| KYC / AML responsibility | Determines provider and Hedgr responsibilities for identity, sanctions, monitoring, and exception handling. |
| Custody provider / model | Determines whether user, provider, Hedgr, or another party controls assets at each step. |
| Rail / vendor permission | Determines whether a provider is permitted to support the exact Hedgr use case. |
| Rail settlement / finality | Determines what state is final and which record proves it. |
| Stablecoin / conversion | Determines stablecoin, chain, conversion, receipt, sale, redemption, and FX boundaries. |
| Fee / FX / spread | Determines total user cost, quote expiry, spread disclosure, and failed-quote handling. |
| Liquidity / withdrawal control | Determines whether local exit reliability and liquidity controls are evidenced. |
| Trust UX / disclosure | Determines what can be safely shown to users. |
| Pilot Ops | Determines manual controls and operational ownership before any pilot. |
| Reconciliation | Determines source-of-truth, matching, exception, and closure logic. |
| Support / dispute | Determines support handoff, failed payout, reversal, refund, and complaint handling. |
| Incident response / operational failure | Determines degraded rail and provider-failure response. |
| Audit / retention | Determines receipts, source pointers, access boundaries, and preservation. |
| Staging / live-state separation | Determines how sandbox, internal test, manual pilot, and live states stay separated. |
| Governance override / exception authority | Determines who can approve exceptions and how those decisions are recorded. |
| Evidence acceptance / review governance | Determines review, freshness, conflict, supersession, and retirement controls. |
| Evidence sufficiency / gap closure | Determines whether future evidence is sufficient for a bounded downstream question. |

Illustrative future sub-path if separately authorized:

```text
docs/ops/governance/class-b/evidence/offramp/
  README.md
  markets/
  providers/
  endpoints/
  source-pointers/
  review-records/
```

This path is illustrative only. It is not created by this ticket and does not authorize evidence intake.

---

## 10. Implementation Gate Model

Off-ramp work must pass through explicit gates. A later gate cannot be inferred from an earlier one.

| Gate | Meaning | Required authority |
| --- | --- | --- |
| Research preserved | Internal analysis exists as decision support. | Research artifact only; no operational authority. |
| Framework established | Repo records how off-ramp fits governance. | This framework. |
| Evidence intake contemplated | Governance considers whether intake should occur. | Future `§7` / `§7a` ticket, if approved. |
| Evidence intake performed | Source pointers are preserved under intake controls. | Future bounded intake authority. |
| Evidence reviewed | Evidence is assessed for relevance, freshness, conflicts, and dependencies. | Future governed review authority. |
| Evidence accepted for planning | Evidence may support a limited planning question. | Future acceptance decision; not implementation. |
| ADR drafting readiness | Governance may consider ADR drafting. | Future readiness review. |
| Implementation-preflight | Governance may consider an implementation proposal. | Future preflight review. |
| Implementation | Code, operational, provider, or customer-money work begins. | Future explicit `§7` / `§7a`, accepted ADRs where required, legal/compliance review, and scoped controls. |

This framework closes only the framework-establishment gate.

---

## 11. Dependency Map

Existing repo dependencies for future off-ramp work include:

- `GOV-B-001` through `GOV-B-017` - completed Class B governance prerequisite spine.
- `EVID-B-001` - evidence gathering plan.
- `EVID-B-002` - evidence registry.
- `EVID-B-003` through `EVID-B-020` - package skeletons relevant to legal, jurisdiction, eligibility, KYC/AML, custody, rails, settlement, conversion, fees, liquidity, Trust UX, operations, reconciliation, support, incident, audit, staging/live separation, and override controls.
- `EVID-B-021` - evidence acceptance and review governance.
- `EVID-B-022` - evidence sufficiency and gap closure framework.
- `GOV-REVIEW-B-001` - consolidated review of the Class B evidence program.
- `EVID-INTAKE-B-001` - intake readiness planning memo.
- `GOV-CHECKPOINT-B-001` - Class B governance and evidence program closure assessment.
- `GOV-INTAKE-B-002` - evidence intake governance model.

Off-ramp does not reopen or supersede those artifacts. It depends on them.

---

## 12. Canonical Terminology

| Term | Canonical meaning |
| --- | --- |
| Off-ramp | The governed problem space for converting stable value into usable local value through a qualified path. |
| Payout endpoint | The bank, mobile wallet, e-wallet, card, instant-payment address, agent, or cash-pickup channel that delivers local utility. |
| Provider-of-record | The qualified entity responsible for regulated conversion, payout, KYC/AML, dispute, refund, or related obligations where applicable. |
| Same-name withdrawal | A candidate future control in which the user withdraws only to an account, wallet, card, or pickup identity in the same verified name. |
| Endpoint evidence | Evidence specific to the exact payout method, country, provider, user class, limits, fees, settlement, support, and failure path. |
| Local liquidity | The actual capacity of the endpoint or provider network to deliver local value, including prefunding, agent cash, MNO float, or settlement availability where relevant. |
| Settlement truth | The provider, rail, bank, MNO, agent, or other authoritative record that determines the transaction state. |

Prohibited shorthand:

- "Provider supports Kenya" as a substitute for endpoint evidence.
- "API available" as a substitute for commercial permission.
- "Payout submitted" as a substitute for local credit or collection.
- "Hedgr balance" as a substitute for provider, custody, ledger, or settlement truth.
- "Instant withdrawal" without exact evidence for the endpoint and fallback states.

---

## 13. Proposed ADR Candidates

The following are candidate ADR domains only. This framework does not draft, accept, sequence, or approve any ADR.

Possible future ADR candidates if separately authorized:

1. Off-ramp responsibility boundary and provider-of-record model.
2. Same-name withdrawal and beneficiary-scope policy.
3. Stablecoin, chain, and conversion boundary for a first approved off-ramp path.
4. Provider-status, local-rail-status, and Hedgr-status separation.
5. Liquidity and withdrawal communication standard for local payout availability.
6. Reconciliation source-of-truth model for off-ramp provider records.
7. Support, dispute, refund, and failed-payout responsibility model.
8. Staging, sandbox, internal-test, pilot, and live-state separation for off-ramp flows.

No ADR candidate above is accepted or ready for drafting by this ticket.

---

## 14. Research Artifact Relationship

The following research drafts are supporting references only until promoted through the active ticket close order:

- `docs/research/HEDGR_OFFRAMP_STRATEGY_AGENCY_AND_PAYOUT_INFRASTRUCTURE_RESEARCH_REVIEW_DRAFT.md`
- `docs/research/HEDGR_MVP_WALLET_RAILS_MARKET_STRATEGY_PAPER_REVIEW_DRAFT.md`

Research may frame hypotheses, evidence questions, provider universes, and market comparisons. It must not precede or implicitly define governance.

After this framework is merged, those drafts may be promoted to their canonical research paths if the active ticket proceeds to the second close-order step. Promotion does not convert the research into evidence acceptance or implementation authority.

---

## 15. Non-Authorization Statement

This framework is documentation-only and non-authorizing. It does not approve, validate, accept, or certify evidence and does not approve, activate, sequence, or implement evidence intake, evidence collection, evidence request, evidence acceptance, evidence rejection, evidence scoring, evidence evaluation, registry-state change, evidence-state change, gap closure, blocker closure, provider outreach, commercial engagement, market selection, provider selection, jurisdiction selection, custody model selection, rail selection, endpoint selection, stablecoin conversion, deposits, withdrawals, remittance, bulk disbursement, treasury operations, liquidity buffers, prefunded MNO wallets, agent operations, reconciliation operations, support operations, audit operations, staging, sandbox use, internal testing, live operations, ledger truth, accounting truth, Copilot execution, Class C automation, ADR acceptance, implementation-preflight, or customer fund movement.

Any future evidence intake, provider outreach, evidence acceptance, gap closure, blocker closure, ADR drafting readiness, implementation-proposal preflight, implementation work, pilot, live operation, or customer-money activity requires separate repo-governed authorization through `docs/ops/HEDGR_STATUS.md` `§7` naming where applicable, a bounded `§7a` brief where applicable, accepted ADRs where required, qualified legal/compliance review where applicable, provider and market evidence where relevant, source pointers, freshness review, conflict review, dependency review, audit/retention controls, and explicit non-authorization boundaries.
