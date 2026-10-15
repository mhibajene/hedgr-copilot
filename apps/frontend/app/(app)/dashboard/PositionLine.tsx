'use client';

import type { PositionEntry } from '../../../lib/state/last-visit';
import { ExampleLineChart } from './ExampleLineChart';
import home from './synthetic-home.module.css';

type PositionLineProps = {
  entries: PositionEntry[];
  lastVisit: number | null;
  settle?: number;
  visitLabel?: string;
  visualise?: boolean;
  heroAmount?: number;
};

/** §391: journey-only presentation of completed ledger facts; legacy Home stays exact. */
export function PositionLine({ visualise = false, heroAmount, ...props }: PositionLineProps) {
  if (!visualise) return <ExampleLineChart mode="legacy" {...props} />;
  if (!props.entries.length) return <div className={`${home.positionLineEmpty} ${home.visualiserEmpty}`} data-testid="dashboard-position-line" data-state="empty"><span className={home.positionLineRing} aria-hidden="true" /><p>No deposits yet. Your first one will start this chart.</p></div>;
  const series = props.entries.map(entry => ({ at: new Date(entry.at).toISOString(), value: entry.balanceAfter, currency: 'USD' as const }));
  const events = props.entries.map(entry => ({ id: entry.id, at: entry.at, kind: entry.type === 'DEPOSIT' ? 'deposit' as const : 'withdrawal' as const, amount: entry.amountUSD, currency: 'USD' as const }));
  return <div data-testid="dashboard-position-line" data-state="line"><ExampleLineChart mode="step" series={series} events={events} lastVisit={props.lastVisit} settle={props.settle} heroAmount={heroAmount} /></div>;
}
