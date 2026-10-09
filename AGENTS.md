# AGENTS.md — Hedgr Repo Execution Standard

Status: Binding (repo workflow, engineering conventions, CI posture, agent operating rules)
Scope: apps/, packages/, scripts/, .github/, docs/
Last updated: 2026-10-08

**Start with live authority:** [HEDGR_STATUS.md §7 / §7a](docs/ops/HEDGR_STATUS.md#7-current-sequence-and-active-status) is the canonical present-state surface for occupancy, permissions, exclusions, operative controls and stop conditions. Read the named live brief before acting. Historical closeouts cannot supply current sequencing or occupancy. Accepted ADRs, active doctrine, this execution contract and other current higher-precedence sources remain controlling under repo precedence; genuine current-source disagreement requires stop/escalation, not synthesis.

**Standing PR invariant (binding; 2026-09-28):** Required reading for any agent that opens a PR, updates a PR, marks a PR ready for review, verifies a PR, enables auto-merge, merges, or otherwise causes merge completion. Operating procedure: [docs/ops/runbook.md](docs/ops/runbook.md) → **PR Posture**. The richer execution procedure is the external Codex operator skill `hedgr-pr-posture` (out of this repository; operator convenience only). Do not treat that skill as repo authority and do not duplicate it here. Historical #680 / #685 / #721 / #722 notes remain evidence of merge-before-verifier deviations; this standing rule supersedes reliance on those examples.

1. No implementation PR may merge to `main` until an independent verifier, distinct from the authoring/implementing role, has reported PASS against the current PR head SHA.
2. Verification applies only to the SHA reviewed.
3. Any subsequent commit invalidates the previous verifier PASS and returns the PR to verification-required state.
4. Ticket-specific gate sections may impose stricter requirements but may never weaken this repo-wide invariant.
5. Satisfying merge gates authorises repository merge only. It does not widen the originating ticket authority or imply launch/release approval.
6. Once all required gates are satisfied, automated merge is permitted and preferred where supported.

<!-- BEGIN OPERATING CARD -->
## Operating card (non-authoritative index)

This card is a non-authoritative index for tools that load only the start of this file. Each bullet is quoted verbatim from the AGENTS.md section named in the bold line above it. The card adds and changes no rule: the rest of this file, including the Standing PR invariant above and the numbered sections below, remains the binding text, and if a quoted line ever differs from its source, the source controls.

**2) Authority model**
- Founder — direction, prioritization, approval
- Repo authority — `docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, repo-native doctrine, governance standards.
- Project Ops / `docs/ops` — governance framing, review traceability, bounded critique and refinement artifacts
- Cursor — primary repo execution surface
- Codex — bounded secondary operator for exploration, reconstruction, verification, testing, and explicitly approved implementation support only
- Agents must not override higher authority for convenience.
- Draft branches, unmerged PRs, review evidence, RAP projections and Bridge responses cannot independently activate work or establish accepted decision history.

**1) Purpose**
- For doctrine, architecture, product/system invariants, and anti-drift rules, `.cursorrules` remains governing authority.

**12) Context provenance rule**
- If memory conflicts with repo authority or current artifacts, memory loses automatically.

**10) Execution modes and action controls**
- Default: `READ_ONLY`
- No side-effecting or persistent action should occur without explicit declaration and approval.

**Ticket sequencing / governed parallelism (deny-by-default)**
- The default posture is one active implementation ticket.

**8) Execution Rules**
- Do not widen scope beyond the stated task.
- Do not silently modify unrelated files.

**4) Non-Negotiables**
- CI/E2E must remain hermetic: no live external calls.
- Rollback must be possible via flag or single revert.
- Do not treat memory, inferred continuity, or connected tools as approval authority.

**Green Lane operator rules (ADR 0025 / §6g)**
- **Binding:** Green Lane classification does not activate work and does not override `HEDGR_STATUS.md` `§7` / `§7a`. HedgrOps briefs are not executable tickets. Class A is not automatically Green.

**7) Testing Standards**
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).
- every future Engine and Home runtime brief must name at least one test that fails before the change and passes after it.

**Validation commands**
- `pnpm run validate` — all of the above plus trust checks

**9) Registered agent roles**
- Agents must declare the role they are operating under for meaningful tasks.
- Registration establishes role identity and boundaries only. It does not activate work, select tickets, widen execution authority, create Green delegation, or override `HEDGR_STATUS.md §7 / §7a`, ADRs, doctrine or Founder authority.

**9.1 Implementer**
- Execution mode: `PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised.
- Must not:
  - infer approval from memory or prior conversations

**9.2 Verifier**
- Execution mode: `READ_ONLY`.
- Must not:
  - present critique as approval

**9.3 Repo Steward**
- Execution mode: `PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised.
- Must not:
  - create new policy by summary

**9.11 Engineering Operator**
- Execution mode: `READ_ONLY` by default; `ACT_WITH_CONFIRMATION` only for bounded engineering operations within an explicitly authorised scope.
- Must not:
  - activate, select or prioritise tickets; expand the authorised objective; modify product strategy, doctrine or governance
  - post `Hedgr-Verifier:` attestations or present coordination as verification

**13) Conflict handling rule**
- Agents must not reconcile conflicting sources by inference.

**15) Escalation rules**
- Agents must stop and escalate if:
  - ADR conflict is detected
  - required context is missing
  - multiple valid implementation paths materially differ
  - the requested change impacts system architecture, trust posture, or governance posture
  - the task would create a new authority surface
  - the task would require persistent or external action without declared approval

**14) Required output contract**
- All agent outputs are non-authoritative by default unless and until absorbed into the governed repo chain under the applicable authority.
<!-- END OPERATING CARD -->

**Founder disposition — PR Posture execution refinement (2026-09-29; §331):** The Founder approved ready-stage auto-merge arming, owner-account branch updates followed by fresh independent verification whenever the head changes, and one bounded exception to the §9.2 Verifier `READ_ONLY` mode: the independent Verifier may post exactly one `Hedgr-Verifier:` attestation comment, in the exact runbook format, on the PR under review for the head SHA it reviewed, only when its brief expressly permits it and only after re-reading the current head immediately before posting; it may not push, commit, label, mark ready, arm auto-merge, merge or post any other comment. Implementing and coordinating agents never post attestations. The Founder added `validate` to main's required checks on 2026-09-29, so `main` now requires `validate`, `E2E smoke (@hedgr/frontend)` and `hedgr/verifier` on an up-to-date head with admin enforcement. Operating procedure: [docs/ops/runbook.md](docs/ops/runbook.md) → **PR Posture**; record: `HEDGR_STATUS.md` §331. This refines the procedure without weakening the standing invariant. Any harness permission rule remains a Founder-owned action. **NO CROSS-LANE IMPACT.**

**Founder activation — Daniel on Home (2026-10-09; §359):** Sole nested Lane V `CLASS-A-VAL-002-STABILITY-DANIEL-HOME-001`: present computed `daniel-read-v2` on all simulated Home routes; ZMW display/synthetic normalization derives from Engine fixture 27, including A1's all-currency new-row coupling. Existing rows, live/backend FX 20 and research stimuli stay unchanged. D1–D5, A/A1, exact allowlist, named red→green tests and gates are in live `HEDGR_STATUS.md` §7 / §7a / §359. Source merge and separate verified permanent-main RAP rebind precede runtime. §360 adds only four rate-dependent test paths (16 tests plus the same 4 runtime paths); synthetic Deposit keeps its default 100 ZMW ($3.70 at 27). Amendment source merge and its separate verified permanent-main RAP rebind precede runtime continuation. No standing delegation or research release. **NO CROSS-LANE IMPACT.**

**Daniel canonical local amount technical closeout (2026-10-09; §358):** Runtime #814 (`03d8810`, verified head `f8fc606`) delivered D1–D3. Close only this nested ticket after source closeout merge and final separate verified RAP rebind; both parents stay open, no successor or new activation. Focus stays on Stability Engine work; next objective remains Founder-owned. Live `HEDGR_STATUS.md` §7 / §7a / §358 control. **NO CROSS-LANE IMPACT.**

**Founder activation — Daniel canonical local amount (2026-10-09; §357):** [Closed §358 after source merge and final rebind] Sole nested Lane V `CLASS-A-VAL-002-STABILITY-DANIEL-AMOUNT-001`; controlling D1–D3, exact allowlist, named tests and source-first gates are in `HEDGR_STATUS.md` §7 / §7a / §357. Source merge and separate verified permanent-main RAP rebind precede runtime. **NO CROSS-LANE IMPACT.**

**Home small fixes technical closeout (2026-10-09; §356):** `CLASS-A-VAL-002-HOME-SMALL-FIXES-001` delivered the six Home fixes as one Home experience (§327) in #809 (`6f983e0` from exact verified head `bf295c1`), after source #807 (`908cd9e`) and separate pre-runtime RAP #808 (`ce857ab`). Test-only red commit `21c31cb` preceded runtime. Independent Verifier PASS on that exact head. No post-runtime RAP rebind was required (`bridge:rap:check` passed unchanged on `6f983e0`). Production deployment `6955155416` of `6f983e0` is READY. Close only this nested ticket after this source closeout merges and its separate verified permanent-main RAP rebind completes. Focus returns to Stability Engine work per §355; no new ticket is activated. Parents `CLASS-A-VAL-002` and `SE-REASON-001` stay open with no active nested successor; research remains unreleased. **NO CROSS-LANE IMPACT.**
**Founder activation — Home small fixes (2026-10-09; §355):** [Closed §356 after source merge and final rebind] Founder Musalwa Hibajene (repo owner `mhibajene`) approved activation of the Home small-fixes slice on 9 Oct 2026 at 13:42 AWST and, at 13:50 AWST, directed that it follow the one Home experience as fixes and approved proceeding. Activate only `CLASS-A-VAL-002-HOME-SMALL-FIXES-001` as the sole nested Lane V ticket under open parent `CLASS-A-VAL-002` (Home layer, Class A informational/synthetic, Green classification only; no standing delegation). Six bounded Home fixes, applied as one Home experience (§327) on default `/dashboard` and the synthetic journey (`/dashboard?journey=class-a-val-002`, `/dashboard-synthetic-journey`):
1. remove the position line's dashed max guide and max label;
2. neutral ink for change amounts;
3. no change chip while the Since or What changed card shows, which on both routes retires the chip;
4. at Start-here step 3 Home offers "Simulate a withdrawal" (on the journey the second utility becomes the one contextual next action; default Home already offers it), with no ticks, counts or progress;
5. where the hero shows a local display estimate, the figure sits on its own line with "display estimate" as a small caption under it;
6. no date and no "Today" on the position-line axis, with event spacing unchanged.

Source: `KIP-ACTIVITY-VISUALISER-EXPLORATION-001` (advisory evidence, not authority). These are fixes within the one Home experience, not a route divergence; no journey-only gate is added, and the HOME-EXPERIENCE T3 change chip and T5 chip fade are superseded on both routes. Live-mode Home is unchanged. The Founder approved this Home work as fixes ahead of the Phase-Sequencing order; on this ticket's closeout, focus returns to Stability Engine work. No visualiser prototype, Planning-targets wording, display-rate or local-figure change, research release, Lane E/G or financial capability follows. Source merge and a separate independently verified permanent-main RAP rebind precede test-only red-first runtime under §346. **NO CROSS-LANE IMPACT.**
**Founder disposition — Engineering Operator registration (2026-10-08; §352):** Founder Musalwa Hibajene (repo owner `mhibajene`) decided on 8 Oct 2026 at 19:45 AWST to register the Engineering Operator role and approved the bounded registration at 19:56 AWST. Finite docs-only record `OPS-ENGINEERING-OPERATOR-001` / §352 adds §9.11 Engineering Operator (`READ_ONLY` by default; `ACT_WITH_CONFIRMATION` only for bounded engineering operations within an explicitly authorised scope) and names Dex, a persistent agent in the MonoCode environment, as its operating instance. The initial authorisation of any objective remains Founder-only and repo-natively recorded; routine coordination inside that scope needs no further per-delegation approval unless the active brief sets a stricter gate. Dex cannot activate tickets, expand scope, modify governance, bypass gates, merge PRs, alter protections or post attestations. Activates no ticket or development work; occupancy unchanged; no D-number, Green delegation envelope, doctrine/ADR, required-check or protection change. Effective after the separate verified permanent-main RAP rebind. **NO CROSS-LANE IMPACT.**
**Daniel thin vertical slice technical closeout (2026-10-07; §351):** `CLASS-A-VAL-002-STABILITY-DANIEL-SLICE-001` delivered the one pure deterministic `computeDanielRead` and separate `DanielRead` in #794 (`fa69b8a` from exact verified head `bf9904d`), after source #792 and separate pre-runtime RAP #793. USD 800 at the disclosed ZMW 27 fixture reads K21,600; 29.5/24.5 read K23,600/K19,600. Test-only red commits preceded each runtime change. A HedgrOps-requested numeric `localAmountZmw` revision drew an independent Verifier FAIL (§7a AC2 scope, cent precision, non-string `asOf`); the Founder chose to drop it (first item for the next slice) and fix `asOf` test-first; a distinct Verifier then PASSed the exact head. No post-runtime RAP rebind was required (`bridge:rap:check` passed unchanged on `fa69b8a`). Production deployment `6898015615` of `fa69b8a` is READY; no Production probe (no user-visible surface). Close only this nested ticket after this source closeout merges and its separate verified permanent-main RAP rebind completes. Parents `CLASS-A-VAL-002` and `SE-REASON-001` stay open with no active nested successor; research remains unreleased. **NO CROSS-LANE IMPACT.**
**Founder activation — Daniel thin vertical slice (2026-10-06; §350):** [Closed §351 after source merge and final rebind] Founder Musalwa Hibajene (repo owner `mhibajene`) directly approved activation and implementation on 6 Oct 2026 (AWST). Activate only `CLASS-A-VAL-002-STABILITY-DANIEL-SLICE-001` as the sole nested Lane V ticket under open parent `CLASS-A-VAL-002` (Stability layer, Class A informational/synthetic, Green classification only; no standing delegation). One pure deterministic Engine function computes a separate `DanielRead` from one user-declared USD holding, disclosed fixture ZMW/USD rate, explicit `asOf` and Engine version. RETAIN ZMW 27/USD; reuse BigInt cents and the non-negative half-cent-up rule with fixed `en-US`. Daniel's K17,500 local portion is out. The engine owns the golden fixture. §350 records three explicit additions to §347; the locked pack remains untouched. Source merge and a separate independently verified permanent-main RAP rebind precede test-only red-first runtime under §346. No Home/route surface, EngineState/posture/notices change, live FX, Sarah/SME, other drift, Lane E/G or research release follows. **NO CROSS-LANE IMPACT.**

**Home review-memory crash fix technical closeout (2026-10-06; §349):** `CLASS-A-VAL-002-STABILITY-REVIEW-MEMORY-001` delivered the one-line read-boundary date validation in #788 (`aab2cfd` from exact verified head `173ef6b`), after source #786 and separate pre-runtime RAP #787. The separately verified post-runtime RAP #789 is merged. Production deployment `6882739747` of exact `0c28bae` is READY; the isolated public-alias probe passed 12/12 at 390 and 1440 px. Invalid, missing and corrupt memory renders no rejected history/change signals; a valid control and existing prior-fingerprint visit append pass. First runtime commit was test-only red; later fix made it green. Close only this nested ticket after this source closeout merges and its separate verified permanent-main RAP rebind completes. Parents `CLASS-A-VAL-002` and `SE-REASON-001` stay open with no active nested successor; research remains unreleased. No Daniel or other drift work follows. **NO CROSS-LANE IMPACT.**
**Founder activation — Home review-memory crash fix (2026-10-06; §348):** [Closed §349 after source merge and final rebind] Founder Musalwa Hibajene accepted the corrected inventory as evidence and approved crash fix first, then the later Daniel slice brief. Activate only `CLASS-A-VAL-002-STABILITY-REVIEW-MEMORY-001` as the sole nested Lane V ticket under open parent `CLASS-A-VAL-002` (Stability, Class A informational/synthetic, Green classification only; no standing delegation). Invalid, missing or corrupt saved review-memory entries are ignored at the read boundary, never rendered as prior changed/unchanged memory. Source merge and a separate verified permanent-main RAP rebind precede runtime. The first runtime commit contains only failing reproducing tests under §346; a later commit supplies the smallest fix. Runtime exact-head verification, post-runtime RAP rebind, exact-revision READY Production probe, source-first closeout and final separate verified RAP rebind are required. No Daniel activation/build, Engine logic, posture/notices, copy/routes, other drift items, Lane E/G or research release follows. **NO CROSS-LANE IMPACT.**
**Founder decision — Stability Engine spec lock (2026-10-06; §347):** The Founder (Musalwa Hibajene, repo owner `mhibajene`) approved locking the spec already written in `docs/strategy/stability-engine-pack.md` (Founder-reviewed refresh `9068f0f`). Finite docs-only record `OPS-SE-SPEC-LOCK-001` / §347 serves the Stability layer: the existing definition of stable, two-meanings separation, Daniel → Sarah → SME-held order, fixture-only read-only Daniel slice and language guard are locked. The three testable properties remain the §346 test contract. The two ledger-only residuals named in §345 are tidied. Activates no ticket, including the Daniel slice; parents `CLASS-A-VAL-002` and `SE-REASON-001` remain open with no nested ticket. Daniel still needs its own Founder activation and source-first §7/§7a brief. No runtime, doctrine/ADR change, Lane E/G occupancy or research release follows. Permanent-main RAP rebind follows separately. **NO CROSS-LANE IMPACT.**
**Founder disposition — TDD standing build posture (2026-10-06; §346):** On 6 Oct 2026 at ~06:34 AWST the Founder (Musalwa Hibajene, repo owner `mhibajene`) RETAINed TDD (red → green → refactor) as the standing build posture for every future Engine and Home runtime §7a brief. Same-day amendment ~06:41 AWST adds the smallest-durable-change-then-prove-the-real-result principle to AGENTS §4 and `.cursor/rules.md`. Finite docs-only record `OPS-TDD-POSTURE-001` / §346. Named failing-then-passing tests are Acceptance Criteria; the first runtime commit is the failing test unless waived. Docs/authority PRs stay docs-first. Dynamic Stability Testing and Lane E IT-* suites stay research-only. Activates no ticket; occupancy unchanged. Required checks and branch protection unchanged. Permanent-main RAP rebind follows separately. **NO CROSS-LANE IMPACT.**
**Wallet balance mode retirement technical closeout (2026-10-05; §345):** `CLASS-A-VAL-002-STABILITY-LEDGER-ONLY-001` delivered ledger-only balance in #779 (`6b848e4` from verified head `6adc1b6`), after source #777 (`0bba3d4`) and RAP rebind #778 (`1373e50`). Every PR merged after an exact-head Verifier PASS; no merge-before-verifier deviation. Production deployment of `6b848e4` is READY; the §327 probe passed 82/82 ($5.00 with a stale wallet $7). Close only this nested ticket after this source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` stays open without an active nested successor. The research route stays unreleased. **NO CROSS-LANE IMPACT.**
**Founder activation — wallet balance mode retirement (2026-10-05; §344):** [Closed §345, 5 Oct 2026] Sole active nested Lane V ticket `CLASS-A-VAL-002-STABILITY-LEDGER-ONLY-001` under open parent `CLASS-A-VAL-002` (Stability layer). Ledger becomes the only balance source: the `NEXT_PUBLIC_BALANCE_FROM_LEDGER` flag, wallet branch and wallet store writes are retired; ledger maths, routes, copy and Engine are unchanged. Supersedes §328 on two points: rollback is a single revert of the runtime PR, and the #732 wallet-mode unit tests are removed. Source merge and a separate verified RAP rebind precede runtime. The research route stays unreleased. **NO CROSS-LANE IMPACT.**
**Founder decision — D2 obligation-anchored progress as hypothesis only (2026-10-05; §343):** On 5 Oct 2026 at 21:00 AWST the Founder disposed D2 as option B (hypothesis only). Recording approval: 5 Oct 2026 at 21:01 AWST (“you can record the D2 disposition”). Finite docs-only record `OPS-D2-DISPOSITION-001` / §343 records that “obligation-anchored progress” is a research hypothesis only, not product direction. No copy, no build, no canonical-story revision, no D-number, no ticket activation, no Lane E work. The no-claim fence stays: no “anchored to the obligation” or paraphrase on participant-facing surfaces. Dynamic Stability Testing remains the natural later evidence path and must keep that fence; this record does not open it. Occupancy unchanged: parents `CLASS-A-VAL-002` and `SE-REASON-001` open with no nested tickets. Research route remains unreleased. **NO CROSS-LANE IMPACT.**
**Daniel research-route fix technical closeout (2026-10-05; §342):** `CLASS-A-VAL-002-RESEARCH-DANIEL-FIX-001` delivered items (1)–(3) in #770 (`67cd46f` from verified head `6e8ae07`), after source #767 (`bed0c96`) and RAP rebind #768 (`78d2049`). Every PR merged after an exact-head Verifier PASS; no merge-before-verifier deviation. Production deployment of `67cd46f` is READY. Close only this nested ticket after this source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` stays open without an active nested successor. The research route stays unreleased. **NO CROSS-LANE IMPACT.**
**Founder activation — Daniel research-route fix (2026-10-05; §340):** [Closed §342, 5 Oct 2026] Sole active nested Lane V ticket `CLASS-A-VAL-002-RESEARCH-DANIEL-FIX-001` under open parent `CLASS-A-VAL-002`. Facts-only split (Watch moved, not rewritten); attribution + limits on the facts stage; After-heading token amended to `{localFullSingular}`. Source merge and a separate verified RAP rebind precede runtime. The research route stays unreleased. **NO CROSS-LANE IMPACT.**
**Daniel reserve + legibility pass technical closeout (2026-10-05; §335):** `CLASS-A-VAL-002-RESEARCH-RESERVE-001` delivered T1–T3 in #755 (`3c2efea` from verified head `5d7271c`), after source #753 (`d04ab0e`) and RAP rebind #754 (`75e7f25`). Every PR merged after an exact-head Verifier PASS; no merge-before-verifier deviation. Production deployment of `3c2efea` is READY. Nested ticket technically closed after source #756 (`fc3ff0b`) and separate RAP rebind #757 (`e6e07ad`). Parent `CLASS-A-VAL-002` stays open without an active nested successor. [Closed under §339:] those cold-reader items are closed (no separate internal cold read; participant exposure starts at release under a later release ticket). The research route stays unreleased. **NO CROSS-LANE IMPACT.**
**Founder activation — Daniel reserve + legibility pass (2026-10-02; §334):** [Closed §335, 5 Oct 2026] Sole active nested Lane V ticket `CLASS-A-VAL-002-RESEARCH-RESERVE-001` under open parent `CLASS-A-VAL-002`. Daniel’s reserve case sits after Sarah and before the existing bridge; five-currency authored figures with no rate shown; locked strings, tokens and figure table; Home copy-register amendment on simulated routes only; protocol doc deferred to a separate release ticket. Source merge and a separate verified RAP rebind precede T1–T3 runtime. The research route stays unreleased. [Closed under §339:] those cold-reader items are closed (no separate internal cold read; participant exposure starts at release under a later release ticket) and do not block this source record. **NO CROSS-LANE IMPACT.**
**Sarah research refresh technical closeout (2026-10-01; §333):** `CLASS-A-VAL-002-RESEARCH-REFRESH-001` delivered the clean-start bridge, Home-aligned bridge sentence and newer look in #750 (`1dad23e`), after source #748 and RAP rebind #749. Every PR merged after an exact-head Verifier PASS. Production inspection passed. [Closed 2026-10-01 via #751 `cca7514` and RAP rebind #752 `58de687`.] Close only this nested ticket after this source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` stays open without an active nested successor; the Mulenga/Kwesi reserve scenario was superseded by the Daniel reserve case (§334). **NO CROSS-LANE IMPACT.**
**Founder activation — Sarah research refresh (2026-09-29; §332):** [Closed §333, 1 Oct 2026] Sole active nested Lane V ticket `CLASS-A-VAL-002-RESEARCH-REFRESH-001`. The research bridge opens the simulation at a clean start (`?reset=1`), its one sentence aligns with the finished Home wording, and Sarah's research page and all of orientation move to the newer look through one shared research chrome component. Every other string and behaviour is unchanged, and the route stays unreleased. Source merge and a separate verified RAP rebind precede runtime. The Mulenga/Kwesi reserve scenario was superseded by the Daniel reserve case (§334). **NO CROSS-LANE IMPACT.**
**New Marker technical closeout (2026-09-29; §330):** `CLASS-A-VAL-002-RESEARCH-NEW-MARKER-001` was delivered in #710 at `fb25660f57b2c70d34d13acf6c3199a4c9f7d95d` after source #691 / rebind #693 and stacked-row amendment #707 / rebind #708. An earlier draft head had a distinct local Verifier PASS WITH NOTES; #710's final head merged without a fresh independent Verifier report. A later distinct Verifier returned PASS WITH NOTES on the exact merged commit. The retrospective result does not cure the final-head pre-merge deviation. [Closed 2026-09-29 via #744 `a5e035c` and RAP rebind #745 `afb3dc0`.] Close only this finite nested ticket after the §330 source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` remains open without an active nested successor; the research route remains unreleased. No further runtime work, participant release, financial capability or cross-lane authority follows. **NO CROSS-LANE IMPACT.**

**Research Compression technical closeout (2026-09-25):** §314 records bounded runtime and separate verification delivery in PR #685 at `774df4c861307e418248a6ebef52f34edcce94fa`, after activation #683, RAP rebind #684, distinct Implementer `7041b73` and verification `f571aa2` commits, hosted checks on head `f571aa2`, and independent S4 Verifier PASS WITH NOTES on both `f571aa2` and `774df4c` (whole-tree diff empty). Merge by the Founder at 16:31:46 AWST preceded the S4 report (16:50:15 AWST); auto-merge was not used; the verified tree is identical to main (process deviation, no substantive impact; second merge-before-verifier today after #680 / §312). Close only nested Lane V `CLASS-A-VAL-002-RESEARCH-COMPRESSION-001` after this source-first closeout merges and a final separate permanent-main RAP rebind is verified. Parent `CLASS-A-VAL-002` stays open without an active nested successor; weekend duties remain deferred and the research route remains unreleased. No participant release or retest, comprehension/demand finding, Forms/telemetry, Engine/Wallet/ledger, §302 doctrine reopen, Lane E/G, Deposit/Confirm lexical rewrite or financial capability follows. D1 stays held. D2 remains a separate, undecided Founder strategy question. [Superseded §343, 5 Oct 2026: decided option B — hypothesis only; not product direction.] **NO CROSS-LANE IMPACT.**
**Home deduplication technical closeout (2026-09-29; §329):** `CLASS-A-VAL-002-HOME-DEDUP-001` delivered the strip removal #738 (`cbfb05c`) and the Recent activity overlap #741 (`d51277c`), after source #735, amendment #739 and separate RAP rebinds #737 and #740. Every PR merged after an independent Verifier PASS on its exact head. Production inspection passed 32/32 checks. Production still runs wallet balance mode; the Founder-owned §328 ledger switch remains outstanding. [Resolved 5 Oct 2026 (§341): the Founder completed the §328 switch; Production now runs ledger mode, verified 82/82.] [Closed 2026-09-29 via #742 `35891e2` and RAP rebind #743 `1e5bf51`.] Close only this nested ticket after this source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` stays open without an active nested successor. [Historical: `CLASS-A-VAL-002-RESEARCH-NEW-MARKER-001` stays held — closed under §330 (source #744 `a5e035c`, RAP rebind #745 `afb3dc0`); `/research/stability-scenarios` review completed 2026-09-29 (§332); current occupancy is §335 / no nested Lane V.] **NO CROSS-LANE IMPACT.**
**Founder amendment — Home deduplication and Production balance mode (2026-09-28; §328):** Ledger is Production's intended balance mode. The Founder removes `NEXT_PUBLIC_BALANCE_FROM_LEDGER=false` in Vercel and redeploys; no repository change, no wallet-mode CI job. Finite nested Lane V ticket `CLASS-A-VAL-002-HOME-DEDUP-001` removes the default-route “Latest change” strip so “Since you were last here” is the single explanation of change. A same-day amendment also hides default-route Recent activity while the one-change or several-changes variant shows. Source merge and a separate verified RAP rebind precede each runtime edit. **NO CROSS-LANE IMPACT.**
**One Home experience technical closeout (2026-09-28):** §327 records delivery of `CLASS-A-VAL-002-HOME-EXPERIENCE-001` in five tranches after source #719 and RAP rebind #720: T1 #721, T2 #722 with correction #724, T3 #729 after §7a amendment #728, T4 #730, T5 #731, and the wallet-balance-mode correction #732 at `39de4b651db7c2fc92878da528bb2868b0d8e63a`. Every PR from #724 onward merged after an independent Verifier PASS on its exact head; #721 and #722 remain §326 deviations and their retrospective verifications are not recorded by this closeout. Shipped inspection of Production `39de4b6` passed 120/120 checks. [Closed 2026-09-28 via #733 `38cf6b2` and RAP rebind #736 `72979e8`.] Close only this nested ticket after this source-first closeout merges and a separate verified permanent-main RAP rebind completes. Parent `CLASS-A-VAL-002` stays open without an active nested successor. [Historical: `CLASS-A-VAL-002-RESEARCH-NEW-MARKER-001` stays held, and the `/research/stability-scenarios` review is the named next step, not activated here — NEW-MARKER closed under §330; review completed 2026-09-29 (§332); current occupancy is §335 / no nested Lane V.] No participant release, financial capability or cross-lane authority follows. **NO CROSS-LANE IMPACT.**
**Historical Founder activation — One Home experience (2026-09-27):** The Founder approved `CLASS-A-VAL-002-HOME-EXPERIENCE-001` as the sole active nested Lane V ticket: translate the canonical synthetic journey Home to default `/dashboard` and apply the approved productisation polish to both routes in five tranches, with one bounded local last-visit value. [Historical: `CLASS-A-VAL-002-RESEARCH-NEW-MARKER-001` is held open (runtime #710 retained) and resumes after this ticket’s closeout and a `/research/stability-scenarios` review — NEW-MARKER closed under §330; review completed 2026-09-29 (§332); current occupancy is §335 / no nested Lane V.] Live §7/§7a control scope; source merge and a separate verified RAP rebind precede runtime. **NO CROSS-LANE IMPACT.**
**Founder activation — Sarah Research New Marker Treatment (2026-09-25):** The Founder approved `CLASS-A-VAL-002-RESEARCH-NEW-MARKER-001` as the sole nested Lane V successor after §314 closeout. It changes only the visual placement of the existing `New` markers in the After comparison, associating them with the changed row headings as secondary UI metadata. Keep all locked participant-facing copy, row values/order, Before/After structure, scenario data, surrounding journey, safeguards and navigation unchanged. This source authority must merge to permanent main and receive a separate verified projection-only RAP rebind before runtime changes. The research route remains unreleased. No participant exposure, response collection, telemetry, Engine/Wallet/ledger, financial behavior, D1/D2, Lane E/G or cross-lane authority follows. **NO CROSS-LANE IMPACT.**
**Founder amendment — New Marker stacked rows (2026-09-27):** After distinct Codex Verifier review found that the desktop After `Due` row placed heading, `New` and value on one line, the Founder approved stacking the label above the value on every row, in both states, at every width. Live §7/§7a supersede the ticket's `row/panel redesign` exclusion only for that stacking. Eligible files, locked copy, values, row order, heading-bound markers, desktop Before/After alignment and all other exclusions remain unchanged. Source merge and a separate verified RAP rebind precede the runtime edit. **NO CROSS-LANE IMPACT.**

**Historical Founder activation — nested Lane V Research Compression (2026-09-25):** On 2026-09-25 at ~14:59 AWST the Founder (Musalwa Hibajene) approved bounded implementation ticket `CLASS-A-VAL-002-RESEARCH-COMPRESSION-001` as the sole nested Lane V occupancy under open parent `CLASS-A-VAL-002`, with delegated carry-through to Barry (Repo Steward) for this ticket only. Copy source is Founder-locked PE-RESEARCH-COMPANION-PASS-001 copy v3 (~14:57 AWST). §313 named a subtraction-and-hierarchy revision of the unreleased `/research/stability-scenarios` path: plainer common boundary; A2 fee-change facts plus `Nothing else has changed.`; Beat B one four-row aligned grid. Holds: no K30,000 or any total, no D2 wording, no benefit line. Decided §343 as hypothesis only; fence retained. Source authority and a separate RAP rebind preceded runtime. This history creates no new work or participant release. **NO CROSS-LANE IMPACT.**

**Research Value Panel technical closeout (2026-09-25):** §312 records bounded runtime and separate verification delivery in PR #680 at `7d9b521a9a0e03a4beba1834047f92fef4bd70cb`, after activation #678, RAP rebind #679, distinct Implementer `32f35a8` and verification `e0fd857` commits, hosted checks on head `e0fd857`, and independent S4 Verifier PASS WITH NOTES on that same head. Merge via auto-merge at 11:06 AWST preceded the S4 report (~11:11 AWST); the verified head is identical to the merged head (process deviation, no substantive impact). Close only nested Lane V `CLASS-A-VAL-002-RESEARCH-VALUE-PANEL-001` after this source-first closeout merges and a final separate permanent-main RAP rebind is verified. Parent `CLASS-A-VAL-002` stays open without an active nested successor; weekend duties remain deferred and the research route remains unreleased. No participant release or retest, comprehension/demand finding, Forms/telemetry, Engine/Wallet/ledger, §302 doctrine reopen, Lane E/G, Deposit/Confirm lexical rewrite or financial capability follows. D1 stays held. D2 remains a separate, undecided Founder strategy question. [Superseded §343, 5 Oct 2026: decided option B — hypothesis only; not product direction.] **NO CROSS-LANE IMPACT.**

**Historical Founder activation — nested Lane V Research Value Panel (2026-09-25):** On 2026-09-25 at 08:36 AWST the Founder (Musalwa Hibajene) accepted the reconciled Beat B value-panel copy (`PE-RESEARCH-TWO-BEAT-002` v2). On 2026-09-25 at 10:10 AWST the Founder approved bounded implementation ticket `CLASS-A-VAL-002-RESEARCH-VALUE-PANEL-001` as the sole nested Lane V occupancy under open parent `CLASS-A-VAL-002`, after registry RAP rebind #677 merged at `2a1a8bf`. §311 named A2 trimmed to fee-change facts; Beat B `What Hedgr helps Sarah see` with one before/after panel and adjacent attribution/limits; Bridge `Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains.` Holds: no K30,000 or any total, no D2 wording, no benefit line. Decided §343 as hypothesis only; fence retained. Source authority and a separate RAP rebind preceded runtime. This history creates no new work or participant release. **NO CROSS-LANE IMPACT.**

**Research Two-Beat technical closeout (2026-09-25):** §310 records bounded runtime and separate verification delivery in PR #668 at `3fbc7d8d087ce5885417fdbc376b1fbd142edddc`, after activation, the Founder-approved E2E scope amendment and their separate permanent-main RAP rebinds. Full local and hosted checks, independent convergence, exact-SHA Production deployment and a fresh-browser public-alias inspection passed. Close only nested Lane V `CLASS-A-VAL-002-RESEARCH-TWO-BEAT-001` after this source-first closeout merges and a final separate permanent-main RAP rebind is verified. Parent `CLASS-A-VAL-002` stays open without an active nested successor; weekend duties remain deferred and the research route remains unreleased. No participant release, comprehension/demand finding, Forms/telemetry, Engine/Wallet/ledger, §302 doctrine reopen, Lane E/G, Deposit/Confirm lexical rewrite or financial capability follows. **NO CROSS-LANE IMPACT.**

**Historical Founder activation — Research Two-Beat (2026-09-24):** The Founder accepted draft `PE-RESEARCH-TWO-BEAT-001` and approved bounded implementation ticket `CLASS-A-VAL-002-RESEARCH-TWO-BEAT-001`. §309 activated only that nested Lane V ticket for the Continue-only Orientation → A1 Sarah facts → A2 29,500 local fee-change with lived caution → Beat B “How Hedgr would put this” with adjacent attribution and limits → Bridge (simulation / no real money) → `/dashboard-synthetic-journey` sequence, plus the synthetic-Home observation deferral. The source-first activation and separate RAP rebind preceded runtime. This history creates no new work or participant release. **NO CROSS-LANE IMPACT.**
**Agent Role Registry Reconciliation complete (2026-09-25):** `AGENT-ROLE-REGISTRY-RECONCILIATION-001` is completed finite non-lane support after source #666, rebind #667, amendment #671/rebind #673, closeout #676 and permanent-main RAP rebind #677 at `2a1a8bf`. Registration remains identity only and creates no standing support, role assignment, Green delegation or a second registry. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP Worker diagnostic gate (2026-09-25; §317):** The Founder adopts the bounded `BRIDGE-MCP-001` Worker diagnostic disposition with two clarifications: describe the saved five-minute setting only as the observed configured OIDC token lifetime, and use migration-compatible recovery after the SQLite Durable Object migration rather than assume an older Worker version can be restored. The saved one-email `Founder only` policy and `HedgrOps Bridge` Access for SaaS OIDC application are the completed identity baseline; application-session duration remains unverified. Record this source first, separately generate a qualified branch RAP, use ordinary review/checks and source merge, then verify a separate projection-only permanent-main RAP rebind before any Worker configuration or protected test. Only the identified automatic `hedgr-copilot-frontend` Vercel Production deployments from that recording sequence are included. After the gate is effective, the Founder alone may confirm the exact Access user subject and Workers KV/SQLite Durable Object cost posture, configure the named Worker bindings/variables and latest privately retained Access client secret, deploy the unchanged reviewed Worker candidate, and conduct the single Founder-only diagnostic window under live §7a. No paid commitment, broader policy, client redirect, tool or authority expansion follows. Plugin registration/connection and normal-use acceptance remain held for a separate disposition; absent identity, cost, configuration or validation fails closed. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP connection continuation (2026-09-25; §318):** The Founder authorises continuing the same `BRIDGE-MCP-001` item through the §317 owner-controlled Worker configuration and Founder-only diagnostic, then establishing the private HedgrOps MCP connection only within the four reviewed read-only evidence tools. This is a separate connection disposition, not evidence that deployment or authentication already works. The §317 subject, Workers plan/storage-cost, exact Worker-version and fail-closed prerequisites remain; the session and reauthentication question must be tested and qualified. Record source first, a separately committed branch RAP, ordinary review/checks and source merge, then a separate verified permanent-main projection-only rebind before registering the connection. The Founder later expressly confirmed the two bounded automatic `hedgr-copilot-frontend` Vercel Production deployments for the §319 source and separate rebind merges; no other deployment effect is inferred. Never enter or disclose the retained Access client secret in repository, plugin or chat. No broader users, tools, permissions, policy, mandate, repo access, financial execution or paid commitment follows. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP callback-diagnostic continuation (2026-09-27; §318):** The first Founder-only callback on deployed Worker version `b2be9c4c-a349-48e4-b3e6-41c2ed5ae5e4` atomically consumed the Access browser flow and then returned a handled `503`; public health and fail-closed unauthenticated/legacy boundaries remained intact. The Founder approved the stated minimum next action. This finite amendment confirms the ordinary source/RAP/review sequence and its automatic `hedgr-copilot-frontend` Vercel Production effects, then permits only fixed-category, secret-safe callback-stage telemetry in `apps/bridge-worker/src/oauth.js`, focused `apps/bridge-worker/tests/oauth.test.mjs` coverage, exact-revision Worker deployment and one fresh Founder retry. Log no code, state, token, claim, subject, email, callback query, secret, upstream body or exception text; preserve every identity, signature, issuer, audience, nonce, expiry, client, redirect, resource, scope, PKCE, single-use, evidence and legacy check. The existing active version is the migration-compatible rollback anchor. Tracing, additional credential/configuration changes, generic diagnostics, auth weakening and normal plugin use remain held. Stop after the retry outcome for disposition. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP transport-registration continuation (2026-09-27; §319):** Exact reviewed main `3ce30e96c98d33226b21ce55bd7068a34710bca7` is deployed to the existing `hedgrops-bridge` service as Worker version `901ce5ac-969e-4130-afd7-b4bcff70c53e`; required binding names and public health, fail-closed unauthenticated `/mcp` and legacy boundaries passed. The first post-deployment ChatGPT diagnostic stopped before OAuth because the current connection attempted an SSE probe and received `404`; no Founder sign-in, consent, callback, token exchange, tool call or evidence retrieval occurred. The Founder approved the stated narrow continuation and expressly confirmed the two bounded automatic `hedgr-copilot-frontend` Vercel Production deployments caused by its source and separate rebind merges. Record this source first and complete a separately committed branch RAP, ordinary review/checks, source merge and separate permanent-main projection-only RAP rebind before changing the private ChatGPT registration. Permit only inspection and, if required, replacement of that developer-mode registration so it targets exact `https://hedgrops-bridge.hedgr.workers.dev/mcp` using Streamable HTTP, followed by one fresh Founder-only OAuth diagnostic. Do not add `/sse`, alter Worker code/configuration/deployment, Cloudflare Access, credentials, storage, bindings, identity, policy, four fixed tools, legacy routes, packaged skills or mandate. Session and reauthentication behavior remains unresolved. Stop after the retry outcome. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP OAuth-linking continuation (2026-09-27; §320):** §319 source PR #700 merged at `f6afcc65f2059c770e817dcd04552f088f444d43` and its separate permanent-main RAP rebind PR #701 merged at `0b8409f3ea8bb119733039d98677f2b1536040d7`. The migrated HedgrOps release `0.75.2+bundle.20260927` now contains one Streamable HTTP registration for exact `https://hedgrops-bridge.hedgr.workers.dev/mcp`; the bounded retry reached that endpoint and received the expected `401` Bearer challenge for `evidence:read`, but the retained chat did not surface OAuth and continued to expose an earlier five-tool snapshot. No Founder authentication, callback, token, four-tool discovery or evidence call completed. The Founder approved one continuation and expressly approved the two bounded automatic `hedgr-copilot-frontend` Vercel Production deployments caused by its source and separate rebind merges. Record this source first, generate a separately committed deterministic branch RAP, use ordinary review/checks and source merge, then verify a separate permanent-main projection-only RAP rebind. After that gate, refresh or relink only the existing HedgrOps connection metadata and use one fresh conversation so the Founder can complete the expected OAuth flow. Do not create a second operational connection, use the stale chat as discovery evidence, change Worker/Cloudflare state, add tools or parameters, edit the packaged skill or mandate, or claim normal-use acceptance. Stop after the single fresh diagnostic outcome; session and reauthentication behavior remains unresolved. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP Codex desktop redirect continuation (2026-09-27; §321):** The §320 source PR #702 merged at `b14c71d79e27337437eff7fe629fb7a1af15bac2` and separate permanent-main RAP rebind PR #703 merged at `3f651064b0fe832be561c7966462e0a89804f616`. The single authorised Codex desktop diagnostic reached dynamic client registration and failed closed with `400 invalid_client_metadata` because its native loopback redirect was outside the Worker's existing ChatGPT-only redirect profile. No OAuth browser flow, Founder sign-in, consent, callback, token, tool discovery or evidence retrieval occurred. The Founder approved the stated minimum compatibility continuation under the same `BRIDGE-MCP-001`: record this source and branch RAP, merge and separately rebind permanent main, then permit only a strict Codex native loopback callback profile in the existing Worker, focused tests and operator documentation, governed review/integration, exact-revision same-service deployment and one fresh Founder diagnostic. The eligible loopback form is HTTP on literal `127.0.0.1`, one explicit nonzero ephemeral port, exact `/callback`, and no credentials, query or fragment; retain both existing ChatGPT HTTPS redirect forms and every client/resource/scope/PKCE/single-use/identity/evidence/legacy control. Do not allow wildcard hosts, `localhost`, IPv6, omitted ports or arbitrary paths. The automatic `hedgr-copilot-frontend` Vercel Production deployments caused by the bounded recording and rebind merges and the reviewed Worker deployment are included; no other cloud/configuration change follows. Normal use and unresolved session/reauthentication acceptance remain held. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP authorization-observability continuation (2026-09-27; §322):** The strict Codex loopback profile is integrated and deployed in Worker version `bbddcb00-93f8-4083-aeac-9edb1b6c7606`. Its single §321 diagnostic reached registered-client consent. Production evidence shows one approval consumed the browser-bound consent ticket and created downstream Access state; a later `POST /authorize` returned the generic fail-closed `503 MCP_AUTH_UNAVAILABLE`. No Worker `/callback`, token exchange, authenticated `/mcp`, tool discovery or evidence retrieval followed, and the exact pre-callback failure remains unresolved. The Founder accepts that fail-closed outcome and authorises one bounded successor under existing `BRIDGE-MCP-001`: source-first authority, deterministic branch RAP, focused local implementation/tests and distinct review for fixed, secret-safe authorization-stage categories and deterministic expired, missing, mismatched and already-consumed consent failures. Preserve the same Durable Object transactional enforcement point and never make duplicate approval succeed or recreate consumed state. Logs may contain only a fixed event family, fixed stage and coarse category; never include request URLs/bodies, tickets, state, codes, PKCE, nonces, cookies, tokens, secrets, client metadata, subject or email. Worker deployment, live retry, Worker/Access configuration, redirect changes, plugin connection, new tools and broader authority remain held. The Founder subsequently expressly confirmed the two bounded automatic `hedgr-copilot-frontend` Vercel Production deployments caused by the source merge and separate permanent-main RAP rebind; this lifts only that recording-sequence side-effect hold. **NO CROSS-LANE IMPACT.**
**Founder Bridge MCP authorization-diagnostic release continuation (2026-09-27; §323):** The §322 authority source merged in PR #709 at `34b66c438f78b8dffd4651462cc3be05eb707b9d` and its separate permanent-main RAP rebind merged in PR #711 at `4c67a377f6d0b36c82b3fb62b6f3bd3fbc8adcc9`. Local runtime candidate `6794d61d4e01d91c81d22445ec3d444051544035` adds the bounded authorization categories, atomic non-authorizing consent tombstone and regression coverage; full validation and Node 24 Wrangler dry run passed, and a distinct Codex Verifier returned PASS on that exact commit. The Founder now authorises source-first recording of this continuation, its separate permanent-main RAP rebind, governed integration of the exact reviewed runtime tree, exact-revision deployment to the existing `hedgrops-bridge` Worker without configuration change, boundary verification and one fresh Founder-supervised Codex OAuth diagnostic. The approval includes only the automatic `hedgr-copilot-frontend` Vercel Production deployments caused by the recording source, its separate rebind and the reviewed runtime merge, plus the same-service Worker deployment. Preserve active Worker version `bbddcb00-93f8-4083-aeac-9edb1b6c7606` as the migration-compatible rollback anchor, all existing bindings/secrets/policies, four fixed evidence tools, legacy routes and evidence qualifications. On failure inspect only the fixed stage/category and stop; no retry, configuration change, extra telemetry, broader user/tool/authority, plugin or skill edit, or normal-use acceptance follows. **NO CROSS-LANE IMPACT.**
**Founder Bridge MCP fresh-authorization preparation (2026-09-27; §324):** The §323 runtime merged at `c98c99709a170a40e45726c50ddae59bc9980869` and is deployed as Worker version `ce9eea85-5c6d-48a5-9b19-404051b35357`. Its single diagnostic reached consent; one approval atomically consumed the consent ticket and created downstream Access state, then a later duplicate `POST /authorize` failed closed with `403 MCP_AUTH_FAILED`. Secret-safe telemetry fixed the stage as `consent_validate_and_consume` and category as `consent_already_consumed`; no callback, token exchange, authenticated `/mcp`, four-tool discovery or evidence retrieval followed. The Founder approved the recommended narrow successor: prepare a source-first record and deterministic branch RAP for one completely fresh Founder-supervised authorization, with exactly one consent submission and no code, Worker, Access, credential, storage, binding, policy, plugin or skill change. This branch record remains non-authorising. Merge-triggered Vercel Production deployments, the separate permanent-main RAP rebind and the live retry remain held until expressly approved; normal-use acceptance remains held. **NO CROSS-LANE IMPACT.**
**Founder Bridge MCP normal-use disposition (2026-09-27; §325):** The §324 source PR #715 merged at `d20ac68c48a31bd2fc04d80e3038fe71468acc75`; separate permanent-main RAP rebind PR #716 merged at `8e6f9d8fd62543a1118ff4c6d0e291c66fb190d3`, and both bounded Vercel Production deployments succeeded. The one fresh Founder-supervised attempt displayed the expected Codex client, strict loopback callback, MCP resource, `evidence:read` and PKCE S256; its single approval consumed consent and created Access state without an authorization-failure event. Chrome recorded no onward Cloudflare Access navigation, the current Access window showed no matching decision, and no Worker callback, provider token exchange, authenticated `/mcp`, four-tool discovery or evidence retrieval followed. The Founder says `normal use disposition approved`. This lifts the policy hold for later private Founder-only normal use within the existing four fixed read-only evidence tools, but it cannot convert the failed diagnostic into operational evidence or create a usable connection. Normal use cannot begin until authentication actually completes. Another authorization attempt, diagnosis/remediation, Worker or Cloudflare change, plugin change, tool expansion, broader user, financial authority or mandate change requires separate scope. This source/branch-RAP preparation is non-authorising; its source merge, automatic Vercel Production deployment and required separate main RAP rebind remain held pending express approval. **NO CROSS-LANE IMPACT.**

**Historical Founder Bridge MCP identity configuration (2026-09-25; completed before §317):** §315 continues the existing `BRIDGE-MCP-001` item. Its one-email `Founder only` Allow policy was saved before the §315 repository gate became effective; §316 records that sequence deviation without retroactive approval. The Founder subsequently confirmed the sole approved sign-in identity in the owner-controlled interface. After the §316 clarification and its separate verified permanent-main RAP rebind, the Founder associated that policy with the `HedgrOps Bridge` Cloudflare Access for SaaS OIDC application in the existing Worker-owning Zero Trust organisation and saved the application. Before saving, inspect the policy association, exact `https://hedgrops-bridge.hedgr.workers.dev/callback` redirect, selected login method and exposed OIDC token settings. Record any unexposed application-session setting as unresolved; inspect the saved configuration and resolve applicable session and reauthentication behaviour before live Bridge use. This permission includes only bounded source/branch-RAP review, ordinary merge, separate main RAP rebind and their automatic Vercel Production deployments. It supersedes §308's Cloudflare policy/application hold only for those two owner actions. At that identity checkpoint, Worker identity/subject, variables, secrets, KV/Durable Object resources or bindings, deployment, protected calls and plugin connection remained held; §317 governs the later bounded diagnostic gate. No broader access, paid commitment or cross-lane authority follows. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP controlled integration (2026-09-24):** §308 accepts corrected `BRIDGE-MCP-001` commit `775c7b26c991b4e7ae6396e876797bfc02cca9f1` and its distinct agent Verifier PASS for local repository review only. The Founder authorises governed integration of PR #660 and a separate permanent-main projection-only RAP rebind, including the bounded automatic Vercel Production deployments those main commits trigger. Recheck final main/head, scope, checks and native approval requirements; record the rollback anchor before merge. This supersedes §307's repository merge/deployment hold only for that Vercel source/projection sequence. No Cloudflare resource, binding, policy, identity, credential or Worker deployment, protected Bridge call, plugin edit/registration or live MCP connection is authorised. Preserve Product Experience and unrelated work, the four fixed evidence tools, legacy clients and evidence qualifications. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP security remediation (2026-09-24):** §307 continues the same `BRIDGE-MCP-001` item and draft PR #660. The Founder authorises bounded local Durable Object-backed one-time credential enforcement, OAuth redirect-profile and consent corrections, regression tests and distinct Verifier review. Preserve the maintained provider, four fixed tools, evidence contracts, legacy clients and Founder-only identity. Keep the PR draft and `qa:blocked`; no merge, permanent-main rebind, production-triggering action, cloud resource/binding/secret change, Worker deployment, protected production call or plugin connection is authorised. The branch record is not permanent-main authority. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP repository-integration gate (2026-09-24):** §306 authorises branch push, governed PR, distinct Verifier review and required checks for local `BRIDGE-MCP-001` checkpoint `3f9e2eb`. Current remote-main Product Experience §303 remains separate. The reviewed KV-backed state and code exchange have a material concurrent-replay finding, and main merges trigger Vercel Production deployments; neither is approved to bypass. Do not label QA approved or merge until the storage/protocol issue and production-deployment gate receive separate Founder disposition. Cloudflare configuration, Worker deployment, protected calls and plugin connection remain withheld. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP authentication continuation (2026-09-24):** §305 continues the same local-only `BRIDGE-MCP-001` item after checkpoint `6baa0fd`. The Founder authorises local implementation and mocked verification of the real Cloudflare Access for SaaS OIDC exchange, Worker-side OAuth provider, token validation and discovery metadata, preceded by an exact owner setup sheet. The former §304 local authentication hold is superseded only for this local work. The four fixed evidence tools, legacy HTTP service, restricted server-side GitHub credential, evidence contracts and read-only boundary remain fixed. No paid commitment, cloud resource creation, live Worker configuration or credential change, push, PR, merge, deployment, protected production call or plugin edit/registration is authorised. The branch is not permanent-main activation; a separate connection gate remains required. **NO CROSS-LANE IMPACT.**

**Founder Bridge MCP local-work disposition (2026-09-24):** The Founder approves one local-only `BRIDGE-MCP-001` implementation and fixture-test exercise under `HEDGR_STATUS.md` §7 / §7a / §304. Its source record precedes code work. It may add four fixed, read-only evidence tools inside the existing Worker and preserve legacy HTTP clients. Cloudflare Access for SaaS is the selected authentication design for later integration; the account has no configured Zero Trust organization or authentication domain, so live OAuth wiring and all connection/deployment steps remain held. Local MCP handling must fail closed without verified authentication. This branch is not permanent-main activation and grants no deployment, push, merge, provider configuration, credential change, plugin edit, generic browsing, ticket sequencing, or financial authority. **NO CROSS-LANE IMPACT.**

**Product Experience Lead institutional registration (2026-09-24):** §303 records Founder-directed, bounded role codification. Canonical `PROPOSE_ONLY` skill and §9.8 registration merged in PR #657 at `16b5405f77890db72104b9932dcb771b4da41227`; separate projection-only RAP rebind #661 merged at `01d5fe4ac4c2728494a3af7a4e5e5c98f82d7f24`. The finite repository support task closes only when this source closeout and its own separate permanent-main RAP rebind are verified. The existing Human Narrative Lead §9 discrepancy remains explicit and unchanged. Registration grants no first Product Experience task, product/research/participant work, Green delegation or implementation authority. **NO CROSS-LANE IMPACT.**

**Stability Interpretation stimulus technical closeout (2026-09-23):** §302 records source activation #646, separate permanent-main RAP rebind #647, Founder currency-optionality amendment #648 and rebind #649, selector-helper correction #651 and rebind #652, then runtime/Verifier delivery #650 at `5cc641310316eb21ebcde3b4becc86a3b6e8b82a`. Distinct Verifier commit `645168f` records PASS after the study helper and common-disclosure corrections. Full local validation, build and 126 browser tests, all hosted checks including independent convergence, exact-SHA production deployment and a live route inspection passed. Close only the nested `CLASS-A-VAL-002-STABILITY-INTERPRETATION-001` ticket when this source closeout merges to permanent main and receives a final separate verified RAP rebind. Parent Lane V remains open without a nested successor; the research route remains unreleased for participant use. No comprehension, incremental utility, Engine adoption, participant release, response custody, financial capability or cross-lane authority follows. **NO CROSS-LANE IMPACT.**

**Interactive Stability Testing preflight (2026-09-22):** Direct Founder approval activates only nested Lane V `CLASS-A-VAL-002-STABILITY-SCENARIOS-001` on permanent-main merge of the §7/§7a/§298 source transition, followed by a separate verified RAP rebind before substantive authoring. It is one documentation-only Phase A+B methods and semantic preflight. The former weekend nested ticket is deferred, not completed; its Digital Feedback v1 circulation disposition and Founder-only outreach/raw-response custody remain in force. No participant-facing prototype, route, controls, session, Form, telemetry, personal data, model/executable-interface adoption, posture change or financial capability follows. Lane E remains open without a nested ticket; G remains deferred. Green delegation remains revoked. The exact brief and stop/rollback controls are in §7a and the linked preflight document. **NO CROSS-LANE IMPACT.**

**Founder RETAIN — corrected scenario preflight (2026-09-22):** The Founder instructed “make corrections based on HedgrOps review and RETAIN.” §7/§7a/§298 retain the corrected documentation record after its governed merge and separate verified RAP rebind, then close only `CLASS-A-VAL-002-STABILITY-SCENARIOS-001` preparation; parent Lane V remains open without an active nested ticket. HedgrOps advice is review evidence, not repo authority. The orientation/S0 exposure boundary and posture coexistence remain for a separately authorised participant-facing ticket. Deferred weekend duties and the distinct Digital Feedback v1 release/Founder custody persist. No participant release, runtime, data collection, Phase C, “Use My Numbers”, Engine adoption, Green delegation, financial capability or cross-lane change follows. **NO CROSS-LANE IMPACT.**

**Founder activation — Stability stimulus (2026-09-22):** The Founder approved activation and implementation of the recommended `CLASS-A-VAL-002-STABILITY-STIMULUS-001` ticket. Live §7/§7a names the sole nested Lane V scope: a bounded authored S0–S3 research stimulus, common `/orientation` endpoint and explicit S0 branch, versioned method, and distinct verification. This activation becomes effective only on permanent-main source merge and a separate verified RAP rebind before runtime. No participant release, recruitment, collection, live Engine-derived posture, personal input, financial action, Green delegation or cross-lane permission follows. Weekend duties remain deferred and the Digital Feedback v1 pulse retains its separate Founder disposition. **NO CROSS-LANE IMPACT.**

**Stability stimulus technical closeout (2026-09-22):** §299 records source activation #631, separate verified main RAP rebind #632 and runtime #633 at `8fc7fba8bf246df8d79d7fb5729065a18d406296`. Distinct runtime and QA/protocol commits, full local validation, production build, 124 local browser tests and required hosted checks including independent convergence passed. The exact-SHA production deployment succeeded and the public alias was inspected for the orientation branch, withheld S0/S3 conclusions, unchanged ordinary continuation and enlarged-text layout. Close only this nested ticket on permanent-main merge of the source-first completion record and a final verified projection-only RAP rebind. Lane V parent stays open with no active nested successor; weekend duties remain deferred, and the separate Digital Feedback v1 release/Founder custody persist. This is technical delivery, not participant comprehension, release, Engine acceptance or financial capability. **NO CROSS-LANE IMPACT.**

**Founder activation — humanised Stability stimulus (2026-09-22):** The Founder directly approved activation of the bounded successor after the HedgrOps feedback brief. §7/§7a/§300 activate only `CLASS-A-VAL-002-STABILITY-HUMANISE-001`, effective on permanent-main source merge and a separate verified RAP rebind before runtime. Use one Sarah postgraduate-payment family, a newly versioned fictional 18,000/6,000/12,000/5,000/8,000 local-unit fixture, and the existing selected display currency as a scenario denomination without FX conversion or market claims. Preserve one-fact hub contrasts, neutral pre-reveal prompts, authored-not-Engine interpretation, synthetic-only gating and ordinary orientation/default route. This preparation does not release the research route or authorise participant contact, collection, Phase C, personal inputs, financial action, Green delegation or cross-lane work. Distinct runtime and verifier QA commits, source-first completion and final main RAP rebind are required. **NO CROSS-LANE IMPACT.**

**Humanised Stability stimulus technical closeout (2026-09-22):** §300 records activation #636, separate verified main RAP rebind #637 and runtime #638 at `a30e28966b0b19ced4052e0c7354916bbbc2e5b3`. Separate implementation and test/protocol commits, full local validation, production build, 125 local browser tests, all required hosted checks and independent convergence passed. Exact-SHA Vercel production status succeeded; a fresh public-alias browser check observed the study branch, withheld reveal, S3 abstention, ordinary orientation and enlarged-text fit without page errors. Close only this nested ticket on permanent-main source closeout merge and another separate verified RAP rebind. Parent Lane V remains open with no nested successor; the research route remains unreleased for participants. Weekend duties, distinct Digital Feedback v1 release/Founder custody, Lane E/G and all financial boundaries remain unchanged. Technical completion is not comprehension, demand or participant release. **NO CROSS-LANE IMPACT.**

**Founder activation — Stability Interpretation convergence package (2026-09-23):** The Founder approved activation and implementation of the recommended `CLASS-A-VAL-002-STABILITY-CONVERGENCE-001` ticket after RETAINing the bounded Stability Interpretation direction. Live §7/§7a/§301 activate only one documentation-only Lane V package: record the corrected A–E contract and perform one distinct semantic compatibility review against §290, the retained functional contract and current EngineState/mock/hook. Source authority must merge to permanent main and receive a separate verified RAP rebind before substantive authoring. Preserve the completed preflight and stimulus protocol as historical evidence. No frontend, Engine, Wallet, participant, Form, telemetry, personal-input, live-FX, asset, yield, execution or release work follows. Lane E remains open without a nested ticket; review of §290 creates no Lane E occupancy or executable interface acceptance. **NO CROSS-LANE IMPACT.**

**Stability Interpretation convergence package technical closeout (2026-09-23):** §301 records activation #641 at `c435287a40902c70618e218939f6e50cd439dde6`, separate verified permanent-main RAP rebind #642 at `c84c3285bd17262038560be258ae5dbb5855de2e`, and package #643 at `3dd91cbb2279550357131dabae1f6a8038d0b697`. The package preserves distinct author and Verifier commits, exact A–E facts/prompts/codes, immutable-input hashes and a PASS WITH EXPLICIT LIMITATIONS semantic review. Full local validation and all required hosted checks, including browser and independent convergence, passed. Close only this nested ticket on permanent-main merge of the source-first completion record and a final separate verified RAP rebind. Parent Lane V remains open without a nested successor; the research route remains unreleased. Technical completion does not establish participant comprehension, empirical utility, executable Engine compatibility, runtime readiness, participant release or financial capability. **NO CROSS-LANE IMPACT.**

**Founder activation — Stability Interpretation stimulus (2026-09-23):** The Founder approved activation and implementation of the recommended `CLASS-A-VAL-002-STABILITY-INTERPRETATION-001` ticket. §7/§7a/§302 name the sole nested Lane V scope: translate the completed A–E package into one unreleased authored research stimulus on the existing synthetic study route, with a study-only orientation correction, exact neutral sequence and independent verification. Source authority must merge to permanent main and receive a separate verified RAP rebind before runtime edits. No participant release, recruitment, response collection, telemetry, executable Engine judgement, Wallet inference, posture co-display, personal input or financial capability follows. Deferred weekend duties and the distinct Digital Feedback v1 Founder disposition remain intact. **NO CROSS-LANE IMPACT.**

**Founder currency-optionality amendment (2026-09-23):** The Founder directed retention of the existing five selected-currency options for Sarah's fictional savings to improve research relevance. §7/§7a/§302 and the additive A–E package amendment supersede only the fixed-ZMW presentation and study-branch selector removal in the active stimulus ticket. The USD 1,000 course obligation stays fixed; baseline, interpretation and K29,500 transfer use one consistently selected local denomination per traversal. Do not claim equivalent purchasing power, conversion, market support or pooled cross-currency comparability. Preserve the neutral sequence, Exposure + Unknowns contract, no response capture and separate participant-release gate. Merge this source amendment and verify a separate permanent-main RAP rebind before changing runtime. **NO CROSS-LANE IMPACT.**

**Study selector helper correction (2026-09-23):** Distinct verifier review of the active stimulus found that the existing generic selector helper calls its choice a local estimate while Sarah's authored study uses the chosen currency as a fictional denomination without conversion. The live §7a/§302 amendment adds only `SimulationDisplayCurrencySelector.tsx` to permit an explicit study-entry helper override passed from the already eligible orientation branch. Preserve the five choices, label, storage, rates and ordinary orientation/Settings/Position copy. The study helper must describe fictional denomination without revealing the USD relationship before baseline. Move the authored/not-live disclosure to common study chrome so exact Output D is the sole treatment addition. Source merge and separate verified RAP rebind precede this runtime correction. **NO CROSS-LANE IMPACT.**

**Digital Feedback v1 release disposition (2026-09-21):** The Founder reports completed phone rehearsal and explicitly identifies “ready for circulation” as the release disposition for the separate published Digital Feedback v1 Form inside `CLASS-A-VAL-002-WEEKEND-PREP-001`. Live §7/§7a and the digital protocol retain the observed publication settings, responder link, signed-out opening, Founder-reported 3-minute-15-second journey and Form time under five minutes, passed same-browser resume and successful WhatsApp messaging-browser handoff. The supplied iPhone screenshot independently shows the Form opened from WhatsApp; it does not independently show return-journey state. Submitted confirmation remains untested by the Repo Steward. Founder-owned participant selection, invitations and raw-response custody remain exclusive; agents send no participant messages. The moderated v2.1 study and broader parent distribution remain paused. Instrument PR #550 merged at `68a31397efd9cf2477c5c0aa1f77c712e4c9a5fa` and projection-only RAP rebind PR #623 merged at `ee9358e4b2779dc3be5677c9d754bdefb75b1029`; nested-ticket technical closeout remains open; no comprehension acceptance, new ticket, runtime refinement, financial capability or cross-lane authority follows.

**Fork 1 delivery:** §292 records verified governance-surface delivery and explicit activation on permanent-main merge, with a separate verified RAP rebind before operating use. The finite refactor permission is consumed by that delivery. Fork 2 provenance changes and Fork 3 amendment envelopes remain inactive; existing source-first, separate permanent-main rebind, amendment, QA and release procedures remain controlling. No standing delegation follows.

**Fork 2 implementation authorisation:** §293 records the Founder's bounded implementation disposition and §7a names the exact governance/tooling scope. Implementation may start only after its source authority merges to permanent main and the current separate RAP rebind is verified. Fork 2 operating behaviour remains **INACTIVE** until independently verified and explicitly activated in repo-native authority; existing RAP generation, governed PR, and separate permanent-main rebind procedures continue to control. No product ticket, lane, Green delegation or Fork 3 pilot follows.

**Synthetic Home scope-first technical completion (2026-09-20):** §294 records verified delivery in PR #602 at `e548dd02c80e7d9eb97c646514685343d2155c05`, after activation #600 and separate rebind #601. Separate runtime/independent QA commits, full validation, 110 browser tests, required hosted checks and deployed mobile/desktop/control inspection passed. This consumes the finite §7a presentation amendment inside `CLASS-A-VAL-002-WEEKEND-PREP-001`; no further refinement follows. Record completion source before RAP, merge to permanent main and verify the separate projection-only rebind. Remaining weekend instrument/rehearsal/release duties, draft #550/Form, paused participant distribution, open parents, other lanes and Fork 2/3 posture remain unchanged. Live §7/§7a controls; no parent closure or Green delegation.

**Synthetic Home deposit CTA technical completion (2026-09-20):** §295 records verified delivery in PR #609 at `c440e176aeea96f81d88870879d9210b2f730beb`, after activation #607 and separate rebind #608. Distinct runtime and verifier commits, full validation, 110 browser tests, all required hosted checks and exact-revision production deployment `6552449247` passed. The Implementer inspected the shipped synthetic and default dashboards at mobile and desktop widths. This consumes the finite CTA correction inside `CLASS-A-VAL-002-WEEKEND-PREP-001`; no additional refinement follows. Record this completion source before RAP, merge to permanent main and verify a separate projection-only rebind. The revised balance scope copy, default journey, routes, financial state, #550/Form, participant release pause, remaining weekend duties, open parents, other lanes and inactive Fork 2/3 operating posture remain unchanged.

**Synthetic Home balance-copy technical completion (2026-09-20):** §296 records activation PR #612 and separate verified rebind #613 before runtime, followed by runtime PR #614 and corrective PR #615 at `abd44ca49230643d95e7e40004c4099e990c06ca`. Distinct implementation/Verifier commits, full validation, 118 hermetic browser tests, required hosted checks and exact-revision production inspection passed; deployment `6553677522` succeeded. The uncarded balance retains its dynamic USD and selected-currency estimate, with “Includes your simulated activity.” below the estimate; the long-amount mobile correction keeps whole financial digits. This consumes the finite §7a amendment inside the sole nested `CLASS-A-VAL-002-WEEKEND-PREP-001` ticket. Record this completion source before RAP, merge it to permanent main and verify a separate projection-only rebind. No new Currency Context inline insight, withdrawal-timing relocation, Deposit/Withdraw flow, financial semantics, other route, Form, participant release or cross-lane change follows. Remaining weekend duties, draft #550/Form, paused participant distribution, open parents and inactive Fork 2/3 remain unchanged.

**Synthetic Home compact FX insight activation (2026-09-20):** The Founder answered “authorized” to the explicit request for a new finite, synthetic-Home-only Currency Context amendment. Live `HEDGR_STATUS.md` §7/§7a/§297 bounds it to a compact Home interpretation of the existing comparison, retaining the detailed shelf and default Home. This supersedes only §296's exclusion of a new inline FX insight; its balance-copy permission remains consumed. Source-first permanent-main activation and a separate verified RAP rebind must precede runtime. Implementer and distinct Verifier make separate runtime and QA commits; full local/hosted checks, shipped inspection, source-first completion and final rebind apply. No full prior inline component, performance framing, calculation or financial-state change, other-route edit, Form/release, new ticket, D-number, or standing refinement follows. **NO CROSS-LANE IMPACT.**

**Synthetic Home compact FX insight technical completion (2026-09-20):** §297 records source activation #618, separate verified main rebind #619 and runtime #620 at `af41cec939dcbe3ceebff90255c3878b0aed048a`, preserving distinct runtime/Verifier QA commits. Full validation (906 frontend / 49 Bridge), 121 local hermetic browser tests, all required hosted checks and convergence passed. Exact-SHA Vercel production deployment `dpl_AVp1GUT5yy4XsJVsfBU66Kf3vDrz` reached READY; the Implementer inspected the production synthetic Home at 390/1440px and unchanged default-route isolation in an isolated browser. This finite permission is consumed on permanent-main merge of the source-first completion record and requires a separate verified projection-only RAP rebind. Remaining weekend instrument/rehearsal/release duties, #550/Form, participant pause, open parents, other lanes and inactive Fork 2/3 remain unchanged. No comprehension, release, financial capability or standing refinement follows. **NO CROSS-LANE IMPACT.**

Repeated earlier standards and dated overrides are retained in the [historical AGENTS snapshot](docs/ops/governance/AGENTS_PRE_FORK_1.md). That snapshot is evidence, not a second execution contract. Numbered STATUS records preserve accepted decisions and technical history.

## 1) Purpose
AGENTS.md defines how work is executed in this repo and how autonomous or semi-autonomous agents must behave when operating inside Hedgr.

It is the repo-level execution contract for:
- repo layout and boundaries
- CI expectations and hermetic rules
- environment flags and defaults
- implementation workflow conventions
- agent role boundaries
- execution and escalation rules
- output and validation discipline

For doctrine, architecture, product/system invariants, and anti-drift rules, `.cursorrules` remains governing authority.

For patch execution discipline, `.cursor/rules.md` applies.

If a higher-authority repo document conflicts with local task convenience, higher authority wins.

## 2) Authority model
Agents operate under strict authority hierarchy:

1. Founder — direction, prioritization, approval  
2. Repo authority — `docs/ops/HEDGR_STATUS.md`, accepted ADRs, `AGENTS.md`, repo-native doctrine, governance standards. The repository is the sole canonical institutional authority and durable institutional-memory surface. Notion is retired and is not an operating, governance, or institutional-memory surface. Obsidian may continue as founder cognition and is not a successor knowledge base.  
3. Project Ops / `docs/ops` — governance framing, review traceability, bounded critique and refinement artifacts  
4. Cursor — primary repo execution surface  
5. Codex — bounded secondary operator for exploration, reconstruction, verification, testing, and explicitly approved implementation support only

Agents must not override higher authority for convenience.

**Authority legibility invariant (AUTHORITY-LEGIBILITY-001):** Authority correctness and authority legibility are separate properties. Permanent-main repo authority governs. Authority-shaped lag is surfaced and escalated; it is never used to infer authority and is never silently repaired. `HEDGR_STATUS.md` §7 / §7a retain active-ticket naming authority; accepted ADRs, this Authority Model, active doctrine and applicable repo-native delegation retain their existing roles and precedence.

Draft branches, unmerged PRs, review evidence, RAP projections and Bridge responses cannot independently activate work or establish accepted decision history. Projection `freshness: CURRENT` does not mean every narrative fragment is current sequencing instruction; `conflicts: []` does not mean no authority-shaped lag exists. Attributable, non-conflicting hygiene warnings are non-blocking: surface them to the steward without changing authority or freezing otherwise authorised work. Genuine current-authority disagreement retains the stop/escalation rule below. Unknown prose remains a review concern, not an inferred reconciliation. See `docs/ops/bridge/README.md` for the bounded diagnostic coverage and limitations; it remains operator guidance, not authority.

If conflict is detected:
- stop
- surface the conflict explicitly
- do not silently reconcile

## 3) Repo Layout (canonical)
- `apps/frontend/`  — Next.js app (App Router + Pages Router), API routes, Vitest, ESLint
- `apps/backend/`   — Flask backend service boundary; currently limited in scope but part of the canonical system structure
- `packages/ui/`    — Shared UI library (`@hedgr/ui`)
- `packages/config/`— Shared config surface (future)
- `docs/`           — Doctrine, ADRs, architecture, contracts, copilot, ops, and scaffolding records
- `scripts/`        — CI and repo guard scripts (trust checks, workflow guards, validation)
- `.github/`        — CI workflows, templates, automation

## 4) Non-Negotiables
- Security and trust before speed.
- CI/E2E must remain hermetic: no live external calls.
- Deny-by-default: mock/stub modes in CI.
- Rollback must be possible via flag or single revert.
- Respect current sprint posture and implementation boundaries.
- Do not create hidden authority surfaces through agent output.
- Do not treat memory, inferred continuity, or connected tools as approval authority.
- Smallest durable change, then prove the real result: make the smallest change that meets the brief. Prefer removing or reusing over adding new files, abstractions or surfaces. Prove the change against the real behaviour or artifact (a test, a hermetic run, a production probe where the brief names one), not just that it compiles or that CI is green.

## 5) Required CI Checks (branch protection)
- `validate`
- `E2E smoke (@hedgr/frontend)`

Workflow names must remain stable once enforced.

## 6) Environment Flags (defaults are CI-safe)

Frontend:
- `NEXT_PUBLIC_AUTH_MODE=mock` — `magic` is local-only
- `NEXT_PUBLIC_FX_MODE=stub` — `live` is local-only, never CI
- `NEXT_PUBLIC_MARKET_MODE=manual`
- `NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:5050`

Backend:
- `STUB_MODE=true`

AI:
- `OPENAI_MODE=stub`

## 7) Testing Standards
- Unit: Vitest (frontend)
- E2E: Playwright smoke (frontend)
- Stable selectors: prefer role-based selectors and `data-testid`; avoid brittle DOM chains.
- No test depends on external services (CoinGecko, MTN, Aave, OpenAI, Magic).
- Behavior changes should ship with corresponding test updates unless explicitly waived.
- **TDD standing posture for Engine and Home runtime §7a briefs (binding; §346):** every future Engine and Home runtime brief must name at least one test that fails before the change and passes after it. That test is an Acceptance Criterion and its path is in the file allowlist. Use a Vitest contract for engine, balance and copy invariants; use a hermetic Playwright case when the behaviour is user-visible on a route. The Implementer's first commit on a runtime PR is the failing test, unless the brief records an explicit Founder waiver. The independent Verifier confirms those named tests exist, assert what the brief asks for, and pass in hosted CI on the exact head SHA; Verifier PASS remains an attestation gate and does not replace tests. Stability Engine slices use the three testable properties of "stable" in `docs/strategy/stability-engine-pack.md`: same inputs give the same read; changing one input moves only the explained parts; an engine change moves nothing else unless deliberate. Any new Flask/backend surface in a ticket gets a pytest case in the same PR. Docs/authority PRs stay docs-first (fixture/authority checks, not product TDD). Dynamic Stability Testing and Lane E interpretation suites (IT-*) stay research-only and out of product CI until separately opened by the Founder. This posture activates no ticket, launches no Implementer for runtime work, changes no occupancy, and changes no required checks or branch protection.

## 8) Execution Rules
When implementing:
- Reference exact file paths.
- Prefer small PRs: one boundary change per branch.
- Add or extend tests in the same PR when touching contract surfaces.
- Default to reversible designs (flags + stubs).
- Never merge a PR that introduces a live network dependency in CI.
- Do not violate `.cursorrules` or current ADR constraints for implementation convenience.
- Do not widen scope beyond the stated task.
- Do not silently modify unrelated files.

### Engine-facing governance (Sprint 2 Stability Engine)

When changing `apps/frontend/lib/engine/**` or shipped Stability Engine trust surfaces (posture, notices, allocation bands, or simulator boundaries per `docs/ops/HEDGR_STATUS.md`), read in order:

1. `docs/ops/HEDGR_STATUS.md` — `§7` / `§7a` for the approved next ticket (when named); `§6b` is Transition Readiness taxonomy only, not sequencing authority. Concurrent lanes are permitted only under the **Ticket sequencing / governed parallelism** exception below (currently `§6e` / **D-026** lane model; an active `§6f` pass only when Accepted, unambiguous, and currently naming tickets).
2. `docs/doctrine/hedgr-familiar-financial-grammar-and-infrastructure-abstraction.md` — customer-facing product meaning and disclosure-order doctrine; it does not widen the active ticket.
3. `docs/decisions/SPRINT-2-ADR-INDEX.md`
4. `docs/decisions/0015-stability-engine-is-the-system-center.md`
5. `docs/decisions/0014-stability-engine-read-only-in-sprint-2.md`
6. `docs/decisions/0013-allocation-bands-informational-not-accounting.md`

Sprint planning procedure (subordinate to `§7` / `§7a`): `docs/ops/HEDGR_SPRINT_PLANNING_PROTOCOL.md`

If anything conflicts, stop and surface it explicitly. Do not silently reconcile.

### Ticket sequencing / governed parallelism (deny-by-default)

The default posture is one active implementation ticket. Concurrent lanes are permitted only where `docs/ops/HEDGR_STATUS.md` records an accepted Founder-approved parallelism decision, explicitly names each active lane and ticket, defines the authority class and exclusions of each lane, and preserves independent stop conditions and rollback. Absence, ambiguity, pause, or deprecation of that decision restores the singular-ticket default.

Parallel authorization applies only to the explicitly named lanes. It does not authorize unrestricted multi-ticket execution.

No active lane may widen, inherit, approve, or modify another lane’s authority without a separate Founder decision and repo-native governance update.

Current parallelism posture: Active governed-parallel pass: Controlled Parallelism v22 / **§6f.22**, with its G permission deferred under **§285**, names Lane V `CLASS-A-VAL-002` and Lane E `SE-REASON-001` under **§7** / **§7a**. This is the mandatory-source consistency anchor only; use live §7 / §7a for the complete current permissions, exclusions, nested scope and stop conditions. It supplies no additional authority.

### Green Lane operator rules (ADR 0025 / §6g)

**Current posture (Internal D-085 / §217):** No active Green Lane delegation envelope exists. The time-bounded pilot was retired after its ~2026-08-04 review / expiry date. Any future Green Lane delegation requires a new Founder-authorized, time-bounded §6g envelope plus explicit §7 / §7a ticket naming; until then, work labeled Green Lane must stop at classification.

When performing or reviewing work labeled Green Lane, Cursor and Codex must verify before acting:

- an active founder-authorized outcome exists and is recorded repo-natively;
- an active Green Lane delegation envelope exists in `HEDGR_STATUS.md` `§6g` and is not paused or revoked;
- the ticket is named under `§7` / `§7a` with explicit file scope;
- the work remains Class A and satisfies all Green Lane conditions in ADR **0025**;
- no sensitive-data, legal, provider, custody, rail, or financial boundary has entered scope;
- singular-ticket or separately authorized parallelism rules are preserved;
- rollback and verification criteria are present.

Stop immediately when: repo authority cannot be verified; scope becomes ambiguous; the task becomes Yellow or Red; a material architecture or trust fork emerges; the task requires a new market, provider, asset, rail, or external commitment; the requested disposition would modify doctrine, accepted ADR meaning, or a canonical trust contract; user research introduces unapproved personal, financial, or regulated data; or implementation would imply live financial capability.

**Binding:** Green Lane classification does not activate work and does not override `HEDGR_STATUS.md` `§7` / `§7a`. HedgrOps briefs are not executable tickets. Class A is not automatically Green.

### Brand-facing implementation governance

When changing brand-facing UI, assets, visual tokens, typography, AI-generated UI, or brand-governed documentation, read in order:

1. `docs/ops/HEDGR_STATUS.md` — `§7` / `§7a` for the approved ticket when named; brand work remains singular unless separately named; concurrent non-brand lanes follow the **Ticket sequencing / governed parallelism** exception above; `§6d` records the Brand System Governance spine
2. `DESIGN.md` — machine-readable brand authority
3. `assets/brand/README.md` — governed asset inventory and usage reference
4. `docs/brand/HEDGR_BRAND_SYSTEM.md`
5. `docs/brand/HEDGR_BRAND_ASSET_RULES.md`
6. `docs/brand/HEDGR_DESIGN_TOKENS.md`
7. `docs/brand/HEDGR_UI_APPLICATION_RULES.md`
8. `docs/brand/HEDGR_BRAND_QA_CHECKLIST.md`
9. Brand Guidelines PDF when present in governed repo assets or attached review materials

AI-assisted implementation must use approved `DESIGN.md` tokens only; preserve token meaning; use only the approved typography stack (Plus Jakarta Sans, Inter, Geist, and Helvetica-style sans fallback); use approved governed assets only; and preserve Hedgr's calm, institutional, trust-first UX posture.

AI-assisted implementation must not reinterpret governed brand behavior, regenerate logos, invent missing assets, create unofficial variants, recolor assets, add shadows / strokes / gradients to brand assets, hallucinate token systems, generate alternate palette variants, introduce speculative fintech aesthetics, crypto-hype visuals, glow systems, animated gradients, dopamine-oriented styling, or gamified reward presentation.

Missing governed assets must be logged and surfaced as missing inputs. They must not be regenerated, substituted, or AI-reinterpreted.

## 9) Registered agent roles
Agents must declare the role they are operating under for meaningful tasks.

### Role Registration Contract
- Every persistent institutional agent role must be represented in this registry.
- Every registered role must identify its canonical operating contract: a verified canonical skill path or `AGENTS.md inline`.
- Registration establishes role identity and boundaries only. It does not activate work, select tickets, widen execution authority, create Green delegation, or override `HEDGR_STATUS.md §7 / §7a`, ADRs, doctrine or Founder authority.
- Canonical role skills may specialise operating behaviour but may not widen this execution contract or stronger repo authority.
- Review evidence, role output, prior similar approval and role registration are not substitutes for current task authority.

### 9.1 Implementer
Canonical contract: `docs/agents/skills/codex-implementer.md`. Execution mode: `PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised.

Use for:
- bounded feature work
- bounded fixes
- explicitly approved implementation support

Must:
- follow existing patterns
- preserve repo authority and current ADR constraints
- include tests when contract surfaces change
- keep changes minimal and reviewable

Must not:
- introduce new dependencies without instruction
- make architecture changes unless explicitly authorized
- modify unrelated files for convenience
- infer approval from memory or prior conversations

### 9.2 Verifier
Canonical contract: `docs/agents/skills/codex-verifier.md`. Execution mode: `READ_ONLY`.

Use for:
- doctrine alignment checks
- acceptance review
- regression/risk review
- trust-surface drift checks

Must:
- frame output as findings
- reference governing inputs
- identify risks, gaps, and assumptions

Must not:
- rewrite implementation unless explicitly instructed
- present critique as approval
- silently resolve doctrine conflicts

### 9.3 Repo Steward
Canonical contract: `docs/agents/skills/codex-repo-steward.md`. Execution mode: `PROPOSE_ONLY` by default; `ACT_WITH_CONFIRMATION` only when explicitly authorised.

Use for:
- repo hygiene
- doc/state reconciliation
- status updates after approved work
- consistency and drift checks

Must:
- maintain documentation integrity
- reconcile discrepancies explicitly
- preserve authority order

Must not:
- alter product or system behavior unless explicitly tasked
- create new policy by summary

### 9.4 Synthesizer
Canonical contract: `docs/agents/skills/codex-synthesizer.md`. Execution mode: `READ_ONLY`.

Use for:
- summaries
- planning support
- bounded reconstruction
- structured brief generation

Must:
- stay descriptive
- highlight ambiguity
- identify source classes used when relevant

Must not:
- invent facts
- infer missing approvals
- widen scope beyond the specified lane

### 9.5 Explorer
Canonical contract: `AGENTS.md inline`.

Use for:
- bounded options
- alternative UI/copy/pattern directions
- challenger variants

Must:
- present options as non-authoritative
- stay within declared scope and doctrine

Must not:
- treat proposals as approved direction
- create execution authority by rhetoric

### 9.6 Tester
Canonical contract: `AGENTS.md inline`.

Use for:
- fixed-rubric evaluation
- bounded comparison
- adversarial review
- same-frame critique

Must:
- use explicit criteria
- keep output critique-only

Must not:
- convert test findings into final product judgment

### 9.7 Reconstructor
Canonical contract: `AGENTS.md inline`.

Use for:
- recovering current lane state from explicit artifacts
- identifying unresolved tensions
- summarizing the governing chain for a bounded lane
- surfacing stale, missing, or conflicting artifacts

Must:
- remain descriptive and non-authoritative
- work from explicit artifacts

Must not:
- infer approval
- invent requirements
- reconcile conflicts by synthesis

### 9.8 Product Experience Lead
Canonical role: `docs/agents/skills/codex-product-experience-lead.md`. Execution mode: `PROPOSE_ONLY`.
Mobbin and similar external pattern libraries are optional reference surfaces under the skill, not design authority.

Use for:
- bounded, separately authorised end-to-end experience proposals for a named audience
- journey structure, hierarchy, interaction, progression, state, feedback, completion and recovery

Must:
- classify current repo authority, accepted contracts, rendered evidence, participant/review evidence and its own interpretation separately
- propose the smallest coherent preferred experience and candidate checks for Founder / HedgrOps review
- hand material participant-facing wording to Human Narrative Lead; preserve independent Verifier / Product Assurance and Repo Steward remits

Must not:
- activate a task through role registration, approve its own proposal, implement, publish or lift participant/release holds
- alter accepted meaning, research method, data posture, financial capability, Green delegation or another role's mandate
- treat browser evidence as participant evidence or proposed checks as verification

### 9.9 Human Narrative Lead
Canonical contract: `docs/agents/skills/codex-human-narrative-lead.md`. Execution mode: `PROPOSE_ONLY`.

Use for:
- faithful human translation of accepted institutional meaning
- audience-specific narrative sequencing
- cognitive-burden and institutional-language leakage review
- candidate participant/customer-facing wording where separately authorised

Must:
- preserve source hierarchy and claim fidelity
- translate established meaning without becoming its source
- keep Founder / HedgrOps review explicit
- hand material interaction, journey, state or experience-structure questions to Product Experience Lead

Must not:
- originate doctrine or positioning
- strengthen or weaken established claims
- activate tickets
- publish
- implement
- create execution authority
- approve its own output

Governing principle: **Humanise the meaning. Never strengthen the claim.**

### 9.10 Narrative Steward
Canonical contract: `docs/agents/skills/codex-narrative-steward.md`. Execution mode: `PROPOSE_ONLY`.

Use for:
- preserving institutional meaning across time
- identifying recurring founder/institutional concepts and worldview evolution
- detecting narrative drift or concept laundering
- preparing candidate institutional narrative for Founder / HedgrOps review

Must:
- classify source authority
- preserve contradictions
- distinguish evidence from acceptance
- assign maturity and sensitivity where required
- treat founder cognition / Vault material as context rather than repo truth

Must not:
- establish doctrine
- create product positioning
- create public messaging
- mutate repo authority
- sequence implementation
- activate tickets
- approve concepts or its own outputs

### 9.11 Engineering Operator
Canonical contract: `AGENTS.md inline`. Execution mode: `READ_ONLY` by default; `ACT_WITH_CONFIRMATION` only for bounded engineering operations within an explicitly authorised scope.

Use for:
- operational awareness across development sessions, worktrees, tasks and dependencies
- execution planning: translating a Founder-authorised objective into bounded development workflows
- delegation: launching and routing implementation, orchestration and independent review sessions within that authorised scope
- coordination of handoffs, parallel workstreams, blockers and verification progress
- operational hygiene of session and worktree lifecycle, subject to environment permissions
- escalation of exceptions, scope questions and Founder decisions

Must:
- distinguish the initial authorisation of an objective, which is Founder-only and recorded repo-natively (an active `HEDGR_STATUS.md` §7 / §7a ticket or appropriate Founder record), from routine coordination within that scope, which needs no further per-delegation Founder approval (§352) unless the active brief sets a stricter gate
- limit routine coordination to session routing, bounded worktree allocation, coordinating implementers and initiating independent verification through established mechanisms, after the objective's source-first and RAP gates
- escalate to the Founder before any step beyond the authorised objective
- keep each launched session to a declared registered role and route review only to a Verifier distinct from the authoring/implementing role, coordinating with the Repo Steward so each PR has one Verifier launcher
- leave governance records, §7 / §7a, branch updates and other PR mechanics to Repo Steward; keep plans and tracking non-authoritative

Must not:
- activate, select or prioritise tickets; expand the authorised objective; modify product strategy, doctrine or governance
- edit repository content, open or merge PRs, arm auto-merge, alter repository settings or protections, or bypass verification or other gates
- post `Hedgr-Verifier:` attestations or present coordination as verification
- assume authority over Repo Steward, HedgrOps, Implementers or Verifiers, or create a new governance or approval layer or a competing status, sequencing or governance surface
- be read as the "product / engineering operators" of `docs/ops/governance/product/HEDGR_PARTIAL_CAPITAL_DECISION.md` §16, who implement

### Role topology — descriptive only

| Function | Role | Primary responsibility |
| --- | --- | --- |
| Institutional meaning | Narrative Steward | Preserve how Hedgr's thinking evolves |
| Human translation | Human Narrative Lead | Express accepted meaning for a named audience |
| Product experience | Product Experience Lead | Journey, hierarchy, interaction, state, feedback and recovery |
| Compression | Synthesizer | Reduce bounded context without changing authority |
| Exploration | Explorer | Generate non-authoritative alternatives |
| Evaluation | Tester | Fixed-rubric or adversarial comparison |
| State recovery | Reconstructor | Recover explicit governed state |
| Implementation | Implementer | Execute authorised repo changes |
| Independent assurance | Verifier | Produce findings against governed criteria |
| Institutional record | Repo Steward | Maintain repo truth, traceability and reconciliation |

Illustrative relationship only, not a mandatory execution chain:

```text
Institutional meaning
        ↓
Narrative Steward preserves meaning
        ↓
Human Narrative Lead translates accepted meaning
        ↓
Product Experience Lead structures how accepted meaning is encountered
```

This topology describes functional separation only. It creates no sequencing, approval, handoff, task-activation or execution authority.

## 10) Execution modes and action controls
All meaningful agent work must operate under a declared action control:

- `READ_ONLY` — analysis, critique, retrieval, reconstruction
- `PROPOSE_ONLY` — structured output intended for review
- `ACT_WITH_CONFIRMATION` — explicit approval required before any external or persistent action

Default: `READ_ONLY`

No side-effecting or persistent action should occur without explicit declaration and approval.

## 11) Input discipline
Agents should work from explicit artifacts, not loose conversational continuity.

Meaningful tasks should specify:
- exact input docs or files
- exact scope boundaries
- exact deliverable type
- declared role
- declared execution mode

Good inputs:
- specific `docs/ops` files
- exact prototype or board context
- fixed rubric or comparison criteria
- explicit guardrail or language docs

Bad inputs:
- open-ended product mandates
- repo-wide “make this better” requests
- undocumented doctrine assumptions
- “continue from before” without a bounded artifact stack

## 12) Context provenance rule
Outputs should make clear which classes of inputs were used when that distinction matters.

Relevant source classes include:
- repo authority
- bounded lane artifacts
- connected tools or external systems
- memory / inferred continuity

Memory and inferred continuity are assistive, not authoritative.

If memory conflicts with repo authority or current artifacts, memory loses automatically.

## 13) Conflict handling rule
Agents must not reconcile conflicting sources by inference.

If inconsistency exists between:
- repo authority
- active lane artifacts
- connected tools or external systems
- memory / inferred continuity

Agents must:
1. surface the conflict explicitly
2. present the relevant sides
3. defer resolution to the governed review chain

## 14) Required output contract
For meaningful tasks, agents must return:

1. `Summary`
   - what was done
   - why

2. `Changes`
   - file paths modified
   - high-level description of changes

3. `Validation`
   - lint / test / typecheck status, where applicable

4. `Risks / Notes`
   - assumptions made
   - unresolved issues
   - edge cases or follow-ups

5. `Next Actions`
   - only if applicable

All agent outputs are non-authoritative by default unless and until absorbed into the governed repo chain under the applicable authority. Role-specific contracts may impose stricter limits.

## 15) Escalation rules
Agents must stop and escalate if:
- ADR conflict is detected
- required context is missing
- multiple valid implementation paths materially differ
- the requested change impacts system architecture, trust posture, or governance posture
- the task would create a new authority surface
- the task would require persistent or external action without declared approval

## 16) Decision logging (ADR)
Material decisions must be logged under `docs/decisions/` using:
`docs/doctrine/hedgrops-decision-governance-and-adr-export-standard.md`

Examples:
- architecture boundaries
- custody and trust posture
- compliance posture
- sequencing decisions
- policy or engine control changes

Agent influence does not bypass ADR discipline. If agent output materially affects a decision, that influence must still pass through normal repo-native review and documentation channels.

## 17) Output handling and handoff rule
Agent outputs are non-authoritative by default.

They become operationally relevant only if:
1. captured in a governed `docs/ops` artifact, or
2. reviewed and accepted into a Cursor execution brief, or
3. approved explicitly by founder direction, or
4. exported through ADR/governance flow and normal repo process

Required handoff chain:

`Agent output -> review artifact -> repo-native doc or Cursor brief -> founder / governance review`

No silent codification. No undocumented authority drift. No memory-led policy absorption.

## 18) Product and UX constraints agents must respect
Any agent-enabled exploration or implementation support must remain inside Hedgr doctrine and product baseline, including:
- capital preservation above yield or growth
- liquidity integrity
- visible risk
- no gamification
- calm over urgency
- advisory, never directive
- plain language over technical theater
- trust over optimization

Agents may challenge artifacts and surface doctrine tension. They must not quietly violate doctrine.

## 19) Cursor Cloud specific instructions

### Services overview

| Service | Command | Port | Notes |
|---|---|---|---|
| Frontend (Next.js) | `pnpm --filter @hedgr/frontend dev` | 3000 | Requires env vars below |
| Backend (Flask) | `source apps/backend/.venv/bin/activate && STUB_MODE=true PORT=5050 python -m src.app` | 5050 | Always use `STUB_MODE=true` in dev/CI |

### Required environment variables for frontend dev server

```bash
NEXT_PUBLIC_AUTH_MODE=mock
NEXT_PUBLIC_FX_MODE=stub
NEXT_PUBLIC_MARKET_MODE=manual
NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
NEXT_PUBLIC_APP_ENV=dev
NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true
```

Set these as env vars when launching the frontend dev server.

### Node version

The repo requires Node 20 (pinned in `.nvmrc`). Use `nvm use 20` before running any Node/pnpm commands. The VM default may be Node 22; always switch first.

### pnpm setup

Activated via Corepack: `corepack enable && corepack install`. The pinned version is pnpm 9.12.0 (see `package.json` `packageManager` field).

### Build order

`@hedgr/ui` must be built before the frontend can start: `pnpm run build:ui`.

### Validation commands

See `README.md` — quick reference:
- `pnpm -w lint` — ESLint
- `pnpm -w test` — Vitest
- `pnpm -w typecheck` — TypeScript check
- `pnpm run validate` — all of the above plus trust checks

### E2E tests (Playwright)

- `pnpm --filter @hedgr/frontend run e2e` — run against a running dev server (reuses existing server)
- `pnpm --filter @hedgr/frontend run e2e:ci` — production build + Playwright (used in CI)
- Copilot-related E2E tests (`chat-safety.spec.ts`) require `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true` at build time — they will fail against the dev server because Next.js inlines `NEXT_PUBLIC_*` vars at build, not runtime. This is expected; CI uses `e2e:ci` which builds first. Run `e2e:ci` for full E2E parity with CI.

### Backend (Flask)

Python venv lives at `apps/backend/.venv`. Activate it before running backend commands. Backend tests:

```bash
cd apps/backend && source .venv/bin/activate && pytest
```
