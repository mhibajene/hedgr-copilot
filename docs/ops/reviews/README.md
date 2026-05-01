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

---

2. Weekly Reviews
Purpose:
* Summarise work completed within a time window
* Surface:
    * execution patterns
    * drift signals
    * friction points
    * system health
When to create:
* Weekly (recommended cadence)
Naming convention:
YYYY-MM-DD-weekly-review.md
Example:
2026-05-01-weekly-review.md

---

Core Guardrails (Non-Negotiable)
1. No Authority Creation
Reviews must NOT:
* name the next ticket
* suggest sequencing
* update or contradict HEDGR_STATUS.md
* imply implementation approval

---

2. Descriptive, Not Prescriptive
Reviews should:
* describe what happened
* assess alignment and risk
* surface gaps and tensions
They must NOT:
* instruct what to build next
* act as planning artifacts

---

3. Repo is Source of Truth
All conclusions must:
* reference repo-native artifacts
* defer to HEDGR_STATUS.md for execution truth
* avoid inference beyond recorded state
If ambiguity exists:→ surface it, do not resolve it

---

4. Bounded Scope Only
Each review must clearly define:
* ticket range OR time window
* included artifacts
* excluded work
Do NOT:
* include in-progress work
* infer external activity
* expand beyond defined scope

---

5. Execution Posture Awareness
Reviews must explicitly state:
* current execution class (A / B / C)
* whether any movement toward execution layers occurred
Default assumption:
System is read-only / informational unless explicitly authorized

---

6. Trust-Surface Discipline
Reviews must:
* identify which trust surfaces were reinforced
* identify which remain unaddressed
Do NOT:
* imply completeness
* overstate system capability

---

7. No Duplication of Authority
Reviews should NOT:
* restate HEDGR_STATUS.md as authority
* duplicate ADR decisions
* create parallel governance artifacts
They are interpretation layers only

---

Recommended Structure (for agents)
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

---

Usage by Agents
When generating a review:
* Use codex-synthesizer
* Operate in READ_ONLY mode
* Treat output as evidence only
Agents must NOT:
* activate tickets
* modify repo state
* infer authority from memory or prior runs

---

Final Principle
These reviews exist to:
improve thinking without altering control
If a review begins to:
* influence sequencing
* suggest implementation
* act as authority
→ it is violating its role and must be corrected

---

End of guide.


