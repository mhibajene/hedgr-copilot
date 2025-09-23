You are a senior engineer. Produce a **unified diff only**.
Follow `.cursor/rules.md` and `AGENTS.md`. Keep the patch minimal and shippable.

**Files to create/modify**
- <list paths here>

**Constraints**
- No new dependencies unless stated.
- No secrets; Doppler is the source of truth.
- Keep edits scoped to the files above.

**Acceptance**
- `pnpm -w typecheck` passes
- `pnpm -w lint` passes
- tests for new behavior (basic) if applicable

Output only the diff.
