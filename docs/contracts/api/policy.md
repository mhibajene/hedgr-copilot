

# API Contract: /api/policy

> Status: Active  
> Owner: Hedgr Core  
> Last Updated: 2026-03-01

---

## 1. Purpose

The `/api/policy` endpoint is the server-side enforcement boundary between:

- UI / Copilot (advisory + presentation layer)
- Policy Core (MC-1 behavioural authority)

This endpoint determines what is allowed.

It is the canonical policy gate.

---

## 2. Architectural Role

`/api/policy`:

- Receives proposed actions or allocation intents.
- Applies Policy Core resolution logic.
- Returns deterministic allow/deny decisions.
- Returns policy-constrained allocation bands.

It does NOT:

- Execute transactions.
- Mutate ledger state directly.
- Fetch external integrations.

It evaluates and responds.

---

## 3. Request Contract (Conceptual)

### Method

`POST /api/policy`

### Body (Example)

```json
{
  "market": "ZW",
  "allocation_proposal": {
    "liquidity": 0.30,
    "core_stable": 0.45,
    "yield_provision": 0.25
  },
  "defensive_state": "normal",
  "context": {
    "source": "ui" | "copilot"
  }
}
```

### Field Definitions

- `market` — active market code (must match allowed values).
- `allocation_proposal` — proposed band percentages (sum must equal 1.0).
- `defensive_state` — current defensive posture.
- `context.source` — identifies caller (UI or Copilot).

---

## 4. Response Contract

### Success (Allowed)

```json
{
  "allowed": true,
  "effective_allocation": {
    "liquidity": 0.30,
    "core_stable": 0.45,
    "yield_provision": 0.25
  },
  "defensive_state": "normal",
  "reason_codes": []
}
```

### Denied

```json
{
  "allowed": false,
  "effective_allocation": null,
  "defensive_state": "tightening",
  "reason_codes": [
    "YIELD_CAP_EXCEEDED"
  ]
}
```

---

## 5. Reason Codes

Reason codes must be deterministic and enumerable.

Examples:

- `UNKNOWN_MARKET`
- `INVALID_SCHEMA`
- `YIELD_CAP_EXCEEDED`
- `LIQUIDITY_FLOOR_BREACH`
- `INTEGRATION_NOT_ALLOWED`
- `DEFENSIVE_STATE_RESTRICTION`

Reason codes are part of the public contract.
They must not change without versioning.

---

## 6. Validation Rules

The endpoint must:

1. Validate request schema via Zod.
2. Validate market exists.
3. Validate allocation sums to 1.0.
4. Validate proposal respects caps.
5. Apply deny-by-default on unknown conditions.

If validation fails → return HTTP 400 with structured error.

---

## 7. Determinism Requirements

For identical inputs, `/api/policy` must return identical outputs.

No randomness.
No time-dependent behaviour.
No hidden state.

Policy version must be fixed via `MARKET_POLICY_VERSION`.

---

## 8. Copilot Interaction

When source = "copilot":

- The same policy rules apply.
- No relaxed constraints.
- Denials must include reason codes for explanation.

Copilot may surface reason codes in user-friendly language.

---

## 9. Failure Modes

If:

- Policy schema fails to load.
- Market policy version mismatch.
- Overlay resolution fails.

The endpoint must:

- Return HTTP 500.
- Log incident.
- Deny action.

Never default to allow.

---

## 10. Versioning Strategy

If the policy contract changes:

- Bump `MARKET_POLICY_VERSION`.
- Update this document.
- Add ADR entry.
- Ensure backward compatibility where required.

Breaking changes must be explicit.

---

## 11. Test Guarantees

CI must validate:

- Unknown market → deny.
- Yield cap breach → deny.
- Liquidity floor breach → deny.
- Valid allocation → allow.
- Copilot source treated identically to UI.

The policy endpoint is a governance boundary.
It must be reliable and auditable.