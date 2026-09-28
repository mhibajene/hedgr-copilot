'use client';

import { PublicTxStatus, type TxLifecycle } from '../tx';

/**
 * HOME-EXPERIENCE-001 T3 (decision 7): the one approved local value — the time
 * of the last Home visit. Browser-local only; no server, telemetry or personal
 * data. Written only by Home in simulated contexts; cleared by journey reset.
 * Rollback: revert T3 runtime and remove this key (no other migration).
 */
export const LAST_VISIT_STORAGE_KEY = 'hedgr:last-home-visit';

export function readLastVisit(): number | null {
  try {
    const raw = window.localStorage.getItem(LAST_VISIT_STORAGE_KEY);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function writeLastVisit(timestamp: number): void {
  try {
    window.localStorage.setItem(LAST_VISIT_STORAGE_KEY, String(timestamp));
  } catch {
    // Storage unavailable: Home falls back to the existing observation.
  }
}

export function clearLastVisit(): void {
  try {
    window.localStorage.removeItem(LAST_VISIT_STORAGE_KEY);
  } catch {
    // no-op
  }
}

export type PositionEntry = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW';
  amountUSD: number;
  at: number;
  balanceBefore: number;
  balanceAfter: number;
};

/** Completed entries in Activity order (createdAt, then id) with running balances. */
export function buildPositionEntries(transactions: TxLifecycle[]): PositionEntry[] {
  const completed = transactions
    .filter((tx) => tx.status === PublicTxStatus.SUCCESS)
    .sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
  let running = 0;
  return completed.map((tx) => {
    const balanceBefore = running;
    running = +(running + (tx.type === 'DEPOSIT' ? tx.amountUSD : -tx.amountUSD)).toFixed(2);
    return {
      id: tx.id,
      type: tx.type,
      amountUSD: tx.amountUSD,
      at: tx.createdAt,
      balanceBefore,
      balanceAfter: running,
    };
  });
}

export function balanceAt(entries: PositionEntry[], timestamp: number): number {
  let balance = 0;
  for (const entry of entries) {
    if (entry.at > timestamp) break;
    balance = entry.balanceAfter;
  }
  return balance;
}

export type SinceSummary =
  | { kind: 'no-change'; since: number; balance: number }
  | { kind: 'one'; since: number; entry: PositionEntry; from: number; to: number }
  | { kind: 'several'; since: number; entries: PositionEntry[]; from: number; to: number };

export function summariseSinceLastVisit(
  entries: PositionEntry[],
  lastVisit: number
): SinceSummary {
  const changed = entries.filter((entry) => entry.at > lastVisit);
  const from = balanceAt(entries, lastVisit);
  const to = entries.at(-1)?.balanceAfter ?? 0;
  if (changed.length === 0) return { kind: 'no-change', since: lastVisit, balance: to };
  if (changed.length === 1) {
    return { kind: 'one', since: lastVisit, entry: changed[0], from, to };
  }
  return { kind: 'several', since: lastVisit, entries: changed, from, to };
}

// Fixed names keep dates identical across browsers (ICU renders en-GB "Sept").
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "24 Sep" (local time) */
export function formatShortDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

/** "Sunday 27 September" (local time) */
export function formatDateLine(timestamp: number): string {
  const date = new Date(timestamp);
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

const COUNT_WORDS = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

/** "Two" … "Ten", then digits. */
export function formatChangeCount(count: number): string {
  return count >= 2 && count <= 10 ? COUNT_WORDS[count - 2] : String(count);
}

export function formatUsd(amount: number): string {
  return `$${Math.abs(amount).toFixed(2)}`;
}
