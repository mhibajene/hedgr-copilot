# HEDGR RETAIL UI SHIPPED ROUTE ADAPTATION EXECUTION READOUT

## Status / Authority / Scope / Last updated

Status: Execution readout artifact only (records bounded work performed; does not authorize new scope)  
Authority: Subordinate to `docs/ops/HEDGR_STATUS.md` and `AGENTS.md`  
Scope: Closeout record for **`UI-SRA-001` — Shipped retail dashboard adaptation to settled money-first reference surface**  
Last updated: 2026-04-22

---

## 1. Purpose

This document records the **execution readout** for **`UI-SRA-001`**: bounded **shipped-route** presentation alignment on `apps/frontend/app/(app)/dashboard/**` to the settled **money-first** reference direction (structural alignment pass, not mockup parity).

Alignment inputs: `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md`, `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_STATUS_PATCH_PROPOSAL.md`, `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`, `docs/ops/HEDGR_RETAIL_UI_HEADER_DIRECTION_CONSOLIDATION_NOTE.md`, `docs/ops/HEDGR_RETAIL_UI_UPPER_SHELL_CONTINUATION_EXECUTION_READOUT.md`, and the implementation diff.

---

## 2. Authority and lineage note

**§7 / §7a activation** for **`UI-SRA-001`** was authored in commit **`1bd65d1`** (`docs(ops): activate UI-SRA-001 in HEDGR_STATUS sections 7 and 7a`), introducing **`docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md`** and **`docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_STATUS_PATCH_PROPOSAL.md`**.

**Shipped dashboard implementation** landed in commit **`da96e1e`** (`feat(frontend): UI-SRA-001 money-first shipped dashboard structure`) on branch **`cursor/ui-sra-001-shipped-dashboard-adaptation-3098`**.

Those commits were **not originally linear** on a single default-branch merge sequence; **governance reconciliation** brought activation artifacts onto the same branch as the implementation before this closeout. **Repo-native truth** for sequencing is this readout plus **`HEDGR_STATUS.md` §7** / **§7a** / **§44** after reconciliation merge.

---

## 3. Files changed (implementation)

- `apps/frontend/app/(app)/dashboard/page.tsx` — money-first column: **Total balance** hero using **`total`** from `useBalance` (with optional available/pending subline when divergent); **`EnginePostureHeader`** and **Recent activity** strip before **`EngineAllocationBands`**; demoted earn tile when policy-gated; `max-w-2xl` continuity.
- `apps/frontend/app/(app)/dashboard/EnginePostureHeader.tsx` — calmer hierarchy: **`sr-only`** page title **Dashboard**; visible **Overview** row + smaller posture badge; **no** `ENGINE_POSTURE_CONTEXT` edits.
- `apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx` — quieter outer chrome only (tokens).
- `apps/frontend/tests-e2e/smoke-pack.spec.ts` — post-login assertion uses **Total balance** (visible anchor) instead of visible **Dashboard** `h1`.

**Explicitly not touched:** `apps/frontend/lib/engine/**`, `apps/frontend/app/(app)/layout.client.tsx`, backend, engine semantics.

---

## 4. Validation performed (reported at readout time)

- Vitest: `dashboard.page.test.tsx`, `engine-posture-header.test.tsx`, `engine-allocation-bands.test.tsx`, `empty-error-states.test.tsx`
- ESLint on touched dashboard files; `pnpm --filter @hedgr/frontend exec tsc --noEmit`

---

## 5. Intentional non-goals (parity)

- No mockup pixel parity, no global dark-mode system, no nav rename (**Activity** unchanged), no engine copy rewrites.

---

## 6. Working conclusion

**`UI-SRA-001`** completed within **bounded shipped-route structural alignment** scope: balance-first read, demoted system-led header chrome, **Recent activity** framing where ledger has rows, quieter Family C container, no prohibited widening. **§7** / **§7a** restored to **no active ticket** on closeout per **`HEDGR_STATUS.md`** reconciliation edit.

**Merged PR:** **#132** (populate if renumbered on merge).
