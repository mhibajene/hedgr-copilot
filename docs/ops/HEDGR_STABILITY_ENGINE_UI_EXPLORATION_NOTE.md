# Hedgr Stability Engine UI Exploration Note

## Status

This document is a **governance reference note** for Stability Engine **retail UI exploration and critique**. It records a stable exploration frame so mockup review and design discussion do not reopen already-settled positions.

- It is an **exploration / critique source of truth** within its stated scope.
- It is **not sequencing authority**. Approved implementation work is named only in `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.
- It is **not implementation approval**. Alignment with this note does not authorize code changes, tickets, or scope expansion.
- It is **subordinate** to existing doctrine (including `.cursorrules` and `docs/doctrine/*` where applicable), to accepted ADRs, and to `HEDGR_STATUS.md`.

**Last updated:** 2026-04-11

---

## Purpose

This note exists so teams have a **single repo-native reference** for:

- retail anchor and terminology direction
- CTA doctrine on primary Stability Engine surfaces
- `Advanced Details` philosophy and content boundaries
- score elimination from exploration
- Atlas subordination relative to UI findings

Use it to **short-circuit repeated governance debate** during mockup critique and exploratory design, without replacing ADRs, doctrine, or `§7` discipline.

---

## Authority boundary

| Layer | Role |
|--------|------|
| Doctrine and constitutional surfaces | Highest precedence for product and trust invariants (see `.cursorrules` precedence order). |
| Accepted ADRs under `docs/decisions/` | Bind **what implementations must not violate** (e.g. ADR 0013–0016). ADRs **do not** sequence work by themselves. |
| `docs/ops/HEDGR_STATUS.md` **§7** / **§7a** | **Sole** repo authority for **approved next implementation ticket** and active execution brief when one exists. |
| **This note** | Governs **critique and exploration framing** for Stability Engine retail UI exploration only. |

Explicit rules:

- **ADRs and repo doctrine remain binding.** This note does not override them.
- **`HEDGR_STATUS.md` §7 / §7a remain the only sequencing authority** for implementation tickets (per `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`).
- **Paper mockups and external boards are exploration input**, not product truth and not repo authority.

---

## Locked positions

### Retail primary anchor

| Position | Detail |
|----------|--------|
| **Preferred** | **`Portfolio Value`** as the retail primary dashboard anchor—user-grounded, low abstraction, aligned with binding retail UX hierarchy (Portfolio Value → Stability Status → allocation framing). |
| **Exploration-only, not preferred** | **`Total Treasury`** may appear in exploration for tone or layout comparison; it is **not** the preferred primary anchor (higher abstraction, more system-aggregate feel). |

### Terminology direction

**Terms to keep (directional):**

- `Portfolio Value`
- `Within Expected Range`
- `Monitoring Volatility`
- `Protective Mode Active`
- `Conservative Yield`

**Terms to replace:**

- `WATCH`, `DEFENSIVE` — replace with calmer, legible posture language where meaning is preserved.
- `Yield Provision` — prefer clearer retail language (e.g. `Conservative Yield`) where aligned to doctrine.

**Terms to keep in exploration only:**

- `Total Treasury` — not preferred as primary anchor; optional comparison only.

**Terms to reject (doctrine-risky or misleading):**

- `Stability Score` — numeric reassurance / gamified-score drift; conflicts with retail UX doctrine on numeric gamified scores and ADR 0016 constraints on numeric stability scoring.
- `Capital Shield` — visually strong but semantically promissory or theatrical; risks overstating protection.

### CTA doctrine

**Primary-surface CTA philosophy:** **Explanation + bounded review only.**

CTAs on the primary Stability Engine surface may help users **understand**, **interpret**, or **review** what is already signaled. They must not pressure action, imply execution, or substitute for posture/notice as the trust anchor.

**CTA category boundaries:**

| Category | Position |
|----------|----------|
| Explanation | **Preferred** |
| Interpretation | **Preferred** |
| Progressive disclosure | **Allowed but secondary** (subordinate to posture/notice) |
| Bounded review | **State-contingent only** |
| Calm navigational CTA | **Allowed but secondary** when contextually subordinate |
| Action-oriented CTA (optimize, move now, activate, etc.) | **Reject in current posture** |

**Also reject:** urgency CTAs, deposit-pressure CTAs, yield-maximizing CTAs, anything implying hidden execution, automatic optimization, or directive finance.

**`Review withdrawal availability` — state-contingent rule:**

- **Not** a default primary-surface CTA for routine “within expected range” states when no continuity hook exists.
- **Allowed only when state-contingent:** withdrawal **continuity, friction, or exception** context makes availability **directly relevant** to what the user is already seeing.

### Advanced Details

**Philosophy and purpose:** A **subordinate explanation / interpretation layer**—deepens understanding of what the main surface already shows. It is **not** a second trust authority, not an operator console, and not where “the real story” lives behind the hero.

**Allowed content:**

- Plain-language explanation of current posture
- Plain-language meaning of terms (e.g. protective mode)
- Relevant warnings and disclaimers
- Bounded plain-language rationale

**Cautiously allowed content:**

- Why visible **posture** or targets shifted (informational framing only—not “funds moved” or settled allocation history)
- High-level trigger framing without raw operator semantics
- Non-ledger-like historical **signals** only if clearly informational
- Withdrawal **continuity interpretation** only when contextually relevant

**Rejected content:**

- **Model score** (see Score section)
- Raw model inputs/thresholds presented as authority
- Ledger-like or execution-like narratives
- Dense diagnostics that outrank the main surface
- Pseudo-history of “what the engine executed”

### Score

**Score is removed entirely from exploration** for the Stability Engine retail dashboard: **no** hero metric, **no** persistent secondary trust signal, **no** `Advanced Details` carve-out. Rationale: false precision, numeric reassurance, and conflict with retail UX doctrine and ADR 0016.

### Atlas

**Atlas remains subordinate, conceptual, and downstream of UI findings.** It is not the center of Stability Engine retail critique in this frame, not a workflow or automation layer here, and not a substitute for engine trust expression. Any future Atlas concept inherits only from UI patterns that already respect doctrine and this note.

---

## Open questions

Intentionally unresolved (for later human governance, not implied by this note):

- Exact **state rules** that qualify a screen for state-contingent `Review withdrawal availability` (when enumerated against real product states).
- **Disclosure control labeling** (`Advanced Details` vs alternatives such as model-oriented labels)—semantic role is locked; wording may still vary.
- **Warmth ceiling:** how far presentation refinement can go before seriousness or authority weakens (qualitative guardrail).

---

## Risks / anti-drift notes

**ADR 0013 — Allocation informational, not accounting**

- Risk: bands, copy, or `Advanced Details` imply balances, executed allocation, or settled truth.

**ADR 0014 — Read-only, non-executing engine**

- Risk: CTA or copy implies rebalancing, routing, automation, or treasury instruction from the engine surface.

**ADR 0015 — Stability Engine is the system center**

- Risk: wallet-led CTAs, conversion-first surfaces, or Atlas-led framing displace engine trust expression.

**ADR 0016 — Warmth constrained; no execution theater**

- Risk: warmth justifies action strips, urgency, numeric reassurance, or language that obscures risk.

**Common drift paths:**

- Score re-entry as “internal only” or in `Advanced Details`
- CTA becoming action pressure or primary visual competition with posture
- `Advanced Details` becoming a second authority or operator dashboard
- Mockups treated as approved product direction
- Widening into backend, runtime policy, Copilot binding, ledger semantics, or automation without explicit `§7` / doctrine process

---

## Usage rule

1. **Critique checklist for Paper mockups:** verify anchor, terminology, CTA class, `Advanced Details` content, and **absence of score**.
2. **Governance filter for future exploration:** new concepts must not violate locked positions without explicit doctrine review and `HEDGR_STATUS.md` **§7** process when moving to implementation—not ad hoc in design critique.
3. **Precondition input for candidate-ticket shaping:** proposals should state compliance with this frame; ADRs constrain boundaries; **§7** sequences.

---

## Closing note

**Alignment with this note does not authorize implementation** and **does not replace** `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**. This note is a critique and exploration reference only; it is not an ADR and not a ticket brief.
