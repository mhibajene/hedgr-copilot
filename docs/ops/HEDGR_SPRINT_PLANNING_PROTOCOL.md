# Hedgr sprint planning protocol (repo-native)

**Status:** Operational procedure  
**Scope:** How governance prepares and closes tickets in this repository.  
**Not:** New doctrine, product philosophy, or a replacement for `docs/ops/HEDGR_STATUS.md`.

## Precedence (read first when in doubt)

Repo-governed authority for **planning and execution** reads as follows (procedural stack; not a new constitutional layer):

1. **`docs/doctrine/*`** and other **constitutional / charter surfaces** — invariants that bound product and implementation posture.  
2. **`docs/decisions/*`** and **`docs/decisions/SPRINT-2-ADR-INDEX.md`** — **ADR boundaries** (what implementations may not violate).  
3. **`docs/ops/HEDGR_STATUS.md`** — **merged truth**, current phase posture, and **current execution authority** for what may run in the repo now; **§7** / **§7a** are the sole sequencing and activation surfaces for implementation tickets.  
4. **`AGENTS.md`** — workflow, CI posture, and **read-order** guidance for implementers and agents.  
5. **This file** — **subordinate procedure** (planning modes and closeout order only).

**Rule of separation:** ADRs **constrain**; they **do not** sequence. “What starts next” and active scope are defined only in **`HEDGR_STATUS.md` §7** (approved next) and **§7a** (execution brief) (see `SPRINT-2-ADR-INDEX.md` interpretation and usage rules).

## Planning modes

### Governance mode

Use when choosing, refining, or deferring work **before** a ticket is executable.

- Maintain or refine **classification and scrutiny inputs** (e.g. `HEDGR_STATUS.md` **§6b**, transition readiness lens in **§9**) as **documentation and judgment support only**.  
- Maintain ADRs and `SPRINT-2-ADR-INDEX.md` when boundaries or traceability change.  
- Build or refresh a **candidate slate** (format below).  
- **Do not** treat roadmap narrative, Notion, Cursor plan files, or *Proposed* ADRs as approved work.  

**Stop condition:** Nothing in governance mode substitutes for **§7** naming the next ticket.

### Execution mode

Use only when **§7** names a single approved next ticket and **§7a** holds the active brief (scope, red lines, acceptance shape).

- Implementation and review follow `AGENTS.md`, relevant ADRs, and **§7a**.  
- Cursor / agents treat **`HEDGR_STATUS.md`** as the institutional execution brief; **§6b** is not sequencing authority.  

**Stop condition:** If **§7** says no successor or **§7a** is empty / “no active ticket,” default to governance mode or explicit human instruction—do not infer the next ticket.

### Closeout mode

Use after merge to `main` (or equivalent canonical branch) for a completed ticket.

- Restore **repo truth** first, then mirror **Notion**, then **ADR / index** follow-ups if the merge changed a boundary.  
- Order is strict (see below).  

## Single-ticket sequencing rule

At any time:

- **At most one** “approved next implementation ticket” may be named in **`HEDGR_STATUS.md` §7**.  
- **At most one** ticket may carry the **active execution brief** in **§7a**.  
- Work in progress must match the ticket named in **§7** and briefed in **§7a**.  

Do not parallelize multiple **§7-authorized** implementation tickets without updating **§7** / **§7a** to reflect that policy (this repo’s current discipline is one active execution ticket at a time).

## Candidate-ticket slate format

Use during **governance mode** to compare options **before** **§7** is updated.

For each candidate row, capture:

| Field | Content |
|--------|---------|
| **Ticket ID** | e.g. `MC-Sx-xxx` (stable label) |
| **Objective** | One sentence, outcome-oriented |
| **Type** | e.g. product / dev seam / docs-process / test-only |
| **Boundary class** | Per **§6b** taxonomy where applicable (classification **only**) |
| **Governing ADRs** | Pointers into `docs/decisions/` |
| **Dependencies / blockers** | Explicit |
| **Status** | **Candidate** — *not executable until §7 names it* |

**Anti-queue:** Slate row order does not imply priority, commitment, approval, or pending activation. Only an update to **`HEDGR_STATUS.md` §7** promotes a candidate into executable work.

The slate is **not** authority; it is input for human governance.

## Approval gate

### §7 — names the next ticket

- **Only** **`HEDGR_STATUS.md` §7** may state the **approved next** implementation ticket (or explicit “none”).  
- Backlog lists, **§6b** tables, ADR text, and roadmap sections **do not** authorize start of work.  

### §7a — activates execution scope

- **Only** **§7a** may hold the **full active brief** (objective, in scope, must not, surfaces, acceptance shape) for the ticket named in **§7**.  
- If there is **no** approved next ticket, **§7a** must reflect **no active ticket** (as today’s stub pattern).  
- Starting implementation without both **§7** naming the ticket and **§7a** defining scope is out of protocol.

## Post-merge closeout order

After the PR is merged:

1. **Repo truth** — Update `docs/ops/HEDGR_STATUS.md`: merged implementation bullets in **§6** if applicable; completed ticket record in the numbered history sections; **§7** updated to next approved ticket or “none”; **§7a** updated to new brief or archived/no-active pattern; **§30** / pointers consistent.  
2. **Notion** — Reconcile executive / decision surfaces **from the repo**, using [`NOTION_GOVERNANCE_STAGING.md`](NOTION_GOVERNANCE_STAGING.md) where applicable. Notion must not run ahead of repo wording.  
3. **ADR / governance follow-up** — If the change **materially** alters an architectural or trust boundary, add or update ADRs and `SPRINT-2-ADR-INDEX.md` in the same merge window when possible; otherwise file an explicit follow-up ticket for **§7**.

## Anti-patterns

| Anti-pattern | Why it fails | Corrective |
|--------------|--------------|------------|
| **Momentum sequencing** | “We finished X so Y is next” without **§7** | Update **§7** / **§7a** first, then implement |
| **ADR-as-backlog** | Treating ADR list or *Proposed* ADR as sequenced work | ADRs constrain; **§7** sequences |
| **Notion-as-authority** | Editing Notion first or copying forward unchecked | Repo first; Notion mirrors after merge |
| **Plan-file-as-authority** | Treating Cursor `.cursor/plans/*` (or generated plan UI) as scope approval | Plans are **working drafts**; must align with **§7a** |
| **Multi-ticket ambiguity** | Two “next” tickets or overlapping **§7a** briefs | Enforce single-ticket sequencing rule |

## Related files

- `docs/ops/HEDGR_STATUS.md` — canonical status and sequencing  
- `docs/decisions/SPRINT-2-ADR-INDEX.md` — Sprint 2 ADR map and usage rule  
- `docs/ops/NOTION_GOVERNANCE_STAGING.md` — Notion copy source  
- `AGENTS.md` — execution and engine-facing read order  
