# HEDGR RETAIL UI C3 IMPLEMENTATION SPIKE BRIEF

Status: Prototype spike only  
Authority: Non-sequencing, non-production  
Scope: Frontend-only implementation spike for bounded C3 retail dashboard validation  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines the scope and constraints for a frontend-only implementation spike of the current Hedgr retail dashboard refinement baseline.

The spike exists to:

1. validate whether the current **C3 refinement posture** holds up in actual interface form
2. generate reviewable visual artefacts for critique
3. test whether stronger **Actions / Activity separation** reduces perceived congestion
4. test whether alternate **disclosure labels** improve clarity and tone
5. expose issues that paper critique alone cannot surface

This spike does **not**:

- authorize production implementation
- approve a product direction
- create sequencing authority
- override `docs/ops/HEDGR_STATUS.md`
- function as an ADR, roadmap commitment, or backlog authorization

This is a constrained validation exercise only.

---

## 2. Authority boundary

This spike must be interpreted under current repo truth:

1. Stability Engine retail presentation remains read-only and informational
2. allocation remains informational, not accounting truth
3. no part of the spike may imply fund movement, autonomous reallocation, or hidden operational authority
4. Activity-related presentation remains bounded and does not imply approved IA expansion unless later named in `HEDGR_STATUS.md`
5. any artefact produced by this spike is exploratory only and must not be treated as implementation approval

This is a prototype route exercise, not product execution.

---

## 3. Inputs

This brief should be read alongside:

- `HEDGR_RETAIL_UI_EXPLORATION_SYNTHESIS.md`
- `HEDGR_RETAIL_UI_PAPER_EXPLORATION_MATRIX.md`
- `HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md`
- `HEDGR_RETAIL_UI_LOW_FIDELITY_WIRE_DESCRIPTIONS.md`
- `HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`
- `HEDGR_RETAIL_UI_FIRST_PASS_CRITIQUE_READOUT.md`
- `HEDGR_RETAIL_UI_SECOND_PASS_CRITIQUE_BRIEF.md`
- `HEDGR_RETAIL_UI_CONCEPT_C_VARIANT_MATRIX.md`
- `HEDGR_RETAIL_UI_SECOND_PASS_VARIANT_SCORE_RUN.md`
- `HEDGR_RETAIL_UI_C3_REFINEMENT_BRIEF.md`
- `HEDGR_RETAIL_UI_C3_REFINEMENT_NOTES.md`

The immediate implementation anchor is the current C3 refinement posture with C4 carried as a companion semantic thread.

---

## 4. Why a spike is needed

The current exploration stack is strong at the paper level, but some assertions remain theoretical until exercised in actual UI composition.

A prototype spike is needed to test whether:

- C3 still reads clearly once real spacing and visual density appear
- Actions / Activity separation actually reduces congestion in practice
- trust detail can remain visible without crowding the upper reading path
- disclosure label alternatives feel calmer or clearer in interface context
- the screen feels like protected money rather than either a crypto dashboard or a generic finance app

The purpose of the spike is validation, not productization.

---

## 5. Spike objective

The objective of the spike is:

**Build a bounded, frontend-only prototype route that renders a small set of C3-centered dashboard variants using mock data, so the team can review actual visual artefacts against the current critique posture.**

This means the spike should optimize for:

- fast reviewability
- clean comparison
- structural truthfulness
- low implementation risk
- easy rollback

Not for:

- production readiness
- backend realism
- logic completeness
- feature expansion
- visual polish for its own sake

---

## 6. Spike scope

The spike should remain tightly bounded.

### In scope

- one isolated prototype route
- mock data only
- one dashboard screen only
- three review variants
- static or minimally interactive comparison affordance
- compact review captions for each variant

### Out of scope

- backend integration
- persistence
- live engine data
- wallet or transaction logic
- broader IA changes
- new navigation surfaces
- production rollout plumbing
- analytics
- acceptance criteria for engineering delivery

This is not a shipping surface.

---

## 7. Variants to build

The spike should render exactly three review variants.

### 7.1 Control

Purpose:
- provide a comparison anchor close to the current centerline interpretation

Structure:
- Portfolio Value
- Stability Status
- Primary Actions
- Activity / Money Reality
- Allocation / Trust Detail
- Disclosure entry

### 7.2 Variant A — C3-R2

Purpose:
- test stronger **Actions / Activity separation**

Structure:
- preserve the same zone order as C3
- increase visual and semantic separation between Actions and Activity
- do not add explanatory content to solve congestion

### 7.3 Variant B — C3-R2 + C4

Purpose:
- test the same structural posture as Variant A
- add alternate disclosure-label treatment only

Structure:
- same as Variant A
- disclosure entry uses calmer bounded label alternatives for critique

This is a semantic companion test, not a structural branch.

---

## 8. Non-negotiable UI rules

Every spike variant must preserve the following:

1. money-first hierarchy
2. Portfolio Value as the primary anchor
3. Stability Status immediately visible beneath or near the anchor
4. Allocation / Trust Detail visible but secondary
5. Activity bounded and light
6. disclosure entry calm and optional
7. no APY-first framing
8. no score language
9. no crypto-native metaphors
10. no gamified language or behavior
11. no copy implying executed movement or agentic system behavior

These are doctrine constraints, not style preferences.

---

## 9. Prototype behavior constraints

The spike must remain obviously non-production.

Required constraints:

- mock data only
- no persistence
- no backend calls
- no actual action execution
- no hidden transactional state
- no fake precision that implies real engine truth
- no interactive behavior that suggests real money movement

Allowed behavior should be minimal and bounded, such as:

- static rendering
- local-only tab or segment switching
- variant toggles
- disclosure open/close if clearly prototype-only and non-semantic

The spike should help people see structure, not simulate the product.

---

## 10. Visual artefact requirements

Each variant should include:

- the full bounded dashboard stack
- readable zone separation
- enough fidelity to judge congestion and hierarchy
- a compact review caption stating:
  - variant name
  - what is being tested
  - main risk
  - disclosure label used, if applicable

The page itself should also include a clear top-level prototype banner such as:

**Exploratory prototype — mock data only — not production behavior**

This banner is required.

---

## 11. Isolation and rollback expectations

The spike should be implemented so that it is easy to review and easy to remove.

Preferred posture:

- isolated route only
- isolated mock data
- minimal prototype-only components
- minimal contamination of production surfaces
- low rollback cost

The spike should not quietly reshape live product architecture.

---

## 12. Review questions

The spike should be evaluated against a small fixed set of review questions:

1. Which variant feels most like real money first?
2. Which variant keeps protection truth visible enough?
3. Which variant feels least congested?
4. Which variant keeps Activity most bounded without becoming useless?
5. Which disclosure label feels calmest and clearest?
6. Which variant feels most like Hedgr rather than a generic finance screen?

These questions are for critique only, not automatic selection logic.

---

## 13. Expected output of the spike

A successful spike should produce:

1. a reviewable isolated prototype route
2. three visually comparable variants
3. clearer evidence on whether C3 holds up in actual UI form
4. clearer evidence on whether C3-R2 separation improves the reading path
5. clearer evidence on whether C4 label changes improve disclosure tone
6. a basis for a follow-up critique readout

The spike is successful if it improves judgment.

It is not successful merely because it looks polished.

---

## 14. Risks to watch during implementation

The main risks during the spike are:

### 14.1 Silent productization
Prototype choices begin to harden into implied product decisions.

### 14.2 Scope creep
Additional surfaces, blocks, or semantics are added “because it’s already in code.”

### 14.3 Over-explaining congestion away
Too much explanatory content is used instead of order and separation.

### 14.4 False realism
The prototype implies real engine behavior, precise system status, or actual operational logic.

### 14.5 Over-polish
The artefact becomes visually persuasive before the structural questions are actually resolved.

These are failure modes, not progress signals.

---

## 15. Suggested implementation posture

The cleanest implementation posture is:

- one isolated prototype route
- three variants on one page or under a simple local switcher
- shared mock data
- no production coupling
- minimal prototype-only code
- captions that make the test intent explicit

The fastest path to insight is clean comparison, not elaborate build-out.

---

## 16. Closing position

This spike is not the start of implementation.

It is the bridge between paper critique and visible interface truth.

The goal is to test whether the strongest current centerline still holds when turned into an actual screen.

The right spike outcome is not more momentum.

It is more certainty:

- about hierarchy
- about separation
- about trust-detail weight
- about activity restraint
- about disclosure tone

Hedgr should continue moving toward protected money that feels calm, legible, and structurally honest.