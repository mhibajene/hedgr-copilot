

# Module: Policy Core (MC-1)

> Status: Active
> Owner: Hedgr Core
> Last Updated: 2026-03-01

---

## 1. Purpose

The Policy Core (MC-1) is the regulatory and risk enforcement engine of Hedgr.

It determines:
- What actions are allowed.
- What allocations are permitted.
- What yield exposure is acceptable.
- What Copilot may or may not suggest.

MC-1 is the system’s guardrail layer.

If Ledger is the balance authority,
Policy Core is the behavioural authority.

---

## 2. Responsibilities

MC-1 owns:

- Market policy schema
- Market selection logic
- Overlay resolution (manual vs auto)
- Allocation caps
- Defensive posture rules
- Deny-by-default enforcement
- Server-side policy validation

MC-1 does NOT:

- Execute transactions
- Store balances
- Fetch FX rates
- Call DeFi protocols
- Render UI decisions

It evaluates.
It does not act.

---

## 3. Architectural Boundaries

### Input

- Market selection (ZW / ZA / KE / UNKNOWN)
- User state (if applicable)
- System overlays
- Allocation proposal
- Copilot advisory output (when applicable)

### Output

- Allow / Deny decision
- Policy-enforced allocation band
- Defensive state
- Yield cap status
- Reason codes

Invariant:
Policy resolution must be deterministic.

---

## 4. Policy Resolution Model

Resolution order:

1. Load MARKET_POLICY_VERSION
2. Resolve market (manual or auto)
3. Apply overlay rules
4. Evaluate allocation against caps
5. Enforce deny-by-default

If any step fails → deny.

---

## 5. Market Policy Schema

Each market policy must define:

- Liquidity minimum
- Core stable band
- Yield maximum band
- Defensive trigger threshold
- Hard cap constraints
- Allowed integrations

Example conceptual structure:

```ts
{
  market: "ZW",
  liquidity_min: 0.25,
  yield_max: 0.30,
  defensive_trigger: 65,
  allowed_integrations: ["aave"],
  caps: {
    per_protocol: 0.20
  }
}
```

All schemas must be validated using Zod at boundary.

---

## 6. Defensive Posture

MC-1 defines defensive states such as:

- Normal
- Tightening
- Defensive
- Yield Suspended

Transitions must:
- Be explicit
- Be reversible
- Preserve withdrawal availability

Invariant:
Yield reduction must never silently reduce liquidity below minimum.

---

## 7. Copilot Interaction

Copilot must:

- Receive policy context
- Respect caps
- Refuse prohibited strategies
- Surface reasoning tied to policy state

Copilot cannot:
- Override caps
- Recommend prohibited allocations
- Execute state transitions

Policy validation occurs after model output.

---

## 8. Failure Modes

If:
- Market is UNKNOWN
- Policy version mismatch occurs
- Schema validation fails
- Overlay resolution fails

System must:
- Deny action
- Log event
- Return safe response

Never default to allow.

---

## 9. Test Guarantees

CI must validate:

- Unknown market → deny
- Exceeding yield cap → deny
- Invalid schema → fail fast
- Copilot cannot bypass caps
- Defensive state respects liquidity floor

---

## 10. Change Discipline

Any change to:
- Policy schema
- Cap structure
- Defensive thresholds
- Resolution order

Requires:
1. ADR entry
2. Version bump (MARKET_POLICY_VERSION)
3. Test update
4. Documentation update

Policy is a contract.
Changes must be explicit and auditable.