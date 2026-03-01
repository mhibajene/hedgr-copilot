'use client';

import React from 'react';
import { PublicTxStatus, getPresentationForPublicStatus } from '../lib/tx';

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
 * for stable E2E selectors. Label and tone come from the canonical STATUS_MAP
 * via getPresentationForPublicStatus.
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
  const { label, tone } = getPresentationForPublicStatus(status);
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  return (
    <span
      data-testid="tx-status-pill"
      data-status={status}
      className={`${baseClasses} ${sizeClasses} ${tone} ${className}`}
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


