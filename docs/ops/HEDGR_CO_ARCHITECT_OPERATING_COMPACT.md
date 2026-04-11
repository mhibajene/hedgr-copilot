# Hedgr Co-Architect Operating Compact

Status: Draft  
Owner: Founder + HedgrOps  
Scope: Repo governance, sequencing, execution posture, and collaboration cadence

---

## 1. Purpose

This compact defines the working relationship between:

- **Founder**
- **HedgrOps**
- **Repository as Institutional OS**
- **Cursor as Execution Engine**

Its purpose is to preserve:

- execution clarity
- governance integrity
- sequencing discipline
- long-term architectural coherence

This compact exists to reinforce **high-quality decisions**, not procedural ritual.

---

## 2. Core Operating Principle

Hedgr is governed through a repo-native operating system.

The repository is not a passive storage layer.

It is the institutional operating system for:

- doctrine
- decision boundaries
- sprint state
- execution authority
- closeout truth

All collaboration must strengthen this model, not bypass it.

---

## 3. Authority Model

### 3.1 Repository

The repo is the institutional source of truth.

Canonical authority lives in:

- `docs/ops/HEDGR_STATUS.md`
- `docs/decisions/*`
- `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`
- `docs/ops/HEDGR_EXECUTION_SYSTEM.md`

### 3.2 `HEDGR_STATUS.md`

`HEDGR_STATUS.md` is the active execution authority.

It defines:

- current posture
- current release / track
- approved next ticket
- active execution brief
- completed-ticket record

### 3.3 ADRs

ADRs define:

- architectural constraints
- doctrine boundaries
- accepted decision logic

ADRs constrain what is allowed.  
They do **not** sequence work.

### 3.4 Notion

Notion is a mirror of repo truth.

It must not:

- authorize work
- define sequence
- override repo state
- imply queue authority absent from `HEDGR_STATUS.md`

### 3.5 `.cursor/plans`

`.cursor/plans` are working execution artifacts.

They support planning and implementation.  
They are not canonical authority.

### 3.6 Product concept notes (exploration)

Repo-native product concept notes (e.g. [`HEDGR_ATLAS_PRODUCT_CONCEPT_NOTE.md`](HEDGR_ATLAS_PRODUCT_CONCEPT_NOTE.md)) are exploration and framing artifacts only. They do not authorize implementation, sequence work, or substitute for `HEDGR_STATUS.md`.

---

## 4. Division of Labor

### 4.1 Founder

The Founder is responsible for:

- choosing the next strategic bet
- resolving priority when multiple valid paths exist
- approving what is named in `§7`
- deciding when ambiguity is acceptable versus when governance must tighten first

The Founder does **not** need to carry institutional memory manually once it is encoded in repo truth.

### 4.2 HedgrOps

HedgrOps is responsible for:

- shaping candidate options
- pressure-testing proposals against repo truth and doctrine
- identifying what is allowed, blocked, or premature
- recommending the smallest valid next move
- drafting `§7` and `§7a` candidate language
- protecting scope boundaries during execution
- verifying closeout and reconciliation after merge

HedgrOps must optimize for:
- decision quality
- system integrity
- anti-drift discipline

HedgrOps must not degrade into ritual generation or governance theater.

### 4.3 Cursor

Cursor is responsible for:

- reading repo truth
- executing against the active brief
- surfacing conflicts and ambiguity
- producing deterministic, reviewable outputs

Cursor must not:

- define sequence
- widen scope
- infer approval
- continue work by momentum

### 4.4 Repository

The repository is responsible for:

- retaining institutional memory
- preserving execution truth
- making authority legible
- preventing drift between intent, implementation, and reconciliation

---

## 5. Sequencing Rules

### 5.1 `§7` is sacred

Only `docs/ops/HEDGR_STATUS.md` `§7` may name the approved next ticket.

No other surface may substitute for this.

### 5.2 `§7a` activates execution

No implementation ticket is live unless:

- `§7` names it
- `§7a` contains the active brief

### 5.3 One active ticket at a time

Hedgr defaults to a single-ticket execution model.

Parallel implementation requires explicit governance change.

### 5.4 Candidate slates are not authority

Recommendation packages, candidate slates, Notion entries, and plan files are comparative planning inputs only.

They do not imply:
- approval
- commitment
- pending activation
- queue order

### 5.5 “No ticket yet” is valid

If the next move cannot be briefed tightly, governance mode continues.

The system must be allowed to conclude:
- **no ticket yet**

---

## 6. Collaboration Cadence

The default operating cadence is:

1. repo truth read
2. candidate shaping
3. one recommended next ticket or explicit `no ticket yet`
4. founder decision
5. `§7` / `§7a` update
6. execution
7. merge
8. repo closeout
9. Notion reconciliation

This cadence exists to reduce ambiguity before execution.

It must not be expanded into ceremony for its own sake.

---

## 7. Command Use

### `/governance`
Use for:
- open-ended governance analysis
- doctrine checks
- candidate shaping
- recommendation discussion

### `/propose-next-ticket`
Use for:
- a structured pre-`§7` recommendation package
- candidate comparison
- one recommendation or `no ticket yet`
- mandatory draft `§7`
- mandatory draft `§7a`

### `/execution`
Use only when:
- `§7` names the active ticket
- `§7a` contains the active brief

### `/closeout`
Use after merge for:
- repo truth reconciliation
- Notion reconciliation
- governance follow-up only if required

---

## 8. Quality Standard

The goal of this system is **high-quality decisions**, not ritualized process.

Warning signs of drift include:

- generating governance outputs without reducing ambiguity
- sequencing by inertia
- treating adjacent work as obvious continuation
- adding process layers that compete with repo authority
- hardening for the sake of hardening

If a process step does not improve:
- clarity
- safety
- reversibility
- sequencing quality

then it should be questioned.

---

## 9. Operating Biases

The co-architect posture should default to:

- repo-first
- smallest valid ticket
- explicit sequencing
- reversible diffs
- closeout before continuation
- recommendation without stealth authorization
- system integrity over activity volume

---

## 10. Compact Standard

This compact is successful if:

- Founder judgment becomes easier, not heavier
- HedgrOps strengthens decision quality without becoming ceremonial
- Cursor remains deterministic and bounded
- the repo remains the institutional OS
- sequence remains explicit
- momentum never outruns governance

---

## Closing Principle

Hedgr is not being built through enthusiasm alone.

It is being built through a governed collaboration between:
- Founder judgment
- HedgrOps discipline
- repo authority
- deterministic execution

The objective is not process maturity for its own sake.

The objective is a system that produces better decisions, tighter sequencing, safer implementation, and durable institutional memory.