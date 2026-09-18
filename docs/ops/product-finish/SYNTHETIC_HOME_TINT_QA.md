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
