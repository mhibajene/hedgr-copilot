# Hedgr Cursor Rules (Patch Execution Guardrails)

## Authority
- `.cursorrules` is the governing authority for doctrine, architecture, UX posture, policy posture, and anti-drift rules.
- This file defines **patch execution discipline**, not constitutional doctrine.
- `AGENTS.md` provides workflow guidance and agent conventions, but must not override `.cursorrules`.

## Operating Model
- Output **unified diffs only** unless explicitly told otherwise.
- Touch **only** the files listed in the request. Do not rename or move files unless explicitly requested.
- Keep diffs **small, surgical, and shippable**.
- Prefer the **minimal compliant patch** over broad refactors.

## Doctrine and Scope Discipline
- Before patching, check whether the requested change is constrained by relevant doctrine or ADRs.
- Do not introduce implementation drift that conflicts with `.cursorrules`.
- Respect current sprint posture and implementation boundaries.
- If a request would require doctrinal reinterpretation, architectural expansion, or many-file refactors, propose a smaller patch split.

## Security & Secrets
- **Never** add or hardcode secrets or sensitive URLs.
- Use Doppler as the canonical secrets source.
- Do not create new `.env*` workflows.
- Do not alter `doppler.yaml` unless explicitly asked.

## Dependencies & Tooling
- Do **not** add new dependencies unless the request explicitly allows it.
- Respect `AGENTS.md` workflow guidance, TypeScript strictness, ESLint rules, and existing repo conventions.
- Use dynamic imports for optional client libraries where the codebase already expects that pattern.

## CI / Repo Constraints
- Assume CI runs: `pnpm -w test`, `pnpm -w typecheck`, `pnpm -w lint`.
- Do not modify `.github/workflows/*` unless explicitly requested.
- Do not introduce other package managers or lockfiles.
- Do not bypass trust checks, policy checks, or existing guard scripts for convenience.

## Quality Gates
- New behavior requires **basic tests** unless explicitly waived.
- If a patch changes policy, trust behavior, disclosure behavior, or user-facing product meaning, update relevant docs or tests accordingly.
- Preserve consistency across implementation, tests, and doctrine-facing language.

## Sprint / Engine Constraints
- Respect current Stability Engine posture for the active sprint.
- Do not introduce hidden execution, accounting authority, or fund-moving behavior where the sprint doctrine keeps the engine read-only or informational.
- Treat allocation bands as informational unless explicitly instructed otherwise by higher-order doctrine.

## Stop Conditions
- If the request is ambiguous, produce the **minimal reasonable diff** for the listed files only.
- If the work would span many files, propose a split into smaller patches.
- If the requested change conflicts with higher-order doctrine, stop and flag the conflict instead of improvising.
