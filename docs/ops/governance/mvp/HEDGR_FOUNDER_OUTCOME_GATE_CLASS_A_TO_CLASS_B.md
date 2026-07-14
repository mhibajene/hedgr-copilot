# Hedgr Founder Outcome Gate — Class A Validation → Class B Feasibility

**Purpose:** Support a founder decision on Hedgr’s next measurable product outcome.

**Authority:** Decision support only; execution requires `HEDGR_STATUS.md` **§7** / **§7a** and applicable accepted ADRs.

**Current boundary:** Class A only. No live fund movement, market/provider approval, custody claim, or Class B authority.

**Date:** 2026-07-13

**Status:** Disposition **1 — Class A validation** recorded (Internal **D-031** / **§133**). Outcome contract **§7-activated** as `CLASS-A-VAL-001` (**§7** / **§7a** / **§134**). Class B execution and customer-money activity remain **unauthorised**.

---

## 1. Purpose, authority, and current boundary

This artifact proposes **one bounded product-validation outcome**, the evidence it must produce, and the decision that evidence will unlock.

It records decision support and founder disposition inputs. It does **not** itself activate work or authorise customer-money activity — activation of `CLASS-A-VAL-001` occurred via separate **§7** / **§7a** naming (**§134**).

**Three layers (keep separate):**

1. **Founder disposition** — **Recorded:** disposition **1 — Class A validation** (2026-07-13; DRI Founder @mhibajene; Internal **D-031** / **§133**).
2. **Repo-native activation** — **`CLASS-A-VAL-001` named** in `HEDGR_STATUS.md` **§7** / **§7a** (activation **§134**). Exact execution brief lives in **§7a**.
3. **Execution** — inside the activated `CLASS-A-VAL-001` brief only; still synthetic / visibly non-live; Class B remains unauthorised.

**Live sequencer (verified 2026-07-13 from `docs/ops/HEDGR_STATUS.md`):** **§7** / **§7a** name **`CLASS-A-VAL-001`** (activation **§134**). Disposition **1** recorded (**D-031** / **§133**). `GOV-FOG-001` completed. `MVP-EVID-001` completed (**§131**). Singular-ticket default. Kenya counsel send remains **DEFER** (**§6f.1** / D-028). Convergence gate (**§6e**) unsatisfied.

---

## 2. Current truth

### Two evidence thresholds — do not confuse

These are not separate products. They are proof thresholds for the **same Stability Wallet thesis**.

| Threshold | What Hedgr must establish |
|-----------|---------------------------|
| **Class A — User comprehension and trust evidence** | Target users understand the stability proposition, product boundaries, risk posture, and synthetic withdrawal expectations. |
| **Class B — Operating feasibility and reliability evidence** | Hedgr can safely move and return money through one bounded market, rail, provider, and custody path. |

| Area | Evidence-honest status |
|------|------------------------|
| Class A Stability Wallet surface (engine, trust UX, synthetic withdrawal journey) | **Implementation complete and research-ready; target-user validation incomplete** |
| Class B money-moving pilot | **Not authorised**; feasibility evidence incomplete; convergence gate open |
| MVP Evidence Register (`MVP-EVID-001`) | **Primed** as evidence container only; domains incomplete; not a user or product outcome |
| Institutional MVP acceptance (ADR **0024**) | **Not declared**; evidence-gated |

Maintaining a permanent “informational product” lane while the operating thesis remains untested is a governance-theatre risk. Class A work after this gate must serve a named validation outcome, not unbounded UI accumulation.

### Operating invariants (not reopened as strategic decisions)

- MVP acceptance remains evidence-gated under ADR **0024** unless superseded through an accepted repo-native decision.
- No acceptance domain may be marked **Accepted** merely to demonstrate progress.
- Allocation bands remain informational; Stability Engine remains read-only until ADRs and **§7** widen authority.
- UI completeness is not product availability. Synthetic journeys do not prove live withdrawal reliability.
- Research geography is **not** pilot-market selection.
- Class C automation and live yield routing stay downstream of evidenced Class B withdrawal integrity.

### Architecture invariants

```text
Wallet UX  →  Copilot (advisory only)
     ↓
Stability Engine (center; read-only until ADRs widen)
     ↓
Execution (custody · rails · treasury)  ← Class B unlock lives here
     ↓
Policy / disclosures / deny-by-default
```

Yield routing and Class C automation stay **downstream** of a working Class B pilot.

---

## 3. Founder decision — recorded

**Recorded disposition (2026-07-13):** **1. Class A validation**

**DRI:** Founder — @mhibajene
**Decision Log:** Internal **D-031** (Notion mirror) · repo closeout **`HEDGR_STATUS.md` §133**
**Ticket of record:** `GOV-FOG-001` (activation **§132**; closeout **§133**)

| Disposition | Meaning | Status |
|-------------|---------|--------|
| **1. Class A validation** | Test whether target users understand and value the stability and withdrawal proposition under synthetic, visibly non-live conditions. | **Selected** |
| **2. Class B feasibility** | Determine whether one market, rail, provider, and custody path could support a capped pilot. Does **not** authorise live execution. | Not selected |
| **3. Pause or reframe** | Stop product expansion while the target user, product thesis, or resource posture is reconsidered. | Not selected |

The outcome contract in **§4** is **§7-activated** as `CLASS-A-VAL-001` (**§134**). Exact scope is **`HEDGR_STATUS.md` §7a**.

**Non-authorization:** Class B execution, customer-money activity, counsel send, market/provider/rail/custody selection, Evidence Register domain acceptance-for-show, gate clearance, and institutional MVP “done” remain **unauthorised**.

---

## 4. Active outcome contract (§7-activated as `CLASS-A-VAL-001`)

**Active outcome (named in `HEDGR_STATUS.md` §7 / §7a / §134):**

> By **31 July 2026**, determine whether target cross-border freelancers understand Hedgr’s stability proposition and synthetic withdrawal journey well enough to justify a one-market Class B feasibility cycle.

**Activation:** Disposition **1** recorded (**D-031** / **§133**). Execution ticket **`CLASS-A-VAL-001`** activated (**§134**). Exact brief: **`HEDGR_STATUS.md` §7a**.

### Outcome contract

| Field | Required content |
|-------|------------------|
| **Decision unlocked** | Progress to Class B feasibility, run one bounded proposition iteration, or stop/reframe |
| **Target user** | Freelancers who receive, hold, or convert foreign-currency income |
| **Research context** | Geography recorded as **participant context**, not pilot-market selection. Accessible Zambian or regional freelancers may be recruited without selecting Zambia (or any jurisdiction) as launch market, and without implying provider, rail, legal, or custody approval. |
| **Product slice** | Proposition → balance / stability → allocation → synthetic withdrawal → exception / support |
| **Cohort** | **8** diagnostic sessions → **one** bounded product iteration → **4** fresh validation sessions |
| **DRI** | **Founder — @mhibajene** (named accountable owner for this outcome). Supporting workstreams may assist; accountability does not transfer to “Product,” “Research,” or “the team.” |
| **Supporting workstreams** | Product research; bounded Class A engineering changes (only if §7-named); HedgrOps evidence review |
| **Decision date** | **31 July 2026** |
| **Execution boundary** | Synthetic and visibly non-live; no real funds; no live availability claims |
| **Evidence domains fed** | **D1, D2, D3, D4, D8, D9** (Acceptance Framework receives evidence from the product cycle; it does not substitute for it). Cross-links: ADR **0024**; `FE-TRUST-002` residual interpretation evidence (**§129**); primed Evidence Register (**§131**) — domains remain incomplete / unscored. |
| **Evidence container** | MVP Evidence Register may receive mapped findings where repo authority supports updates; register activity is not the user outcome |
| **Final evidence** | Session records; misconception register; product changes; validation findings; acceptance-domain mapping; founder disposition |
| **Rollback / stop** | Revert or disable the research variant; stop expansion if trust-critical failures persist |

---

## 5. Measures and decision rule

### Critical misconceptions (define before research begins)

Any **unresolved** belief that Hedgr provides one of the following **blocks progression**:

- guaranteed principal or purchasing-power protection;
- guaranteed yield;
- instant or guaranteed withdrawal;
- completed real-money movement through a synthetic journey;
- live market, provider, rail, or custody availability;
- banking, insurance, regulatory, or compensation protection not actually in force.

### Progression thresholds (fresh validation cohort of 4)

Treat the initial **8** sessions as diagnostic. Use the final **4** fresh, post-iteration sessions for the thresholds below. Use participant counts, not percentages.

| Measure | Threshold in fresh validation cohort |
|---------|--------------------------------------|
| **Product category** | **4/4** do not describe Hedgr as trading-first or yield-first; at least **3/4** describe stability or purchasing-power preservation |
| **Withdrawal truth** | At least **3/4** distinguish known information, estimates, unknowns, and provider-dependent terms |
| **Synthetic boundary** | **4/4** understand that no real funds moved and that the journey does not prove live availability |
| **Critical misconceptions** | **Zero** unresolved critical misconceptions |
| **Demand signal** | At least **2/4** take a defined, friction-bearing next step |

A waitlist click alone does **not** qualify as a material demand signal.

**Qualifying next steps (examples):**

- agreeing to a follow-up around the participant’s real financial workflow;
- joining a clearly described future research cohort;
- sharing their current non-sensitive payment and conversion sequence;
- expressing willingness to test a bounded pilot under explicit conditions.

**Withdrawal truth note:** The test must **not** require users to repeat precise fees, timing, or settlement amounts that do not yet exist. It tests whether users can distinguish confirmed information from estimates and unknowns.

### Decision rule (after validation evidence)

**Progress to Class B feasibility** — only where:

- all trust-critical thresholds pass;
- the proposition is understood as stability-first;
- synthetic and live boundaries are understood;
- a credible demand signal exists;
- no required product change would introduce unsupported guarantees or misleading precision.

This authorises **feasibility work only** — not a pilot and not live fund movement.

**Iterate once** — where:

- the problem appears valuable;
- failures are traceable to specific product-language or interaction issues;
- there is no persistent doctrine breach;
- the correction remains inside the approved product slice.

No repeated polish cycle should occur automatically.

**Stop or reframe** — where:

- critical misconceptions persist;
- users continue to interpret Hedgr as trading-first or yield-first;
- the proposition requires unsupported guarantees to be attractive;
- problem salience and meaningful next-step demand are weak;
- the decision date is missed without an explicit founder disposition.

---

## 6. Critical path (user outcome first)

```text
Founder selects Class A validation outcome (disposition 1)
  → HEDGR_STATUS §7 / §7a activates bounded work
  → 8 diagnostic user sessions
  → one evidence-driven product iteration
  → 4 fresh validation sessions
  → evidence mapped to D1, D2, D3, D4, D8, D9
  → founder decides: progress, iterate once, or stop/reframe
  → if progressed, repo activates Class B feasibility
  → Class B feasibility resolves operating dependencies
  → founder decides whether to authorise a capped pilot
  → if authorised, operate and evidence withdrawal integrity
  → institutional MVP review (ADR 0024)
  → only then Class C / live yield execution / surface expansion
```

`MVP-EVID-001` (completed) may remain the evidence container pattern for domain mapping. It is **not** the user or product outcome and is **not** the live sequencer.

---

## 7. Next outcome if progressed — Class B feasibility

**Next outcome (only if Class A validation unlocks progress):**

> Determine whether Hedgr can support a safe, capped, human-gated pilot through **one market, one rail, one provider endpoint, and one custody path**.

### Dependency chain (sequenced — not seven parallel founder votes)

```text
Pilot user and market hypothesis
  → jurisdiction and legal viability
  → provider, rail, endpoint, and custody feasibility
  → fees, FX, refund, failure, and support model
  → reconciliation, incident-stop, and operational controls
  → capped pilot design
  → founder authority decision (C7)
```

| Stage | Role |
|-------|------|
| **Feasibility work and evidence** | Dependency chain through pilot design (Appendix A checklist) |
| **Authority widening** | Explicit founder + ADR + **§7** / **§7a** decision only |

**Required outputs before any pilot authorisation:**

1. One pilot user and market hypothesis.
2. Legal and counsel viability.
3. Provider, rail, endpoint, and custody model.
4. Fees, FX, and basic unit economics.
5. Refund, failure, dispute, and support ownership.
6. Reconciliation source of truth and incident-stop procedure.
7. Proposed cap, cohort, operating hours, and human-review model.
8. Founder disposition: **authorise**, **defer with conditions**, or **reject**.

Do **not** mark a dependency “decided” where underlying feasibility evidence does not yet exist. Completing frontend, backend, or synthetic UX does **not** satisfy this chain.

**Defer until after an authorised, evidenced Class B pilot:** Class C automation; live yield routing; Hedgr Pro / APIs expansion.

---

## 8. Boundaries, risks, and stop conditions

| Boundary | Rule |
|----------|------|
| This artifact | Decision support only; not self-activating |
| Class A validation | Synthetic / visibly non-live only |
| Research geography | Participant context ≠ pilot-market selection |
| Class B execution | Remains **unauthorised** until explicit authority widening |
| Customer money | Not authorised by disposition, research, or UI completeness |
| Parallelism | D-029 completed historical only; new pass requires separate founder naming |

**Stop conditions:** trust-critical misconception persistence; yield/trading-first framing; demand for unsupported guarantees; missed decision date without disposition; any pressure to accept Evidence Register domains to show progress.

---

## 9. Required founder-session output

Disposition and decision record live in Internal **D-031** / `HEDGR_STATUS.md` **§133**. Activate validation work separately via **§7** / **§7a**.

- [x] One outcome selected — **1. Class A validation** (2026-07-13)
- [x] Outcome hypothesis recorded — §4 outcome contract
- [x] Target cohort and research context recorded — freelancers / participant-context geography (not pilot-market selection)
- [x] Tested product slice and exclusions recorded — §4 product slice; synthetic / visibly non-live only
- [x] **One named DRI** recorded — Founder (@mhibajene)
- [x] Supporting workstreams identified — product research; bounded Class A engineering (only if §7-named); HedgrOps evidence review
- [x] Success, failure, and stop thresholds recorded — §5 measures / decision rule / §8 stop conditions
- [x] Critical misconceptions defined — §5
- [x] Decision date recorded — **31 July 2026**
- [x] Founder disposition entered in the appropriate repo-native decision record — **D-031** / **§133**
- [x] Disposition-capture ticket closed — `GOV-FOG-001` (**§132** / **§133**); validation ticket activated separately as `CLASS-A-VAL-001` (**§134**)
- [ ] First participant sessions scheduled (in progress under `CLASS-A-VAL-001` **§7a**)
- [x] Class B execution explicitly remains **unauthorised**

---

## Appendix A — Class B feasibility evidence checklist

Former C1–C7 substance, retained as a sequenced evidence checklist — not a flat decision board.

| ID | Dependency | Evidence cue | Note |
|----|------------|--------------|------|
| C1 | Counsel / legal viability | D-028 **DEFER** (§6f.1) until revisit conditions met | Send ≠ market select |
| C2 | Pilot user and market hypothesis / jurisdiction | Thesis stress-test ≠ selection | Required for §6e |
| C3 | Provider, rail, endpoint | Source pointers ≠ approval | Required for §6e |
| C4 | Custody model + provider-of-record | Class B custody memos are governance only | Required for §6e |
| C5 | Fee / FX / refund / failure / support ownership | Off-ramp evidence domains open | Required for honest withdrawal claims |
| C6 | Reconciliation source of truth + incident stop | Ops scaffolds exist; proof does not | Required for pilot ops |
| C7 | Authority widening | ADRs + **§7** / **§7a** Class B ticket | Only then may implementation connect to live paths |

**§6e convergence:** Architecture readiness ≠ execution readiness. UI completeness ≠ product availability.

---

## Appendix B — Governing references

- `docs/ops/HEDGR_STATUS.md` — §2, §6e, §6f.1, **§7** / **§7a**, §129, §131, §132, §133, §134
- `docs/doctrine/hedgr-mvp-project-specification.md` — success criteria; execution classes
- `docs/doctrine/hedgr-constitutional-charter.md` — capital preservation; risk visibility; narrative integrity
- `docs/doctrine/hedgr-ux-constitution.md` — exit clarity; no unsupported promises
- `docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md` — material decisions; kill criteria
- `docs/decisions/0024-mvp-acceptance-is-evidence-gated-not-feature-gated.md`
- `docs/ops/governance/mvp/HEDGR_MVP_ACCEPTANCE_FRAMEWORK.md` — domains D1–D10
- `docs/ops/governance/mvp/HEDGR_MVP_EVIDENCE_REGISTER.md` — evidence container
- `docs/ops/governance/mvp/HEDGR_MVP_PHASE_ALIGNMENT.md`
- `AGENTS.md`

---

**Boundary statement:** This artifact records decision support and founder disposition. It does not itself activate work or authorise customer-money activity. Disposition **1** did not self-activate `CLASS-A-VAL-001`; separate Founder **§7** / **§7a** naming activated it in **§134**.
