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

---

## Sprint 0.7 Runbook Delta (SSoT)

### What Changed
- **Flags-first integrations:** Real providers (Magic, CoinGecko, Aave) are always **behind flags**.
  - CI defaults remain **mock / fixed** and must never exercise live networks.
- **Routing guardrail:** Avoid duplicate routes across **Pages** and **App** routers.
  - Do **not** define the same path (e.g. `/login`, `/api/*`) in both `pages/*` and `app/*`.
- **E2E stability:** Playwright runs in **strict mode**.
  - Prefer **role-based locators** (`getByRole`) or `data-testid`.
  - Avoid ambiguous `getByText()` for headings or nav items.
- **Persistence tests:** Zustand `persist` tests run in **jsdom**.
  - Use jsdom's built-in `window.localStorage`; clear between tests.
- **Provider isolation:** Server-only providers must be guarded and isolated.
  - No live calls in CI/E2E; mock providers in unit tests.

### Required Checks (unchanged)
- `validate` → unit, typecheck, lint
- `E2E smoke (@hedgr/frontend)` → Playwright against prod build

### CI Defaults (must not change)
- `NEXT_PUBLIC_AUTH_MODE=mock`
- `NEXT_PUBLIC_FX_MODE=fixed`
- `NEXT_PUBLIC_DEFI_MODE=mock`

### E2E Locator Guidance
- Prefer:
  - `getByRole('heading', { name: 'Activity' })`
  - `getByRole('link', { name: 'Activity' })`
- Avoid:
  - `getByText('Activity')` (ambiguous in strict mode)

### Troubleshooting
- **Next.js build fails with route conflicts:** Check for duplicate paths across routers and remove one.
- **Webpack module not found:** Verify relative imports from nested provider folders.
- **Vitest `window is not defined`:** Add `// @vitest-environment jsdom` to browser-state tests.
- **Playwright strict violations:** Replace text locators with role-based selectors.

### Rollback
- Revert the last commit or flip flags back to defaults (`mock` / `fixed`).
