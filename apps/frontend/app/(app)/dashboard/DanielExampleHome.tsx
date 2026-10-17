import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import { CLASS_A_VAL_002_DANIEL_EXAMPLE, SYNTHETIC_JOURNEY_EXAMPLES } from '../../../lib/state/synthetic-journey';
import { DANIEL_HOME_TIMELINE_INPUTS } from '../../../lib/state/daniel-home-fixture';
import { formatLocalCurrency } from '../../../lib/utils/money';
import { exampleBalanceSeries, type ChartEvent } from './lineLabels';
import { formatExampleDate } from '../../../lib/utils/date';
import { HomeHero } from './HomeHero';
import { ExampleCard } from './ExampleCard';
import { ExampleLineChart } from './ExampleLineChart';
import { RateLine } from './RateLine';
import home from './synthetic-home.module.css';

export const DANIEL_EXAMPLE_COPY = Object.freeze({
  since: 'Figures over time',
  back: 'Go to your own simulation',
});

type DanielExampleHomeProps = {
  currentRead: DanielRead;
  timeline: readonly DanielRead[];
  returnHref: string;
  onReturn: () => void;
  limitation: ReactNode;
};

/** §389: shared journey presentation; Engine reads and fixture inputs stay unchanged. */
export function DanielExampleHome({ currentRead, timeline, returnHref, onReturn, limitation }: DanielExampleHomeProps) {
  const example = SYNTHETIC_JOURNEY_EXAMPLES.find(item => item.id === CLASS_A_VAL_002_DANIEL_EXAMPLE)!;
  const series = exampleBalanceSeries(example.deposits, currentRead.asOf);
  const events: ChartEvent[] = [
    ...example.deposits.map((deposit, index) => ({ id: `deposit-${index}`, at: Date.parse(deposit.at), kind: 'deposit' as const, amount: deposit.amount, currency: deposit.currency, testId: 'daniel-observation' })),
    ...timeline.map((read, index) => ({ id: `reading-${index}`, at: Date.parse(read.asOf), kind: 'reading' as const, testId: 'daniel-observation', prefix: index === timeline.length - 1 ? '' : `≈ ${formatLocalCurrency(read.localAmountZmwMinor / 100, 'ZMW')} · `, suffix: index === timeline.length - 1 ? ' · shown above' : ` · example rate ${DANIEL_HOME_TIMELINE_INPUTS[index].fixtureRateZmwPerUsd}` })),
  ];
  return (
    <section className={`${home.overview} ${home.exampleHome}`} aria-labelledby="dashboard-daniel-label" data-testid="dashboard-daniel-read">
      <div className={home.overviewGrid} data-testid="daniel-home-grid">
        <div className={home.positionPanel}>
          <HomeHero label={`Fictional example · ${example.name}`} labelId="dashboard-daniel-label" usdAmount={currentRead.declaredHolding.amount} figureTestId="daniel-read-figure" localTestId="daniel-read-caption" />
          <ExampleLineChart mode="step" series={series} events={events} example />
          <p className="text-sm leading-relaxed text-hedgr-600" data-testid="daniel-read-as-of">Example date: <time dateTime={currentRead.asOf}>{formatExampleDate(currentRead.asOf)}</time></p>
        </div>
        <div className={home.insights}>
          <div className={home.observation} data-testid="daniel-read-disclosure">
            <ExampleCard title={DANIEL_EXAMPLE_COPY.since} testId="daniel-since-card" rate={<RateLine text={currentRead.explanation.rateAssumption} data-testid="daniel-read-rate" />} limits={limitation}>
              <p className="mt-3 text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-invariant">He made two deposits and none since. Each kwacha figure uses the example rate for its date.</p>
            </ExampleCard>
            <Link href={returnHref} className={home.sinceLink} onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault(); onReturn();
            }}>{DANIEL_EXAMPLE_COPY.back}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
