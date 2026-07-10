# ADR 0024 — MVP Acceptance Is Evidence-Gated, Not Feature-Gated

**Status:** Proposed  
**Date:** 2026-07-11  
**Decision Type:** Ops / Governance / Architecture  
**Strategic Horizon:** Short-term (MVP) with long-term institutional relevance  
**Visibility:** Public (governance rationale; eligible for repo ADR export)  
**Owners:** Hedgr Core  
**Reversibility:** Reversible (documentation removal only; no runtime impact)  
**Ticket of record:** Implement ADR — MVP Acceptance Is Evidence-Gated, Not Feature-Gated  
**Founder posture:** Approved for drafting (this ADR remains Proposed until separately Accepted)

---

## Acceptance note

This ADR records the governance principle that institutional MVP acceptance is evidence-led.

**This ADR does not authorize implementation**, ticket activation, Class B / Class C execution, custody or rail selection, customer-money activity, ADR amendment of other decisions, or any change to current execution posture.

Sequencing and implementation activation remain exclusively controlled by:

- `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**
- accepted ADRs under `docs/decisions/`
- `AGENTS.md`
- active repo-native governance

---

## Context / Problem

Hedgr now has:

- an Institutional Acceptance Standard in `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md` (what constitutes an acceptable MVP), and
- an evidence model in `docs/ops/governance/mvp/HEDGR_MVP_EVIDENCE_REGISTER.md` (how acceptance evidence is recorded and reviewed).

Those artifacts define criteria and recording structure. The repository previously lacked a durable architectural decision that permanently records the governing principle behind them:

> MVP readiness is demonstrated through evidence of trust, stability, liquidity, governance, and operational capability—not through the volume of completed features.

Without that decision record:

- the framework and register can be misread as optional documentation rather than institutional operating rule,
- feature completion, sprint closure, or roadmap exhaustion can be mistaken for MVP acceptance,
- implementation activity can be confused with institutional confidence.

Feature completion is an insufficient definition of MVP readiness because shipped surface area does not prove capital-preservation posture, liquidity honesty, risk visibility, governance continuity, or operational reconstructibility. Hedgr is a governance-first financial system; acceptance must remain an evidence-led institutional judgment.

---

## Decision

1. **MVP acceptance is evidence-led.** Institutional MVP acceptance requires recorded evidence dispositions and governed review under the Acceptance Framework and Evidence Register, not narrative confidence or feature-count rhetoric.

2. **Feature completion contributes evidence but is not acceptance.** Shipped work, tests, demos, and tickets may supply evidence. They do not, by themselves, constitute institutional MVP acceptance.

3. **Institutional acceptance requires governance review.** Evidence supports review; review may recommend accept, accept with bounded residual risk, defer, or reject; founder institutional acceptance is the acceptance act for MVP “done,” and must remain recorded and reconstructible.

4. **Acceptance does not widen execution authority.** Institutional MVP acceptance does not activate tickets, alter sequencing, widen execution class, certify customer-money readiness, or override `HEDGR_STATUS.md`, accepted ADRs, or `AGENTS.md`.

5. **This ADR is documentation-only.** It institutionalizes the relationship among the Acceptance Framework, Evidence Register, constitutional doctrine, and repo-native execution authority without creating a new governance layer or duplicating those artifacts’ operational detail.

---

## Rationale

- **Trust-first philosophy** — Capital preservation, liquidity integrity, and visible risk outrank growth framing; acceptance must prove those postures, not celebrate shipped volume.
- **Constitutional alignment** — Acceptance remains subordinate to the Constitutional Charter, UX Constitution, and doctrine precedence; it may not waive constitutional constraints for “done” rhetoric.
- **Institutional continuity** — Acceptance must be reconstructible from repo-native artifacts and recorded rationale, not undocumented founder memory or conversational optimism.
- **Reduction of implementation theatre** — Completing features, closing sprints, or exhausting roadmaps is not a substitute for institutional confidence.
- **Evidence over optimism** — Missing evidence must remain labeled; inference and confidence-without-disposition are forbidden as acceptance shortcuts.
- **Scope control** — Distinguishing implementation progress from institutional acceptance prevents the Acceptance Framework from being misused as a release checklist, roadmap, or ticket-activation surface.

### Alternatives considered

| Alternative | Why rejected |
| ----------- | ------------ |
| Treat Acceptance Framework / Evidence Register as sufficient without an ADR | Leaves the governing principle undocumented; risks “docs-only” misread |
| Define MVP readiness as feature / ticket completion | Conflicts with trust-first doctrine and creates implementation theatre |
| Make this ADR a release checklist or sequencing authority | Would conflict with `HEDGR_STATUS.md` **§7** / **§7a** and `AGENTS.md` |
| Duplicate Acceptance Framework domain/gate detail inside this ADR | Creates competing authority and documentation drift |
| Treat founder confidence or demo readiness as acceptance | Collapses evidence classes and weakens auditability |

---

## Assumptions

- The Acceptance Framework remains **non-executing**: it defines institutional acceptance criteria and does not authorize implementation.
- The Evidence Register **records evidence structure only**: row presence is not proof, sufficiency, or acceptance.
- Repo authority remains unchanged: `HEDGR_STATUS.md` **§7** / **§7a**, accepted ADRs, `AGENTS.md`, and active repo-native governance continue to control implementation.
- Constitutional and UX doctrine continue to outrank acceptance rhetoric where conflict exists.
- Operators will not treat this ADR as backlog order, release gating automation, or a substitute for lane-specific evidence programs (Class B, off-ramp, Copilot, Stability Engine, brand).

---

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Governance overhead | Keep this ADR principle-level; operational detail stays in Framework / Register |
| Evidence theatre (rows without substance) | Preserve Register rules: missing is valid; dispositions required; confidence ≠ authorization |
| False precision | Forbid treating checklists, scores, or row counts as automatic acceptance |
| Documentation burden | Thin pointers only; do not duplicate Framework / Register content |
| Misuse as sequencing authority | Explicit non-authorization; defer activation to `HEDGR_STATUS.md` **§7** / **§7a** |

---

## Consequences

### Positive

- Institutional clarity that MVP “done” is evidence-gated
- Measurable readiness language tied to recorded dispositions and review
- Governance continuity between doctrine, acceptance criteria, and evidence recording
- Improved auditability of acceptance judgments

### Negative

- Additional review discipline for institutional acceptance claims
- Increased documentation where evidence is incomplete
- Slower acceptance decisions when required evidence is missing or residual risk is unbounded

---

## Revisit / Kill Criteria

Revisit or deprecate this ADR if:

- Evidence requirements become disproportionate to MVP scope or create paralysis without improving trust
- The Acceptance Framework or this ADR is interpreted as execution, release, or ticket-activation authority
- Duplicate governance surfaces emerge that compete with `HEDGR_STATUS.md`, ADRs, or `AGENTS.md`
- The repository introduces a stronger, explicitly superseding release-governance artefact that covers the same principle without conflict
- Founder / governance review determines the principle should be reframed as an amendment to another canonical artefact

---

## Related Decisions

- ADR 0023 — Governed Progress Under Uncertainty (progress under incomplete information; evidence ≠ authority)
- ADR 0013 / 0014 / 0015 — allocation informational; read-only engine; engine as system center (unchanged by this ADR)
- Constitutional Charter — capital preservation, liquidity, governance before scale
- UX Constitution — trust-first interaction and disclosure posture

---

## Related Artifacts

- `docs/doctrine/hedgr-constitutional-charter.md`
- `docs/doctrine/hedgr-ux-constitution.md`
- `docs/doctrine/hedgr-mvp-project-specification.md`
- `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md`
- `docs/ops/governance/mvp/HEDGR_MVP_EVIDENCE_REGISTER.md`
- `docs/ops/HEDGR_STATUS.md`
- `AGENTS.md`

---

## References

- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`
- `docs/doctrine/hedgr-governance-philosophy.md`
- `.cursorrules` doctrine precedence
- `docs/ops/governance/mvp/README.md`
