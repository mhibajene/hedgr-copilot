# Hedgr MVP phased alignment readout (`MC-S3-020`)

**Status:** Governance orientation artifact only.  
**Authority:** Subordinate to `docs/ops/HEDGR_STATUS.md` (especially **§2**, **§6a–§6c**, **§7**, **§7a**), `AGENTS.md`, and accepted ADRs. This document does **not** sequence work, name tickets beyond what **§7** states, widen execution class, change ADR status, or amend constitutional doctrine.

**Purpose:** Map the **governance-gated roadmap** and **MVP success criteria** in `docs/doctrine/hedgr-mvp-project-specification.md` to the **current repo phase** recorded in `docs/ops/HEDGR_STATUS.md`, and relate that to the **Stability Wallet / Stability Engine** North Star in `docs/doctrine/hedgr-whitepaper.md`, so “MVP progress” is read as **phase-appropriate** rather than assuming informational-era shipped work implies **Class B** or **Class C** execution readiness.

---

## 1. Doctrine sources (by file and section)

| Document | Sections used here | Relevance |
|----------|---------------------|-----------|
| `docs/doctrine/hedgr-mvp-project-specification.md` | **§5** (MVP capabilities and execution classes **A / B / C**), **§9** (governance-gated roadmap / authority phases), **§12** (MVP success criteria), opening **Implementation truth** paragraph | Defines product intent, execution classes, phased authority expansion, and success outcomes; defers **today’s** implementation boundary to `HEDGR_STATUS.md` and `AGENTS.md`. |
| `docs/doctrine/hedgr-whitepaper.md` | Executive summary; “The Hedgr Solution”; “The Hedgr Stability Engine” | North Star: **Stability Wallet** thesis; **Stability Engine** as interpretive center of a stability-first system. |
| `docs/ops/HEDGR_STATUS.md` | **§2**, **§6a**, **§6b**, **§6c**, **§7**, **§7a** | Canonical **merged truth** and sole **implementation activation** surfaces for the repo. |
| `docs/decisions/0013-allocation-bands-informational-not-accounting.md` | (ADR in full) | Allocation bands are **informational**, not ledger or accounting truth. |
| `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md` | (ADR in full) | Stability Engine **read-only** posture for the governed sprint boundary. |

---

## 2. Current repo phase (from `HEDGR_STATUS.md`)

Per **§2** and **§6a–§6c**:

- **Stability Engine — Foundation** is **closed** as a shipped repo baseline (**§6a**). That verdict does **not** relax read-only or non-execution constraints.
- **Stability Engine — Transition Readiness** is the named **next track** in repo canon: **post-foundation boundary readiness**, not a license to expand execution (**§2**, **§6c**). **§6c** records governance readiness to mark that track shipped in downstream surfaces as **governance readiness only**—not implementation or custody/ledger authority.
- **Engine and UI posture:** read-only, informational, non-executing; allocation bands remain informational (**§2**; ADRs **0013**, **0014**).
- **Sequencing:** Only **§7** / **§7a** authorize the next implementation ticket; **§6b** is taxonomy and scrutiny input only—not backlog approval (**§2**, **§6b**).

---

## 3. Alignment: MVP spec **§9** phases → repo posture

The MVP specification **§9** describes **authority phases** that advance when **doctrine, ADRs, and `HEDGR_STATUS`** record approval—not on calendar alone. The table below maps those **illustrative** phase names to **current repo alignment** as of `HEDGR_STATUS.md` **§2** / **§6a–§6c**.

| MVP spec **§9** phase (illustrative label in spec) | Doctrine meaning (summary) | Current repo alignment |
|---------------------------------------------------|----------------------------|-------------------------|
| 1. Foundation — informational engine and trust surfaces | **Class A** emphasis: educate, disclose, display engine-aligned posture; no fund movement | **Shipped / closed** for Foundation-scoped **§6** work through **`MC-S2-023`** and **§6a** verdict. |
| 2. Transition readiness | Operational, policy, and technical criteria before expanding execution automation | **Governance readiness** for the Transition Readiness **track** is assessed in **§6c**; repo remains read-only. **§6b** supplies classification only. |
| 3. Pilot execution — manual / limited (**Class B**) | Deposits, withdrawals, treasury with human controls and limits | **Not authorized** by current **§2** constraints and **§6b** categories **6–8** without future ADRs and explicit **§7** / **§7a** activation. |
| 4. Automated execution (**Class C**) | Workers, programmatic settlement, protocol interaction under explicit governance | **Blocked** at current posture; same gates as **Class B**. |
| 5. Surface expansion | Hedgr Pro, APIs, additional jurisdictions | **Out of current MVP implementation lane** unless separately governed. |

---

## 4. MVP spec **§12** success criteria vs current posture

Section **§12** of `hedgr-mvp-project-specification.md` states that the **MVP succeeds if** it validates five outcomes (demand, rails, liquidity/withdrawal experience, engine-aligned communication, advisory Copilot engagement). Interpreted **against** the spec’s own **§5** / **§9** framing:

1. **Demand for stability-first wallets** — Research and product learning; not contradicted by informational-era implementation; **not** proven or disproven by repo code alone.
2. **Reliable rails** — Requires **Class B** or **Class C** execution posture when licensed and integrated; **not** implied by current read-only engine and CI-stub posture (**§2**).
3. **Liquidity and withdrawal experience users can rely on** — Doctrine-critical; **informational** withdraw and stability UX may exist per **§6** merged truth, but **execution-class** “reliability” claims remain gated until pilot execution is **§7**-authorized.
4. **Engine-aligned communication** — **In scope** for the read-only era; ADRs **0013** / **0014** bound how allocation and posture are framed.
5. **Advisory Copilot engagement** — Advisory posture is defined in governance (`COP-GOV-001` in **§7** history); **runtime** Copilot product implementation remains gated by a future **§7** ticket and **§7a** brief, not by this readout.

---

## 5. North Star (`hedgr-whitepaper.md`) vs repo phase

The whitepaper describes the **Stability Wallet** and **Stability Engine** as the user-visible thesis and the **center** of allocation and risk framing in the **target** system. That is **consistent** with `HEDGR_STATUS.md` centering the engine, provided readers distinguish:

- **Thesis and architecture (doctrine / whitepaper)** — what the system is designed to become under governed execution phases.
- **Current shipped posture (`HEDGR_STATUS.md` §2)** — read-only, informational engine; wallet as **proof surface**, not execution of the full target treasury layer.

There is **no conflict** between the North Star and the repo if “completion” is read as **phase-gated** progress: Foundation and Transition Readiness work can **validate** trust, communication, and governance discipline **before** Class **B**/**C** execution is approved.

---

## 6. How to use (and not use) this readout

**Use it to:**

- Explain why **informational** Stability Engine and trust-surface work is **intentional** progress toward the MVP North Star **without** claiming live rails, ledger truth, or autonomous allocation.
- Onboard reviewers onto **`HEDGR_STATUS.md` §2** vs **`hedgr-mvp-project-specification.md` §9** in one place.

**Do not use it to:**

- Skip **§7** / **§7a** activation, treat **§6b** disposition labels as a backlog, or treat Notion or roadmap prose as repo truth.
- Imply that MVP **§12** items **2** or **3** are satisfied by read-only UI alone.

---

**Ticket:** `MC-S3-020` — activated in `docs/ops/HEDGR_STATUS.md` **§7** / **§7a** (documentation-only).
