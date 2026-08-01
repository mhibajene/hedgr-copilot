'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useLedgerStore } from '../../../lib/state/ledger';
import { TxStatusPill, TxDetailModal } from '../../../components';
import { PublicTxStatus, txToLifecycle, type TxLifecycle } from '../../../lib/tx';
import { EmptyState } from '@hedgr/ui';
import {
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
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

type FilterType = 'all' | 'deposits' | 'withdrawals';

function TransactionTypeIcon({ type }: { type: 'DEPOSIT' | 'WITHDRAW' }) {
  if (type === 'DEPOSIT') {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hedgr-100">
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hedgr-200">
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
}: {
  tx: TxLifecycle;
  onClick: () => void;
  syntheticJourneyActive: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`activity-row-${tx.type.toLowerCase()}`}
      data-activity-type={tx.type}
      data-activity-status={tx.status}
      className="w-full cursor-pointer rounded-xl border border-hedgr-100 bg-white p-4 text-left transition-colors hover:border-hedgr-300"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <TransactionTypeIcon type={tx.type} />

        <div className="min-w-0 flex-1">
          <span
            className="font-medium text-hedgr-800"
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
            <TxStatusPill status={tx.status} />
            <span className="text-sm text-hedgr-500">{formatTime(tx.createdAt)}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="font-semibold tabular-nums text-hedgr-800">
            {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amountUSD.toFixed(2)}
          </div>
          {tx.amountZMW !== undefined && tx.amountZMW > 0 ? (
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
  const syntheticJourneyActive = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
  );
  const [selectedTx, setSelectedTx] = useState<TxLifecycle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  // Convert legacy transactions to lifecycle format
  const lifecycleTxs = useMemo(
    () => transactions.map(txToLifecycle),
    [transactions]
  );

  const syntheticBalanceReconciliation = useMemo(() => {
    const completed = lifecycleTxs.filter((tx) => tx.status === PublicTxStatus.SUCCESS);
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

  // Apply filter
  const filteredTxs = useMemo(() => {
    if (filter === 'all') return lifecycleTxs;
    if (filter === 'deposits') return lifecycleTxs.filter((tx) => tx.type === 'DEPOSIT');
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
          title={syntheticJourneyActive ? 'No simulated activity yet' : 'No transactions yet'}
          description={
            syntheticJourneyActive
              ? 'Your simulated deposits and withdrawals will appear here after you record the first step.'
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
            label: syntheticJourneyActive ? 'Start simulated deposit' : 'Make your first deposit',
            href: syntheticJourneyActive ? getSyntheticJourneyHref('/deposit') : '/deposit',
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
          primaryAction={{ label: 'Show all transactions', onClick: () => setFilter('all') }}
          data-testid="activity-filter-empty-state"
        />
      );
    }

    return null;
  };

  return (
    <main className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-hedgr-800">Activity</h1>
        {transactions.length > 0 && (
          <span className="text-sm text-hedgr-500">
            {transactions.length}{' '}
            {syntheticJourneyActive
              ? `simulated entr${transactions.length !== 1 ? 'ies' : 'y'}`
              : `transaction${transactions.length !== 1 ? 's' : ''}`}
          </span>
        )}
      </div>

      {syntheticJourneyActive ? (
        <section
          className="rounded-xl border border-hedgr-300 bg-hedgr-100 p-4 text-hedgr-800"
          data-testid="activity-synthetic-condition"
          aria-label="Simulated activity condition"
        >
          <p className="text-sm font-semibold">Step 4 · explain the simulated balance</p>
          <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
            Activity shows the simulated deposit and withdrawal that changed the
            balance. “Completed” means this simulated step finished. It does not
            mean a bank transfer or real payout occurred.
          </p>
        </section>
      ) : null}

      {syntheticJourneyActive && transactions.length > 0 ? (
        <section
          className="rounded-xl border border-hedgr-200 bg-white p-4 text-hedgr-dark"
          data-testid="activity-balance-reconciliation"
          aria-labelledby="activity-balance-reconciliation-heading"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">
            Simulated balance calculation
          </p>
          <h2
            id="activity-balance-reconciliation-heading"
            className="mt-1 text-base font-semibold text-hedgr-800"
          >
            Deposits minus withdrawals show what remains
          </h2>
          <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-hedgr-100/50 p-3">
              <dt className="text-hedgr-500">Simulated deposits</dt>
              <dd className="mt-1 font-semibold tabular-nums text-hedgr-800">
                +${syntheticBalanceReconciliation.deposits.toFixed(2)}
              </dd>
            </div>
            <div className="rounded-lg bg-hedgr-100/50 p-3">
              <dt className="text-hedgr-500">Simulated withdrawals</dt>
              <dd className="mt-1 font-semibold tabular-nums text-hedgr-800">
                −${syntheticBalanceReconciliation.withdrawals.toFixed(2)}
              </dd>
            </div>
            <div className="rounded-lg bg-hedgr-200/60 p-3">
              <dt className="text-hedgr-600">Remaining simulated balance</dt>
              <dd className="mt-1 font-semibold tabular-nums text-hedgr-800">
                ${syntheticBalanceReconciliation.remaining.toFixed(2)}
              </dd>
            </div>
          </dl>
        </section>
      ) : null}

      {/* Filter buttons - only show when there are transactions */}
      {transactions.length > 0 && (
        <div className="flex gap-2">
          {(['all', 'deposits', 'withdrawals'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f
                  ? 'bg-hedgr-primary text-white'
                  : 'bg-hedgr-100/50 text-hedgr-600 hover:bg-hedgr-100'
              }`}
              data-testid={`filter-${f}`}
            >
              {f === 'all' ? 'All' : f === 'deposits' ? 'Deposits' : 'Withdrawals'}
            </button>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="space-y-6" data-testid="activity-list">
          {Array.from(grouped.entries()).map(([day, txs]) => (
            <div key={day} className="space-y-3">
              <h2 className="text-xs font-semibold text-hedgr-500 uppercase tracking-wider">
                {day}
              </h2>
              <div className="space-y-2">
                {txs.map((tx) => (
                  <ActivityRow
                    key={tx.id}
                    tx={tx}
                    onClick={() => handleRowClick(tx)}
                    syntheticJourneyActive={syntheticJourneyActive}
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
        simulated={syntheticJourneyActive}
      />
      {syntheticJourneyActive && transactions.length > 0 ? (
        <Link
          href={getSyntheticJourneyHref('/dashboard')}
          className="inline-flex rounded-xl border border-hedgr-200 bg-white px-4 py-2 text-sm font-medium text-hedgr-primary transition-colors hover:border-hedgr-300 hover:text-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
        >
          Return to simulated balance
        </Link>
      ) : null}
    </main>
  );
}
