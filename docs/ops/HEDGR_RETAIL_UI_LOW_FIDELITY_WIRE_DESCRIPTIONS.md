# HEDGR RETAIL UI LOW-FIDELITY WIRE DESCRIPTIONS

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Ultra-low-fidelity dashboard wire descriptions for bounded retail exploration  
Last updated: 2026-04-14

---

## 1. Purpose

This document converts `docs/ops/HEDGR_RETAIL_UI_SCREEN_ANATOMY_COMPARISON.md` into ultra-low-fidelity dashboard wire descriptions for critique.

It exists to make structure and interpretation easier to compare during paper exploration.

This is for structure and interpretation only. It is not a mockup spec, does not authorize implementation, and does not create sequencing or backlog authority.

---

## 2. Authority boundary

This document must be read under current repo truth:

1. Stability Engine retail presentation remains read-only and informational.
2. allocation remains informational, not accounting truth.
3. no wire may imply execution semantics, fund movement, or autonomous reallocation.
4. no Activity elevation here should be read as approved Activity-surface expansion.
5. no concept in this document is approved product direction.

This is a paper critique artifact only.

---

## 4. Shared wire rules

All three concepts use the same fixed wire constraints.

Each concept is one mobile dashboard screen only.

The fixed bounded zones are:

- `Portfolio Value`
- `Stability Status`
- `Primary Actions`
- `Activity / Money Reality`
- `Allocation / Trust Detail`
- `Advanced Disclosure`

Across all three concepts:

- no new navigation
- no new modules
- no new states
- no visual styling detail beyond rough placement and emphasis
- no APY-first framing
- no crypto-native metaphors
- no score language
- no hidden-model authority cues

These wires describe placement and emphasis only. They do not define components, behaviors, or visual design.

---

## 5. Concept A — Money-first

### 5.1 Wire description

Top: a large `Portfolio Value` block as the dominant money anchor.

Directly below: a compact `Stability Status` layer in calm, plain language.

Then: a restrained `Primary Actions` row that is visible but not dominant.

Below that: the first slice of `Activity / Money Reality`.

Lower on the screen: `Allocation / Trust Detail`.

At the bottom: an `Advanced Disclosure` entry point.

This is the outer limit of simplicity in the current bounded exploration set.

### 5.2 What is visually dominant

`Portfolio Value` is dominant first. `Stability Status` is the next visible trust signal.

### 5.3 What is minimized

Allocation explanation, deeper trust framing, and disclosure are all minimized higher on the screen and pushed lower.

### 5.4 Likely user reading path

The likely reading path is: how much money is here, whether things look stable, what can be done, whether recent money activity feels normal, and only then the deeper protection layer.

### 5.5 Trust benefit

The trust benefit is immediate financial familiarity. This concept most directly tests whether Hedgr can feel like protected money with very little top-layer complexity.

### 5.6 Doctrine risk

The doctrine risk is that structured protection becomes too recessive. The screen can start earning trust mainly through familiarity rather than through visible structural truth.

### 5.7 Critique prompt

How little visible structure can Hedgr show before truth becomes too delayed or too easy to miss?

---

## 6. Concept B — Financial control center

### 6.1 Wire description

Top: `Portfolio Value`.

Below: `Stability Status`.

Then: a stronger `Activity / Money Reality` layer that carries more of the user-orientation load.

Below that: reduced but still visible `Primary Actions`.

Then: `Allocation / Trust Detail`.

At the bottom: `Advanced Disclosure`.

This is the outer limit of orientation density in the current bounded exploration set.

### 6.2 What is visually dominant

`Portfolio Value` still leads, but the next strongest layer is the money-reality or recent-movement block rather than actions.

### 6.3 What is minimized

Action prominence is reduced. Deeper disclosure still sits low. Allocation remains visible but not the first interpretive layer after status.

### 6.4 Likely user reading path

The likely reading path is: how much money is here, what the current status is, what changed or deserves attention, what can be done, and then how the protection layer is structured.

### 6.5 Trust benefit

The trust benefit is orientation. This concept most directly tests whether stronger money reality improves comprehension without implying broader product expansion.

### 6.6 Doctrine risk

The doctrine risk is density creep. The screen can begin to read like a broader financial dashboard or a PFM-style surface rather than a disciplined, bounded Hedgr dashboard.

### 6.7 Critique prompt

How much orientation can Hedgr add before the screen stops feeling bounded, calm, and structurally disciplined?

---

## 7. Concept C — Protected money account

**Exploration default for comparison only**

This is the current centerline for paper critique, not a governance decision, implementation recommendation, or product consensus.

### 7.1 Wire description

Top: `Portfolio Value`.

Below: `Stability Status`.

Then: restrained `Primary Actions`.

Below that: a controlled slice of `Activity / Money Reality`.

Then: the beginning of `Allocation / Trust Detail`.

Lower on the screen: fuller `Allocation / Trust Detail` and `Advanced Disclosure`.

This is the centerline balance between familiarity and structural truth.

### 7.2 What is visually dominant

`Portfolio Value` remains dominant. `Stability Status` stays immediately visible. The next layers are present with restraint rather than equal weight.

### 7.3 What is minimized

Neither activity nor allocation is allowed to dominate the top layer. Deeper disclosure remains lower and must not take on hidden-model overtones.

### 7.4 Likely user reading path

The likely reading path is: how much money is here, what the current protection posture is, what bounded actions exist, what recent money reality looks like, and then how the protection structure is described.

### 7.5 Trust benefit

The trust benefit is balance. This concept tests whether Hedgr can feel financially native while still making structured protection legible.

### 7.6 Doctrine risk

The doctrine risk is mid-layer congestion. If actions, activity, and trust detail all compete too early, the screen can feel cluttered or ambiguous about what matters most.

### 7.7 Critique prompt

What is the cleanest centerline balance between money familiarity and visible structural discipline?

---

## 8. Comparative critique readout

Concept A is the simplest.

Concept B is the most orienting.

Concept C is the current best centerline for critique.

The shared tension across all three is the same: becoming more financially native without concealing the structured truth that makes Hedgr distinct.

---

## 9. Open questions carried forward

The same open questions remain after this wire pass:

- how much `Allocation / Trust Detail` belongs above the fold?
- should `Activity / Money Reality` read as recent activity or broader money reality?
- should actions always precede activity in the centerline concept?
- what should replace or preserve `Advanced Details`?
- where is the warmth ceiling once structure is fixed?

These questions remain for critique only. They are not resolved by this document.

---

## 10. Closing position

This pass is trying to find the clearest wire, not the most expressive one.

Hedgr should feel calm, legible, and structurally honest.
