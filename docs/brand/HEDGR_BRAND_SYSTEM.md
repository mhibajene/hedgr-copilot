# Hedgr Brand System

Status: Canonical brand governance spine

## Purpose

The Hedgr brand system is governed infrastructure, not marketing decoration. It exists to keep brand-facing implementation consistent, calm, accessible, and subordinate to repo-native governance.

This document defines the authority model for brand system work. It does not approve runtime UI changes, token changes, asset generation, theme wiring, or visual redesign.

## Authority Model

- `DESIGN.md` is the machine-readable brand authority for approved tokens, component token references, and named brand assets.
- Brand Guidelines PDF is the human-readable brand authority when present in governed repo assets or attached review materials.
- `assets/brand/README.md` is the governed asset inventory and usage reference.
- `docs/brand/**` documents governance rules, review expectations, and anti-drift constraints. It does not supersede `DESIGN.md`, the Brand Guidelines PDF, `assets/brand/README.md`, `AGENTS.md`, `docs/ops/HEDGR_STATUS.md`, accepted ADRs, or repo doctrine.

If these sources conflict, stop and surface the conflict. Do not silently reconcile or reinterpret brand behavior.

## Governing Principles

- Brand changes require governance approval.
- Brand-facing UI must preserve Hedgr's calm, institutional, trust-first posture.
- Brand implementation must use approved tokens, typography, and assets only.
- Machine-readable authority must not silently diverge from governed asset inventory.
- Missing assets must be recorded as missing governance inputs, not regenerated or substituted.
- AI-generated UI must remain subordinate to approved brand authority.

## Prohibited Drift

Do not introduce:

- unofficial palette expansion
- regenerated or AI-reinterpreted logos, icons, favicons, avatars, or social assets
- speculative fintech aesthetics
- decorative crypto styling
- arbitrary gradients, glows, shadows, strokes, or visual hype patterns
- dopamine-driven urgency visuals
- runtime behavior changes through brand governance documents

## Change Discipline

Brand work must state its authority basis, exact files touched, and validation performed. Documentation-only brand work may define rules and inventory. Implementation work requires a separate scoped ticket before touching runtime UI, frontend theme architecture, packages, or asset-processing logic.
