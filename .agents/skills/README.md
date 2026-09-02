# Source-command skill adapters

The eight `source-command-*` folders in this directory expose Hedgr's tracked
Cursor commands to Codex as skill adapters.

## Authority and ownership

- `.cursor/commands/*.md` is the sole canonical source for command meaning.
- `.agents/skills/source-command-*/SKILL.md` is an adapter representation and
  must not be edited independently.
- A command-semantic change must begin in its canonical `.cursor/commands`
  source and requires separately authorized adapter reconciliation.
- These adapters create no ticket, sequencing, execution, product, research,
  governance, or financial authority.

## Parity contract

Each adapter may add only its skill frontmatter, adapter title, usage sentence,
and `## Command Template` wrapper. The command body below that heading must
remain semantically identical to the corresponding canonical command after
normalizing trailing whitespace and end-of-file newlines.

Before committing an adapter:

1. compare the embedded command body with its canonical source;
2. validate every affected skill with Codex's local skill validator; and
3. confirm that no canonical command or non-adapter surface changed.

No generator, sync script, package command, or CI integration is established by
this adapter set.

## Canonical mappings

| Adapter | Canonical source |
| --- | --- |
| `source-command-adversarial-review` | `.cursor/commands/adversarial-review.md` |
| `source-command-bridge-snapshot-refresh-handoff` | `.cursor/commands/bridge-snapshot-refresh-handoff.md` |
| `source-command-closeout` | `.cursor/commands/closeout.md` |
| `source-command-execution` | `.cursor/commands/execution.md` |
| `source-command-governance` | `.cursor/commands/governance.md` |
| `source-command-mvp-process-review` | `.cursor/commands/mvp-process-review.md` |
| `source-command-propose-next-ticket` | `.cursor/commands/propose-next-ticket.md` |
| `source-command-weekly-review` | `.cursor/commands/weekly-review.md` |
