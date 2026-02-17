# ADR 0004 – Defense-in-depth: deterministic decisioning + server-side policy enforcement


## Status
Accepted

## Date
2026-01-28

## Decision Type
Product

## Strategic Horizon
Short-Term (MVP)

## Reversibility
Reversible

---

## Context / Problem
MVP data is incomplete; action under uncertainty increases harm.

---

## Decision
In recommendation engine: missing or conflicting signals always return wait


---

## Rationale

- A predictable fail-safe default is the cleanest trust-first behavior.

---

## Assumptions

- We can enrich signals over time to reduce false “wait”.

---

## Risks / Trade-offs

- Copilot can feel overly conservative early. 

## Revisit / Kill Criteria

- If market localization or rapid iteration requires runtime prompt configuration.

---

## Related Decisions
- ADR 0002 – Canonical system prompt as a immutable security boundary
- ADR 0003 - Defense-in-depth: deterministic decisioning + server-side policy enforcement