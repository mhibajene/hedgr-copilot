/**
 * Status Mapper
 *
 * Maps internal/technical transaction statuses to the canonical public enum.
 * Single source for label/tone; activity and TxStatusPill use this only.
 */

import {
  PublicTxStatus,
  InternalTxStatus,
  type TxLifecycle,
  type TxTimelineStep,
} from './types';
import type { Tx, LedgerTxStatus } from '../state/ledger';

/**
 * Ledger status → Public status. Single map for lifecycle rendering.
 * Activity label and tone derive from PublicTxStatus (PublicTxStatusLabels in types).
 */
export const LEDGER_STATUS_MAP: Record<LedgerTxStatus, PublicTxStatus> = {
  pending: PublicTxStatus.PENDING_INIT,
  settled: PublicTxStatus.SUCCESS,
  failed: PublicTxStatus.FAILED,
};

export function mapLedgerStatusToPublicStatus(status: LedgerTxStatus): PublicTxStatus {
  return LEDGER_STATUS_MAP[status];
}

/**
 * Maps any internal status (string) to the canonical public status.
 * Unknown statuses default to IN_PROGRESS for safety.
 */
export function mapInternalStatusToPublicStatus(
  internalStatus: string
): PublicTxStatus {
  const normalized = internalStatus.toUpperCase().trim();

  // Pending / Initial states
  if (
    normalized === InternalTxStatus.PENDING ||
    normalized === InternalTxStatus.PENDING_INIT ||
    normalized === InternalTxStatus.INITIATED ||
    normalized === InternalTxStatus.CREATED
  ) {
    return PublicTxStatus.PENDING_INIT;
  }

  // In-progress states
  if (
    normalized === InternalTxStatus.IN_PROGRESS ||
    normalized === InternalTxStatus.PROCESSING ||
    normalized === InternalTxStatus.L2_PENDING ||
    normalized === InternalTxStatus.BRIDGE_INIT ||
    normalized === InternalTxStatus.AWAITING_CONFIRMATION
  ) {
    return PublicTxStatus.IN_PROGRESS;
  }

  // Success states
  if (
    normalized === InternalTxStatus.SUCCESS ||
    normalized === InternalTxStatus.CONFIRMED ||
    normalized === InternalTxStatus.COMPLETED ||
    normalized === InternalTxStatus.SETTLED
  ) {
    return PublicTxStatus.SUCCESS;
  }

  // Failure states
  if (
    normalized === InternalTxStatus.FAILED ||
    normalized === InternalTxStatus.REJECTED ||
    normalized === InternalTxStatus.ERROR
  ) {
    return PublicTxStatus.FAILED;
  }

  // Reversal states
  if (
    normalized === InternalTxStatus.REVERSED ||
    normalized === InternalTxStatus.REFUNDED ||
    normalized === InternalTxStatus.CANCELLED
  ) {
    return PublicTxStatus.REVERSED;
  }

  // Expiration states
  if (
    normalized === InternalTxStatus.EXPIRED ||
    normalized === InternalTxStatus.TIMED_OUT
  ) {
    return PublicTxStatus.EXPIRED;
  }

  // Default: treat unknown as in-progress (safest for user perception)
  console.warn(`Unknown transaction status: ${internalStatus}, defaulting to IN_PROGRESS`);
  return PublicTxStatus.IN_PROGRESS;
}

/**
 * Converts ledger Tx to TxLifecycle format. Uses LEDGER_STATUS_MAP only for status.
 */
export function txToLifecycle(tx: Tx): TxLifecycle {
  const publicStatus = mapLedgerStatusToPublicStatus(tx.status);
  const completedAt =
    publicStatus === PublicTxStatus.SUCCESS ||
    publicStatus === PublicTxStatus.FAILED ||
    publicStatus === PublicTxStatus.REVERSED ||
    publicStatus === PublicTxStatus.EXPIRED
      ? tx.updated_at
      : undefined;

  return {
    id: tx.txn_ref,
    type: tx.type === 'deposit' ? 'DEPOSIT' : 'WITHDRAW',
    amountUSD: tx.amount_usd,
    amountZMW: tx.amount_zmw,
    status: publicStatus,
    createdAt: tx.created_at,
    updatedAt: tx.updated_at,
    completedAt,
    failureReason:
      publicStatus === PublicTxStatus.FAILED
        ? (tx.failure_reason ?? 'Transaction could not be processed')
        : undefined,
  };
}

/**
 * Generates timeline steps for transaction detail view.
 */
export function generateTimelineSteps(tx: TxLifecycle): TxTimelineStep[] {
  const { status, createdAt, updatedAt, completedAt } = tx;

  const steps: TxTimelineStep[] = [
    {
      status: PublicTxStatus.PENDING_INIT,
      label: 'Created',
      timestamp: createdAt,
      isActive: status === PublicTxStatus.PENDING_INIT,
      isCompleted: true, // Always completed since tx exists
    },
    {
      status: PublicTxStatus.IN_PROGRESS,
      label: 'Processing',
      timestamp:
        status === PublicTxStatus.IN_PROGRESS ||
        status === PublicTxStatus.SUCCESS ||
        status === PublicTxStatus.FAILED ||
        status === PublicTxStatus.REVERSED
          ? updatedAt
          : undefined,
      isActive: status === PublicTxStatus.IN_PROGRESS,
      isCompleted:
        status === PublicTxStatus.SUCCESS ||
        status === PublicTxStatus.FAILED ||
        status === PublicTxStatus.REVERSED ||
        status === PublicTxStatus.EXPIRED,
    },
  ];

  // Final step depends on outcome
  if (status === PublicTxStatus.SUCCESS) {
    steps.push({
      status: PublicTxStatus.SUCCESS,
      label: 'Completed',
      timestamp: completedAt,
      isActive: false,
      isCompleted: true,
    });
  } else if (status === PublicTxStatus.FAILED) {
    steps.push({
      status: PublicTxStatus.FAILED,
      label: 'Failed',
      timestamp: completedAt,
      isActive: false,
      isCompleted: true,
    });
  } else if (status === PublicTxStatus.REVERSED) {
    steps.push({
      status: PublicTxStatus.REVERSED,
      label: 'Reversed',
      timestamp: completedAt,
      isActive: false,
      isCompleted: true,
    });
  } else if (status === PublicTxStatus.EXPIRED) {
    steps.push({
      status: PublicTxStatus.EXPIRED,
      label: 'Expired',
      timestamp: completedAt,
      isActive: false,
      isCompleted: true,
    });
  } else {
    // Pending or in-progress: show expected final step
    steps.push({
      status: PublicTxStatus.SUCCESS,
      label: 'Completed',
      timestamp: undefined,
      isActive: false,
      isCompleted: false,
    });
  }

  return steps;
}

/**
 * Checks if a public status is a terminal (final) state.
 */
export function isTerminalStatus(status: PublicTxStatus): boolean {
  return (
    status === PublicTxStatus.SUCCESS ||
    status === PublicTxStatus.FAILED ||
    status === PublicTxStatus.REVERSED ||
    status === PublicTxStatus.EXPIRED
  );
}

/**
 * Checks if a public status indicates a successful outcome.
 */
export function isSuccessStatus(status: PublicTxStatus): boolean {
  return status === PublicTxStatus.SUCCESS;
}

/**
 * Checks if a public status indicates an error/negative outcome.
 */
export function isErrorStatus(status: PublicTxStatus): boolean {
  return (
    status === PublicTxStatus.FAILED ||
    status === PublicTxStatus.REVERSED ||
    status === PublicTxStatus.EXPIRED
  );
}


