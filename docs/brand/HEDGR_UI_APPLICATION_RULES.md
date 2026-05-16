# Hedgr UI Application Rules

Status: Brand-facing UI governance rules

## Purpose

This document defines how approved brand authority applies to UI work. It does not approve runtime UI changes or theme wiring.

## Required Inputs

Before brand-facing UI implementation, read:

1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. `DESIGN.md`
4. `assets/brand/README.md`
5. applicable `docs/brand/**` rules
6. Brand Guidelines PDF when present in governed repo assets or attached review materials

If the work touches Stability Engine trust surfaces, follow the additional governing references named in `AGENTS.md` and `docs/ops/HEDGR_STATUS.md`.

## Application Rules

- Use approved `DESIGN.md` tokens only.
- Use approved assets from `assets/brand/` only.
- Treat `assets/brand/README.md` as the asset inventory and usage reference.
- Preserve existing repo typography unless governed brand authority approves a typography system change.
- Preserve Hedgr's calm, institutional, trust-first UX posture.
- Keep brand application functional and legible rather than decorative.
- Maintain WCAG AA contrast expectations for brand-facing UI.
- Keep implementation incremental, reversible, and scoped to the approved ticket.

## AI Generation Constraints

AI-assisted UI work must remain subordinate to approved brand authority.

AI-generated UI must not:

- invent tokens
- invent typography
- invent logo variants
- regenerate missing assets
- substitute unapproved marks
- add decorative crypto aesthetics
- add speculative fintech styling
- add gradients, glows, or dopamine-driven visual patterns
- imply product, trust, custody, execution, or Stability Engine posture changes through visual treatment

## Missing or Conflicting Authority

If an asset, token, or typography rule is missing or conflicting, record the gap and stop. Do not fill the gap through design inference, generated variants, or implementation convenience.

## Runtime Boundary

Documentation in `docs/brand/**` is governance guidance only. Runtime UI changes, frontend theme wiring, package changes, validation tooling, or CI changes require a separate scoped ticket and explicit `§7` / `§7a` authority.
