# ADR 0023 — Governed Progress Under Uncertainty

**Status:** Accepted  
**Date:** 2026-07-10  
**Decision Type:** Ops / Governance  
**Strategic Horizon:** Short-term foundation with long-term institutional relevance  
**Visibility:** Public (governance rationale; external excerpts subject to founder confidentiality review)  
**Owners:** Hedgr Core  
**Reversibility:** Reversible (revert doctrine document and pointers; retain this ADR as historical record)  
**Ticket of record:** `GOV-PHILOSOPHY-001`  
**Notion mirror (non-authoritative):** D-027 (when staged)

---

## Acceptance note

This ADR adopts `docs/doctrine/hedgr-governance-philosophy.md` as the canonical Hedgr Governance Philosophy for progress under incomplete information.

**Acceptance does not authorize implementation**, Class B execution, custody/rail selection, legal reliance, ticket activation, or any change to current execution posture. Sequencing remains exclusively controlled by `docs/ops/HEDGR_STATUS.md` **§7** / **§7a**.

---

## Context / Problem

Hedgr is operating several bounded workstreams in parallel or in rapid succession, including Class B preparation, closed-test UX and trust readiness, legal and regulatory research, product and rail exploration, investor demonstration readiness, and architecture / governance development.

Some external dependencies — particularly legal, regulatory, vendor, and market feedback — will not resolve at the same pace as product and operational work.

Without a repo-native operating philosophy:

- incomplete information can be treated as a reason for indefinite inactivity, or
- momentum, research, AI output, or demo pressure can be treated as permission to bypass governance.

Founder direction is to continue making tangible progress where uncertainty can be governed, bounded, validated, and reversed, without allowing momentum to bypass the governance spine. That direction required durable repo-native codification so it is not dependent on conversational memory.

---

## Decision

1. Hedgr adopts **Governed Progress Under Uncertainty** as binding governance operating philosophy, canonically recorded in `docs/doctrine/hedgr-governance-philosophy.md`.

2. The governing principle is:

   > Hedgr may progress under uncertainty only where assumptions are explicit, risks are bounded, decisions are governed, and reversal remains credible.

3. Material progress under incomplete information must use **Provisional — Governed Assumption** records with explicit evidence, missing evidence, authority basis, risk classification, reversibility mechanism, validation path, review/expiry trigger, stop condition, rollback procedure, and owner.

4. Reversibility requires an operational or technical mechanism, not a documentation label alone.

5. Exploration, research, prototypes, and AI/review outputs create **evidence**, not **authority**.

6. Parallel lanes remain permitted only under existing repo controls (`HEDGR_STATUS.md` **§6e** / `AGENTS.md`); ungoverned convergence remains prohibited.

7. Tangible closed-test and investor-demo artefacts are legitimate objectives and must remain distinguished from production readiness, regulatory approval, legal certainty, and execution authority.

8. This ADR and the philosophy document introduce **no** execution-authority expansion.

---

## Rationale

- Preserves capital-preservation and trust-first posture while allowing bounded learning.
- Makes uncertainty visible instead of hiding it behind momentum or demo pressure.
- Prevents provisional assumptions from silently hardening into permanent policy.
- Complements Constitutional Charter Article IV and the decision-governance / ADR export standard without duplicating sequencing authority.
- Gives founders, architects, operators, AI systems, and future contributors a shared vocabulary for provisional progress vs accepted authority.

### Alternatives considered

| Alternative | Why rejected |
| ----------- | ------------ |
| Leave philosophy in founder conversation / Notion only | Not durable; creates memory-led authority drift |
| Amend only the decision-governance standard | Too narrow; would bury operating philosophy inside logging procedure |
| Treat philosophy as execution authorization | Violates `HEDGR_STATUS.md` / `AGENTS.md` authority model |
| Duplicate parallelism rules as a second concurrency authority | Would conflict with **§6e** / D-026 deny-by-default exception |

---

## Assumptions

- Operators will continue to treat `HEDGR_STATUS.md` **§7** / **§7a** as the only ticket-activation surface.
- Provisional records will be used for material assumptions, not for every trivial implementation detail.
- External legal / regulatory / vendor confirmation will continue to gate claims that require it.
- Reversibility mechanisms can be described for decisions allowed to proceed provisionally; otherwise work stops and escalates.

---

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Philosophy becomes a broad licence to proceed | Require explicit authority basis, risk classification, and stop conditions; state that governed assumptions cannot widen execution authority |
| Duplicate governance surfaces emerge | Single canonical philosophy document; thin pointers only; subordinate to Charter, status, AGENTS, ADRs |
| “Reversible” becomes a documentation label | Require actual reversal mechanism and verification path |
| Provisional decisions harden into permanent policy | Require expiry / revisit triggers, owners, and superseding decisions |
| Founder direction treated as automatic implementation approval | Preserve founder decision vs repo-native authorization vs execution |
| Investor-demo pressure weakens truthfulness | Require simulation / provisional / non-production labels; prohibit unsupported regulatory, custody, performance, or execution claims |

---

## Consequences

### Positive

- Durable institutional language for progress under uncertainty
- Clearer separation of evidence, provisional assumption, accepted decision, and execution authority
- Stronger protection against silent policy hardening and ungoverned lane convergence

### Negative

- Additional documentation discipline for material provisional assumptions
- Risk of over-application to trivial work if operators ignore the “material” threshold

---

## Revisit / Kill Criteria

Revisit or deprecate this ADR if:

- The philosophy is interpreted as widening Class B, custody, rail, legal, or execution authority
- A stronger existing governance artefact already covers the same ground and this document creates competing authority
- Reversibility cannot be operationally defined for the class of decisions it encourages
- The source-of-truth hierarchy becomes less clear after adoption
- Founder / governance review determines the philosophy should be reframed as an amendment to another canonical artefact

---

## Related Decisions

- Constitutional Charter — Article IV (Governance Before Scale)
- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`
- Internal Decision **D-026** / `HEDGR_STATUS.md` **§6e** (governed parallelism; separate concurrency control)
- ADR 0014 / 0015 (read-only engine / system-center boundaries remain unchanged by this ADR)

---

## References

- `docs/doctrine/hedgr-governance-philosophy.md`
- `docs/ops/HEDGR_STATUS.md` (`GOV-PHILOSOPHY-001`, **§125**)
- `AGENTS.md`
- `.cursorrules` doctrine precedence
