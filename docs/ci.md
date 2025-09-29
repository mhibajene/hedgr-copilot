# CI Overview

## Checks
- validate → unit, typecheck, lint
- E2E smoke (@hedgr/frontend) → Playwright against prod build

## Fork Safety
- Fork PRs run validate only; no secrets; analytics disabled via network block.

## Determinism
- Corepack + repo‑pinned pnpm; `pnpm -r install --frozen-lockfile`.

## Commands
pnpm run validate
pnpm --filter @hedgr/frontend exec playwright install
pnpm --filter @hedgr/frontend run e2e:ci
