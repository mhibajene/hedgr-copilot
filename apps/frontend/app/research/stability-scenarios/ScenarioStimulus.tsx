'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getSimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';
import {
  SARAH_FIGURES,
  formatScenarioAmount,
  savingsCurrencyNames,
} from '../../../lib/research/scenario-fixtures';
import { ResearchChrome, researchStyles as rs } from '../ResearchChrome';

type Stage = 'a1' | 'a2' | 'hedgr' | 'bridge';

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
  // Every row stacks its heading above its value at all widths, so a marker never shares a line with a value.
  return (
    <div
      data-row={rowKey}
      className={`flex min-w-0 flex-col gap-1${isWatch ? ' border-t border-hedgr-300 pt-3' : ''}`}
    >
      <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-hedgr-800">
        <span data-testid="study-row-label">{label}</span>
        {/* Secondary status tied to the row heading; never part of the value. */}
        {marker ? (
          <span data-testid="study-row-marker" className="inline-flex items-center rounded-full bg-hedgr-100 px-2 py-0.5 text-xs font-medium leading-none text-hedgr-800">{marker}</span>
        ) : null}
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
    return <div className={rs.page}><main data-testid="stability-stimulus" className={rs.main}><p role="status">Preparing the fictional example…</p></main></div>;
  }

  const savingsCurrencyName = savingsCurrencyNames[currency];
  const figures = SARAH_FIGURES[currency];
  const amount = (value: string) => formatScenarioAmount(currency, value);
  const availableNow = amount(figures.setAside);
  const planned = `${amount(figures.planned)} over 12 months, not available yet`;
  const localFeeNeed = `${amount(figures.fee)} on 1 October 2027`;
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
        <section aria-labelledby="sarah-facts-heading" data-testid="sarah-facts" className={`${rs.panel} mt-8 space-y-4`}>
          <h2 id="sarah-facts-heading" ref={stageHeading} tabIndex={-1} className="break-words text-base font-semibold sm:text-xl">
            {stage === 'a1' ? 'Sarah is saving for a postgraduate course.' : 'Sarah’s changed course fee'}
          </h2>
          {stage === 'a1' ? (
            <>
              <p className="text-sm text-hedgr-700">Situation on 1 October 2026</p>
              <p>Sarah already has {amount(figures.setAside)} set aside. She plans to add {amount(figures.monthly)} on the 15th of each month for the next 12 months, starting on 15 October 2026. Those contributions have not happened yet.</p>
            </>
          ) : null}
          <p data-testid="course-fee">{stage === 'a1'
            ? 'The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.'
            : `The course provider has changed the fee to ${amount(figures.fee)}, payable in ${currency === 'ZMW' ? 'Zambian kwacha' : savingsCurrencyName} on 1 October 2027. It was USD 1,000, payable in US dollars.`}</p>
          {stage === 'a2' ? (
            <p>Nothing else has changed.</p>
          ) : null}
        </section>
        {stage === 'a1' ? (
          <button type="button" data-testid="study-continue" onClick={() => setStage('a2')} className={`${rs.primary} mt-8`}>Continue to the changed course fee</button>
        ) : (
          <button type="button" data-testid="study-to-hedgr" onClick={() => setStage('hedgr')} className={`${rs.primary} mt-8`}>Continue</button>
        )}
      </>
    );
  } else if (stage === 'hedgr') {
    stageBody = (
      <section data-testid="study-hedgr-explanation" className="mt-8 space-y-5">
        <p data-testid="study-authored-label" className="break-words text-sm font-medium text-hedgr-600">Research example about a fictional person</p>
        <h2 ref={stageHeading} tabIndex={-1} className="break-words text-lg font-semibold sm:text-xl">What Hedgr helps Sarah see</h2>
        <div data-testid="study-value-panel" className={`@container space-y-5 break-words ${rs.panel}`}>
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
                  value: `Sarah’s savings and the fee are now both in ${savingsCurrencyName}, so the exchange rate no longer changes the amount she needs. What is still open is whether the planned ${amount(figures.planned)} arrives on time.`,
                  marker: 'New',
                },
              ]}
            />
          </div>
        </div>
        <p data-testid="study-attribution" className="text-sm font-medium leading-relaxed text-hedgr-700">This example was written in advance by Hedgr, using only the facts about Sarah on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.</p>
        <p data-testid="study-limits" className="text-sm leading-relaxed text-hedgr-700">This example cannot predict the future exchange rate, assume Sarah’s planned contributions will happen, or establish that the course will be fully funded. It is not financial advice.</p>
        <button type="button" data-testid="study-to-bridge" onClick={() => setStage('bridge')} className={rs.primary}>Continue</button>
      </section>
    );
  } else {
    stageBody = (
      <section data-testid="study-bridge" className="mt-8 space-y-5">
        <h2 ref={stageHeading} tabIndex={-1} className="text-lg font-semibold sm:text-xl">You’ve reached the end of this research example.</h2>
        <p>Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.</p>
        {/* §332: open the simulation at a clean start so returning participants see first use. */}
        <Link href="/dashboard-synthetic-journey?reset=1" data-testid="study-simulation-link" className={rs.primary}>Continue to the Hedgr simulation</Link>
      </section>
    );
  }

  return (
    <ResearchChrome
      title="Sarah’s course savings"
      testId="stability-stimulus"
      footer={{ href: '/orientation?study=stability-scenarios', label: 'Review the introduction' }}
    >
      {stageBody}
    </ResearchChrome>
  );
}
