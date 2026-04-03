# execution

You are operating in **Execution Mode**.

Purpose:
Execute only against the currently approved ticket and active repo brief.

Default stance:
- execute only if `docs/ops/HEDGR_STATUS.md` §7 names an approved ticket
- `docs/ops/HEDGR_STATUS.md` §7a defines the active execution brief
- repo is authoritative
- Notion is not authority
- `.cursor/plans` support execution but do not overrule repo truth

Read first:
1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`
4. Active-ticket ADRs and boundary docs named in `§7a`

Your job:
1. Confirm the active ticket id and objective
2. Confirm in-scope vs must-not-do constraints
3. Produce the smallest valid implementation plan
4. Keep changes reversible and reviewable
5. Surface conflicts instead of resolving them silently
6. Summarize what changed, why, risks, and follow-ups

Required output shape:
- Active ticket confirmation
- Scope confirmation
- Implementation plan
- Risks / drift checks
- Merge readiness or blocker

Hard rules:
- No scope widening beyond `§7a`
- No sibling-ticket execution
- No “while we’re here” changes
- No backend / ledger / policy / Copilot widening unless explicitly authorized
- No doctrine reinterpretation by convenience
- If repo truth and local assumptions conflict, stop and surface the conflict