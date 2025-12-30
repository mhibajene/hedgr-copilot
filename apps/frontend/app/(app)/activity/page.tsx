'use client';

import { useState, useMemo } from 'react';
import { useLedgerStore } from '../../../lib/state/ledger';
import { TxStatusPill, TxDetailModal } from '../../../components';
import { txToLifecycle, type TxLifecycle } from '../../../lib/tx';

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

  // Convert legacy transactions to lifecycle format
  const lifecycleTxs = useMemo(
    () => transactions.map(txToLifecycle),
    [transactions]
  );

  // Sort freshest first
  const sorted = useMemo(
    () => [...lifecycleTxs].sort((a, b) => b.createdAt - a.createdAt),
    [lifecycleTxs]
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

      {transactions.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No transactions yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Your deposit and withdrawal history will appear here
          </p>
        </div>
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
