

# Module: Ledger (Single Source of Truth)

> Status: Active
> Owner: Hedgr Core
> Last Updated: 2026-03-01

---

## 1. Purpose

The Ledger is the canonical balance authority of Hedgr.

It determines:
- User total balance
- Allocation distribution
- Liquidity availability
- Yield exposure
- Transaction state

If Policy Core defines what is allowed,
Ledger defines what is real.

---

## 2. Responsibilities

The Ledger owns:

- Canonical balance projection
- Transaction lifecycle state
- Allocation breakdown (Liquidity / Core Stable / Yield)
- Withdrawal availability calculation
- Defensive posture impact on balances
- Normalised integration results

The Ledger does NOT:

- Enforce policy rules (Policy Core does this)
- Fetch raw FX or DeFi data directly
- Make network decisions
- Render UI components

It computes.
It does not decide permissions.

---

## 3. Core Invariants

1. Ledger is the Single Source of Truth for balances.
2. No UI component may compute balance independently.
3. Policy decisions cannot mutate balance directly; they constrain future allocations.
4. Balance projection must be deterministic.
5. Failed integrations must not corrupt ledger state.

If any invariant is broken, it is a structural defect.

---

## 4. Data Model (Conceptual)

### Balance Structure

Conceptual structure:

```ts
{
  total_balance: number,
  liquidity: number,
  core_stable: number,
  yield_provision: number,
  defensive_state: "normal" | "tightening" | "defensive" | "suspended",
  last_updated: ISODate
}
```

### Transaction Structure

```ts
{
  id: string,
  type: "deposit" | "withdrawal" | "rebalance",
  status: "pending" | "settled" | "failed",
  amount: number,
  timestamp: ISODate
}
```

All balances are derived from ledger events.

---

## 5. Balance Projection Model

Balance is not stored as a static number.
It is projected from:

1. Deposits
2. Withdrawals
3. Yield accrual (if applicable)
4. Rebalances

Projection must:
- Be idempotent
- Be replayable
- Produce identical output for identical inputs

---

## 6. Allocation Model

Ledger reflects allocation bands enforced by Policy Core:

- Liquidity (immediate withdrawal)
- Core Stable (low-risk allocation)
- Yield Provision (capped exposure)

Ledger must never:
- Allocate above policy caps
- Reduce liquidity below policy minimum

If policy denies allocation, ledger must reject mutation.

---

## 7. Withdrawal Availability Logic

Withdrawal availability is derived from allocation state:

- Available now = Liquidity
- After 24h notice = Liquidity + Core Stable
- After lock period = Yield Provision (if not suspended)

Invariant:
Withdrawal calculations must reflect defensive state.

If yield is suspended:
- Yield Provision cannot be withdrawn as yield exposure.

---

## 8. Defensive State Interaction

Defensive states influence allocation proportions but do not:
- Destroy capital
- Hide balances
- Block withdrawals

Ledger must:
- Reflect reduced yield band
- Preserve capital totals
- Maintain liquidity guarantees

---

## 9. Integration Normalisation

All integration responses must be normalised before entering ledger:

- FX rates
- Yield rates
- Protocol balances

Raw adapter outputs must never directly alter ledger state.

---

## 10. Failure Modes

If:
- Integration adapter fails
- FX source unavailable
- DeFi adapter unavailable

Ledger must:
- Freeze last known safe state
- Log incident
- Prevent corrupted projection

Never produce partial or undefined balance states.

---

## 11. Test Guarantees

CI must validate:

- Projection determinism
- Allocation never exceeds caps
- Liquidity floor preserved
- Defensive state reduces yield band
- Replay of transaction history produces identical balance

---

## 12. Change Discipline

Changes to ledger logic require:

1. ADR entry
2. Test updates
3. Documentation update
4. Projection validation

Ledger is financial infrastructure.
Changes must be explicit and reversible.