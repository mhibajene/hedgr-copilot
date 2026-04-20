# HEDGR RETAIL UI ALLOCATION LEGIBILITY BRIEF

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Bounded refinement brief for improving Allocation / Trust Detail legibility on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This brief defines the **next refinement cycle** for the **Allocation / Trust Detail** layer, **following the status-language work** and aligned with the meaning pass captured in `docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md` and the pass resolution in `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`.

The dashboard is already in the right emotional lane: calm, money-first, and structurally promising on the **C3** centerline. The next job is not to raise intensity or add machinery; it is to **strengthen the legibility** of the Allocation / Trust Detail layer so users grasp **how money is structured and protected** faster and more clearly.

The goal is **clearer grasp, not more intensity**—interpretation and scan-path improvement within the existing stack, not a new anchor or a louder surface.

This document is for **refinement planning and critique / prototype cycles only**. It does not authorize implementation, approve a final UI direction, create sequencing authority, or override `docs/ops/HEDGR_STATUS.md`. Nothing here functions as an ADR or product approval.

---

## 2. Authority boundary

Interpret this brief under current repo truth, `AGENTS.md`, and `HEDGR_STATUS.md`:

- **Read-only and informational posture** for Stability Engine retail presentation remains in force; this exploration does not introduce execution semantics.
- **Allocation is not accounting truth**—bands and targets remain interpretive trust surfaces, not ledger, policy, or operational authority (ADR **0013** alignment).
- **No richer visible engine** is authorized by this brief: no protocol-level disclosure, runtime policy surfacing, or “live engine” semantics in the allocation layer.
- **No broader information architecture** is implied: C3 order and layer roles stay fixed; this pass refines **how** allocation reads, not **where** it sits in the stack.
- **No refinement outcome in this brief is product approval.** Shipped work remains gated by `HEDGR_STATUS.md` **§7** / **§7a** when and if explicitly sequenced.

---

## 3. Inputs

Read this brief alongside:

1. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — **immediate anchor:** accept / translate / defer resolution; **§6.2** explicitly accepts stronger immediate allocation legibility within trust-surface discipline.
2. **`docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md`** — **immediate anchor:** cross-cutting meaning pass; **§6.2** frames allocation legibility as part of governed meaning, not machinery.
3. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — prototype spike readout (Control, Variant A C3-R2, Variant B C3-R2 + C4); especially relevant to **how trust detail reads** after structural separation.
4. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — static Paper board critique; reinforces side-by-side judgment of trust-detail weight and hierarchy.
5. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_BRIEF.md`** — C3 structural centerline, order discipline, and subordinate placement of Allocation / Trust Detail.
6. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_NOTES.md`** — C3-R1–R4 variables; **trust-detail weight** remains an explicit refinement dimension paired with separation and disclosure tone.
7. **`docs/ops/HEDGR_RETAIL_UI_SECOND_PASS_VARIANT_SCORE_RUN.md`** — second-pass Concept C scores; C3 as strongest refinement baseline; allocation visibility as a scored lens without shadow accounting.
8. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — repeatable criteria (e.g. allocation visibility, hierarchy clarity, doctrine fit, calmness).
9. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority; exploration docs remain subordinate.
10. **`AGENTS.md`** — repo execution standard; engine-facing read order if any future work touches shipped trust surfaces.

**Prototype and Paper readouts** are especially relevant because they showed Allocation / Trust Detail as **visible** but—in Variant A’s cleaner stack—still **somewhat passive** or **softly weighted** relative to the product’s trust ambition. Open questions there (e.g. optimal trust-detail weighting) align directly with this pass.

---

## 4. Why this refinement pass is needed

Allocation is increasingly functioning as the **trust layer**: the place where structured protection and Hedgr-specific truth become tangible after Portfolio Value and Stability Status.

The current surface may still read as **too passive** or **too list-like**—informative, but not yet **immediately scannable** as “how your posture is split.” Prototype and Paper critique both flagged **trust-detail weight** as unresolved: not absent, but not always optimally **felt** in hierarchy.

The next bottleneck is **not** whether allocation is on-screen. It is whether it is:

- **Immediately understandable** — split and role graspable in one calm glance.
- **Visually weighted enough to matter** — noticeable as Hedgr truth, not wallpaper.
- **Calm enough to remain subordinate** — secondary to money and status, not competing for drama.
- **Distinct enough to feel like Hedgr truth** — not generic supporting copy or a faint PFM row.

This framing stays **governance-safe**: it targets comprehension and hierarchy within informational bounds, not new claims or new system authority.

---

## 5. Refinement objective

**Make Allocation / Trust Detail easier to understand at a glance without making it louder, more technical, or more performative.**

This pass is about:

- **Stronger visual legibility** — scan path, distribution read, and weight that aid comprehension without chart theater.
- **Faster distribution comprehension** — how the split reads as protection posture, not as a scoreboard.
- **Clearer trust-surface meaning** — allocation as **informational trust**, consistent with ADR **0013** and calm-money doctrine.

This pass is **not** about:

- **Richer engine exposure** — no deeper runtime, protocol, or policy semantics on the main surface.
- **Yield theater** — no APY-first framing, competitive returns language, or reward signaling.
- **Active management signaling** — no cues that imply user or system trading control from this layer.
- **Whole-screen redesign** — C3 order and layer roles remain the baseline; refinement is local to allocation presentation.

---

## 6. In-scope refinement themes

### 6.1 Visual distribution readability

The next pass should test whether the **current list treatment** is too passive for fast comprehension—whether a **more visual distribution treatment** (e.g. proportion read, calmer bar or segment read, or other bounded non-theatrical patterns) improves **immediate** understanding of the split **without** adding density or technical vocabulary.

Hypothesis to critique: **structure visible at a glance** beats **structure discovered by reading rows**, when both stay informational and bounded.

### 6.2 Calm weighting

Allocation should become **easier to notice**—better differentiated from filler—**without** becoming visually louder than **Portfolio Value** or **Stability Status**.

The discipline is **relative hierarchy**: a modest lift in salience and legibility, not a second hero. No competing anchors.

### 6.3 Label clarity

Labels inside the allocation layer should remain **plain, retail-natural, and trust-supporting**—consistent with merged band-label posture and `HEDGR_STATUS.md` trust-framing constraints.

Critique may compare **sublabel** clarity where needed; any copy remains **test material** until governance review, not approved product strings.

### 6.4 Informational trust, not performance

Allocation must continue to read as a **trust surface**—posture and targets, not outcomes, rankings, or performance narratives.

It must **not** drift into APY-first, yield-performance, or “how you did” framing. Informational discipline stays absolute.

### 6.5 Subordinate but meaningful placement

Allocation remains **secondary** in the hierarchy (below Portfolio Value and Stability Status in the C3 story) while still feeling **essential** to Hedgr’s **truth layer**—not optional chrome, not recessive generic detail.

---

## 7. Translate-before-use themes

These ideas inform direction but must **not** be dropped into the product as ungoverned structure or copy.

### 7.1 More visual allocation treatments

Exploring **visual patterns** for distribution (within paper/prototype) is appropriate **if** exploration stays **bounded**, **non-theatrical**, and **honesty-bounded**—no animation-led sophistication, no implied precision beyond informational targets.

### 7.2 Risk signaling inside allocation

**Stronger risk signifiers** may eventually matter for some futures, but they belong under **clearer doctrine**—thresholds, communications rules, and legal/trust review. **Not** introduced as ad hoc UI in this pass.

### 7.3 Richer explanatory detail

**Deeper explanation** may become useful later (e.g. disclosure layers). This pass must **not** solve legibility by **stacking dense explanatory content** on the main surface—the pass resolution and C3 notes both prefer **order and weight** over **more explanation blocks** for mid-layer clarity.

---

## 8. Explicitly deferred

The following remain **out of scope** for this allocation-legibility pass:

- **Protocol-level disclosure inside the main allocation surface** — Deferred: would shift the layer toward engine and policy narration; contradicts informational, non-operational posture; belongs in governed disclosure paths if ever, not as main-card machinery.
- **Richer risk-state visualization** — Deferred: needs real thresholds, doctrine, and communications governance; risks over-claiming or alarm theater; calmer bounded status language stays upstream of this layer for now.
- **Motion-based or animated allocation feedback** — Deferred: motion can signal sophistication or reward behavior; pass resolution defers rich motion until **static clarity** is exhausted; no animation-led trust theater.
- **Yield-performance emphasis** — Deferred: contradicts liquidity-before-yield and non-yield-first retail doctrine; allocation stays posture/trust, not returns marketing.
- **Engine-level explanation inside the allocation layer** — Deferred: would read as runtime authority or hidden-model surfacing; exploration note and ADR stack keep engine semantics out of retail trust surfaces at this layer.

---

## 9. Suggested refinement outputs

Next cycles should produce **critique artifacts**, not production deliverables, unless later sequenced under `HEDGR_STATUS.md` **§7** / **§7a**:

1. **Paper / prototype comparison** of **2–3 allocation visual treatments** on the same C3 baseline—list vs calmer proportional read vs other bounded variants; same mock data; hierarchy held constant.
2. **Brief visual-pattern comparison note** — what changed, what improved for scan vs row-read, what risks doctrine drift or visual temperature rise.
3. **Short readout** on which treatment **best improves legibility** without **raising visual temperature** or competing with Portfolio Value / Stability Status—critique verdict only, not implementation approval.
4. **Label review** for allocation sublabels **if** critique shows naming—not a copy ship list, but a governed test set aligned with existing band-label baseline and trust-framing tests.

These outputs support **review and iteration**, not implementation authorization.

---

## 10. Working conclusion

After Stability Status meaning work, **allocation is the next highest-value meaning surface** for making Hedgr’s protected-money story **legible in structure**—still subordinate, still informational, still calm.

It must become **more legible** without becoming **more performative**.

**Allocation should become easier to grasp at a glance without sounding or looking more active than the system can honestly support.**
