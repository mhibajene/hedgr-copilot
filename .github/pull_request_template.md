<!--
This PR template is a self-attestation.
CI, branch protection, and Codex QA remain the final authority.
Unchecked or inaccurate items may block merge.
-->

## Summary
<!-- 1–3 lines. What changed and why. Link CONTRACT / micro-contract if applicable. -->

## Scope
**In**
- 

**Out**
- 

## Acceptance Criteria (Gherkin)
- [ ] Given … When … Then …

---

## Tests (author attestation)
- [ ] Unit tests added/updated where logic changed
- [ ] E2E updated/added if user flows or critical paths changed

> Note: CI enforces test execution. This section confirms *intent and coverage*, not pass/fail.

---

## Merge Gates (system-enforced)
**Required checks**
- validate (unit, typecheck, lint)
- E2E smoke (@hedgr/frontend)

**Required labels**
- `product:approved` (HedgrOps)
- `qa:approved` (Codex QA)
- one `area:*`
- one `risk:*`

---

## Rollback Strategy
<!-- How can this be safely undone? -->
- [ ] Single revert commit
- [ ] Flag flip back to defaults (`mock` / `fixed`)
- [ ] No irreversible data migration

---

## Security & Trust (non-negotiable)
- [ ] No secrets introduced or exercised in CI
- [ ] Analytics and live networks blocked in tests
- [ ] Server-only secrets remain server-only

---

## PR Checklist (prevent CI footguns)

### Routing & Architecture
- [ ] No duplicate routes across `pages/*` and `app/*`
- [ ] New routes follow the repo’s current routing convention

### Flags & Environments
- [ ] CI defaults unchanged (`AUTH_MODE=mock`, `FX_MODE=fixed`, `DEFI_MODE=mock`)
- [ ] Live providers (Magic, CoinGecko, Aave) are **flag-guarded** and local-only
- [ ] No code path can accidentally hit live services in CI/E2E

### Tests & State
- [ ] Browser-dependent tests explicitly use `jsdom`
- [ ] Zustand persistence tests rely on deterministic storage
- [ ] No reliance on real time, real network, or implicit globals

### E2E (Playwright)
- [ ] Locators use **roles or `data-testid`**
- [ ] No ambiguous `getByText()` in strict mode
- [ ] E2E remains hermetic and deterministic

### Build & Determinism
- [ ] Local verification run:
  ```bash
  pnpm -w build
  pnpm -w test
  pnpm --filter @hedgr/frontend run e2e:ci