import Link from 'next/link';
import type { ReactNode } from 'react';
import type { DanielRead } from '../../../lib/engine/daniel-read';
import { formatUsd } from '../../../lib/utils/money';
import { HeldAmountLine } from './HeldAmountLine';
import home from './synthetic-home.module.css';

/** Founder page-owned copy/date-format lock, 13 Oct 2026 (§377). */
export const DANIEL_EXAMPLE_COPY = Object.freeze({
  since: 'Daniel’s example readings',
  back: 'Go to your own simulation',
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

/** §377: declared USD hero; Engine local text and decorative minor-unit geometry. */
export function DanielExampleHome({ currentRead, timeline, returnHref, onReturn, limitation }: DanielExampleHomeProps) {
  return (
    <section className={`${home.overview} ${home.exampleHome}`} aria-labelledby="dashboard-daniel-label" data-testid="dashboard-daniel-read">
      <div className={home.overviewGrid} data-testid="daniel-home-grid">
        <div className={home.positionPanel}>
          <div className={home.position}>
            <div className={home.balanceHeading}>
              <p id="dashboard-daniel-label" style={{ color: 'var(--color-hedgr-dark)' }}>Fictional example · Daniel’s dollar savings</p>
            </div>
            <div className={`${home.amount} ${home.exampleHero} tabular-nums`} style={{ gridColumn: '1 / -1', gridRow: 2 }} data-testid="daniel-read-figure">
              {formatUsd(currentRead.declaredHolding.amount)} USD
            </div>
            <p className={home.exampleSecondary} style={{ gridColumn: '1 / -1', gridRow: 3 }} data-testid="daniel-read-caption">
              {currentRead.localDisplay} · Example figure, not a quote
            </p>
          </div>
          <p className="text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-read-holding">This example only displays it. Nothing is moved or exchanged.</p>
        </div>
        <div className={home.insights}>
          <div className={home.observation} data-testid="daniel-read-disclosure">
            <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid="daniel-since-card">
              <h2 id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">{DANIEL_EXAMPLE_COPY.since}</h2>
              <HeldAmountLine reads={timeline} />
              <ol className={home.exampleReadings}>
                {timeline.map((read) => (
                  <li key={read.asOf} data-testid="daniel-observation"><time dateTime={read.asOf}>{exampleDate(read.asOf)}</time>{' · '}{read.localDisplay}</li>
                ))}
              </ol>
            </section>
            <p className="mt-3 text-sm leading-relaxed text-hedgr-dark" data-testid="daniel-invariant">Daniel’s dollar amount is unchanged across these example dates. Only the example exchange rate changes the kwacha figure.</p>
            <p className="mt-3 text-sm leading-relaxed text-hedgr-600" data-testid="daniel-read-rate">{currentRead.explanation.rateAssumption}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
