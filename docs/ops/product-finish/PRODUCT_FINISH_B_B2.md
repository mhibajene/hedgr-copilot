# Product finish B + B2

Date: 2026-09-08
Ticket: `CLASS-A-VAL-002-FINISH-001`
Authority: Founder approval, Internal D-127 / HEDGR_STATUS.md §259 and §7 / §7a.
Status: Implemented and verified; technical closeout under D-128 / §260. D-127 activation is completed historical authority.

## Founder disposition

The Founder selected B because its grouping reduces cognitive density, then selected B2's equal-weight soft capsule dashboard utilities. B3 was rejected because it overemphasises making a deposit. The Founder explicitly approved ticket activation and implementation for both the synthetic journey and default production product routes on 2026-09-08.

## Selected design inputs

- [B Home, Activity, Deposit and Withdraw](https://app.paper.design/file/01KJJ92DP1PB7A5SDSDWQKZ33S/G-1).
- [Selected B2 dashboard](https://app.paper.design/file/01KJJ92DP1PB7A5SDSDWQKZ33S/H-4), artboard `9WM-4`.
- Source values obtained with Paper `get_computed_styles` / `get_jsx`; screenshots are review evidence, not measurement authority.

| Element | Selected finish |
| --- | --- |
| Position | 20 px radius, 16 px padding, white; color-100 border at 45%; primary shadow at 7%, 0 4 18 px |
| USD figure | Plus Jakarta Sans, 600, 52/60 px, -0.05 em tracking; local estimate subordinate at 13/20 px |
| Dashboard utilities | Equal 64 px minimum height, 32 px radius, 12 px gap, 10/14 px padding; white, color-100 border at 60%; primary shadow at 10%, 0 3 10 px; existing 24 px icons, 13/19 px labels |
| Observation | 16 px radius and padding; color-100 at 20%; no shadow or internal divider |
| Planning | One pale group, color-100 at 14%, 14 px radius, equal aligned rows; boundary remains visible |
| Activity | Pale reconciliation group, clearer amount/result hierarchy, compact chronological rows and grouped filters |
| Choice | Quiet rate, pale condition and preview groups, resolved amount input and confirmation control |

## Translation contract

Preserve current copy, DOM reading order, disclosure availability, routes, state, arithmetic, financial conditions, default/synthetic distinctions and all meaningful loading/error/pending/confirmed states. Do not copy fixed Paper example values into runtime. Retain default-only withdrawal, education, latest/recent activity and Copilot navigation where currently present. The two dashboard utilities remain equally weighted. Fixed navigation stays fixed; Paper's end-position navigation was only a scrolling comparison convention. Do not add a default bottom navigation or a new confirmation step.

Use the current approved palette, typography and existing utility icon assets without asset transformation. Responsive geometry may expand for larger text, long amounts and wider screens. All text remains available, controls at least 44 px, keyboard focus visible, reduced motion complete. Add only restrained control colour/shadow transitions; do not add financial number animation or asynchronous timing. No new dependencies, global theme changes, or new motion state machine.

## Validation and rollback

Run full repo validation and protected hermetic E2E. Check synthetic and default Home/Activity/Deposit/Withdraw at mobile and desktop widths, empty and completed journeys, filters, record detail, before/event/after arithmetic, invalid/disabled input, focus and enlarged text. Screenshot selected states locally and verify production after the normal merge gate. Record outcomes here at closeout.

Rollback is one scoped implementation revert; it requires no data migration. Technical completion is not comprehension evidence. Formal participant distribution remains paused pending live-Form verification. About, orientation, Settings exposure, Form/protocol, Lane E, frozen narrative, engine, providers and live financial capabilities are excluded. `NO CROSS-LANE IMPACT`.


## Verified outcome — 2026-09-08

- Implementation: [PR #494](https://github.com/mhibajene/hedgr-copilot/pull/494), permanent main `1288427b12d8c209bd85aa5d75e5131b9fc700cd`.
- Local: 775 unit tests, typechecking, lint, RAP/snapshot checks, production build and all 68 Playwright tests passed. All required hosted checks passed.
- Visual: reviewed mobile Home/Activity/Deposit/Withdraw, desktop Home and enlarged main content. Main content fits 320/390/1280 px and 200% root text; controls and planning stack when constrained, preserving readable labels. Focus, reduced motion, equal utility weight, filters and invalid/disabled amounts were verified.
- Deployed: fresh synthetic and default browser contexts completed `$0 → +$5 → −$2 → $3`, with matching Home and Activity results, correct route context, default-only withdrawal access and selected B/B2 geometry.
- Known unchanged limitation: the global disclosure banner can overlap at 200% root text. Enlarged-text acceptance here covers the changed main content; the shared disclosure component was outside this ticket and remains unchanged.
- Parent Lane V and Lane E remain open with no active nested ticket. Participant distribution remains paused; technical completion supplies no comprehension or further-refinement authority.
