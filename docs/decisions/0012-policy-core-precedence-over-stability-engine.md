# ADR 0012 — Policy Core Precedence Over Stability Engine Output

**Status:** Accepted  
**Date:** 2026-03-08  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend` (policy consumption, engine state usage, user-facing product availability)

---

## Context

Hedgr already established the Market Policy Layer as a constitutional control surface for market-specific behavior.

That work introduced:

- configurable compliance controls
- deny-by-default behavior via `UNKNOWN` fallback
- canonical policy distribution
- runtime schema validation
- UI and Copilot consumers that respect policy restrictions

Sprint 2 introduces the Stability Engine as a system posture layer that may influence communication and future treasury allocation targets.

Without an explicit precedence rule, policy restrictions and engine posture could conflict. For example:

- Policy disables earn in a market.
- Engine posture indicates tightening and a reduced yield posture.

If precedence is ambiguous, downstream systems may incorrectly interpret the engine as a modifier of a product that policy has already disallowed.

We need a formal decision that policy always remains the governing authority.

---

## Decision

**Policy Core takes precedence over Stability Engine output.**

The precedence chain is:

**Policy Core → Stability Engine → UI communication / future execution inputs**

This means:

- Policy determines what is permitted.
- The Stability Engine may only shape posture within what policy already allows.
- The engine cannot weaken, override, or soften a policy restriction.
- If policy disables a feature, the resolved outcome remains disabled regardless of posture.

Example:

- Policy: earn disabled in market `ZW`
- Engine posture: `tightening`

Resolved outcome:

- Earn unavailable

Not:

- Earn capped
- Earn reduced
- Earn temporarily limited

The engine operates only inside the policy-permitted surface area.

---

## Consequences

### Positive
- Preserves compliance and market-governance integrity.
- Prevents ambiguous or conflicting product behavior.
- Keeps future execution architecture aligned with constitutional controls.
- Simplifies downstream reasoning for UI, Copilot, and future treasury systems.

### Trade-offs
- Engine-driven behavior may appear conservative in markets with restrictive policy.
- Some posture states may have no visible product effect where policy already blocks relevant features.

---

## Implementation Notes

- Policy checks should resolve before any engine-derived product presentation.
- Engine-driven UI must not imply availability where policy has already disabled access.
- Future execution layers must consume policy-constrained engine output, not raw engine intent.
- Tests should include explicit conflict scenarios to confirm policy wins.

---

## Follow-ups

- Add conflict-case tests covering policy-disabled + non-normal posture combinations.
- Document the precedence rule in Sprint 2 engine architecture notes.
- Reuse the same precedence chain in any backend or treasury execution design introduced later.