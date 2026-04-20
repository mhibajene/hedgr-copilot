# HEDGR RETAIL UI STATUS LANGUAGE GUARDRAILS

Status: Paper exploration only  
Authority: Non-sequencing, non-implementation  
Scope: Language guardrails for Stability Status on the current C3 retail dashboard baseline  
Last updated: 2026-04-14

---

## 1. Purpose

This document defines **language guardrails** for the **Stability Status** layer on the calm-money **C3** retail dashboard baseline.

The dashboard is already in the right **emotional lane**: calm, money-first, and structurally promising. The open question is not whether status should “mean more” in the abstract, but **how that meaning must stay bounded** so trust deepens without drift.

These guardrails support **future refinement and critique** without authorizing overclaim, system-authored tone, or a richer visible engine. **Nothing here is approved final UX copy**, implementation, or product approval. Shipped work remains gated by `docs/ops/HEDGR_STATUS.md` (including §7 / §7a when explicitly sequenced) and `AGENTS.md` discipline.

---

## 2. Authority boundary

This artifact reinforces the same posture as the status-copy micro-test stack:

- Stability Engine retail presentation remains **read-only and informational**; status must not imply execution, accounting authority, or live policy as product truth.
- **Allocation** remains **informational, not accounting truth**; status and allocation stay distinct interpretive layers.
- **No richer visible engine**, full state-machine language in the primary layer, or deterministic runtime semantics are authorized here.
- **No stronger retail risk-state language** (including labels such as `At risk`) is authorized by this document.
- **No wording in this document is approved final copy.** Examples illustrate boundaries and patterns for critique—not verbatim shipping.
- **No outcome in this document is product approval** or sequencing authority.

---

## 3. Inputs

Align this document with the exploration stack. **Immediate anchors:**

- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_MICRO_TEST_READOUT.md` — same-frame A / B / C outcomes; Treatment B as working centerline signal; unresolved semantics and suggested follow-ons.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_COMPARISON.md` — bounded copy directions; comparative criteria; separation of interpretation, engine exposure, and advisory.
- `docs/ops/HEDGR_RETAIL_UI_STATUS_MEANING_TEST_NOTE.md` — “meaning without machinery” frame; supporting-line test; evaluation criteria.

**Supporting context:**

- `docs/ops/HEDGR_RETAIL_UI_STATUS_COPY_MICRO_TEST.md` — micro-test definition; same-frame discipline; explicit out-of-scope list.
- `docs/ops/HEDGR_RETAIL_UI_MEANING_REFINEMENT_BRIEF.md` — §6.1 Stability Status meaning; §6.5 bounded status vocabulary; translate-before-use boundaries.
- `docs/ops/HEDGR_RETAIL_UI_PASS_RESOLUTION_NOTE.md` — accept / translate / defer; bounded supporting-line direction; deferred state machine and risk labels.
- `docs/ops/HEDGR_RETAIL_UI_PROTOTYPE_CRITIQUE_READOUT.md` — prototype reality; status language under ongoing scrutiny.
- `docs/ops/HEDGR_RETAIL_UI_PAPER_REVIEW_READOUT.md` — static review; Hedgr truth and status discipline.
- `docs/ops/HEDGR_STATUS.md` — sole implementation and sequencing authority for shipped surfaces; read-only and informational constraints.
- `AGENTS.md` — repo execution standard; engine-facing read order when any work touches shipped trust surfaces.

---

## 4. Why guardrails are needed

Stability Status is becoming **one of the defining surfaces** of Hedgr: it sits immediately after portfolio value and frames protection posture. The same-frame micro-test showed that **stronger meaning arrives quickly**—and with it, elevated risk of:

- **density** and scan friction
- **system-authored** or machine-dramatic tone
- implication of **hidden rules**, thresholds, or engine outputs
- **overclaim** relative to what the read-only surface can honestly support

Guardrails keep future status exploration **calm, honest, and bounded**—so copy variants can be judged without smuggling machinery, advice, or theatrical precision into a layer that should **clarify posture**, not perform the engine.

---

## 5. Core language principles

### 5.1 Interpretive, not operational

Status language may explain **posture** and bounded interpretation. It must not imply **system actions**, runtime actuation, active control behavior, or “live system” semantics.

### 5.2 Calm, not theatrical

Status language should **improve understanding** without alarmism, performative urgency, or machine-dramatic narration.

### 5.3 Honest, not overclaiming

Status language must not imply **guarantees**, formal protections, precision of thresholds, or outcomes **unless** those claims are genuinely governed and supportable for this layer.

### 5.4 Bounded, not expansive

Status language stays **short and narrow**. It is not a venue for engine exposition, advisory coaching, long narrative, or disclosure of triggers and internal state graphs.

### 5.5 Money-first compatible

Status language remains **subordinate to the money anchor** and preserves the calm-money character of the dashboard—it does not compete with portfolio value for attention or authority.

---

## 6. Acceptable pattern types

Patterns below are **acceptable to explore** in critique and Paper tests—not approved copy.

### 6.1 Simple interpretive label

Example (critique only):

- `Balanced`

Useful as a **calm baseline** and **lower-bound control**. **Weakest on explicit meaning**; may read as atmospheric without supporting context. Still acceptable as a **control** when comparing against variants with supporting lines.

### 6.2 Label + bounded neutral supporting line

Example direction (critique only):

- `Balanced`
- `Your funds are within the current protection range.`

This is an **acceptable exploration pattern** and matches the **strongest current centerline signal** from the micro-test readout (Treatment B). It remains **critique-only** pending honesty review, vocabulary governance, and explicit non-implication boundaries—not a default ship line.

### 6.3 Plain-language posture clarification

Short **neutral** lines that clarify current posture are acceptable **only if** they do **not** imply:

- guarantees or hard outcomes
- system action or automation
- undisclosed thresholds or triggers
- advice, obligations, or “what to do” semantics

Keep examples minimal; prefer **one short sentence** subordinate to the label.

---

## 7. Risky patterns requiring caution

The following may be useful in **critique or stress tests** but require **explicit caution** and translate-before-use discipline—not casual adoption.

### 7.1 “Protection range” phrasing

May help retail legibility, but can **overstate formal precision** or imply governed boundaries the UI does not yet define. Any use must stay honest to what the read-only surface can support.

### 7.2 “Available structure” or similar internal-feeling phrasing

Can sound **too system-authored or abstract** for retail—closer to internal architecture than to calm money. Treat as upper-bound or critique-only unless semantics are explicitly narrowed.

### 7.3 Stronger explanatory consequence

Longer or denser lines can improve meaning but **quickly push** the status layer toward **machine-theater** and hidden-engine implication. Useful as a **stress test**, not as a silent default.

### 7.4 Future-facing or implied action semantics

Language hinting that the system is **actively managing**, **responding**, or **changing** allocation in real time is risky unless **separately governed**—it blurs informational posture with operational narrative.

---

## 8. Out-of-bounds language patterns

The following are **out of bounds** for the **current** Stability Status layer posture (unless and until doctrine, disclosure, and sequencing explicitly widen the boundary).

### 8.1 Deterministic or guarantee language

Examples to avoid when they imply **hard outcomes** rather than bounded interpretive posture:

- `protected`
- `guaranteed`
- `secured`

Plain words are not banned in all contexts; the guardrail is against **promissory or outcome-certain** reading at this layer.

### 8.2 Threshold / trigger language

Examples to avoid:

- references to **thresholds** or **trigger points**
- **score ranges** or cutoffs presented as live rules
- language that discloses **active engine thresholds** the product does not govern for retail UI here

### 8.3 Strong retail risk labels

Examples to avoid:

- `At risk`
- `High risk`
- other **escalatory retail-state** language not yet governed for this surface

### 8.4 Advisory / directive language

Examples to avoid:

- `Consider rebalancing`
- `You should reduce exposure`
- `Move to safety`

The status layer is **not** a guidance or obligation surface in the current posture.

### 8.5 Machine-theater phrasing

Examples to avoid:

- language that sounds like **internal model narration**
- phrases implying **autonomous runtime decisioning** or hidden automation as the headline story of status

---

## 9. Pattern constraints

Practical constraints for status-supporting copy:

- keep supporting lines **short**
- prefer **one sentence** only under the label
- avoid **jargon** and internal architecture words unless deliberately governed
- avoid **hidden-engine** vocabulary that suggests undisclosed rules or outputs
- avoid **legal-sounding promises** without review
- avoid **operational verbs** that read like commands or system actions
- keep the line **subordinate** to the status label and **portfolio value** (money anchor)

---

## 10. Suggested next uses

Use these guardrails to:

1. **evaluate** future status-copy variants against a shared boundary before debate drifts into implementation tone.
2. **narrow** acceptable supporting-line patterns (length, honesty, must-not-imply lists)—still pre-ship.
3. **inform** a first-pass retail-facing status vocabulary note (labels + one-line glosses + explicit non-implications).
4. **screen** phrases before they appear in prototype or Paper tests—catching advisory, guarantee, or machinery drift early.

This list supports **critique and internal discipline**, not backlog sequencing. Implementation remains authorized only through `HEDGR_STATUS.md` §7 / §7a when explicitly named.

---

## 11. Working conclusion

The status micro-test supports **increased meaning only within strict language bounds**: light supporting copy that deepens interpretation **without** exposing machinery, thresholds, or advisory semantics.

**Status language should clarify posture, not narrate the engine.**
