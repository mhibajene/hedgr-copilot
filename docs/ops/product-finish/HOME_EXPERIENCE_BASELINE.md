# One Home experience — accepted baseline

Last updated: 2026-09-27

Authority: direct Founder approval of `CLASS-A-VAL-002-HOME-EXPERIENCE-001`, recorded in HEDGR_STATUS.md §7 / §7a. This record supplies the accepted references, decisions and copy lock. It does not independently activate runtime, research, release or participant exposure.

## References

The references are rendered at 2× from the Polished page of the productisation concepts canvas, using the governed `hedgr_logo.svg` and the Plus Jakarta Sans files from the governed brand package. Every image was checked for clipped content and overlapping chart labels.

They show the journey (simulated) version of each screen, with the example values $0 → $5 → $3 and 1 USD = 20.00 ZMW. These are illustrations, not runtime constants.

| File | Logical size | Tranche | Shows |
| --- | --- | --- | --- |
| [01-home-first-use.png](home-experience/01-home-first-use.png) | 390 × 1024 | T3 | First use before any deposit |
| [02-home-loading.png](home-experience/02-home-loading.png) | 390 × 890 | T3 | Loading the position |
| [03-home-since-one-change.png](home-experience/03-home-since-one-change.png) | 390 × 962 | T1, T3 | One change since the last visit |
| [04-home-no-change.png](home-experience/04-home-no-change.png) | 390 × 922 | T3 | Nothing changed |
| [05-home-several-changes.png](home-experience/05-home-several-changes.png) | 390 × 1160 | T3 | Several changes after a longer gap |
| [06-deposit-recorded.png](home-experience/06-deposit-recorded.png) | 390 × 930 | T2 | Receipt and next step after a deposit |
| [07-withdrawal-recorded.png](home-experience/07-withdrawal-recorded.png) | 390 × 930 | T2 | Receipt and next step after a withdrawal |
| [08-activity-thread.png](home-experience/08-activity-thread.png) | 390 × 1000 | T4 | Activity entry thread and next step |
| [09-deposit-rate-unavailable.png](home-experience/09-deposit-rate-unavailable.png) | 390 × 1080 | T2 | Exchange rate unavailable on Deposit |
| [10-deposit-confirmation-failed.png](home-experience/10-deposit-confirmation-failed.png) | 390 × 860 | T2 | Confirmation failed on Deposit |
| [11-motion-final-state.png](home-experience/11-motion-final-state.png) | 760 × 962 | T5 | Motion final state and its specification |
| [12-motion-storyboard.png](home-experience/12-motion-storyboard.png) | 1400 × 470 | T5 | Motion timing storyboard |
| [13-desktop-home.png](home-experience/13-desktop-home.png) | 1280 × 860 | T1, T3 | Desktop Home |

**Not shown in the images.** Default `/dashboard` follows decisions 1–4 in §7a, which QA checks against that text:

- the context line under "Your position";
- the quiet "Simulate a withdrawal" action;
- live-mode wording;
- the restyled Recent activity and empty states.

Motion is shown as its final state and a storyboard. The running timing is specified in §7a T5.

## Copy register (Founder copy lock, 2026-09-27)

This register is exhaustive for new or changed strings. Values in brackets come from recorded state and are never hardcoded. Every approved string not listed stays character-for-character, including "display estimate", the four existing market-data continuity lines and the retry label "Retry rate". The earlier mockup label "Try loading the rate again" was not approved.

| Surface | String | Note |
| --- | --- | --- |
| Home | "[Weekday] [day] [Month]" date line | New |
| Home | "≈ [CUR] [amount] display estimate" | Existing wording kept |
| Home | "↓/↑ [amount] since [date]", "No change since [date]" | New change chip |
| Home Observation | "Since you were last here" | New label |
| Home Observation | "One simulated [deposit/withdrawal] of [amount] on [date] took your position from [a] to [b]." | New |
| Home Observation | "Nothing has changed since [date]. Your position is still [amount]." and "The [CUR] estimate can still move with the exchange rate." | New |
| Home Observation | "[N] things changed since [date]. Your position went from [a] to [b]." with an entry list | New |
| Home Observation | "See the entry", "See all in Activity" | New links |
| Home position line | "Your last visit", "Today", top-value label, empty "Your line starts with your first deposit" | New |
| First use | "No simulated activity yet.", "Start here", "Practise with pretend money first. Hedgr shows what changes, and why.", step lines "You are here. It starts at $0.00." / "Add a simulated deposit." / "Try a simulated withdrawal." / "Check both entries in Activity.", "How this simulation works" | New; replaces "Start with a simulated deposit" / "Nothing to compare yet…" |
| Loading | "Loading your position…" | New; replaces "…" |
| Step header | "Step [n] of 4 · [step]" | Restyles the existing eyebrow and chip |
| Receipt | "You added [amount] to your simulated balance" / "You took [amount] out of your simulated balance", "Recorded", "Today, [time]" | New; replaces "Simulated deposit recorded" and its paragraph |
| Receipt | Row labels "Amount", "Shown as", "Example rate", "Balance", "Real money moved" / "None" | New |
| Bottom action panel | "Next step"; "Try a simulated withdrawal" / "See what changes, and what stays, when money comes out."; "Check the evidence" / "Activity lists both entries and the balance after each one."; "Review Activity"; "Back to your position" | New. The existing "Continue to simulated withdrawal" stays. |
| Exchange rate unavailable | Row labels "What happened", "What it affects", "What still works", "What is paused" | New labels; the four existing lines stay verbatim |
| Exchange rate unavailable | "Confirm turns on when the rate is back." | New reason line |
| Confirmation failed | "We couldn't record this simulated deposit" / "Nothing was added to your simulated balance. Your amount is still here, so you can try again." | New; replaces "Your deposit could not be processed. Please try again." in simulated contexts |
| Activity | "[Weekday] [day] [Month]" date headers with "Balance [amount]", "Completed · [time]", "Started at $0.00 · [date]" | New; replaces the balance-after strip |
| Activity panel | "See it on your position" / "Hedgr explains what changed between these two entries.", "Back to your position" | New; replaces "Return to current position" |
| Motion | Screen-reader sentence "Your position is now [amount], [change] than on your last visit." | New |

## Translation constraints

- Use the repo-governed logo, existing tokens and the approved typeface. The references are layout and treatment guides; do not ship any image, generated mark or gradient taken from them.
- Keep the persistent simulation disclosure, every non-normal notice, pending/error/empty visibility, planning targets, Important disclosures and journey replay/reset.
- Derive the position line, change chip and "since" wording from existing ledger entries and the one approved last-visit value. Never infer withdrawal timing, readiness, returns or a guarantee.
- In live mode, apply the T1 layout only, with existing copy.

## Learning boundary

These designs respond to the CLASS-A-VAL-002 developmental findings on change inspectability, the next step and guarantee misreadings (`docs/ops/governance/mvp/HEDGR_CLASS_A_VAL_002_DEVELOPMENT_CYCLE_CLOSEOUT.md`). A rendered design and its technical QA are not participant comprehension evidence. No participant test, instrument change or distribution is authorised here.

## Design sources (non-authoritative)

The Hedgr design system (canonical journey, component and Proposed-pattern cards) and the productisation concepts canvas are private Claude artifacts used to explore and render these references. They carry no authority. Where they differ from this record or §7a, this record and §7a govern.

## Image integrity

| File | SHA-256 |
| --- | --- |
| `01-home-first-use.png` | `7db6baf662f0d21bc814bd0c58afbdc3cf3b87b2d8e42c18c43d3bfddfd57b8f` |
| `02-home-loading.png` | `84f182708d1751b0a41569fa43b6a028d453f68a3ae9f5fc3fc790aeb8d33f69` |
| `03-home-since-one-change.png` | `3753b952144d2837ee5febe6000aabb81563d851639baf8eaedd40e1a2c27300` |
| `04-home-no-change.png` | `eacb123edb5dee246270f6daa01c44c39b3b98eb5c15d97b61219b204d9a0d9e` |
| `05-home-several-changes.png` | `5e7fffc905221385b9d22ee90fdc7e3c43f7826fa93517c4593ceec748f95bf5` |
| `06-deposit-recorded.png` | `82587206990f5d491477180376a3412ab27d1089379ee6df2ccf280f0dc5f605` |
| `07-withdrawal-recorded.png` | `8d0e48adf720c99ead325a130e9e4f14ca8682ca7bd171c23169a9032f4eed8f` |
| `08-activity-thread.png` | `ea1465fd6aee6ed99ee03370a19a63abfa34fd6768dcce760531156e4137df13` |
| `09-deposit-rate-unavailable.png` | `e1751e3ce45770be4718048af326111b70ac275cdc73ea475ab5eb40fe9e76aa` |
| `10-deposit-confirmation-failed.png` | `3ca9b06c149074afd549736abdbfe4fd603e08c865847e62cd4c13fc65406f25` |
| `11-motion-final-state.png` | `e7e938340fb21eb274e61114ab837f22f9b2e276c6c46d4613c863e93a2fc85a` |
| `12-motion-storyboard.png` | `bbd4ecf9ac9fdd219a46967fc9d1eced0b3c295a1abc3e4a9b653313718fca2d` |
| `13-desktop-home.png` | `21566f5b84d9d0b86368f04cc9a65504341c9d54e2970a450ca78a7bc911eeb8` |
