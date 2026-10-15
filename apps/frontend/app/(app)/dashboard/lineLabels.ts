import { formatShortDate } from '../../../lib/state/last-visit';
import { formatExampleDate } from '../../../lib/utils/date';

export type LineCurrency = 'USD' | 'ZMW';
export type BalanceSample = { at: string; value: number; currency: LineCurrency };
export type ChartEvent = {
  id: string;
  at: number;
  kind: 'deposit' | 'withdrawal' | 'reading';
  amount?: number;
  currency?: LineCurrency;
  prefix?: string;
  suffix?: string;
  testId?: string;
};
type LocatedEvent = { id: string; at: number; x: number };
export type LineLabel = { id: string; x: number; text: string; width?: number };

export function labelBudget(width: number): number { return width <= 480 ? 2 : 3; }

export function countChanges(count: number, visited: boolean): string {
  if (count === 0 && visited) return 'No changes since your last visit';
  return `${count} ${count === 1 ? 'change' : 'changes'}${visited ? ' since your last visit' : ''}`;
}

export function selectLabels(events: readonly LocatedEvent[], lastVisit: number | null, width: number): LineLabel[] {
  const changed = lastVisit === null ? [] : events.filter(event => event.at > lastVisit);
  const selected = changed.length ? changed : events.slice(-1);
  if (selected.length > labelBudget(width)) {
    const latest = selected[selected.length - 1];
    return [{ id: latest.id, x: latest.x, text: countChanges(selected.length, lastVisit !== null) }];
  }
  return selected.map(event => ({ id: event.id, x: event.x, text: countChanges(1, lastVisit !== null && changed.length > 0) }));
}

export function mergeDots<T extends LocatedEvent>(events: readonly T[]): { x: number; events: T[] }[] {
  const groups: { x: number; events: T[] }[] = [];
  for (const event of events) {
    const previous = groups.at(-1);
    if (previous && event.x - previous.events[previous.events.length - 1].x < 14) {
      previous.events.push(event);
      previous.x = previous.events.reduce((sum, point) => sum + point.x, 0) / previous.events.length;
    } else groups.push({ x: event.x, events: [event] });
  }
  return groups;
}

export function placeLabels(labels: readonly LineLabel[], plotWidth: number) {
  let endAbove = -Infinity;
  const belowEnds: number[] = [];
  return labels.map(label => {
    const width = Math.min(label.width ?? label.text.length * 7 + 16, plotWidth);
    const left = Math.max(0, Math.min(label.x - width / 2, plotWidth - width));
    const placement = left < endAbove + 8 ? 'below' : 'above';
    if (placement === 'above') endAbove = left + width;
    let lane = 0;
    if (placement === 'below') {
      while (lane < belowEnds.length && left < belowEnds[lane] + 8) lane++;
      belowEnds[lane] = left + width;
    }
    return { ...label, width, left, placement, lane };
  });
}

/** Presentation only: existing local event dates, UTC fictional dates, current-year suppression. */
export function formatEventDate(at: number, example = false, showYear = true): string {
  const date = new Date(at);
  const full = formatExampleDate(date.toISOString());
  const short = example ? full.replace(/ \d{4}$/, '') : formatShortDate(at);
  const year = example ? date.getUTCFullYear() : date.getFullYear();
  return `${short}${showYear && year !== new Date().getFullYear() ? ` ${year}` : ''}`;
}

/** Registry facts only; no FX or Engine computation. */
export function exampleBalanceSeries(
  deposits: readonly { at: string; amount: number; currency: LineCurrency }[],
  readAt: string,
  holding?: { amount: number; currency: LineCurrency },
): BalanceSample[] {
  let balance = 0;
  const series = deposits.map(deposit => {
    balance += deposit.amount;
    return { at: deposit.at, value: balance, currency: deposit.currency };
  });
  const last = series.at(-1);
  return last ? [...series, { at: readAt, value: holding?.amount ?? last.value, currency: holding?.currency ?? last.currency }] : [];
}
