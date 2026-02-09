# Hedgr AI Copilot — Threat Model (Sprint 0.9)

Status: Active
Owner: HedgrOps (Architecture)
Scope: AI Copilot only
Applies From: Sprint 0.9 onward

---

## 1. OBJECTIVE

This document enumerates credible threats, abuse cases, and failure modes for the Hedgr AI Copilot.
Its purpose is to ensure **user trust, financial safety, and system integrity** as Copilot functionality is expanded.

This is a *preventative* artifact, not a post-incident report.

---

## 2. THREAT MODEL BOUNDARIES

### In Scope
- Copilot chat UI
- Backend Copilot orchestration
- Context assembly
- LLM interaction
- Generated responses
- User perception & trust

### Explicitly Out of Scope
- Core wallet transaction execution
- Key management
- Custody infrastructure
- External protocol risk (Aave, FX providers)

---

## 3. THREAT CATEGORIES

### T1 — Financial Harm
User is misled into taking an incorrect or risky financial action.

### T2 — Unauthorized Action
Copilot enables or appears to enable actions without explicit user consent.

### T3 — Hallucination & Misinformation
Copilot fabricates balances, statuses, FX rates, or system behaviour.

### T4 — Context Leakage
Sensitive or excessive internal data is exposed through responses.

### T5 — Trust Erosion
User loses confidence due to ambiguity, inconsistency, or unclear system state.

### T6 — Prompt Injection / Abuse
User attempts to override Copilot constraints via crafted input.

---

## 4. THREAT ANALYSIS & MITIGATIONS

### T1 — Financial Harm
**Risk:** Copilot suggests unsafe actions or misinterprets balances.

**Mitigations**
- Read-only by default
- No autonomous execution
- Action-seeking intents blocked or redirected
- Mandatory trust & environment disclosures

---

### T2 — Unauthorized Action
**Risk:** Copilot triggers deposits, withdrawals, or state changes.

**Mitigations**
- No write access to transactional systems
- UI flow redirection only
- Explicit prohibition enforced at policy layer
- PR rejection if scope violated

---

### T3 — Hallucination & Misinformation
**Risk:** LLM invents facts or fills missing data.

**Mitigations**
- Deterministic context only
- Refusal on missing or ambiguous data
- Response validator checks for unsupported claims
- Prefer “I don’t know” over guessing

---

### T4 — Context Leakage
**Risk:** Excessive internal or sensitive data exposed.

**Mitigations**
- Context builder allowlist
- No raw DB access
- PII minimisation
- Structured context contracts

---

### T5 — Trust Erosion
**Risk:** User unclear if balances, FX, or DeFi are live or simulated.

**Mitigations**
- Mandatory trust disclosures in all responses
- Environment flags included in context
- Explicit language (“simulated”, “pending”, “live”)

---

### T6 — Prompt Injection / Abuse
**Risk:** User attempts to bypass constraints via instructions.

**Mitigations**
- Policy layer evaluated before LLM call
- System prompt immutable
- User instructions never override policy
- Post-generation response validation

---

## 5. FAILURE MODES & SAFE FALLBACKS

If Copilot encounters:
- Missing context
- Policy ambiguity
- Validator failure
- LLM error or timeout

**Required behaviour**
- Return a safe fallback response
- Explain limitation
- Suggest manual navigation or retry

No partial or speculative answers are allowed.

---

## 6. TESTING REQUIREMENTS (SECURITY)

Minimum coverage required:
- Prompt injection attempts
- Action-seeking intent refusal
- Ambiguous data refusal
- Trust disclosure presence
- Hallucination prevention cases

Any Copilot PR without threat coverage must be blocked.

---

## 7. CHANGE MANAGEMENT RULE

Any new Copilot capability must:
- Reference this threat model
- Declare which threat categories are impacted
- Demonstrate mitigations remain intact

If mitigations weaken → feature does not ship.

---

## 8. CANONICAL SAFETY STATEMENT

> The AI Copilot must never become the weakest trust surface in Hedgr.

If safety and velocity conflict, safety wins.

---

## Copilot Change Checklist (Required)

### 1. Scope Declaration
- [ ] This PR touches the AI Copilot
- [ ] I have read `/github/docs/ai-copilot.md`
- [ ] I have read `/github/docs/ai-copilot-threat-model.md`

---

### 2. Change Summary
**What does this PR change?**
(Brief, factual description)

---

### 3. Scope Impact
- [ ] In-scope behaviour only
- [ ] No expansion of Copilot authority
- [ ] No write access introduced
- [ ] No autonomous execution introduced

If scope is expanded, explain why and how safety is preserved:

---

### 4. Threat Model Impact
Which threat categories are affected?
- [ ] T1 — Financial Harm
- [ ] T2 — Unauthorized Action
- [ ] T3 — Hallucination
- [ ] T4 — Context Leakage
- [ ] T5 — Trust Erosion
- [ ] T6 — Prompt Injection

Describe mitigations or confirm unchanged:

---

### 5. Trust & Disclosure
- [ ] Trust/environment disclosures preserved
- [ ] Simulated vs live states remain explicit
- [ ] No ambiguous system states introduced

---

### 6. Testing
- [ ] Unit tests updated/added
- [ ] E2E Copilot tests updated/added
- [ ] No live network calls in CI

---

### 7. Reviewer Notes
(Optional context for reviewers)

---

### Final Acknowledgement
- [ ] This PR complies with Hedgr Copilot safety and architectural constraints