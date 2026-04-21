# HEDGR RETAIL UI HEADER REFINEMENT PHASE 3 DECISION NOTE

Status: Accepted (paper centerline only)  
Decision Type: UX/Trust  
Strategic Horizon: Short-term (prototype-route refinement lane)  
Visibility: Internal  
Reversibility: Reversible  
Authority: Non-sequencing, non-implementation  
Last updated: 2026-04-20

---

## 1. Purpose

This note records the current governed paper decision at the end of Header Refinement Phase 3 in the Hedgr retail UI lane.

It exists to freeze the current paper centerline so subsequent critique or prototype-only work does not reopen already-resolved header questions by drift.

This is not a shipping decision.

This is not an implementation authorization.

This is not a repo-authoritative execution change.

---

## 2. Authority boundary

- Repo-native authority remains binding.
- `HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, and active repo governance remain the execution authority layer.
- This note does not authorize implementation.
- This note does not authorize shipped-route edits.
- This note does not widen execution or design authority.
- This note records a bounded refinement decision only.

---

## 3. Problem / trigger

Following the earlier narrowing of the retail direction into the money-first shell, the remaining header problem was no longer structural selection.

The active problem became one of refinement:

- how the upper shell should name money
- how trust should be phrased and placed
- how actions should relate to the balance anchor
- how the first body section should be named
- how to tighten the header without drifting back into portfolio, monitoring, or crypto-dashboard semantics

Phase 3 was initiated to resolve those issues through subtraction, wording pressure-tests, and upper-shell micro-layout validation.

---

## 4. Decision

For the current paper centerline, Hedgr will retain the existing money-first shell and treat the following as the accepted Phase 3 header direction for further critique and prototype-only refinement:

- the balance remains the unmistakable primary anchor of the upper shell
- portfolio-coded header language is rejected for the current direction
- trust language remains visible, calm, human, and attached to the money anchor
- `Monitoring` is rejected as a lead primary trust state
- actions move closer to the money anchor, but remain clearly secondary
- `Recent activity` is retained as the current centerline for the first body section below the header
- Family C remains visible as the governed subordinate trust layer and is not elevated into the primary identity of the header
- the preferred upper-shell arrangement remains **Variant A — Tight money-anchor cluster**

This decision is a paper-centerline freeze only.

It exists to preserve refinement discipline for the next bounded pass.

---

## 5. Rationale

### 5.1 Why this direction

This direction best preserves the money-first shell that has already emerged as the governed base direction for the retail surface.

It also improves the header through tightening rather than structural reinvention.

That makes it the strongest fit for the current refinement phase.

### 5.2 Why balance-first remains correct

The product reads most trustworthily when money is the first thing the user sees and understands.

Once the balance loses primacy, the shell begins to drift toward portfolio tracking, monitoring, or utility-wallet behavior.

### 5.3 Why calmer trust phrasing is required

Hedgr’s trust layer is important, but it becomes counterproductive when phrased like system surveillance, operational instrumentation, or generic reassurance copy.

The strongest trust posture is calm, attached, visible, and non-promissory.

### 5.4 Why action proximity was adjusted but bounded

Actions needed to move closer to the balance anchor to improve continuity and everyday-money readability.

But the layout micro-test showed that action proximity quickly becomes harmful when it starts to rival the balance as the primary screen read.

### 5.5 Why `Recent activity` is retained

`Recent activity` produced the most familiar and governed read for the first content block below the header.

It avoids the clipped ambiguity of `Recent` and the overly generic flatness of `Activity`, while also avoiding system-monitoring language.

---

## 6. What this decision does not change

This decision does not reopen or alter the following governed positions:

- the money-first shell remains the active base direction
- earn-first / APY-first / yield-led framing remains deprioritized
- Family C remains the trust-layer family, subordinate to the money anchor
- the retail surface should not drift toward portfolio-dashboard posture
- the retail surface should not drift toward system-monitoring posture
- the retail surface should not drift toward crypto-dashboard visual logic

This decision also does not authorize:

- implementation work
- shipped-route modifications
- CTA redesign
- shell redesign
- Family C redesign
- backend, engine, or accounting-truth implications

---

## 7. Assumptions

This paper decision assumes:

- the governed refinement lane remains active
- subsequent work remains bounded to critique, naming, hierarchy, and prototype-only validation unless separately authorized
- no repo-native authority artifact overrides this direction in the meantime
- the product still benefits more from subtraction than from additional conceptual layering at the header level

---

## 8. Risks / trade-offs

### 8.1 Risk — trust flattening

In reducing system-heavy narration, the trust layer could become too generic and lose Hedgr’s distinct reassurance signature.

### 8.2 Risk — action creep

Moving actions closer to the balance improves continuity, but creates a recurring risk that future passes over-promote action and weaken calmness.

### 8.3 Risk — premature freeze interpretation

Because this note freezes a paper centerline, it may be misread as design finality or implementation readiness when it is neither.

### 8.4 Trade-off accepted

This decision accepts slightly less expressive or exploratory header variation in exchange for stronger governance discipline and a clearer refinement path.

---

## 9. Reversibility

Reversible.

This decision is a paper refinement freeze, not a hard implementation commitment.

It can be revisited if a later governed artifact produces clear evidence that the current centerline weakens trust, clarity, or money-first readability.

---

## 10. Revisit / kill criteria

Revisit this decision if any of the following occur:

- a later prototype-only validation shows that the current centerline still reads too much like portfolio management
- trust phrasing becomes too generic to carry Hedgr’s trust signature
- action proximity consistently weakens calmness or makes the header feel utility-wallet-led
- a repo-native governance artifact changes the refinement boundary or authority posture
- a better bounded alternative emerges without reopening the broader shell direction

Kill this paper centerline if a later governed readout shows that it materially fails the money-first, calm-trust, and subordinate-action criteria.

---

## 11. Strategic pillar alignment

### Supports

- **Security & Trust** — trust remains visible without overclaiming or system theater
- **Simplicity & UX** — header language becomes more familiar, tighter, and easier to read
- **Localized Go-to-Market** — everyday-money framing remains more legible than crypto or portfolio language
- **Scalability** — refinement discipline reduces unnecessary divergence before implementation authorization

### Tensions

- There is minor tension with expressive brand differentiation if the trust layer becomes too restrained.
- This tension is currently acceptable because the stronger present need is clarity, calmness, and category correctness.

---

## 12. Inputs / supporting artifacts

Primary supporting artifacts:

- `HEDGR_RETAIL_UI_HEADER_REFINEMENT_BRIEF.md`
- `HEDGR_RETAIL_UI_HEADER_COPY_COMPARISON.md`
- `HEDGR_RETAIL_UI_HEADER_LAYOUT_MICRO_TEST.md`
- `HEDGR_RETAIL_UI_HEADER_LAYOUT_MICRO_TEST_READOUT.md`
- `HEDGR_RETAIL_UI_HEADER_REFINEMENT_PHASE_3_READOUT.md`

Supporting context:

- `HEDGR_RETAIL_UI_IMPLEMENTATION_SPIKE_READOUT.md`
- `HEDGR_RETAIL_UI_FIXTURE_EVIDENCE_READOUT_2026-04-20.md`
- `HEDGR_RETAIL_UI_ALLOCATION_FAMILY_C_FIXTURE_TRAITS_NOTE.md`

---

## 13. Working conclusion

Phase 3 is now sufficiently resolved to freeze a paper centerline.

The accepted current read is:

**keep the money-first shell intact, keep the balance unmistakably first, keep trust calm and attached, move actions closer without letting them become primary, retain `Recent activity`, and keep Family C visible but subordinate.**

This note should be used to preserve refinement discipline until or unless a later governed artifact creates a legitimate reason to revisit the decision.
