# Synthetic Home card tint — independent QA

Date: 2026-09-18. Scope: the finite Home tint amendment within `CLASS-A-VAL-002-WEEKEND-PREP-001`, governed by HEDGR_STATUS.md §7 / §7a. Role: independent Verifier, distinct from the runtime implementer. This note supplies review evidence, not execution or release authority.

## Candidate and authority

- Authority PR #558 merged at `f260184`; the separate permanent-main projection rebind PR #560 merged at `bb163b7` before CSS implementation.
- Reviewed runtime commit: `5bee5984c6beefd0c85c91513d1e721990f6feed`.
- Runtime scope is one file, `apps/frontend/app/(app)/dashboard/synthetic-home.module.css`: two CSS declarations and their comment. This evidence is a subsequent separate QA change; the implementer will preserve separate runtime and QA commits.

## Independent source and visual review

The two declarations match the approved limits exactly: `.positionPanel` uses the existing primary token at 8% opacity and `.observation` uses the existing observation-emphasis token at 10%, each with zero offset, zero blur and 4 CSS px spread. No other selector, palette value, fill, dimension, spacing, radius, text, asset, focus rule or behavior changed. The treatment is a static matching perimeter with no gradient, animation or blurred glow. Existing 18px minimum horizontal inset and 16px inter-card gap leave clearance around the 4px perimeter. It does not paint over the card interior, so existing foreground/background contrast pairs are unchanged.

Independently inspected the before mobile/desktop images in `/Users/musalwa/.codex/visualizations/2026/09/18/01a0b2aa-818e-7751-bf08-2a0a6cbb0da2/hedgr-home-tint/` and the following candidate browser-run images under `apps/frontend/test-results/`:

- `wallet-redesign-research-b-69eb5-on-preserve-financial-state-chromium/home-390.png`.
- `wallet-redesign-research-H-0df14-enlarged-and-desktop-widths-chromium/home-320.png` and `home-1280.png`.
- `wallet-redesign-polished-H-40be3-ng-and-research-disclosures-chromium/home-accordions-open-390.png`.

The narrow/mobile and desktop images show a faint matching perimeter around both cards, retained navy/warm interiors, unchanged hierarchy and readable wrapping. No edge clipping, competing status meaning or obscured focus is visible. Expanded planning percentages and research disclosures remain present, and the planning focus outline is visible. The before images use a different simulation balance/currency and capture framing from the automated fixtures; this was a visual/source comparison, not a pixel-identical comparison of every position.

Fixed bottom navigation appears inside full-page screenshot composites and can cover part of that static image. That is a capture limitation, not independent evidence that the underlying controls became inaccessible. The passing browser interaction and reflow checks below provide the functional evidence; this review makes no physical-phone or Safari claim.

## Check results independently verified from logs

- `/tmp/hedgr-tint-runtime-validate.log`: full validation passed, including 900 frontend tests across 73 files, 41 Bridge tests, typecheck and lint. Existing test-fixture warnings remain visible in the log; there were no failed tests.
- `/tmp/hedgr-tint-runtime-build.log`: production build compiled successfully and completed route generation.
- `/tmp/hedgr-tint-runtime-e2e.log`: all 101 hermetic browser tests passed in 1.2 minutes with the usual four workers; no failed-test rerun was needed for this tint candidate.

The unchanged browser suite covers 320/390/1280px and 100%/200% text, expanded accordions, native Enter/Space operation and focus retention, retained planning/disclosure content, comparison-dialog return, currency selection, route isolation and financial-state preservation. Existing transaction and reset coverage ran unchanged. No new tests, relaxed assertions or runtime behavior changes were introduced for this decorative pass.

## Disposition and remaining delivery

No blocking source, visual or local functional finding. Local QA accepts the candidate for the governed implementation PR. Hosted checks, merge, deployment and shipped verification remain pending at this evidence checkpoint; their exact commit mapping and outcomes must be recorded in that implementation PR's delivery record before claiming verified delivery.

Verified delivery consumes this one-pass tint permission only. It does not close the weekend ticket or reopen HOME-POLISH-001 or runtime PR #549. Draft #550, its unfinished Form, remaining instrument/rehearsal/release duties, Lane G/E scope, frozen About and financial boundaries remain unchanged. No Form work, participant publication/distribution, comprehension claim or new financial capability follows.

## Founder-requested softening correction — 2026-09-18

This section appends a new verification checkpoint without changing the first-pass history above. After PR #561 delivered the first tint, the Founder explicitly requested “make it more subtle like the Activity card”. The fresh, finite correction was recorded through authority PR #562 (`c319e54`) and separate projection-only permanent-main rebind PR #563 (`e47e75f`) before runtime. It remains inside `CLASS-A-VAL-002-WEEKEND-PREP-001`; Activity is a visual reference only.

### Candidate and independent findings

Reviewed runtime commit `cf23d7263525525c899d20c659c82c2b1aa7c401`. Its only runtime changes are the two existing Home card shadow declarations: spread 4px→1px, balance primary opacity 8%→4%, observation emphasis opacity 10%→5%. Zero offset/blur, existing tokens and both named selectors are retained. No card fill, geometry, typography, focus rule, asset, Activity styling, behavior or financial state code changed. Smaller outside perimeters increase clearance and leave the existing text/background contrast pairs unchanged.

The distinct Verifier inspected `/Users/musalwa/.codex/visualizations/2026/09/18/01a0b2aa-818e-7751-bf08-2a0a6cbb0da2/hedgr-home-soft-tint/local-mobile.png` and `local-desktop.png`. The edge is visibly quieter than the first-pass 4px ring; navy/warm interiors and balance/observation hierarchy remain. No new clipping or visual defect was apparent. The displayed zero balance and completed-withdrawal observation are the local simulation state, not prescribed design copy or a replacement fixture. These viewport captures do not establish physical-phone/Safari behavior.

The implementer separately checked computed styles at exactly 1px / 4% / 5%, with no nested-header shadow; both accordions opened with retained planning/disclosure content, then Enter/Space closed them with focus retained. At a 320px viewport, the measured document scrollWidth and clientWidth were both 305px. These are attributed implementer checks, distinct from the independent source, image and log inspection here.

### Checks and retained failure evidence

- `/tmp/hedgr-soft-runtime-validate.log`: independently confirmed 900 frontend tests, 41 Bridge tests, typecheck and lint passed.
- `/tmp/hedgr-soft-runtime-e2e.log`: the production build compiled successfully and completed route generation. The first browser run passed 100/101; the sole failure was the existing default-route `empty-error-states.spec.ts:97` immediate no-funds/form visibility assertion.
- The Verifier independently opened that first error-context: the main region contained only the Withdraw heading. The unchanged helper waits DOMContentLoaded plus a fixed 500ms before taking non-retrying visibility snapshots; unchanged Withdraw has a heading-only loading branch. This is consistent with the previously observed readiness race. Resource contention is not a proven cause, and no claim is made that this existing test race was repaired. The implementer preserved the snapshot at `/tmp/hedgr-soft-withdraw-first-failure.md`.
- `/tmp/hedgr-soft-runtime-e2e-confirm.log`: independently confirmed the unchanged full suite passed 101/101 in 1.3 minutes with the usual four workers and without simultaneous validation. No test relaxation, timeout increase, assertion change or runtime change occurred between these runs.

The unchanged browser suite retains narrow/enlarged-text, native accordion/focus/content, modal return, route-isolation, currency, financial-state, transaction and reset coverage. No new tests were needed for reducing the decorative perimeter. No blocking source, visual or local functional finding remains for this candidate; the initial transient failure remains recorded above.

### Correction delivery boundary

This append is committed separately from runtime as independent QA evidence. Hosted checks, implementation merge, deployment and shipped verification are pending at this checkpoint and must be recorded with exact commit mapping in the implementation PR delivery record. This section does not claim those future results.

Verified delivery consumes this fresh softening permission only. It does not supply standing refinement authority, close remaining weekend preparation, reopen HOME-POLISH-001 or PR #549, change draft #550 or its unfinished Form, or release participant publication/distribution. Lane G/E, frozen About, rehearsal/release requirements and financial boundaries remain unchanged.
