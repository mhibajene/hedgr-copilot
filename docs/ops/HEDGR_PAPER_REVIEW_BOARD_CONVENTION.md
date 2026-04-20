# HEDGR PAPER REVIEW BOARD CONVENTION

Status: Review-surface guidance only  
Authority: Non-sequencing, non-implementation  
Scope: Board layout convention for Paper-based UI review work  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines the **default layout convention** for Hedgr Paper review boards when UI is presented for critique.

It exists to improve **clarity**, **comparability**, and **governance** of static review: reviewers should see the same object, in the same hierarchy, with the same authority signals. It is a **review-surface rule set**, not a design system, product spec, or implementation brief. It does **not** authorize sequencing, shipping, or engineering work. Canonical implementation and next-ticket authority remain in `docs/ops/HEDGR_STATUS.md` (per `AGENTS.md`); exploration and critique docs in `docs/ops` remain the durable critique chain unless explicitly superseded there.

---

## 2. Core principle

**Clean screens. Adjacent critique.**

The **screen** is the object under review. Commentary exists to **support judgment**, not to wrap, frame, or pre-interpret the UI before it is seen on its own terms. If the annotation layer becomes more visually dominant than the interface being reviewed, the board has failed.

---

## 3. Board hierarchy

Every Paper review board should follow this order on the canvas:

1. **Source-of-truth framing** — what governs interpretation and where durable truth lives  
2. **Current review surface** — the clean comparison row or primary frames under active critique  
3. **Adjacent critique / checklist** — consolidated prompts, legend, and variant notes  
4. **Legacy exploration context** — where relevant, clearly separated historical material  

This order should remain **visually legible** at a glance: a reviewer should not have to hunt for what is “current” versus “archive.”

---

## 4. Clean screens as default

Review screens should be presented **as cleanly as possible**. The mockup should read like **product UI**, not a slide card.

- The **screen stays visually primary**.  
- The screen should **not** sit inside a large commentary wrapper or heavy chrome that redefines the frame.  
- **Allowed:** a small title, a compact variant tag, minimal metadata near the frame (e.g. variant name, prototype-alignment tag).  
- **Avoid:** heavy card shells around the mockup, large annotation panels fused to each frame, commentary blocks that read as part of the product surface.

---

## 5. Adjacent annotations only

Annotations belong **beside**, **below**, or in a **clearly separate review panel** — not embedded as the default frame treatment. They should **not** wrap tightly around individual mockups unless there is a **strong, stated reason** (see §13).

This preserves a disciplined **two-pass review**:

1. Look at the **screen**.  
2. Read the **critique layer**.

---

## 6. No wrapped commentary around mockups

**Wrapped commentary is not the default Hedgr review style.** Out-of-bounds default treatments include:

- Large white or branded “review cards” behind screens  
- Caption stacks fused to each mockup  
- “Test / risk / disclosure” blocks that visually **enclose** the frame  
- Commentary chrome that changes how the screen is perceived **before** the screen is read on its own  

**Short frame labels** remain acceptable. **Heavy review wrappers** are not.

---

## 7. Separate checklist / review panel

Every **substantial** review board should include a **dedicated critique surface**, separate from the mockups.

**Preferred form:**

- One consolidated **checklist / review frame**  
- One **legend** for variant roles  
- **Grouped review prompts** (shared questions across variants)  
- Optional **compact variant notes** where density belongs in one place  

Denser critique belongs **here**, not repeated around each screen.

---

## 8. Legacy vs current partitioning

Boards must clearly distinguish:

- **Legacy exploration** — historical or superseded exploration, retained for traceability only  
- **Current review** — frames under active critique aligned to the current prototype or agreed comparison set  
- **Prototype-aligned direction** — where applicable, material that mirrors or tests the live review route without claiming extra authority  

This distinction must **not** rely on **visual position alone**. Use explicit signals: **section banner**, **zone note**, **layer naming**, **frame labels**.

---

## 9. Source-of-truth banner requirement

If a board mixes **historical exploration** and **current review** work, it should include a **visible source-of-truth banner**.

The banner should clarify:

- What the **current review surface** is  
- What remains **historical context only**  
- Where **durable source-of-truth** lives (repo and/or prototype), and that **Paper is a critique surface**, not implementation authority  

It may **point to**, for example:

- The relevant **prototype route**  
- The **`docs/ops` critique stack** (readouts, pass resolution, refinement briefs)  
- The current **refinement note** or **readout** for the lane under review  

This convention does **not** make Paper a competing product source; it makes the **authority chain** legible on the canvas.

---

## 10. Layer naming convention

Paper **layer** names should make historical vs active material obvious at a glance.

**Recommended patterns:**

- `Legacy exploration — …`  
- `Prototype-aligned review — …`  
- `Review — …`  
- `Checklist`  
- `Wire — …`  

Naming should help distinguish **historical** material, **active review** material, and **support** material (checklists, wires, banners) without forcing position-based guesswork.

---

## 11. Annotation content rules

When annotations are used, they should stay **short**, **direct**, **critique-oriented**, and **non-authorizing**. They support judgment; they do not approve direction or imply backlog commitment.

**Good adjacent content examples:**

- Variant **role** (control, structural test, semantic companion, etc.)  
- **What is being tested** in one line  
- **Main risk** or governance sensitivity  
- **Disclosure** or honesty **label** where relevant  
- **Grouped critique questions** shared across variants  

**Avoid:**

- Long prose beside every frame  
- Pseudo–product requirements embedded in board labels  
- Approval language (“ship this,” “final,” “signed off”)  
- Implementation language that belongs in tickets or `HEDGR_STATUS.md`

---

## 12. Reviewer flow convention

Preferred flow:

1. Read the **source-of-truth banner**.  
2. Identify **legacy** vs **current review** zones.  
3. Inspect **clean screens** first.  
4. **Compare variants** visually.  
5. Use the **checklist / adjacent critique panel** for structured questions.  
6. **Record outcomes in repo docs** (e.g. readouts, pass notes), not in Paper alone.

Paper should **support** judgment; it must not become the **only** place judgment lives. Durable critique and authority remain in the repo chain and, for implementation, in `docs/ops/HEDGR_STATUS.md` where applicable.

---

## 13. When to break this convention

The convention may be **bent** only when:

- A **specific usability** issue truly requires **inline** annotation, or  
- A **single-frame walkthrough** genuinely needs **tightly coupled** callouts, or  
- The board is **educational** rather than **comparative**  

Even then: keep the departure **minimal**, **document why** (in the board or a linked note), and do **not** let the exception become the new default.

---

## 14. Failure modes to avoid

1. **Annotation layer** visually **louder** than the screens.  
2. Reviewers **cannot tell** legacy vs current.  
3. The board reads like a **slide deck** or marketing layout instead of a **critique surface**.  
4. Every mockup is surrounded by **repeated commentary chrome**.  
5. **Source-of-truth** is ambiguous relative to prototype and `docs/ops`.  
6. The board introduces **design drift** that does not exist in the prototype or repo critique stack.

---

## 15. Discoverability cross-link

Current board-level application of this convention is reflected in `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`.

---

## 16. Closing position

Paper should help the team **see the UI more clearly**, not more noisily.

The board is doing its job when:

- **Screens** stay visually primary  
- **Critique** stays readable and consolidated  
- The **authority chain** (prototype, `docs/ops`, `HEDGR_STATUS.md` where relevant) stays **clear**  
- **Review flow** stays disciplined  

**Clean screens. Adjacent critique.**  
That is the convention.
