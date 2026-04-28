


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
