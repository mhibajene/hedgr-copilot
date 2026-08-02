# CLASS-A-VAL-002-CA-001 — Cognitive Abstraction and Product Identity Review

**Status:** Complete — nested analytical output under open `CLASS-A-VAL-002` (activation **§182**; closeout **§183**; Internal **D-062**)  
**Date:** 2026-08-02  
**Authority:** Internal **D-062** / `HEDGR_STATUS.md` **§182** / **§7a** nested brief  
**Owner:** Codex (review-only)  
**Parent:** `CLASS-A-VAL-002`  
**Sequencing:** Option 2 — non-blocking; dual-layer participant retesting remains ungated  
**Build reviewed:** Recorded `HEDGR-UI-006` synthetic journey (`?journey=class-a-val-002`)

---

## 1. Executive finding

Hedgr has materially succeeded at **technical abstraction**. Blockchain, wallets, stablecoins, DeFi rails, and settlement mechanics are no longer the customer-facing story. The journey presents as a calm financial simulation, not a crypto product.

The dominant remaining friction is **cognitive abstraction**: users can often understand individual surfaces while still struggling to form a stable answer to “Hedgr helps me…”.

The opening experience now states a strong purpose line — *“Understand your situation before deciding what to do next.”* — but then immediately surrounds that line with a dense cluster of Hedgr-specific concepts (Current Simulation Status, Stability Structure, Stable balance / Conservative yield / Reserve, Review Snapshot, Educational content). Cumulative load, not sentence-level unreadability, is the principal identity risk.

**Working conclusion for HedgrOps:** Phase-1 and Phase-2 abstraction are mature enough for the current validation stage. Phase-3 cognitive abstraction is the principal convergence problem. The next product pass, if any, should prioritise **opening narrative clarity + concept deferral / hierarchy**, not further infrastructure hiding — and only after dual-layer participant evidence under the parent, unless Founder explicitly resequences.

This finding is interpretive synthesis from the shipped journey and protocol framing. It is **not** participant evidence.

---

## 2. Review authority and limitations

### Authority

- Nested Class A review-only analysis under `CLASS-A-VAL-002`.
- No code-change, final-copy, journey-mutation, customer-money, custody, settlement, execution, or advisory authority.
- Recommendations are non-authoritative until a later Founder disposition.

### Evidence basis (what this report used)

| Source class | Inputs |
| --- | --- |
| Repo authority | `HEDGR_STATUS.md` **§7** / **§7a** / **§179** / **§182**; Internal **D-060** / **D-062**; ADRs **0013–0015**, **0024** |
| Shipped journey | Dashboard, Deposit, Withdraw, Activity, shared shell / trust banner, related engine presentation components on the `HEDGR-UI-006` build |
| Protocol framing | `docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_PARTICIPANT_PROTOCOL.md` |
| Comparative references | Polymarket / Plasma patterns — conceptual principles only, not templates |

### Limitations (where evidence ends)

- No new participant sessions were run for this nested pass.
- Prior synthetic-journey findings and D-060’s “remaining product-identity confusion” are treated as governing context, not re-proven here.
- This review observes **likely** mental-model formation from interface structure and language; it cannot claim what verified target participants will say.
- If this review and dual-layer retest diverge, **participant evidence under the parent governs**.

---

## 3. Current product mental model

### What the journey currently teaches, in practice

A careful first-time user is likely to assemble something like:

> Hedgr is a **research simulation** that shows a **simulated balance**, a **status**, and a **stability structure** of percentage **targets**, then lets me walk a deposit → withdrawal → activity path so I can see what changed — without real money moving.

That model is coherent and trust-safe. It is also **system-centred**.

### Likely incomplete / unstable completions of “Hedgr helps me…”

| Likely completion | Why the journey encourages it |
| --- | --- |
| “…simulate deposits and withdrawals” | Journey arithmetic and CTAs dominate attention |
| “…see a stability dashboard / targets” | Stability Structure and Review Snapshot are visually and verbally heavy |
| “…understand simulation status” | Current Simulation Status + NORMAL badge + Review Snapshot repeat system state |
| “…keep money safe / protected” | Protective language + Reserve + disclosures may over-read as guarantee or custody |
| “…earn conservative yield” | Conservative yield lane + optional return-rate surfaces create invest/earn pull |
| “…use a wallet / money app” | Deposit / Withdraw / Activity nav is familiar fintech chrome |

### What is working in the current model

- Clear non-live boundary (banner + shell + per-step disclosures).
- Strong situation-before-action framing in orientation and shell.
- Explicit “nothing you need to manage” under NORMAL posture.
- Targets repeatedly labelled as guidance, not ledger division.

---

## 4. Intended product mental model

Per parent objective, D-060, and protocol framing, the intended early answer is closer to:

> **Hedgr helps me understand where I stand financially before deciding what to do next** — especially under uncertainty — without treating the interface as a bank, budget app, investment product, crypto wallet, or live money-moving system.

Intended trajectory (test framing, not redesign mandate):

1. Situation — where do I stand?
2. Meaning — is my stability okay / changing?
3. Change — what happened?
4. Safe next step — is action needed, or not?

Success for cognitive abstraction is **not** that every Hedgr term is learned. Success is that the purpose sentence forms early and survives the journey without collapsing into wallet / yield / bank / simulation-demo categories.

---

## 5. Cognitive-load inventory

Concepts introduced in the primary Dashboard → Deposit → Withdraw → Activity journey (plus shell). Cost is cumulative, not per-sentence.

| # | Concept | Familiar vs Hedgr-specific | Answers a human question? | Adds new questions? | Necessary at introduction point? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Simulation Mode / No Real Money | Hybrid (familiar warning + Hedgr posture) | Yes — is this real? | Mild | Yes | Preserve; foundational trust |
| 2 | Financial position | Mostly familiar | Yes — where do I stand? | Low | Yes | Strong identity anchor |
| 3 | Understand situation before next step | Familiar | Yes — purpose | Low | Yes | Closest to intended identity |
| 4 | Current simulation status | Hedgr-specific | Partial — is anything wrong? | Yes — what is “simulation status”? | Debatable early | System vocabulary |
| 5 | NORMAL / posture badges | Hedgr-specific | Partial | Yes | Later-friendly | Opaque without glossary |
| 6 | Simulated balance | Hybrid | Yes — how much? | Low if simulation already clear | Yes | Preserve |
| 7 | Stability view | Hedgr-specific | Weak alone | Yes | Soft | Vague meta-label |
| 8 | Stability structure | Hedgr-specific | Partial — how is money protected/arranged? | High | Often premature | Major cumulative cost |
| 9 | Stable balance (target) | Hybrid word, Hedgr meaning | Partial | High — vs “balance” above | Deferable | Terminology collision with Simulated balance |
| 10 | Conservative yield | Hybrid / invest-coded | Partial | High | Deferable early | Category risk: investing/earn |
| 11 | Reserve | Familiar word, Hedgr role | Partial | Medium | Deferable early | Category risk: banking buffer |
| 12 | Stability target / percentages | Hedgr-specific | Weak until structure understood | High | After purpose lands | Easy to misread as holdings |
| 13 | Review snapshot | Hedgr-specific | Partial — has anything changed? | High | Deferable | System review theatre |
| 14 | Simulation date / last viewed locally | System | Weak for first-time purpose | Medium | Deferable | Ops/system detail |
| 15 | Protective posture / protection | Hybrid | Partial | High — guaranteed? | Careful | Truthful but misread risk |
| 16 | Educational content | Familiar shell, Hedgr payload | Yes if elected | Medium | Optional | Good as on-demand |
| 17 | Important disclosures | Familiar | Yes | Low | Yes | Preserve; watch “digital assets” wording |
| 18 | Simulated deposit / withdrawal | Hybrid | Yes — what changed? | Low | Yes in journey | Preserve |
| 19 | What would remain / Activity calc | Familiar arithmetic | Yes | Low | Yes | Strong comprehension aid |
| 20 | Completed (simulated step) | Familiar word, special meaning | Needs teaching | Medium | Needed when status appears | Boundary education |
| 21 | CLASS-A-VAL-002 eyebrow | Internal research label | No | Yes | No for identity | Research chrome |
| 22 | Copilot (nav) | Product feature | Separate | Medium | Out of primary protocol | Secondary identity fork |

**Cumulative assessment:** By mid-Dashboard, a newcomer may already be holding 8–12 non-everyday concepts before completing a single money change. Deposit/Withdraw/Activity then teach change-and-remainder well — but identity may already have fragmented into “simulation dashboard with targets.”

---

## 6. Human-question mapping

| Surface / concept | Human question it could answer | Current fit | Gap |
| --- | --- | --- | --- |
| Financial position + orientation | Where do I stand? What is this for? | Strong | Diluted by following system blocks |
| Current simulation status | Is anything important happening? | Medium | Label is system-first; badge requires decoding |
| “There is nothing here you need to manage.” | Do I need to act? | Strong | Easy to miss amid denser blocks |
| Simulated balance | How much (in this simulation)? | Strong | — |
| Stability structure | How is my money being protected / arranged? | Weak–medium | Reads as portfolio architecture before purpose settles |
| Stable / Yield / Reserve | What are these parts? | Medium after education | High cost before education |
| Review snapshot | Has anything changed since I last checked? | Weak for first visit | First-time users have no “last check” |
| What changed / Activity | What changed? Why this remainder? | Strong | Arrives late relative to structure/review |
| Educational content | Why does this work this way? | Strong as elective | Currently sits as another Dashboard section to process |
| Disclosures | What are the limits / risks? | Strong | Some wording may reintroduce crypto/asset framing |
| Shell steps | What stage of the example am I in? | Strong for journey | Reinforces “demo walkthrough” over “product purpose” |

---

## 7. System-language findings

### System-centred language (high occurrence)

- Current **simulation** status
- Stability **structure** / **targets** / **system targets**
- Review **snapshot** / simulation date / last viewed locally / recent readings
- Protective **posture**
- Informational posture / not ledger truth
- CLASS-A-VAL-002 research eyebrow

These phrases are often accurate and constitutionally careful. Their cost is that they teach the user to understand **Hedgr’s machine** before understanding **the user’s job**.

### Human-centred language (present; should lead)

- Understand your situation before deciding what to do next
- There is nothing here you need to manage
- See how the simulated position changes
- What would remain
- What changed
- Deposits minus withdrawals show what remains
- No real money moves / no bank contacted

### Caution

Do **not** replace accurate simulation/target language with shorter but misleading consumer claims (protected, guaranteed, invested, held, moved). The fix is hierarchy and deferral, not false simplicity.

---

## 8. Concept-sequencing findings

Intended cognitive sequence: **Situation → meaning → change → safe next step**.

### Current approximate sequence (first-time $0 Dashboard)

1. Simulation trust boundary — good
2. Purpose / financial position — good
3. System status + simulated balance — mixed (status is early)
4. CTA into deposit change — good for journey layer
5. Stability structure (three targets) — **early relative to purpose consolidation**
6. Review snapshot (system review apparatus) — **early / low first-visit value**
7. Educational deep-dives — elective but still present in scroll weight
8. Disclosures — necessary
9. Only after Deposit/Withdraw/Activity: lived change → remainder → explanation — excellent for Layer 2 journey comprehension

### Sequencing judgment

- Journey Layer 2 (money-change comprehension) is well sequenced once the user leaves Dashboard.
- Identity Layer 3 is front-loaded with internal structure before the user has a lived example of change.
- Review Snapshot is especially mistimed for first visit: it answers a returning-user question with first-session chrome.

---

## 9. High-friction areas

1. **Purpose diluted by Dashboard density** — the best identity sentence exists, then competes with status, structure, review, and education in one scroll.
2. **“Stable balance” vs “Simulated balance”** — same word “balance” for guidance target and monetary amount.
3. **Stability Structure as portfolio-looking taxonomy** — invites investing / allocation classification before identity lands.
4. **Conservative yield** — even with calm copy, “yield” pulls toward earn/invest category.
5. **Review Snapshot stack** — high system vocabulary, low first-session identity value.
6. **NORMAL badge** — calm visually; cognitively opaque.
7. **Research/ticket eyebrow (`CLASS-A-VAL-002`)** — reminds users they are in a labelled experiment more than a product purpose.
8. **Disclosure “digital assets”** — can reintroduce crypto categorisation after the UI successfully avoided it.
9. **Calmness ≠ ease** — visual restraint is strong; interpretive work remains high.

---

## 10. Elements that should be preserved

Do not lose these through simplification:

- Calm, non-directive tone
- Visible Simulation Mode / No Real Money boundary
- “There is nothing here you need to manage.”
- Situation-before-action orientation line
- Separation of guidance targets from ledger/balance claims
- Explicit “targets do not divide the balance / do not prove money moved”
- Deposit → Withdraw → Activity arithmetic continuity (`$0 → +$5 → −$2 → $3`)
- “Completed means simulated step finished” education
- Absence of crypto-native chrome in primary journey
- Understanding before action; no gamified urgency
- Copilot kept out of the primary protocol path
- Disclosures as first-class trust surface (wording may need care, presence should remain)

---

## 11. Ranked refinement opportunities

> Non-authoritative. Not implementation authority. Not a UI pass.

### P0 — Mental-model blockers

1. **Make purpose the unmissable first cognitive job.** Keep / elevate “understand where you stand before deciding,” and reduce competing first-screen concepts until that sentence can be restated by the user.
2. **Defer or demote Stability Structure on first visit / $0 state.** Structure is meaningful after the user has a position or has seen a change; early taxonomy teaches architecture before purpose.
3. **Resolve balance terminology collision.** “Simulated balance” (money amount) and “Stable balance” (target lane) compete; one should be renamed or visually subordinated in any future copy pass.
4. **Treat Review Snapshot as secondary / later.** First-session identity does not need simulation-date / last-viewed / recent-readings apparatus up front.

### P1 — Cognitive-load reducers

5. **Humanise status without losing truth.** Prefer “Is anything important happening?” framing over “Current simulation status” + opaque badge as the primary read.
6. **Keep yield language carefully bounded.** If Conservative yield remains visible early, pair it so it cannot become the product category.
7. **Collapse or nest Educational content** so it is clearly elective context, not another mandatory concept cluster.
8. **Remove or hide research ticket IDs** from customer-visible eyebrows where possible in research builds intended to test product identity.
9. **Audit disclosure wording** that reintroduces “digital assets” / crypto categorisation after successful infrastructure abstraction.

### P2 — Editorial refinements

10. Soften redundant simulation phrasing where the banner already carries the boundary (without weakening legal/trust clarity).
11. Align shell step language with identity (“situation → change → remainder → why”) — already directionally good; keep consistent verbs.
12. Nav label “Dashboard” is generic; lower priority than Dashboard body hierarchy.
13. Copilot empty-state copy is acceptable for secondary surface; do not pull it into primary identity testing.

---

## 12. Proposed validation hypotheses

| ID | Hypothesis | Falsifier |
| --- | --- | --- |
| H1 | Technical abstraction is largely complete for this stage; crypto/infrastructure is no longer the dominant dropout cause. | Participants spontaneously classify Hedgr as crypto/DeFi/wallet infrastructure as primary identity. |
| H2 | Cognitive abstraction is the principal remaining identity constraint. | Participants unaided complete “Hedgr helps me understand where I stand before deciding what to do next” (or close paraphrase) early, with low clarification asks. |
| H3 | Cumulative Hedgr-specific concepts on Dashboard, not local unreadability, drive identity failure. | Participants cite a single unclear sentence more than concept overload / competing sections. |
| H4 | Stability Structure + yield/reserve taxonomy increases invest/bank misclassification when shown before lived change. | Early structure exposure correlates with correct stability-before-action identity and lower misclassification. |
| H5 | Review Snapshot adds little first-visit identity value. | First-visit participants spontaneously use Review Snapshot to explain product purpose accurately. |
| H6 | Journey Layer 2 can succeed while Layer 3 fails. | Accurate arithmetic + trust-boundary explanation always co-occurs with accurate product-identity explanation. |

---

## 13. Proposed retest questions

Use alongside the existing dual-layer protocol; do not replace protocol fields.

### Core completions

- Hedgr helps me…
- I would use Hedgr when…
- The first thing Hedgr wants me to understand is…
- I think Hedgr is different from a bank, budgeting app, or investment app because…

### Observational metrics

- Time to first accurate product-purpose explanation
- Count of unfamiliar concepts spontaneously recalled
- Points where participant asks for clarification
- Entry vs exit category assignment
- Whether opening framing changes category
- Whether participant understands when no action is required
- Whether Stability Structure is described as holdings vs guidance
- Whether “Stable balance” is confused with monetary balance

### Moderator discipline

- Do not supply “Financial Stability Companion” or other category labels.
- Do not rescue with Hedgr vocabulary; note rescue if it occurs.
- Prefer participant language over interface term regurgitation.

---

## 14. Risks and constitutional cautions

- **Do not** simplify into guarantees, protection promises, custody implications, or “your money is allocated.”
- **Do not** remove simulation disclosures to reduce cognitive load.
- **Do not** reintroduce crypto terminology to explain infrastructure.
- **Do not** treat comparative products (Polymarket / Plasma) as design specs.
- **Do not** optimise for brevity at the expense of financial/simulation truth.
- **Do not** infer another UI pass from this review; Option 2 forbids gating retest; D-061 already closed the last nested UI pass.
- **Do not** treat this report as Evidence Register acceptance or Class B readiness.
- Watch for over-correction: making Hedgr generic banking/budgeting would destroy distinct purpose while lowering load.

---

## 15. Recommendation to HedgrOps

### Immediate (under current authority)

1. **Proceed with protocol-complete dual-layer participant retesting now** on the `HEDGR-UI-006` build. This nested review must not delay that work.
2. Use §12–§13 as optional probe/enrichment only; parent protocol remains controlling.
3. Treat this document as interpretive input for post-retest synthesis.

### After participant evidence

Prioritise the next product pass only after dual-layer evidence, unless Founder explicitly resequences. Expected priority order **if** evidence confirms this review:

1. Opening narrative / first-screen hierarchy (purpose first)
2. Concept deferral (Structure / Review Snapshot later or nested)
3. Terminology collision repair (balance / stable balance)
4. Only then broader editorial polish

If participants already form the intended identity unaided, **preserve** the current build’s strengths and avoid unnecessary simplification.

### Explicit non-recommendations

- No implementation changes from this ticket alone
- No activation of `CLASS-A-VAL-003` (reserved for future parent successor)
- No further UI nested pass by inference

---

## Required analytical table

| Surface | Current concept | Intended user understanding | Cognitive cost | Risk of misclassification | Preserve / simplify / defer / remove | Rationale | Problem class |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Trust banner | Simulation Mode. No Real Money | This is not live money | Low–medium | Low if persistent | **Preserve** | Foundational trust; technical abstraction success | Disclosure |
| Shell eyebrow | CLASS-A-VAL-002 · … | Research context | Medium | Experiment-demo | **Defer / remove** from identity-critical builds | Ticket chrome ≠ product purpose | Hierarchy |
| Shell / orientation | Understand situation before next step | Purpose: understand then act | Low | Low | **Preserve** | Best identity sentence in journey | — |
| Dashboard | Financial position | Where I stand | Low | Budgeting/banking mild | **Preserve** | Human question; identity-aligned | — |
| Dashboard | Current simulation status + NORMAL | Is anything important happening? | High | System/ops product | **Simplify** label; keep truth | System language precedes human question | Terminology + hierarchy |
| Dashboard | Simulated balance | How much in this simulation | Low | Account/bank if disclosure missed | **Preserve** | Clear monetary anchor | — |
| Dashboard | Stability structure | How protection/arrangement works | High | Investing / portfolio | **Defer** early; keep later/on demand | Premature architecture | Sequencing + category |
| Dashboard | Stable balance (target) | Primary stability priority (guidance) | High | Confused with monetary balance | **Simplify** naming in any future pass | Terminology collision | Terminology |
| Dashboard | Conservative yield | Limited supporting return capacity | High | Investing / earn | **Defer** or bound harder early | Category magnet | Category |
| Dashboard | Reserve | Buffer readiness (guidance) | Medium | Banking buffer / custody | **Defer** early or keep clearly target-only | Familiar word, Hedgr role | Category |
| Dashboard | Stability targets % | Guidance priorities, not holdings | High | Allocation/holdings | **Preserve** truth; **defer** prominence | Accurate but costly early | Sequencing |
| Dashboard | Review snapshot | Calm check-in / what changed in system view | High | Ops dashboard | **Defer** for first visit | Low first-session identity value | Sequencing |
| Dashboard | Simulation date / last viewed locally | System freshness / local memory | High | Irrelevant / confusing | **Defer** | System detail | Hierarchy |
| Dashboard | Protective posture language | Conditions may emphasise protection | Medium | Guarantee / lockup | **Preserve** with existing non-promise guards | Constitutionally important | Disclosure |
| Dashboard | Educational content | Optional why/how | Medium | Glossary overload if forced | **Simplify** as clearly elective | Good content, costly as mandatory scroll | Hierarchy |
| Dashboard | Important disclosures | Limits and risks | Medium | Crypto if “digital assets” leads | **Preserve**; audit wording | Trust-critical | Disclosure |
| Dashboard CTA | Start simulated deposit | See one change | Low | Demo-only product | **Preserve** | Serves Layer 2 journey | — |
| Deposit / Withdraw | Simulated change + remainders | What changed; what remains | Low | Live money if disclosures fail | **Preserve** | Strong human-question fit | — |
| Activity | What changed / calculation | Explain remainder | Low | Bank statement | **Preserve** | Best meaning layer for journey | — |
| Activity | Completed | Simulated step finished | Medium | Bank finality | **Preserve** teaching | Necessary boundary education | Terminology |
| Nav | Dashboard / Deposit / Withdraw / Activity | Move through example | Low–medium | Generic fintech wallet | **Preserve** for now | Familiar path; identity fixed more by Dashboard body | Category |
| Nav / Copilot | Copilot | Ask questions (secondary) | Medium | Advisor / chatbot product | **Preserve** out of primary path | Protocol correctly excludes | Category |

---

## Evidence vs interpretation boundary

| Claim type | Examples in this report | Status |
| --- | --- | --- |
| Direct observation | Exact shipped headings/copy; reading order; concept inventory | Evidence from repo UI |
| Governing intent | D-060 dual-layer objective; protocol prompts; parent product question | Repo authority |
| Likely user mental model / friction ranking | §§1, 3, 5–9, 11 | **Interpretation** — pending participant falsification |
| What to build next | §15 priority order | **Non-authoritative recommendation only** |

---

## Closeout note for nested ticket

This report completes the analytical acceptance criteria for `CLASS-A-VAL-002-CA-001` as a review artifact. Formal nested-ticket closeout in `HEDGR_STATUS.md` / Notion staging remains a separate governance step and does not alter parent retest sequencing.
