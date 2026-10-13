import type { SarahRead } from '../../../lib/engine/sarah-read';
import { formatUsd } from '../../../lib/utils/money';
import home from './synthetic-home.module.css';

function exampleDate(value: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('day')} ${part('month').slice(0, 3)} ${part('year')}`;
}

/** §377: one independent fee observation and its due metadata, with no simulation state. */
export function SarahExampleHome({ read }: { read: SarahRead }) {
  return (
    <section className={`${home.overview} ${home.exampleHome}`} aria-labelledby="dashboard-sarah-label" data-testid="dashboard-sarah-read">
      <div className={home.overviewGrid} data-testid="sarah-home-grid">
        <div className={home.positionPanel}>
          <div className={home.position}>
            <div className={home.balanceHeading}>
              <p id="dashboard-sarah-label" style={{ color: 'var(--color-hedgr-dark)' }}>Sarah’s course fee</p>
            </div>
            <div className={`${home.amount} ${home.exampleHero} tabular-nums`} style={{ gridColumn: '1 / -1', gridRow: 2 }} data-testid="sarah-read-figure">
              {formatUsd(read.declaredFee.amount)} USD
            </div>
            <p className={home.exampleSecondary} style={{ gridColumn: '1 / -1', gridRow: 3 }} data-testid="sarah-read-caption">
              {read.localDisplay} · Example figure
            </p>
          </div>
          <p className="text-sm leading-relaxed text-hedgr-600" data-testid="sarah-read-as-of">
            Example date: <time dateTime={read.asOf}>{exampleDate(read.asOf)}</time>
          </p>
        </div>
        <div className={home.insights}>
          <div className={home.observation}>
            <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid="sarah-fee-card">
              <h2 id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">Course fee</h2>
              <p className="text-sm leading-relaxed text-hedgr-dark">Due <time dateTime={read.declaredFee.dueDate}>{exampleDate(`${read.declaredFee.dueDate}T00:00:00.000Z`)}</time>.</p>
              <p className="text-sm leading-relaxed text-hedgr-600">{read.explanation.rateAssumption}</p>
              <p className="text-sm leading-relaxed text-hedgr-dark">{read.explanation.limits}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
