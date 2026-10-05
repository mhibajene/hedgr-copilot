# One Home experience — QA and delivery evidence

Last updated: 2026-10-05

Ticket: `CLASS-A-VAL-002-HOME-EXPERIENCE-001` (HEDGR_STATUS.md §7 / §7a). References: [HOME_EXPERIENCE_BASELINE.md](HOME_EXPERIENCE_BASELINE.md).

## Status and evidence boundary

This record supplies evidence, not authority. It covers all five tranches, the three corrections (#724, #728 amendment, #732) and the closeout inspection of Production at `39de4b6` (see [Closeout](#closeout-shipped-inspection-production-39de4b6)). The source-first completion (§327) and its separate permanent-main RAP rebind follow this record.

**Process deviation (recorded, not backdated).** §7a requires distinct governance and runtime QA for each tranche. T1 (#721) and T2 (#722) were merged by squash auto-merge under the Founder's runbook instruction before any distinct Verifier review. The Verifier's first finding, after both merges, was that this record did not exist and that the T1 evidence screenshots lived only in an untracked local folder. This is the third and fourth merge-before-verifier deviations on record (#721 and #722; see §312, §314, §326). From the T2 correction onward, runtime PRs are held from auto-merge until the Verifier reports.

The Implementer (Claude Code, Opus 5.5) authored the runtime, the test updates and this record. The checks in this record are the Implementer's, not independent Verifier results. Verifier attestations are cited from the PR records. #721 and #722 have no pre-merge attestation; their §326 retrospective verifications are recorded (#721 PASS WITH NOTES on `1b1ca1e`; #722 FAIL on `4c99e0b`, with technical defects remediated by #724). The merge-before-verifier process deviations remain. This record does not substitute for those verdicts.

## Authority and immutable provenance

| Step | PR | Merge commit | Notes |
| --- | --- | --- | --- |
| Source activation | [#719](https://github.com/mhibajene/hedgr-copilot/pull/719) | `040683e4e309f20f97869cafeed756d2891e849d` | 2026-09-27T15:27:41Z. Commits `c4dbda1` (source), `eeb4331` (branch RAP) |
| Permanent-main RAP rebind | [#720](https://github.com/mhibajene/hedgr-copilot/pull/720) | `c253579262cc019c3bc0e45ca18625d5a67dc536` | 2026-09-27T15:37:02Z, before any runtime edit |
| T1 — Home translation | [#721](https://github.com/mhibajene/hedgr-copilot/pull/721) | `1b1ca1e6f8b4d8f3544a9a48987b737603d0be48` | 2026-09-28T00:19:51Z, squash auto-merge. Runtime `303a0a5`, test `a748172` (head). Merged tree identical to head |
| T2 — receipts, next step, step thread | [#722](https://github.com/mhibajene/hedgr-copilot/pull/722) | `4c99e0b95bdbb8a7a70573abca24cf625e1a8cba` | 2026-09-28T00:41:59Z, squash auto-merge. Runtime `dd1bc5a`, test `cd3dbf3` (head). Merged tree identical to head |
| §7a evidence allowlist amendment | [#725](https://github.com/mhibajene/hedgr-copilot/pull/725) | `9f71097bd924` | Adds `home-experience-qa/*.png`. Verifier PASS `f8026d2` |
| T2 correction and this record | [#724](https://github.com/mhibajene/hedgr-copilot/pull/724) | `5ab40b419c4a` | Runtime `cb049e0`, test `b01a7f5`, record `4312271`. Verifier FAIL `4312271` (image folder not allowlisted, resolved by #725), then PASS `712028c` |
| §7a verification amendment | [#728](https://github.com/mhibajene/hedgr-copilot/pull/728) | `82de5e7274e5` | Allows one superseded assertion in `stability-scenarios.spec.ts`. Verifier PASS `3cea37c` |
| T3 — since last visit, position line, first use, loading, date line | [#729](https://github.com/mhibajene/hedgr-copilot/pull/729) | `e1c6789e922f946333c96d42c8210fa6fc4cc82b` | Runtime `1033cd7`, fix `2e7e599`; tests `c08a25b`, `00e6615`, `4a4a52a`. Verifier FAIL `c08a25b` (reset rewrote the last-visit value), PASS `00e6615` and `cb2640f` (head after Update branch) |
| T4 — Activity entry thread | [#730](https://github.com/mhibajene/hedgr-copilot/pull/730) | `4dcc74f910d1aae179c3e6d638e82e389d7183f0` | Runtime `062a8ea`, tests `3a40254`. Verifier PASS `3a40254` |
| T5 — arrival motion | [#731](https://github.com/mhibajene/hedgr-copilot/pull/731) | `3aa035ac3c2cc857879e9e01fb72d87a944ed619` | Runtime `f2b4d08`, tests `eb06b89`. Verifier PASS `eb06b89` |
| T3/T5 wallet-mode correction | [#732](https://github.com/mhibajene/hedgr-copilot/pull/732) | `39de4b651db7c2fc92878da528bb2868b0d8e63a` | Runtime `2b0c3bb`, tests `b8509ac`. Verifier FAIL `b8509ac` (PR body named the wrong rollback commit; corrected), then PASS on the same head |

## Validation

Archive note (2026-10-05): pending cells in this mid-delivery table are historical; the closeout records the final results.

| Check | T1 (#721) | T2 (#722) | T2 correction |
| --- | --- | --- | --- |
| Lint, typecheck (local) | pass | pass | pass |
| Frontend unit tests (local) | pass | 909/909 | 909/909 (no unit change) |
| Production build + hermetic browser suite (local, `NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true`) | 127/127 | 127/127 | 128/128 (one new test) |
| Hosted checks on head | all pass: validate, build, e2e, E2E smoke, fork-safe typecheck/lint, evidence-pack, Vercel, Vercel Preview Comments, PR Convergence Review | same set, all pass | pending |
| Vercel Production deployment of merge commit | `6699859785`, success, 2026-09-28T00:20:39Z | `6700071345`, success, 2026-09-28T00:42:53Z | pending |
| Distinct Verifier | not performed before merge | not performed before merge | requested |

The new T2 correction test was run against the unfixed runtime first and failed (document width 380 vs viewport 320), then passed with the fix.

## Shipped inspection (T1 + T2 at `4c99e0b`)

Public alias `https://hedgr-copilot-frontend.vercel.app`, 2026-09-28 ~09:14 AWST, fresh isolated Chromium contexts, mock sign-in. The production build runs as a simulated environment. Only journey-mode (`?journey=class-a-val-002`) confirmations were made; they write browser-local state only and call no server. Each context was reset afterwards.

| Viewport | Checks | Result |
| --- | --- | --- |
| 390 × 844 | default Home, journey Home, deposit receipt, withdrawal receipt, Activity, Home after, rate unavailable | USD 0 → 5 → 3 on receipts and Home; receipt rows as locked; next-step panels and hrefs correct; `Step 2 of 4 · First event`; reason line present; no horizontal overflow; 0 page errors |
| 1440 × 1024 | same | same result; header navigation with Copilot grouped; no overflow; 0 page errors |
| 320 × 800 at 200% root text | same | all surfaces fit **except rate unavailable: 60px horizontal overflow** (finding T2-1) |

Receipt text observed (390, 1440 and 320@200% identical apart from time):

- Deposit: "You added $5.00 to your simulated balance · Recorded · Today, 09:14 · Amount ZMW 100.00 · Shown as +$5.00 · Example rate 1 USD = 20.00 ZMW · Balance $0.00 → $5.00 · Real money moved None", then "Try a simulated withdrawal".
- Withdrawal: "You took $2.00 out of your simulated balance · … · Amount ZMW 40.00 · Shown as −$2.00 · … · Balance $5.00 → $3.00 · Real money moved None", then "Check the evidence".

### Finding T2-1 — rate-unavailable headline overflow (corrected here)

Archive note (2026-10-05): pending cells in this mid-delivery record are historical; the closeout records the final results.

T2 placed the new pause disc and the panel headline in a non-wrapping flex row. At 320px with 200% text the headline could not shrink below "temporarily", so the document grew to 380px. Default (non-journey) Deposit did not overflow. The correction lets the row wrap, so the headline moves below the disc when it cannot fit, and wraps long words. At normal widths the layout is unchanged ([fix-rate-panel-390.png](home-experience-qa/fix-rate-panel-390.png)). At 320px with 200% text the panel content area is about 140px, so the heading breaks inside words ([fix-rate-panel-320x200.png](home-experience-qa/fix-rate-panel-320x200.png)); this is the reflow fallback, and no copy changes. Shipped re-inspection of the correction is pending its merge.

## Comparison with the accepted references

| Reference | Shipped evidence | Assessment |
| --- | --- | --- |
| 03 / 13 Home (T1 layout only) | [390 journey](home-experience-qa/shipped-m390-journey-home.png), [1440 after](home-experience-qa/shipped-d1440-journey-home-after.png), [390 default](home-experience-qa/shipped-m390-default-home.png), [1440 default](home-experience-qa/shipped-d1440-default-home.png) | T1 layout matches: context line, filled deposit, quiet View Activity / Simulate a withdrawal, underlined current tab. "Since you were last here", the position line, change chip and date line belong to T3 and are correctly absent |
| 06 Deposit recorded | [390](home-experience-qa/shipped-m390-deposit-recorded.png) | Receipt, rows and next-step panel match. White page background retained (ivory is Home/Activity/Settings only) |
| 07 Withdrawal recorded | [390](home-experience-qa/shipped-m390-withdraw-recorded.png) | Match, including the Balance before → after row |
| 09 Rate unavailable | [390](home-experience-qa/shipped-m390-rate-unavailable.png), [320@200% defect](home-experience-qa/shipped-m320x200-rate-unavailable.png) | Labels and the four existing lines verbatim; "Retry rate" kept; reason line present. Overflow at 320@200% (T2-1) |
| 10 Confirmation failed | not reproducible on the shipped alias | Covered by unit tests only (`deposit.page.test.tsx`) |
| 08 Activity | [390](home-experience-qa/shipped-m390-activity.png) | T4 scope; unchanged as expected |

Full-page captures render the fixed bottom navigation at its viewport position, overlapping content in the image only.

## Not yet covered (T1/T2 record, superseded)

At T2 time the gaps were: live mode in a browser, shipped 1280px, keyboard order and focus, long amounts, the pending state, full withdrawal and reset on the default route, and the simulated deposit failure in a browser. The closeout inspection below covers all of them except live mode and the deposit failure state, which remain unit-covered only.

## Closeout shipped inspection (Production `39de4b6`)

Public alias `https://hedgr-copilot-frontend.vercel.app`, 2026-09-28T12:14Z, after GitHub Production deployment `6709548499` (success) of #732. Fresh isolated Chromium contexts, mock sign-in, simulated actions only. Production runs as a simulated environment with `NEXT_PUBLIC_BALANCE_FROM_LEDGER=false` (wallet balance mode), confirmed by probe. The same script also passed 120/120 against a local wallet-mode build before #732 merged.

**Result: 120/120 checks passed, 0 page errors.**

Local validation at closeout (`main` at `39de4b6`): typecheck and lint pass; 923/923 unit tests; production build plus 132/132 browser tests with `--retries=0`.

| Area | Viewports / conditions | Checked |
| --- | --- | --- |
| Journey route, full flow | 390 × 844, 1280 × 900, 1440 × 1024, 320 × 800 at 200% root text | First use and caption; `?reset=1` clears `hedgr:last-home-visit`; deposit receipt `$0.00 → $5.00`; first-event Home without a prior visit; withdrawal receipt `$5.00 → $3.00`; Activity day balance `$3.00`, start line and two-entry next step; "One simulated withdrawal of $2.00 … from $5.00 to $3.00."; arrival sentence; settled balance; no change on reload with no sentence; full withdrawal `$3.00 → $0.00` on receipt, Home and Activity (no next step); "Restart simulated journey" clears the value; no horizontal overflow at every step |
| Default route | 390 × 844, 1440 × 1024 | First use without journey step names; context line; "Two things changed … from $0.00 to $3.00."; no estimate sentence; Activity day balance; transaction dialog closes on Escape; no overflow |
| Keyboard | 390 journey Home after a change | Tab order: simulation disclosure → logo → Home → Activity → Settings → display currency → See the entry → Add simulated deposit → View Activity → Currency context → Planning targets → Important disclosures; visible focus on every stop |
| Dialog | Currency context | Escape closes and returns focus to the trigger |
| Rate unavailable | Journey Deposit | Reason line; labelled rows; no overflow at 320 at 200% (finding T2-1 fixed) |
| Pending | Seeded pending deposit | T3 surfaces fall back (no chip, no "since"); Activity shows the status pill. In wallet mode `total = available`, so no "Available in simulation" line; that is pre-existing wallet-mode behaviour |
| Long amounts | `$123,456,789.12` at 320 at 200% | No overflow on both Homes and both Activity routes |
| T5 motion | 390, fake clock, client-side arrival | 0 ms `$5.00` (chip opacity 0, no sentence) → 200 ms `$3.62` → 400 ms `$3.09` → 700 ms `$3.00`, chip opacity 1, "Your position is now $3.00, $2.00 lower than on your last visit." |
| Reduced motion | `prefers-reduced-motion: reduce` | First frame shows `$3.00`; chip `animation-name: none` |

### Comparison with the accepted references (closeout)

| Reference | Production evidence | Assessment |
| --- | --- | --- |
| 01 First use | [390](home-experience-qa/closeout-m390-01-first-use.png) | Match: date line, "No simulated activity yet.", empty line, "Start here" with four steps, deposit plus "How this simulation works" |
| 03 / 13 One change | [390](home-experience-qa/closeout-m390-04-home-one-change.png), [1440](home-experience-qa/closeout-d1440-04-home-one-change.png), [320 at 200%](home-experience-qa/closeout-m320x200-04-home-one-change.png) | Match: chip, line with last-visit marker and rust segment after it, "Since you were last here", "See the entry" |
| 04 / 05 No change / several | [default 390, several](home-experience-qa/closeout-dm390-06-default-several.png) | Match, except the several-changes list omits the reference's exchange-rate row (not a ledger entry; §7a derives "since" from ledger entries only). On the default route the existing "Latest change" strip (decision 4) sits above the observation, so the latest entry appears twice |
| 08 Activity thread | [390](home-experience-qa/closeout-m390-03-activity.png), [1440](home-experience-qa/closeout-d1440-03-activity.png), [default 1440](home-experience-qa/closeout-dd1440-07-default-activity.png), [320 at 200%](home-experience-qa/closeout-m320x200-03-activity.png), [long amount](home-experience-qa/closeout-m320x200-09-long-amount-activity.png) | Match. The reference's "Start again with a clean simulation" is not in the copy register and is omitted. Below a 20rem container the rail and icons drop so entries keep their width |
| 11 / 12 Motion | [0 ms](home-experience-qa/closeout-motion-0ms.png), [200 ms](home-experience-qa/closeout-motion-200ms.png), [700 ms](home-experience-qa/closeout-motion-700ms.png) | Match the storyboard (reference `$3.59` at 200 ms; measured `$3.62`, frame granularity) |

### Findings during delivery (all resolved in code, or recorded)

- **T2-1:** rate-unavailable overflow at 320 at 200%. Fixed in #724.
- **T3 Verifier FAIL:** reset rewrote the last-visit value. Fixed before #729 merged.
- **T4 visual checks:** the legacy Activity link rule made the new pill invisible, and pills broke letter by letter at 320 at 200%. Both fixed in #730; the pill fix also cleared a 3px T2 overflow on "Continue to simulated withdrawal".
- **T3/T5 in wallet mode:** did not render in Production until #732. CI and all local runs build the ledger default only; wallet-mode CI coverage needs a separate decision. A wallet-mode build also fails one pre-existing ledger-only assertion (`currency-insight.spec.ts` pending presentation).
- **Scope:** #722 edited `critical.spec.ts` and `empty-error-states.spec.ts`, outside the §7a verification allowlist.
- **Watch:** `empty-error-states.spec.ts` one-shot `isVisible()` flake under full-suite load; outside this ticket.

## T1 pre-merge local captures

Captured from the local production build of `a748172` before #721 merged, previously held only in an untracked folder: [mobile default](home-experience-qa/t1-local-mobile-default.png), [mobile journey](home-experience-qa/t1-local-mobile-journey.png), [desktop default](home-experience-qa/t1-local-desktop-default.png), [desktop journey](home-experience-qa/t1-local-desktop-journey.png).

## Image integrity

| File | Pixels | SHA-256 |
| --- | --- | --- |
| `fix-rate-panel-320x200.png` | 224 × 2890 | `63c2df8529a4337664152aa91e58ee2001b397c4ff18cd3f842e6eb4c9de5fc9` |
| `fix-rate-panel-390.png` | 342 × 599 | `87ae2617c108a27eff75bbbb69b29127c9dab6456a2a992c62a559ac00942a5e` |
| `shipped-d1440-default-home.png` | 1440 × 1119 | `724fe79a139cb304a70a7f0a79f87fc7859d9c9e63cd6b61db60ac8681d1ebc0` |
| `shipped-d1440-journey-home-after.png` | 1440 × 1224 | `c23ff61ef0dc970105294c3e27ba5f956e5df353802a7021deb0f0ee4b83a3c7` |
| `shipped-m320x200-rate-unavailable.png` | 380 × 5085 | `8cdb5da18d6a4906820a5c1d39d5657a95109f68be05bc6406c718b05d85ba19` |
| `shipped-m390-activity.png` | 390 × 973 | `36d3056fd11ea21c8ed487054a4529187d42a675b64370117dd50677cf13d836` |
| `shipped-m390-default-home.png` | 390 × 1065 | `afbb3d6a2300f3cc164f3b9d1dee585e7b7a7aec72c998917171255e2206ba99` |
| `shipped-m390-deposit-recorded.png` | 390 × 1611 | `fba348d42bb345d8e05db2b8ce60524a507bc663fe5d5b7351a9a3f35ac038ce` |
| `shipped-m390-journey-home.png` | 390 × 956 | `48bcabfb6c32209537b4e9498fc6fde8b230b24042260a3a33782a0b7e562f5e` |
| `shipped-m390-rate-unavailable.png` | 390 × 1263 | `dc73c65d0bde2d400c61a962bb3670df4ebb2cbc9e69c4e58b25609cbcf619df` |
| `shipped-m390-withdraw-recorded.png` | 390 × 1667 | `ed801f2b07cf8d7d8d05603fdb98c20a4bc9c959e74ef2acadac5e16d56f9509` |
| `t1-local-desktop-default.png` | 1280 × 1119 | `75580fa2cfd587c8cba88da0921877614e0edc2d6fd3cac54caf49373117964d` |
| `t1-local-desktop-journey.png` | 1280 × 1001 | `499a5fb3f01e1c2dc1e5cc36cb7af6873955a88361e3112a81528e080dcbb82f` |
| `t1-local-mobile-default.png` | 390 × 1065 | `d149e9ec8137849f31556e15007463e335555d4205a363b188bbcedd2c53cfd8` |
| `t1-local-mobile-journey.png` | 390 × 956 | `48bcabfb6c32209537b4e9498fc6fde8b230b24042260a3a33782a0b7e562f5e` |
| `closeout-d1440-03-activity.png` | 1440 × 1079 | `dac52af5d966f0855d4a869903cbcb30f0c4d2e38b5d3d1f400c91665cbf3d9d` |
| `closeout-d1440-04-home-one-change.png` | 1440 × 1430 | `137f8b075bda9540cf997ae75c2eb556726be873aa5f9fe4ed5ad34c49a2794c` |
| `closeout-dd1440-07-default-activity.png` | 1440 × 1120 | `c7d891819e8084e355b0c765ac9f538be8c8e103fa4467ff5b2e0cfccd675398` |
| `closeout-dm390-06-default-several.png` | 390 × 1734 | `3da53afb81e826e73cb7bc30b9ca1920ae1e5648cb54f7df2f3b87d3c81ebb09` |
| `closeout-m320x200-03-activity.png` | 320 × 3088 | `3ca2fc93a41905f837659e8a5ada34f0c3d5b54cf503b07fd64c6c54fb6f4187` |
| `closeout-m320x200-04-home-one-change.png` | 320 × 4992 | `ba4297383e8c4984ba6bce9c873a35e76d8959012472bfc4c4d0459ab80cf669` |
| `closeout-m320x200-09-long-amount-activity.png` | 320 × 3715 | `ffe8fa953198b884801a3f42be4be93d2853e54e363d60d87a1107242eb7aa77` |
| `closeout-m390-01-first-use.png` | 390 × 1249 | `388e513206d57c7d18eb742a37bc70b3284d2962b3cdd1864195a7d53af37a4f` |
| `closeout-m390-03-activity.png` | 390 × 1068 | `fa992c911f6767e3311420dd381703e062fd21ed1726f60fe5de17a076b6a639` |
| `closeout-m390-04-home-one-change.png` | 390 × 1575 | `7a7e5377ded19f61c4c6d1bca930911d6dcf6e711d07046e4272a28cf2e700c4` |
| `closeout-motion-0ms.png` | 390 × 420 | `ba591ecccab1d78e44a109e840352ecc1b564b7bf99688150e93335d25385fae` |
| `closeout-motion-200ms.png` | 390 × 420 | `a611fc083df4ed7b696cd1ca33bcd9a488587a9e8ba68546ecac55e33b2f616d` |
| `closeout-motion-700ms.png` | 390 × 420 | `258868916656409fbdeb11d3e2ea0850c04e687496abeb42ef8d7ee000662847` |

`shipped-m390-journey-home.png` and `t1-local-mobile-journey.png` are byte-identical: the shipped journey Home at $0 matches the pre-merge T1 capture.


## HOME-DEDUP-001 (§328) — default Home deduplication

Finite follow-up ticket `CLASS-A-VAL-002-HOME-DEDUP-001`, directed by the Founder after the §327 closeout. It was delivered in two runtime PRs; every PR merged after an independent Verifier PASS on its exact head.

| Step | PR | Merge commit | Notes |
| --- | --- | --- | --- |
| Source (§328) | [#735](https://github.com/mhibajene/hedgr-copilot/pull/735) | `22d09a03eeff` | PASS `4001637`, then `7b47202` after a generated-RAP conflict with `main` was resolved |
| RAP rebind | [#737](https://github.com/mhibajene/hedgr-copilot/pull/737) | `3e388b5c5736` | PASS `e22dcf2` |
| Remove "Latest change" strip | [#738](https://github.com/mhibajene/hedgr-copilot/pull/738) | `cbfb05ce0716` | Runtime `af0f76f`, tests `fa49420`; PASS `fa49420`; Production `6713948792` success |
| Amendment (§328 decision 3) | [#739](https://github.com/mhibajene/hedgr-copilot/pull/739) | `b07a4eb0dd39` | PASS `8e559e6` |
| RAP rebind | [#740](https://github.com/mhibajene/hedgr-copilot/pull/740) | `23b4f81f1fb9` | PASS `34fb004` |
| Hide overlapping Recent activity | [#741](https://github.com/mhibajene/hedgr-copilot/pull/741) | `d51277cefa7b` | Runtime `508af04`, tests `94196e5`; PASS `94196e5`; Production `6723529926` success |

**Production inspection (`d51277c`, 2026-09-29):** 32/32 checks passed at 390 × 844 and 1440 × 1024, with no overflow and no page errors. Contexts used mock sign-in with seeded browser-local entries (deposit $5, withdrawal $2, plus a pending $1 in the pending case).

| State | "Latest change" strip | Recent activity |
| --- | --- | --- |
| No previous visit | absent | shown |
| One change since the last visit | absent | hidden |
| Several changes since the last visit ([390](home-experience-qa/dedup-default-390-several-changes.png), [1440](home-experience-qa/dedup-default-1440-several-changes.png)) | absent | hidden |
| No change since the last visit ([390](home-experience-qa/dedup-default-390-no-change.png), [1440](home-experience-qa/dedup-default-1440-no-change.png)) | absent | shown |
| Pending entry ([390](home-experience-qa/dedup-default-390-pending.png), [1440](home-experience-qa/dedup-default-1440-pending.png)) | absent | shown, and the pending +$1.00 is listed |
| Journey Home (control) | absent | not rendered (unchanged) |

**Caveat:** at 1440px the "no previous visit" case rendered as "no change", because the harness's login step landed on `/dashboard` and recorded a visit. Recent activity was correctly shown in both states. The "no previous visit" state is covered at 390px and by unit tests.

**Balance mode:** the probe (ledger $5, wallet $7) showed $7.00, so Production still runs wallet mode. The Founder-owned §328 ledger switch is outstanding, and this inspection exercised the #732 wallet-mode guard. Re-run the probe and this inspection after the switch.

### Image integrity (HOME-DEDUP-001)

| File | Pixels | SHA-256 |
| --- | --- | --- |
| `dedup-default-1440-no-change.png` | 1440 × 1409 | `489aa0dc2dc2b07c54ea52a46b14ce519676490321441a6232655a5695ae4a24` |
| `dedup-default-1440-pending.png` | 1440 × 1412 | `b1e138fc176f6c643288bb3728e43a27a74da202a295a71be6d826eb8196058e` |
| `dedup-default-1440-several-changes.png` | 1440 × 1281 | `f41d5103943664909a6be6ff52b6a74324bb00898283c4befeb82059c92bcfc8` |
| `dedup-default-390-no-change.png` | 390 × 1449 | `a7cdc304485fddb6947e15447686d2a7115c016d86a1ad519d5e113d9a309809` |
| `dedup-default-390-pending.png` | 390 × 1363 | `eef67fa0faa297f361a35f75ab648f41be283576e8ff4be8a35be0df75259c50` |
| `dedup-default-390-several-changes.png` | 390 × 1441 | `6c0784181252a413bb4e777d5f03e05f1d8f079376e3ad7776152c1d5e972c11` |

**NO CROSS-LANE IMPACT.**
