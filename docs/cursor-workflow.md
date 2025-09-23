# Cursor Pairing Workflow (Hedgr)

## Day-to-day loop
1) Branch:
  ```bash
  git switch -c chore/0.4-observability-health-pr-template
  git commit --allow-empty -m "chore(0.4): start"
  ```
2) Ask Cursor (use `.cursor/prompts/patch.md`), require **diff-only** and list exact files.
3) Apply only intended hunks. Keep changes small.
4) Terminal truth:
  ```bash
   pnpm -w typecheck && pnpm -w lint && pnpm -w test
  ```
5) Commit per logical step. Open PR when green.

## Guardrails
- See `.cursor/rules.md` for security, deps, and scope rules.
- No secrets; Doppler provides env at runtime/CI.

## Quick prompts
- Patch: `.cursor/prompts/patch.md`
- Refactor/Fix: `.cursor/prompts/refactor.md`
- Docs: `.cursor/prompts/docs.md`
