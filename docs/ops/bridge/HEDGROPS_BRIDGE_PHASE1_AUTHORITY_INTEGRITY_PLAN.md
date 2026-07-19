# HedgrOps Bridge — Phase 1 Authority-Integrity Plan

**Status:** Governing implementation specification for active `BRIDGE-P1-001` (Phase 1 authority-integrity only)  
**Ticket of record (prep):** `BRIDGE-P1-PREP-001` — **Completed** (**§151** / Internal **D-043**)  
**Active implementation ticket:** `BRIDGE-P1-001` (**§152** / Internal **D-044** / **§6f.8**)  
**Authority:** `docs/ops/HEDGR_STATUS.md` **§6f.8** / **D-044** / **§152**; Founder dispositions **F1–F8** **D-042** / **§150**; prep closeout **§151** / **D-043**; ADR **0026**; adopted Bridge capability contract; residuals **R1–R5** locked in **§7a**  
**Date:** 2026-07-19  
**Visibility:** Internal  
**HedgrOps / Founder path:** Prep complete → `BRIDGE-P1-001` activated for Phase 1 authority-integrity implementation under Controlled Parallelism v8 

---

## 0. Non-authorization statement (binding)

This document is the **governing planning specification** for Lane R prep. It is **not** Phase 1 implementation authority.

It does **not**:

- activate Phase 1 or any later Bridge phase;
- authorize Worker, endpoint, route, action-schema, allow-list, or Custom GPT changes by itself;
- authorize live RAP serving until a separately named Phase 1 implementation ticket is activated under **§7** / **§7a**;
- replace, rewrite, or date-bump `docs/ops/bridge/current-status.json` under this prep ticket;
- accept Evidence Register evidence, clear gates, sequence Class B / Class C, or authorize customer-money activity;
- alter Lane V (`CLASS-A-VAL-002`) research scope, evidence, or disposition;
- activate tickets, determine sequencing, reconcile authority conflicts, infer missing authority, approve readiness, project product-learning capability, or expose implementation-planning surfaces through Bridge output.

Any Phase 1 **implementation** requires a **separate** Founder decision and explicit **§7** / **§7a** naming after this plan’s dispositions are treated as binding inputs.

Cross-lane default with Lane V: `NO CROSS-LANE IMPACT`.

---

## 1. Purpose and institutional outcome

**Institutional outcome:** Authority Integrity.

Replace the legacy manually maintained authority snapshot with a deterministic, source-bound Repo Authority Projection that preserves authority integrity while remaining strictly read-only and non-authoritative.

**Not in scope for Phase 1:**

- product intelligence;
- decision intelligence;
- learning orchestration;
- implementation automation;
- governance automation;
- Phase 2+ contract capabilities.

---

## 2. Governing inputs

| Class | Artifact |
| ----- | -------- |
| Repo sequencing | `HEDGR_STATUS.md` **§6f.7**, **§7**, **§7a** (`BRIDGE-P1-PREP-001`), **§149**, **§150** / **D-042** |
| Architecture principle | ADR **0026** |
| Adopted capability contract | `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md` |
| Phase 0 foundation (unused at runtime) | `apps/bridge-worker/contracts/phase0/` |
| Phase 0 closeout | `HEDGR_STATUS.md` **§141** |
| Current live runtime | `apps/bridge-worker/src/index.js`, `openapi.yaml`, static snapshots under `docs/ops/bridge/*.json` |
| Founder disposition package | HedgrOps Review Addendum — Founder Feedback & Proposed Founder Disposition (F1–F8), recorded **§150** / **D-042** |

---

## 3. Phase 1 objective alignment (contract §14)

| Phase 1 duty | Binding interpretation |
| ------------ | ---------------------- |
| Provenance metadata | Every material RAP field **must** carry field-level provenance (path, stable locator, immutable revision, classification, freshness). Missing provenance is a kill criterion. |
| Freshness / degraded posture | Emit only closed integrity states per **F1** (below). **Never infer CURRENT.** |
| Coverage | Mandatory gaps fail closed as `INSUFFICIENT` (Phase 0 coverage enum). Optional omissions may be `PARTIAL` only when explicit. |
| Conflict reporting | Attribute unresolved conflicts; classify by Bridge precedence; **never resolve**; unresolved authority disagreement is a kill criterion. |
| Source-revision binding | **Single** immutable revision across all mandatory sources (**F2**). Mixed revisions fail closed. |
| Placeholder replacement | Legacy `current-status.json` becomes **Deprecated** through an explicit compatibility period (**F6**), then retires; never silent remove / silent semantic change. |
| Generation model | **Deterministic build-time generation**; runtime serves generated artifacts only (**F4**). Dynamic generation requires future separate authority. |
| Route strategy | Preserve existing authority endpoint contract; prefer replacement behind existing authority endpoints (**F5**). |
| Tests | Hermetic read-only + fail-closed tests, including **conflict-classification** tests and no-inference tests. |

Phase 2+ remains out of scope.

---

## 4. Mandatory finding — stale legacy authority snapshot

| Field | Value |
| ----- | ----- |
| Artifact | `docs/ops/bridge/current-status.json` |
| `generated_at` | `2026-06-24T00:00:00.000Z` |
| Class | Legacy bounded status **placeholder**; **not** a RAP |
| Refresh coverage | **Not** updated by `pnpm bridge:snapshots:refresh` |
| Runtime mapping | `/authority`, `/authority-summary`, `/current-status` |
| Self-declared ambiguity | `"Active ticket state not resolved by this bridge snapshot."` |

**Related hygiene (non-remediating):** On 2026-07-19, review snapshots were refreshed to `2026-07-17` weekly. That does **not** remediate `current-status.json`.

---

## 5. Founder dispositions F1–F8 (Accepted — Internal D-042 / §150)

These dispositions are **repo-native and binding** for any later Phase 1 implementation brief. They supersede the prior “open configuration” framing in this plan where they decide the question. Residual open items are listed in §7.

### F1 — Freshness / integrity state model — **Accepted**

Adopt integrity states:

- `CURRENT`
- `STALE`
- `UNKNOWN`
- `INSUFFICIENT`

`CURRENT` requires **all** of:

- all mandatory sources present;
- common immutable revision;
- freshness inside the adopted policy;
- complete mandatory coverage.

Any failure **downgrades**. **Never infer CURRENT.**

**Phase 0 mapping (no silent enum invention):** Keep Phase 0 closed enums `freshness: CURRENT|STALE|UNKNOWN` and `coverage: COMPLETE|PARTIAL|INSUFFICIENT`. Founder `INSUFFICIENT` is the fail-closed degraded / insufficient-coverage posture. Envelope freshness must not claim `CURRENT` when coverage is `INSUFFICIENT` or when F1 gates fail.

**Residual:** Numeric wall-clock TTL (`phase0-policy.json` `ttl_seconds`) remains `UNRESOLVED_CONFIGURATION` until a separate Founder decision. Until then, STALE/CURRENT evaluation must not invent a TTL; revision mismatch, supersession, missing sources, and incomplete mandatory coverage remain sufficient to refuse `CURRENT`.

### F2 — Immutable revision binding — **Accepted**

Require a **single immutable revision** across:

- `HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADR index
- active doctrine index

Mixed revisions **fail closed**.

### F3 — Mandatory doctrine / authority inputs — **Accepted**

Mandatory authority inputs are:

- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`
- accepted ADR index
- active doctrine index

The generator **never** decides doctrine completeness. **Repository defines completeness.** If an active doctrine index does not yet exist as a canonical repo artifact, a future Phase 1 implementation ticket must consume a repo-adopted index (created/adopted under that ticket’s §7a or a prerequisite named ticket) — it must not synthesize completeness.

### F4 — Runtime generation model — **Accepted**

Prefer **deterministic build-time generation** with runtime serving **only** generated artifacts.

Reasoning recorded: reproducible; CI-verifiable; easier provenance; deterministic fixtures; easier rollback; smaller attack surface.

**Dynamic / request-time generation** requires future separate authority.

### F5 — Runtime route strategy — **Accepted**

Maintain the existing consumer contract. Prefer **replacement behind the existing authority endpoints**. Avoid multiple competing authority endpoints unless compatibility genuinely requires them.

### F6 — Legacy snapshot migration — **Accepted**

Legacy snapshot becomes **Deprecated** before eventual retirement.

- Never silently remove.
- Never silently change semantics.
- Compatibility period must be **explicit** in the Phase 1 implementation §7a.

### F7 — Source loading security boundary — **Accepted**

Require:

- explicit allow-list;
- explicit loader;
- no arbitrary repo browsing;
- no glob expansion;
- no runtime discovery;
- no recursive scanning;
- no external retrieval.

### F8 — Rollout kill criteria — **Accepted**

Immediate rollback if:

- provenance missing;
- mixed revisions detected;
- mandatory source missing;
- field inference detected;
- authority disagreement unresolved;
- fail-closed no longer deterministic;
- runtime emits `CURRENT` incorrectly;
- projection appears authoritative rather than projected.

---

## 6. Anti-patterns (explicit)

1. Fake freshness / date-bump `current-status.json` into CURRENT.
2. Infer any material RAP field (active ticket, sequencing, readiness, dispositions, etc.).
3. Resolve authority conflicts in the Bridge.
4. Dynamic RAP generation without separate authority (violates F4).
5. New competing authority endpoints without demonstrated compatibility need (violates F5).
6. Silent legacy removal or silent semantic change (violates F6).
7. Arbitrary discovery / glob / external fetch (violates F7).
8. Phase 2+ leakage under a Phase 1 label.
9. Treating Bridge output as ticket activation, sequencing, evidence acceptance, or readiness approval.
10. Widening Lane V from Bridge work.

---

## 7. Cutover design (binding preferences)

### 7.1 Generation and serving

| Concern | Binding choice |
| ------- | -------------- |
| RAP production | Deterministic **build-time** generator (CI / hermetic script) |
| Runtime Worker | Serves allow-listed **generated** RAP artifact(s) only |
| Dynamic generation | Deferred; separately authorized later if ever |

### 7.2 Routes and legacy mode

| Concern | Binding choice |
| ------- | -------------- |
| Authority endpoints | Preserve existing `/authority`, `/authority-summary`, `/current-status` consumer contract where possible |
| RAP placement | Prefer in-place replacement behind those endpoints once RAP artifact is proven |
| Legacy placeholder | Enter **Deprecated** mode with explicit compatibility period; document degraded legacy semantics; then retire |
| Degraded legacy mode | While deprecated, legacy payload remains explicitly non-RAP / non-CURRENT / non-sequencing; consumers must not treat it as authority integrity projection |

### 7.3 Fail-closed behavior

Until F1 gates are satisfied:

- do not emit `CURRENT`;
- emit `STALE`, `UNKNOWN`, and/or coverage `INSUFFICIENT` as appropriate;
- retain non-authorizing booleans;
- return attributed conflicts without resolution.

### 7.4 Residual items before implementation activation

Still required in a future Phase 1 implementation §7a (not invented here):

| Residual | Notes |
| -------- | ----- |
| R1 | Explicit compatibility-period length / end condition for F6 deprecation |
| R2 | Canonical **active doctrine index** path if not already adopted |
| R3 | Immutable revision identifier format (e.g. git tree/commit SHA) and how build binds all mandatory files to one revision |
| R4 | Whether wall-clock TTL is adopted later or STALE remains revision/supersession-only |
| R5 | Exact generated artifact path(s) and allow-list entries for Worker serve |

---

## 8. Verification criteria (future Phase 1 implementation)

1. Build-time generator is hermetic and deterministic for identical source revision.
2. Provenance present on every material field; missing provenance fails tests and kills rollout (F8).
3. Revision-binding tests: mixed revisions fail closed (F2).
4. Freshness tests: never inferred CURRENT; incorrect CURRENT is kill (F1/F8).
5. **Conflict-classification tests** (precedence classifies; does not resolve).
6. **No-inference tests** for ticket/sequencing/readiness/disposition fields.
7. Allow-list loader tests: no glob, no recursive scan, no external retrieval (F7).
8. Route/consumer contract evidence for existing authority endpoints (F5).
9. Explicit Deprecated → retire record for legacy snapshot (F6).
10. Non-authorization envelope preserved on all authority-class responses.
11. No Phase 2+ fields.
12. Lane V `NO CROSS-LANE IMPACT`.

---

## 9. Stop / rollback / kill criteria (future Phase 1 implementation)

**Kill / immediate rollback (F8 + prep constraints):** provenance missing; mixed revisions; mandatory source missing; field inference; unresolved authority disagreement; non-deterministic fail-closed; incorrect CURRENT; projection presented as authoritative; allow-list/discovery breach; dynamic generation without authority; silent legacy semantic change; Lane V impact; Class B / customer-money implication.

**Rollback:** single revert of Phase 1 generator, artifacts, Worker allow-list/docs changes; restore prior static serve including deprecated placeholder if needed **as placeholder**; leave Phase 0, this plan, and Lane V intact.

---

## 10. Groundedness recommendation (non-authorizing)

**HedgrOps / Founder path:** APPROVE WITH REQUIRED REVISIONS — **revisions incorporated in this document**; dispositions recorded in **§150** / **D-042**.

**Now true:**

- F1–F8 are Accepted repo-natively for planning completeness of `BRIDGE-P1-PREP-001`.
- This plan is suitable to become the governing specification for translating a **bounded Phase 1 implementation brief**.

**Still not true:**

- Phase 1 implementation is activated;
- residuals R1–R5 are fully closed;
- runtime RAP exists;
- legacy placeholder is remediated in production;
- Lane V is affected.

**Next governed step:** `BRIDGE-P1-001` is **active** under **§152** / **D-044**. Implement per **§7a** with locked R1–R5. Lane V remains independent (`NO CROSS-LANE IMPACT`).

---

## 11. Deliverable checklist (`BRIDGE-P1-PREP-001`)

| Criterion | Status |
| --------- | ------ |
| Explicit non-authorizing posture | §0 |
| Authority-integrity outcome only | §1 |
| Stale placeholder finding | §4 |
| F1–F8 Accepted and incorporated | §5 |
| Provenance + no-inference tightened | §3, §6, §8 |
| Build-time generation locked (F4) | §5, §7.1 |
| Existing endpoint preference (F5) | §5, §7.2 |
| Deprecated legacy mode (F6) | §5, §7.2 |
| Conflict-classification tests required | §8 |
| Kill criteria (F8) | §5, §9 |
| Residuals explicit without inventing values | §7.4 |
| Lane V unchanged / no Phase 1 runtime under this ticket | Binding |

---

## 12. References

- `docs/ops/HEDGR_STATUS.md` — **§6f.7**, **§7a** Lane R, **§141**, **§149**, **§150** / **D-042**
- `docs/decisions/0026-hedgrops-bridge-read-only-institutional-evidence-infrastructure.md`
- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`
- `docs/ops/bridge/current-status.json`
- `apps/bridge-worker/contracts/phase0/phase0-policy.json`
- `apps/bridge-worker/contracts/phase0/initial-authority-source-manifest.json`
- `apps/bridge-worker/VERIFICATION.md`
- `docs/ops/governance/HEDGR_GOVERNED_PARALLEL_PASS_CHECKLIST.md`
