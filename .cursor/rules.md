# Hedgr Cursor Rules (Guardrails)

## Operating Model
- Output **unified diffs only** unless explicitly told otherwise.
- Touch **only** the files listed in the request. Do not rename/move files.
- Keep diffs **small** and shippable. Prefer surgical edits.

## Security & Secrets
- **Never** add or hardcode secrets/URLs. Doppler is the source of truth.
- Do not create `.env*` files or alter `doppler.yaml` unless asked.

## Dependencies & Tooling
- Do **not** add new dependencies unless the request allows it.
- Respect repo standards in `AGENTS.md`, TypeScript strictness, ESLint rules.
- Use dynamic imports for optional client libs (e.g., analytics).

## CI / Repo Constraints
- Assume CI runs: `pnpm -w test`, `pnpm -w typecheck`, `pnpm -w lint`.
- Do not modify `.github/workflows/*` unless requested.
- Do not introduce other package managers or lockfiles.

## Quality Gates
- New behaviors require **basic tests** (unit-level) unless stated otherwise.
- Docs must be updated if developer behavior changes.

## Stop Conditions
- If the request is ambiguous, produce the **minimal** reasonable diff for the listed files only.
- If a step would span many files, propose a split into smaller patches.
