'use client';

import { useState, useMemo } from 'react';
import { useLedgerStore } from '../../../lib/state/ledger';
import { TxStatusPill, TxDetailModal } from '../../../components';
import { txToLifecycle, type TxLifecycle } from '../../../lib/tx';
import { EmptyState } from '@hedgr/ui';

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
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
        <svg
          className="h-5 w-5 text-emerald-600"
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
      <svg
        className="h-5 w-5 text-orange-600"
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
}: {
  tx: TxLifecycle;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`activity-row-${tx.type.toLowerCase()}`}
      data-activity-type={tx.type}
      data-activity-status={tx.status}
      className="w-full text-left rounded-xl border border-gray-100 p-4 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <TransactionTypeIcon type={tx.type} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-medium text-gray-900"
              data-testid={`activity-type-${tx.type.toLowerCase()}`}
            >
              {tx.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}
            </span>
            <TxStatusPill status={tx.status} />
          </div>
          <div className="text-sm text-gray-500">
            {formatTime(tx.createdAt)}
          </div>
        </div>

        <div className="text-right">
          <div className="font-semibold text-gray-900">
            {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amountUSD.toFixed(2)}
          </div>
          {tx.amountZMW && (
            <div className="text-sm text-gray-500">
              {tx.amountZMW.toFixed(2)} ZMW
            </div>
          )}
        </div>

        <svg
          className="h-5 w-5 text-gray-400"
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
  const [selectedTx, setSelectedTx] = useState<TxLifecycle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  // Convert legacy transactions to lifecycle format
  const lifecycleTxs = useMemo(
    () => transactions.map(txToLifecycle),
    [transactions]
  );

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
          title="No transactions yet"
          description="Your deposit and withdrawal history will appear here once you make your first transaction."
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
          primaryAction={{ label: 'Make your first deposit', href: '/deposit' }}
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
        <h1 className="text-2xl font-semibold text-gray-900">Activity</h1>
        {transactions.length > 0 && (
          <span className="text-sm text-gray-500">
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Filter buttons - only show when there are transactions */}
      {transactions.length > 0 && (
        <div className="flex gap-2">
          {(['all', 'deposits', 'withdrawals'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {day}
              </h2>
              <div className="space-y-2">
                {txs.map((tx) => (
                  <ActivityRow
                    key={tx.id}
                    tx={tx}
                    onClick={() => handleRowClick(tx)}
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
      />
    </main>
  );
}
