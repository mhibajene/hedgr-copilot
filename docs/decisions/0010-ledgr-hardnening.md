

# ADR 0010 — Ledger Hardening: Schema Versioning, Upsert Semantics, and Single Status Map Authority

**Status:** Accepted  
**Date:** 2026-03-01  
**Owners:** Hedgr Core  
**Scope:** `apps/frontend` (ledger persistence + tx lifecycle presentation)

---

## Context

Sprint 1.1 delivered contract alignment work that moved Hedgr toward a governed financial core:

- Deposits now use a backend contract with idempotency keyed by `txn_ref`.
- The frontend ledger is used as the canonical UI source for balances and activity.
- Transaction lifecycle labels and UI tones previously risked drift due to duplicated maps across UI components.

As we approach deeper work on the Hedgr Stability Engine, we need a stable base:

- Deterministic ledger persistence behavior across schema changes.
- Safe, merge-based transaction updates (no duplicate rows; no accidental overwrite of immutable financial fields).
- A single source of truth for status presentation (label + tone), to prevent UI divergence.

---

## Decision

We adopt three hardening decisions for the frontend ledger and lifecycle presentation.

### 1) Ledger schema versioning with clear-on-mismatch

- Introduce `LEDGER_SCHEMA_VERSION`.
- Persist ledger storage as:

```json
{ "version": 2, "transactions": [/* ... */] }
```

- On load, if the persisted `version` does not match `LEDGER_SCHEMA_VERSION`, treat the ledger as **empty** (clear-on-mismatch).
- Corrupt JSON or invalid persisted data is also treated as empty.

Rationale: this avoids runtime breakage and silent corruption during rapid iteration. Until we need backward-compatible migrations, the safest behavior is explicit reset.

### 2) Upsert semantics for ledger writes (merge only allowed fields)

- Adopt `upsertTx(update)` where:
  - `update` is `Partial<Tx> & Pick<Tx, 'txn_ref'>`.
  - If the transaction exists, merge **only allowed fields**.
  - If it does not exist, create a new entry **only** when required immutable fields are present.

**Allowed to update**
- `status`
- `updated_at`
- `failure_reason` (only when explicitly provided; cleared when status becomes `settled`)

**Immutable (never overwritten once set)**
- `txn_ref`
- `type`
- `amount_zmw`
- `amount_usd`
- `fx_rate`
- `created_at`

`append`, `confirm`, and `fail` delegate to `upsertTx` semantics.

Rationale: deposits/withdrawals will eventually require async reconciliation and state transitions. Upsert provides idempotency safety and prevents duplicate rows while protecting immutable financial facts.

### 3) Single STATUS_MAP authority for lifecycle presentation

- Remove duplicated label and styling maps from UI components.
- Introduce a single `STATUS_MAP` that maps **PublicTxStatus → { label, tone }**.
- Provide helpers:
  - `getPresentationForPublicStatus(publicStatus)` (with defensive fallback)
  - `getStatusPresentation(ledgerStatus)` (composition of internal→public + public→presentation)

- `TxStatusPill` becomes a dumb renderer and derives label/tone from `getPresentationForPublicStatus`.

Rationale: status semantics must not drift across components. Centralizing presentation mapping makes future lifecycle additions (e.g., Stability Engine-driven statuses) safe and consistent.

---

## Consequences

### Positive
- Deterministic behavior on schema changes; no broken UI due to stale persisted state.
- Ledger updates are safe and merge-based; duplicates are prevented.
- Immutable financial fields are protected from accidental overwrite.
- Single authority for status label + tone reduces UI inconsistency risk.

### Trade-offs
- Clear-on-mismatch resets local ledger state on schema bumps (intentional). This is acceptable pre-prod; if/when persisted state becomes user-critical, we must implement migrations.
- Upsert merge semantics add a small amount of complexity to the store, but simplify future reconciliation.

---

## Implementation Notes

- Storage adapter implements `PersistStorage` (not `StateStorage`) to return `StorageValue<{ transactions: Tx[] }>`.
- Persist options may use `partialize: (s) => ({ transactions: s.transactions })` so the persisted slice is stable.
- Tests must mock `Date.now()` when asserting `updated_at` changes.
- E2E fixtures that seed `hedgr:ledger` must use the raw persisted shape `{ version: LEDGER_SCHEMA_VERSION, transactions: [...] }`.

---

## Follow-ups

- If/when we need backward compatibility, introduce a migration path keyed by schema version rather than clear-on-mismatch.
- Consider introducing a separate step-tone map for TxDetailModal timeline steps if timeline styling needs the same single-authority guarantee as status pills.