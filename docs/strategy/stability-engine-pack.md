# Stability Engine — Sequencing and Spec Notes

**Status:** Founder-owned spec locked 6 Oct 2026 under `docs/ops/HEDGR_STATUS.md` §347 (`OPS-SE-SPEC-LOCK-001`).
**Spec ownership:** Musalwa Hibajene owns the Stability Engine spec personally. Before implementation starts, that ownership is not delegated to an agent.
**Related:** `docs/strategy/PHASE-SEQUENCING-2026-10-05.md`

---

## Do not release or disseminate yet

Dissemination without an honest answer to *"is this what Hedgr shows?"* trains participants on a promise we cannot keep.

**North star for this phase:** build the evidence that makes Hedgr fundable in 2027, without skipping steps.

## Foundation order (before higher jobs)

1. **Stability** — so nothing wobbles
2. **Home** — so the work has somewhere to land
3. **Legibility** — so anyone can read what Hedgr actually is

## Role of research

Research contextualizes Hedgr's value. It is context, not decoration, and it is what gives an MVP meaningful traction it can stand on. It is not the current top priority.

## Current execution order

- **Hold Kip and Sue** for research-route refinement for now.
- **Stability Engine first:** deliberate, then implement.
- Bring Kip and Sue in to refine **only once** that work is moving.
- Their earlier proposal (framing B, restructure Daniel, one ticket) is **paused**.

## Spec ownership

Musalwa owns the Stability Engine spec personally — not an agent.

## Co-architect recommendations

1. Define what "stable" means in one sentence before any code, so every later decision has a test.
2. Inventory what currently breaks or drifts when someone touches the engine — that inventory is the real backlog.
3. Pick a single thin vertical slice that exercises the full path end to end, even if small, so stability is proven on something real rather than in the abstract.

## Working definition of stable (loose → candidate)

**Two meanings must not be blended.**
- **Engineering determinism:** the engine's behavior doesn't change unless someone intends it to.
- **Hedgr "stability":** about the user's capital (what holds for them when the world moves).

The Daniel inventory question blends the two if read carelessly: when FX moves, Daniel's figures **should** change (USD 800 becomes more kwacha). What should hold is everything the FX move doesn't explain.

**Definition of stable (locked, §347):**

> Same inputs, same read. When an input changes, only the parts of the read that input explains change. Nothing else changes unless the engine is deliberately changed.

**Testable three ways:**
1. Replay the same inputs → same read.
2. Vary one input at a time → only explained parts of the read change.
3. Compare outputs before and after an engine change → nothing else moves unless that change was deliberate.

Locked under `docs/ops/HEDGR_STATUS.md` §347 (`OPS-SE-SPEC-LOCK-001`, 6 Oct 2026).

## Inventory seeds

1. **Daniel (FX / saver).** A saver with a user-declared dollar-linked holding alongside local currency (Hedgr only reads it; it does not recommend or run FX strategies). When FX moves, local display figures should change (USD 800 becomes more or less kwacha). Question: does Hedgr's *read* shift in a way he didn't choose, or does only what the FX move explains change — and everything else hold?
2. **Sarah (goal).** A particular goal, e.g. a payment in US dollars, tracking both the goal and the rate path to it. More complex than Daniel.
3. **SME.** Held off for now due to added complexity.

## Implementation order

1. **Daniel first**
2. **Sarah second**
3. **SME held**

## First thin vertical slice (Daniel)

**One saver, one currency pair, one user-declared holding** — the full path from input to read, nothing more.

The holding is fixture input with stubbed FX and hermetic CI. Hedgr only reads it. Per ADR 0027 and doctrine (advisory, never directive), Hedgr does not recommend or run a hedge. **"Hedge" stays out of anything a user sees.**

## Language guard

Do not use "hedge" / "hedging" in participant-facing or product copy for this slice. Prefer **user-declared holding**, **dollar-linked portion**, or **read-only FX display**. Matches shipped Daniel limits ("Hedgr plays no part in it") and ADR 0027 / doctrine: advisory, never directive.
