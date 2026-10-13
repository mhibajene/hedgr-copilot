import type { SarahRead } from '../../../lib/engine/sarah-read';
import home from './synthetic-home.module.css';

/** §374: one fictional fee observation; no simulation state or additional computation. */
export function SarahExampleHome({ read }: { read: SarahRead }) {
  return (
    <section className={home.overview} aria-labelledby="dashboard-sarah-label" data-testid="dashboard-sarah-read">
      <div className={home.overviewGrid} data-testid="sarah-home-grid">
        <div className={home.positionPanel}>
          <div className={home.position}>
            <div className={home.balanceHeading}>
              <p id="dashboard-sarah-label" style={{ color: 'var(--color-hedgr-dark)' }}>Sarah’s fictional course fee</p>
            </div>
            <div className={`${home.amount} tabular-nums`} style={{ gridColumn: '1 / -1', gridRow: 2 }} data-testid="sarah-read-figure">
              {read.localDisplay}
            </div>
            <p className="text-xs text-hedgr-500" style={{ gridColumn: '1 / -1', gridRow: 3 }} data-testid="sarah-read-caption">
              Example fee estimate
            </p>
          </div>
          <p className="text-sm leading-relaxed text-hedgr-600" data-testid="sarah-read-as-of">
            Example date: <time dateTime={read.asOf}>9 Oct 2026</time>
          </p>
        </div>
        <div className={home.insights}>
          <div className={home.observation}>
            <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid="sarah-fee-card">
              <h2 id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">Course fee</h2>
              <p className="text-sm leading-relaxed text-hedgr-dark">{read.explanation.fee}</p>
              <p className="text-sm leading-relaxed text-hedgr-600">{read.explanation.rateAssumption}</p>
              <p className="text-sm leading-relaxed text-hedgr-dark">{read.explanation.limits}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
