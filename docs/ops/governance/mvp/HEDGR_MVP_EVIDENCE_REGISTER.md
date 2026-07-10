# Hedgr MVP Evidence Register

**Status:** Governance evidence model; documentation-only  
**Authority class:** Institutional evidence recording structure (non-executing)  
**Visibility:** Internal governance  
**Date:** 2026-07-10

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
   Time-sensitive claims require review dates or explicit staleness handling.

9. **Lane evidence remains lane evidence**  
   Class B / off-ramp / Copilot / engine trust evidence may support MVP domains, but those programs retain their own non-authorization boundaries.

10. **This register does not sequence work**  
    It supports acceptance review. It does not create §7 order, ADR order, or implementation backlog.

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
| E8 | **Operational / pilot-control evidence** | Support, reconciliation, incident, eligibility, staging/live separation evidence where relevant | Domains D2, D5, D7; Gates G5–G6 | Class B readiness by row presence |
| E9 | **Legal / compliance review evidence** | Qualified counsel or compliance review outputs where required by domain risk | Domains D5, D7; Gates G0, G5 | Silent legal reliance without stated scope |
| E10 | **Negative / exclusion evidence** | Proof that gamification, yield-first framing, or out-of-scope expansion were rejected | Domains D1, D8; Gate G7 | Permission to add those patterns later without review |

Category membership is descriptive. It does not create intake authority.

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
| `evidence_state` | Yes | From **§6** |
| `confidence` | Yes | From **§7** |
| `conflicts` | Yes | None, or explicit conflict description |
| `residual_risks` | Yes | What remains unresolved if disposition is not a clean accept |
| `revisit_conditions` | Yes if provisional | What would force re-review |
| `disposition` | Yes | From **§5.2** |
| `reviewers` | Yes | Roles/names per **§8** |
| `review_date` | Yes | ISO date of institutional review |
| `non_authorization_ack` | Yes | Explicit acknowledgment that disposition ≠ implementation authority |

### 5.2 Domain dispositions

| Disposition | Meaning | Boundary |
|-------------|---------|----------|
| **Not started** | No institutional review yet | Default; not a gap waiver |
| **Evidence incomplete** | Need is known; evidence insufficient | Blocks acceptance for that domain |
| **Under review** | Sources are being evaluated | Not an accept |
| **Accepted** | Evidence sufficient for the stated claim at the stated execution class | Still not §7 activation |
| **Accepted with bounded residual risk** | Accepted provisionally; residual risk and revisit conditions recorded | Provisional ≠ permanent policy |
| **Not applicable** | Domain claim does not apply to current MVP acceptance frame; rationale required | Cannot hide a required constitutional domain |
| **Rejected / insufficient** | Evidence fails the claim | Domain remains open |
| **Conflicting / escalated** | Sources conflict; governed escalation required | No inference-based close |

### 5.3 Gate record schema

Gate records (G0–G7) should capture:

- gate ID and meaning
- linked domain dispositions
- clearance state: `Open` | `Cleared` | `Deferred with founder-recorded rationale`
- residual risk / revisit condition when deferred
- reviewer identities and date
- explicit non-authorization acknowledgment

### 5.4 Working register skeleton

The table below is the initial tracking skeleton. All domains begin as **Not started**. Row presence is not evidence.

| Domain | Claim focus | Primary categories | Evidence state | Confidence | Disposition |
|--------|-------------|--------------------|----------------|------------|-------------|
| D1 Stability & capital preservation | Stability-first posture above yield/growth | E1, E2, E10 | Missing | Unscored | Not started |
| D2 Liquidity & withdrawal integrity | Honest liquidity / withdrawal reliability at authorized class | E4, E5, E8 | Missing | Unscored | Not started |
| D3 Risk visibility & trust disclosure | Risk and trust claims are legible and non-overclaiming | E2, E1 | Missing | Unscored | Not started |
| D4 Engine-aligned communication | Informational engine UX is not mistaken for accounting/execution truth | E3, E1 | Missing | Unscored | Not started |
| D5 Rails & custody integrity | Rails/custody/conversion claims match authorized class | E5, E8, E9 | Missing | Unscored | Not started |
| D6 Advisory Copilot posture | Advisory-only, calm, non-executing guidance | E6, E2 | Missing | Unscored | Not started |
| D7 Governance & policy discipline | Material decisions followed repo-native authority and risk discipline | E1, E8, E9 | Missing | Unscored | Not started |
| D8 UX & narrative integrity | Calm, non-gamified hierarchy and narrative integrity | E2, E10, E1 | Missing | Unscored | Not started |
| D9 Demand & learning validity | Credible demand learning for stability-first wallet under stated posture | E7 | Missing | Unscored | Not started |
| D10 Operational sustainability | Repeatable safe operation without exceptional founder intervention | E8, E1, E2 | Missing | Unscored | Not started |

---

## 6. Evidence State Legend

| Evidence state | Meaning | Non-authorization boundary |
|----------------|---------|----------------------------|
| Missing | No material evidence identified | Does not imply the domain is unimportant |
| Question framed | Need defined; evidence absent | Not gathering authority |
| Evidence identified | Pointers exist; not yet reviewed | Not sufficiency |
| Under review | Active institutional review | Not acceptance |
| Sufficient for planning reference | May inform planning with stated limits | Not ADR/implementation authority |
| Sufficient for MVP acceptance review | May support a domain disposition under this register | Not ticket activation |
| Rejected / insufficient | Fails the claim | Gap remains open |
| Stale / requires refresh | Past review expectation or changed conditions | No silent reuse |
| Conflicting / requires escalation | Material conflict across sources | No inferred reconciliation |

No evidence state authorizes implementation, Class B/C readiness, live operations, or customer fund movement.

---

## 7. Confidence Model

Confidence scores the **quality of support for a stated claim**. It does not score desire to ship.

| Level | Meaning | Allowed use | Forbidden use |
|-------|---------|-------------|---------------|
| **Unscored** | No institutional confidence judgment yet | Default | Any acceptance rhetoric |
| **Low** | Weak, single-class, or highly provisional support | Flag uncertainty; block clean accept | Declare MVP done |
| **Moderate** | Multiple aligned sources with visible residual risk | Support `Accepted with bounded residual risk` when gates allow | Hide residual risk |
| **High** | Strong, multi-class, fresh, non-conflicting support for the stated execution class | Support `Accepted` for that claim | Imply unauthorized execution-class proof |
| **Insufficient / contested** | Support fails or conflicts | Keep domain open / escalate | Narrative override |

### Confidence rules

1. Confidence may not exceed what the **authorized execution class** can honestly support.
2. High confidence in Class A communication does not create high confidence in Class B rail reliability.
3. Founder conviction alone cannot raise confidence above **Low** without corroborating source classes appropriate to the claim.
4. Legal/regulatory claims that require qualified review cannot be scored **High** on repo prose alone.
5. Confidence changes must update `review_date`, `residual_risks`, and `revisit_conditions`.

---

## 8. Institutional Review Responsibilities

| Role | Responsibility in MVP acceptance evidence review | Must not |
|------|--------------------------------------------------|----------|
| **Founder** | Final institutional acceptance judgment; records deferrals and residual-risk acceptances | Treat this register as self-executing approval or automatic acceptance from evidence alone |
| **HedgrOps** | Doctrine continuity, gate integrity, conflict escalation, anti-drift review | Silently reconcile Charter / ADR conflicts |
| **Product / UX reviewer** | Domains D1, D3, D4, D6, D8 narrative and interaction honesty | Convert critique into execution authority |
| **Engineering / Verifier** | Technical boundary checks, hermetic/CI honesty, engine non-overclaim | Bypass `HEDGR_STATUS` activation rules |
| **Ops / Pilot reviewer** (when relevant) | Domains D2, D5, D10 operational sustainability and control evidence; may support D7 where ops controls evidence governance discipline | Imply pilot go-live from incomplete evidence |
| **Legal / compliance reviewer** (when required) | Qualified review for claims that require it | Be invented by non-qualified repo prose |
| **Codex / Cursor (supporting operators)** | Reconstruction, verification, critique, drafting support under declared role/mode | Create approval by output presence |

### Review minimums

- Every domain disposition other than `Not started` requires at least one named reviewer role and date.
- `Accepted` or `Accepted with bounded residual risk` for D2 / D5 claims that imply customer-money paths requires explicit execution-class bounds and, where doctrine requires, qualified review pointers.
- Gate **G0** and **G1** clearance requires HedgrOps (or Founder) acknowledgment that authority hierarchy is unchanged.
- Evidence sufficiency for a domain supports governance review only; it does not automatically create institutional acceptance (see Acceptance Framework **§10**).
- Supporting operator output remains non-authoritative until absorbed through the governed review chain.

---

## 9. Relationship to Lane Evidence Programs

This MVP register is an **institutional overlay**, not a replacement registry.

| Lane program | Relationship |
|--------------|--------------|
| Class B evidence registry / packages | May supply E5 / E8 / E9 support for relevant MVP domains; retain their own non-authorization boundaries |
| Off-ramp governance & source-pointer artifacts | May inform D2 / D5 questions; do not become market or provider approval |
| Stability Engine trust-surface evidence | May inform D4; remains bounded by read-only / informational ADRs unless superseded |
| Copilot governance artifacts | May inform D6; advisory posture unchanged by MVP register rows |
| MVP phase alignment readout | Explains phase-appropriate progress; does not record acceptance dispositions |

Cross-linking is encouraged. Cross-linking is not inheritance of authority.

---

## 10. Verification Structure (Review Procedure)

When an MVP acceptance review is separately authorized as a documentation/governance review:

1. Confirm authority posture: this register + Acceptance Framework remain non-executing.
2. Restate the claim and authorized execution class for each domain under review.
3. Attach source pointers and source classes; refuse unsupported citations.
4. Assign evidence state and confidence without inferring missing proof.
5. Record disposition, residual risks, and revisit conditions.
6. Evaluate gates G0–G7 against domain dispositions.
7. Apply Acceptance Framework completion rule.
8. Record explicit non-authorization acknowledgment in the review artifact.
9. If implementation is later desired, require normal `HEDGR_STATUS.md` **§7** / **§7a** activation — acceptance review does not substitute for it.

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
