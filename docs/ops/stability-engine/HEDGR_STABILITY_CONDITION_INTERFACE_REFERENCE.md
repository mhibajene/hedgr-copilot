# Hedgr Stability Condition Interface Reference

## 1. Status and authority

| Field | Value |
| ----- | ----- |
| Status | Reference Material |
| Authority | Non-authoritative |
| Purpose | Interpretation aid only |
| Track | Stability Engine Governance Preservation |
| Source posture | Preservation, not authority |
| Implementation impact | None |

This document is a repo-native reference artifact. It preserves durable findings from the Stability Condition Interface program so future review does not have to rediscover the same communication and trust-surface conclusions.

This document is not an ADR, not a design spec, not a product requirement, not an execution brief, and not sequencing authority.

Reference does not equal authority.

This document does not authorize:

- implementation
- UI changes
- state models
- ADR creation
- roadmap activation
- component contracts
- runtime behavior
- engine logic
- allocation logic
- thresholds
- activation criteria
- execution semantics

If this document conflicts with repo authority, repo authority wins.

---

## 2. Executive summary

The Stability Condition Interface is a communication and interpretation frame for understanding how the Stability Engine expresses trust.

It treats the Stability Engine as a condition system. The primary interpretive question is not "what portfolio composition is being shown?" or "what action happened?" The primary interpretive question is "what condition is the system communicating, and what evidence helps a person understand that condition?"

Under this reference frame, condition comes before composition. Posture comes before mechanics. Evidence creates belief. Condition provides orientation. Structure exists through disclosure. Difference comes through reduction.

The interface is therefore a trust-surface interpretation layer, not a runtime object. It describes how condition, posture, evidence, and signature cues can be understood as communication concepts. It does not define live states, thresholds, accounting truth, execution pathways, allocation rules, or implementation scope.

Reference does not equal authority.

---

## 3. Core framing

### Discovery: The Stability Engine is a condition system.

The durable finding is that the Stability Engine is best interpreted first as a system that communicates condition. Condition is the reader's orientation point. It frames whether the system is within expected range, monitoring pressure, or emphasizing protection.

This is a communication discovery only. It is not a runtime model and does not create engine-state authority.

### Discovery: Condition before composition.

Condition should be understood before any composition detail. Allocation, distribution, or percentage language can distract from the more important trust question: what condition is the system expressing?

This does not change ADR 0013. Allocation bands remain informational and must not become accounting truth.

### Discovery: Posture before mechanics.

Posture is the user-facing interpretive layer. Mechanics, thresholds, raw model inputs, and operator-style details can create false authority if they outrank posture.

This does not define mechanics and does not authorize exposing mechanics.

### Discovery: Evidence creates belief.

Trust improves when posture is paired with outcome evidence that helps the reader understand why the condition is believable.

Evidence in this frame is a communication concept. It is not ledger evidence, legal evidence, operational evidence, or evidence acceptance.

### Discovery: Condition provides orientation.

Condition gives the reader a stable place to start. It should orient before it explains detail.

This does not create product navigation requirements or information architecture decisions.

### Discovery: Structure exists through disclosure.

The structure of the Stability Engine becomes legible through disciplined disclosure: what is shown, what is withheld, and what is explicitly bounded.

Disclosure in this frame remains subordinate to repo doctrine, accepted ADRs, and `docs/ops/HEDGR_STATUS.md`.

### Discovery: Difference through reduction.

The Stability Condition Interface becomes more distinctive when it reduces noise rather than adding more financial chrome. Fewer, clearer signals can preserve trust better than dense diagnostics, score systems, or percentage-first explanation.

This is an interpretation principle, not a mandate to redesign any shipped surface.

---

## 4. Trust object reference

The preserved communication model is:

```text
Condition
  ->
Posture
  ->
Outcome Evidence
  ->
Signature Cue
```

### Condition

Condition is the broad state of trust being communicated. It tells the reader what kind of stability situation they are seeing.

Boundary: condition is reference language here. It is not a runtime state contract.

### Posture

Posture is the calm, legible expression of condition. It translates condition into language a reader can understand without implying action or execution.

Boundary: posture remains communicative. It must not imply treasury movement, backend authority, ledger truth, or autonomous reallocation.

### Outcome Evidence

Outcome Evidence is the visible support that helps the reader believe the posture. It can explain why the condition is credible.

Boundary: outcome evidence is a communication concept in this document. It is not evidence collection, evidence scoring, operational proof, or legal acceptance.

### Signature Cue

Signature Cue is the memorable, low-noise cue that helps the reader recognize the condition over time.

Boundary: signature cues must not become scores, promises, guarantees, gamified indicators, or hidden authority.

Reference does not equal authority.

---

## 5. Confidence model

| Concept | Reference meaning | Boundary |
| ------- | ----------------- | -------- |
| Trust | Condition | Communication concept only |
| Belief | Outcome Evidence | Communication concept only |
| Memory | Signature Cue | Communication concept only |

This model preserves how confidence was interpreted in the Stability Condition Interface program:

- Trust is anchored by condition.
- Belief is supported by outcome evidence.
- Memory is strengthened by a signature cue.

These are not runtime concepts. They do not create engine fields, state machine nodes, thresholds, analytics events, UX requirements, or component contracts.

---

## 6. State model reference

The preserved exploration outputs are:

```text
Balanced
Monitoring
Protected
```

These labels are reference language. They are not runtime state authority.

They do not replace, rename, extend, or reinterpret any existing engine posture types. They do not authorize UI copy changes, model changes, backend changes, simulator changes, threshold definitions, or state activation.

Reference does not equal authority.

---

## 7. Rejected directions

The Stability Condition Interface program rejected several directions because they risked reducing trust clarity, overstating authority, or reopening settled posture boundaries.

### Rejected: Allocation as trust object.

Allocation should not be the primary trust object. Treating allocation as the trust object risks percentage-first interpretation and can pull the reader toward composition before condition.

This rejection reinforces ADR 0013. It does not change allocation behavior or shipped copy by itself.

### Rejected: Percentage-first communication.

Percentage-first communication can create false precision and shadow-accounting pressure. It can make the surface read as portfolio accounting rather than condition interpretation.

### Rejected: Portfolio semantics.

Portfolio semantics can shift interpretation toward performance, trading, or investment framing instead of stability and preservation.

### Rejected: Risk meters.

Risk meters can create score-like reassurance, false precision, or gamified stability interpretation.

### Rejected: Primary Stability Edge as trust object.

The Primary Stability Edge may be a signature cue in exploration, but it should not become the trust object itself. The trust object remains the communicated condition.

### Rejected: State escalation through more information.

Adding more information is not the same as increasing trust. Dense diagnostics, raw thresholds, or expanded details can make the interface feel more authoritative than it is allowed to be.

Purpose of preserving these rejections: prevent future rediscovery.

---

## 8. Watchpoints

### Watchpoint: Most

`Most` can create allocation curiosity. It may cause the reader to ask how much is "most," whether a percentage exists behind it, or whether the visible concept maps to a balance partition.

This is a reference watchpoint only. It does not approve or reject any current shipped copy.

### Watchpoint: Protection remains the priority.

`Protection remains the priority` can be read as a concern interpretation if the surrounding context is not calm and bounded.

This is a reference watchpoint only. It does not approve or reject any current shipped copy.

---

## 9. Governance boundary

This document does not determine:

- engine logic
- allocation logic
- thresholds
- runtime behavior
- activation criteria
- execution semantics
- component contracts
- information architecture decisions
- copy changes
- design direction
- product requirements
- roadmap sequencing
- ADR status

This document does not authorize custody, rails, deposits, withdrawals, ledger mutation, treasury operations, Copilot execution, Class B execution, Class C automation, live operations, or customer fund movement.

It does not reopen Transition Readiness, Warmth Layer, Stability Engine Foundation, Class B governance, or any other closed or inactive track.

Reference does not equal authority.

---

## 10. Relationship to repo authority

This document is subordinate to:

- `docs/ops/HEDGR_STATUS.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0016-warmth-layer-doctrine-constrained-retail-refinement-track.md`

`docs/ops/HEDGR_STATUS.md` remains the canonical handoff file for current posture, merged implementation truth, and next-ticket authority. This reference does not name or imply an approved next ticket.

ADR 0013 remains the authority that allocation bands are informational, not accounting. This reference does not reinterpret allocation as ledger truth, settled position, or user-owned partition.

ADR 0014 remains the authority that the Stability Engine surface in the current phase is read-only and non-executing. This reference does not introduce execution semantics, routing, balance mutation, or treasury instruction authority.

ADR 0015 remains the authority that the Stability Engine is the system center. This reference supports interpretation of the engine trust surface but does not create roadmap priority or backlog authority.

ADR 0016 remains a doctrine-constrained presentation boundary reference, not implementation approval by itself. This reference does not authorize Warmth Layer work, UI changes, or presentation refinement.

If conflict exists between this document and repo authority, repo authority wins.

---

## 11. Reference preservation review

| Requirement | Review result |
| ----------- | ------------- |
| Preserves status and authority boundary | Preserved in Section 1 |
| Explains the Stability Condition Interface | Preserved in Section 2 |
| Preserves the core condition-system framing | Preserved in Section 3 |
| Preserves the trust object model | Preserved in Section 4 |
| Preserves the confidence model | Preserved in Section 5 |
| Preserves Balanced / Monitoring / Protected as exploration outputs only | Preserved in Section 6 |
| Preserves major rejected directions | Preserved in Section 7 |
| Preserves watchpoints | Preserved in Section 8 |
| Preserves governance boundary | Preserved in Section 9 |
| Relates the artifact to repo authority | Preserved in Section 10 |

Review conclusion: the reference-worthy findings named for `DOC-SE-REF-001` are preserved as non-authoritative reference material.

---

## 12. Boundary review

| Boundary | Review result |
| -------- | ------------- |
| Documentation-only | Pass |
| No app, package, script, test, CI, or component change authorized | Pass |
| No implementation approval | Pass |
| No UI change approval | Pass |
| No runtime state activation | Pass |
| No engine logic, thresholds, allocation logic, or execution semantics | Pass |
| No ADR creation or ADR status change | Pass |
| No roadmap sequencing | Pass |
| No custody, rails, deposits, withdrawals, ledger, treasury, Copilot execution, Class C automation, or customer fund movement authority | Pass |

Boundary conclusion: this artifact preserves interpretation material only. It creates no implementation authority, no runtime authority, and no sequencing authority.

Reference does not equal authority.
