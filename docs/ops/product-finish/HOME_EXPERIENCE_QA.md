# One Home experience — QA and delivery evidence

Last updated: 2026-09-28

Ticket: `CLASS-A-VAL-002-HOME-EXPERIENCE-001` (HEDGR_STATUS.md §7 / §7a). References: [HOME_EXPERIENCE_BASELINE.md](HOME_EXPERIENCE_BASELINE.md).

## Status and evidence boundary

This record supplies evidence, not authority. It covers T1 and T2 and the T2 reflow correction. T3–T5, the source-first completion and the final permanent-main RAP rebind remain open.

**Process deviation (recorded, not backdated).** §7a requires distinct governance and runtime QA for each tranche. T1 (#721) and T2 (#722) were merged by squash auto-merge under the Founder's runbook instruction before any distinct Verifier review. The Verifier's first finding, after both merges, was that this record did not exist and that the T1 evidence screenshots lived only in an untracked local folder. This is the third merge-before-verifier deviation on record (see §312, §314). From the T2 correction onward, runtime PRs are held from auto-merge until the Verifier reports.

The Implementer (Claude Code, Opus 5.5) authored the runtime, the test updates and this record. None of the checks below is an independent Verifier result.

## Authority and immutable provenance

| Step | PR | Merge commit | Notes |
| --- | --- | --- | --- |
| Source activation | [#719](https://github.com/mhibajene/hedgr-copilot/pull/719) | `040683e4e309f20f97869cafeed756d2891e849d` | 2026-09-27T15:27:41Z. Commits `c4dbda1` (source), `eeb4331` (branch RAP) |
| Permanent-main RAP rebind | [#720](https://github.com/mhibajene/hedgr-copilot/pull/720) | `c253579262cc019c3bc0e45ca18625d5a67dc536` | 2026-09-27T15:37:02Z, before any runtime edit |
| T1 — Home translation | [#721](https://github.com/mhibajene/hedgr-copilot/pull/721) | `1b1ca1e6f8b4d8f3544a9a48987b737603d0be48` | 2026-09-28T00:19:51Z, squash auto-merge. Runtime `303a0a5`, test `a748172` (head). Merged tree identical to head |
| T2 — receipts, next step, step thread | [#722](https://github.com/mhibajene/hedgr-copilot/pull/722) | `4c99e0b95bdbb8a7a70573abca24cf625e1a8cba` | 2026-09-28T00:41:59Z, squash auto-merge. Runtime `dd1bc5a`, test `cd3dbf3` (head). Merged tree identical to head |
| T2 correction | this PR | pending | Runtime `cb049e0`, test `b01a7f5`, then this record. Held for Verifier review |

## Validation

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

## Not yet covered

§7a's acceptance matrix is wider than the evidence above. Not yet inspected for T1/T2: live-mode wording in a browser (unit-covered only; production runs simulated); 1280px shipped (1280 was inspected locally for T1 only); keyboard order and focus through the receipts and next-step panel; long amounts on the receipts; the pending state; full withdrawal and reset on the default route; the simulated deposit failure in a browser. These should be completed by the distinct Verifier before the ticket's completion record.

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

`shipped-m390-journey-home.png` and `t1-local-mobile-journey.png` are byte-identical: the shipped journey Home at $0 matches the pre-merge T1 capture.

**NO CROSS-LANE IMPACT.**
