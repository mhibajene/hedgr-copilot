# propose-next-ticket

You are producing a **recommendation-only** pre-§7 sequencing aid. This command **does not** authorize work, **does not** change repo authority, and **must not** be treated as a new governance surface.

## Usage (vs `/governance`)

- This command is the **narrow** pre-§7 sequencing helper.
- Use it when you want **one** structured recommendation package: candidate comparison, one recommendation or **`no ticket yet`**, and **mandatory** draft **`§7`** and **`§7a`**.
- It does **not** replace **`/governance`** for broader doctrine checks, exploratory planning, or open-ended governance discussion.

## Authority (non-negotiable)

- **`docs/ops/HEDGR_STATUS.md`** is **canonical merged truth** for status and execution posture.
- **§7** is the **sole** surface that names the **approved next** implementation ticket (or explicit none).
- **§7a** is the **sole** surface for the **active execution brief** when §7 names a ticket.
- **`docs/decisions/SPRINT-2-ADR-INDEX.md`** and individual ADRs **constrain boundaries only**; they **do not** sequence tickets.
- **`docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`** defines governance vs execution mode; this command stays **subordinate** to that protocol and to §7 / §7a.

**Explicit disclaimer (repeat in output):** A recommendation from this command is **not authorization** until human governance updates **`HEDGR_STATUS.md`** §7 and §7a. Do not start implementation on this output alone.

## Read first (in order)

1. `AGENTS.md` (engine-facing read order if relevant)
2. `docs/ops/HEDGR_STATUS.md` — especially **§6** (merged implementation truth), **§7**, **§7a**, and **§6b** only as **taxonomy / scrutiny** (not sequencing)
3. `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`
4. `docs/decisions/SPRINT-2-ADR-INDEX.md` and any ADRs **cited by** the candidate tickets you consider

## Method (repo-first, deterministic)

1. **Quote or paraphrase with file pointers** from `HEDGR_STATUS.md` for current §7 / §7a state. Do not invent tickets not grounded in repo text, §6b classification, or explicit backlog rows **as candidates**—candidates may include “doc-only governance refinement” only if consistent with protocol red lines.
2. **Do not** treat Notion, roadmap narrative, *Proposed* ADRs, §6b disposition labels, or `.cursor/plans/*` as approval.
3. **Do not** create `docs/ops/HEDGR_SEQUENCER.md` or new doctrine.
4. Cap **four** distinct candidate tickets (or fewer if fewer are plausible); if the repo gives no grounded candidates, state that in sections 4–5 and still complete all nine output sections.
5. Prefer **narrow, reversible** shapes aligned with Sprint 2 read-only / informational engine posture unless §7 explicitly authorizes otherwise.

## Required output (use these headings and order — exactly nine sections)

### 1. Current repo truth

Bullet summary grounded in `HEDGR_STATUS.md`: approved next (§7), §7a status, last completed ticket if stated, and where merged work is recorded (e.g. §6). If anything is ambiguous across files, add a short **Uncertainties** sub-bullet here (does not replace §7 authority).

### 2. What is allowed now

What **may** proceed **only if** §7 / §7a already say so—or what **governance-mode** doc/process work is allowed per protocol without implying a new implementation ticket.

### 3. What is blocked now

Explicit blockers: missing §7 name, empty §7a, ADR violations, execution/accounting semantics out of scope, anti-patterns from sprint protocol.

### 4. Candidate tickets (max 4)

For each: **Id**, **Objective** (one sentence), **Type**, **Boundary class** (§6b classification only if used), **Governing ADRs** (pointers). **Do not** exceed four candidates.

### 5. Why now / why not now (per candidate)

For **each** of the same candidates (same order, same max four): **Why now** (repo-grounded) and **Why not now** (gates, blockers, or protocol).

### 6. Recommended next ticket

Exactly **one** of: a single ticket id + one-sentence rationale, or the explicit phrase **`no ticket yet`** with reason.

### 7. Draft §7 text

Prose ready to paste into **`HEDGR_STATUS.md` §7** *if* governance accepts it—must reflect **at most one** approved next ticket (or explicit none). Label this block **Draft only — not in force**.

### 8. Draft §7a brief

Full brief pattern (objective, in scope, must not, surfaces, acceptance shape) **only if** section 6 names a ticket; if **`no ticket yet`**, draft §7a stub matching current repo pattern (“no active ticket”) or state “no §7a draft until §7 names a ticket.” Label **Draft only — not in force**.

### 9. Recommendation is not authorization

One short paragraph, mandatory wording in substance: this output is **not** authorization until governance updates **`docs/ops/HEDGR_STATUS.md`** §7 and §7a in the repo; ADRs constrain boundaries only; §6b does not authorize; Notion and plans are not authority.

---

**Do not** imply merge readiness or sprint commitment. **Do not** add a new canonical sequencing file. Keep output **structured and scannable** so a human can copy drafts into `HEDGR_STATUS.md` after governance approval.
