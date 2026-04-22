# HEDGR RETAIL UI SHIPPED ROUTE ADAPTATION STATUS PATCH PROPOSAL

## Status / Authority / Scope / Last updated

Status: Status-patch proposal artifact only (candidate language for governance; non-authorizing)  
Authority: Subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, and repo-native governance; this document does not modify `HEDGR_STATUS.md`  
Scope: Proposed **§7** / **§7a** text candidates for a bounded shipped-route retail UI adaptation ticket; no scope widening  
Last updated: 2026-04-22

---

## 1. Purpose

This artifact is a **non-authorizing patch proposal** for a **possible** update to `docs/ops/HEDGR_STATUS.md` **§7** and **§7a** if governance approves a bounded shipped-route adaptation ticket.

It bridges from the execution-request support artifact:

- `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md`

into **exact status-language candidates** only.

This document **does not** modify repo-native status. It **does not** activate **§7** or **§7a**. Approval remains solely through an explicit edit to `docs/ops/HEDGR_STATUS.md` by repo-native authority.

Alignment inputs:

- `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md`
- `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`

---

## 2. Current blocked status state

Per `docs/ops/HEDGR_STATUS.md` **§7** / **§7a** (current repo-native execution posture):

- **§7** names **no** approved next ticket (idle approved-next slot).
- **§7a** holds **no** active execution ticket (no-active-ticket stub).

**Implementation** of shipped-route retail dashboard adaptation therefore **remains blocked** until repo-native status is **explicitly** updated to name the ticket and, if work is active, to populate **§7a**.

---

## 3. Requested bounded execution slice

Compact restatement of the slice (mirrors `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md` **§3**):

**Shipped-route adaptation** in `apps/frontend/app/(app)/dashboard/**` only, to reflect the **settled money-first reference surface** (`docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`), limited to:

- **`Total balance`** label centerline on the shipped route.
- **Header hierarchy alignment** (balance-first; no shell reselection).
- **Trust read alignment** (calm, attached, subordinate; not monitoring-led).
- **`Recent activity`** as the natural first body destination (naming and transition centerline).
- **Subordinate Family C** treatment (visible, quiet, non-instrumental).
- **Bounded continuity / composure** updates only where needed for alignment (rhythm and segmentation tuning, not new sections or IA).

Prototype-route success does **not** authorize this slice; only **§7** / **§7a** updates may.

---

## 4. Inherited fixed decisions that status text must preserve

Any approved status patch must preserve these **non-reopenable** centerlines:

- **Money-first shell** retained.
- **`Total balance`** retained as balance-label centerline.
- **Balance-first hierarchy** retained.
- **Calm attached subordinate trust** retained.
- **Actions close but secondary** retained.
- **`Recent activity`** retained as first-body naming centerline.
- **Family C** retained as **visible but subordinate**.
- **Rejection of portfolio / monitoring / crypto-dashboard drift** retained.
- **Rejection of earn / APY-first framing** retained.
- **Dark mode** as **translation** of the same hierarchy and centerlines, **not** reinvention.

---

## 5. Proposed `§7` patch text

**Candidate insertion** under **§7** “Current active ticket status” (or equivalent governing subsection), replacing the idle “Approved next ticket: None named” line when governance approves activation:

```text
Approved next ticket: UI-SRA-001 — Shipped retail dashboard adaptation to settled money-first reference surface (bounded frontend/UI pass only).
```

**Accompanying compact bullets (candidate):**

- **Covers:** `apps/frontend/app/(app)/dashboard/**` presentation alignment to the settled money-first reference surface—`Total balance` label, balance-first hierarchy, calm attached trust read, `Recent activity` as first body destination, subordinate Family C quieting, bounded continuity/composure tuning only.
- **Excludes:** shell reselection, new dashboard sections, CTA redesign, Family C redesign, new trust constructs, wider dashboard restructuring, `apps/frontend/lib/engine/**` semantic or authority changes unless a future ticket explicitly scopes engine-presentational touch with full read stack compliance.
- **Excludes:** backend changes, accounting-truth or execution semantics, copy-strategy reopening outside settled centerlines.
- **Requires:** rollback posture and regression-contract review per `docs/ops/HEDGR_RETAIL_UI_SHIPPED_ROUTE_ADAPTATION_EXECUTION_REQUEST.md` **§8–§9** and `AGENTS.md` (Vitest / E2E / engine-trust surfaces as applicable).

---

## 6. Proposed `§7a` patch text

**Candidate replacement** of the **§7a** no-active-ticket stub **only when** `UI-SRA-001` is approved **and** execution is active:

```text
Active execution ticket: UI-SRA-001 — Shipped retail dashboard adaptation to settled money-first reference surface.
```

**Accompanying compact bullets (candidate):**

- **Minimum-file-set posture:** touch only shipped dashboard files (and tests/selectors) strictly required for **§3** slice; inventory files in brief or PR before edit.
- **Reversible / reviewable:** incremental diffs, easy targeted revert, no hidden widening or opportunistic refactors.
- **No redesign:** no header/shell/CTA/Family C structural reinvention; no broader dashboard restructuring.
- **No backend / engine / accounting-truth widening:** presentation-only adaptation unless governance separately authorizes scoped `lib/engine/**` presentational edits with `AGENTS.md` engine-facing read order.
- **Regression-contract awareness:** review and preserve `MC-S3-004`–`MC-S3-009` lineage intent on touched trust surfaces; document any required test updates with rollback-safe rationale.

---

## 7. Proposed guardrails to accompany status activation

When governance applies the **§7** / **§7a** patch, these guardrails should ship **in the same governance edit** (or adjacent ops note) so executors cannot drift:

- Implementation must remain **subordinate to the settled reference surface** (`docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`); no competing design pass.
- **Only** bounded shipped-route adaptation under the named ticket scope is allowed; prototype route remains reference, not authority expansion.
- Any **reopen trigger** (header direction pressure, structural redesign demand, trust-system invention) must be **surfaced in repo-native evidence**, not silently absorbed into the pass.
- **Absent continued compliance** with `AGENTS.md` (CI hermeticity, engine read order if engine-adjacent, no live-network CI), **work stops** until resolved.
- If **scope widens** during execution, **status must be revisited** (pause, update **§7** / **§7a** or close ticket) before work continues—no scope creep under the same ticket name.

---

## 8. What this patch proposal does not authorize

This proposal **does not** itself:

- **Activate** **§7** or change `HEDGR_STATUS.md`.
- **Activate** **§7a** or assign active execution.
- **Authorize implementation** or merge authority.
- **Authorize shipping** beyond the bounded ticket scope described in **§3** and **§5**.
- **Reopen** settled header, shell, or money-first direction decisions.
- **Widen** the retail UI lane beyond **bounded shipped-route adaptation** in `(app)/dashboard/**` as stated above.

---

## 9. Working conclusion

The governance chain (execution request → reference surface note → current **§7** / **§7a** idle state) is **complete enough** to support **exact**, **copy-ready** **§7** / **§7a** language candidates for ticket **`UI-SRA-001`**.

**Repo-native status** in `docs/ops/HEDGR_STATUS.md` must still **explicitly approve** (by applying the patch), **reject**, or **modify** these candidates. Until that edit exists, **no** shipped-route adaptation work should proceed under this proposal alone.
