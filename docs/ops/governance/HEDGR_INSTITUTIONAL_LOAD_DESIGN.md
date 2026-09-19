# Institutional Load Design

**Status:** Accepted design / operating changes not in force — `HEDGR_STATUS.md` §291

**Authority effect:** All three forks are adopted as design intent through `HEDGR_STATUS.md` §291. Adoption does not change operating behaviour or name, activate, amend or close a ticket. Current authority remains in `HEDGR_STATUS.md` §7 / §7a, `AGENTS.md`, accepted ADRs and active doctrine.

## 1. Purpose and boundaries

Reduce institutional repetition while preserving boundary integrity. Separate **authority change**, **delivery evidence** and **mechanical provenance change** so that each receives the treatment its consequence requires.

The three existing Path B dispositions remain the design basis:

| Fork | Proposed model | Institutional step reduced |
| --- | --- | --- |
| 1. Live authority | Separate present state from history | Reconstructing current authority from completed chronology |
| 2. RAP cadence | Separate material authority review from mechanical provenance binding | Repeated human governance routing for non-material source changes |
| 3. In-ticket work | Authorise a finite amendment envelope once; retain each Founder trigger as delivery evidence | Rewriting the same authority envelope for each in-scope refinement |

The design preserves Founder control over material forks and ticket naming; deny-by-default execution; Class A / B / C containment; Green retirement; evidence ≠ acceptance; financial, liquidity, trust, legal, security and sensitive-data protections; exact exclusions and stop conditions; rollback and material decision traceability; and independent verification for trust- and money-relevant behaviour. Existing participant publication/distribution and release controls remain binding.

RAP remains read-only, source-bound and non-authoritative under ADR 0026. Missing, stale, structurally invalid, revision-inconsistent or conflicting mandatory authority context fails closed. Neither RAP freshness nor review evidence activates work.

## 2. Fork 1 — Present state and history

The live §7 block supplies current named parent/nested occupancy, authority and execution classes, parallelism, operative flags, and pointers to the active §7a brief. That brief holds the authorised outcome, file/surface boundary, exclusions, stop conditions, verification and rollback obligations. `AGENTS.md` points to this present state instead of duplicating its chronology.

**Where the live §7/§7a present-state block and historical material differ, only the live present-state block may supply current sequencing or occupancy. Historical records preserve institutional truth but supply no current execution authority unless explicitly reactivated through current repo governance.**

This rule applies to explicitly historical material; it does not resolve disagreement between current authority sources or override accepted ADRs and doctrine. Genuine current-authority conflict still stops the affected work for resolution.

Completed numbered records, accepted ADRs, completed briefs and git retain history, with historical briefs clearly labelled and linked from present state where useful. Authority-shaped lag remains visible rather than being silently repaired. RAP `CURRENT` and `conflicts: []` are not universal narrative-consistency claims.

Adoption must preserve source locators used by existing RAP tooling or separately reconcile that tooling before the new layout enters operation. No schema expansion or new authority surface is implied.

## 3. Fork 2 — Authority review and provenance

Classify the change by what changed, not by ticket size or whether a parent ticket retains its name:

| Change | Required treatment in the proposed model |
| --- | --- |
| Material authority changes | Explicit Founder/repo authority review and recording, followed by verified RAP regeneration/binding for changed mandatory sources |
| Mandatory-source content changes, authority unchanged | Mechanical regeneration/binding through an approved process; no separate human authority decision or routine governance handoff |
| Neither authority nor mandatory-source content changes | No RAP event caused by this change; ordinary delivery verification and existing freshness/conflict controls still apply |

**Material authority changes** include changes to named parent/nested occupancy; authorised outcomes; allowed files/surfaces or amendment envelopes; execution class or Class A–C containment; parallelism; financial/live-rail/custody/customer-money capability; participant publication/distribution or Green status; trust, data/security, architecture or material product-narrative boundaries; exclusions or stop/rollback conditions; material acceptance criteria or changes that weaken, remove, broaden or materially alter required verification obligations; and doctrine or accepted-ADR membership or operative requirements. Current-authority conflict requires resolution, not a mechanical SHA update. Supplementary evidence, such as an additional regression assertion that leaves governed requirements unchanged, does not automatically constitute material authority change. Uncertainty about materiality returns the affected change to authority review.

**Mechanical binding** must retain a common immutable source revision for all four mandatory sources: `HEDGR_STATUS.md`, `AGENTS.md`, the accepted ADR index and `HEDGR_ACTIVE_DOCTRINE_INDEX.md`. Changed mandatory-source content still requires regeneration and verification even when authority is unchanged. A change outside those sources does not evade material authority review merely because RAP does not project it.

The target is to remove routine human initiation, routing and repeat authority approval from non-material binding. CI, automation or another separately approved mechanism may implement that target. Calling the same manually coordinated sibling PR “non-epoch” is not sufficient; any remaining mechanical PR must avoid recreating that human governance cycle while retaining required checks and an exception path for failures.

Binding must be verified against permanent-main history and matching mandatory-source content. A pre-merge SHA cannot be assumed to survive squash/rebase merging, and an artifact cannot bind to the SHA of the commit containing itself. The later implementation must establish post-merge provenance or verify a preserved source commit; draft branches cannot stand in for permanent-main authority. Failed verification prevents reliance on the new binding and is never repaired by overriding freshness.

The exact merge, automation and delivery procedure belongs to the separately authorised implementation, not this enduring design. Until an adopted procedure is available and verified, current binding requirements continue.

## 4. Fork 3 — Finite amendment authority and delivery evidence

An occupying §7a brief may explicitly authorise a **finite reversible amendment envelope** once, within its already named outcome. It must define eligible files/surfaces, permitted changes, a finite limit or completion/expiry condition, exclusions, verification, rollback and the delivery record used for individual triggers. Mere ticket occupancy or a file allow-list does not create such an envelope.

Each amendment still requires a specific Founder trigger. Agents, Product Assurance and RAP cannot initiate work, select additional refinements or infer standing Green delegation. All nine conditions must remain unchanged:

1. Authorised outcome.
2. Execution class.
3. File/surface boundary or explicitly permitted amendment envelope.
4. Trust posture.
5. Data/security posture.
6. Architecture.
7. Material product narrative.
8. Financial capability.
9. Exclusions and stop conditions.

The materiality rules in §3 also apply, including material acceptance criteria, material changes to required verification, and rollback obligations. Shared default/synthetic presentation semantics are not automatically decorative work. A boundary change, exhausted envelope or missing Founder trigger prevents use of this path.

For an eligible amendment, retain the attributable Founder instruction, date, envelope reference and bounded change in the existing delivery record before execution; then retain the reviewed change, verification and consumption of the finite allowance there. Trigger evidence must be durable and reviewable in the normal PR/delivery evidence trail, not dependent solely on transient chat history; it need not become another mandatory authority source. This record evidences use of existing authority. It cannot create, widen, renew or replace that authority.

**An individual trigger inside the authorised envelope does not itself require rewriting §7a.** If authority and mandatory-source content remain unchanged, it causes no RAP event. If mandatory-source content changes, Fork 2's binding rule applies. Any material boundary change returns to normal Founder/repo authorisation before delivery; an amendment cannot approve its own expansion.

Deliver sequentially within the envelope. Trust/money behaviour retains distinct QA, hermetic tests, required hosted checks and relevant shipped inspection. Decorative changes retain the authorised visual/regression checks; this model does not waive existing CI. Rollback remains a scoped revert with no state migration. Consuming one amendment neither closes the occupying ticket nor creates further refinement authority.

## 5. Transition and acceptance test

**Acceptance of the design does not itself activate changed operating behaviour. Each fork enters force only when its controlling repo-native authority and any required tooling are reconciled.**

Keep four states distinct: design accepted; controlling governance text reconciled; any required tooling implementation separately authorised and verified; changed operating behaviour explicitly in force. The acceptance change must identify the adopted subset, its dependencies and its effective conditions. These are not four newly required PRs or ceremonies.

The adopted implementation sequence and fork-specific effective conditions are controlled by `HEDGR_STATUS.md` §291. Fork 3's evidence-only trigger path requires a finite envelope and recording mechanism already made operative in §7a, with bounded pilot authority distinguished from general activation. Until the applicable conditions are met, current amendment procedures continue. Any mandatory-source changes follow the binding procedure then in force. Reconcile ADR 0026 operational guidance where necessary; any change to its accepted principles follows its superseding-ADR rule.

Before declaring a fork operational, show that it removes its named institutional step while preserving the relevant controls: current authority is readable without reconstructing history; non-material binding no longer needs routine human governance routing; and an eligible Founder trigger no longer requires rewriting an unchanged envelope. Check that a material boundary breach still takes the normal authority path. Renaming an unchanged process is not success. Use the existing acceptance/delivery evidence rather than creating a standing review programme.

This document authorises no migration, live-source thinning, tooling/CI/schema edit, ticket or lane transition, release, financial capability or new D-number. The exact migration scope and delivery procedure belong to later governed changes. This file remains a design reference, not a parallel live operating surface.

## Design provenance — historical only

Basis: *Institutional Load Recon* and *Founder Return Brief — Institutional Load* (2026-09-19), the recorded three Path B dispositions, and *HedgrOps Governance Custodian Review — 2026-09-19*. The review is advisory evidence; the subsequent Founder instruction authorises the three drafting amendments and repo-native design adoption recorded in `HEDGR_STATUS.md` §291.

Original parking rationale and design-time occupancy/commit examples remain in [PR #585](https://github.com/mhibajene/hedgr-copilot/pull/585) and git history. They are not maintained here as current state. Read live §7 / §7a for current authority.
