# HEDGR RETAIL UI — LIGHT-MODE PAPER MOCKUP REFINEMENT NOTE

## Status / Authority / Scope / Last updated

Status: Paper / mockup refinement record only  
Authority: Non-shipping, non-implementation-authorizing; subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`  
Scope: Single pass on the **primary light-mode** static mirror in `docs/ui/hedgr-dashboard-variants.html` (paper board only; exploration matrix below unchanged)  
Last updated: 2026-04-23

Governing reference: `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`

---

## What changed (surface)

1. **Balance label** remains **`Total balance`** (replaces prior `Portfolio value` on this mirror).
2. **Removed visible `Stability status` label.** Trust reads as two calm lines only: **`Balanced`** then **`Protected · Accessible`** (reassurance, not instrumentation).
3. **Removed in-hero prototype / layout-review copy** from the product frame (no “illustrative for layout review” line inside the hero).
4. **Removed the board-level “source of truth” banner** above the phone so meta governance does not sit adjacent to the product mockup; governance stays in `docs/ops` and this note.
5. **Primary actions:** same circular pill shape and hierarchy; slightly clearer **pressable** read via restrained border, hairline lift shadow, and hover affordance on the light shell only (still secondary to the money anchor).
6. **`Recent activity`** is the first body section title below actions (locked naming centerline).
7. **Family C** unchanged in structure (row-first, thin inline cue, footnote); **quieter** on the light shell via softer panel border/background and desaturated cue fill so it stays visible but non–instrument-panel.
8. **Paper row simplified** to a **single** light-mode reference device plus checklist (duplicate dark/wire comparators removed from this row to avoid conflicting centerlines).

---

## How this preserves the settled hierarchy

**Money-first:** The hero remains the dominant white card on a calm warm-neutral canvas; the balance figure uses the heaviest typographic weight and darkest ink in the shell so it scans before any other content.

**Calmer trust:** Dropping the uppercase system label removes monitoring semantics; `Balanced` reads as human reassurance, with `Protected · Accessible` as a single attached companion line at smaller, softer weight—subordinate to the balance block, not a status dashboard.

**Improved CTA clarity:** Actions stay the same size and position (close, secondary); light-mode pills pick up a modest border and shadow and a hover state so they read as **usable controls** without added color, size, or promotional emphasis.

**Subordinate Family C:** Order is unchanged (after activity); rows and percentages lead, the cue remains a thin inline strip with muted fill, and the panel chroma is stepped down relative to activity so allocation never competes with the money anchor or the first body destination.

---

## Artifact location

- **File:** `docs/ui/hedgr-dashboard-variants.html` — open the page and scroll to the top **Paper — Money-first shell (light)** block.
- **Paper (MCP `user-paper`):** artboard **`Retail — settled reference (light)`** (node `YY-0`) in file **Hedgr UI** — trust label + illustrative hero note removed; trust block tightened; primary-action pills given a light hairline shadow and solid fill for clearer affordance (non-authorizing mirror pass).
