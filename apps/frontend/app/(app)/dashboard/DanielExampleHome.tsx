import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import type { PositionEntry } from '../../../lib/state/last-visit';
import { SIMULATION_DISPLAY_ESTIMATE_CAPTION } from '../../../lib/state/simulation-display-currency';
import { PositionLine } from './PositionLine';
import home from './synthetic-home.module.css';

/** Candidate slots only until Dex supplies the Founder-confirmed copy/date-format lock. */
export const DANIEL_EXAMPLE_COPY = Object.freeze({
  since: 'Since Daniel was last here',
  visit: 'Daniel’s last visit',
  back: 'Back to your own simulation',
  current: 'Now',
  currencyContext: 'Currency context',
  dateLocale: 'en-GB',
  monthCharacters: 3,
  dateFormat: Object.freeze({ day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' } as const),
});

function exampleDate(asOf: string): string {
  const parts = new Intl.DateTimeFormat(DANIEL_EXAMPLE_COPY.dateLocale, DANIEL_EXAMPLE_COPY.dateFormat).formatToParts(new Date(asOf));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((value) => value.type === type)?.value ?? '';
  return `${part('day')} ${part('month').slice(0, DANIEL_EXAMPLE_COPY.monthCharacters)} ${part('year')}`;
}

type DanielExampleHomeProps = {
  currentRead: DanielRead;
  timeline: readonly DanielRead[];
  returnHref: string;
  onReturn: () => void;
  limitation: ReactNode;
};

/** §365: presentation only. Every text figure and explanation is an Engine output. */
export function DanielExampleHome({ currentRead, timeline, returnHref, onReturn, limitation }: DanielExampleHomeProps) {
  const lastRead = timeline[1];
  const observations = [lastRead, currentRead];
  // The chart uses minor units directly as its vertical coordinates. Its transaction-shaped
  // fields are presentation slots only; none becomes a ledger entry or a displayed amount.
  const entries: PositionEntry[] = timeline.map((read) => ({
    id: read.asOf,
    type: 'DEPOSIT',
    amountUSD: 0,
    at: Date.parse(read.asOf),
    balanceBefore: read.localAmountZmwMinor,
    balanceAfter: read.localAmountZmwMinor,
  }));

  return (
    <section className={home.overview} aria-labelledby="dashboard-daniel-label" data-testid="dashboard-daniel-read">
      <div className={home.overviewGrid} data-testid="daniel-home-grid">
        <div className={home.positionPanel}>
          <div className={home.position}>
            <div className={home.balanceHeading}>
              <p id="dashboard-daniel-label">Daniel’s declared holding · Fictional example</p>
            </div>
            <div className={`${home.amount} tabular-nums`} style={{ gridColumn: '1 / -1', gridRow: 2 }} data-testid="daniel-read-figure">
              {currentRead.localDisplay}
            </div>
            <p className="text-xs text-hedgr-500" style={{ gridColumn: '1 / -1', gridRow: 3 }} data-testid="daniel-read-caption">
              {SIMULATION_DISPLAY_ESTIMATE_CAPTION}
            </p>
          </div>
          <ul className="space-y-1 text-sm leading-relaxed text-hedgr-600" data-testid="daniel-read-disclosure">
            <li>
              <p data-testid="daniel-read-holding">
                Fictional user-declared holding: {currentRead.declaredHolding.currency}{' '}
                {currentRead.declaredHolding.amount.toLocaleString('en-US')}. Hedgr only reads it.
              </p>
              <div className="my-3">
                <PositionLine entries={entries} lastVisit={Date.parse(lastRead.asOf)} settle={1} visitLabel={DANIEL_EXAMPLE_COPY.visit} />
              </div>
            </li>
            <li data-testid="daniel-read-pair">Pair: {currentRead.pair}.</li>
            <li data-testid="daniel-read-rate">{currentRead.explanation.rateAssumption}</li>
            <li data-testid="daniel-read-as-of">
              As of <time dateTime={currentRead.asOf}>{exampleDate(currentRead.asOf)}</time>, a fixed example time.
            </li>
          </ul>
        </div>
        <div className={home.insights}>
          <div className={home.observation}>
            <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid="daniel-since-card">
              <p id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">
                {DANIEL_EXAMPLE_COPY.since}
              </p>
              {observations.map((read) => (
                <div key={read.asOf} className="space-y-1" data-testid="daniel-observation">
                  <time className="text-xs text-hedgr-500" dateTime={read.asOf}>{exampleDate(read.asOf)}</time>
                  <p className="text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-observation-holding">{read.explanation.holding}</p>
                  <p className="text-sm leading-relaxed text-hedgr-600" data-testid="daniel-observation-rate">{read.explanation.rateAssumption}</p>
                </div>
              ))}
              {limitation}
              <Link
                href={returnHref}
                className={home.sinceLink}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onReturn();
                }}
              >
                {DANIEL_EXAMPLE_COPY.back}
              </Link>
            </section>
          </div>
        </div>
      </div>
      <section className="mt-4 min-w-0 border-t border-hedgr-200 pt-4" aria-labelledby="daniel-currency-label" data-testid="daniel-currency-context">
        <h2 id="daniel-currency-label" className="text-sm font-semibold text-hedgr-800">{DANIEL_EXAMPLE_COPY.currencyContext}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {observations.map((read, index) => (
            <div key={read.asOf} className="min-w-0 space-y-2" data-testid="daniel-currency-point">
              <p className="text-xs text-hedgr-600">{index === 0 ? DANIEL_EXAMPLE_COPY.visit : DANIEL_EXAMPLE_COPY.current}</p>
              <p className="text-xl font-semibold leading-tight tabular-nums text-hedgr-dark" data-testid="daniel-currency-figure">{read.localDisplay}</p>
              <p className="text-sm leading-relaxed text-hedgr-600" data-testid="daniel-currency-rate">{read.explanation.rateAssumption}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
