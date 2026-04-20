# HEDGR RETAIL UI IMPLEMENTATION SPIKE READOUT

Status: Governance guidance only  
Authority: Non-sequencing, non-shipping  
Scope: Governed readout of `MC-S3-012` bounded retail UI implementation spike  
Last updated: 2026-04-20

---

## 1. Purpose

This document records the governed readout of `MC-S3-012` — the bounded retail UI implementation spike.

The spike was executed as a **prototype-route-only** expression of the governed money-first shell and subordinate Family C trust-layer direction. Its goal was to validate, in code, that the governed direction could be expressed coherently without drifting into earn-first, APY-led, chart-adjacent, or stablecoin-neobank posture.

This is an evidence readout, not shipping approval. Nothing in this document authorizes widening the work into the shipped `(app)/dashboard` route, into the engine domain, into the backend, or into any broader IA restructuring.

---

## 2. Authority boundary

- `HEDGR_STATUS.md` remains the sole sequencing authority; only §7 / §7a name approved implementation work.
- `AGENTS.md` remains binding for repo workflow, CI posture, and engine-facing governance.
- `.cursorrules` remains binding for doctrine precedence, system invariants, and anti-drift rules.
- The implementation-spike brief and the Cursor execution prompt governed this ticket; both are subordinate to doctrine and to `HEDGR_STATUS.md`.
- This readout is documentation-only. It does not authorize shipping, shipped-route edits, or any widening beyond the prototype route.
- No outcome in this document is product approval.

---

## 3. Spike reviewed

`MC-S3-012` was executed as a bounded prototype-route spike. The scope held; the execution stayed inside the declared envelope.

### 3.1 What changed

- `docs/ops/HEDGR_STATUS.md` — §7 named `MC-S3-012` as the approved next ticket; §7a replaced the no-active-ticket stub with the full execution brief, including hard-boundary file list, excluded-drift traits, rollback-by-revert posture, and the requirement for a governed implementation-spike readout before any shipped-route proposal.
- `apps/frontend/app/prototype/retail-dashboard/RetailDashboardPrototype.tsx` — added a new `Variant MS — Money-first shell` stack expressing the governed direction. New components: `BalanceLedHero` (calmer neutral card; balance-led primary anchor; trust context line), `SubordinateAllocation` (row-first Family C layer with a C2-range inline cue), and `MoneyFirstShellStack` (governed order). `Variant MS` is the default tab; `Control` / `A` / `B` remain unchanged for audit-trail comparison.
- `apps/frontend/app/prototype/retail-dashboard/mock-data.ts` — additive-only: `stability.supportLine = 'Protected · Accessible'` as a calm descriptive companion for the MS hero. No existing mock fields changed.

### 3.2 What stayed out of scope

- `apps/frontend/app/(app)/dashboard/**` — shipped retail money shell and its engine trust surfaces; not touched.
- `apps/frontend/lib/engine/**` — engine domain; not touched; Sprint 2 read-only posture preserved.
- `apps/backend/**` — backend boundary preserved.
- `packages/ui/**` — shared primitives; not touched; no widening.
- Copy modules under Vitest regression contract (`ENGINE_NOTICE_COPY`, `stability-review-snapshot-copy`, protective guidance, explainer); not touched in intent.
- Every regression-contract test file in the `MC-S3-004` / `-006` / `-007` / `-008` / `-009` tranche; unchanged.
- Earn surfaces, APY-primary framing, "Earn More" logic, chart-adjacent or instrument-like treatment.

### 3.3 What the spike was meant to prove

- The money-first shell direction can be expressed coherently in actual frontend code.
- The Family C trust layer can remain visible, interpretive, and subordinate rather than hero-like.
- The surface can read calmer and more coherent than prior fragmented exploration without introducing yield-forward or neobank-like drift.
- The implementation can stay bounded, reversible, and inside declared authority.

---

## 4. What the spike successfully proved

- The money-first shell can be expressed coherently on the prototype route. The governed order — balance hero → primary actions → recent activity → subordinate allocation → calm disclosure — renders cleanly and reads as a single money surface rather than a stack of competing sections.
- The balance-led primary anchor works in code. Portfolio value at `text-4xl sm:text-5xl` tabular-nums, on a calm neutral card, is the first dominant money read; stability / protection / access sit below as compact trust context without competing.
- Family C can be visible but subordinate. The row-first allocation with a C2-range inline cue (thin, low-contrast, bounded-width bar, `aria-hidden`) assists distribution grasp without becoming chart-adjacent or hero-like. Row clarity remains dominant; numeric remains the source of truth.
- The spike stayed bounded and reversible. Three files modified; zero imports outside the prototype route; a single `git checkout HEAD -- …` restores pre-ticket state.
- The expression did not drift into yield-wrapper or stablecoin-neobank posture. No APY, no earn cues, no chart-like treatment, no gamified stability language, no accounting-truth implication, no live operational implication. The read-only / informational posture of allocation is preserved verbatim.
- Governance held end-to-end. `HEDGR_STATUS.md` §7 / §7a authorized the work before any code was written; `AGENTS.md` engine-facing read stack was not triggered because `lib/engine/**` was not touched; regression contracts were not touched in intent; `pnpm -w typecheck`, `pnpm -w lint`, and the 713-test Vitest suite pass clean.

---

## 5. What remains unresolved

These are open tensions, not failures. They are narrow enough to govern separately but must not be resolved inside a shipped-route edit.

- **Hero ordering divergence.** Variant MS places the balance hero above stability and allocation. The shipped `(app)/dashboard/page.tsx` today renders posture header and allocation bands above the balance cards. The UX-constitution hierarchy "Portfolio Value → Stability Status → Allocation Split" is compatible with MS, but the shipped ordering has not yet been reconciled against it. This is a governance question, not an implementation question.
- **Admissibility of `Protected · Accessible`.** The trust companion line is descriptive and off every engine-trust denylist term, but it is still a claim. The readout cannot settle whether that language is admissible even on a prototype surface or whether trust context should remain limited to "Stability status" posture language alone.
- **Family C cue calibration inside actual expression.** The inline cue was placed at the C2 end of the governed cue-range envelope. Reviewable on the prototype; not yet calibrated against longer row sets, additional postures, or adjacent microcopy weight. The cue could still drift toward C1 passivity or C3 upper-bound precision under different inputs.
- **CTA treatment.** Top-up / Send on a stability product carries residual neobank cadence. Kept unchanged because action labels were outside this ticket's governed question. Whether a bounded next-pass CTA refinement is warranted is an open question, not a settled need.
- **Disclosure chroma.** The single "Learn more" link uses `text-violet-300/90`, which is the only lingering accent color on the otherwise neutral MS surface. Whether the disclosure accent should be de-chromed on MS is an open question for a bounded follow-on, not a spike outcome.

---

## 6. Read on the resulting direction

- The money-first shell is strengthened. Code-level expression confirms what the fixture evidence and Plasma reference assessment already suggested: a calm, balance-led shell can carry the retail surface without yield-forward emotional scaffolding.
- The earn-first shell remains inadmissible. The spike did not encounter any pressure to reopen it; APY-forward and "Earn More" framing remained clearly outside the admissible envelope.
- Family C remains the correct trust-layer family. Its preserve traits (row-first clarity, modest secondary cueing, calm structural assistance, low visual temperature, subordinate hierarchy, interpretive rather than exact read) held under code expression. Its avoid traits did not creep in.
- The trust layer still needs to stay subordinate and interpretive. The spike confirms the lane but does not relax the discipline.
- Confidence in the governed direction is higher than it was from abstract fixture work alone. It is not yet shipping-grade confidence, and nothing in the spike promotes it to that.

---

## 7. Governance and execution assessment

- **Prototype-only scope held.** Exactly the in-scope files declared in §7a were modified; no out-of-scope file was touched by this session.
- **No shipped-route edits occurred.** The shipped `(app)/dashboard/**` surface, its trust components, and its copy modules are unchanged.
- **No engine or backend widening occurred.** `apps/frontend/lib/engine/**` and `apps/backend/**` were not opened for edit. Sprint 2 read-only engine posture preserved.
- **No shared-primitive widening occurred.** `packages/ui/**` was not touched.
- **Regression contracts were left intact.** Every Vitest contract in the `MC-S3-004` / `-006` / `-007` / `-008` / `-009` tranche is unchanged; `ENGINE_NOTICE_COPY`, `stability-review-snapshot-copy`, protective guidance, and explainer copy are unchanged.
- **Reversibility held.** All changes revert via a single `git checkout HEAD -- apps/frontend/app/prototype/retail-dashboard/ docs/ops/HEDGR_STATUS.md`.
- **Validation runs passed.** `pnpm --filter @hedgr/frontend typecheck` clean; `pnpm --filter @hedgr/frontend lint` clean; 58 Vitest files / 713 tests pass.
- **Authority was established before execution.** `HEDGR_STATUS.md` §7 / §7a was updated to name `MC-S3-012` before any code was written, consistent with `MC-S3-005`-pattern precedent.

On these criteria, `MC-S3-012` passed as a bounded implementation spike.

---

## 8. Working signal

- `MC-S3-012` passed as a bounded prototype-route implementation spike.
- The money-first shell plus subordinate Family C direction is now stronger in code than in abstract fixture work alone.
- Unresolved tensions remain, but they are narrow enough to govern as separate, scoped follow-ons.
- No shipped-route proposal should occur without a separately named ticket in `HEDGR_STATUS.md` §7, an explicit scope clause analogous to `MC-S3-005`, and regression-contract discipline.
- This signal is readout evidence. It is not shipping approval and must not be read as one.

---

## 9. Suggested next outputs

1. A closeout update to `HEDGR_STATUS.md` once this readout is accepted: move `MC-S3-012` into §7's completed list, restore §7a to the no-active-ticket stub, and record a completed-section entry.
2. If pursued, a bounded follow-on note on one narrowly scoped unresolved surface issue at a time — for example, a trust-companion language admissibility note (covering `Protected · Accessible`), or a Family C cue-calibration note under multi-posture inputs, or a CTA refinement brief. Each follow-on should be critique-level, not implementation-level.
3. A separately named shipped-route proposal only if later governance explicitly approves it in §7, with its own scope clause, rollback posture, regression-contract plan, and (where applicable) ADR or ADR update.
4. No merge-by-momentum into shipped surfaces. Prototype success does not convert to shipped-route authorization.

Implementation-spike execution guidance is captured in `docs/ops/HEDGR_RETAIL_UI_IMPLEMENTATION_SPIKE_EXECUTION_PROMPT.md`.

---

## 10. Working conclusion

`MC-S3-012` succeeded as a governed prototype-route implementation spike because it translated the refined money-first shell and subordinate Family C direction into code without violating scope, authority, or category posture. Unresolved tensions remain, but they are specific, narrow, and independently governable. No part of this readout authorizes widening the work into shipped surfaces.

**A successful spike proves direction under governance; it does not convert prototype evidence into shipped truth without a separately authorized next step.**
