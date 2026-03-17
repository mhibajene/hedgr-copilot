HEDGR EXECUTION SYSTEM (v2.1 — CANONICAL)

(Location: docs/ops/HEDGR_EXECUTION_SYSTEM.md)

⸻

1. Purpose

This document defines the canonical execution model for Hedgr.

The Hedgr repository is the institutional operating system governing:
	•	architecture
	•	doctrine
	•	sprint state
	•	execution constraints
	•	implementation flow

This system ensures:
	•	deterministic execution
	•	architectural integrity
	•	zero drift between intent, implementation, and trust perception

⸻

2. Core Principle

Hedgr is built through a governed system, not ad hoc execution.
	•	Repo = Operating System
	•	Doctrine = Constitution
	•	Status = Execution State
	•	Cursor = Deterministic Executor
	•	HedgrOps = Co-Architect + Control Layer

⸻

3. System Roles

🧠 HedgrOps (Co-Architect + Control Plane)

HedgrOps is not just coordinating work — it actively shapes the system architecture while governing execution.

Responsibilities

Architecture
	•	co-define system structure and evolution
	•	author and refine ADRs
	•	ensure consistency across modules and layers

Execution Control
	•	define sprint posture
	•	author and maintain HEDGR_STATUS.md
	•	frame and sequence tickets
	•	define constraints and boundaries
	•	approve scope

Governance
	•	enforce doctrine adherence
	•	prevent architectural drift
	•	validate outputs against system intent

⸻

⚙️ Cursor (Execution Engine)

Responsibilities
	•	read repo state (status + doctrine + ADRs)
	•	execute within defined constraints
	•	produce deterministic, auditable outputs
	•	surface conflicts instead of resolving them silently

Non-responsibilities
	•	defining architecture
	•	expanding scope
	•	making implicit product decisions

⸻

🧱 Repository (Institutional OS)

The repo is the single source of truth for:
	•	doctrine (docs/doctrine/)
	•	decisions (docs/decisions/)
	•	architecture (docs/architecture/)
	•	operational state (docs/ops/)
	•	implementation (apps/, packages/)

⸻

🔌 MCP Server (Future Interface Layer)

Location
	•	tools/hedgrops-mcp/

Status
	•	Not currently in active execution flow

Purpose (future)
	•	provide structured, safe interaction with repo state
	•	enforce access boundaries
	•	support AI-native workflows at scale

Current stance

Present for future-proofing. Not part of the active execution loop.

⸻

4. Source of Truth Hierarchy

When conflicts arise:

1. Doctrine & ADRs (Highest Authority)
	•	docs/decisions/
	•	docs/doctrine/

Defines:
	•	what Hedgr is
	•	what Hedgr is allowed to become

⸻

2. Execution State (Current Authority)
	•	docs/ops/HEDGR_STATUS.md
	•	supporting sprint docs

Defines:
	•	what is currently allowed
	•	what is explicitly prohibited
	•	current system posture

⸻

3. Codebase (Implementation Reality)
	•	apps/
	•	packages/

Must always conform to:
	•	doctrine
	•	current execution state

⸻

5. Canonical Execution Flow

Step 1 — HedgrOps defines state

HedgrOps authors:
	•	docs/ops/HEDGR_STATUS.md

This is the single execution brief.

⸻

Step 2 — Cursor reads before acting

Cursor must read:
	•	HEDGR_STATUS.md
	•	relevant ADRs
	•	relevant doctrine
	•	referenced sprint docs

⸻

Step 3 — Cursor executes within posture

Allowed
	•	only what is defined in status
	•	only what aligns with doctrine

Not allowed
	•	scope expansion
	•	assumption-based implementation
	•	architecture invention

⸻

Step 4 — Output must be auditable

Each change must clearly show:
	•	what changed
	•	why it changed
	•	what constraint allowed it
	•	what was intentionally excluded

⸻

6. HEDGR_STATUS.md — CANONICAL STRUCTURE (MANDATORY)

This structure is part of the execution system and must be followed.

# HEDGR STATUS

## 1. CURRENT SPRINT
Sprint ID:
Sprint Name:
Status: ACTIVE | PAUSED | COMPLETE

---

## 2. SYSTEM POSTURE (NON-NEGOTIABLE)

Explicit constraints defining system behaviour.

---

## 3. ACTIVE TICKETS (EXECUTION SCOPE)

List of ALL allowed tickets.

Rules:
- Only listed tickets are executable
- No implicit expansion

---

## 4. IN SCOPE (ALLOWED WORK)

Explicitly permitted work.

---

## 5. OUT OF SCOPE (PROHIBITED)

Explicitly forbidden work.

---

## 6. CONSTRAINTS (IMPLEMENTATION RULES)

Technical and architectural rules.

---

## 7. REQUIRED READS

ADRs and docs that must be followed.

---

## 8. ACCEPTANCE CRITERIA

Definition of done.

---

## 9. RISKS / WATCHPOINTS

Known failure modes.

---

## 10. NOTES FOR CURSOR

Execution guidance.

---

## 11. CHANGE LOG

State updates across sprint.


⸻

Critical Rule

If it is not defined in HEDGR_STATUS.md, it is not executable.

⸻

7. Behavioural Contract

Cursor must:
	•	treat repo as authority
	•	follow status strictly
	•	align with ADRs
	•	avoid assumptions
	•	surface ambiguity

⸻

HedgrOps must:
	•	define clear posture
	•	remove ambiguity
	•	maintain status accuracy
	•	ensure doctrine alignment
	•	act as co-architect

⸻

8. Trust & UX Enforcement (MANDATORY)

All execution must preserve Hedgr trust principles:
	•	No implication of guaranteed safety or yield
	•	No implication of automatic capital movement
	•	No optimistic framing without explicit risk context
	•	“Do nothing” must remain a valid state
	•	Copy must remain informational, not persuasive

Violations are treated as defects.

⸻

9. Ambiguity Protocol

If required information is missing:

Cursor must:
	•	stop execution
	•	list missing inputs
	•	request clarification

Cursor must not:
	•	infer intent
	•	expand scope to compensate

⸻

10. Execution Granularity Rule

Each ticket must result in:
	•	one bounded change
	•	one validation surface

Bundling unrelated changes is prohibited.

⸻

11. Escalation Levels

Level 1 — Ambiguity
	•	Missing requirements
	•	Conflicting instructions

Level 2 — Boundary Risk
	•	Requires backend or policy coupling
	•	Expands system authority

Level 3 — Doctrine Breach
	•	Violates trust principles
	•	Hides risk
	•	Implies guarantees

At Level 2 or 3:
Execution must stop and escalate.

⸻

12. Validation Requirement

All execution must include:
	•	Behavioral validation
	•	Boundary validation
	•	Trust/UX validation
	•	Tests (if applicable)

⸻

13. Execution Quality Standard

All changes must:
	•	Be minimal and reversible
	•	Follow repo-native patterns
	•	Avoid introducing new abstractions unless required
	•	Preserve existing system contracts
	•	Include tests where behavior changes

Prefer clarity over cleverness.

⸻

14. Anti-Patterns

Chat-led execution
→ Fix: update status first

Doctrine bypass
→ Fix: create/update ADR

Status drift
→ Fix: treat status as mandatory precondition

Scope creep
→ Fix: enforce OUT OF SCOPE strictly

Tool-driven complexity (e.g. premature MCP usage)
→ Fix: prioritize working execution flow

⸻

15. System Signals (What Good Looks Like)
	•	Status file is always current
	•	Tickets map cleanly to posture
	•	No “mystery logic” in code
	•	UI reflects actual system capability
	•	Tests reinforce constraints

⸻

16. Standing Doctrine
	•	Repo is the OS
	•	HedgrOps co-architects the system
	•	Cursor executes within constraints
	•	Status defines reality
	•	ADRs define boundaries
	•	MCP is future infrastructure, not current dependency

⸻
