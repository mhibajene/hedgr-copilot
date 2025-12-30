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


## Known CI Footguns (Read Before Debugging)

This section documents **recurring CI failure patterns specific to this repo**.
If CI fails unexpectedly, check here first.

### 1. Duplicate Routes (Pages vs App Router)
**Symptom**
- Next.js build error: *“Conflicting app and page file was found”*

**Cause**
- Same route defined in both `pages/*` and `app/*` (e.g. `/login`, `/api/*`).

**Fix**
- Choose one router per path.
- Delete the duplicate file; do not “disable” it.

---

### 2. Live Providers Executed in CI
**Symptom**
- CI hangs, network errors, flaky E2E.

**Cause**
- Magic / CoinGecko / Aave code path executed without flag guard.

**Fix**
- CI defaults must remain:
  - `AUTH_MODE=mock`
  - `FX_MODE=fixed`
  - `DEFI_MODE=mock`
- Guard providers with explicit env checks.

---

### 3. Webpack “Module not found” from Nested Providers
**Symptom**
- Build fails with relative import errors.

**Cause**
- Incorrect relative paths from deeply nested folders (e.g. `lib/fx/providers/*`).

**Fix**
- Verify paths manually (`../../fx`, not `../fx`).
- Prefer reducing cross-module imports inside providers.

---

### 4. Vitest: `window is not defined`
**Symptom**
- Unit tests fail in CI but pass locally.

**Cause**
- Browser-dependent code (Zustand persist, localStorage) running in Node env.

**Fix**
- Add `// @vitest-environment jsdom` to the test file.
- Use jsdom’s built-in `window.localStorage`.

---

### 5. Zustand Persist Tests Don’t Rehydrate
**Symptom**
- Persistence test reads `null` from localStorage.

**Cause**
- Store imported before localStorage is initialized/mocked.

**Fix**
- Prefer jsdom’s real localStorage.
- Clear storage in `beforeEach`.
- Avoid mocking storage after store import.

---

### 6. Playwright Strict Mode Violations
**Symptom**
- Error: *“strict mode violation: locator resolved to 2 elements”*

**Cause**
- `getByText()` matching both nav items and page headings.

**Fix**
- Use role-based locators:
  - `getByRole('heading', { name })`
  - `getByRole('link', { name })`

---

### 7. CI Passes Locally but Fails on PR
**Symptom**
- CI still reports old errors after a “fix”.

**Cause**
- Fix not committed or pushed to PR branch.

**Fix**
- Verify with:
  ```bash
  git grep "<offending code>"
  git show HEAD:<file>

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

---