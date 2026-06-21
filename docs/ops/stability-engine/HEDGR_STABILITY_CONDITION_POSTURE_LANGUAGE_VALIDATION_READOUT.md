# Hedgr Stability Condition / Posture Language Validation Readout

## 1. Status and authority

| Field | Value |
| ----- | ----- |
| Ticket | `SE-VAL-001` |
| Status | Documentation-only validation readout |
| Authority | Governance scrutiny input |
| Implementation impact | None |
| Runtime impact | None |
| ADR impact | None |

This readout validates Stability Condition Interface exploration language against current repo authority and shipped Stability Engine trust surfaces.

It is not an ADR, not a design spec, not a product requirement, not an implementation brief, and not sequencing authority. It does not authorize UI copy changes, runtime-state changes, badge-label changes, engine changes, simulator changes, ADR changes, or successor tickets.

`docs/ops/HEDGR_STATUS.md` remains the canonical authority for current sequencing. Reference language remains non-authoritative unless a future ticket is explicitly named in `HEDGR_STATUS.md` §7 with a bounded §7a brief.

## 2. Source stack reviewed

Repo authority and governance:

- `AGENTS.md`
- `docs/ops/HEDGR_STATUS.md`
- `docs/decisions/SPRINT-2-ADR-INDEX.md`
- `docs/decisions/0015-stability-engine-is-the-system-center.md`
- `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
- `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Reference and exploration inputs:

- `docs/ops/stability-engine/HEDGR_STABILITY_CONDITION_INTERFACE_REFERENCE.md`
- `docs/ops/stability-engine/HEDGR_STABILITY_ENGINE_UI_EXPLORATION_NOTE.md`
- `docs/ops/stability-engine/HEDGR_STABILITY_ENGINE_UI_VARIANT_DISPOSITION.md`

Shipped evidence read for validation only:

- `apps/frontend/lib/engine/types.ts`
- `apps/frontend/lib/engine/posture-context.ts`
- `apps/frontend/lib/engine/notices.ts`
- `apps/frontend/lib/engine/mock.ts`
- `apps/frontend/lib/engine/simulator.ts`
- `apps/frontend/lib/engine/stability-review-snapshot-copy.ts`
- `apps/frontend/lib/engine/protective-guidance-copy.ts`
- `apps/frontend/lib/engine/stability-explainer-copy.ts`
- `apps/frontend/app/(app)/dashboard/EnginePostureHeader.tsx`
- `apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx`
- `apps/frontend/app/(app)/dashboard/EngineStabilityReviewSnapshot.tsx`
- `apps/frontend/app/(app)/dashboard/EngineProtectiveGuidance.tsx`

## 3. Shipped posture baseline

The shipped runtime posture contract is still:

```ts
export type EnginePosture =
  | 'normal'
  | 'tightening'
  | 'tightened'
  | 'recovery';
```

The shipped dashboard posture badge is still technical:

| Runtime posture | Shipped badge |
| --------------- | ------------- |
| `normal` | `NORMAL` |
| `tightening` | `TIGHTENING` |
| `tightened` | `TIGHTENED` |
| `recovery` | `RECOVERY` |

The shipped posture context and notices already use calmer explanatory language, but they do not rename the state machine:

| Runtime posture | Shipped meaning evidence |
| --------------- | ------------------------ |
| `normal` | Conditions look steady; most remains in stable balance, with conservative yield and reserve held ready. |
| `tightening` | Shifting toward stronger protection, with more weight on reserve; notice says stability protection is tightening. |
| `tightened` | More protective than usual, with reserve prioritized; notice says stability protection is elevated. |
| `recovery` | Easing toward steadier targets while keeping reserve discipline; notice says stability protection is easing. |

The shipped review snapshot already uses the phrase family `within the expected range` for `normal` and `recovery`, and `more cautious than usual` for `tightening` and `tightened`.

## 4. Validation rubric

Each candidate term is classified as:

- `promote` - safe to carry forward as repo-grounded, non-runtime language in future governance discussion; still requires a future §7 / §7a ticket before implementation.
- `hold` - potentially useful, but not validated enough for promotion; must stay reference-only until a future scoped review resolves mapping, copy, and doctrine risks.
- `reject` - do not carry forward as exact shipped language or runtime-facing label under current authority.

These classifications do not authorize implementation.

## 5. Candidate language mapping

| Candidate | Source class | Current closest shipped evidence | Recommendation | Rationale |
| --------- | ------------ | -------------------------------- | -------------- | --------- |
| `Balanced` | Condition Interface exploration label | Partial overlap with `normal` and the shipped `within the expected range` stance; weak overlap with `recovery` because recovery is easing, not simply balanced | `hold` | Useful as a calm retail interpretation candidate, but it is not a runtime state, badge, notice title, or current shipped contract. It can also imply an optimized or settled portfolio condition if used without boundaries. Do not promote until a future ticket defines where it appears, what it excludes, and how it avoids portfolio / accounting readings. |
| `Monitoring` | Condition Interface exploration label | Partial overlap with `tightening` / `tightened` and with notices saying conditions are reviewed; no direct shipped runtime state | `hold` | Captures a plausible pressure-review condition, but the standalone word is too broad. It can read as operational monitoring, compliance monitoring, or an ongoing backend process. Keep as reference-only unless a future pass narrows the phrase, surface, and posture mapping. |
| `Protected` | Condition Interface exploration label | Shipped copy uses `protective`, `protection`, `reserve prioritized`, and `stability protection is elevated`; it does not claim protected status | `reject` | As an exact state or badge label, `Protected` overstates certainty and can read as a guarantee. Current authority supports protective posture language, not a protected outcome claim. Do not promote as runtime state, badge, or primary condition label. |
| `Within Expected Range` | Exploration-note / variant-disposition posture headline | Already shipped as `Where things stand: within the expected range` for `normal` and `recovery` in `apps/frontend/lib/engine/stability-review-snapshot-copy.ts` | `promote` | This is already repo-grounded as secondary review-snapshot posture language. It should remain non-runtime, non-badge, and subordinate to `EnginePosture`; future use should preserve the same calm review framing and avoid implying thresholds or guarantees. |
| `Monitoring Volatility` | Exploration-note / variant-disposition posture headline | Partial overlap with `tightening` / `tightened`, but shipped copy does not expose volatility as the explicit cause | `hold` | Directionally clearer than standalone `Monitoring`, but it introduces a specific condition driver that current shipped contracts do not evidence. Hold until future governance validates whether volatility is the correct visible reason and whether the surface can support that specificity. |
| `Protective Mode Active` | Exploration-note / variant-disposition posture headline | Partial overlap with `tightened` and notice language `Stability protection is elevated`; shipped copy avoids `mode active` | `reject` | The exact phrase implies activation and mode semantics that are stronger than current read-only posture authority. If future copy needs this family, prefer non-activating patterns already closer to shipped evidence, such as elevated protection or protective posture, subject to a future §7 ticket. |
| `Conservative Yield` | Exploration-note term and shipped allocation lane | Already shipped in `apps/frontend/app/(app)/dashboard/EngineAllocationBands.tsx` and explainer copy as a supporting lane | `promote` | Already repo-grounded after `UI-ALG-001`; safe as existing lane vocabulary when paired with informational-target and non-ledger boundaries. It must not become APY-first or portfolio-performance framing. |

## 6. Runtime posture mapping

| Runtime posture | Validated interpretation | Terms to keep away from runtime authority |
| --------------- | ------------------------ | ----------------------------------------- |
| `normal` | Can support calm secondary language such as `within the expected range`; may support a future `Balanced` exploration review only if clearly non-runtime and non-portfolio | `Balanced` as a runtime state; `Protected` as a badge or guarantee |
| `tightening` | Current language already says protection is tightening and conditions are reviewed | `Monitoring` as a direct state rename; `Monitoring Volatility` unless volatility evidence is explicitly governed |
| `tightened` | Current language already says protection is elevated and reserve is prioritized | `Protected` and `Protective Mode Active` as exact labels |
| `recovery` | Current language says easing toward steadier targets while reserve discipline remains visible | `Balanced` unless the recovery nuance remains visible; `Within Expected Range` only as review stance, not threshold proof |

## 7. Promote / hold / reject summary

Promote for future governance discussion only:

- `Within Expected Range` as non-runtime, secondary posture / review language.
- `Conservative Yield` as existing shipped allocation-lane vocabulary with ADR 0013 boundaries intact.

Hold as reference-only:

- `Balanced`
- `Monitoring`
- `Monitoring Volatility`

Reject as exact shipped state / badge / primary condition language under current authority:

- `Protected`
- `Protective Mode Active`

## 8. Boundary findings

1. The three Condition Interface labels do not replace `EnginePosture`.
2. None of the reviewed terms authorize badge changes in `EnginePostureHeader`.
3. None of the reviewed terms authorize `apps/frontend/lib/engine/types.ts` changes.
4. None of the reviewed terms authorize simulator, mock, notice, or posture-context changes.
5. `Within Expected Range` is already shipped in a narrow secondary review-snapshot context, not as a runtime state.
6. `Conservative Yield` is already shipped as lane vocabulary, not as APY-first or portfolio-performance framing.
7. Any future posture-header or terminology implementation ticket must map to existing `normal`, `tightening`, `tightened`, and `recovery` semantics unless a separate, future governed architecture change explicitly widens the contract.

## 9. Recommended successor posture

No successor ticket is created by this readout.

If governance later wants a presentation pass, the safest next shape is a narrow posture-header / posture-copy candidate that:

- keeps `EnginePosture` unchanged;
- keeps badges subordinate or technical unless explicitly scoped;
- uses promoted terms only as non-runtime copy candidates;
- avoids exact `Protected` and `Protective Mode Active` language;
- does not reinterpret allocation bands as condition objects;
- does not alter notices, simulator, mock values, backend behavior, ledger truth, or ADR status unless a future §7 / §7a brief explicitly scopes that work.

## 10. Closeout conclusion

`SE-VAL-001` validates that the repo can preserve condition-language learning without promoting exploration labels to runtime truth.

Current repo-grounded outcome:

- `Within Expected Range` and `Conservative Yield` are safe to carry forward as already-grounded, non-runtime language patterns.
- `Balanced`, `Monitoring`, and `Monitoring Volatility` remain held reference candidates.
- `Protected` and `Protective Mode Active` should not be promoted as exact shipped state, badge, or primary condition language under current authority.

Reference does not equal authority. Validation does not equal implementation approval.
