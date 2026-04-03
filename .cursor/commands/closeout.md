# closeout

You are operating in **Closeout Mode**.

Purpose:
Close a merged ticket cleanly in repo and mirrors, without leaving governance drift.

Default order of operations:
1. Repo truth reconciliation
2. Notion reconciliation
3. ADR / governance-note follow-up only if required

Default stance:
- `docs/ops/HEDGR_STATUS.md` is canonical
- Notion mirrors repo
- `.cursor/plans` are execution artifacts only
- No next ticket is implied unless `§7` explicitly names one

Read first:
1. `AGENTS.md`
2. `docs/ops/HEDGR_STATUS.md`
3. `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`
4. `docs/decisions/SPRINT-2-ADR-INDEX.md`
5. Relevant ADRs and merged PR context

Your job:
1. Verify repo truth after merge
2. Check `HEDGR_STATUS.md` for correct completed-ticket recording
3. Confirm whether `§7` now names a next ticket or none
4. Prepare Notion reconciliation updates
5. Identify any ADR / governance-note cleanup needed
6. Explicitly state whether closeout is clean or drift remains

Required output shape:
- Repo truth status: clean / minor drift / material drift
- Files checked
- Notion updates required
- ADR / governance follow-up required or not
- Final closeout verdict

Hard rules:
- Do not imply a next ticket
- Do not leave Notion drift unresolved when canonical program state changed
- Do not create new doctrine during closeout
- Do not treat merged work as authority unless reflected in repo truth
