# Hedgr Design Tokens

Status: Brand token governance rules

## Authority

`DESIGN.md` is the machine-readable authority for brand tokens. This document explains governance expectations for token use; it does not change token values.

## Approved Color Tokens

The approved color tokens are the tokens defined in `DESIGN.md`:

| Token | Value |
| ----- | ----- |
| `primary` | `#1F2747` |
| `dark` | `#1F2937` |
| `white` | `#FFFFFF` |
| `color-800` | `#171D35` |
| `color-700` | `#1F2747` |
| `color-600` | `#36447C` |
| `color-500` | `#4658A0` |
| `color-400` | `#5F71B9` |
| `color-300` | `#8391C9` |
| `color-200` | `#A6B0D8` |
| `color-100` | `#CAD0E8` |

Do not modify token values in downstream docs, UI code, prompts, generated UI, or theme files without governance approval.

## Component Token References

`DESIGN.md` defines button token references for:

- `button-primary`
- `button-primary-hover`
- `button-secondary`
- `button-secondary-hover`

These references define color relationships only. They do not approve padding, radius, typography, motion, or layout changes.

## Typography Authority

Typography may only be expanded or changed when a governed brand authority explicitly defines the approved stack. Until then, implementation must use existing repo typography conventions and must not invent a new brand typography system.

AI-generated UI must not introduce unapproved typefaces, display styles, or expressive typography treatments.

## Accessibility

Brand token use must consider WCAG AA contrast. `DESIGN.md` records contrast expectations but does not certify every possible token pair.

Reviewers should check contrast for any brand-facing UI change. Brand treatment must remain legible, calm, and trust-first.

## Prohibited Token Drift

Do not introduce:

- non-token palettes
- unofficial shade ramps
- decorative gradients
- glow systems
- speculative fintech accent colors
- crypto hype color treatments
- theme rewrites under a brand-governance ticket

Any future token-to-theme mapping requires a separate scoped ticket.
