'use client';

import { PublicTxStatus, PublicTxStatusLabels } from '../lib/tx';

export interface TxStatusPillProps {
  status: PublicTxStatus;
  /** Optional size variant */
  size?: 'sm' | 'md';
  /** Optional class overrides */
  className?: string;
}

/**
 * TxStatusPill - Reusable transaction status indicator
 *
 * Displays a status pill with consistent styling and data-testid attributes
 * for stable E2E selectors.
 *
 * Usage:
 * ```tsx
 * <TxStatusPill status={PublicTxStatus.SUCCESS} />
 * ```
 *
 * Test selectors:
 * - data-testid="tx-status-pill" - The pill element
 * - data-status="SUCCESS" - The raw status value
 */
export function TxStatusPill({
  status,
  size = 'sm',
  className = '',
}: TxStatusPillProps) {
  const label = PublicTxStatusLabels[status];
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const statusStyles: Record<PublicTxStatus, string> = {
    [PublicTxStatus.PENDING_INIT]:
      'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
    [PublicTxStatus.IN_PROGRESS]:
      'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/20',
    [PublicTxStatus.SUCCESS]:
      'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    [PublicTxStatus.FAILED]:
      'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
    [PublicTxStatus.REVERSED]:
      'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20',
    [PublicTxStatus.EXPIRED]:
      'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20',
  };

  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  return (
    <span
      data-testid="tx-status-pill"
      data-status={status}
      className={`${baseClasses} ${sizeClasses} ${statusStyles[status]} ${className}`}
    >
      {/* Animated dot for in-progress states */}
      {(status === PublicTxStatus.PENDING_INIT ||
        status === PublicTxStatus.IN_PROGRESS) && (
        <span className="relative mr-1.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {label}
    </span>
  );
}

export default TxStatusPill;


