import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import type { PositionEntry } from '../../../lib/state/last-visit';
import { PositionLine } from './PositionLine';
import home from './synthetic-home.module.css';

/** Founder page-owned copy/date-format lock, 11 Oct 2026 (§367). */
export const DANIEL_EXAMPLE_COPY = Object.freeze({
  since: 'What changed since Daniel’s last visit',
  visit: 'Daniel’s last visit',
  back: 'Go to your own simulation',
  current: 'Now',
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
              <p id="dashboard-daniel-label" style={{ color: 'var(--color-hedgr-dark)' }}>Fictional example · Daniel’s dollar savings</p>
            </div>
            <div className={`${home.amount} tabular-nums`} style={{ gridColumn: '1 / -1', gridRow: 2 }} data-testid="daniel-read-figure">
              {currentRead.localDisplay}
            </div>
            <p className="text-xs text-hedgr-500" style={{ gridColumn: '1 / -1', gridRow: 3 }} data-testid="daniel-read-caption">
              Example figure, not a quote
            </p>
          </div>
          <p className="text-sm leading-relaxed text-hedgr-dark">Shown in ZMW, Daniel’s currency</p>
          <ul className="space-y-1 text-sm leading-relaxed text-hedgr-600" data-testid="daniel-read-disclosure">
            <li>
              <p data-testid="daniel-read-holding">
                Daniel holds USD 800 in this fictional example. This example only displays it. Nothing is moved or exchanged.
              </p>
              <div className="my-3">
                <PositionLine entries={entries} lastVisit={Date.parse(lastRead.asOf)} settle={1} visitLabel={DANIEL_EXAMPLE_COPY.visit} />
              </div>
            </li>
            <li data-testid="daniel-read-as-of">
              Example date: <time dateTime={currentRead.asOf}>{exampleDate(currentRead.asOf)}</time>.
            </li>
          </ul>
        </div>
        <div className={home.insights}>
          <div className={home.observation}>
            <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid="daniel-since-card">
              <p id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">
                {DANIEL_EXAMPLE_COPY.since}
              </p>
              {observations.map((read, index) => (
                <div key={read.asOf} className="space-y-1" data-testid="daniel-observation">
                  <p className="text-xs text-hedgr-500" data-testid="daniel-observation-label">
                    {index === 0 ? DANIEL_EXAMPLE_COPY.visit : DANIEL_EXAMPLE_COPY.current}{' · '}
                    <time dateTime={read.asOf}>{exampleDate(read.asOf)}</time>
                  </p>
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
            <p className="mt-3 text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-invariant">
              Daniel still holds USD 800. Only the exchange rate changed, so the same amount shows as a different number of kwacha.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-hedgr-600">Not a live rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
