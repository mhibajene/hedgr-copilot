# Hedgr Stability Engine UI Variant Disposition

## Status

This document is a **governance disposition note**: a **verdict on the current Stability Engine retail dashboard variant set** represented in-repo by **`docs/ui/hedgr-dashboard-variants.html`** (and any Paper boards kept in sync with it). External Paper mockups are treated as **critique input**, not product truth.

- It is **specific to this artifact set** as reviewed; it does not automatically apply to unnamed future files.
- It is **not sequencing authority**. Approved implementation work is named only in `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.
- It is **not implementation approval**. Alignment with this note does not authorize code changes, scope expansion, or tickets.

**Artifact reviewed:** `docs/ui/hedgr-dashboard-variants.html` — variants labeled **Stable**, **Monitoring**, **Protective**, and **Advanced Details Drawer**.

**Last updated:** 2026-04-11

---

## Purpose

This note exists so future mockup review, design critique, and **candidate-ticket shaping** can distinguish:

- **partially aligned references** (salvageable with explicit replacements)
- **doctrine-risky references** (not valid to evolve forward without structural reset)
- **replace** vs **retire** items
- **carry-forward patterns** consistent with `docs/ops/HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md`

Use it to avoid repeating the same critique cycles and to prevent doctrine-risky elements from being treated as “almost approved” because they look polished.

---

## Authority boundary

| Document | Role |
|----------|------|
| `docs/ops/HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md` | **Governing exploration reference** for this lane (locked positions on anchor, terminology, CTA, `Advanced Details`, score, Atlas). |
| `docs/ops/HEDGR_STATUS.md` **§7** / **§7a** | **Sole** sequencing authority for implementation tickets. |
| **This disposition note** | **Verdict on the current variant artifact**—what to carry forward, replace, or retire. It **does not** replace doctrine, ADRs, or the exploration note. |

---

## Overall disposition

| Group | Verdict |
|-------|---------|
| **Stable**, **Monitoring**, **Protective** | **Partially aligned references** — usable as exploration inputs **only after** applying the **Replace** list; not shippable direction by themselves. |
| **Advanced Details Drawer** (current form) | **Doctrine-risky reference only** — **do not evolve forward**; the drawer content model should be **retired** and rebuilt under the exploration note if disclosure is still needed. |

**Benchmark anchor (unchanged):** **`Portfolio Value`** remains the preferred retail primary anchor. **`Total Treasury`** is **not** preferred retail truth; it may exist only as non-authoritative exploration comparison unless doctrine or governance explicitly changes.

---

## Variant disposition

### Stable

| | |
|--|--|
| **Disposition** | **Partially aligned reference** |
| **Carry forward** | `Within Expected Range` posture headline; overall sequence (anchor → stability → bands → disclosure link); `Conservative Yield` band naming; **no score on primary chrome**; `Advanced details` as a **subordinate** progressive-disclosure **control** (pattern only). |
| **Replace** | Hero `Total Treasury` → benchmark **`Portfolio Value`**; `Capital Shield` row and `PROTECTED` microcopy; `SAFE` / `CAUTION` / `CAPPED` bar labels if they read as operational or game-like chrome; always-on **Withdrawal Availability** prominence unless governed by state-contingency rules (see exploration note). |
| **Retire** | Nothing variant-specific beyond globally **Retired** items if they appear (this variant has **no** drawer score). |

### Monitoring

| | |
|--|--|
| **Disposition** | **Partially aligned reference** |
| **Carry forward** | `Monitoring Volatility`; change-notice pattern; reduced `Conservative Yield` state; **no score on primary chrome**; `Advanced details` link-only pattern. |
| **Replace** | Hero `Total Treasury` → **`Portfolio Value`**; `Capital Shield` / `TIGHTENING`; header `ADJUSTING` if it reads as system operation; notice copy referencing **maintaining capital shield** (shield term + implied system action); withdrawal block default prominence. |
| **Retire** | No drawer score on the Monitoring **base** frame. |

### Protective

| | |
|--|--|
| **Disposition** | **Partially aligned reference** (higher **notice-semantics** risk than Stable/Monitoring) |
| **Carry forward** | `Protective Mode Active`; suspended-yield band treatment; presence of a **notice** in protective context; **no score on primary chrome**. |
| **Replace** | Hero `Total Treasury` → **`Portfolio Value`**; `Capital Shield` / `TIGHTENED`; notice language implying **executed** movement (**reallocated**, **defensive posture**, **capital shield tightened**) — must be reframed to **informational posture** consistent with ADR `0013` / `0014`. |
| **Retire** | Same as Stable/Monitoring for primary chrome; unfixable execution-narrative copy should be **retired** from this lane, not lightly reworded. |

### Advanced Details Drawer

| | |
|--|--|
| **Disposition** | **Doctrine-risky reference only** |
| **Carry forward** | **None** as implemented—the **drawer structure** must not be carried forward with its current semantics. |
| **Replace** | N/A at content level: disclosure should be **reconceptualized from blank** under the exploration note (subordinate explanation / interpretation only). |
| **Retire** | **Score in any form** (including “internal model score”), **rebalance** / **defensive** triggers, numeric thresholds as authority, and **hidden-model-truth** framing. See **Retire list**. |

---

## Carry-forward patterns

Only patterns **consistent** with `HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md`:

- Calm **posture headlines**: e.g. `Within Expected Range`, `Monitoring Volatility`, `Protective Mode Active`
- **`Portfolio Value`** as benchmark primary anchor label (not `Total Treasury` as default)
- **`Conservative Yield`** (retail-legible yield band language)
- **Explanatory notice** blocks that describe **posture and targets**, not executed fund movement
- **Progressive disclosure** (`Advanced details`) when **subordinate** and not a second authority
- **No score** on primary Stability Engine surfaces
- **CTA posture** remains **explanation + bounded review only** (per exploration note); no action-pressure or execution implication

---

## Replace list

| Element | Why it conflicts | Replacement direction |
|---------|------------------|------------------------|
| **`Total Treasury`** (hero label) | Exploration note: **`Portfolio Value` preferred**; `Total Treasury` exploration-only, not preferred retail truth | Default hero to **`Portfolio Value`** for retail benchmark; retain `Total Treasury` only for explicit non-retail or side-by-side exploration, if ever justified |
| **`Capital Shield`** + shield status words | **Rejected** in exploration note: promissory / theatrical protection | Posture-first language without shield metaphor; preserve seriousness without guarantee |
| **Notice phrases** implying executed action (`reallocated`, `maintain capital shield`, `tightened to defensive posture`, etc.) | ADR `0013` / `0014`: shadow accounting and execution-implication risk | Plain-language **informational** framing: what the system is **signaling**, target posture, **no** “money moved” semantics unless future product truth and governance allow |
| **Always-on Withdrawal Availability** block | Exploration note: **`Review withdrawal availability`** only **state-contingent** | Demote, gate, or reframe so withdrawal review is not a permanent primary-surface operational panel without a continuity hook |
| **`SAFE` / `CAUTION` / `CAPPED`** (bar labels) | Can read as system-coded or game-like chrome | Calmer interpretive labels or reduced visual primacy, aligned to posture language |
| **Header badges** (`CONNECTED`, `ADJUSTING`, `SHIELDING`) | Operational / “system doing something” tone | Softer **status** language that does not imply treasury action on user funds |

---

## Retire list

These items should **not** be evolved further in this exploration lane; **rewording is insufficient** where noted.

| Item | Rationale | Violates |
|------|-----------|----------|
| **Score in any form** | False precision, numeric reassurance; gamified score drift | Exploration note (**score removed entirely**); retail UX doctrine; ADR `0016` |
| **`Internal model score`** | Same as score | Same |
| **`Rebalance trigger`** | Automation / control-plane / execution-adjacent semantics | ADR `0014`; exploration note (`Advanced Details` not diagnostics authority) |
| **`Defensive trigger`** | Same | Same |
| **Hidden-model-truth drawer** (score + thresholds as “real” explanation) | Second trust authority | Exploration note (`Advanced Details` subordinate); ADR `0015` / `0016` |
| **Action / execution-like semantics in `Advanced Details`** | Execution leakage from read-only surface | ADR `0014` |

---

## Risks / anti-drift notes

**ADR `0013` — Allocation informational, not accounting**  
Dollar bands and withdrawal rows can read as **ledger partitions**; disposition must preserve **informational** framing.

**ADR `0014` — Read-only, non-executing engine**  
Notice copy and drawer content must not imply **rebalance, routing, or treasury instruction**.

**ADR `0015` — Stability Engine is the system center**  
Persistent **withdrawal** and **treasury** navigation must remain **subordinate** to engine trust expression.

**ADR `0016` — Warmth constrained**  
Avoid operational badges, shield theater, and numeric reassurance as “warmth.”

**Likely drift paths:** score re-entry as “internal only”; CTA or withdrawal blocks as **action pressure**; `Advanced Details` as **operator dashboard**; mockups mistaken for **approved direction**; allocation mistaken for **balances**.

---

## Usage rule

1. **Disposition layer** on top of `HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md`: exploration note = **rules**; this note = **verdict on current HTML/Paper variants**.
2. **Filter** for future updates to `hedgr-dashboard-variants.html` or Paper: apply **Replace** before treating any variant as “clean.”
3. **Precondition** for candidate-ticket shaping: state compliance with **both** the exploration note and this disposition.
4. **Not sequencing authority** — **§7** / **§7a** only.

---

## Closing note

**Alignment with this note does not authorize implementation** and **does not replace** `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**. This disposition is a critique verdict on a specific artifact set, not an ADR and not a ticket brief.
