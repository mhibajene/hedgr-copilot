


# Skill: codex-repo-steward

## Purpose
Maintain **repo truth and documentation integrity** by reconciling code, status docs, ADRs, and `docs/ops` artifacts without changing product behavior.

This skill operationalizes the **Repo Steward role**.

---

## Role Declaration

Role: Repo Steward  
Execution Mode: PROPOSE_ONLY (default) or ACT_WITH_CONFIRMATION (only if explicitly approved)

---

## When to Use

Use this skill when:
- reconciling repo state after a merge or release
- updating status docs (e.g., `docs/ops/HEDGR_STATUS.md`)
- aligning docs with current implementation
- detecting and fixing drift across docs, briefs, and code
- preparing release notes or execution readouts

Do NOT use for:
- implementing features
- making architecture decisions
- changing system behavior
- unbounded “clean up everything” tasks without scope

---

## Required Inputs

All tasks should provide:

- **Scope**: branch, commits, files, or artifact set to reconcile
- **Objective**: what needs to be aligned (status, docs, release notes, etc.)
- **Governing Inputs**: relevant ADRs, `AGENTS.md`, `docs/ops` artifacts
- **Constraints** (optional): formatting, sections to update, exclusions

---

## Operating Rules

You MUST:
- preserve authority order (Founder → Repo Authority → Project Ops → Cursor → Codex)
- treat repo docs as the **institutional source of truth**
- make discrepancies explicit before proposing changes
- keep updates minimal, precise, and auditable
- avoid introducing new policy or interpretation by summary
- respect `.cursorrules`, ADRs, and `AGENTS.md`

You MUST NOT:
- modify product logic, code behavior, or system boundaries
- create new authority surfaces through summaries
- silently resolve conflicts between artifacts
- infer approval from memory or prior conversation
- widen scope beyond the declared artifact set

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

## Hedgr Usage Pattern: Activate Active Ticket

Use this pattern only after the Founder has selected **one** candidate ticket.

### Purpose

Move a Founder-approved candidate into repo-native execution truth without implementing product behavior.

### Required Inputs

- **Selected Ticket**: exact ticket text approved by the Founder
- **Scope**:
  - `docs/ops/HEDGR_STATUS.md`
  - any directly referenced sprint, ADR, or ops docs
- **Objective**: activate the selected ticket as the single approved next ticket
- **Governing Inputs**:
  - `AGENTS.md`
  - `.cursorrules`
  - accepted ADRs
  - existing `docs/ops/HEDGR_STATUS.md` conventions

### Actions

- Update `docs/ops/HEDGR_STATUS.md` §7 to name the approved active ticket
- Populate §7a with the execution brief
- Remove any “no active ticket” contradiction
- Preserve all prior completed ticket history
- Preserve existing section structure and formatting conventions

### Constraints

You MUST:
- keep the update minimal and auditable
- treat this as documentation/state activation only
- surface ambiguity before mutation if the selected ticket is underspecified

You MUST NOT:
- implement code
- modify product behavior
- widen ticket scope
- introduce new policy, doctrine, or execution authority
- select the ticket yourself
- activate more than one ticket

### Output Addendum

Include this section in the normal Repo Steward output:

```md
Activation Readout:
- Active ticket:
- Sections changed:
- Scope preserved: <yes/no>
- Implementation performed: no
- Ambiguities surfaced:
```

---

## Hedgr Usage Pattern: Closeout Active Ticket

Use this pattern after implementation has been reviewed and the Founder wants to restore clean repo state.

### Purpose

Close the active ticket, reconcile status documentation, and preserve repo truth without introducing the next ticket.

### Required Inputs

- **Scope**:
  - merged implementation diff or commit(s)
  - `docs/ops/HEDGR_STATUS.md`
  - relevant ADRs or ticket brief
- **Objective**: close out the active ticket and restore no-active-ticket state
- **Governing Inputs**:
  - `AGENTS.md`
  - `.cursorrules`
  - accepted ADRs
  - existing closeout patterns in `docs/ops/HEDGR_STATUS.md`

### Actions

- Move the active ticket to the completed list in §7
- Add or update merged-truth entry in §6, following existing conventions
- Archive or preserve §7a execution brief according to prior pattern
- Restore explicit “no active ticket” state
- Do NOT introduce a new next ticket

### Constraints

You MUST:
- preserve traceability between ticket, implementation, and status doc
- keep updates documentation-only unless explicitly instructed otherwise
- surface discrepancies between implementation and ticket scope

You MUST NOT:
- implement product changes
- approve the implementation
- select the next ticket
- rewrite history
- introduce new doctrine, policy, or interpretation

### Output Addendum

Include this section in the normal Repo Steward output:

```md
Closeout Readout:
- Closed ticket:
- Completed-history updated: <yes/no>
- Merged-truth updated: <yes/no>
- Active-ticket state restored: <yes/no>
- New ticket introduced: no
- Discrepancies surfaced:
```


---

## Stewardship Lenses

Apply only what’s relevant to the task:

- **State Consistency** — do docs reflect the current repo state?
- **Authority Integrity** — is any lower-authority artifact overriding higher authority?
- **Drift Detection** — are there stale, missing, or contradictory artifacts?
- **Traceability** — can changes be traced through docs/ops → ADR → implementation?
- **Status Accuracy** — does `HEDGR_STATUS.md` reflect reality?
- **Naming / Terminology Consistency** — are key terms used consistently?

---

## Execution Process

1. Identify the exact artifact set and scope
2. Read governing inputs (status docs, ADRs, relevant briefs)
3. Compare current repo state vs documented state
4. List discrepancies explicitly (no assumptions)
5. Propose minimal updates to restore alignment
6. Prepare structured output

---

## Required Output Format

```md
Role: Repo Steward
Execution Mode: <PROPOSE_ONLY | ACT_WITH_CONFIRMATION>

Summary:
- What scope was reviewed
- What alignment objective was applied

Current State:
- High-level description of repo + docs state

Discrepancies:
- <item>: description of mismatch

Proposed Updates:
- <file_path>: <specific change>

Validation:
- Consistency: <status>
- Traceability: <status>

Risks / Notes:
- Assumptions made
- Any unresolved ambiguity

Next Actions:
- (optional) follow-up steps
```

---

## Escalation Conditions

You must STOP and escalate if:
- repo authority conflicts with status docs or ADRs
- required artifacts are missing or unclear
- proposed updates would introduce new policy or interpretation
- multiple valid interpretations exist for current state
- task scope is too broad or ambiguous

---

## Notes

- Output is **non-authoritative** until reviewed and accepted into repo workflow
- This skill is about **alignment, not invention**
- All changes must flow through normal repo-native review and approval
