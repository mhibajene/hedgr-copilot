'use client';

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

function TransactionTypeIcon({ type }: { type: 'DEPOSIT' | 'WITHDRAW' }) {
  if (type === 'DEPOSIT') {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hedgr-100 bg-hedgr-100/30 shadow-sm">
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hedgr-100 bg-white shadow-sm">
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
      className="w-full cursor-pointer px-1 py-4 text-left transition-colors hover:bg-hedgr-100/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hedgr-500"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <TransactionTypeIcon type={tx.type} />

        <div className="min-w-0 flex-1">
          <span
            className="font-semibold text-hedgr-800"
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
            ) : null}
            <span className="text-xs text-hedgr-500 sm:text-sm">
              {formatTime(tx.createdAt)}
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div
            className={`font-bold tabular-nums ${
              tx.type === 'DEPOSIT' ? 'text-hedgr-600' : 'text-hedgr-800'
            }`}
            data-testid={`activity-delta-${tx.type.toLowerCase()}`}
          >
            {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amountUSD.toFixed(2)}
          </div>
          {syntheticJourneyActive &&
          tx.status === PublicTxStatus.SUCCESS &&
          resultingBalance !== undefined ? (
            <div
              className="mt-0.5 text-xs font-medium tabular-nums text-hedgr-500"
              data-testid={`activity-result-${tx.type.toLowerCase()}`}
            >
              → ${resultingBalance.toFixed(2)} resulting
            </div>
          ) : null}
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

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-6 pb-28 pt-6 sm:p-8">
      <div className="flex items-end justify-between gap-4">
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
          className="space-y-2 border-y border-hedgr-100 py-3 text-hedgr-dark"
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
              className="font-semibold tabular-nums text-hedgr-800"
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
        <div className="flex gap-1.5 border-b border-hedgr-100 pb-3">
          {(['all', 'deposits', 'withdrawals'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`min-h-11 rounded-full border px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 ${
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
      ) : (
        <div className="space-y-6" data-testid="activity-list">
          {Array.from(grouped.entries()).map(([day, txs]) => (
            <div key={day} className="space-y-2">
              <h2 className="text-xs font-semibold text-hedgr-800">
                {day}
              </h2>
              <div className="divide-y divide-hedgr-100 border-y border-hedgr-100">
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
      {productSimulationActive && transactions.length > 0 ? (
        <Link
          href={
            syntheticJourneyActive
              ? getSyntheticJourneyHref('/dashboard')
              : '/dashboard'
          }
          className="inline-flex min-h-11 items-center rounded-full border border-hedgr-100 bg-white px-4 py-2 text-sm font-semibold text-hedgr-primary transition-colors hover:border-hedgr-300 hover:text-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
        >
          Return to current position
        </Link>
      ) : null}
    </main>
  );
}
