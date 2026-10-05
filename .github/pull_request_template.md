<!--
This PR template is a self-attestation.
Governing merge procedure: AGENTS.md (standing PR invariant) and docs/ops/runbook.md → PR Posture.
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
**Required checks** (`main`, including admins; see AGENTS.md and runbook PR Posture)
- `validate`
- `E2E smoke (@hedgr/frontend)`
- `hedgr/verifier`

**Independent verifier**
- [ ] Independent verifier PASS on the exact current head SHA (`Hedgr-Verifier:` attestation in runbook form)
- Any subsequent commit invalidates the previous PASS and returns the PR to verification-required state.

**Draft handling**
- Implementers open the PR as draft.
- Implementers never change draft state.

Satisfying merge gates authorises repository merge only. It does not widen ticket authority or imply launch/release approval.

---

## Descriptive metadata only, not merge authority
`product:approved`, `qa:approved`, one `area:*`, and one `risk:*` are descriptive metadata only. They are never merge authority, ticket authority, or release/launch authority. Labels are not consulted by the verifier gate.

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

## Brand System Governance (if brand-facing)
Use for changes touching brand-facing UI, assets, visual tokens, typography, AI-generated UI, or brand-governed documentation. Subordinate to `AGENTS.md`, `docs/ops/HEDGR_STATUS.md`, `DESIGN.md`, `assets/brand/README.md`, and `docs/brand/**`.

- [ ] `DESIGN.md` referenced for machine-readable brand authority
- [ ] Approved tokens only; no unauthorized token expansion or silent divergence
- [ ] Approved typography only; no speculative decorative typography
- [ ] Approved assets only; no regenerated logos, unofficial variants, or AI-reinterpreted marks
- [ ] Light / dark asset usage follows governed guidance
- [ ] WCAG AA contrast considered for brand-facing surfaces
- [ ] Calm institutional UX posture preserved
- [ ] No unapproved gradients, glows, shadows, speculative crypto styling, or dopamine-oriented visuals
- [ ] AI-generated UI remains subordinate to governed brand authority

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
  ```
