'use client';

import baseline from '../shared-baseline.module.css';

import finish from '../product-finish.module.css';
import wallet from '../research-wallet.module.css';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useLedgerStore } from '../../../lib/state/ledger';
import { getEnvironmentMode } from '../../../lib/env/mode';
import { TxStatusPill, TxDetailModal } from '../../../components';
import {
  PublicTxStatus,
  txToLifecycle,
  type TxLifecycle,
} from '../../../lib/tx';
import { EmptyState } from '@hedgr/ui';
import { ActionDock } from '../ActionDock';
import { formatShortDate } from '../../../lib/state/last-visit';
import {
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  CLASS_A_VAL_002_SCENARIO_PARAM,
  CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
} from '../../../lib/state/synthetic-journey';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function groupByDay(transactions: TxLifecycle[]): Map<string, TxLifecycle[]> {
  const groups = new Map<string, TxLifecycle[]>();
  for (const tx of transactions) {
    const day = formatDate(tx.createdAt);
    if (!groups.has(day)) {
      groups.set(day, []);
    }
    groups.get(day)!.push(tx);
  }
  return groups;
}

function getSyntheticResultingBalances(
  transactions: TxLifecycle[]
): Map<string, number> {
  const chronological = [...transactions].sort(
    (a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)
  );
  const resultingById = new Map<string, number>();
  let runningBalance = 0;

  for (const tx of chronological) {
    if (tx.status !== PublicTxStatus.SUCCESS) continue;

    runningBalance += tx.type === 'DEPOSIT' ? tx.amountUSD : -tx.amountUSD;
    resultingById.set(tx.id, +runningBalance.toFixed(2));
  }

  return resultingById;
}

type FilterType = 'all' | 'deposits' | 'withdrawals';

// HOME-EXPERIENCE-001 T4: entry thread helpers (fixed names keep dates stable across browsers).
const THREAD_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const THREAD_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Sat 26 Sep" (local time) */
function formatThreadDay(timestamp: number): string {
  const date = new Date(timestamp);
  return `${THREAD_WEEKDAYS[date.getDay()]} ${date.getDate()} ${THREAD_MONTHS[date.getMonth()]}`;
}

/** "09:41" (local time, 24-hour) */
function formatThreadTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function threadDayKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function ThreadIcon({ type }: { type: 'DEPOSIT' | 'WITHDRAW' }) {
  return (
    <span className={finish.threadIcon} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {type === 'DEPOSIT' ? (
          <>
            <path d="M12 4v11" />
            <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
          </>
        ) : (
          <>
            <path d="M12 15V4" />
            <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
          </>
        )}
        <path d="M5 16v3h14v-3" />
      </svg>
    </span>
  );
}

/** Title, status line and amount shared by both simulated thread cards. */
function ThreadCardContent({ tx, completed }: { tx: TxLifecycle; completed: boolean }) {
  return (
    <>
      <span className={finish.threadCardText}>
        <strong data-testid={`activity-type-${tx.type.toLowerCase()}`}>
          {tx.type === 'DEPOSIT' ? 'Simulated deposit' : 'Simulated withdrawal'}
        </strong>
        <small data-testid={`activity-status-line-${tx.type.toLowerCase()}`}>
          {completed ? (
            <>Completed · {formatThreadTime(tx.createdAt)}</>
          ) : (
            <>
              <TxStatusPill status={tx.status} /> <span>{formatThreadTime(tx.createdAt)}</span>
            </>
          )}
        </small>
      </span>
      <strong className={finish.threadCardAmount} data-testid={`activity-delta-${tx.type.toLowerCase()}`}>
        {tx.type === 'DEPOSIT' ? '+' : '−'}${tx.amountUSD.toFixed(2)}
      </strong>
    </>
  );
}

function TransactionTypeIcon({ type }: { type: 'DEPOSIT' | 'WITHDRAW' }) {
  if (type === 'DEPOSIT') {
    return (
      <div className={finish.eventMarker}>
        <svg
          className="h-5 w-5 text-hedgr-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m0-16l-4 4m4-4l4 4"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={finish.eventMarker}>
      <svg
        className="h-5 w-5 text-hedgr-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20V4m0 16l4-4m-4 4l-4-4"
        />
      </svg>
    </div>
  );
}

function ActivityRow({
  tx,
  onClick,
  syntheticJourneyActive,
  resultingBalance,
}: {
  tx: TxLifecycle;
  onClick: () => void;
  syntheticJourneyActive: boolean;
  resultingBalance?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`activity-row-${tx.type.toLowerCase()}`}
      data-activity-type={tx.type}
      data-activity-status={tx.status}
      className={`w-full cursor-pointer py-4 text-left motion-safe:transition-colors hover:bg-hedgr-100/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hedgr-500 ${finish.eventRow} ${baseline.defaultEvent}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <TransactionTypeIcon type={tx.type} />

        <div className={`min-w-0 flex-1 ${baseline.eventDescription}`}>
          <span
            className={`font-semibold text-hedgr-800 ${finish.eventTitle}`}
            data-testid={`activity-type-${tx.type.toLowerCase()}`}
          >
            {syntheticJourneyActive
              ? tx.type === 'DEPOSIT'
                ? 'Simulated deposit'
                : 'Simulated withdrawal'
              : tx.type === 'DEPOSIT'
              ? 'Deposit'
              : 'Withdrawal'}
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {!syntheticJourneyActive ||
            tx.status !== PublicTxStatus.SUCCESS ? (
              <TxStatusPill status={tx.status} />
            ) : <span className="text-sm text-hedgr-600">Completed</span>}
            <span className="text-xs text-hedgr-500 sm:text-sm">
              {formatTime(tx.createdAt)}
            </span>
          </div>
        </div>

        <div className={`shrink-0 text-right ${finish.eventAmounts} ${baseline.deltaAmount}`}>
          <div
            className={`tabular-nums ${finish.eventDelta}`}
            data-testid={`activity-delta-${tx.type.toLowerCase()}`}
          >
            {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amountUSD.toFixed(2)}
          </div>
          {!syntheticJourneyActive &&
          tx.amountZMW !== undefined &&
          tx.amountZMW > 0 ? (
            <div className="text-sm tabular-nums text-hedgr-500">
              {tx.amountZMW.toFixed(2)} ZMW
            </div>
          ) : null}
        </div>

        <svg
          className="hidden h-5 w-5 shrink-0 text-hedgr-300 sm:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
          {syntheticJourneyActive &&
          tx.status === PublicTxStatus.SUCCESS &&
          resultingBalance !== undefined ? (
            <div
              className={baseline.balanceAfter}
              data-testid={`activity-result-${tx.type.toLowerCase()}`}
            >
              <span>Balance after</span>{' '}<span>${resultingBalance.toFixed(2)}</span>
            </div>
          ) : null}
    </button>
  );
}

export default function ActivityPage() {
  const transactions = useLedgerStore((s) => s.transactions);
  const searchParams = useSearchParams();
  const syntheticJourneyActive =
    isSyntheticJourneyPrimaryCondition(searchParams?.toString()) &&
    searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
      CLASS_A_VAL_002_JOURNEY_VALUE;
  const lifecycleReviewRequested =
    searchParams?.get(CLASS_A_VAL_002_SCENARIO_PARAM) ===
    CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO;
  const productSimulationActive =
    syntheticJourneyActive ||
    (getEnvironmentMode() !== 'live' && !lifecycleReviewRequested);
  const [selectedTx, setSelectedTx] = useState<TxLifecycle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  // Convert legacy transactions to lifecycle format
  const lifecycleTxs = useMemo(
    () => transactions.map(txToLifecycle),
    [transactions]
  );

  const syntheticBalanceReconciliation = useMemo(() => {
    const completed = lifecycleTxs.filter(
      (tx) => tx.status === PublicTxStatus.SUCCESS
    );
    const deposits = completed
      .filter((tx) => tx.type === 'DEPOSIT')
      .reduce((sum, tx) => sum + tx.amountUSD, 0);
    const withdrawals = completed
      .filter((tx) => tx.type === 'WITHDRAW')
      .reduce((sum, tx) => sum + tx.amountUSD, 0);

    return {
      deposits: +deposits.toFixed(2),
      withdrawals: +withdrawals.toFixed(2),
      remaining: +(deposits - withdrawals).toFixed(2),
    };
  }, [lifecycleTxs]);

  // Compute result evidence from the full chronological record before filters
  // or newest-first presentation. Pending and failed records never change it.
  const syntheticResultingBalances = useMemo(
    () => getSyntheticResultingBalances(lifecycleTxs),
    [lifecycleTxs]
  );

  // Apply filter
  const filteredTxs = useMemo(() => {
    if (filter === 'all') return lifecycleTxs;
    if (filter === 'deposits')
      return lifecycleTxs.filter((tx) => tx.type === 'DEPOSIT');
    return lifecycleTxs.filter((tx) => tx.type === 'WITHDRAW');
  }, [lifecycleTxs, filter]);

  // Sort freshest first
  const sorted = useMemo(
    () => [...filteredTxs].sort((a, b) => b.createdAt - a.createdAt),
    [filteredTxs]
  );

  const grouped = useMemo(() => groupByDay(sorted), [sorted]);

  // T4 thread: newest-first days of the filtered list; day balances and the
  // starting point come from the full completed record in Activity order.
  const completedChronological = useMemo(
    () =>
      lifecycleTxs
        .filter((tx) => tx.status === PublicTxStatus.SUCCESS)
        .sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)),
    [lifecycleTxs]
  );
  const threadDays = useMemo(() => {
    const endOfDayBalance = new Map<string, number>();
    for (const tx of completedChronological) {
      const after = syntheticResultingBalances.get(tx.id);
      if (after !== undefined) endOfDayBalance.set(threadDayKey(tx.createdAt), after);
    }
    const days: { key: string; label: string; balance?: number; txs: TxLifecycle[] }[] = [];
    const newestFirst = [...filteredTxs].sort(
      (a, b) => b.createdAt - a.createdAt || b.id.localeCompare(a.id)
    );
    for (const tx of newestFirst) {
      const key = threadDayKey(tx.createdAt);
      let day = days.at(-1);
      if (!day || day.key !== key) {
        day = { key, label: formatThreadDay(tx.createdAt), balance: endOfDayBalance.get(key), txs: [] };
        days.push(day);
      }
      day.txs.push(tx);
    }
    return days;
  }, [completedChronological, filteredTxs, syntheticResultingBalances]);
  const threadStart = completedChronological[0];

  const threadStartLine =
    filter === 'all' && threadStart ? (
      <li className={finish.threadStart} data-testid="activity-thread-start">
        <span className={finish.threadStartMarker} aria-hidden="true" />
        Started at $0.00 · {formatShortDate(threadStart.createdAt)}
      </li>
    ) : null;

  const positionHref = syntheticJourneyActive ? getSyntheticJourneyHref('/dashboard') : '/dashboard';
  const nextStep =
    completedChronological.length === 2 ? (
      <ActionDock
        title="See it on your position"
        why="Hedgr explains what changed between these two entries."
        primary={{ label: 'Back to your position', href: positionHref, 'data-testid': 'activity-back-to-position' }}
        data-testid="activity-next-step"
      />
    ) : (
      <Link href={positionHref} className={finish.pill} data-testid="activity-back-to-position">
        Back to your position
      </Link>
    );

  const handleRowClick = (tx: TxLifecycle) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected to allow animation
    setTimeout(() => setSelectedTx(null), 150);
  };

  // Render empty state based on context
  const renderEmptyState = () => {
    // No transactions at all
    if (transactions.length === 0) {
      return (
        <EmptyState
          title={
            productSimulationActive
              ? 'No simulated activity yet'
              : 'No transactions yet'
          }
          description={
            productSimulationActive
              ? 'Your simulated deposits and withdrawals will appear here after you record the first change.'
              : 'Your deposit and withdrawal history will appear here once you make your first transaction.'
          }
          icon={
            <svg
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          primaryAction={{
            label: productSimulationActive
              ? 'Start simulated deposit'
              : 'Make your first deposit',
            href: syntheticJourneyActive
              ? getSyntheticJourneyHref('/deposit')
              : '/deposit',
          }}
          data-testid="activity-empty-state"
        />
      );
    }

    // Filter returned zero results
    if (filteredTxs.length === 0 && filter !== 'all') {
      const filterLabel = filter === 'deposits' ? 'deposits' : 'withdrawals';
      return (
        <EmptyState
          title={`No ${filterLabel} found`}
          description={`You haven't made any ${filterLabel} yet. Try changing your filter or make a new transaction.`}
          icon={
            <svg
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          }
          primaryAction={{
            label: 'Show all transactions',
            onClick: () => setFilter('all'),
          }}
          data-testid="activity-filter-empty-state"
        />
      );
    }

    return null;
  };

  if (syntheticJourneyActive) {
    return <main className={`${wallet.page} ${baseline.activity}`}>
      <header><h1>Activity</h1><p className="mt-1 text-sm text-hedgr-600" data-testid="activity-simulation-context">Follow the balance</p></header>
      <section className={`${wallet.position} ${wallet.activityBalance} ${baseline.balance}`} data-testid="activity-balance-reconciliation" aria-labelledby="activity-balance-reconciliation-heading">
        <h2 id="activity-balance-reconciliation-heading">Simulated balance</h2>
        <strong><span data-testid="activity-reconciliation-remaining">${syntheticBalanceReconciliation.remaining.toFixed(2)}</span> <small>USD</small></strong>
        <p className="text-xs text-hedgr-500">From completed simulated entries only.</p>
      </section>
      {transactions.length > 0 ? <div className={wallet.filters} aria-label="Activity filters">
        {(['all', 'deposits', 'withdrawals'] as const).map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} data-testid={`filter-${f}`}>{f === 'all' ? 'All' : f === 'deposits' ? 'Deposits' : 'Withdrawals'}</button>)}
      </div> : null}
      {sorted.length === 0 ? renderEmptyState() : <ol className={finish.thread} data-testid="activity-list">
        {threadDays.map(day => <li key={day.key} className={finish.threadDay}>
          <div className={finish.threadDayHeader}>
            <h2 data-testid="activity-day-header">{day.label}</h2>
            {day.balance !== undefined ? <span data-testid="activity-day-balance">Balance ${day.balance.toFixed(2)}</span> : null}
          </div>
          <ul className={finish.threadEntries}>
          {day.txs.map(tx => {
            const after = syntheticResultingBalances.get(tx.id);
            const completed = tx.status === PublicTxStatus.SUCCESS && after !== undefined;
            const before = completed ? +(after + (tx.type === 'DEPOSIT' ? -tx.amountUSD : tx.amountUSD)).toFixed(2) : undefined;
            const label = tx.type === 'DEPOSIT' ? 'Simulated deposit' : 'Simulated withdrawal';
            return <li key={tx.id} className={finish.threadEntry}>
              <ThreadIcon type={tx.type} />
              <details className={finish.threadCard}>
              <summary data-testid={`activity-row-${tx.type.toLowerCase()}`} data-activity-type={tx.type} data-activity-status={tx.status}>
                <ThreadCardContent tx={tx} completed={completed} />
              </summary>
              <div data-testid="research-activity-detail">
                <p>{label} detail · {formatTime(tx.createdAt)}</p>
                {completed ? <dl>
                  <div><dt>Before</dt><dd>${before!.toFixed(2)}</dd></div>
                  <div><dt>{tx.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}</dt><dd>{tx.type === 'DEPOSIT' ? '+' : '−'}${tx.amountUSD.toFixed(2)}</dd></div>
                  <div><dt>After</dt><dd>${after.toFixed(2)}</dd></div>
                </dl> : <p>This event has no completed balance effect.</p>}
                {tx.failureReason ? <p data-testid="research-activity-failure">{tx.failureReason}</p> : null}
                {tx.note ? <p data-testid="research-activity-note">{tx.note}</p> : null}
                <p>Simulation only. No real money moved.</p>
              </div>
            </details>
            </li>;
          })}
          </ul>
        </li>)}
        {threadStartLine}
      </ol>}
      {transactions.length > 0 ? nextStep : <Link href={getSyntheticJourneyHref('/dashboard')} className={wallet.link}>Back to your position</Link>}
    </main>;
  }

  return (
    <main className={`${baseline.activity} ${finish.activity}`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-hedgr-800 sm:text-4xl">Activity</h1>
        {transactions.length > 0 && (
          <span className="pb-1 text-xs font-medium text-hedgr-500 sm:text-sm">
            {transactions.length}{' '}
            {productSimulationActive
              ? `simulated entr${transactions.length !== 1 ? 'ies' : 'y'}`
              : `transaction${transactions.length !== 1 ? 's' : ''}`}
          </span>
        )}
      </div>

      {productSimulationActive ? (
        <p
          className="max-w-xl text-sm leading-relaxed text-hedgr-dark"
          data-testid="activity-simulation-context"
        >
          This is the factual record of changes in the simulated position. No
          entry represents real money moving.
        </p>
      ) : null}

      {productSimulationActive && transactions.length > 0 ? (
        <section
          className={`space-y-2 ${finish.reconciliation} ${baseline.balance}`}
          data-testid="activity-balance-reconciliation"
          aria-labelledby="activity-balance-reconciliation-heading"
        >
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <h2
              id="activity-balance-reconciliation-heading"
              className="font-medium text-hedgr-600"
            >
              Current simulated position
            </h2>
            <span
              className={`tabular-nums text-hedgr-800 ${finish.reconciliationAmount}`}
              data-testid="activity-reconciliation-remaining"
            >
              ${syntheticBalanceReconciliation.remaining.toFixed(2)}
            </span>
          </div>
          <p
            className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-xs text-hedgr-500"
            aria-label={`Completed simulated changes: plus $${syntheticBalanceReconciliation.deposits.toFixed(
              2
            )} deposits, minus $${syntheticBalanceReconciliation.withdrawals.toFixed(
              2
            )} withdrawals, equals $${syntheticBalanceReconciliation.remaining.toFixed(
              2
            )} remaining`}
          >
            <span>From completed entries:</span>
            <span
              className="font-medium tabular-nums text-hedgr-600"
              data-testid="activity-reconciliation-deposits"
            >
              +${syntheticBalanceReconciliation.deposits.toFixed(2)}
            </span>
            <span aria-hidden="true" className="text-hedgr-400">
              −
            </span>
            <span
              className="font-medium tabular-nums text-hedgr-600"
              data-testid="activity-reconciliation-withdrawals"
            >
              ${syntheticBalanceReconciliation.withdrawals.toFixed(2)}
            </span>
          </p>
        </section>
      ) : null}

      {/* Filter buttons - only show when there are transactions */}
      {transactions.length > 0 && (
        <div className={wallet.filters} aria-label="Activity filters">
          {(['all', 'deposits', 'withdrawals'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-11 rounded-full border px-3 py-2 text-xs font-semibold motion-safe:transition-colors focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 ${
                filter === f
                  ? 'border-hedgr-200 bg-hedgr-100/30 text-hedgr-800'
                  : 'border-transparent bg-white text-hedgr-500 hover:border-hedgr-100 hover:text-hedgr-700'
              }`}
              data-testid={`filter-${f}`}
            >
              {f === 'all'
                ? 'All'
                : f === 'deposits'
                ? 'Deposits'
                : 'Withdrawals'}
            </button>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        renderEmptyState()
      ) : productSimulationActive ? (
        <ol className={finish.thread} data-testid="activity-list">
          {threadDays.map((day) => (
            <li key={day.key} className={finish.threadDay}>
              <div className={finish.threadDayHeader}>
                <h2 data-testid="activity-day-header">{day.label}</h2>
                {day.balance !== undefined ? (
                  <span data-testid="activity-day-balance">Balance ${day.balance.toFixed(2)}</span>
                ) : null}
              </div>
              <ul className={finish.threadEntries}>
                {day.txs.map((tx) => (
                  <li key={tx.id} className={finish.threadEntry}>
                    <ThreadIcon type={tx.type} />
                    <button
                      type="button"
                      onClick={() => handleRowClick(tx)}
                      className={finish.threadCard}
                      data-testid={`activity-row-${tx.type.toLowerCase()}`}
                      data-activity-type={tx.type}
                      data-activity-status={tx.status}
                    >
                      <ThreadCardContent
                        tx={tx}
                        completed={tx.status === PublicTxStatus.SUCCESS && syntheticResultingBalances.has(tx.id)}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {threadStartLine}
        </ol>
      ) : (
        <div className="space-y-6" data-testid="activity-list">
          {Array.from(grouped.entries()).map(([day, txs]) => (
            <div key={day} className="space-y-2">
              <h2 className="text-xs font-semibold text-hedgr-800">
                {day}
              </h2>
              <div className={baseline.events}>
                {txs.map((tx) => (
                  <ActivityRow
                    key={tx.id}
                    tx={tx}
                    onClick={() => handleRowClick(tx)}
                    syntheticJourneyActive={productSimulationActive}
                    resultingBalance={syntheticResultingBalances.get(tx.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <TxDetailModal
        transaction={selectedTx}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        simulated={productSimulationActive}
        resultingBalance={
          selectedTx
            ? syntheticResultingBalances.get(selectedTx.id)
            : undefined
        }
      />
      {productSimulationActive && transactions.length > 0 ? nextStep : null}
    </main>
  );
}
