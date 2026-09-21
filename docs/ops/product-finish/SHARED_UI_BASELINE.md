# Approved shared UI baseline — 2026-09-19

Founder approved repository translation across default product and synthetic journeys. Implementation is governed by HEDGR_STATUS.md §7 / §7a, within WEEKEND-PREP-001.

## Accepted references

Reviewed image-generation outputs in task 01a0b2aa-818e-7751-bf08-2a0a6cbb0da2:
- Home: exec-cf76de85-7004-4b8d-95ae-7c08865a5d91.png — smaller NGN 225 with a subtle upward arrow before the cause.
- Activity: exec-d1108bef-8c2e-4d1d-a643-35c61a0447dd.png — navy balance, understated deltas, peach balance-after rows.
- Settings: exec-d8373755-e6fa-4b55-aa5e-58d2e2c78cac.png — plain account/preferences, peach simulation explanation, common navigation.

These generated pictures define presentation intent, not exact pixel or financial-data contracts. Use actual governed SVG assets, existing brand values, data and route predicates rather than generated approximations.

## Translation

Keep balance as the only large numeric anchor. Currency difference uses a 1.75rem maximum font, with visible period/simulation context before it and explicit “Change in {currency} estimate”; the following line gives direction with an aria-hidden arrow and unchanged causal words. Equal and rounding-zero use their truthful existing labels, not “higher”. Keep unchanged-USD explanation, accessible comparison action and full disclaimer visible.

Activity summary adopts the Home navy panel. Existing transaction types, status, timestamps and details stay truthful. Default modal details and synthetic native disclosures remain their current interaction patterns. Peach balance-after applies only to completed simulated entries with a derived balance; pending/failed/live entries never acquire a fabricated balance. Delta type is around 1.125rem and supporting balance-after 0.875rem.

Settings and Activity use the same mobile/desktop brand and bottom navigation as Home, retaining default Copilot access when enabled. Account rows remain read-only; currency preferences remain eligible only where already authorized. Default About access and trust routes stay intact. Styling does not add synthetic financial features to default/live routes.

Home's default content and actions remain available under the shared palette; research comparison remains eligibility-gated. No claim of measured comprehension follows from visual approval.
