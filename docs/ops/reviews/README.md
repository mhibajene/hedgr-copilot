# Hedgr Reviews — Usage Guide

## Status

Non-authoritative support layer  
Does NOT modify execution, sequencing, or repo governance  
Subordinate to:

- docs/ops/HEDGR_STATUS.md
- AGENTS.md
- Accepted ADRs
- Doctrine (docs/doctrine/*)

---

## Purpose

This folder contains **bounded review artifacts** that:

- summarise completed work
- assess alignment with Hedgr’s MVP North Star
- surface risks, gaps, and trust-surface coverage
- improve decision quality without creating new authority

These documents are:

> **evidence, not direction**

They must not:

- propose or activate tickets
- override repo-native sequencing
- act as execution input directly

---

## Review Types

### 1. MVP Process Reviews

**Purpose:**

- Evaluate a bounded slice of completed tickets against the MVP North Star
- Understand whether work is:
  - reinforcing trust foundations
  - or advancing real capability

**When to create:**

- Every 3–5 tickets
- At meaningful milestones (e.g. phase completion)

**Naming convention:**

```text
HEDGR_MVP_PROCESS_REVIEW_<ticket-range>.md

Example:
HEDGR_MVP_PROCESS_REVIEW_MC_S3_013_TO_015.md
```

---

### 2. Weekly Reviews

**Purpose:**

- Summarise work completed within a time window
- Surface:
  - execution patterns
  - drift signals
  - friction points
  - system health

**When to create:**

- Weekly (recommended cadence)

**Naming convention:**

```text
YYYY-MM-DD-weekly-review.md

Example:
2026-05-01-weekly-review.md
```

**Required governance additions:**

Future weekly reviews must include the following review-governance fields. These fields improve authority legibility; they do not create doctrine, execution authority, sequencing authority, or ticket activation authority.

#### Authority treatment note

Weekly reviews must identify how included support, review, bridge, command, or governance-tooling work was treated for authority purposes.

At minimum, state whether each relevant item is:

- recorded as a completed ticket in `docs/ops/HEDGR_STATUS.md`
- mirrored or reconciled in `docs/ops/HEDGR_STATUS.md`
- closed through a local verification or closeout artifact
- included as merged support evidence only
- excluded as draft, review-draft, in-progress, or non-authorizing material

This note must not flatten authority roles.

A local verification file, bridge snapshot, review artifact, command file, or support document may be evidence of completed support work, but it does not become sequencing authority unless repo-native authority explicitly says so.

Weekly reviews must surface unresolved authority-treatment ambiguity instead of resolving it by inference.

#### Status-language watchlist

Weekly reviews should include a lightweight status-language watch when merged work touches product copy, review language, status badges, UI state, bridge snapshots, support tools, off-ramp framing, custody, rails, deposits, withdrawals, provider coverage, or market readiness.

The watchlist is a review aid, not standalone UX doctrine.

Flag terms only when their usage could imply execution truth, user-money state, approval, readiness, settlement, or operational capability beyond repo authority.

Review-sensitive terms include, but are not limited to:

- available
- protected
- allocated
- processing
- withdrawable
- completed
- verified
- ready
- live
- approved
- selected
- guaranteed
- instant
- cash out
- payout
- settled
- converted
- deposited
- withdrawn
- yield
- safe
- secured

For each flagged term, use:

| Term | Location / artifact | Why it may be risky | Repo-authorized meaning | Action required? |
| --- | --- | --- | --- | --- |

The review must not automatically ban terms. It must assess whether the term creates misleading trust, execution, accounting, provider, market, or authority implications.

This is review hygiene only. Hedgr's UX doctrine already requires risk to be named explicitly, status before action, and verifiable states over promises; this watchlist supports that posture without replacing doctrine.

#### What changed vs what did not change

Weekly reviews should include a compact table distinguishing actual repo changes from unchanged authority, product, execution, or trust boundaries.

Use this format:

| Area / workstream | What changed | What did not change | Authority widened? | Trust surface affected? | Evidence basis |
| --- | --- | --- | --- | --- | --- |
| Stability Engine |  |  | No / Yes with authority citation |  |  |
| Brand / UI semantics |  |  | No / Yes with authority citation |  |  |
| Bridge / review support |  |  | No / Yes with authority citation |  |  |
| Off-ramp / rails |  |  | No / Yes with authority citation |  |  |
| Custody / customer-money movement |  |  | No / Yes with authority citation |  |  |

The table must explicitly state `No` under authority widening unless repo-native authority explicitly supports a different answer.

If authority widening is claimed, the review must cite the exact repo-native authority surface and section.

This table reduces drift by distinguishing more legible support infrastructure from expanded product authority.

#### Decision pressure

Weekly reviews should identify whether the week created founder decision pressure.

Use one of the following labels:

- `None`
- `Clarification useful`
- `Founder decision required`
- `Repo authority reconciliation required`
- `Blocked by unresolved ambiguity`

Decision pressure must not become sequencing language.

If a founder decision is required, phrase it as a bounded governance question, not as an implementation recommendation.

Allowed:

> Founder decision required: whether to standardize support-infrastructure closeout treatment in weekly reviews.

Allowed:

> Repo authority reconciliation required: support-infrastructure evidence exists outside `HEDGR_STATUS`; review should preserve ambiguity until repo authority is reconciled.

Not allowed:

> Next ticket should implement provider selection.

Not allowed:

> Bridge support is complete, so proceed to next bridge ticket.

---

## Core Guardrails (Non-Negotiable)

### 1. No Authority Creation

Reviews must NOT:

- name the next ticket
- suggest sequencing
- update or contradict HEDGR_STATUS.md
- imply implementation approval

---

### 2. Descriptive, Not Prescriptive

Reviews should:

- describe what happened
- assess alignment and risk
- surface gaps and tensions
They must NOT:
- instruct what to build next
- act as planning artifacts

---

### 3. Repo is Source of Truth

All conclusions must:

- reference repo-native artifacts
- defer to HEDGR_STATUS.md for execution truth
- avoid inference beyond recorded state
If ambiguity exists:→ surface it, do not resolve it

---

### 4. Bounded Scope Only

Each review must clearly define:

- ticket range OR time window
- included artifacts
- excluded work
Do NOT:
- include in-progress work
- infer external activity
- expand beyond defined scope

---

### 5. Execution Posture Awareness

Reviews must explicitly state:

- current execution class (A / B / C)
- whether any movement toward execution layers occurred
Default assumption:
System is read-only / informational unless explicitly authorized

---

### 6. Trust-Surface Discipline

Reviews must:

- identify which trust surfaces were reinforced
- identify which remain unaddressed
Do NOT:
- imply completeness
- overstate system capability

---

### 7. No Duplication of Authority

Reviews should NOT:

- restate HEDGR_STATUS.md as authority
- duplicate ADR decisions
- create parallel governance artifacts
They are interpretation layers only

---

## Recommended Structure (for agents)

Each review should include:

1. Status / Authority / Scope / Last updated
2. Purpose
3. Governing inputs
4. MVP North Star frame
5. Ticket or time-based summary
6. Process assessment
7. Execution classification (A / B / C)
8. Capability progression
9. Trust-surface coverage
10. North Star verdict
11. Risks / notes
12. Non-authoritative evaluation criteria (optional)

Weekly reviews should also include the weekly governance additions above:

- authority treatment note
- status-language watchlist
- what changed vs what did not change
- decision pressure

---

## Usage by Agents

When generating a review:

- Use codex-synthesizer
- Operate in READ_ONLY mode
- Treat output as evidence only
Agents must NOT:
- activate tickets
- modify repo state
- infer authority from memory or prior runs

## Repo-native review commands

Codex/Cursor operator prompts for generating review artifacts live under:

- `.cursor/commands/weekly-review.md`
- `.cursor/commands/mvp-process-review.md`
- `.cursor/commands/bridge-snapshot-refresh-handoff.md`

These commands are operator instructions only. They do not create authority, activate tickets, or override `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, or doctrine.

After generating weekly or MVP process reviews, operators should refresh and check static bridge snapshots using:

```bash
pnpm bridge:snapshots:refresh
pnpm bridge:snapshots:check
```

---

## Final Principle

These reviews exist to:
improve thinking without altering control
If a review begins to:

- influence sequencing
- suggest implementation
- act as authority
→ it is violating its role and must be corrected

---

End of guide.
