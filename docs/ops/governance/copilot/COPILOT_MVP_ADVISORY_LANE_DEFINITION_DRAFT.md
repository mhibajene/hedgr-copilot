# COP-GOV-001 — Copilot MVP advisory lane definition draft

**Status:** Completed documentation-only governance artifact; no implementation authority
**Last updated:** 2026-05-05
**Working label:** `COP-GOV-001 — Copilot MVP advisory lane definition`

This `_DRAFT` file is the completed `COP-GOV-001` documentation artifact. `docs/ops/HEDGR_STATUS.md` remains the authority for current **§7** / **§7a** state and now restores the repo to no active execution ticket after this docs-only closeout. The filename remains `_DRAFT` unless governance explicitly accepts this filename as canonical or promotes the content into a successor such as `docs/ops/COPILOT_MVP_ADVISORY_LANE_DEFINITION.md`. **Do not rename** this file in this pass unless explicitly instructed.

---

## 0. Status and authority disclaimer

This document is the completed **documentation-only governance artifact** for `COP-GOV-001`. Its authority is limited to advisory-lane definition as archived in `HEDGR_STATUS.md`; current sequencing authority remains only in `HEDGR_STATUS.md` **§7** / **§7a**. It is **not**:

- **Implementation authorization** for product code, packages, CI, backend, models, vendors, or integrations.
- A change to **execution posture**, Stability Engine authority, policy runtime, ledger truth, or accounting semantics.
- Authorization for any successor Copilot ticket, UI surface, runtime binding, or product launch.

It does **not** authorize:

- Copilot **runtime** coupling to live models or external services (see **§6b** category 8 in `HEDGR_STATUS.md`).
- **Policy** or **engine** binding beyond what higher authority explicitly approves later.
- **Account truth**, balance interpretation, or personalized financial advice claims.
- **Backend** services, **Circle** or other vendor rails, signing, custody, or **value-movement** initiation.

Because `COP-GOV-001` is closed, treat this file as bounded documentation evidence only. Notion and other mirrors follow **repo** after merge of any future authoritative updates.

**References (read order for grounding):** `AGENTS.md`, `.cursorrules`, `.cursor/rules.md`, `docs/ops/HEDGR_STATUS.md`, `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`, `docs/decisions/SPRINT-2-ADR-INDEX.md`, ADRs **0013**–**0017**, `docs/copilot/ai-copilot.md`, `docs/copilot/ai-copilot-threat-model.md`, `docs/copilot/flags-and-rollout.md`.

These Copilot docs are reference inputs for this pass; they are not automatically in edit scope unless §7a is explicitly extended.

**Note on existing Copilot docs:** `docs/copilot/ai-copilot.md` describes a **longer-horizon** architecture (orchestration, context assembly from balances, policy layer, LLM adapter). Under **current** `HEDGR_STATUS.md` **§6b** category **8** and Transition Readiness closeout (**§6c**), **runtime Copilot authority expansion** remains **blocked** unless future doctrine, ADRs, and **§7** / **§7a** explicitly widen the boundary. This draft defines a **narrow advisory MVP meaning** consistent with **ADR 0015** containment (“Copilot is the explanation and restraint layer”) and **read-only / non-executing** engine posture (**ADR 0013**, **0014**).

**Note on repo code:** The repository may contain Copilot-related modules under `apps/frontend/**` (for example chat, policy stubs, tests). **This draft does not authorize edits** to those paths; it only informs what a **governance-safe** “Copilot MVP” **may mean** if a future **§7** ticket is named.

---

## 1. Current repo truth

| Fact | Source |
|------|--------|
| **`MC-S3-018`** closed **Stability Engine™️ - Transition Readiness** as **governance readiness only** (documentation-only closeout; no implementation authority). | `HEDGR_STATUS.md` **§6c**, **§7** bullets |
| **`MC-S3-019`** added **test-only** Playwright smoke hardening for shipped Stability Engine trust surfaces; it explicitly did **not** widen Copilot, policy, engine, ledger, vendor, or execution authority. | `HEDGR_STATUS.md` **§7**, **§7a** archived brief |
| **§7** currently names **no** approved next implementation ticket after `COP-GOV-001` closeout. | `HEDGR_STATUS.md` **§7** |
| **§7a** holds the no-active-ticket stub after archiving the completed `COP-GOV-001` brief. | `HEDGR_STATUS.md` **§7a** |
| **Copilot** remains **advisory and subordinate** to the Stability Engine and governance; **ADR 0015** frames Copilot as explanation/restraint, not system center. | `HEDGR_STATUS.md` **§1–§2**; ADR **0015** |
| **§6b** category **8** remains **blocked** at the taxonomy level: *Copilot runtime binding; directive Copilot; customer-facing automation; finance-style autonomy beyond human-confirmed product flows.* Documentation-only boundary work does **not** sit in category 8; it is **category 1** (governance / repo truth, doc-only). | `HEDGR_STATUS.md` **§6b** table |
| **Sequencing:** Only **§7** / **§7a** authorize work; **§6b** is classification and scrutiny input only (`HEDGR_SPRINT_PLANNING_PROTOCOL.md`). | Protocol **§7** / **§7a** rules |

---

## 2. Copilot MVP definition boundary (advisory lane)

Under **current** doctrine and ops posture, **“Copilot MVP”** is an **internal governance label only** — not default user-facing product naming. Before any customer-visible surface is later approved, naming should be reviewed: **“Copilot”** can imply agency, automation, or action. Calmer alternatives (e.g. “Hedgr Guide”, “Stability Guide”, “Ask Hedgr”) may be preferable; **§7** / product governance would own that decision.

In the **advisory lane**, **“Copilot MVP”** means:

- **Advisory** — helps users interpret information; does not command financial choices.
- **Explanatory** — teaches concepts (posture, liquidity, informational targets) in plain language.
- **Non-directive** — avoids imperatives that imply the user “should” move capital; prefers neutral framing and “you may consider…” only where consistent with restraint.
- **Non-executing** — cannot initiate value movement, confirm movements on behalf of the user, or substitute for product controls.
- **Non-binding** — outputs are not terms of service, compliance determinations, or enforceable system decisions.
- **Non-accounting** — does not restate ledger balances, settled positions, or “where your money is” beyond what the UI already shows with equal authority (**ADR 0013**).
- **Non-policy-authoritative** — does not replace deny-by-default policy-core behavior or market gating (**ADR 0014**, **0015**, `.cursorrules` policy posture).
- **Hermetic in CI** — no live network, no live model calls in default CI posture (`AGENTS.md`, `docs/copilot/flags-and-rollout.md`).
- **Subordinate** — Stability Engine remains system center; Copilot explains and supports trust surfaces; it does not override engine posture.
- **Source-of-truth hierarchy** — When any advisory or conversational layer conflicts with repo-authorized product UI, Stability Engine display, policy gates, value-movement records, or trust disclosures, those product surfaces and records prevail; the advisory layer does not.

**Explicitly rejected** as definitions of “MVP” in this lane (blocked or future-gated):

- Fund movement, treasury execution, or hidden reallocation.
- Account control, signing, keys, or custody actions.
- Automated reallocation or “smart” portfolio moves.
- Initiating deposits, withdrawals, or any value-movement flow from chat.
- Engine override or contradicting displayed posture / notices.
- Policy override or silent bypass of product gates.
- Ledger interpretation as a second source of truth.
- Personalized investment instruction (“put X% in… for your situation”).
- Regulatory claims or licensed-advice posture.
- Outcome guarantees (“you will be safe”, “protected” without qualification).
- Finance-style autonomy: acting as unsupervised customer-facing automation.

---

## 3. Permitted MVP jobs-to-be-done (advisory only)

Each row is **allowed only** if implemented later with static/fixture-backed or strictly bounded inputs **and** **§7** authorization. This section is **planning**, not a feature list.

| Job | User value | Allowed data sources (MVP advisory lane) | Forbidden claims | Required guardrail |
|-----|------------|------------------------------------------|------------------|-------------------|
| Explain Stability Engine **posture** in plain language | Reduces jargon shock; supports trust | Static doctrine excerpts; UI-visible posture labels and **already-approved** explanatory copy; **no** new runtime interpretation of `EnginePosture` semantics unless separately **§7**-approved | “Your funds are in X bucket now” as settled truth | Tie language to **posture / targets**, not balances (**ADR 0013**); do not make Copilot an alternate runtime explanation authority for engine semantics |
| Explain why **allocation bands** are informational targets | Prevents shadow-accounting misread | Same as above + canonical copy themes from shipped trust surfaces | Bands equal balances or executed allocations | Mandatory “target / posture” framing (**ADR 0013**) |
| Explain **withdrawal / liquidity** concepts generically | Educational clarity without predicting a path | Public doctrine on liquidity-first; generic UI help text themes | Predicting time-to-funds or success for this user | No user-specific state; uncertainty explicit |
| Explain why **waiting** or **no action** can be valid | Reduces urgency harm; aligns with restraint | Policy of “waiting is valid” from flags doc / threat model themes | “You must wait” as command | Calm, optional framing; not a directive |
| Help users **locate** trust disclosures already in the UI | Improves discoverability | Screen names, section titles from public copy contracts | Inventing disclosures not in product | “As shown in …” only; no fabrication |
| Answer **educational** questions: preservation vs speculation | Doctrine-aligned financial literacy | `.cursorrules`, charter themes, ADR summaries | Trading signals, yield chasing, “best” asset | Institutional tone; risk visible; no hype |

---

## 4. Explicitly blocked Copilot capabilities

| Blocked capability | Reason (governance / ADR) |
|--------------------|---------------------------|
| Move funds | Execution; violates read-only / non-executing posture (**ADR 0014**, `.cursorrules` Sprint 2) |
| Initiate deposit / withdrawal | Category **8** / execution; user control via product flows only |
| Recommend **specific** allocation % changes for the user | Directive + shadow accounting risk (**ADR 0013**, **0015**) |
| Promise yield or safety | Banned promissory / hype framing (`.cursorrules` UX guardrails) |
| Interpret ledger / balance truth beyond displayed UI | Non-accounting; ledger is canonical (**ADR 0013**) |
| Override Stability Engine posture | Engine is system center; Copilot subordinate (**ADR 0015**) |
| Bind to policy **runtime** as authority | Category **7** / **8** territory; policy-core precedence (`.cursorrules`) |
| Auto-monitor user accounts | Surveillance + automation tone; category **8** |
| Alerts from live financial conditions | Requires live data boundary + ADR; hermetic CI default |
| Personalized financial **advice** claims | Regulatory and trust risk; not MVP advisory lane |
| External **live** market data without approved data boundary | Network + truth drift; `AGENTS.md` hermetic CI |
| Use Circle / vendor rails from Copilot | Vendor execution path; **§6c** non-authorization |
| **Perform** value-movement steps from chat | Execution leakage |
| Act as **unsupervised** customer-facing automation | **§6b** category **8** |

---

## 5. Data access boundary

### Allowed for MVP **planning** and for a future **minimal** advisory implementation (if ever §7-approved)

- Static educational copy and doctrine-consistent excerpts (no private user fields).
- Descriptions of **already-rendered** Stability Engine explanations (conceptual paraphrase, not new numbers).
- Non-sensitive product doctrine pointers (e.g. “see allocation band legend in the dashboard”).
- UI-visible trust disclosures **by reference** (where to look), not by inventing text.

### Prerequisite-gated (not assumed for “MVP” without **§7** + ADR/privacy review)

- User value-movement history, balances, pending states.
- Withdrawal state machine specifics for **this** user.
- FX / market data tied to a session.
- Personalized portfolio or goals context.
- KYC / identity, jurisdiction, compliance status.
- Support ticket content or PII-rich channels.

### Blocked unless future ADRs and **§7** explicitly authorize

- Private keys, signing authority, execution credentials.
- Vendor API secrets (e.g. OpenAI live keys in unsafe patterns — Doppler is canonical per `.cursorrules`).
- Backend policy **decisions** surfaced as Copilot truth.
- Custody or treasury **controls** from conversational UI.
- Unrestricted database or raw log access.

---

## 6. UX and copy guardrails

**Language rules (required):**

- **Advisory, never directive** — avoid “You should…”, “Do this now…”, “Move your money…”.
- Prefer **“may”**, **“can”**, **“the screen shows”**, **“under a tightening posture, targets tend to…”** over **“will”**, **“must”**, **“guarantees”**.
- **Explain uncertainty** — rates, timing, external networks, policy gates.
- **Name risk explicitly** wherever yield or stability is discussed.
- **No urgency** — no countdowns, FOMO, or “act before…”.
- **No yield hype** — yield as enhancement, not entitlement (`.cursorrules`).
- **No trading metaphors** — no “farm”, “moon”, “alpha”, etc.
- **No “guaranteed”** outcomes; **no “protected”** without narrow, UI-consistent qualification.
- **“Do nothing” / “waiting can be reasonable”** is an acceptable answer (`docs/copilot/flags-and-rollout.md` aligns with “waiting” as valid).
- **Licensed-advisor boundary** — Copilot must **not** present itself as a licensed financial, legal, tax, or investment advisor.

**Source-of-truth reminder (operational):** If copy or model output disagrees with the UI, engine display, policy gates, records, or disclosures, **discard the advisory output** in favor of those surfaces (same hierarchy as Section 2).

**Example safe vs unsafe pairs**

| Unsafe (reject) | Safer (advisory) |
|-----------------|------------------|
| “You should move 20% to liquidity now.” | “Liquidity targets describe how the system prioritizes access under stress; they are not a record of where your funds already sit.” |
| “Your withdrawal will complete in 24 hours.” | “Withdrawal timing depends on rails, reviews, and network conditions; the status screen is the source for your current request.” |
| “This allocation is guaranteed safe.” | “Posture and targets communicate priorities and constraints; they are not promises about outcomes.” |
| “Rebalance immediately.” | “The Stability Engine surface you see is read-only information; changing allocation happens only through normal product flows you confirm.” |

---

## 7. Technical boundary for **later** implementation (not authorized here)

If governance later names a **§7** ticket, a **minimal-risk** technical posture could include:

- **If** implementation is later approved, prefer **static or fixture-backed** **frontend-only** surfaces **before** any runtime model, backend, account-context, or policy/engine integration. Any server route change would remain **§7**-scoped and ADR-reviewed — not implied by this draft.
- **Hermetic tests** — `OPENAI_MODE=stub`, no CI network (`AGENTS.md`).
- **No** new backend coupling without an ADR covering trust boundary.
- **No** wallet, ledger, policy-runtime, custody, Circle, or vendor coupling from a first advisory slice unless explicitly re-governed.
- **No hidden state mutation** from chat.
- **No** account-aware numeric recommendations until privacy, policy, and ADR gates exist.

This section describes **future-gated constraints** for a **hypothetical** later ticket, not a commitment to **deliver** product, not **launch** language, and **not** authorization to begin UI or runtime work.

---

## 8. Required tests **before** any future implementation ticket merges

(Planning recommendation — **no** tests added by this draft.)

| Test category | Intent |
|---------------|--------|
| Denylist / allowlist **copy** tests | Block directive, execution, guarantee, hype, and “advice for your situation” phrasing in canned paths |
| Snapshot or contract tests for **allowed** advisory templates | Prevent drift of trust-safe templates |
| UI tests for **disclaimers** | Copilot never implied as sole authority |
| Hermetic E2E (if a shipped surface exists) | Smoke paths without live network |
| Negative assertions | No new value-movement buttons from chat; no signing APIs; no unintended backend/policy calls from Copilot paths |

---

## 9. ADR / governance needs

| Topic | ADR or governance gate before implementation? |
|-------|-----------------------------------------------|
| Simple **documentation-only** boundary definition (this file class) | **Likely no new ADR** — reconcile with **0015** and ops; may update ops docs only |
| **Runtime** model use (live LLM) | **ADR** + privacy/security review + **§7** |
| Retention, logging, PII minimization | **ADR** or policy annex + **§7** |
| User data access from Copilot context | **ADR** + **§7** |
| Personalized recommendations | **ADR** + compliance review + **§7** |
| Dedicated **backend** Copilot service | **ADR** + architecture review + **§7** |
| Policy / engine **context binding** (machine-readable truth into prompts) | **ADR** — risks category **7** / **8** overlap |
| Vendor model provider selection | **ADR** or security annex + **§7** |
| Live market data in prompts | **ADR** + data boundary + **§7** |
| Support handoff / escalation automation | Operations + trust review + **§7** |

**Summary:** Pure governance/docs lane (**COP-GOV-001**-class) may not need a new ADR. Any **runtime widening**, data access, or binding to policy/engine truth **likely** needs an ADR and explicit **§7** / **§7a**.

---

## 10. Completed ticket and candidate future tickets (**no implementation authorization**)

This slate is not a queue and does not authorize implementation. `COP-GOV-001` is completed as a documentation-only governance pass and does not authorize follow-on work. Rows B-D are candidate-only and are **not executable** unless a future **§7** / **§7a** names and bounds them (`HEDGR_SPRINT_PLANNING_PROTOCOL.md`).

### A. `COP-GOV-001` — Copilot MVP advisory lane definition (**completed docs-only; no implementation authorization**)

| Field | Content |
|--------|---------|
| **Objective** | Lock a repo-native, doctrine-aligned meaning of “Copilot MVP (advisory)” for human review. |
| **Type** | Documentation / governance |
| **Boundary class** | **§6b** category **1** (governance / repo truth, doc-only) |
| **Current status** | **Completed** as documentation-only governance planning; current sequencing state lives in `HEDGR_STATUS.md` **§7** / **§7a**. |
| **Why now** | §7 names this advisory-boundary work **before** implementation; the pass reduces interpretation drift without widening runtime or product authority. |
| **Not authorized** | No Copilot UI, runtime, backend, tests, model calls, vendor integrations, ADR status changes, or successor-ticket activation. |
| **Scope** | `docs/ops/governance/copilot/COPILOT_MVP_ADVISORY_LANE_DEFINITION_DRAFT.md`; optional `HEDGR_STATUS.md` cross-link only if governance wants it; `docs/copilot/**` only if **§7a** is explicitly extended. |
| **Must not** | `apps/`, `packages/`, `.github/`, tests, backend, models, vendors. |
| **Governance gates** | Human acceptance of content; closeout restores **§7** / **§7a** to no active ticket unless governance separately names a successor. |

### B. `COP-COPY-001` — Copilot advisory response copy contract (**not authorized**)

| Field | Content |
|--------|---------|
| **Objective** | Author frozen advisory templates + denylist rules as docs and/or tests. |
| **Type** | Docs / copy / tests (when §7-approved) |
| **Boundary class** | Prerequisite-gated (touches trust / copy contracts) |
| **Why now** | Early copy contracts reduce generative drift **if** Copilot surfaces expand later. |
| **Why not now** | Requires **§7**; not automatic follow-on to this draft. |
| **Scope** | Docs + tests only as named in **§7a**. |
| **Must not** | Runtime binding, engine/policy truth injection, execution UI. |
| **Governance gates** | **§7** + **§7a** + reviewer for trust language. |

### C. `COP-UI-001` — Static Copilot education surface prototype (**not authorized**)

| Field | Content |
|--------|---------|
| **Objective** | Prototype a **read-only** education panel or static chat shell with fixture text. |
| **Type** | Frontend prototype (presentation) |
| **Boundary class** | Prerequisite-gated (category **3**-like; presentation only) |
| **Why now** | User-testing of tone and discoverability without model risk. |
| **Why not now** | Any UI work needs **§7**; risk of implying live Copilot; must stay static/fixture-first. |
| **Scope** | Bounded files in **§7a** only. |
| **Must not** | Live model, account context, execution shortcuts. |
| **Governance gates** | **§7** + **§7a** + **ADR 0016** red-line review if on Warmth-scoped surfaces. |

### D. `COP-RUN-001` — Runtime Copilot spike (live model) (**not authorized**)

| Field | Content |
|--------|---------|
| **Objective** | Experimental live-model behavior (typically rejected for MVP advisory lane). |
| **Type** | Spike / research |
| **Boundary class** | **§6b** category **8** risk — **blocked** unless tightly re-governed |
| **Why now** | — |
| **Why not now** | Default **blocked**: conflicts with category **8**, hermetic CI defaults, and lack of ADR for trust boundary. |
| **Scope** | N/A until ADRs + **§7** redefine boundary. |
| **Must not** | Proceed without **ADR**, security review, and explicit **§7** naming. |
| **Governance gates** | New ADR(s), doctrine check, **§7** / **§7a**, privacy & abuse review. |

---

## 11. Recommended next action

**Status (post-closeout):** **`COP-GOV-001`** is archived in **`docs/ops/HEDGR_STATUS.md` §7a** with completed record **§52**. **§7** names no successor ticket unless governance updates it explicitly.

**After closeout:** Treat this document as governance evidence only. Any future edit, copy-contract, UI, or runtime work requires a separate **§7** ticket and **§7a** brief.

**Do not** recommend Copilot **implementation**, **runtime** coupling, or **UI** work from this draft alone.

**Naming:** **“Copilot MVP”** is an **internal governance label** only (see **Section 2**). This recommendation is **not** approval of customer-facing product naming or **launch** framing.

---

## 12. **§7** / **§7a** archived activation text (documentation-only)

> **Authority:** Governance activated and closed `COP-GOV-001` in **`docs/ops/HEDGR_STATUS.md`** **§7** and **§7a**. The table below is historical activation text; if wording diverges, **`HEDGR_STATUS.md`** wins.

### §7 bullet (repo authority remains HEDGR_STATUS.md)

**Approved next ticket:** `COP-GOV-001` — Copilot MVP advisory lane definition (**documentation-only** governance planning; **no** implementation authority).

### §7a — Archived execution brief (`COP-GOV-001`) — historical mirror

| Field | Content |
|--------|---------|
| **Objective** | Publish and maintain a governance-safe definition of “Copilot MVP (advisory lane)” consistent with ADRs **0013**–**0017**, `.cursorrules`, and `AGENTS.md`; reconcile with existing `docs/copilot/**` where helpful. |
| **Primary files** | `docs/ops/governance/copilot/COPILOT_MVP_ADVISORY_LANE_DEFINITION_DRAFT.md` (or successor canonical name agreed in PR); optional targeted cross-links in `docs/ops/HEDGR_STATUS.md` **only if** governance wants explicit pointer (still doc-only). |
| **In scope** | Edits under `docs/ops/**` (and `docs/copilot/**` **only if** governance extends scope explicitly in **§7a** / this brief) that refine advisory boundaries, blocked capabilities, data classes, copy guardrails, and candidate ticket slate **as recommendations**. |
| **Must not** | Any change under `apps/`, `packages/`, `.github/`; **no** new tests; **no** new Copilot UI; **no** backend services; **no** calls to model APIs; **no** new vendor integrations; **no** ADR status changes; **no** implication of execution, ledger, policy-runtime, engine, or Circle authority. |
| **Acceptance criteria** | (1) Authority disclaimer and **§6b** category **8** alignment are explicit. (2) Permitted jobs vs blocked capabilities are tables or equivalent unambiguous lists. (3) Data boundary triage (allowed / gated / blocked) is complete. (4) Copy guardrails with safe/unsafe examples, including **licensed-advisor boundary** and **source-of-truth hierarchy** (product UI / engine / policy / records / disclosures win on conflict). (5) ADR needs table for future runtime widening. (6) Candidate tickets A–D labeled **not authorized**. (7) Clear statement that Stability Engine remains read-only informational (**ADR 0014**) and allocation bands informational (**ADR 0013**). (8) **`_DRAFT`** / canonical naming rule (opening note after title metadata) preserved or superseded by explicit governance decision. (9) **“Copilot MVP”** documented as **internal governance label** with user-facing naming caution. |
| **Validation** | Human governance + doc review; `pnpm` / CI **not** required by this ticket class unless ops chooses to run repo validate for hygiene. |
| **Closeout requirements** | Restore **§7** to “None named” and **§7a** to no-active-ticket stub **unless** governance deliberately sequences a **new** approved ticket; archive this brief under **§7a** archived pattern; optionally add pointer in **§6** history if ops maintains ticket log there. |

---

## 13. Self-check — accidental implementation language

Draft scanned for planning-safe usage:

| Term | Disposition in this draft |
|------|---------------------------|
| “Build” | Avoided in imperative sense; “author”, “publish”, “compose” used for docs. |
| “Ship Copilot” | Not used as an authorization; future **implementation or release** explicitly **§7**-gated. |
| “Runtime binding” | Used only to **name** what is **blocked** (**§6b** cat **8**). |
| “Execute” | Avoided as imperative; “execution”, “non-executing” used in governance sense. |
| “Transaction” | Appears only as **generic** “value-movement” / risk context or **blocked** rows, not as authorization. |
| “Personalized advice” | Cited as **blocked** category. |
| “Guaranteed” | Cited as **forbidden** / unsafe copy example. |
| “Agent” / “autonomous” | Appears only inside **§6b** category label quotation (“… automation; … finance”) or as **blocked** concept — not as a goal. |
| Licensed-advisor boundary | Required in **Section 6**; reinforced in draft **§7a** acceptance criteria. |
| Source-of-truth hierarchy | **Section 2** + **Section 6** reminder; product wins on conflict. |
| “Copilot MVP” naming | **Section 2** + **Section 11**: internal governance label only; not default user-facing naming. |

---

## 14. Relation to **§6b** category **8** (explicit Q10 answer)

**Question:** Which parts remain blocked under **§6b** category **8**?

**Answer:** Any Copilot work that constitutes **runtime binding** (live model in product authority path), **directive** Copilot (commands financial action), **customer-facing automation** beyond normal product-confirmed flows, or **finance-style autonomy** (unsupervised action loops) remains **blocked** until doctrine, ADRs, and **§7** widen the boundary. Documentation-only boundary work for `COP-GOV-001` is outside **§6b** category 8 because it does not introduce runtime, automation, or binding; it is **category 1** (governance and repo truth, documentation-only).

---

## 15. Smallest safe later implementation slice (if governance activates one)

**Smallest slice (post-`COP-GOV-001`, still requires future §7):** Static, fixture-only education strings in an existing or new **read-only** surface, with visible disclaimer that the Stability Engine display is informational, **no** account context, **no** generative model, **hermetic** tests — scoped in **§7a** to explicit file paths. Anything involving live generation, user balances, or policy/engine binding is **not** “smallest safe” under current **§6b**.

---

*End of draft.*
