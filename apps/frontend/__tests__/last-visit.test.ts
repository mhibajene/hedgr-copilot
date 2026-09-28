// @vitest-environment jsdom

import { afterEach, describe, expect, test } from 'vitest';
import { PublicTxStatus, type TxLifecycle } from '../lib/tx';
import {
  LAST_VISIT_STORAGE_KEY,
  balanceAt,
  buildPositionEntries,
  clearLastVisit,
  formatChangeCount,
  formatDateLine,
  formatShortDate,
  formatUsd,
  readLastVisit,
  summariseSinceLastVisit,
  writeLastVisit,
} from '../lib/state/last-visit';

const DAY = 24 * 60 * 60 * 1000;
const T0 = new Date(2026, 8, 20, 10, 0).getTime();

function tx(
  id: string,
  type: TxLifecycle['type'],
  amountUSD: number,
  createdAt: number,
  status: TxLifecycle['status'] = PublicTxStatus.SUCCESS
): TxLifecycle {
  return { id, type, amountUSD, createdAt, updatedAt: createdAt, status };
}

afterEach(() => window.localStorage.clear());

describe('last-visit storage', () => {
  test('stores one local value and clears it', () => {
    expect(readLastVisit()).toBeNull();
    writeLastVisit(T0);
    expect(window.localStorage.getItem(LAST_VISIT_STORAGE_KEY)).toBe(String(T0));
    expect(readLastVisit()).toBe(T0);
    clearLastVisit();
    expect(readLastVisit()).toBeNull();
    expect(window.localStorage.length).toBe(0);
  });

  test('ignores an invalid stored value', () => {
    window.localStorage.setItem(LAST_VISIT_STORAGE_KEY, 'not-a-time');
    expect(readLastVisit()).toBeNull();
  });
});

describe('position entries', () => {
  test('follow Activity order and ignore pending and failed entries', () => {
    const entries = buildPositionEntries([
      tx('b', 'WITHDRAW', 2, T0 + DAY),
      tx('a', 'DEPOSIT', 5, T0),
      tx('p', 'DEPOSIT', 9, T0 + 2 * DAY, PublicTxStatus.IN_PROGRESS),
      tx('f', 'WITHDRAW', 1, T0 + 3 * DAY, PublicTxStatus.FAILED),
    ]);
    expect(entries.map((e) => [e.id, e.balanceBefore, e.balanceAfter])).toEqual([
      ['a', 0, 5],
      ['b', 5, 3],
    ]);
  });

  test('keep cent precision across many entries', () => {
    const entries = buildPositionEntries([
      tx('a', 'DEPOSIT', 0.1, T0),
      tx('b', 'DEPOSIT', 0.2, T0 + 1),
      tx('c', 'WITHDRAW', 0.3, T0 + 2),
    ]);
    expect(entries.at(-1)?.balanceAfter).toBe(0);
  });

  test('full withdrawal ends at zero', () => {
    const entries = buildPositionEntries([tx('a', 'DEPOSIT', 5, T0), tx('b', 'WITHDRAW', 5, T0 + DAY)]);
    expect(entries.at(-1)?.balanceAfter).toBe(0);
    expect(balanceAt(entries, T0 + DAY / 2)).toBe(5);
    expect(balanceAt(entries, T0 - 1)).toBe(0);
  });
});

describe('since last visit', () => {
  const entries = buildPositionEntries([tx('a', 'DEPOSIT', 5, T0), tx('b', 'WITHDRAW', 2, T0 + 6 * DAY)]);

  test('no change', () => {
    expect(summariseSinceLastVisit(entries, T0 + 7 * DAY)).toEqual({
      kind: 'no-change',
      since: T0 + 7 * DAY,
      balance: 3,
    });
  });

  test('one change', () => {
    const summary = summariseSinceLastVisit(entries, T0 + 4 * DAY);
    expect(summary.kind).toBe('one');
    if (summary.kind !== 'one') return;
    expect(summary.entry.id).toBe('b');
    expect([summary.from, summary.to]).toEqual([5, 3]);
  });

  test('several changes, starting from before any entry', () => {
    const summary = summariseSinceLastVisit(entries, T0 - 8 * DAY);
    expect(summary.kind).toBe('several');
    if (summary.kind !== 'several') return;
    expect(summary.entries.map((e) => e.id)).toEqual(['a', 'b']);
    expect([summary.from, summary.to]).toEqual([0, 3]);
  });
});

describe('formatting', () => {
  test('dates and amounts', () => {
    expect(formatShortDate(T0)).toBe('20 Sep');
    expect(formatDateLine(T0)).toBe('Sunday 20 September');
    expect(formatUsd(-2)).toBe('$2.00');
    expect(formatUsd(1234.5)).toBe('$1234.50');
  });

  test('change counts', () => {
    expect(formatChangeCount(2)).toBe('Two');
    expect(formatChangeCount(3)).toBe('Three');
    expect(formatChangeCount(10)).toBe('Ten');
    expect(formatChangeCount(11)).toBe('11');
  });
});
