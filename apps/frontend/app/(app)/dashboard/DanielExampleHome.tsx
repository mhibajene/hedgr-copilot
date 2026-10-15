import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import { CLASS_A_VAL_002_DANIEL_EXAMPLE, SYNTHETIC_JOURNEY_EXAMPLES } from '../../../lib/state/synthetic-journey';
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
  return (
    <section className={`${home.overview} ${home.exampleHome}`} aria-labelledby="dashboard-daniel-label" data-testid="dashboard-daniel-read">
      <div className={home.overviewGrid} data-testid="daniel-home-grid">
        <div className={home.positionPanel}>
          <HomeHero label={`Fictional example · ${example.name}`} labelId="dashboard-daniel-label" usdAmount={currentRead.declaredHolding.amount} figureTestId="daniel-read-figure" localTestId="daniel-read-caption" />
          <p className="text-sm leading-relaxed text-hedgr-600" data-testid="daniel-read-as-of">Example date: <time dateTime={currentRead.asOf}>{formatExampleDate(currentRead.asOf)}</time></p>
        </div>
        <div className={home.insights}>
          <div className={home.observation} data-testid="daniel-read-disclosure">
            <ExampleCard title={DANIEL_EXAMPLE_COPY.since} testId="daniel-since-card" rate={<RateLine text={currentRead.explanation.rateAssumption} data-testid="daniel-read-rate" />} limits={limitation}>
              <ExampleLineChart reads={timeline} />
              <ol className={home.exampleReadings}>
                {timeline.map((read, index) => (
                  <li key={read.asOf} data-testid="daniel-observation"><time dateTime={read.asOf}>{formatExampleDate(read.asOf)}</time>{' · '}{index === timeline.length - 1 ? 'shown above' : read.localDisplay}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-invariant">Daniel’s dollar amount is unchanged across these example dates. Only the example exchange rate changes the kwacha figure.</p>
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
