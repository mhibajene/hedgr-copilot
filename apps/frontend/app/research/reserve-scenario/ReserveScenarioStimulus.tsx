'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getSimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';
import {
  DANIEL_FIGURES,
  formatScenarioAmount,
  scenarioTokens,
} from '../../../lib/research/scenario-fixtures';
import { ResearchBridge } from '../ResearchBridge';
import { ResearchChrome, researchStyles as rs } from '../ResearchChrome';

type Stage = 'intro' | 'facts' | 'interpreted' | 'bridge';
type PanelRowKey = 'held' | 'adding' | 'kept' | 'using' | 'watch';
type Variant = '1' | '2';

const ROW_LABELS = {
  held: 'Held now',
  adding: 'Adding later',
  kept: 'Kept for',
  using: 'Using it locally',
  watch: 'What to watch',
} as const;

function PanelRow({
  rowKey,
  label,
  value,
}: {
  rowKey: PanelRowKey;
  label: string;
  value: string;
}) {
  const isWatch = rowKey === 'watch';
  return (
    <div
      data-row={rowKey}
      className={`flex min-w-0 flex-col gap-1${isWatch ? ' border-t border-hedgr-300 pt-3' : ''}`}
    >
      <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-hedgr-800">
        <span data-testid="study-row-label">{label}</span>
      </dt>
      <dd className="m-0 min-w-0 break-words text-left font-normal">
        <span className={isWatch ? 'font-medium text-hedgr-800' : undefined}>{value}</span>
      </dd>
    </div>
  );
}

function PanelState({
  testId,
  headingId,
  heading,
  rows,
}: {
  testId: string;
  headingId: string;
  heading: string;
  rows: Array<{ rowKey: PanelRowKey; label: string; value: string }>;
}) {
  return (
    <section
      data-testid={testId}
      aria-labelledby={headingId}
      className="min-w-0 space-y-4 @lg:row-span-6 @lg:grid @lg:grid-rows-subgrid @lg:space-y-0"
    >
      <h3 id={headingId} className="text-base font-semibold text-hedgr-800">{heading}</h3>
      <dl className="space-y-3 @lg:contents">
        {rows.map((row) => (
          <PanelRow key={row.rowKey} rowKey={row.rowKey} label={row.label} value={row.value} />
        ))}
      </dl>
    </section>
  );
}

export default function ReserveScenarioStimulus({ variant }: { variant: Variant }) {
  const [stage, setStage] = useState<Stage>('intro');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  const [currency, setCurrency] = useState<ReturnType<typeof getSimulationDisplayCurrency> | null>(null);

  useEffect(() => {
    setCurrency(getSimulationDisplayCurrency());
  }, []);

  useEffect(() => {
    if (stage === 'intro') return;
    const heading = stageHeading.current;
    if (!heading) return;
    if (stage === 'interpreted') {
      heading.focus({ preventScroll: true });
      heading.closest('main')?.scrollIntoView({ block: 'start' });
      return;
    }
    heading.focus();
  }, [stage]);

  if (currency === null) {
    return <div className={rs.page}><main data-testid="reserve-stimulus" className={rs.main}><p role="status">Preparing the fictional example…</p></main></div>;
  }

  const tokens = scenarioTokens(currency);
  const figures = DANIEL_FIGURES[currency];
  const held = formatScenarioAmount(currency, figures.held);
  const displayBefore = formatScenarioAmount(currency, figures.displayBefore);
  const displayAfter = formatScenarioAmount(
    currency,
    variant === '2' ? figures.displayStrengthened : figures.displayWeakened,
  );
  const afterHeading = variant === '2'
    ? `After ${tokens.localFull} strengthened against the US dollar`
    : `After ${tokens.localFull} weakened against the US dollar`;
  const heldNow = (display: string) =>
    `${held} in ${tokens.localFull}. A dollar-linked portion of USD 800. Shown as ${display} in ${tokens.localFull}, for illustration only. This is not a quote.`;
  const addingLater = 'He may add more from future salary when he can. No fixed amount or schedule. Nothing he adds later is included here.';
  const keptFor = 'Something to fall back on if his circumstances change, or to use if an opportunity comes up. When and how he’ll use it isn’t known yet.';
  const usingLocally = `If he used the dollar-linked portion in ${tokens.localPlural}, what he’d actually receive would depend on how he accessed it, any costs, and the rate at the time. This example doesn’t set any of those.`;
  const watchBefore = `The dollar-linked portion is counted in US dollars, so its figure in ${tokens.localPlural} can change when the exchange rate moves. Neither figure tells Daniel exactly what he would receive.`;
  const watchAfter = variant === '2'
    ? `In this example, the dollar-linked portion is still USD 800. Because ${tokens.localSingular} strengthened, it now shows as a smaller amount in ${tokens.localPlural}. Why he keeps the reserve, and how he may add to it, haven’t changed. Neither figure tells Daniel exactly what he would receive if he used it.`
    : `In this example, the dollar-linked portion is still USD 800. Because ${tokens.localSingular} weakened, it now shows as a larger amount in ${tokens.localPlural}. Why he keeps the reserve, and how he may add to it, haven’t changed. Neither figure tells Daniel exactly what he would receive if he used it.`;

  const beforeRows = [
    { rowKey: 'held' as const, label: ROW_LABELS.held, value: heldNow(displayBefore) },
    { rowKey: 'adding' as const, label: ROW_LABELS.adding, value: addingLater },
    { rowKey: 'kept' as const, label: ROW_LABELS.kept, value: keptFor },
    { rowKey: 'using' as const, label: ROW_LABELS.using, value: usingLocally },
    { rowKey: 'watch' as const, label: ROW_LABELS.watch, value: watchBefore },
  ];
  const afterRows = [
    { rowKey: 'held' as const, label: ROW_LABELS.held, value: heldNow(displayAfter) },
    { rowKey: 'adding' as const, label: ROW_LABELS.adding, value: addingLater },
    { rowKey: 'kept' as const, label: ROW_LABELS.kept, value: keptFor },
    { rowKey: 'using' as const, label: ROW_LABELS.using, value: usingLocally },
    { rowKey: 'watch' as const, label: ROW_LABELS.watch, value: watchAfter },
  ];

  const comparisonPanel = (
    <div data-testid="study-value-panel" className={`@container space-y-5 break-words ${rs.panel}`}>
      <p data-testid="daniel-scope">This is the part of Daniel’s savings he keeps as a reserve. His other money isn’t shown.</p>
      <p data-testid="daniel-condition">In this example, the dollar-linked portion is USD 800 before and after. Only the exchange rate changes.</p>
      <div className="grid grid-cols-1 gap-8 @lg:grid-cols-2 @lg:grid-rows-[auto_auto_auto_auto_auto_auto] @lg:gap-x-6 @lg:gap-y-3">
        <PanelState
          testId="study-panel-before"
          headingId="daniel-panel-before-heading"
          heading="Before the exchange rate moved"
          rows={beforeRows}
        />
        <PanelState
          testId="study-panel-after"
          headingId="daniel-panel-after-heading"
          heading={afterHeading}
          rows={afterRows}
        />
      </div>
    </div>
  );

  let stageBody: ReactNode = null;
  if (stage === 'intro') {
    stageBody = (
      <section aria-labelledby="daniel-intro-heading" data-testid="daniel-intro" className={`${rs.panel} mt-8 space-y-4`}>
        <h2 id="daniel-intro-heading" ref={stageHeading} tabIndex={-1} className="break-words text-base font-semibold sm:text-xl">Daniel’s reserve</h2>
        <p>Here’s a second fictional example: Daniel, a salaried professional, and part of his savings. No real money is involved.</p>
        <button type="button" data-testid="study-to-facts" onClick={() => setStage('facts')} className={`${rs.primary} mt-4`}>Continue</button>
      </section>
    );
  } else if (stage === 'facts') {
    stageBody = (
      <section data-testid="daniel-facts" className="mt-8 space-y-5">
        <h2 ref={stageHeading} tabIndex={-1} className="break-words text-lg font-semibold sm:text-xl">Daniel’s reserve</h2>
        {comparisonPanel}
        <button type="button" data-testid="study-to-interpreted" onClick={() => setStage('interpreted')} className={rs.primary}>Continue</button>
      </section>
    );
  } else if (stage === 'interpreted') {
    stageBody = (
      <section data-testid="daniel-interpreted" className="mt-8 space-y-5">
        <p data-testid="study-authored-label" className="break-words text-sm font-medium text-hedgr-600">Research example about a fictional person</p>
        <h2 ref={stageHeading} tabIndex={-1} className="break-words text-lg font-semibold sm:text-xl">Daniel’s reserve, with Hedgr’s notes</h2>
        {comparisonPanel}
        <p data-testid="study-attribution" className="text-sm font-medium leading-relaxed text-hedgr-700">This example was written in advance by Hedgr, using only the facts about Daniel on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.</p>
        <p data-testid="study-limits" className="text-sm leading-relaxed text-hedgr-700">This example can’t predict the exchange rate, assume Daniel will add more, or say what he would receive if he used his reserve. The dollar-linked portion is part of Daniel’s fictional situation, and Hedgr plays no part in it in this example. This isn’t financial advice.</p>
        <button type="button" data-testid="study-to-bridge" onClick={() => setStage('bridge')} className={rs.primary}>Continue</button>
      </section>
    );
  } else {
    stageBody = <ResearchBridge headingRef={stageHeading} />;
  }

  return (
    <ResearchChrome
      title="Daniel’s reserve"
      testId="reserve-stimulus"
      footer={{ href: '/orientation?study=stability-scenarios', label: 'Review the introduction' }}
    >
      {stageBody}
    </ResearchChrome>
  );
}
