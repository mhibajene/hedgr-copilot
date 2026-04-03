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

### Engine-facing governance (Sprint 2 Stability Engine)

When changing **`apps/frontend/lib/engine/**`** or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read **in order**:

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under docs/ using the HedgrOps ADR standard.
Examples: architecture boundary, custody/trust posture, compliance posture, sequencing decisions.

# AGENTS.md — Hedgr Repo Execution Standard (v2)

Status: Binding (Repo workflow, engineering conventions, CI posture)
Scope: apps/, packages/, scripts/, .github/, docs/

## 1) Purpose
AGENTS.md defines how work is executed in this repo:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- implementation workflow conventions

For doctrine, architecture, product/system invariants, and anti-drift rules, `.cursorrules` is the governing authority.

For patch execution discipline, `.cursor/rules.md` applies.

## 2) Repo Layout (canonical)
- apps/frontend/  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint
- apps/backend/   — Flask backend service boundary; currently limited in scope but part of the canonical system structure
- packages/ui/    — Shared UI library (`@hedgr/ui`)
- packages/config/— Shared config surface (future)
- docs/           — Doctrine, ADRs, architecture, contracts, copilot, ops, and scaffolding records
- scripts/        — CI and repo guard scripts (trust checks, workflow guards, validation)
- .github/        — CI workflows, templates, automation

## 3) Non-Negotiables
- Security and trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.
- Respect current sprint posture and implementation boundaries.

## 4) Required CI Checks (branch protection)
- validate
- E2E smoke (@hedgr/frontend)

(Workflow names must remain stable once enforced.)

## 5) Environment Flags (defaults are CI-safe)

Frontend:
- NEXT_PUBLIC_AUTH_MODE=mock
- NEXT_PUBLIC_FX_MODE=stub
- NEXT_PUBLIC_MARKET_MODE=manual
- NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
- NEXT_PUBLIC_API_BASE_URL=http://localhost:5050

Backend:
- STUB_MODE=true

AI:
- OPENAI_MODE=stub

## 6) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and `data-testid`; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).
- Behavior changes should ship with corresponding test updates unless explicitly waived.

## 7) Execution Rules
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add or extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.
- Do not violate `.cursorrules` or current ADR constraints for implementation convenience.

### Engine-facing governance (Sprint 2 Stability Engine)

When changing **`apps/frontend/lib/engine/**`** or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read **in order**:

1. `docs/ops/HEDGR_STATUS.md` — **§7** / **§7a** for the approved next ticket (when named); **§6b** is Transition Readiness taxonomy only, not sequencing authority
2. `docs/decisions/SPRINT-2-ADR-INDEX.md`
3. `docs/decisions/0015-stability-engine-is-the-system-center.md`
4. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
5. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to §7 / §7a): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly (do not silently reconcile).

## 8) Decision Logging (ADR)
Material decisions must be logged as ADRs under `docs/decisions/` using:
`docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

Examples:
- architecture boundaries
- custody and trust posture
- compliance posture
- sequencing decisions
- policy or engine control changes

## Cursor Cloud specific instructions

### Services overview

| Service | Command | Port | Notes |
|---|---|---|---|
| Frontend (Next.js) | `pnpm --filter @hedgr/frontend dev` | 3000 | Requires env vars below |
| Backend (Flask) | `source apps/backend/.venv/bin/activate && STUB_MODE=true PORT=5050 python -m src.app` | 5050 | Always use `STUB_MODE=true` in dev/CI |

### Required environment variables for frontend dev server

```
NEXT_PUBLIC_AUTH_MODE=mock
NEXT_PUBLIC_FX_MODE=stub
NEXT_PUBLIC_MARKET_MODE=manual
NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
NEXT_PUBLIC_APP_ENV=dev
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true
```

Set these as env vars when launching the frontend dev server.

### Node version

The repo requires Node 20 (pinned in `.nvmrc`). Use `nvm use 20` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.

### pnpm setup

Activated via Corepack: `corepack enable && corepack install`. The pinned version is pnpm 9.12.0 (see `package.json` `packageManager` field).

### Build order

`@hedgr/ui` must be built before the frontend can start: `pnpm run build:ui`.

### Validation commands

See `README.md` — quick reference:
- `pnpm -w lint` — ESLint
- `pnpm -w test` — Vitest (632 unit tests)
- `pnpm -w typecheck` — TypeScript check
- `pnpm run validate` — all of the above plus trust checks

### E2E tests (Playwright)

- `pnpm --filter @hedgr/frontend run e2e` — run against a running dev server (reuses existing server)
- `pnpm --filter @hedgr/frontend run e2e:ci` — production build + Playwright (used in CI)
- Copilot-related E2E tests (`chat-safety.spec.ts`) require `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true` at **build time** — they will fail against the dev server because Next.js inlines `NEXT_PUBLIC_*` vars at build, not runtime. This is expected; CI uses `e2e:ci` which builds first. Run `e2e:ci` for full E2E parity with CI.

### Backend (Flask)

Python venv lives at `apps/backend/.venv`. Activate it before running backend commands. Backend tests: `cd apps/backend && source .venv/bin/activate && pytest`.