

# Hedgr Architecture Overview

> Status: Active
> Owner: Hedgr Core
> Last Updated: 2026-03-01

---

## 1. Purpose

This document defines the architectural constitution of Hedgr.

It answers:
- What the system is.
- What the system owns.
- What the system refuses to do.
- How major modules relate.
- What invariants must never be violated.

This is not a sprint log.
This is not a feature checklist.
This is the structural spine of the system.

---

## 2. System Thesis

Hedgr is a structured USD stability and treasury layer.

Core doctrine:
- Capital preservation > yield maximisation
- Liquidity is sacred
- Allocation is disciplined and policy-driven
- Risk must be legible
- AI is advisory, never authoritative
- Fail safe > fail open

Hedgr is not a speculative wallet.
Hedgr is not a trading engine.
Hedgr is not a yield farm interface.

---

## 3. High-Level System Boundaries

Hedgr consists of five primary layers:

### 1) UI Layer
- Next.js App Router
- Dashboard surfaces
- Semantic tone system
- Disclosure and trust banners
- No business logic authority

### 2) Ledger (Single Source of Truth)
- Canonical balance projection
- Transaction lifecycle
- Deposit / withdrawal state
- No duplication of balance logic elsewhere

Invariant:
The ledger is the only authority for balance computation.

### 3) Policy Core (MC-1)
- Market policy schema
- Overlays (manual / auto)
- Deny-by-default resolution
- Server-side enforcement
- Zod validation at boundary

Invariant:
If policy is unknown, deny by default.

### 4) Integration Adapters
- FX (fixed / coingecko)
- DeFi (mock / aave)
- Payments
- Auth

Invariant:
All integrations are gated by flags.
No live integration is allowed in CI.

### 5) Copilot Layer
- Advisory only
- Policy-aware
- Refusal-capable
- Deterministic prompt + versioning
- Build-time gated

Invariant:
Copilot cannot execute transactions.
Copilot cannot override policy.

---

## 4. Runtime Modes

Hedgr operates in explicit runtime modes controlled by flags.

Examples:
- AUTH_MODE = mock | magic
- FX_MODE = fixed | coingecko
- DEFI_MODE = mock | aave
- MARKET_MODE = manual | auto
- COPILOT_ENABLED = true | false

CI requirements:
- No live network calls
- Mocked integrations
- Deterministic outputs

See: `RUNTIME-FLAGS.md`

---

## 5. Architectural Invariants

These must remain true across refactors:

1. Ledger is the Single Source of Truth.
2. Policy enforcement happens server-side.
3. Unknown state resolves to deny.
4. Copilot is advisory-only.
5. CI must be hermetic.
6. No silent allocation shifts in UI.
7. Semantic tone must reflect real system state.

If a change violates one of these, an ADR is required.

---

## 6. Data Flow (Conceptual)

User → UI → API Route → Policy Check → Ledger → Response

Copilot:
User → Copilot UI → Policy Context Injection → Model → Policy Validation → Response

Integrations:
API Route → Adapter (flag-gated) → Normalised Response → Ledger / UI

---

## 7. Documentation Map

For module-level detail:
- `/architecture/modules/ledger.md`
- `/architecture/modules/policy-core.md`
- `/architecture/modules/copilot.md`

For decisions:
- `/architecture/decisions/`

For operational procedures:
- `/docs/ops/`

---

## 8. Change Discipline

Architecture changes must:
1. Update relevant module doc.
2. Add or update an ADR.
3. Update runtime flags documentation if applicable.
4. Preserve invariants listed above.

This document should change rarely.
When it changes, it signals structural evolution.