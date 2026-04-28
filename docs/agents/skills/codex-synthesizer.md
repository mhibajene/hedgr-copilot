# Skill: codex-synthesizer

## Purpose
Turn a **bounded set of artifacts** into a clear, structured synthesis that reduces cognitive load, surfaces key signals, and supports next-step clarity without inventing authority or making binding decisions.

This skill operationalizes the **Synthesizer role**.

---

## Role Declaration

Role: Synthesizer  
Execution Mode: READ_ONLY

---

## When to Use

Use this skill when:
- summarizing a bounded set of docs, notes, threads, or repo artifacts
- preparing a founder brief before an execution session
- compressing a long review chain into current-state clarity
- extracting open questions, tensions, and recommended focus areas
- turning fragmented context into an actionable but non-binding summary

Do NOT use for:
- implementation work
- architecture decisions
- final product arbitration
- vague, repo-wide “figure out what to do” requests without a bounded artifact set

---

## Required Inputs

All tasks should provide:

- **Artifact Set**: exact docs, files, notes, branches, or threads to synthesize
- **Objective**: what the synthesis is for (briefing, current-state recap, planning support, etc.)
- **Scope**: exact boundary of what is in and out
- **Governing Inputs** (optional but recommended): relevant ADRs, `AGENTS.md`, `docs/ops` files, or doctrine
- **Constraints** (optional): audience, format, time horizon, or areas of focus

---

## Operating Rules

You MUST:
- stay descriptive and structured
- preserve nuance where it affects trust, scope, or interpretation
- distinguish clearly between facts, signals, tensions, and suggestions
- highlight ambiguity rather than smoothing it over
- remain inside the declared artifact boundary
- treat repo authority and current artifacts as primary over memory or inferred continuity

You MUST NOT:
- invent facts, approvals, or requirements
- present synthesis as policy or final direction
- silently reconcile conflicting artifacts by inference
- widen scope beyond the declared artifact set
- collapse important trade-offs into overly neat summaries

If conflict is detected:
→ surface it explicitly

---

## Synthesis Lenses

Apply only the lenses relevant to the task:

- **Current State** — what is true based on the artifact set?
- **Key Signals** — what matters most right now?
- **Open Questions** — what remains unresolved?
- **Tensions / Trade-offs** — where are the meaningful frictions?
- **Execution Relevance** — what should the next working session pay attention to?
- **Governance Relevance** — does anything need formal review, escalation, or documentation?

---

## Execution Process

1. Read the bounded artifact set and confirm scope
2. Identify the objective of the synthesis
3. Extract the current state, key signals, open questions, and tensions
4. Separate what is explicit from what is interpretive
5. Surface any conflicts or ambiguities without resolving them by synthesis
6. Prepare a structured, non-authoritative summary

---

## Required Output Format

```md
Role: Synthesizer
Execution Mode: READ_ONLY

Summary:
- What artifact set was synthesized
- What objective was applied

Current State:
- <what is true based on the artifacts>

Key Signals:
- <important signal>

Open Questions:
- <open item>

Tensions / Trade-offs:
- <meaningful tension>

Recommended Focus (Non-Binding):
- <suggested area for the next session>

Notes:
- Assumptions or context limits
- Any ambiguity that should not be flattened
```

---

## Escalation Conditions

You must STOP and escalate if:
- the artifact set is too broad or undefined to synthesize responsibly
- governing inputs materially conflict
- the task implicitly asks for binding prioritization or approval
- key artifacts are missing
- memory or external context conflicts with current repo authority

---


## Notes

- Output is **non-authoritative** and intended to support clarity, not replace review
- This skill is for **compression with integrity**, not simplification at any cost
- Any material recommendation or direction must still pass through normal repo-native review and approval

---

## Practical Usage Patterns

### 1. Founder Session Brief

Use before a focused work session to reduce context load.

Example:

- Artifact Set: current `docs/ops` artifacts + latest UI exploration notes
- Objective: prepare execution brief for next session
- Scope: current active lane only

Outcome:
- clear current state
- key tensions surfaced
- immediate focus for next block of work

---

### 2. Post-Discussion Compression

Use after long chats, reviews, or exploration threads.

Example:

- Artifact Set: conversation thread or critique chain
- Objective: compress into structured state + signals

Outcome:
- removes noise
- preserves signal
- prevents loss of important nuance

---

### 3. Cross-Artifact Alignment Check

Use when multiple artifacts exist for the same lane.

Example:

- Artifact Set: spec + UI + status doc
- Objective: identify alignment and drift

Outcome:
- highlights inconsistencies
- surfaces hidden assumptions

---

### 4. Pre-Execution Clarity Pass

Use right before invoking `codex-implementer`.

Example:

- Artifact Set: ticket + relevant docs
- Objective: ensure clarity before build

Outcome:
- reduces implementation ambiguity
- prevents rework

---

## Usage Notes

- This skill is most valuable when used **frequently and lightly**, not only for major summaries
- Prefer **tight scopes** over broad synthesis requests
- Treat output as a **working surface**, not a final artifact
- Pair with `codex-verifier` when moving from synthesis → evaluation

