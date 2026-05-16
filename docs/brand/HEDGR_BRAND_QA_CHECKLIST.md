# Hedgr Brand QA Checklist

Status: Brand governance review checklist

Use this checklist for brand-facing documentation, UI, asset, and AI-assisted implementation reviews. It is a review aid, not independent execution authority.

## Authority

- [ ] `DESIGN.md` was referenced as the machine-readable brand authority.
- [ ] Brand Guidelines PDF was referenced when present in governed repo assets or attached review materials.
- [ ] `assets/brand/README.md` was referenced as the governed asset inventory and usage reference.
- [ ] No competing brand authority layer was created.
- [ ] Any conflict between sources was surfaced rather than silently reconciled.

## Tokens and Typography

- [ ] Approved `DESIGN.md` color tokens only are used.
- [ ] No token values were changed.
- [ ] No unofficial palette, shade ramp, gradient, glow, or speculative accent system was introduced.
- [ ] Typography follows existing repo conventions or governed brand authority.
- [ ] No unapproved typefaces or expressive display treatments were introduced.

## Assets

- [ ] Approved assets are sourced from `assets/brand/`.
- [ ] Missing assets are recorded as missing governance inputs.
- [ ] Missing assets were not regenerated, substituted, recolored, cropped, remixed, or AI-reinterpreted.
- [ ] Logo and icon proportions, colors, clear space, and variants are preserved.
- [ ] Light / dark asset selection matches the background context.

## UI Posture

- [ ] Brand-facing UI preserves calm, institutional, trust-first posture.
- [ ] Visual treatment does not imply execution, custody, ledger truth, Stability Engine posture changes, or product authority changes.
- [ ] WCAG AA contrast was considered for brand-facing surfaces.
- [ ] No decorative crypto styling, hype visuals, urgency mechanics, or dopamine-driven visuals were introduced.

## Scope

- [ ] The change stays within the approved ticket scope.
- [ ] No `apps/`, `packages/`, backend, frontend runtime UI, theme wiring, CI tooling, or ADR status changes were made unless explicitly authorized.
- [ ] Validation matches the scope and changed files.
- [ ] `docs/ops/HEDGR_STATUS.md` preserves `§7` / `§7a` sequencing discipline where status is updated.
