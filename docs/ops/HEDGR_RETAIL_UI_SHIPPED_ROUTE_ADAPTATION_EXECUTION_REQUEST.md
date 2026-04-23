# HEDGR RETAIL UI SHIPPED ROUTE ADAPTATION EXECUTION REQUEST

## Status / Authority / Scope / Last updated

Status: Execution-request support artifact only (governance-to-execution bridge; non-authorizing)  
Authority: Subordinate to `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and repo-native governance; this document does not grant implementation authority  
Scope: Bounded shipped-route retail dashboard adaptation request aligned to the settled money-first reference surface; no scope widening beyond the slice defined below  
Last updated: 2026-04-22

---

## 1. Purpose

This artifact requests **bounded shipped-route execution authorization** to adapt the **shipped** retail dashboard route (`apps/frontend/app/(app)/dashboard/**`) so its presentation aligns with the **settled money-first reference surface** documented in the lane reference and consolidation notes cited below.

It exists solely to support **possible** naming of a tightly bounded execution ticket in `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.

This document is **not** an authorization to implement. It does not substitute for **§7** naming an approved ticket. It does not treat prototype-route completion or reference-surface parking as shipped-route approval.

Primary alignment inputs:

- `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`
- `docs/ops/HEDGR_RETAIL_UI_HEADER_DIRECTION_CONSOLIDATION_NOTE.md`
- `docs/ops/HEDGR_RETAIL_UI_UPPER_SHELL_CONTINUATION_EXECUTION_READOUT.md` (**`UI-USH-001`** closeout record)
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`

---

## 2. Current execution-status state

Per `docs/ops/HEDGR_STATUS.md` **§7** (as of this artifact’s drafting):

- **§7** currently names **no** approved next implementation ticket.
- **§7a** currently holds **no** active execution ticket (no-active-ticket stub).
- **`MC-S3-012`** (prototype money-first shell spike) and **`UI-USH-001`** (upper-shell continuation refinement) are recorded as **closed** within their bounded scopes; the prototype refinement chain is **complete** and the prototype reference surface is **settled** per `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`.

**Implementation of shipped-route adaptation remains blocked** until repo-native authority updates **§7** (and, if approved, **§7a**) to name an explicit bounded ticket. Prototype-route success is **not** shipped-route authorization (`docs/ops/HEDGR_STATUS.md` **§7** future-work guardrail).

---

## 3. Requested shipped-route execution slice

Request **only** a bounded **shipped-route adaptation** under `apps/frontend/app/(app)/dashboard/**` to reflect the **settled reference surface**, including **only** the following elements:

- **Balance label adaptation** to **`Total balance`** (centerline alignment with `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`).
- **Preservation of balance-first hierarchy** (balance remains the unmistakable primary anchor).
- **Calm attached trust treatment** (trust visible and subordinate to the money anchor; not monitoring-led).
- **`Recent activity` framing** as the **natural first body destination** after the upper shell (naming and transition centerline per `docs/ops/HEDGR_RETAIL_UI_HEADER_DIRECTION_CONSOLIDATION_NOTE.md` and `docs/ops/HEDGR_RETAIL_UI_UPPER_SHELL_CONTINUATION_EXECUTION_READOUT.md`).
- **Subordinate Family C treatment** (governed trust-layer family remains **visible but quiet** relative to the anchor and activity, consistent with the settled prototype posture and **`UI-USH-001`** quieting intent).
- **Bounded continuity / composure alignment** only where needed so the shipped column reads as **one composed flow** aligned to the settled reference surface (spacing and segmentation **tuning**, not new structure), mirroring the rhythm discipline recorded in `docs/ops/HEDGR_RETAIL_UI_UPPER_SHELL_CONTINUATION_EXECUTION_READOUT.md` **without** expanding file scope beyond the minimum required for shipped-route parity.

Anything outside this list is **out of scope** for this request unless a **separate** **§7**-named ticket explicitly authorizes it.

---

## 4. Inherited fixed decisions

The following decisions are **inherited as fixed** for any authorized shipped-route pass; this request does **not** reopen them:

- **Money-first shell** retained as the base direction (`docs/ops/HEDGR_RETAIL_UI_HEADER_DIRECTION_CONSOLIDATION_NOTE.md`).
- **`Total balance`** retained as the balance-label centerline (`docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md`).
- **Balance-first hierarchy** retained.
- **Calm attached subordinate trust** retained.
- **Actions close but secondary** retained.
- **`Recent activity`** retained as the naming centerline for the first body section.
- **Family C** retained as **visible but subordinate** (not lead identity of the header).
- **Rejection of portfolio / monitoring / crypto-dashboard drift** retained (`docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md` **§5**; consolidation note **§5**).
- **Rejection of earn / APY-first framing** retained.
- **Dark mode** treated as **translation** of the same centerlines and hierarchy, **not** reinvention or a parallel design system.

Engine read-only posture, informational allocation bands, and doctrine constraints in `.cursorrules` / ADRs remain binding; this request is **presentation alignment** to a settled retail reference, not a widening of engine authority.

---

## 5. Allowed execution class requested

Request **only**:

- A **bounded shipped-route frontend/UI adaptation pass** scoped to the minimum file set needed to realize **§3** on `(app)/dashboard/**` and directly adjacent dashboard-only presentation hooks **if** strictly necessary for layout continuity (no speculative refactors).
- **Reversible, reviewable** edits with clear diffs and no hidden scope.
- **No logic widening** (no new product states, no new execution or accounting semantics, no policy or engine contract changes).
- **No backend** changes and **no engine authority expansion** (no new trust constructs, no reshaping of `EngineState` semantics, no coupling that implies ledger truth).

`AGENTS.md` hermetic CI posture, engine-facing read order when touching `apps/frontend/lib/engine/**`, and existing regression contracts remain in force for any implementation that governance later authorizes.

---

## 6. Explicitly blocked changes

The following are **explicitly out of scope** and must **not** be bundled into the requested slice:

- **Shell reselection** or variant reopening.
- **New dashboard sections** beyond what is strictly required to mirror the settled first-body destination and subordinate trust treatment already named in **§3**.
- **CTA redesign** (primary action semantics and control set remain governed elsewhere; only secondary placement/treatment consistent with “actions close but secondary” is in bounds if already implied by reference alignment—and then only minimally).
- **Family C redesign** (structure, pattern, or trust-system reinvention).
- **New trust-system constructs**.
- **Broader dashboard restructuring** (IA sweep, unrelated tiles, new feeds beyond bounded `Recent activity` framing on the shipped route as authorized).
- **Backend**, **engine**, or **accounting-truth** changes.
- **Copy-strategy reopening** outside the **settled centerlines** (`Total balance`, `Recent activity`, calm attached trust, rejections in **§4**).

---

## 7. Acceptance checks

An authorized pass should be verifiable as follows:

- **Balance still reads first** on the shipped dashboard route.
- **`Total balance`** is present as the balance label centerline (or equivalent shipped rendering that does not drift from that centerline).
- **Trust reads as reassurance**, not monitoring, instrumentation, or portfolio surveillance.
- **`Recent activity`** remains the **natural first body destination** after the upper shell.
- **Family C** remains **visible but quiet** and subordinate to the money anchor and activity.
- The **shipped route feels more aligned** to the settled reference surface **without** broader product or IA drift.
- **No prohibited widening** occurred (no violations of **§6**, no engine/backend authority expansion).

---

## 8. Reversibility / rollback posture

The requested pass, once authorized, must be:

- **Incremental** (mergeable steps or a single coherent PR with a narrow diff footprint).
- **Reversible** via straightforward revert of the touched shipped-route files.
- **Easy to roll back** without migrations, feature flags required for safety, or cross-package coupling introduced solely for this pass.

Emphasize **minimum viable file touch** and **no hidden widening** (no opportunistic cleanup, no unrelated component rewrites).

---

## 9. Regression-contract expectations

Before and during implementation (only after **§7** / **§7a** authorize a ticket), executors must:

- **Identify explicitly** the shipped files to be edited **before** editing (inventory in ticket brief or PR description).
- **Review** affected Vitest specs, Playwright smoke expectations, and any **engine trust-surface** tests if co-located dashboard presentation touches surfaces covered by `MC-S3-004` through `MC-S3-009` lineage (`docs/ops/HEDGR_STATUS.md` **§6**).
- **Avoid silent breakage** of non-target dashboard behavior (error/empty paths, policy gating, existing `data-testid` contracts unless the ticket explicitly updates selectors with coordinated test edits).
- **Document clearly** if test updates are required and **why** (presentation-only selector or copy centerline alignment), with **rollback-safe** boundaries (tests assert posture, not unauthorized semantics).

If any change would require edits under `apps/frontend/lib/engine/**`, the active ticket must explicitly scope that touch and executors must follow `AGENTS.md` engine-facing read stack; **prefer** dashboard-route composition changes that preserve existing engine contracts unless governance names a separate engine-presentational ticket.

---

## 10. Requested repo-native action

Request the following **repo-native** updates to `docs/ops/HEDGR_STATUS.md` **when governance approves** proceeding:

- **Name explicitly** in **§7** a **new bounded shipped-route adaptation ticket** whose scope clause matches **§3**–**§6** of this request (or a strictly narrower subset), including **rollback posture** and **regression-contract plan** pointers.
- Populate **§7a** with the **active execution brief** **only if** that ticket is approved.

**Absent** those **§7** / **§7a** updates, **no implementation** of shipped-route adaptation should proceed. This artifact does not perform those updates.

---

## 11. Working conclusion

The **prototype refinement chain** is **complete and parked**; the **settled reference surface** is recorded in `docs/ops/HEDGR_RETAIL_UI_MOCKUP_REFERENCE_SURFACE_NOTE.md` and consolidated header direction in `docs/ops/HEDGR_RETAIL_UI_HEADER_DIRECTION_CONSOLIDATION_NOTE.md`, with **upper-shell continuation** closeout evidence in `docs/ops/HEDGR_RETAIL_UI_UPPER_SHELL_CONTINUATION_EXECUTION_READOUT.md`.

**Mirroring that surface into the shipped `(app)/dashboard` route** is a **distinct** step that requires a **separate, explicitly named, bounded shipped-route ticket** under **§7** with **§7a** execution authority if approved. Prototype completion does **not** authorize that step (`docs/ops/HEDGR_STATUS.md` **§7**).

This execution request is offered so governance may **approve or decline** shipped-route adaptation **without ambiguity**, on a **tight boundary** only.
