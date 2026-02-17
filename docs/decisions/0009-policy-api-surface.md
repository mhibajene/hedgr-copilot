# ADR 0009 – Policy Distribution Surface: GET /api/policy as Canonical Consumer Contract (Sprint 1.0 / MC-1)

## Status
Accepted

## Date
2026-02-16

## Decision Type
Architecture/Product

## Strategic Horizon
Short-Term (MVP)

## Reversibility
Reversible

---

## Context / Problem
- Policy must be consumed by multiple surfaces (UI gating, Copilot, disclosures, later backend enforcement).
- Without a single distribution surface, we risk:
  - duplicating policy evaluation logic in UI components,
  - per-market branching leaks into product flows,
  - inconsistent behavior across consumers and environments.
- We need a stable, testable interface that returns policy + metadata for debugging and audit.

---

## Decision
- Introduce a canonical policy API endpoint:
  - `GET /api/policy`
- Response shape:
  - `{ version: 'v1', market, resolvedAt, policy }`
- The endpoint is:
  - deterministic for identical env inputs
  - schema-validated
  - side-effect free
  - hermetic (no network / detection) for MC-1

---

## Rationale
- Provides a single source of truth for all consumers.
- Enables safe UI gating and Copilot constrainting without copying policy logic.
- Improves operational debuggability (market/version/resolvedAt).
- Supports incremental rollout: consumers can move to policy-driven behavior one by one (MC-2).

---

## Assumptions
- A single read-only endpoint is sufficient for MVP consumption.
- The policy payload is small and safe to return to clients (no secrets).

---

## Risks / Trade-offs
- Consumers could couple tightly to response formatting; mitigated via stable schema/versioning.
- If policy becomes remotely managed, endpoint must remain backward compatible or versioned.

---

## Revisit / Kill Criteria
- If consumers require stronger guarantees (caching, signature, integrity) → add ETag/version pinning or signed policy payloads.
- If remote policy management is introduced → keep `/api/policy` but source policy from remote store with strict validation and rollout controls.

---

## Related Decisions
- ADR 0006 – Market Policy Layer: Configurable Compliance Controls Before Multi-Market Expansion (Post Sprint 0.9)
  - This ADR provides the distribution contract that enables “config + tests” and avoids per-market code forks.
- ADR 0007 – Deny-by-Default Market Policy: UNKNOWN Fallback
  - The API must return conservative policy when inputs are missing/invalid.
- ADR 0008 – Runtime Policy Schema Validation Using Zod
  - The API boundary is a primary enforcement point for schema validation.