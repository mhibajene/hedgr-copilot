/**
 * Transaction Lifecycle Types
 *
 * Canonical public transaction statuses for user-facing representations.
 * All internal statuses MUST be mapped to these before being shown to users.
 */

/** Public transaction status enum - the ONLY statuses exposed to UI */
export const PublicTxStatus = {
  PENDING_INIT: 'PENDING_INIT',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REVERSED: 'REVERSED',
  EXPIRED: 'EXPIRED',
} as const;

export type PublicTxStatus = (typeof PublicTxStatus)[keyof typeof PublicTxStatus];

/** Internal statuses that may exist in backend systems */
export const InternalTxStatus = {
  // Initial states
  PENDING: 'PENDING',
  PENDING_INIT: 'PENDING_INIT',
  INITIATED: 'INITIATED',
  CREATED: 'CREATED',

  // In-progress states
  IN_PROGRESS: 'IN_PROGRESS',
  PROCESSING: 'PROCESSING',
  L2_PENDING: 'L2_PENDING',
  BRIDGE_INIT: 'BRIDGE_INIT',
  AWAITING_CONFIRMATION: 'AWAITING_CONFIRMATION',

  // Success states
  SUCCESS: 'SUCCESS',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  SETTLED: 'SETTLED',

  // Failure states
  FAILED: 'FAILED',
  REJECTED: 'REJECTED',
  ERROR: 'ERROR',

  // Reversal states
  REVERSED: 'REVERSED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',

  // Expiration states
  EXPIRED: 'EXPIRED',
  TIMED_OUT: 'TIMED_OUT',
} as const;

export type InternalTxStatus = (typeof InternalTxStatus)[keyof typeof InternalTxStatus];

/** Human-readable labels for public statuses */
export const PublicTxStatusLabels: Record<PublicTxStatus, string> = {
  [PublicTxStatus.PENDING_INIT]: 'Pending',
  [PublicTxStatus.IN_PROGRESS]: 'Processing',
  [PublicTxStatus.SUCCESS]: 'Completed',
  [PublicTxStatus.FAILED]: 'Failed',
  [PublicTxStatus.REVERSED]: 'Reversed',
  [PublicTxStatus.EXPIRED]: 'Expired',
};

/** Extended transaction type with full lifecycle support */
export type TxLifecycle = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW';
  amountUSD: number;
  amountZMW?: number;
  status: PublicTxStatus;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  failureReason?: string;
  /** Human-readable note for UI display */
  note?: string;
};

/** Timeline step for transaction detail view */
export type TxTimelineStep = {
  status: PublicTxStatus;
  label: string;
  timestamp?: number;
  isActive: boolean;
  isCompleted: boolean;
};

