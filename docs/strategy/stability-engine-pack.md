# Stability Engine — Sequencing and Spec Notes

**Status:** Founder-owned working pack (5 Oct 2026). Durable notes for deliberation before implementation.
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

## Working definition of stable (loose)

**Stable means the engine's behavior doesn't change unless someone intends it to.**

Pressure-test and refine before locking into the spec.

## Inventory seeds

1. **Daniel (FX / saver).** A saver allocating a portion of capital across currencies to hedge FX exposure. Question: when FX moves, does Hedgr's read on the position shift in a way he didn't choose, or does it hold?
2. **Sarah (goal).** A particular goal, e.g. a payment in US dollars, tracking both the goal and the rate path to it. More complex than Daniel.
3. **SME.** Held off for now due to added complexity.

## Implementation order

1. **Daniel first**
2. **Sarah second**
3. **SME held**

## First thin vertical slice (Daniel)

**One saver, one currency pair, one hedge position** — the full path from input to read, nothing more.
