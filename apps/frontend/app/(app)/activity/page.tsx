'use client';

import { useLedgerStore } from '../../../lib/state/ledger';
import type { Tx } from '../../../lib/state/ledger';

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

function getStatusBadge(status: Tx['status']) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  switch (status) {
    case 'CONFIRMED':
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`} data-testid="status-confirmed">
          CONFIRMED
        </span>
      );
    case 'PENDING':
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`} data-testid="status-pending">
          PENDING
        </span>
      );
    case 'FAILED':
      return (
        <span className={`${baseClasses} bg-red-100 text-red-800`} data-testid="status-failed">
          FAILED
        </span>
      );
  }
}

function groupByDay(transactions: Tx[]): Map<string, Tx[]> {
  const groups = new Map<string, Tx[]>();
  for (const tx of transactions) {
    const day = formatDate(tx.createdAt);
    if (!groups.has(day)) {
      groups.set(day, []);
    }
    groups.get(day)!.push(tx);
  }
  return groups;
}

export default function ActivityPage() {
  const transactions = useLedgerStore((s) => s.transactions);
  
  // Sort freshest first
  const sorted = [...transactions].sort((a, b) => b.createdAt - a.createdAt);
  const grouped = groupByDay(sorted);

  return (
    <main className="p-6 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Activity</h1>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-6" data-testid="activity-list">
          {Array.from(grouped.entries()).map(([day, txs]) => (
            <div key={day} className="space-y-3">
              <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                {day}
              </h2>
              <div className="space-y-2">
                {txs.map((tx) => (
                  <div
                    key={tx.id}
                    data-testid={`activity-row-${tx.type.toLowerCase()}`}
                    data-activity-type={tx.type}
                    data-activity-status={tx.status}
                    className="rounded-xl border p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            className="font-medium"
                            data-testid={`activity-type-${tx.type.toLowerCase()}`}
                          >
                            {tx.type === 'DEPOSIT' ? 'Deposit' : 'Withdraw'}
                          </span>
                          {getStatusBadge(tx.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            <strong>${tx.amountUSD.toFixed(2)}</strong> USD
                          </div>
                          {tx.amountZMW && (
                            <div>
                              <strong>{tx.amountZMW.toFixed(2)}</strong> ZMW
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(tx.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
