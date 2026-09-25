'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  getSimulationDisplayCurrency,
  type SimulationDisplayCurrency,
} from '../../../lib/state/simulation-display-currency';

type Stage = 'a1' | 'a2' | 'hedgr' | 'bridge';

const savingsCurrencyNames = {
  ZMW: 'kwacha',
  KES: 'Kenyan shillings',
  NGN: 'Nigerian naira',
  GHS: 'Ghanaian cedis',
  PHP: 'Philippine pesos',
} as const;

type PanelRowKey = 'available' | 'planned' | 'due' | 'watch';

function PanelRow({
  rowKey,
  label,
  value,
  marker,
}: {
  rowKey: PanelRowKey;
  label: string;
  value: string;
  marker?: string;
}) {
  const isWatch = rowKey === 'watch';
  return (
    <div
      data-row={rowKey}
      className={
        isWatch
          ? 'flex min-w-0 flex-col gap-1 border-t border-hedgr-300 pt-3'
          : 'flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3'
      }
    >
      <dt className="text-sm font-medium text-hedgr-800">{label}</dt>
      <dd className="m-0 min-w-0 break-words text-left font-normal">
        <span className={isWatch ? 'font-medium text-hedgr-800' : undefined}>{value}</span>
        {marker ? (
          <>
            {' '}
            <span data-testid="study-row-marker" className="font-medium text-hedgr-600">{marker}</span>
          </>
        ) : null}
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
  rows: Array<{ rowKey: PanelRowKey; label: string; value: string; marker?: string }>;
}) {
  return (
    <section
      data-testid={testId}
      aria-labelledby={headingId}
      className="min-w-0 space-y-4 @lg:row-span-5 @lg:grid @lg:grid-rows-subgrid @lg:space-y-0"
    >
      <h3 id={headingId} className="text-base font-semibold text-hedgr-800">{heading}</h3>
      <dl className="space-y-3 @lg:contents">
        {rows.map((row) => (
          <PanelRow key={row.rowKey} rowKey={row.rowKey} label={row.label} value={row.value} marker={row.marker} />
        ))}
      </dl>
    </section>
  );
}

export default function ScenarioStimulus() {
  const [stage, setStage] = useState<Stage>('a1');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  const [currency, setCurrency] = useState<SimulationDisplayCurrency | null>(null);

  useEffect(() => {
    // Keep one fictional denomination for the entire traversal, even if another tab changes the preference.
    setCurrency(getSimulationDisplayCurrency());
  }, []);

  useEffect(() => {
    if (stage === 'a1') return;
    const heading = stageHeading.current;
    if (!heading) return;
    if (stage === 'hedgr') {
      heading.focus({ preventScroll: true });
      heading.closest('main')?.scrollIntoView({ block: 'start' });
      return;
    }
    heading.focus();
  }, [stage]);

  if (currency === null) {
    return <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12"><p role="status">Preparing the fictional example…</p></main>;
  }

  const savingsCurrencyName = savingsCurrencyNames[currency];
  const amount = (value: string) => currency === 'ZMW' ? `K${value}` : `${currency} ${value}`;
  const availableNow = amount('6,000');
  const planned = `${amount('24,000')} over 12 months, not available yet`;
  const localFeeNeed = `${amount('29,500')} on 1 October 2027`;
  const rowLabels = {
    available: 'Available now',
    planned: 'Planned',
    due: 'Due',
    watch: 'What to watch',
  } as const;

  let stageBody: ReactNode = null;
  if (stage === 'a1' || stage === 'a2') {
    stageBody = (
      <>
        <section aria-labelledby="sarah-facts-heading" data-testid="sarah-facts" className="mt-8 space-y-4 border border-hedgr-300 bg-hedgr-100 p-5">
          <h2 id="sarah-facts-heading" ref={stageHeading} tabIndex={-1} className="break-words text-base font-semibold sm:text-xl">
            {stage === 'a1' ? 'Sarah is saving for a postgraduate course.' : 'Sarah’s changed course fee'}
          </h2>
          {stage === 'a1' ? (
            <>
              <p className="text-sm text-hedgr-700">Situation on 1 October 2026</p>
              <p>Sarah already has {amount('6,000')} set aside. She plans to add {amount('2,000')} on the 15th of each month for the next 12 months, starting on 15 October 2026. Those contributions have not happened yet.</p>
            </>
          ) : null}
          <p data-testid="course-fee">{stage === 'a1'
            ? 'The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.'
            : `The course provider has changed the fee to ${amount('29,500')}, payable in ${currency === 'ZMW' ? 'Zambian kwacha' : savingsCurrencyName} on 1 October 2027. It was USD 1,000, payable in US dollars.`}</p>
          {stage === 'a2' ? (
            <p>Nothing else has changed.</p>
          ) : null}
        </section>
        {stage === 'a1' ? (
          <button type="button" data-testid="study-continue" onClick={() => setStage('a2')} className="mt-8 min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue to the changed course fee</button>
        ) : (
          <button type="button" data-testid="study-to-hedgr" onClick={() => setStage('hedgr')} className="mt-8 min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue</button>
        )}
      </>
    );
  } else if (stage === 'hedgr') {
    stageBody = (
      <section data-testid="study-hedgr-explanation" className="mt-8 space-y-5">
        <p data-testid="study-authored-label" className="break-words text-sm font-medium text-hedgr-600">Authored research example · not a live assessment of anyone’s money</p>
        <h2 ref={stageHeading} tabIndex={-1} className="break-words text-lg font-semibold sm:text-xl">What Hedgr helps Sarah see</h2>
        <div data-testid="study-value-panel" className="@container space-y-5 break-words border border-hedgr-300 p-5">
          <div className="grid grid-cols-1 gap-8 @lg:grid-cols-2 @lg:grid-rows-[auto_auto_auto_auto_auto] @lg:gap-x-6 @lg:gap-y-3">
            <PanelState
              testId="study-panel-before"
              headingId="study-panel-before-heading"
              heading="Before the fee changed"
              rows={[
                { rowKey: 'available', label: rowLabels.available, value: availableNow },
                { rowKey: 'planned', label: rowLabels.planned, value: planned },
                { rowKey: 'due', label: rowLabels.due, value: 'USD 1,000 on 1 October 2027' },
                {
                  rowKey: 'watch',
                  label: rowLabels.watch,
                  value: `Sarah is saving in ${savingsCurrencyName}, but the fee is in US dollars. If the exchange rate moves, the amount of ${savingsCurrencyName} she needs can change.`,
                },
              ]}
            />
            <PanelState
              testId="study-panel-after"
              headingId="study-panel-after-heading"
              heading="After the fee changed"
              rows={[
                { rowKey: 'available', label: rowLabels.available, value: availableNow },
                { rowKey: 'planned', label: rowLabels.planned, value: planned },
                { rowKey: 'due', label: rowLabels.due, value: localFeeNeed, marker: 'New' },
                {
                  rowKey: 'watch',
                  label: rowLabels.watch,
                  value: `Sarah’s savings and the fee are now both in ${savingsCurrencyName}, so the exchange rate no longer changes the amount she needs. What is still open is whether the planned ${amount('24,000')} arrives on time.`,
                  marker: 'New',
                },
              ]}
            />
          </div>
        </div>
        <p data-testid="study-attribution" className="text-sm font-medium leading-relaxed text-hedgr-700">This is an authored research example for Sarah’s fictional situation. It is not Hedgr reading your money, not Stability Engine output, and not a live financial assessment.</p>
        <p data-testid="study-limits" className="text-sm leading-relaxed text-hedgr-700">This example cannot predict the future exchange rate, assume Sarah’s planned contributions will happen, or establish that the course will be fully funded. It is not financial advice.</p>
        <button type="button" data-testid="study-to-bridge" onClick={() => setStage('bridge')} className="min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue</button>
      </section>
    );
  } else {
    stageBody = (
      <section data-testid="study-bridge" className="mt-8 space-y-5">
        <h2 ref={stageHeading} tabIndex={-1} className="text-lg font-semibold sm:text-xl">You’ve reached the end of this research example.</h2>
        <p>Next, try Hedgr with made-up money. Make a practice deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.</p>
        <Link href="/dashboard-synthetic-journey" data-testid="study-simulation-link" className="inline-flex min-h-11 w-full items-center justify-center bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue to the Hedgr simulation</Link>
      </section>
    );
  }

  return (
    <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12">
      <header className="space-y-3 border-b border-hedgr-200 pb-6">
        <p className="text-sm font-medium text-hedgr-600">Fictional research example · no real money</p>
        <h1 className="break-words text-xl font-semibold text-hedgr-800 sm:text-3xl">Sarah’s course savings</h1>
        <p data-testid="study-common-boundary" className="text-sm leading-relaxed text-hedgr-700">This example uses only the facts on this page. Nothing you do here is saved.</p>
      </header>
      {stageBody}
      <footer className="mt-12 text-sm text-hedgr-600">
        <Link href="/orientation?study=stability-scenarios" className="underline focus:outline-none focus:ring-2 focus:ring-hedgr-500">Review the introduction</Link>
      </footer>
    </main>
  );
}
