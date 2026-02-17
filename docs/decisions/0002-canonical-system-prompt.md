# ADR 0002 – Canonical system prompt as a immutable security boundary

## Status
Accepted

## Date
2026-01-28

## Decision Type
Security

## Strategic Horizon
Medium-Term (Scale)

## Reversibility
Reversible

---

## Context / Problem
Prompt injection and prompt drift create inconsistent behavior and safety gaps.

---

## Decision

Implement a canonical system prompt (SSoT) with strict disclaimers + environment/data-mode disclosure.

---

## Rationale

- Hard-coded + tested prompt prevents policy drift and reduces injection surface area

---

## Assumptions

- Prompt changes are rare and will be handled via versioned code updates.

---

## Risks / Trade-offs

- Less flexibility
- Copy changes require code + tests.



## Revisit / Kill Criteria

- If market localization or rapid iteration requires runtime prompt configuration.

---
