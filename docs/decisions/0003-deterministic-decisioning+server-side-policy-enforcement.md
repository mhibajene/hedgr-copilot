# ADR 0003 – Defense-in-depth: deterministic decisioning + server-side policy enforcement


## Status
Accepted

## Date
2026-01-28

## Decision Type
Security

## Strategic Horizon
Short-Term (MVP)

## Reversibility
Reversible

---

## Context / Problem
Prompt-only safety is brittle; models can still output unsafe content.

---

## Decision

Add layered safety:
    ◦ Deterministic signals → recommendation
    ◦ Server-side policy enforcement (refusal override, urgency stripping, required phrases)

---

## Rationale

- System must protect users even if model output is imperfect.

---

## Assumptions

- Policy rules can remain deterministic and auditable as scope expands. 

---

## Risks / Trade-offs

- More complexity and potential conservative bias.

## Revisit / Kill Criteria

- If market localization or rapid iteration requires runtime prompt configuration.

---

## Related Decisions
- ADR 0002 – Canonical system prompt as a immutable security boundary