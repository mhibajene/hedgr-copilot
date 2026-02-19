# AGENTS.md — Hedgr Repo Execution Standard (v1)

Status: Binding (Repo conventions + Cursor execution rules)
Scope: apps/, packages/, scripts/, .github/, docs/

## 1) Purpose
AGENTS.md is the single source of truth for how work is done in this repo:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- Cursor execution standards (incremental + reversible)

If an instruction conflicts with Hedgr doctrine docs, doctrine wins.

## 2) Repo Layout (canonical)
- apps/frontend/  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint v9
- apps/backend/   — Backend service boundary (Flask) — currently scaffold/placeholder
- packages/ui/    — Shared UI library (@hedgr/ui)
- packages/config/— Shared config (future)
- docs/           — Architecture docs, ADRs, scaffolding progress
- scripts/        — CI scripts (trust checks, version guards)
- .github/        — CI workflows, templates

## 3) Non-Negotiables (Hedgr posture)
- Security & trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.

## 4) Required CI Checks (branch protection)
- validate
- E2E smoke (@hedgr/frontend)

(Workflow names must remain stable once enforced.)

## 5) Environment Flags (defaults are CI-safe)
Frontend:
- NEXT_PUBLIC_AUTH_MODE=mock        # mock | magic (magic local-only)
- NEXT_PUBLIC_FX_MODE=stub          # stub | live (live local-only; never CI)
- NEXT_PUBLIC_MARKET_MODE=manual
- NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5050  # set in e2e workflow

Backend:
- STUB_MODE=true                    # true in CI/E2E

AI:
- OPENAI_MODE=stub                  # unchanged: no live calls in CI

## 6) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and data-testid; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).

## 7) Cursor Execution Rules (required)
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add/extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under docs/ using the HedgrOps ADR standard.
Examples: architecture boundary, custody/trust posture, compliance posture, sequencing decisions.
