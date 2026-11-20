import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

// JOURNEY-REVIEW-001: bounded literal source reversals; every other byte stays pinned.
const EDITS: Record<string, readonly (readonly [string, string, number])[]> = {
  "app/(app)/dashboard/RateLine.tsx": [
    [
      "import type { SimulationDisplayCurrency }",
      "import { formatLocalCurrency } from '../../../lib/utils/money';\nimport type { SimulationDisplayCurrency }",
      1
    ],
    [
      "return `Example rate: ${code} ${rate.toLocaleString('en-US')} per US dollar. Not a live rate.`;",
      "return `Example rate: 1 USD = ${formatLocalCurrency(rate)} ${code}. Not a live rate.`;",
      1
    ]
  ],
  "app/(app)/deposit/page.tsx": [
    [
      "Simulated example rate: 1 USD = {rate?.toFixed(2)} {quote}",
      "Example rate: 1 USD = {rate === null ? null : formatLocalCurrency(rate)} {quote}. Not a live rate.",
      1
    ]
  ],
  "app/(app)/withdraw/page.tsx": [
    [
      "Simulated example rate: 1 USD = {rate?.toFixed(2)} {quote}",
      "Example rate: 1 USD = {rate === null ? null : formatLocalCurrency(rate)} {quote}. Not a live rate.",
      1
    ]
  ],
  "app/(app)/dashboard/ExampleLineChart.tsx": [
    [
      "import { createContext, useEffect, useId, useRef, useState } from 'react';",
      "import { createContext, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type Ref } from 'react';",
      1
    ],
    [
      "type ChartProps =",
      "export type ChartActions = { focusNewest(): void; openAll(): void };\n\ntype ChartProps =",
      1
    ],
    [
      "example?: boolean; heroAmount?: number };",
      "example?: boolean; heroAmount?: number; actionsRef?: Ref<ChartActions> };",
      1
    ],
    [
      "function ActivityLine({ series, events, lastVisit = null, settle = 1, example = false }:",
      "function ActivityLine({ series, events, lastVisit = null, settle = 1, example = false, actionsRef }:",
      1
    ],
    [
      "  const touchStart = useRef<{ x: number; y: number } | null>(null);",
      "  const touchStart = useRef<{ x: number; y: number } | null>(null);\n  const selectedCard = useRef<HTMLDivElement>(null);\n  const allChanges = useRef<HTMLButtonElement>(null);\n  const [focusTarget, setFocusTarget] = useState<'newest' | 'all' | null>(null);\n  useImperativeHandle(actionsRef, () => ({\n    focusNewest() { setOpened(false); setSelectedId(null); setFocusTarget('newest'); },\n    openAll() { setOpened(true); setFocusTarget('all'); },\n  }), []);\n  useLayoutEffect(() => {\n    if (!actionsRef || !focusTarget) return;\n    const target = focusTarget === 'newest' ? selectedCard.current : allChanges.current;\n    target?.focus({ preventScroll: true });\n    target?.scrollIntoView({ block: 'center' });\n    setFocusTarget(null);\n  }, [actionsRef, focusTarget]);",
      1
    ],
    [
      "<div id={`${listId}-selected`} className={home.activityCard}>",
      "<div id={`${listId}-selected`} ref={actionsRef ? selectedCard : undefined} className={actionsRef ? `${home.activityCard} focus-visible:outline focus-visible:outline-2 focus-visible:outline-hedgr-500` : home.activityCard} {...(actionsRef ? { tabIndex: -1, 'aria-label': text(selected).spoken } : {})}>",
      1
    ],
    [
      "<button type=\"button\" className={home.visualiserToggle}",
      "<button ref={actionsRef ? allChanges : undefined} type=\"button\" className={home.visualiserToggle}",
      1
    ]
  ],
  "app/(app)/dashboard/PositionLine.tsx": [
    [
      "import type { PositionEntry }",
      "import type { Ref } from 'react';\nimport type { PositionEntry }",
      1
    ],
    [
      "import { ExampleLineChart }",
      "import { ExampleLineChart, type ChartActions }",
      1
    ],
    [
      "  heroAmount?: number;",
      "  heroAmount?: number;\n  actionsRef?: Ref<ChartActions>;",
      1
    ],
    [
      "{ visualise = false, heroAmount, ...props }",
      "{ visualise = false, heroAmount, actionsRef, ...props }",
      1
    ],
    [
      "<div data-testid=\"dashboard-position-line\" data-state=\"line\"><ExampleLineChart mode=\"step\"",
      "<div id={actionsRef ? \"dashboard-position-line\" : undefined} data-testid=\"dashboard-position-line\" data-state=\"line\"><ExampleLineChart actionsRef={actionsRef} mode=\"step\"",
      1
    ]
  ],
  "app/(app)/dashboard/DanielExampleHome.tsx": [
    [
      "import type { ReactNode } from 'react';",
      "import { useRef, type ReactNode } from 'react';",
      1
    ],
    [
      "import { ExampleLineChart }",
      "import { ExampleLineChart, type ChartActions }",
      1
    ],
    [
      "  const example = SYNTHETIC_JOURNEY_EXAMPLES.find",
      "  const chartActions = useRef<ChartActions>(null);\n  const example = SYNTHETIC_JOURNEY_EXAMPLES.find",
      1
    ],
    [
      "<div className={home.positionPanel}>",
      "<div id=\"daniel-all-changes\" className={home.positionPanel}>",
      1
    ],
    [
      "<ExampleLineChart mode=\"step\" series={series} events={events} example />",
      "<ExampleLineChart mode=\"step\" series={series} events={events} example actionsRef={chartActions} />",
      1
    ],
    [
      "He made two deposits and none since. Each kwacha figure uses the example rate for its date.",
      "He made two deposits and none since. The chart below shows each kwacha figure, using the example rate for its date.",
      1
    ],
    [
      "data-testid=\"daniel-invariant\">He made two deposits and none since. The chart below shows each kwacha figure, using the example rate for its date.</p>",
      "data-testid=\"daniel-invariant\">He made two deposits and none since. The chart below shows each kwacha figure, using the example rate for its date.</p>\n              <a href=\"#daniel-all-changes\" className={home.sinceLink} onClick={event => { event.preventDefault(); chartActions.current?.openAll(); }}>Show the figures</a>",
      1
    ]
  ],
  "app/(app)/dashboard/page.tsx": [
    [
      "import { ChartSourceAmountsContext }",
      "import { type ChartActions, ChartSourceAmountsContext }",
      1
    ],
    [
      "  const visitRecorded = useRef(false);",
      "  const visitRecorded = useRef(false);\n  const chartActions = useRef<ChartActions>(null);",
      1
    ],
    [
      "visualise={syntheticJourneyActive} heroAmount={total}",
      "visualise={syntheticJourneyActive} heroAmount={total} actionsRef={syntheticJourneyActive ? chartActions : undefined}",
      1
    ],
    [
      "{observationLabel(\"Since you were last here\")}",
      "{observationLabel(syntheticJourneyActive ? \"Recent changes\" : \"Since you were last here\")}",
      1
    ],
    [
      "This simulated {sinceSummary.entry.type === \"DEPOSIT\" ? \"deposit\" : \"withdrawal\"} is included in the balance above.",
      "1 new simulated entry since your last visit. It's included in the balance above.",
      1
    ],
    [
      "These simulated entries are included in the balance above.",
      "{sinceSummary.entries.length} new simulated entries since your last visit. They're included in the balance above.",
      1
    ],
    [
      "          {syntheticJourneyActive && sinceSummary.kind !== \"no-change\"\n            ? sinceLink(sinceSummary.kind === \"one\" ? \"See the entry\" : \"See all in Activity\")\n            : null}",
      "          {syntheticJourneyActive && sinceSummary.kind !== \"no-change\" ? <>\n            <a href=\"#dashboard-position-line\" className={home.sinceLink} onClick={event => { event.preventDefault(); chartActions.current?.focusNewest(); }}>\n              {sinceSummary.kind === \"one\" ? \"See this change below\" : \"See the newest change below\"}\n            </a>\n            {sinceLink(\"See all in Activity\")}\n          </> : null}",
      1
    ]
  ],
  "app/(app)/dashboard/synthetic-home.module.css": [
    [
      "ivityStack, .activityCard { animation: none; transition: none; } .activityHint { display: none; } }\n",
      "ivityStack, .activityCard { animation: none; transition: none; } .activityHint { display: none; } }\n\n@media (max-width: 1023px) {\n  :global(html):has(.scopeNavigation) { scroll-padding-bottom: calc(3.75rem + 1px); }\n}\n",
      1
    ]
  ],
  "app/(app)/dashboard/CurrencyInsight.tsx": [
    [
      "import { useRef, useState } from 'react';",
      "import { useRef, useState } from 'react';\nimport { formatExampleRateLine } from './RateLine';",
      1
    ],
    [
      "Example rate: {currency} {latestDisplayRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} per US dollar. Not a live rate.",
      "{formatExampleRateLine(currency, latestDisplayRate)}",
      1
    ]
  ]
};
const BASE: Record<string, string> = {
  "app/(app)/dashboard/RateLine.tsx": "6016daab5675a6bd8b077c7123496ea61af6c6c6f4f14bc6e5f698883dd165e7",
  "app/(app)/deposit/page.tsx": "6147e8b0721446b7acf4d6635b2a102a070765e3212e5f6c952dbdecd3e0c043",
  "app/(app)/withdraw/page.tsx": "feb9decd059624c8b7152a165591741fc1a5b5c52aa8b470b7b322b46b41e873",
  "app/(app)/dashboard/page.tsx": "129bb0876f5441a4a3ba3953b85c387a029c70323bc50ffff1ce0ba702b949a2",
  "app/(app)/dashboard/DanielExampleHome.tsx": "bbbf10bed65768262a129db76d56bab42382a3ebb1cdb3e78923a90eae8f0229",
  "app/(app)/dashboard/ExampleLineChart.tsx": "ada453a015eaa88b4409aab1f765136666c0ad6c39f1ec40ee04742e4c503c51",
  "app/(app)/dashboard/PositionLine.tsx": "c2cce23dd635c8051a9170f30f50cc17a12e2e929d04e03879eb3be173560159",
  "app/(app)/dashboard/synthetic-home.module.css": "93f7270ce57d92e04ea84760194165a8a333866679f6d2c7618b11ed5adf9991",
  "app/(app)/dashboard/CurrencyInsight.tsx": "1a0607550bb74dba2caf80a5419e2d150c2072fa6c908069ab3994ce62605b34"
};

export function journeyPreRuntime(path: string, value: string): string {
  for (const [before, after, count] of [...(EDITS[path] ?? [])].reverse()) {
    if (value.split(after).length - 1 !== count) throw new Error(`JOURNEY-REVIEW-001 literal count mismatch: ${path}`);
    value = value.split(after).join(before);
  }
  return value;
}
export function assertJourneySourceReversals(): void {
  for (const [path, edits] of Object.entries(EDITS)) {
    const current = readFileSync(resolve(__dirname, '..', path), 'utf8');
    const original = journeyPreRuntime(path, current);
    if (createHash('sha256').update(original).digest('hex') !== BASE[path]) throw new Error(`JOURNEY-REVIEW-001 unrelated source drift: ${path}`);
    for (const [before, after, count] of edits) {
      if (current.split(after).length - 1 !== count) throw new Error(`JOURNEY-REVIEW-001 literal control count: ${path}`);
      const reversed = current.split(after).join(before);
      let rejected = false;
      try { journeyPreRuntime(path, reversed); } catch { rejected = true; }
      if (!rejected) throw new Error(`JOURNEY-REVIEW-001 literal reversal escaped: ${path}`);
    }
    let rejected = false;
    try { journeyPreRuntime(path, original); } catch { rejected = true; }
    if (!rejected) throw new Error(`JOURNEY-REVIEW-001 reversed source escaped: ${path}`);
  }
}
