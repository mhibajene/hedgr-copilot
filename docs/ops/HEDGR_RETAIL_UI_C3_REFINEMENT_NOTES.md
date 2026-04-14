# HEDGR RETAIL UI C3 REFINEMENT NOTES

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Focused C3 refinement notes for bounded retail UI paper critique  
Last updated: 2026-04-14

---

## 1. Purpose

This document records the **first focused refinement pass** on the locked **Variant C3 — Actions before activity** baseline for paper critique.

**C3** is the active refinement baseline. **Variant C4 — Alternate disclosure label** is carried only as a companion **semantic** thread (disclosure naming and tone), not as a competing structure. The intent is to tighten how a fixed C3 stack reads: order, separation, role clarity, disclosure access, and trust-detail weight—without generating new concepts, zones, or flows.

This pass is for **paper critique only**. It does **not** authorize implementation, approve product direction, or create sequencing authority. It does not override `docs/ops/HEDGR_STATUS.md` and does not function as an ADR.

---

## 2. Authority boundary

Interpret this note under current repo truth:

- Stability Engine retail presentation remains **read-only and informational**.
- **Allocation is informational, not accounting truth** (per governing ADRs and doctrine).
- No refinement here should imply **execution semantics**, hidden-model authority, or broadened operational posture.
- **Activity**-related refinement stays **bounded**; it does not imply approved information-architecture expansion unless later named in `HEDGR_STATUS.md`.
- No outcome of this refinement pass constitutes **product approval** or implementation mandate.

---

## 3. Baseline under refinement

- **Baseline:** `Variant C3 — Actions before activity` (the structural centerline under critique).
- **Companion thread:** `Variant C4 — Alternate disclosure label` (labeling and disclosure-entry semantics only).

**Goal of the pass:** refine **order discipline** (already fixed in the brief), **separation** between adjacent layers, **role clarity** for Activity / Money Reality, **disclosure tone**, and **trust-detail weight**—not to invent alternatives to C3 or reopen A/B/C comparison.

---

## 4. Refinement variables

The following four variables are explicitly under test in this pass:

1. **Trust-detail weight** — how prominent Allocation / Trust Detail feels relative to the rest of the stack.
2. **Actions / Activity separation** — visual and semantic distance between Primary Actions and Activity / Money Reality.
3. **Activity role clarity** — how narrow and legible the Activity / Money Reality layer is (orientation vs. drift toward feed or dashboard).
4. **Disclosure-label option** — companion semantic variants aligned with C4 (critique prompts only).

---

## 5. C3-R1 — Lighter trust-detail footprint

### 5.1 Structural adjustment

Preserve the **C3 order** (Portfolio Value → Stability Status → Primary Actions → Activity / Money Reality → Allocation / Trust Detail → disclosure entry). Reduce the **visible weight** of **Allocation / Trust Detail** above the fold—density, visual mass, or competing emphasis—while keeping enough of the block present that the screen does not read as a generic money app with stability stripped out.

### 5.2 Expected benefit

Less mid-stack competition between trust-allocation content and Actions / Activity; a calmer scan path; **Hedgr structural truth** remains visible without dominating the fold.

### 5.3 Main risk

Over-lightening collapses **protected-money posture** into shallow parity with conventional wallets; reviewers may lose the explicit sense that allocation and trust are first-class.

### 5.4 Critique question

How light can trust detail become before **Hedgr truth** weakens unacceptably for this baseline?

---

## 6. C3-R2 — Stronger Actions / Activity separation

### 6.1 Structural adjustment

Preserve the **C3 order**. Increase **visual and semantic separation** between **Primary Actions** and **Activity / Money Reality** (e.g., spacing, grouping, surface treatment, or typographic boundary—within paper critique, not implementation prescription). The hypothesis is that **separation**, not additional explanation blocks, addresses congestion.

### 6.2 Expected benefit

Clearer handoff from “what I can do” to “what recently happened”; reduced perceived crowding without adding dashboard surface area.

### 6.3 Main risk

Separation reads as **artificial segmentation** or pushes Activity toward a footer-like afterthought, weakening money-reality orientation.

### 6.4 Critique question

Does stronger separation resolve congestion more cleanly than adding copy or blocks—and how much separation is **enough** without fragmenting the story?

---

## 7. C3-R3 — Narrower Activity role

### 7.1 Structural adjustment

Preserve the **C3 order**. Narrow **Activity / Money Reality** to the **smallest useful role**: light orientation and **recent money-state reinforcement** only. Explicitly **reject** drift toward feed behavior, a summary engine, or broader dashboard semantics.

### 7.2 Expected benefit

Tighter product definition; Activity reads as **bounded signal**, not an expanding narrative or analytics surface.

### 7.3 Main risk

Over-narrowing removes **useful continuity** (recent state) and makes the layer feel ornamental or underpowered.

### 7.4 Critique question

Is Activity / Money Reality **one** disciplined role that only needs clearer naming—or are there still **two** candidate roles fighting inside one band?

---

## 8. C3-R4 — Alternate disclosure label on the cleanest C3 posture

### 8.1 Structural adjustment

Apply **disclosure-label** testing to the **cleanest C3 posture** emerging from R1–R3 (order unchanged). Treat this as a **semantic companion test**, not a structural alternative to C3. The disclosure entry remains a single bounded access point; only **label direction** varies for critique.

### 8.2 Expected benefit

Improved **calm, institutional tone** at the disclosure threshold; clearer expectation of what the user is opening (education vs. protection vs. mechanics).

### 8.3 Main risk

Label tuning implies **copy approval** if misread; wrong framing could over-promise protection or sound promotional.

### 8.4 Critique question

Is the disclosure tension mostly **naming**, mostly **role** of the entry, or **both**—when structure is already at its cleanest?

**Critique prompts only (not approved copy):** e.g. `Learn more`, `How this is protected`, `Protection details`, `Allocation details`, `How this works`.

---

## 9. Comparative readout

Hypothesis-only; not a verdict.

| Critique lens | Refinement that *currently appears* strongest (paper hypothesis) |
|---------------|-------------------------------------------------------------------|
| Reducing congestion | **C3-R2** — separation reduces overlap without adding surface. |
| Preserving Hedgr truth | **C3-R2** — clarifies hierarchy so stability and money story read honestly; **C3-R1** remains a coupled tension (lighten vs. visible truth). |
| Keeping Activity bounded | **C3-R3** — explicit narrow role and anti-feed discipline. |
| Improving disclosure tone | **C3-R4** — semantic companion on the cleanest C3 posture. |

---

## 10. Working refinement signal

Disciplined, non-final signal for the next paper iteration:

- **C3-R2** is likely the **strongest structural refinement lever** (separation over explanation).
- **C3-R4** is likely the **strongest semantic companion lever** (disclosure label on a stabilized structure).
- **C3-R1** and **C3-R3** remain **useful boundary checks**: how light trust detail can go, and how narrow Activity can stay without losing usefulness.

This is a **working signal** for critique direction only—not approval, not sequencing, not implementation priority.

---

## 11. Open questions

- How light can trust detail become before **Hedgr truth** weakens?
- How much separation is **enough** between Primary Actions and Activity / Money Reality?
- Is Activity / Money Reality **one role** with better naming, or **two** candidate roles still bundled?
- Is the disclosure issue mostly **naming**, mostly **role** of the entry, or **both**?
- Where is the **warmth ceiling** once structure and separation are clearer—without crossing into yield hype or gamified comfort?

---

## 12. Closing position

This pass tries to **reduce ambiguity inside the strongest current centerline** (C3), not to broaden exploration. The right next move is **refinement, not breadth**: fewer competing ideas, clearer separation of roles, and honest disclosure language at the threshold.

Hedgr should read **calm**, **legible**, and **structurally honest**—protected money and informational allocation without pretending to be a feed, a ledger of record, or an execution dashboard. Nothing here changes implementation authority; `HEDGR_STATUS.md` and §7 / §7a remain the gates for any shipped work.
