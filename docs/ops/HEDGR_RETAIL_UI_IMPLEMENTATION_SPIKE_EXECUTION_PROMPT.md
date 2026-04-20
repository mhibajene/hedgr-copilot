# HEDGR RETAIL UI IMPLEMENTATION SPIKE EXECUTION PROMPT

Status: Execution prompt only  
Authority: Cursor execution guidance for a bounded spike; not shipping approval  
Scope: Prompt for frontend implementation of the governed retail UI spike  
Last updated: 2026-04-20

---

## 1. Purpose

This document provides the Cursor-ready execution prompt for the bounded retail UI implementation spike.

The refinement lane has already narrowed enough for spike execution planning. This prompt exists to keep implementation aligned with the governed direction and bounded spike brief. It is not shipping approval. Nothing in this document authorizes widening the spike beyond the bounded brief.

---

## 2. Authority boundary

`HEDGR_STATUS.md` and `AGENTS.md` remain binding.

The implementation spike brief remains the governing planning artifact. This execution prompt is subordinate to repo-native authority, including referenced ADRs and rule stacks. Current read-only and informational posture remains unchanged. No outcome from this prompt is product approval.

---

## 3. Spike direction to implement

- Implement a money-first retail home / primary money shell.
- Keep a balance-led primary anchor and calmer, coherent, outcome-first hierarchy.
- Keep Family C visible as a subordinate trust layer.
- Do not introduce earn-first shell behavior, APY-primary framing, or neobank-style emotional drift.

---

## 4. Pre-execution repo check

Before making any edits, Cursor must identify and review:

- existing retail home or dashboard route(s)
- frontend components rendering the current money shell and trust layer
- any prototype or fixture route used for comparison
- styling and component primitives shaping current screen hierarchy
- constraints referenced by `HEDGR_STATUS.md`, `AGENTS.md`, and directly linked governing ADRs

Cursor must also check any current route/component files expressing the retail home or primary money shell, and any existing prototype/frontend files expressing the current retail home dashboard.

If file locations, scope boundaries, or authority constraints are unclear, Cursor must stop and surface the ambiguity before editing.

---

## 5. Exact execution scope

Allowed scope for this spike:

- retail home / primary money shell surface
- balance-led hierarchy expression
- activity and outcome-first layout expression where already in bounded scope
- subordinate Family C trust-layer presentation
- frontend-only styling, layout, and component expression needed for this spike

Not in scope:

- broader IA redesign
- earn surfaces
- APY-first or yield-centric surfaces
- engine or protocol logic changes
- backend logic changes
- new execution behavior
- shipping polish outside the bounded spike

---

## 6. What must remain fixed in execution

- Portfolio Value / total balance remains the primary anchor.
- Stability, protection, and access remain more legible than earnings.
- Family C trust layer remains subordinate and interpretive.
- No accounting-truth or live operational implication is introduced.
- Excluded drift traits remain excluded.
- Broader family strategy is not reopened.
- Implementation posture remains reversible.

---

## 7. Visual / product drift to avoid during execution

Cursor must actively avoid:

- APY or "Earn More" cues becoming emotionally dominant
- chart-adjacent or instrument-like treatment
- Family C gaining hero-like salience
- cue weight overtaking row clarity
- neobank-like convenience identity overpowering stability identity
- exact, live, or accounting-like visual implication
- decorative sophistication without trust value

---

## 8. What the spike should prove in code

This spike should validate that:

- the money-first shell can be expressed cleanly in the frontend
- the Family C trust layer stays visible but subordinate
- the surface reads calmer and more coherent than prior fragmented direction
- the UI does not drift into yield-wrapper or stablecoin-neobank posture
- the implementation remains bounded and reviewable

---

## 9. Expected execution process in Cursor

Cursor should execute in this order:

1. Inspect all relevant files before proposing edits.
2. Identify exact files to modify, with bounded rationale.
3. Make the smallest viable changes that satisfy spike direction.
4. Preserve reversibility in file edits and component expression.
5. Avoid opportunistic cleanup or adjacent refactors outside scope.
6. Surface ambiguity or authority tension before proceeding.
7. After execution, summarize changes, risks, and follow-ups.

If scope ambiguity or repo-authority tension appears at any step, Cursor must pause instead of guessing.

---

## 10. Required post-execution summary

After the spike, Cursor must report:

- which files changed
- what changed and why
- how the result maps to the money-first shell plus subordinate Family C direction
- what was explicitly not changed
- risks or tensions still present
- rollback considerations
- follow-up docs or review readouts needed

The summary should stay structured, bounded, and explicit about non-goals.

---

## 11. Suggested next step after execution

After implementation of this bounded spike, the next step is a governed implementation readout, not immediate merge-by-momentum.

`Implementation-spike planning is captured in \`docs/ops/HEDGR_RETAIL_UI_IMPLEMENTATION_SPIKE_BRIEF.md\`.`

---

## 12. Working conclusion

This execution prompt exists to ensure the spike is performed as a bounded translation of governed UI direction, not as a freeform redesign.

**Cursor should implement the governed money-first shell and subordinate Family C trust layer with minimal, reversible changes and without reopening category drift.**
