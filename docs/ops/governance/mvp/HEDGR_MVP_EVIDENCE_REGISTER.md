# Hedgr MVP Evidence Register

**Status:** Governance evidence model; documentation-only  
**Authority class:** Institutional evidence recording structure (non-executing)  
**Visibility:** Internal governance  
**Date:** 2026-07-10  
**Refinement:** Institutional hardening pass (schema, residual-risk controls, classification clarity, cross-link boundaries)

**Domain priming:** `MVP-EVID-001` (2026-07-13; records only, no domain acceptance or gate clearance)

---

## 1. Status / Authority / Scope

**Status:** Binding as the institutional evidence model for MVP acceptance review. Documentation-only.

**Authority:** Subordinate to, and must not be read as overriding:

1. `docs/ops/HEDGR_STATUS.md` — especially **§7** / **§7a**
2. Accepted ADRs under `docs/decisions/`
3. `AGENTS.md`
4. Higher-precedence doctrine (Constitutional Charter, Governance Philosophy, UX Constitution, and the doctrine stack in `.cursorrules`)
5. Product intent in `docs/doctrine/hedgr-mvp-project-specification.md`
6. The companion acceptance definition in `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md`

**Mode:** Evidence model and recording structure only. This register does **not**:

- gather evidence by itself
- accept or certify evidence by row presence
- authorize implementation or ticket activation
- alter ADRs or doctrine precedence
- create backlog / sequencing authority
- replace Class B, off-ramp, Copilot, brand, or Stability Engine evidence programs within their scopes
- convert research, prototypes, or founder confidence into execution permission

**Implementation authority remains:**

- `docs/ops/HEDGR_STATUS.md`
- accepted ADRs
- `AGENTS.md`
- active repo-native governance

**Primary repo path:** `docs/ops/governance/mvp/HEDGR_MVP_EVIDENCE_REGISTER.md`

**Companion artifact:** `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md`

**Governing ADR (principle; Accepted; non-executing):** `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md`

---

## 2. Purpose

This register defines how Hedgr records and reviews evidence for institutional MVP acceptance.

It answers:

> What evidence categories, verification structure, confidence language, and review responsibilities support an institutional judgment that the MVP is acceptably done?

It does **not** answer:

> Has the MVP been accepted? May implementation proceed? Is Class B or Class C ready?

Those judgments require separate governed review using this model, and any implementation still requires normal repo activation.

---

## 3. Evidence Principles

1. **Evidence precedes acceptance rhetoric**  
   Institutional MVP acceptance must cite recorded evidence dispositions, not feature lists or narrative confidence.

2. **Register rows are not proof**  
   A category or domain row means an evidence need is tracked. It does not mean evidence exists, is sufficient, or is accepted.

3. **Missing is a valid and required state**  
   Absence must be labeled. Inference is forbidden.

4. **Source class must remain visible**  
   Founder assumption, repo governance, user research, operational evidence, legal/compliance review, vendor confirmation, sandbox/test evidence, and accepted ADRs are different classes and must not be collapsed.

5. **Confidence is not authorization**  
   Even high confidence does not activate tickets, widen execution class, or move customer funds.

6. **Execution-class honesty**  
   Evidence for informational (Class A) surfaces cannot silently prove manual/limited (Class B) or automated (Class C) reliability.

7. **Conflicts must be escalated, not reconciled by inference**  
   Conflicting sources remain visible until governed review resolves them.

8. **Freshness matters**  
   Time-sensitive claims require `evidence_period`, review dates, or explicit staleness handling. Review date alone is insufficient.

9. **Lane evidence remains lane evidence**  
   Class B / off-ramp / Copilot / engine trust evidence may support MVP domains, but those programs retain their own non-authorization boundaries and originating limitations (**§9**).

10. **This register does not sequence work**  
    It supports acceptance review. It does not create §7 order, ADR order, or implementation backlog.

11. **No multi-category double counting**  
    A single evidence artifact may support multiple evidence categories; however, each classification must explicitly state the distinct institutional claim being supported. One artifact cited under multiple categories does **not** count as multiple independent corroborating sources unless distinct claims and independent corroboration are both explicit.

---

## 3a. Classification Model (Four Independent Systems)

Operators must keep these systems distinct. Do not collapse them.

| Concept | Purpose | Answers |
|---------|---------|---------|
| **Evidence State** | Stage of evidence maturity | How far has this evidence progressed? |
| **Confidence** | Strength of support for a stated claim | How strong is the support? |
| **Disposition** | Domain review outcome | What is the domain judgment? |
| **Gate Clearance** | Institutional progression decision | May this institutional gate clear or defer? |

These models are independent. Evidence state does not imply confidence. Confidence does not automatically determine disposition (**§7**). Disposition does not clear gates. Gate clearance does not activate implementation.

Canonical gate definitions live only in the Acceptance Framework. This register records evidence and domain outcomes that may later inform gate review.

---

## 4. Evidence Categories

Evidence used for MVP acceptance must be classified into one or more of the following categories.

| ID | Category | Typical contents | May support | Must not be treated as |
|----|----------|------------------|-------------|------------------------|
| E1 | **Doctrine & governance continuity** | Charter/UX alignment notes, ADR boundary confirmations, status/authority readouts | Domains D1, D4, D7, D8; Gates G0–G2 | Implementation approval |
| E2 | **Trust-surface & disclosure evidence** | Custody/fee/risk disclosure reviews, overclaim checks, trust UX critique | Domains D3, D8; Gates G4 | Regulatory certification |
| E3 | **Engine communication evidence** | Informational allocation/posture legibility tests; non-accounting boundary checks | Domain D4; Gate G2 | Ledger or accounting truth |
| E4 | **Liquidity & withdrawal evidence** | Withdrawal reliability evidence at authorized class; liquidity communication honesty | Domain D2; Gate G3 | Unauthorized live-rail proof |
| E5 | **Rails & custody evidence** | Provider/custody/rail evidence packages; settlement/finality distinctions | Domain D5; Gate G2 | Market selection or vendor approval by implication |
| E6 | **Advisory Copilot evidence** | Advisory-only behavior checks; non-execution and calm-guidance reviews | Domain D6 | Copilot execution authority |
| E7 | **Demand & learning evidence** | Bounded user/research learning on stability-first demand under stated trust posture | Domain D9 | Growth mandate or feature expansion authority |
| E8 | **Operational / pilot-control evidence** | Support, reconciliation, incident, eligibility, staging/live separation evidence where relevant | Domains D2, D5, D7, D10; Gates G5–G6 | Class B readiness by row presence |
| E9 | **Legal / compliance review evidence** | Qualified counsel or compliance review outputs where required by domain risk | Domains D5, D7; Gates G0, G5 | Silent legal reliance without stated scope |
| E10 | **Negative / exclusion evidence** | Proof that gamification, yield-first framing, or out-of-scope expansion were rejected | Domains D1, D8; Gate G7 | Permission to add those patterns later without review |

Category membership is descriptive. It does not create intake authority. Multi-category use of one artifact must follow Principle 11.

---

## 4a. Gate Reference Summary

Lightweight navigability only. **Do not treat this table as a second gate definition.** Canonical gate meaning and clearance rules remain in `HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md` **§6**.

| Gate ID | Gate name | One-line purpose | Canonical pointer |
|---------|-----------|------------------|-------------------|
| G0 | Doctrine continuity | Keep acceptance inside Charter, UX Constitution, and product intent | Acceptance Framework §6 / §6.1 |
| G1 | Authority continuity | Prevent acceptance from inventing execution power | Acceptance Framework §6 |
| G2 | Execution-class honesty | Keep claims matched to Class A / B / C reality | Acceptance Framework §6 |
| G3 | Liquidity honesty | Require evidence-backed withdrawal / liquidity claims | Acceptance Framework §6 |
| G4 | Trust non-overclaim | Block overstated protection, automation, or certainty | Acceptance Framework §6 |
| G5 | Evidence sufficiency | Require visible domain dispositions; forbid inferred confidence | Acceptance Framework §6 |
| G6 | Reversibility & stop conditions | Keep provisional judgments auditable and reversible | Acceptance Framework §6 |
| G7 | Out-of-scope containment | Keep non-MVP expansion out of “done” rhetoric | Acceptance Framework §6 |

---

## 5. Acceptance Recording Structure

Each acceptance-domain review record should capture the fields below. Records may live in future governed review artifacts; this section defines the required structure.

### 5.1 Domain record schema

| Field | Required | Meaning |
|-------|----------|---------|
| `domain_id` | Yes | One of D1–D10 from the Acceptance Framework |
| `domain_name` | Yes | Human-readable domain name |
| `claim_under_review` | Yes | Exact institutional claim being evaluated |
| `authorized_execution_class` | Yes | Class A / B / C (or mixed with explicit bounds) assumed by the claim |
| `evidence_category_ids` | Yes | One or more of E1–E10 |
| `source_pointers` | Yes | Explicit artifact paths, review IDs, or external source references |
| `source_classes` | Yes | Class labels for each material source |
| `evidence_period` | Yes | Period during which evidence was collected or remains valid (e.g. `2026-06-01 → 2026-06-30`, `Pilot Cohort Alpha`, `Sprint 5 Validation`) |
| `evidence_owner` | Yes | Operational maintainer of the evidence reference (e.g. Founder, Product, Operations, Engineering, Legal). **Ownership ≠ approval authority.** |
| `evidence_state` | Yes | From **§6** |
| `confidence` | Yes | From **§7** |
| `conflicts` | Yes | None, or explicit conflict description |
| `residual_risks` | Yes | What remains unresolved if disposition is not a clean accept |
| `revisit_conditions` | Yes if provisional | What would force re-review |
| `disposition` | Yes | From **§5.2** |
| `reviewers` | Yes | Roles/names per **§8** |
| `review_date` | Yes | ISO date of institutional review |
| `non_authorization_ack` | Yes | Explicit acknowledgment that disposition ≠ implementation authority |

When a single source is mapped to multiple `evidence_category_ids`, record the distinct institutional claim for each category mapping (Principle 11).

### 5.2 Domain dispositions

| Disposition | Meaning | Boundary |
|-------------|---------|----------|
| **Not started** | No institutional review yet | Default; not a gap waiver |
| **Evidence incomplete** | Need is known; evidence insufficient | Blocks acceptance for that domain |
| **Under review** | Sources are being evaluated | Not an accept |
| **Accepted** | Evidence sufficient for the stated claim at the stated execution class | Still not §7 activation |
| **Accepted with bounded residual risk** | Accepted provisionally; residual-risk controls in **§5.2.1** required | Provisional ≠ permanent policy |
| **Not applicable** | Domain claim does not apply to current MVP acceptance frame; rationale required | Cannot hide a required constitutional domain |
| **Rejected / insufficient** | Evidence fails the claim | Domain remains open |
| **Conflicting / escalated** | Sources conflict; governed escalation required | No inference-based close |

#### 5.2.1 Required fields for `Accepted with bounded residual risk`

This disposition may **not** be used unless all of the following are recorded:

| Field | Purpose |
|-------|---------|
| `residual_risk_owner` | Who owns monitoring and closure of the residual risk |
| `review_trigger` **or** `residual_review_date` | Event or date that forces re-review; prevents indefinite provisional acceptance |
| `consequence_if_unresolved` | What happens if the residual risk remains open past the trigger/date |
| `founder_acknowledgement` | Required when residual risk is material; explicit founder acknowledgment that provisional acceptance is bounded and time-limited |

Silence, missing revisit conditions, or “accept for now” without the fields above is invalid. Provisional acceptance that outlives its review trigger without re-review becomes **Stale / requires refresh** for reliance purposes and may not be treated as continuing acceptance.

### 5.3 Gate record schema

Gate records (G0–G7) should capture:

- gate ID and name (see **§4a**; definitions in Acceptance Framework **§6**)
- linked domain dispositions
- clearance state: `Open` | `Cleared` | `Deferred with founder-recorded rationale`
- residual risk / revisit condition when deferred
- reviewer identities and date
- explicit non-authorization acknowledgment

### 5.4 Working register summary

The table below summarizes the schema-complete priming records in **§5.5**. Row presence and source-pointer identification are not evidence sufficiency, acceptance, or gate clearance.

| Domain | Claim focus | Primary categories | Evidence state | Confidence | Disposition |
|--------|-------------|--------------------|----------------|------------|-------------|
| D1 Stability & capital preservation | Stability-first posture above yield/growth | E1, E2, E10 | Evidence identified | Unscored | Evidence incomplete |
| D2 Liquidity & withdrawal integrity | Honest liquidity / withdrawal reliability at authorized class | E4, E5, E8 | Evidence identified | Unscored | Evidence incomplete |
| D3 Risk visibility & trust disclosure | Risk and trust claims are legible and non-overclaiming | E2, E1 | Evidence identified | Unscored | Evidence incomplete |
| D4 Engine-aligned communication | Informational engine UX is not mistaken for accounting/execution truth | E3, E1 | Evidence identified | Unscored | Evidence incomplete |
| D5 Rails & custody integrity | Rails/custody/conversion claims match authorized class | E5, E8, E9 | Evidence identified | Unscored | Evidence incomplete |
| D6 Advisory Copilot posture | Advisory-only, calm, non-executing guidance | E6, E2 | Evidence identified | Unscored | Evidence incomplete |
| D7 Governance & policy discipline | Material decisions followed repo-native authority and risk discipline | E1, E8, E9 | Evidence identified | Unscored | Evidence incomplete |
| D8 UX & narrative integrity | Calm, non-gamified hierarchy and narrative integrity | E2, E10, E1 | Evidence identified | Unscored | Evidence incomplete |
| D9 Demand & learning validity | Credible demand learning for stability-first wallet under stated posture | E7 | Missing | Unscored | Not started |
| D10 Operational sustainability | Repeatable safe operation without exceptional founder intervention and without reliance upon undocumented founder knowledge | E8, E1, E2 | Evidence identified | Unscored | Evidence incomplete |

### 5.5 Primed domain records (`MVP-EVID-001`)

These records identify existing repo pointers and visible gaps. They are **not** institutional domain reviews. `reviewers` records the bounded priming operator only; it does not claim Founder, HedgrOps, product, legal, operational, or user-research review. Every pointer retains its originating scope and limitations under **§9**.

#### D1 — Stability & capital preservation

- `domain_id`: `D1`
- `domain_name`: Stability & capital preservation
- `claim_under_review`: The Class A MVP posture preserves and communicates stability and capital preservation above yield or growth.
- `authorized_execution_class`: Class A informational only.
- `evidence_category_ids`: `E1` — doctrine and repo authority define the stability-first claim; `E2` — UX doctrine defines trust-facing communication constraints; `E10` — repo guardrails reject yield-first, gamified, and speculative framing.
- `source_pointers`:
  - `docs/doctrine/hedgr-constitutional-charter.md` — constitutional doctrine source; does not prove user interpretation or shipped compliance by itself.
  - `docs/doctrine/hedgr-ux-constitution.md` — UX doctrine source; prescribes trust posture but is not observation evidence.
  - `docs/ops/HEDGR_STATUS.md` **§2**, **§6**, **§129** — repo-authority and merged-truth source; implementation history is not domain acceptance.
  - `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md` — accepted governance principle; expressly does not create a domain disposition.
- `source_classes`: Constitutional doctrine; UX doctrine; repo authority / merged implementation record; accepted governance ADR.
- `evidence_period`: Repo governance snapshot through 2026-07-13; freshness and cross-surface conformance have not been institutionally reviewed.
- `evidence_owner`: HedgrOps (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified during pointer reconstruction; no domain review has tested for implementation drift.
- `residual_risks`: No consolidated review yet proves stability-first posture across current user-facing surfaces or targeted-user interpretation.
- `revisit_conditions`: Start a separately authorized D1 review with current surface inventory and interpretation evidence.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D1, clear any gate, authorize implementation, or widen execution class.

#### D2 — Liquidity & withdrawal integrity

- `domain_id`: `D2`
- `domain_name`: Liquidity & withdrawal integrity
- `claim_under_review`: Withdrawal and liquidity communication is honest at Class A, while live reliability remains unclaimed until separately authorized Class B evidence exists.
- `authorized_execution_class`: Mixed boundary — Class A synthetic / informational claim only; Class B reliability claim is blocked and incomplete.
- `evidence_category_ids`: `E4` — synthetic withdrawal and liquidity communication boundaries; `E5` — Class B rail/custody dependencies remain scaffolds; `E8` — operational controls are defined as future evidence needs only.
- `source_pointers`:
  - `apps/frontend/__tests__/synthetic-withdrawal-journey.test.tsx` — hermetic technical contract evidence for a visibly synthetic surface; not user interpretation or live withdrawal evidence.
  - `docs/ops/HEDGR_STATUS.md` **§129** — Founder closeout records targeted-user interpretation evidence as not claimed.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LIQUIDITY_WITHDRAWAL_CONTROL_EVIDENCE_PACKAGE.md` — evidence-package skeleton; explicitly not evidence gathering, sufficiency, or withdrawal approval.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_PILOT_OPS_EVIDENCE_PACKAGE.md` — operational evidence scaffold; explicitly not pilot or customer-money authority.
- `source_classes`: Hermetic technical test; repo governance closeout; Class B evidence-planning scaffolds.
- `evidence_period`: Synthetic contract merged 2026-07-10 and closeout recorded 2026-07-11; no live or user-research evidence period exists.
- `evidence_owner`: Product / Operations (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified; synthetic completeness and live reliability are intentionally distinct claims.
- `residual_risks`: `FE-TRUST-002` targeted-user interpretation remains unclaimed; live liquidity, withdrawal reliability, provider evidence, and the Class B convergence gate remain open.
- `revisit_conditions`: Obtain separately authorized interpretation evidence and, for any Class B claim, governed operational/provider evidence plus convergence-gate review.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D2, clear G3 or any other gate, authorize withdrawals, or satisfy the Class B convergence gate.

#### D3 — Risk visibility & trust disclosure

- `domain_id`: `D3`
- `domain_name`: Risk visibility & trust disclosure
- `claim_under_review`: Class A surfaces make risk and trust boundaries legible without overstating custody, fees, protection, automation, or guarantees.
- `authorized_execution_class`: Class A informational only.
- `evidence_category_ids`: `E2` — trust-copy and disclosure contracts are the direct claim; `E1` — doctrine and repo authority bound what those contracts may claim.
- `source_pointers`:
  - `docs/doctrine/hedgr-ux-constitution.md` — canonical UX trust requirements; not observation evidence.
  - `apps/frontend/__tests__/trust.test.tsx` — hermetic technical trust-surface checks; not user interpretation evidence.
  - `apps/frontend/__tests__/engine-notices-and-mock-contract.test.ts` — technical notice/mock boundary checks; not regulatory certification.
  - `docs/brand/HEDGR_BRAND_QA_CHECKLIST.md` — governance review checklist; checklist presence does not prove compliance.
- `source_classes`: UX doctrine; hermetic technical tests; brand-governance review aid.
- `evidence_period`: Current repo snapshot through 2026-07-13; no consolidated disclosure review or targeted-user evidence period recorded.
- `evidence_owner`: Product / UX (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified during pointer reconstruction.
- `residual_risks`: No current cross-surface disclosure inventory, targeted-user comprehension review, custody/fee claim review, or regulatory review is recorded here.
- `revisit_conditions`: Authorize a bounded trust-disclosure review against current shipped surfaces and applicable qualified-review needs.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D3, clear G4 or any other gate, or certify legal, regulatory, custody, or fee claims.

#### D4 — Engine-aligned communication

- `domain_id`: `D4`
- `domain_name`: Engine-aligned communication
- `claim_under_review`: Class A Stability Engine communication remains informational and is not mistaken for accounting, ledger, allocation, or execution truth.
- `authorized_execution_class`: Class A informational only.
- `evidence_category_ids`: `E3` — engine copy and contract tests support the informational-communication claim; `E1` — ADRs and phase governance define the non-accounting / non-executing boundary.
- `source_pointers`:
  - `docs/decisions/0013-allocation-bands-informational-not-accounting.md` — accepted allocation-band boundary.
  - `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md` — accepted read-only boundary.
  - `docs/decisions/0015-stability-engine-is-the-system-center.md` — accepted engine-authority boundary.
  - `apps/frontend/__tests__/engine-allocation-bands-panel-copy-contract.test.tsx` and `apps/frontend/__tests__/engine-posture-context-contract.test.ts` — hermetic technical copy/contract checks; not user interpretation or accounting evidence.
  - `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md` — phase orientation only; expressly non-sequencing and non-executing.
- `source_classes`: Accepted architecture ADRs; hermetic technical tests; governance orientation artifact.
- `evidence_period`: Current ADR boundaries and repo tests through 2026-07-13; no targeted-user interpretation period recorded.
- `evidence_owner`: Engineering / Product (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified; later superseding ADR review has not been performed as part of this priming pass.
- `residual_risks`: No consolidated user-interpretation evidence proves that informational engine outputs are consistently understood as non-accounting and non-executing.
- `revisit_conditions`: Run a separately authorized current-surface contract and interpretation review against ADRs 0013–0015.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D4, clear G2 or any other gate, create ledger truth, or authorize engine execution.

#### D5 — Rails & custody integrity

- `domain_id`: `D5`
- `domain_name`: Rails & custody integrity
- `claim_under_review`: Rails, custody, conversion, settlement, and jurisdiction claims remain bounded to the authorized class and are not represented as ready without qualified evidence.
- `authorized_execution_class`: Mixed boundary — Class A governance description only; all Class B / Class C operational claims are blocked and incomplete.
- `evidence_category_ids`: `E5` — rail/custody evidence needs and source pointers; `E8` — operating-control evidence needs; `E9` — qualified legal/compliance evidence remains required.
- `source_pointers`:
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_EVIDENCE_REGISTRY.md` — non-authoritative evidence-state registry; row presence is not readiness.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RAIL_SETTLEMENT_FINALITY_EVIDENCE_PACKAGE.md` — evidence-package skeleton; not settlement or vendor approval.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_LEGAL_COMPLIANCE_EVIDENCE_PACKAGE.md` — qualified-review requirement scaffold; not legal advice or approval.
  - `docs/ops/governance/offramp/HEDGR_CLASS_B_OFFRAMP_PHILIPPINES_PHP_SOURCE_POINTER_CLASSIFICATION.md` — bounded source-pointer classification; not evidence acceptance, market selection, or provider approval.
  - `docs/ops/HEDGR_STATUS.md` **§6f.1** — Kenya counsel send remains `DEFER`; no legal reliance or counsel-send authority.
- `source_classes`: Class B evidence registry; evidence-planning scaffolds; source-pointer classification; repo governance decision.
- `evidence_period`: Repo source-pointer and scaffold snapshot through 2026-07-13; no qualified legal, vendor, provider, or live operational evidence period exists.
- `evidence_owner`: Operations / Legal (reference maintenance only; ownership is not legal review).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified; no market, provider, endpoint, rail, custody, or legal conclusion has been formed.
- `residual_risks`: Class B registry evidence remains incomplete; counsel send is deferred; convergence, provider, legal, operational, settlement, and custody evidence remain open.
- `revisit_conditions`: Separate Founder authorization for qualified review/evidence intake and subsequent governed domain review.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no legal, operational, or institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D5, clear G2/G3/G5 or any gate, send counsel materials, select a market/provider/rail/custodian, or authorize customer-money activity.

#### D6 — Advisory Copilot posture

- `domain_id`: `D6`
- `domain_name`: Advisory Copilot posture
- `claim_under_review`: Copilot guidance remains advisory, calm, non-directive, non-executing, and subordinate to engine and policy authority.
- `authorized_execution_class`: Class A informational only; no runtime authority expansion.
- `evidence_category_ids`: `E6` — advisory behavior and policy contracts support the Copilot claim; `E2` — calm/non-overclaiming UX boundaries support the trust-facing claim.
- `source_pointers`:
  - `docs/ops/governance/copilot/COPILOT_MVP_ADVISORY_LANE_DEFINITION_DRAFT.md` — completed documentation-only lane definition; explicitly not runtime or product-launch authority.
  - `apps/frontend/__tests__/copilot.policy.integration.test.ts` and `apps/frontend/__tests__/copilotResponses.test.ts` — hermetic technical behavior checks; not user interpretation, model-quality, or live-service evidence.
  - `docs/decisions/0015-stability-engine-is-the-system-center.md` — accepted subordination boundary; not Copilot acceptance evidence by itself.
- `source_classes`: Copilot governance artifact; hermetic technical tests; accepted architecture ADR.
- `evidence_period`: Current repo snapshot through 2026-07-13; no targeted-user interpretation or live-model evidence period recorded or authorized.
- `evidence_owner`: Product / Engineering (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified during pointer reconstruction.
- `residual_risks`: No consolidated advisory-behavior review, targeted-user interpretation evidence, or approved runtime-evidence scope is recorded.
- `revisit_conditions`: Authorize a bounded Class A Copilot evidence review; any runtime expansion requires separate doctrine/ADR/§7 authority.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D6, clear any gate, bind Copilot to live models, or authorize directive, policy, engine, ledger, or execution behavior.

#### D7 — Governance & policy discipline

- `domain_id`: `D7`
- `domain_name`: Governance & policy discipline
- `claim_under_review`: Material decisions and execution activation remain traceable, reversible where required, and controlled by repo-native authority.
- `authorized_execution_class`: Class A governance evaluation only; no execution-class widening.
- `evidence_category_ids`: `E1` — authority hierarchy, status, and ADR records support traceability; `E8` — operational governance/exception requirements are identified but not proven; `E9` — qualified-review boundaries remain explicit where required.
- `source_pointers`:
  - `AGENTS.md`, `.cursorrules`, and `.cursor/rules.md` — operator and doctrine controls; document presence is not proof of every execution decision.
  - `docs/ops/HEDGR_STATUS.md` **§6e–§7a**, **§129–§130** — canonical sequencing and decision history; mutable status is not automatic acceptance.
  - `docs/ops/runbook.md` — Solo QA / merge ritual; process guidance is not product readiness.
  - `docs/decisions/0023-governed-progress-under-uncertainty.md` and `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md` — accepted governance principles; non-executing.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_GOVERNANCE_OVERRIDE_EXCEPTION_AUTHORITY_EVIDENCE_PACKAGE.md` — evidence scaffold for future Class B exception authority; creates no override authority.
- `source_classes`: Repo authority; operator controls; merge-process guidance; accepted governance ADRs; Class B evidence scaffold.
- `evidence_period`: Governance snapshot through 2026-07-13; no full decision-sampling or policy-conformance audit period recorded.
- `evidence_owner`: HedgrOps (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified during pointer reconstruction; compliance across the full decision history has not been audited.
- `residual_risks`: No sampled governance/policy audit proves consistent activation, reversibility, stop-condition use, or exception handling across all material decisions.
- `revisit_conditions`: Authorize a bounded governance/policy conformance review with a defined decision sample and period.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D7, clear G0/G1/G6 or any gate, amend policy, create override authority, or activate work.

#### D8 — UX & narrative integrity

- `domain_id`: `D8`
- `domain_name`: UX & narrative integrity
- `claim_under_review`: The Class A experience remains calm, non-gamified, trust-first, and consistent with Total balance → Stability status → Allocation split.
- `authorized_execution_class`: Class A informational only.
- `evidence_category_ids`: `E2` — trust and disclosure surfaces support the narrative claim; `E10` — negative controls reject hype, gamification, and urgency; `E1` — UX doctrine and repo guardrails define the boundary.
- `source_pointers`:
  - `docs/doctrine/hedgr-ux-constitution.md` — canonical interaction doctrine; not user observation evidence.
  - `.cursorrules` **§IX** and `docs/brand/HEDGR_BRAND_QA_CHECKLIST.md` — UX/brand anti-drift controls; checklists do not prove shipped conformance.
  - `apps/frontend/__tests__/trust.test.tsx` — hermetic technical trust checks; not a full narrative or user-comprehension review.
  - `apps/frontend/__tests__/engine-trust-framing-denylist.ts` — test support for prohibited framing; not independent evidence or user research.
- `source_classes`: UX doctrine; repo UX/brand guardrails; hermetic technical tests.
- `evidence_period`: Current repo snapshot through 2026-07-13; no full current-surface audit or targeted-user interpretation period recorded.
- `evidence_owner`: Product / UX (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified during pointer reconstruction.
- `residual_risks`: No consolidated surface inventory or targeted-user review proves hierarchy, calmness, non-gamification, and narrative integrity across the MVP experience.
- `revisit_conditions`: Authorize a bounded UX/narrative audit against the current surface inventory and doctrine.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D8, clear G4/G7 or any gate, approve brand changes, or authorize product-surface expansion.

#### D9 — Demand & learning validity

- `domain_id`: `D9`
- `domain_name`: Demand & learning validity
- `claim_under_review`: Credible user evidence supports demand for a stability-first wallet under the tested trust and policy posture.
- `authorized_execution_class`: Class A research / learning only.
- `evidence_category_ids`: `E7` — the MVP specification defines the demand-learning need, while current repo records explicitly show the relevant interpretation evidence is absent.
- `source_pointers`:
  - `docs/doctrine/hedgr-mvp-project-specification.md` **§12.1** — product-intent success criterion; not demand evidence.
  - `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md` **§4** — states that demand is not proven or disproven by repo code alone; orientation only.
  - `docs/ops/HEDGR_STATUS.md` **§129** — records targeted-user interpretation evidence as not claimed and as a future exploration / MVP-evidence need.
  - `apps/frontend/__tests__/synthetic-withdrawal-journey.test.tsx` — synthetic technical contract only; explicitly not user-demand or interpretation evidence.
- `source_classes`: Product doctrine; governance orientation; repo governance residual record; hermetic technical test (negative boundary, not E7 proof).
- `evidence_period`: No demand or targeted-user learning evidence period is recorded; gap primed 2026-07-13.
- `evidence_owner`: Product / Research (reference maintenance only).
- `evidence_state`: Missing.
- `confidence`: Unscored.
- `conflicts`: None; absence is explicit and no positive or negative demand conclusion is drawn.
- `residual_risks`: No governed participant sample, research protocol, interpretation record, demand signal, or learning synthesis supports the claim.
- `revisit_conditions`: Separately authorize bounded user research with declared cohort, protocol, evidence period, and trust/policy posture.
- `disposition`: Not started.
- `reviewers`: Implementer — gap priming only; no user-research or institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept or reject D9, clear G5 or any gate, infer demand, or authorize research, growth, launch, or feature expansion.

#### D10 — Operational sustainability

- `domain_id`: `D10`
- `domain_name`: Operational sustainability
- `claim_under_review`: Hedgr can operate repeatedly and safely through documented procedures, monitoring, support, incident response, reconciliation, and recoverability without undocumented founder rescue.
- `authorized_execution_class`: Mixed boundary — Class A governance/process evidence may be referenced; Class B operational sustainability is blocked and incomplete.
- `evidence_category_ids`: `E8` — Class B operational evidence requirements and read-only bridge verification identify bounded controls; `E1` — repo governance records ownership and non-authorizing boundaries; `E2` — support/incident communication requirements remain evidence needs, not proven outcomes.
- `source_pointers`:
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_PILOT_OPS_EVIDENCE_PACKAGE.md` — evidence-package skeleton; not pilot approval or operational evidence sufficiency.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_RECONCILIATION_EVIDENCE_PACKAGE.md` — reconciliation evidence scaffold; not ledger/accounting truth or operational approval.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_SUPPORT_DISPUTE_EVIDENCE_PACKAGE.md` and `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_INCIDENT_RESPONSE_EVIDENCE_PACKAGE.md` — future support/incident evidence needs; no live-operation authority.
  - `docs/ops/governance/class-b/evidence/HEDGR_CLASS_B_STAGING_LIVE_STATE_SEPARATION_EVIDENCE_PACKAGE.md` — environment-boundary evidence scaffold; not staging/live approval.
  - `apps/bridge-worker/VERIFICATION.md` — bounded Class A read-only bridge verification; does not demonstrate MVP customer operations or Class B sustainability.
- `source_classes`: Class B operational evidence-planning scaffolds; bounded Class A technical/governance verification.
- `evidence_period`: Read-only bridge verification is current repo evidence through 2026-07-13; no pilot/live operational evidence period exists.
- `evidence_owner`: Operations (reference maintenance only).
- `evidence_state`: Evidence identified.
- `confidence`: Unscored.
- `conflicts`: None identified; documentation and bridge verification are intentionally not treated as proof of repeatable customer-money operations.
- `residual_risks`: Pilot operations, monitoring, reconciliation, support, incident response, recoverability, environment separation, and founder-independence evidence remain incomplete; the Class B convergence gate remains unsatisfied.
- `revisit_conditions`: Separately authorize operational evidence intake/review for the then-authorized execution class and evaluate convergence independently.
- `disposition`: Evidence incomplete.
- `reviewers`: Implementer — record priming only; no operational or institutional acceptance review commenced.
- `review_date`: 2026-07-13.
- `non_authorization_ack`: This record does not accept D10, clear G5/G6 or any gate, satisfy the Class B convergence gate, approve environments or operations, or authorize customer-money activity.

---

## 6. Evidence State Legend

| Evidence state | Meaning | Operator note |
|----------------|---------|---------------|
| Missing | No material evidence identified | Domain remains open |
| Question framed | Need defined; evidence absent | Scoping only |
| Evidence identified | Pointers exist; not yet reviewed | Not sufficiency |
| Under review | Active institutional review | Not acceptance |
| Sufficient for planning reference | May inform planning with stated limits | Planning only |
| Sufficient for MVP acceptance review | May support a domain disposition under this register | Still requires disposition + founder acceptance chain |
| Rejected / insufficient | Fails the claim | Gap remains open |
| Stale / requires refresh | Past review expectation, expired `evidence_period`, or changed conditions | No silent reuse |
| Conflicting / requires escalation | Material conflict across sources | Escalate; do not infer |

Evidence state is maturity only. It does not authorize implementation, readiness, or customer-money activity (**§1**, **§11**).

---

## 7. Confidence Model

Confidence scores the **quality of support for a stated claim**. It does not score desire to ship.

| Level | Meaning | Allowed use | Forbidden use |
|-------|---------|-------------|---------------|
| **Unscored** | No institutional confidence judgment yet | Default | Any acceptance rhetoric |
| **Low** | Weak, single-class, or highly provisional support | Flag uncertainty; block clean accept | Declare MVP done |
| **Moderate** | Multiple aligned sources with visible residual risk | May support `Accepted with bounded residual risk` when gates and residual-risk controls allow | Hide residual risk; auto-accept |
| **High** | Strong, multi-class, fresh, non-conflicting support for the stated execution class | May support `Accepted` for that claim after review | Imply unauthorized execution-class proof; auto-accept |
| **Insufficient / contested** | Support fails or conflicts | Keep domain open / escalate | Narrative override |

### Confidence rules

1. Confidence may not exceed what the **authorized execution class** can honestly support.
2. High confidence in Class A communication does not create high confidence in Class B rail reliability.
3. Founder conviction alone cannot raise confidence above **Low** without corroborating source classes appropriate to the claim.
4. Legal/regulatory claims that require qualified review cannot be scored **High** on repo prose alone.
5. Confidence changes must update `review_date`, `evidence_period` where relevant, `residual_risks`, and `revisit_conditions`.

### Confidence boundary clarification

**Confidence informs disposition. Confidence does not automatically determine disposition.**

Examples:

- A **Moderate** confidence assessment may still fail acceptance if the affected trust surface requires stronger evidence.
- A **High** confidence score still requires recorded disposition, gate review where applicable, and the Acceptance Framework acceptance-authority chain (evidence → governance review → founder acceptance).
- Confidence never substitutes for missing `evidence_period`, `evidence_owner`, or residual-risk controls.

---

## 8. Institutional Review Responsibilities

| Role | Responsibility in MVP acceptance evidence review | Must not |
|------|--------------------------------------------------|----------|
| **Founder** | Final institutional acceptance judgment; records deferrals and residual-risk acceptances; acknowledges material residual risk under **§5.2.1** | Treat this register as self-executing approval or automatic acceptance from evidence alone |
| **HedgrOps** | Doctrine continuity, gate integrity, conflict escalation, anti-drift review | Silently reconcile Charter / ADR conflicts |
| **Product / UX reviewer** | Domains D1, D3, D4, D6, D8 narrative and interaction honesty | Convert critique into execution authority |
| **Engineering / Verifier** | Technical boundary checks, hermetic/CI honesty, engine non-overclaim | Bypass `HEDGR_STATUS` activation rules |
| **Ops / Pilot reviewer** (when relevant) | Domains D2, D5, D10 operational sustainability and control evidence; may support D7 where ops controls evidence governance discipline | Imply pilot go-live from incomplete evidence |
| **Legal / compliance reviewer** (when required) | Qualified review for claims that require it | Be invented by non-qualified repo prose |
| **Codex / Cursor (supporting operators)** | Reconstruction, verification, critique, drafting support under declared role/mode | Create approval by output presence |

`evidence_owner` is operational maintenance ownership only. It does not replace reviewer roles above and does not confer acceptance or implementation authority.

### Review minimums

- Every domain disposition other than `Not started` requires at least one named reviewer role and date.
- `Accepted` or `Accepted with bounded residual risk` for D2 / D5 claims that imply customer-money paths requires explicit execution-class bounds and, where doctrine requires, qualified review pointers.
- `Accepted with bounded residual risk` requires all **§5.2.1** fields; material residual risk requires founder acknowledgement.
- Gate **G0** and **G1** clearance requires HedgrOps (or Founder) acknowledgment that authority hierarchy is unchanged.
- Evidence sufficiency for a domain supports governance review only; it does not automatically create institutional acceptance (Acceptance Framework **§10**).
- Supporting operator output remains non-authoritative until absorbed through the governed review chain.

---

## 9. Relationship to Lane Evidence Programs

This MVP register is an **institutional overlay**, not a replacement registry.

| Lane program | Relationship |
|--------------|--------------|
| Class B evidence registry / packages | May supply E5 / E8 / E9 support for relevant MVP domains |
| Off-ramp governance & source-pointer artifacts | May inform D2 / D5 questions |
| Stability Engine trust-surface evidence | May inform D4; remains bounded by read-only / informational ADRs unless superseded |
| Copilot governance artifacts | May inform D6; advisory posture unchanged by MVP register rows |
| MVP phase alignment readout | Explains phase-appropriate progress; does not record acceptance dispositions |

### Cross-link boundary rule

Cross-linking is encouraged for navigability. Cross-linking is **not** inheritance of authority.

When MVP acceptance review reuses lane evidence, the cross-link must preserve and surface:

1. **original scope** of the source artifact
2. **execution class** assumed by that source
3. **review date** (and `evidence_period` where applicable)
4. **limitations** and non-claims stated by the source
5. **originating governance context** (lane, ticket class, and non-authorization boundary)

Reused evidence may not silently expand from planning/source-pointer posture into acceptance, readiness, market selection, provider approval, ADR authority, or implementation authority.

---

## 10. Verification Structure (Review Procedure)

When an MVP acceptance review is separately authorized as a documentation/governance review:

1. Confirm authority posture: this register + Acceptance Framework remain non-executing.
2. Restate the claim and authorized execution class for each domain under review.
3. Attach source pointers, source classes, `evidence_period`, and `evidence_owner`; refuse unsupported citations.
4. Apply Principle 11 when one artifact maps to multiple categories.
5. Assign evidence state and confidence without inferring missing proof.
6. Record disposition; if provisional, complete **§5.2.1** residual-risk controls.
7. Evaluate gates G0–G7 against domain dispositions using Acceptance Framework **§6**.
8. Apply Acceptance Framework completion rule and acceptance-authority chain (**§10** there).
9. Record non-authorization acknowledgment in the review artifact.
10. If implementation is later desired, require normal `HEDGR_STATUS.md` **§7** / **§7a** activation.

---

## 11. Non-Authorization Statement

This document is governance-only.

It does **not** approve, validate, accept, or certify evidence by template presence, and does **not** approve, activate, sequence, or implement:

- Class A / B / C execution beyond currently authorized posture
- deposits, withdrawals, custody, rails, or stablecoin conversion
- ledger truth, accounting truth, or fund movement
- Copilot execution authority
- ADR drafting, ADR acceptance, or ADR amendment
- evidence intake or external engagement by itself
- customer-money activity
- ticket activation under `HEDGR_STATUS.md` **§7** / **§7a**

Any future evidence intake, acceptance recording, or implementation work requires separate repo-governed authorization through the normal authority chain.

---

## 12. Rollback

Documentation removal only. No runtime impact. No migration required.
