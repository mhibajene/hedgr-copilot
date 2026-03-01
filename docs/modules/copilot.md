

# Module: Copilot (Advisory Layer)

> Status: Active
> Owner: Hedgr Core
> Last Updated: 2026-03-01

---

## 1. Purpose

Copilot is Hedgr’s advisory layer.

It helps users understand:
- Their stability posture
- Why the system is tightening or relaxed
- What actions are available
- What trade-offs exist (liquidity vs yield)

Copilot is not a control plane.
Copilot does not execute.
Copilot does not override policy.

---

## 2. Responsibilities

Copilot owns:

- User-facing explanations
- Context-aware guidance
- Action suggestions (within policy)
- Refusals for unsafe / prohibited requests
- Consistent voice + disclosure pattern
- Prompt versioning

Copilot does NOT:

- Execute transactions
- Trigger rebalances
- Modify ledger state
- Modify policy state
- Provide financial advice
- Perform identity verification

Copilot is advisory only.

---

## 3. Architectural Boundaries

### Inputs

Copilot receives strictly bounded context:

- Current defensive state (normal / tightening / defensive / suspended)
- User balances + allocation breakdown (from Ledger)
- Withdrawal availability summary
- Market policy constraints (from Policy Core)
- Feature flags (Copilot enabled, OpenAI mode)

It must not receive:
- Secrets / API keys
- Raw PII beyond what is necessary for UX
- Unbounded system logs
- Full transaction history unless explicitly required

### Outputs

Copilot outputs:

- Natural language explanations
- Suggested next steps (policy-safe)
- Short summaries (dashboard-friendly)
- Refusals (with safe alternatives)

All outputs must be checked against policy constraints.

---

## 4. Execution Modes

Copilot execution is flag-gated.

### Flags

- `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED` (UI gating)
- `OPENAI_MODE` (stub vs live)

### Modes

- **Stub mode:** deterministic local responses for dev and CI
- **Live mode:** real model calls (non-CI)

Invariant:
CI must never call live models.

---

## 5. Guardrails

Copilot must enforce the following guardrails:

1. **No financial advice.**
   - Copilot can explain system mechanics.
   - Copilot cannot recommend specific investment decisions.

2. **Policy supremacy.**
   - Copilot cannot suggest actions that violate caps.
   - Copilot must cite constraints when refusing.

3. **Ledger supremacy.**
   - Copilot cannot invent balances, APYs, or status.
   - If data is unavailable, Copilot must say so.

4. **Deterministic prompt + versioning.**
   - System prompt must be versioned.
   - Changes require an ADR when behaviour changes.

5. **No hidden state transitions.**
   - Copilot may describe transitions.
   - Copilot may not initiate them.

---

## 6. Policy Validation Flow

Copilot responses must be validated after generation.

Conceptual flow:

1. Assemble bounded context (ledger + policy + flags)
2. Generate response (stub or live)
3. Validate response against policy
4. Redact or refuse if policy-unsafe
5. Return user-facing output

If validation fails → refuse with explanation.

---

## 7. Refusal Behaviour

Copilot must refuse:

- Requests to bypass caps or restrictions
- Requests to hide risk disclosures
- Requests to enable “higher yield at any cost” modes
- Instructions that imply illegal or unsafe behaviour
- Requests for sensitive personal data

Refusals must:
- Be calm
- Explain why
- Offer a policy-safe alternative

---

## 8. Prompt Discipline

Prompt assets must be:

- Versioned
- Testable
- Deterministic in stub mode
- Auditable in live mode

Minimum set:

- `system.md` (canonical system prompt)
- `templates.md` (response templates)

---

## 9. Failure Modes

If:
- Copilot is disabled
- Live mode is unavailable
- Policy context fails to load
- Ledger context fails to load

Copilot must:
- Fail closed (no advice)
- Return a minimal safe message
- Suggest manual navigation paths

Never invent context.

---

## 10. Test Guarantees

CI must validate:

- Copilot disabled → UI hidden
- Stub mode responses deterministic
- Policy-unsafe suggestions are refused
- No references to live integrations in CI
- Response templates include disclosures

---

## 11. Change Discipline

Any change to Copilot behaviour requires:

1. Prompt version bump
2. Test update
3. Documentation update
4. ADR entry if guardrails or policy validation flow changes

Copilot is a risk surface.
It must be governed like infrastructure.