# HEDGR RETAIL UI MEANING REFINEMENT BRIEF

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Bounded refinement brief for adding governed meaning to the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This brief defines the **next refinement cycle** for the retail dashboard exploration, directly following the outcomes captured in `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`.

The UI is already in the right emotional lane: calm, premium, and structurally promising. The next task is to **strengthen meaning**—interpretation, legibility, and trust surfaces—without breaking calm money or drifting toward operational or system-console posture.

This document is for **refinement planning and critique cycles only**. It does not authorize implementation, approve a final direction, or create sequencing authority. Nothing here overrides `docs/ops/HEDGR_STATUS.md` or functions as an ADR.

---

## 2. Authority boundary

Interpret this brief under current repo truth and `AGENTS.md` discipline:

- **Stability Engine** retail presentation remains **read-only and informational** (Sprint 2 posture; no execution semantics from this exploration).
- **Allocation** remains **informational, not accounting truth**—bands and targets are interpretive trust surfaces, not ledger or policy authority.
- No outcome here authorizes a **richer visible engine**, broader runtime semantics, or hidden-model authority.
- No refinement implied here expands **information architecture** or introduces new product surfaces; Activity stays bounded unless later named in `HEDGR_STATUS.md`.
- **No refinement outcome in this brief is product approval.** Shipped work remains gated by `HEDGR_STATUS.md` §7 / §7a when and if explicitly sequenced.

---

## 3. Inputs

Read this brief alongside:

1. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — immediate anchor: accept / translate / defer resolution for the latest pass.
2. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — prototype spike readout (Control, Variant A C3-R2, Variant B C3-R2 + C4).
3. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — static Paper board critique and checklist signal.
4. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_BRIEF.md`** — C3 structural centerline and order discipline.
5. **`docs/ops/HEDGR_RETAIL_UI_C3_REFINEMENT_NOTES.md`** — C3-R1–R4 refinement variables and separation thesis.
6. **`docs/ops/HEDGR_RETAIL_UI_SECOND_PASS_VARIANT_SCORE_RUN.md`** — second-pass Concept C scores; C3 as strongest refinement centerline.
7. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — repeatable doctrine-safe critique criteria.
8. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority for shipped work; exploration docs remain subordinate.
9. **`AGENTS.md`** — repo execution standard, engine-facing read order when any future work touches shipped trust surfaces.

---

## 4. Why this refinement pass is needed

The next bottleneck is **not aesthetics**. It is **meaning architecture**: how quickly and honestly the screen communicates protection posture, structured allocation, recent money reality, and what the user may do—without hype, theater, or over-claiming.

Pressure concentrates on:

- **Stability Status** — defining surface needs consequence without becoming operational or state-machine-heavy.
- **Allocation legibility** — trust layer must read faster and more clearly, still as information, not performance.
- **Activity naming** — role stays narrow; labels should be tested, not expanded.
- **Action hierarchy** — state before movement; actions stay subordinate; avoid generic fintech symmetry.
- **Condition / disclosure language** — honest framing of “condition of money” without stronger retail risk vocabulary or maturity claims the system does not support.

This pass stays governance-safe: refinement and critique, not a mandate to ship.

---

## 5. Refinement objective

**Strengthen the meaning of the current calm-money dashboard without making it louder, more operational, or more system-authored.**

This pass should pursue:

- clearer **interpretation** of status and allocation
- stronger **user understanding** with minimal added density
- more **legible trust surfaces** (what is protected, what is informational)

It should **not** pursue:

- more **machinery** or engine exposure
- more **complexity** in the primary reading path
- **explicit engine** or control-console semantics at the top layer

The baseline remains the **C3** centerline (including prototype-aligned **C3-R2** structural separation where relevant): money first, bounded status, subordinate actions, restrained activity, allocation as trust detail—not a broader dashboard or feed.

---

## 6. In-scope refinement themes

### 6.1 Stability Status meaning

The next pass should test a **light supporting sentence** beneath the primary status label so the layer reads as **consequential but calm**, not merely atmospheric.

Status remains **bounded and interpretive**: it explains posture in plain language; it does not imply deterministic behavior, full state coverage, or operational commands.

**Example direction (critique only, not approved copy):**

- Label: `Balanced`
- Supporting line: `Your funds are within the current protection range.`

Treat copy as **refinement test material** until governance review says otherwise.

Focused status-meaning exploration is captured in `docs/ops/HEDGR_RETAIL_UI_STATUS_MEANING_TEST_NOTE.md`.

### 6.2 Allocation legibility

Allocation should become **more immediately graspable**: distribution and protection framing easier to parse at a glance.

Emphasize:

- **stronger visual weighting** where it aids comprehension, not excitement
- **faster comprehension** of split and role
- **preserved calmness**—no chart theater or yield framing
- **no performance theater**—allocation stays a trust surface, not a scoreboard

### 6.3 Activity naming

The Activity layer remains **narrow** in scope; only **naming** is in question for this pass.

**Candidate labels** to compare in critique (from the pass resolution note):

- `Money activity`
- `Recent activity`
- `Money flow`
- `Recent movement`

This is **label refinement only**, not surface expansion, feed behavior, or IA change.

### 6.4 Action asymmetry

**Action weighting** may need refinement so the surface does not drift back toward **generic fintech symmetry** (two equal buttons reading as equally “primary”).

Discipline:

- **state still precedes action**
- **action remains subordinate** to portfolio and status
- **no higher-agency top-layer semantics** (no rebalance/stabilise posture at this layer; see §8)

### 6.5 Retail-facing status vocabulary

Before any richer system meaning is exposed in UI, define a **first-pass bounded vocabulary**: a small set of retail-facing status labels with **one-line meanings** that match what the current read-only surface can honestly support.

Keep vocabulary **light, calm, and governed**—interpretive, not exhaustive; aligned with disclosure and trust doctrine, not marketing or risk-table language.

---

## 7. Translate-before-use themes

These themes should **inform** refinement and internal critique. They must **not** be dropped into the product as ungoverned copy or structure.

### 7.1 Condition of money / condition of wealth framing

The pass’s insight—that Hedgr can express **condition and protection posture of money**, not only balances—is strategically strong as an **internal lens** and critique guide.

It is **not** yet governed public product language. Use it to steer meaning architecture; do not ship it verbatim without explicit doctrine and copy governance.

### 7.2 Guidance layer beneath status

A **light guidance** line or layer under status is promising for clarity but **governance-sensitive**: it can blur into advisory behavior or imply obligations the engine does not perform.

Treat as **translate-before-use**: define informational vs advisory boundaries, appearance rules, and implied/non-implied claims **before** treating any variant as product-ready.

### 7.3 Activity / feed reframing

The activity section can move toward more **Hedgr-native** orientation (less generic bank feed) through naming and light classification.

Avoid **overcorrecting** into abstract “system flow” language too early; preserve ordinary money legibility. Prefer **naming and bounded classification** over changing the section into a new surface.

---

## 8. Explicitly deferred

The following remain **out of scope** for this meaning-refinement pass:

- **Full visible stability state machine** — Deferred: risks over-claiming maturity, adds governance burden, and may imply deterministic behavior the current informational surface cannot justify. Stronger internal state logic does not automatically belong in retail UI yet.

- **Strong retail risk labels such as `At risk`** — Deferred: requires real thresholds, communications doctrine, consequence logic, and trust/legal clarity. Until then, calmer bounded language is preferable.

- **`Rebalance` / `Stabilise` as top-layer actions** — Deferred: implies user control over system-level allocation and engine-actuation semantics beyond current read-only posture. Not appropriate at this layer for this pass.

- **Rich motion-based allocation feedback** — Deferred: motion can signal sophistication or reward behavior; **static clarity** should be exhausted first. No animation-led trust theater.

---

## 9. Suggested refinement outputs

Next cycles should produce **critique artifacts**, not production deliverables, unless later sequenced under `HEDGR_STATUS.md`:

1. **Paper / prototype test** of Stability Status **supporting-sentence variants** (tone, length, boundedness).
2. **Light allocation legibility exploration** — weighting and scan path only; no new accounting claims.
3. **Activity naming comparison** — side-by-side labels on the same narrow role.
4. **Action weighting comparison** — primary vs secondary emphasis without new actions or semantics.
5. **Draft retail-facing status vocabulary note** — candidate labels + one-line meanings + explicit honesty bounds (what each label must not imply).

These outputs support **review and iteration**, not implementation authorization.

---

## 10. Working conclusion

The retail dashboard exploration is already in the right **emotional ballpark**. The next refinement cycle is about **controlled meaning**—clearer interpretation and trust legibility—not more visual invention or feature surface.

**Hedgr is strongest when it layers governed meaning onto calm money.**
