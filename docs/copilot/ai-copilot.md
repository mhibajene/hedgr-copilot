Hedgr AI Copilot — Canonical Architecture & Operating Guide

Status: Living document
Owner: HedgrOps (Architecture)
Audience: Engineers, Cursor, QA, future contributors
Location: /github/docs/ai-copilot.md

⸻

1. PURPOSE

The Hedgr AI Copilot is a constrained, safety-first assistant embedded inside the Hedgr product. Its role is to:
	•	Improve user understanding of balances, transactions, FX, and risk
	•	Guide users through safe financial actions
	•	Reduce cognitive load without taking autonomous control of funds

The Copilot is not a general-purpose AI, trading bot, or financial advisor.

This document defines the non-negotiable architectural principles, boundaries, and execution rules that all implementations must follow.

⸻

2. DESIGN PHILOSOPHY (NON-NEGOTIABLE)

2.1 Safety Over Capability

The Copilot must always:
	•	Prefer refusal over hallucination
	•	Prefer explanation over action
	•	Prefer human confirmation over autonomy

If a capability increases risk or ambiguity, it is out of scope.

⸻

2.2 Read-Only by Default

The Copilot is read-only unless explicitly elevated through a controlled action flow.
	•	It may explain balances, transactions, FX, and lifecycle states
	•	It may suggest actions
	•	It may not execute actions without a user-confirmed product flow

There is no such thing as “silent execution.”

⸻

2.3 Deterministic > Generative

Where possible:
	•	Deterministic rules > free-form generation
	•	Structured data > narrative
	•	Logs > hidden reasoning

LLMs are used for language, summarisation, and guidance, not decision authority.

⸻

3. SCOPE DEFINITION

3.1 In-Scope Capabilities

The Copilot may:
	•	Explain balances (total / available / pending)
	•	Explain transaction lifecycle states
	•	Summarise recent activity
	•	Clarify FX rates and conversions
	•	Surface trust & environment disclosures
	•	Guide users to the correct UI flow
	•	Answer “what happened” and “what does this mean” questions

⸻

3.2 Explicitly Out of Scope

The Copilot must never:
	•	Move funds
	•	Trigger deposits or withdrawals
	•	Optimise yield
	•	Give investment advice
	•	Bypass product confirmations
	•	Infer or guess missing data

Any PR that violates this section must be rejected.

⸻

4. SYSTEM ARCHITECTURE (HIGH LEVEL)

4.1 Components
	•	Chat UI — frontend conversational interface
	•	Copilot Orchestrator — backend request handler
	•	Context Builder — assembles safe, minimal context
	•	Policy Layer — enforces allow/deny rules
	•	LLM Adapter — external model interface
	•	Response Validator — post-generation safety check

⸻

4.2 Data Flow (Simplified)
	1.	User sends message
	2.	Context Builder fetches approved state (balances, tx summaries)
	3.	Policy Layer filters allowed intents
	4.	LLM Adapter generates response
	5.	Response Validator checks for violations
	6.	Sanitised response returned to UI

If any step fails → safe fallback response.

⸻

5. CONTEXT MANAGEMENT

5.1 Principles

Context must be:
	•	Minimal
	•	Explicit
	•	Auditable
	•	Time-bounded

No raw database access. No free-form memory.

⸻

5.2 Allowed Context Types
	•	Ledger balance projection
	•	Transaction summaries (IDs, states, timestamps)
	•	FX rates + source
	•	Environment flags (mock / live)
	•	User-selected preferences

5.3 Forbidden Context
	•	Private keys
	•	Credentials
	•	Full transaction histories
	•	PII beyond what is already visible in the UI

⸻

6. POLICY & GUARDRAILS

6.1 Intent Classification

All user messages must be classified into one of:
	•	Informational
	•	Explanatory
	•	Navigational
	•	Action-seeking (blocked or redirected)

Action-seeking intents must never directly execute.

⸻

6.2 Refusal & Redirection

When refusing, the Copilot must:
	•	Explain why
	•	Offer a safe alternative
	•	Redirect to a product flow if appropriate

Example:

“I can’t move funds for you, but I can guide you to the Withdraw screen.”

⸻

7. TRUST & DISCLOSURE REQUIREMENTS

The Copilot must always surface:
	•	Whether data is simulated or live
	•	Whether FX or DeFi is mocked
	•	Whether balances are final or pending

No response should leave the user unsure of system state.

⸻

8. OBSERVABILITY & LOGGING

8.1 Required Logs
	•	User intent classification
	•	Context fields included
	•	Policy decisions
	•	Model used + version
	•	Refusal triggers

Logs must be:
	•	Structured
	•	Non-PII
	•	Auditable

⸻

9. TESTING REQUIREMENTS

9.1 Unit Tests
	•	Policy allow/deny cases
	•	Context builder safety
	•	Intent classification

9.2 E2E Tests
	•	Copilot responses under mock environment
	•	Refusal flows
	•	Trust disclosures present

No live network calls in CI.

⸻

10. EVOLUTION RULES

The Copilot evolves only if:
	•	Safety posture is unchanged or improved
	•	New capability has a clear trust justification
	•	Human confirmation remains required

If a feature cannot be made safe-first, it does not ship.

⸻

11. CONTRIBUTION GUIDELINES

Any PR touching the Copilot must:
	•	Reference this document
	•	State which section it affects
	•	Explicitly declare whether scope is expanded

Unreferenced Copilot changes must not be merged.

⸻

12. CANONICAL PRINCIPLE

The AI Copilot exists to reduce confusion, not to increase power.

If there is ever a tradeoff between user clarity and system capability, clarity wins.

⸻

End of Canonical Document