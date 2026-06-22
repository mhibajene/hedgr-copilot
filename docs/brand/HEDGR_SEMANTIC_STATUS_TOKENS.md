# Hedgr Semantic Status Tokens

Status: Brand governance semantic-token definition

## Purpose

This document defines governed semantic status-token roles for Hedgr brand-facing surfaces. It implements `BRAND-006-FU-001` as a documentation-only prerequisite so later UI remediation can normalize status styling without raw palette drift.

This document does not approve shipped UI changes, shared UI changes, token mass-conversion, theme rewrites, new palette values, runtime semantics, product state changes, or Stability Engine posture changes.

## Authority

- `DESIGN.md` is the machine-readable authority for approved color tokens and semantic status aliases.
- `docs/brand/HEDGR_DESIGN_TOKENS.md` is the token-governance reference.
- `docs/brand/HEDGR_BRAND_UI_RECONCILIATION_AUDIT.md` records the audit finding that made semantic status-token definition the first remediation prerequisite.
- `docs/ops/HEDGR_STATUS.md` `§7` / `§7a` remains the sequencing authority for implementation work.

If these sources conflict, stop and surface the conflict. Do not resolve it through visual inference.

## Semantic Roles

Semantic status tokens describe communication intent. They are not product state machines, execution states, accounting truth, custody truth, ledger truth, or policy output.

| Semantic role | Meaning | Governed mapping | Usage boundary |
| --- | --- | --- | --- |
| `info` | Neutral operational context, availability notes, or explanatory status that does not indicate success, failure, risk, or warning. | `semanticStatus.info` | Use for informational banners, helper text, and low-risk system notices. |
| `success` | Completed, available, or accepted status where the underlying product truth is already explicit and non-financially misleading. | `semanticStatus.success` | Use only when the source state is already confirmed by existing application logic. Do not use to imply funds moved, deposits settled, yield increased, or risk decreased. |
| `warning` | Attention-needed status, degraded condition, pending review, or reversible caution. | `semanticStatus.warning` | Pair with plain-language explanation. Do not use urgency framing, countdowns, hype, or pressure to act. |
| `error` | Failed, blocked, unavailable, invalid, or unresolved status that requires clear next-step framing. | `semanticStatus.error` | Use calm language and recovery paths. Do not imply irreversible loss unless an authoritative source actually says so. |
| `neutral` | Default, inactive, historical, metadata, or low-emphasis state. | `semanticStatus.neutral` | Use when no risk, success, warning, or trust-disclosure meaning should be inferred. |
| `focus` | Keyboard focus or active-control visibility. | `semanticStatus.focus` | Use only for accessibility affordances. Do not repurpose as decorative emphasis. |
| `disabled` | Unavailable or intentionally inactive controls and fields. | `semanticStatus.disabled` | Disabled treatment must remain legible and must not hide required context. |
| `trust-disclosure` | Explicit trust, boundary, risk, limitation, or non-authority disclosure. | `semanticStatus.trust-disclosure` | Use for disclosures that distinguish advisory, informational, mock, non-ledger, non-accounting, non-custody, or non-execution meaning from generic status messaging. |

## Mapping Discipline

- Use the `semanticStatus` aliases in `DESIGN.md` before selecting raw color tokens for brand-facing status surfaces.
- Semantic aliases may reference only existing governed `DESIGN.md` color tokens.
- Do not introduce red, green, yellow, amber, orange, purple, glow, gradient, or speculative accent palettes under this governance artifact.
- Do not encode status meaning by hue alone; use plain text, labels, structure, icons where already governed, and accessible state names.
- Check WCAG AA contrast for any rendered pairing before implementation.
- If a conventional severity hue is required for accessibility or product clarity, stop and open a separate `§7` / `§7a` ticket for governed palette expansion. Do not use raw Tailwind palette utilities as a shortcut.

## Raw Palette Utility Prohibitions

On brand-facing surfaces, do not use raw palette utilities such as:

- `text-red-*`, `bg-red-*`, `border-red-*`
- `text-green-*`, `bg-green-*`, `border-green-*`
- `text-yellow-*`, `bg-yellow-*`, `border-yellow-*`
- `text-orange-*`, `bg-orange-*`, `border-orange-*`
- ungoverned custom hex values for status meaning

Existing legacy usage inventoried by `BRAND-006` is not approved by this document. It remains migration input for future scoped remediation tickets.

## Trust-Disclosure Rules

`trust-disclosure` is separate from generic `info`, `warning`, and `error` because Hedgr must distinguish product truth from explanatory or advisory surfaces.

Use `trust-disclosure` when copy communicates:

- informational targets rather than ledger truth
- advisory output rather than directives
- mock, stub, local-only, or prototype boundaries
- custody, rail, withdrawal, liquidity, or reconciliation limitations
- non-execution, non-accounting, or non-policy-authoritative framing

Do not use generic success or warning treatment when a disclosure is really about authority, fund movement, ledger truth, or risk visibility.

## Non-Authorization

This definition is prerequisite governance only.

It does not authorize:

- editing `apps/`, `packages/`, backend, CI, or tests
- migrating shipped UI to semantic tokens
- modifying shared UI components
- changing `DESIGN.md` color values
- adding palette values
- changing Stability Engine posture, notice, allocation, mock, or simulator surfaces
- closing `BRAND-006-FU-002` through `BRAND-006-FU-006`

Any implementation or migration must be separately named in `docs/ops/HEDGR_STATUS.md` `§7` with a bounded `§7a` brief.
