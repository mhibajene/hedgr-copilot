# Summary
- What does this PR change and why?

## Screenshots / Recordings
- UI changes: include before/after or short Loom.

## How to Test
- [ ] Start app locally: `pnpm run dev:cli` or `pnpm run dev:docker`
- [ ] Hit `/api/health` -> `200 {"status":"ok","ts":"..."}`
- [ ] Hit `/api/version` -> `200 {"version":"<pkg.version>"}`
- [ ] (If observability touched) Confirm analytics remain **off by default**; enable in dev by setting keys in Doppler.

## Risk / Rollback
- Risks introduced + blast radius
- Rollback plan (revert PR, config flags, etc.)

## Acceptance Checklist
- [ ] **Fork-safe CI** job passes
- [ ] **Env validation** passes (Doppler: `dev_config_dev` / `stg_config_stg`)
- [ ] Tests green: `pnpm -w test`
- [ ] Typecheck: `pnpm -w typecheck`
- [ ] Lint: `pnpm -w lint`
- [ ] No `.env*` files in git; **Doppler is source of truth**
- [ ] Secrets not hardcoded; sensitive logs avoided
- [ ] Docs updated (e.g., `docs/secrets.md`, `docs/observability.md`, `README.md`) as needed
- [ ] Health endpoints behave as expected
- [ ] Observability gated: dev-only and key-present; **no PII**
- [ ] QA checklist reviewed (see `docs/qa-checklist.md`)
