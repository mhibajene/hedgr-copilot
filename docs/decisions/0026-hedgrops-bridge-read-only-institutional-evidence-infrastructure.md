# ADR 0026 — HedgrOps Bridge as Read-Only Institutional Evidence Infrastructure

**Status:** Accepted

**Date:** 2026-07-16

**Accepted:** 2026-07-16

**Decision Type:** Architecture / Governance

**Strategic Horizon:** Short-term foundation with institutional relevance

**Visibility:** Public

**Owners:** Hedgr Core

**Reversibility:** Reversible through a superseding ADR and removal of separately implemented capability layers under repo convention

**Ticket of record:** `BRIDGE-P0-001`

**Detailed capability contract:** `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`

---

## Context

The HedgrOps Bridge currently transports bounded review evidence through allow-listed, read-only routes. It is useful for retrieval, but it does not provide a governed institutional model for broader repo-native evidence observability.

HedgrOps’ institution-enabled delivery role requires richer evidence observability so that governance state can be reconstructed from explicit sources rather than conversation memory or manual founder handoff. Those mechanisms are insufficient as durable institutional context because they are incomplete, difficult to revision-bind, and easy to mistake for current repo truth.

Richer retrieval also creates a material architectural risk: a polished projection can become shadow authority. Without source boundaries, provenance, freshness, coverage, conflict reporting, revision binding, and fail-closed behavior defined before runtime implementation, the Bridge could appear to determine what evidence authorizes.

The adopted capability contract defines the detailed evidence-observability requirements. This ADR establishes the institutional architecture principle that governs any implementation of those requirements.

---

## Decision

Adopt the HedgrOps Bridge architecture as:

> A read-only, source-bound institutional evidence transport layer that may project and package repo-native evidence but may not determine authority, mutate state, activate work, sequence implementation, accept evidence, or make institutional judgments.

The following principles are binding:

1. **Repo authority remains controlling.** `docs/ops/HEDGR_STATUS.md`, `AGENTS.md`, accepted ADRs, and active doctrine retain their existing authority. Bridge output cannot replace or override them.
2. **Bridge output remains non-authoritative.** A structured response is a transport representation of recorded evidence, not a founder decision, ticket instruction, approval, readiness determination, or evidence disposition.
3. **Repo Authority Projection is source-bound transport.** It may package directly recorded repo concepts with provenance. It may not synthesize missing values or interpret what those values authorize.
4. **CURRENT requires mandatory sources and common revision binding.** A Repo Authority Projection cannot be presented as current unless every mandatory source is present, structurally valid, fresh under the governed policy, and bound to the same immutable source revision.
5. **Missing or conflicting context fails closed.** Missing, unreadable, stale, revision-inconsistent, structurally invalid, or conflicting mandatory authority context produces a non-authorizing failure. Plausible partial output is not a substitute.
6. **Material fields require direct provenance.** Material values must identify their repo-relative source path, stable locator, immutable revision, source classification, and freshness. Metadata that was not recorded remains absent.
7. **Conflict precedence classifies; it does not resolve.** Bridge-specific precedence may identify the stronger and lower-precedence sources for reporting. It does not select a winner, synthesize a value, or supersede repo records.
8. **Product dispositions remain separate from evidence acceptance.** Product research, experiment evidence, review findings, and supporting artifacts do not become accepted institutional evidence or execution authority through retrieval.
9. **Schema fields map to repo-native concepts.** Unknown or inferred institutional concepts fail validation. Schemas cannot create governance through field naming.
10. **General-purpose repository search remains prohibited.** Any future retrieval remains separately governed, allow-listed, authenticated where required, source-bound, and read-only.
11. **Each rollout phase requires separate authorization.** Acceptance of this ADR and completion of Phase 0 do not activate Phase 1 or any later capability.

---

## Consequences

### Positive

- Future Bridge capabilities can rely on stable evidence contracts instead of inventing authority or source meaning at runtime.
- Revision binding, provenance, freshness, coverage, and conflict reporting become testable architectural properties.
- Missing institutional context becomes visible and deterministic rather than silently inferred.
- The Bridge can broaden evidence observability while keeping repo-native governance and founder authority intact.
- Runtime integration can remain independently reviewable and reversible by phase.

### Negative / trade-offs

- Rich projections require more provenance and source-manifest maintenance than summary-only responses.
- Fail-closed behavior will reject some outputs that could appear plausibly useful but cannot be proven complete or current.
- Common revision binding can delay availability when mandatory sources cannot be read consistently.
- Schema evolution must follow repo-native concept changes and may require explicit migrations.
- Each rollout phase carries separate governance and review overhead.

---

## Alternatives considered

| Alternative | Why rejected |
| ----------- | ------------ |
| Continue with conversation memory and manual founder handoff | Not durable, revision-bound, complete, or reconstructible enough for institutional context |
| Let the Bridge summarize authority autonomously | Creates shadow authority and permits inference beyond recorded repo concepts |
| Use recency to choose between conflicting sources | Newer text is not automatically controlling and recency does not resolve authority conflicts |
| Return partial authority output when mandatory sources fail | Creates false completeness and can present stale or inconsistent context as current |
| Add general-purpose repository search now | Exceeds Phase 0, weakens allow-list boundaries, and requires separate security and governance authorization |
| Couple the existing Worker routes to Phase 0 contracts immediately | Creates premature runtime dependency before separately authorized retrieval implementation exists |

---

## Assumptions

- Repo-native authority surfaces remain explicit and reviewable.
- Future phases can obtain immutable revision identifiers without enabling repository mutation.
- Stable source locators can be defined for material fields or the affected projection will fail closed.
- Evidence usefulness will justify the provenance and validation overhead; otherwise the architecture should be simplified safely.
- Existing Bridge route and action boundaries remain unchanged until a later phase is separately authorized.

---

## Risks and controls

| Risk | Control |
| ---- | ------- |
| Bridge output is treated as authority | Constant non-authorization fields, direct provenance, source subordination, and operator documentation |
| Stale or incomplete output appears current | Mandatory-source validation, common revision binding, explicit freshness / coverage, and fail-closed errors |
| Schema fields create new governance concepts | Closed canonical concept map and unknown-concept rejection |
| Conflict reporting becomes conflict resolution | Structured unresolved records with no winner, synthesis, correction, or supersession fields |
| Read-only retrieval drifts into direction | No recommendation, activation, sequencing, readiness, or product-direction fields |
| Runtime controls cannot preserve read-only behavior | Stop the affected phase and remove the capability layer under independent rollback |

---

## Reversibility

This architectural decision is reversible through a superseding ADR. Any unimplemented or implemented capability layer may be removed under repo convention, provided historical decision records remain intact and runtime dependencies are reconciled.

Do not silently delete or rewrite this accepted ADR. If the decision changes, create a superseding ADR, mark this ADR deprecated, and remove dependent capability layers through bounded, reviewable changes.

---

## Kill criteria

Supersede, narrow, or stop capability rollout when:

- Bridge output is repeatedly treated as institutional authority;
- source projections cannot be kept reliably bound to one immutable revision;
- stale or incomplete output is presented as current;
- schema concepts drift from repo-native governance;
- retrieval begins generating direction, recommendations, or execution instructions;
- runtime controls cannot preserve read-only behavior;
- conflict reporting begins selecting or synthesizing a result;
- general-purpose search or mutation enters scope without separate authorization; or
- provenance overhead materially exceeds institutional value and a safer simplification exists.

---

## Scope boundary

This ADR is principle-level. Detailed response envelopes, provenance fields, source manifests, freshness and coverage semantics, conflict records, fail-closed errors, fixtures, and validation rules belong to:

- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`; and
- `apps/bridge-worker/contracts/phase0/`.

This ADR does not add or modify an endpoint, route, Custom GPT action, snapshot, generator, runtime allow-list, deployed Worker behavior, or live Repo Authority Projection. It does not activate Phase 1, accept evidence, sequence work through Bridge, authorize mutation, or create financial or customer-money capability.

---

## References

- `docs/ops/HEDGR_STATUS.md` **§6f.6**, **§7**, **§7a**, and **§140**
- `AGENTS.md`
- `docs/ops/bridge/HEDGROPS_BRIDGE_CAPABILITY_CONTRACT.md`
- `docs/ops/bridge/README.md`
- `apps/bridge-worker/contracts/phase0/README.md`
- ADR **0023** — Governed Progress Under Uncertainty
- ADR **0024** — MVP Acceptance Is Evidence-Gated, Not Feature-Gated
- ADR **0025** — Repo-Native Green Lane Delegation Pilot
