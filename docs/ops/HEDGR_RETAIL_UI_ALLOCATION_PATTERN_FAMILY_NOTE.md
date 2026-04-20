# HEDGR RETAIL UI ALLOCATION PATTERN FAMILY NOTE

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Narrowed allocation pattern families for continued exploration on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines the **narrowed allocation pattern families** worth continuing to explore for **Allocation / Trust Detail** on the calm-money **C3** retail dashboard baseline.

The allocation lane has already moved through **legibility brief → visual pattern comparison → same-frame micro-test → readout → visual-pattern guardrails**. The goal now is **family-level narrowing**: which pattern **families** stay active for critique, which stay as **controls** or **bounded challengers**, and which **cues** inside each family remain acceptable, risky, or excluded.

This is **not** a component spec, implementation brief, or final design decision. Nothing in this document is **approved final UI treatment**, a ship mandate, or product approval. It is a **governance and refinement artifact** only—subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`.

---

## 2. Authority boundary

This note reinforces the same posture as the allocation stack and retail exploration canon:

- **Read-only and informational** Stability Engine retail presentation remains in force; this note does not introduce execution semantics, protocol-level logic, or operational claims.
- **Allocation is not accounting truth**—bands and targets remain interpretive trust surfaces, not ledger, policy, or live operational state (ADR **0013**, `docs/ops/HEDGR_STATUS.md`).
- **No richer visible engine** is authorized here: no runtime narration or “live engine” semantics implied through allocation **family** or cue choices.
- **No broader information architecture** is implied: C3 order, layer roles, and allocation’s **subordinate** position stay fixed; family narrowing addresses **how** allocation may read, not **where** it sits.
- **No pattern family named in this document is approved final UI direction.**
- **No outcome in this document is product approval** or implementation sequencing; shipped work remains gated by `docs/ops/HEDGR_STATUS.md` when explicitly named there.

---

## 3. Inputs

Read this note alongside the exploration stack.

**Immediate anchors:**

1. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_GUARDRAILS.md`** — acceptable, risky, and out-of-bounds pattern behavior; practical constraints; working A / B / C signal.
2. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_PATTERN_MICRO_TEST_READOUT.md`** — readout of Patterns A / B / C on the fixed C3 frame; precision, busyness, and hierarchy judgments.
3. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_COMPARISON.md`** — pattern-level definitions and comparative questions for allocation presentation.

**Supporting context (broader refinement and critique stack):**

4. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_PATTERN_MICRO_TEST.md`** — same-frame protocol and explicit out-of-scope items.
5. **`docs/ops/HEDGR_RETAIL_UI_ALLOCATION_LEGIBILITY_BRIEF.md`** — bounded legibility objectives and deferrals.
6. **`docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md`** — stronger immediate allocation legibility without performance theater.
7. **`docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md`** — allocation as governed meaning, not machinery.
8. **`docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md`** — trust-detail weight and mid-stack congestion precedent.
9. **`docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md`** — static comparison precedent.
10. **`docs/ops/HEDGR_RETAIL_UI_CRITIQUE_SCORECARD.md`** — shared critique criteria.
11. **`docs/ops/HEDGR_STATUS.md`** — sole implementation and sequencing authority.
12. **`AGENTS.md`** — repo execution standard.

This note is **specifically downstream** of the allocation **readout** and **guardrails**: it turns open A / B / C comparison into **bounded family guidance**, not a reopening of unfettered pattern space.

---

## 4. Why a family note is needed

The lane has produced enough **critique signal** to move beyond raw **Pattern A / B / C** comparison and into **narrowed family direction**—without pretending the comparison phase never happened.

A family note is needed to:

- **Preserve** what the lane learned (grasp vs. precision, calm vs. busyness, subordination vs. mid-layer competition).
- **Avoid** reopening already-settled debates at the wrong level (e.g. treating every variant as equally “open” when control and centerline roles are already understood).
- **Define** which families stay **active**, which stay **controls**, which stay **bounded challengers**, and which **cues** stay **excluded** across families.
- **Support** future Paper or prototype fixtures with **discipline**, so exploration does not drift into chart theater, false exactness, or hierarchy creep.

This stays **governance-safe** and **non-implementing**: families guide critique, not backlog authority.

---

## 5. Family narrowing principles

### 5.1 Control must remain visible

At least one **calm baseline** family should remain available in comparisons to catch **performative drift**, **precision implication**, and **temperature** rise in other families.

### 5.2 Centerline must remain conditional

A **preferred** family for continued exploration may emerge, but only under **restraint**, **subordinate hierarchy**, and **guardrail** screening—not as a default “winner.”

### 5.3 Challenger families must stay bounded

**Challenger** families may remain in play where they teach something concrete about **grasp**, not because they are **more visually assertive** or “more product.”

### 5.4 Excluded cues stay excluded

**Out-of-bounds** pattern behavior (per guardrails) does not re-enter through **family** labeling or narrowing.

### 5.5 Family decisions remain critique-only

Family narrowing is a **refinement aid** for review and fixtures, not a **shipping decision** or sequencing mandate.

---

## 6. Narrowed family set

Three families align with the micro-test **Pattern A / B / C** mapping—at **family** level only, not as approved components.

### 6.1 Family A — Plain list control

- Remains the **calm familiarity control** and **honesty / anti-drift baseline**.
- Stays **valuable for comparison**; it is **not** positioned here as the **lead** refinement family for distributional grasp.
- **Strongest use:** catching **precision implication**, **chart-adjacent** drift, and **visual temperature** in Families B and C.

### 6.2 Family B — Calm proportional challenger

- Remains a **bounded challenger** family, not an unconstrained design space.
- **Strongest use:** testing whether **proportional** or **distributional** cues materially improve **immediate grasp** at acceptable governance cost.
- **Should not become the default** family: it carries the **highest precision** and **chart-adjacent** risk when overdressed or over-read.
- May remain useful **only** under **tight restraint** and explicit **guardrail** screening.

### 6.3 Family C — Hybrid centerline family

- Remains the **strongest current family** for **continued exploration**: **list clarity** plus **light structural cueing**.
- **Strongest use:** balancing **row-level** trust language with a **modest** structural read—when calmness and subordination hold.
- Must remain **conditional** on **low busyness**, **secondary** cue weight, and **no** competition with **Portfolio Value**, **Stability Status**, or mid-stack blocks.
- Should be treated as the **active** family for **further critique**, not as an **approved final** pattern.

---

## 7. Acceptable cues inside each family

Pattern-level cue classes only—not pixel specs or component APIs.

### 7.1 Acceptable cues in Family A

- **Plain rows** with calm informational rhythm.
- **Clear label / value pairing** without instrument metaphors.
- **No chart-adjacent** proportional signal.
- **Low visual temperature**; reads as trust detail, not dashboard chrome.

### 7.2 Acceptable cues in Family B

- **Restrained proportional cue** (e.g. calm segment or proportion read) that suggests **structure**, not measurement.
- **Bounded, non-heroic** structural indication—subordinate weight only.
- **No exact / live** appearance: no faux precision, no real-time styling.
- **No instrument-panel** feel (meters, ticks, “dashboard instrument” framing).

### 7.3 Acceptable cues in Family C

- **Row clarity remains primary**; labels and plain language anchor the block.
- **Cue remains secondary**—reinforces structure; does not dominate the block.
- **Visual weighting stays modest** relative to money and status.
- The block still reads as **informational trust**, not **performance** or **scorekeeping**.

---

## 8. Risky cues requiring caution

Cautionary guidance across families—not a blanket ban on exploration inside critique.

### 8.1 Family B precision cues

Anything that makes the split feel **measured**, **real-time**, **ledger-exact**, or **operationally true** is **risky**. Proportional signal must stay **interpretive**.

### 8.2 Family C dual-encoding overload

**Row + cue** pairings can improve clarity but quickly risk **mid-layer busyness** or **hierarchy creep** if both surfaces assert salience.

### 8.3 High-salience visual weighting

**Contrast**, **shape emphasis**, or **cue geometry** can **quietly pull** allocation upward in the reading hierarchy—even when layout order is unchanged on paper.

### 8.4 Chart-adjacent resemblance

Even **static** cues become risky if they read like **mini charts**, **meters**, or **dashboard** instruments—inviting precision and performance reads.

---

## 9. Excluded cues and family drift

The following remain **excluded** regardless of family label. **Family narrowing does not reopen** this behavior.

- **Chart-theater** (mini charts, trophy / reward framing, yield-forward visuals).
- **Motion-led** emphasis or animated distribution feedback (static clarity first).
- **Live / exact-looking** segmentation or cues that imply **operational** or **ledger** truth.
- **APY-first** or **performance** styling inconsistent with liquidity-before-yield posture.
- **Cues that compete** with **Portfolio Value** or **Stability Status** for prominence.
- **Cues that make allocation** feel like **operational truth** or a **control surface** beyond informational bands.

---

## 10. Working family signal

**Critique signal only—not approval.**

- **Family A** remains the **control** family.
- **Family B** remains the **challenger** family (grasp pressure-test, highest governance risk if misapplied).
- **Family C** remains the **strongest current family** for **continued exploration**, **conditional** on restraint.
- **Future exploration** should **narrow within Family C first**, while keeping **Family A** and a **bounded** form of **Family B** available for **discipline** and **challenge**—not as parallel unconstrained design tracks.

---

## 11. Suggested next uses

Critique-oriented uses only—not implementation sequencing:

1. **Screen** future allocation fixtures **by family first** before inventing new pattern names.
2. **Narrow Family C internally** (cue strength, spacing, label pairing) before testing **novel** pattern families.
3. Use **Family A** as the **anti-drift baseline** in side-by-side comparisons.
4. Use **Family B** only as a **bounded challenger** where **grasp** must be pressure-tested against precision and theater risk.
5. **Reject excluded cues** before they appear in Paper or prototype work, using guardrails as the hard edge.

Allocation visual-pattern guardrails are captured in `docs/ops/HEDGR_RETAIL_UI_ALLOCATION_VISUAL_PATTERN_GUARDRAILS.md`.

---

## 12. Working conclusion

The purpose of this note is to stop the allocation lane from **reopening broad pattern exploration** without discipline—after the lane has already earned a **narrowed** reading of what remains worth testing.

**Allocation family narrowing should preserve one calm control, one bounded challenger, and one restrained centerline family.**
