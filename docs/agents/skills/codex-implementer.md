


# Skill: codex-implementer

## Purpose
Execute a **bounded implementation task** within the Hedgr repo while strictly adhering to `AGENTS.md`, ADRs, and repo authority.

This skill operationalizes the **Implementer role**.

---

## Role Declaration

Role: Implementer  
Execution Mode: PROPOSE_ONLY (default) or ACT_WITH_CONFIRMATION (only if explicitly approved)

---

## When to Use

Use this skill when:
- implementing a clearly defined ticket
- applying a scoped UI or backend change
- fixing a specific bug
- extending an existing feature within known boundaries

Do NOT use for:
- architecture changes
- open-ended improvements
- unclear or underspecified tasks

---

## Required Inputs

All tasks must provide:

- **Task Description**: clear objective
- **Scope**: exact files or directories
- **Acceptance Criteria**: what “done” means
- **Constraints** (optional but recommended): flags, patterns, or rules to respect

---

## Operating Rules

You MUST:
- follow existing patterns in the codebase
- respect `.cursorrules`, ADRs, and `AGENTS.md`
- keep changes minimal and localized
- include or update tests when contract surfaces change
- maintain CI-safe behavior (no live external calls)
- use reversible approaches (feature flags, stubs)

You MUST NOT:
- introduce new dependencies without instruction
- modify unrelated files
- change architecture or system boundaries
- infer approval from memory or prior context
- silently resolve conflicts in repo authority

If conflict is detected:
→ STOP and surface explicitly

## Branch Safety Rule

Before making any file amendment, documentation update, or implementation change, Codex MUST verify the current git branch.

If the current branch is `main`, `master`, or any protected/default branch, Codex MUST NOT modify files directly.

Codex MUST first create or request creation of a dedicated task branch using a clear, scoped name, for example:

- `docs/repo-steward-status-reconcile`
- `chore/codex-skill-branch-safety`
- `feat/<ticket-id>-<short-description>`
- `fix/<ticket-id>-<short-description>`

This applies to both:
- Repo Steward documentation/state updates
- Implementer code or test changes

Codex MUST NOT:
- commit directly to `main`
- amend protected branches
- mix unrelated changes into the task branch
- reuse stale branches without confirming scope alignment

If branch creation is not possible, Codex must STOP and surface the issue before making changes.

---

## Hedgr Usage Pattern: Execute Active Ticket

Use this pattern only after `docs/ops/HEDGR_STATUS.md` §7 / §7a names a single active ticket.

### Purpose

Implement the active ticket exactly as defined in repo-native execution truth.

### Required Inputs

- **Task Description**: active ticket from `docs/ops/HEDGR_STATUS.md` §7 / §7a
- **Scope**: exact files or directories named or implied by the ticket brief
- **Acceptance Criteria**: criteria from §7a or the ticket brief
- **Governing Inputs**:
  - `AGENTS.md`
  - `.cursorrules`
  - accepted ADRs
  - active ticket brief
- **Constraints**: all “must not” rules in the ticket brief

### Execution Constraints

You MUST:
- implement only the active ticket
- keep changes minimal, localized, reversible, and reviewable
- follow existing codebase patterns
- run or identify relevant lint/test/typecheck validation
- stop if the ticket requires architecture, policy, or execution-authority judgment

You MUST NOT:
- expand scope beyond the active ticket
- perform adjacent refactors unless required for tests to pass
- introduce new dependencies without explicit instruction
- persist derived or computed financial state unless explicitly authorized
- imply execution where none exists
- create new system authority, policy, doctrine, or governance behavior
- treat informational financial representations as accounting truth

### Output Addendum

Include this section in the normal Implementer output:

```md
Active Ticket Execution:
- Source of active ticket:
- Scope followed:
- Files changed:
- Scope expansions: none / <list>
- Doctrine-sensitive surfaces touched:
- Validation performed:
```


---

## Execution Process

1. Read and understand the task and constraints
2. Identify exact files to modify
3. Implement minimal changes to satisfy acceptance criteria
4. Ensure alignment with repo patterns and governance
5. Validate against lint/test/typecheck expectations (conceptually if not executable)
6. Prepare structured output

---

## Required Output Format

```md
Role: Implementer
Execution Mode: <PROPOSE_ONLY | ACT_WITH_CONFIRMATION>

Summary:
- What was implemented
- Why it was implemented

Changes:
- <file_path_1>: description
- <file_path_2>: description

Validation:
- Lint: <status>
- Tests: <status>
- Typecheck: <status>

Risks / Notes:
- Assumptions made
- Edge cases
- Any unresolved ambiguity

Next Actions:
- (optional) follow-up work or checks
```

---

## Escalation Conditions

You must STOP and escalate if:
- requirements are ambiguous
- multiple valid implementation paths exist
- task implies architecture change
- required context is missing
- change impacts trust surfaces or system posture

---

## Notes

- Output is **non-authoritative** until reviewed and accepted into repo workflow
- This skill does not grant approval authority
- This skill must always defer to repo-native governance
