// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import {
  mapInternalStatusToPublicStatus,
  txToLifecycle,
  generateTimelineSteps,
  isTerminalStatus,
  isSuccessStatus,
  isErrorStatus,
  PublicTxStatus,
  InternalTxStatus,
  PublicTxStatusLabels,
} from '../lib/tx';
import type { Tx } from '../lib/state/ledger';

describe('Transaction Lifecycle - Status Mapping', () => {
  describe('mapInternalStatusToPublicStatus', () => {
    test('maps PENDING states to PENDING_INIT', () => {
      expect(mapInternalStatusToPublicStatus('PENDING')).toBe(PublicTxStatus.PENDING_INIT);
      expect(mapInternalStatusToPublicStatus('PENDING_INIT')).toBe(PublicTxStatus.PENDING_INIT);
      expect(mapInternalStatusToPublicStatus('INITIATED')).toBe(PublicTxStatus.PENDING_INIT);
      expect(mapInternalStatusToPublicStatus('CREATED')).toBe(PublicTxStatus.PENDING_INIT);
    });

    test('maps IN_PROGRESS states correctly', () => {
      expect(mapInternalStatusToPublicStatus('IN_PROGRESS')).toBe(PublicTxStatus.IN_PROGRESS);
      expect(mapInternalStatusToPublicStatus('PROCESSING')).toBe(PublicTxStatus.IN_PROGRESS);
      expect(mapInternalStatusToPublicStatus('L2_PENDING')).toBe(PublicTxStatus.IN_PROGRESS);
      expect(mapInternalStatusToPublicStatus('BRIDGE_INIT')).toBe(PublicTxStatus.IN_PROGRESS);
      expect(mapInternalStatusToPublicStatus('AWAITING_CONFIRMATION')).toBe(PublicTxStatus.IN_PROGRESS);
    });

    test('maps SUCCESS states correctly', () => {
      expect(mapInternalStatusToPublicStatus('SUCCESS')).toBe(PublicTxStatus.SUCCESS);
      expect(mapInternalStatusToPublicStatus('CONFIRMED')).toBe(PublicTxStatus.SUCCESS);
      expect(mapInternalStatusToPublicStatus('COMPLETED')).toBe(PublicTxStatus.SUCCESS);
      expect(mapInternalStatusToPublicStatus('SETTLED')).toBe(PublicTxStatus.SUCCESS);
    });

    test('maps FAILED states correctly', () => {
      expect(mapInternalStatusToPublicStatus('FAILED')).toBe(PublicTxStatus.FAILED);
      expect(mapInternalStatusToPublicStatus('REJECTED')).toBe(PublicTxStatus.FAILED);
      expect(mapInternalStatusToPublicStatus('ERROR')).toBe(PublicTxStatus.FAILED);
    });

    test('maps REVERSED states correctly', () => {
      expect(mapInternalStatusToPublicStatus('REVERSED')).toBe(PublicTxStatus.REVERSED);
      expect(mapInternalStatusToPublicStatus('REFUNDED')).toBe(PublicTxStatus.REVERSED);
      expect(mapInternalStatusToPublicStatus('CANCELLED')).toBe(PublicTxStatus.REVERSED);
    });

    test('maps EXPIRED states correctly', () => {
      expect(mapInternalStatusToPublicStatus('EXPIRED')).toBe(PublicTxStatus.EXPIRED);
      expect(mapInternalStatusToPublicStatus('TIMED_OUT')).toBe(PublicTxStatus.EXPIRED);
    });

    test('handles case insensitivity', () => {
      expect(mapInternalStatusToPublicStatus('pending')).toBe(PublicTxStatus.PENDING_INIT);
      expect(mapInternalStatusToPublicStatus('Confirmed')).toBe(PublicTxStatus.SUCCESS);
      expect(mapInternalStatusToPublicStatus('FAILED')).toBe(PublicTxStatus.FAILED);
    });

    test('handles whitespace', () => {
      expect(mapInternalStatusToPublicStatus('  PENDING  ')).toBe(PublicTxStatus.PENDING_INIT);
      expect(mapInternalStatusToPublicStatus('CONFIRMED ')).toBe(PublicTxStatus.SUCCESS);
    });

    test('unknown statuses default to IN_PROGRESS', () => {
      expect(mapInternalStatusToPublicStatus('UNKNOWN_STATUS')).toBe(PublicTxStatus.IN_PROGRESS);
      expect(mapInternalStatusToPublicStatus('RANDOM')).toBe(PublicTxStatus.IN_PROGRESS);
    });

    test('every InternalTxStatus maps to a valid PublicTxStatus', () => {
      const allInternalStatuses = Object.values(InternalTxStatus);
      const allPublicStatuses = Object.values(PublicTxStatus);

      for (const internalStatus of allInternalStatuses) {
        const publicStatus = mapInternalStatusToPublicStatus(internalStatus);
        expect(allPublicStatuses).toContain(publicStatus);
      }
    });
  });

  describe('txToLifecycle', () => {
    test('converts a PENDING transaction correctly', () => {
      const tx: Tx = {
        id: 'tx_1',
        type: 'DEPOSIT',
        amountUSD: 10.0,
        amountZMW: 200,
        status: 'PENDING',
        createdAt: 1000,
      };

      const lifecycle = txToLifecycle(tx);

      expect(lifecycle.id).toBe('tx_1');
      expect(lifecycle.type).toBe('DEPOSIT');
      expect(lifecycle.amountUSD).toBe(10.0);
      expect(lifecycle.amountZMW).toBe(200);
      expect(lifecycle.status).toBe(PublicTxStatus.PENDING_INIT);
      expect(lifecycle.createdAt).toBe(1000);
      expect(lifecycle.updatedAt).toBe(1000);
      expect(lifecycle.completedAt).toBeUndefined();
      expect(lifecycle.failureReason).toBeUndefined();
    });

    test('converts a CONFIRMED transaction correctly', () => {
      const tx: Tx = {
        id: 'tx_2',
        type: 'WITHDRAW',
        amountUSD: 5.0,
        status: 'CONFIRMED',
        createdAt: 1000,
        confirmedAt: 2000,
      };

      const lifecycle = txToLifecycle(tx);

      expect(lifecycle.status).toBe(PublicTxStatus.SUCCESS);
      expect(lifecycle.updatedAt).toBe(2000);
      expect(lifecycle.completedAt).toBe(2000);
      expect(lifecycle.failureReason).toBeUndefined();
    });

    test('converts a FAILED transaction with failure reason', () => {
      const tx: Tx = {
        id: 'tx_3',
        type: 'DEPOSIT',
        amountUSD: 15.0,
        status: 'FAILED',
        createdAt: 1000,
        confirmedAt: 2000,
      };

      const lifecycle = txToLifecycle(tx);

      expect(lifecycle.status).toBe(PublicTxStatus.FAILED);
      expect(lifecycle.completedAt).toBe(2000);
      expect(lifecycle.failureReason).toBeDefined();
    });
  });

  describe('generateTimelineSteps', () => {
    test('generates correct timeline for PENDING_INIT status', () => {
      const tx = txToLifecycle({
        id: 'tx_1',
        type: 'DEPOSIT',
        amountUSD: 10.0,
        status: 'PENDING',
        createdAt: 1000,
      });

      const steps = generateTimelineSteps(tx);

      expect(steps).toHaveLength(3);
      expect(steps[0].status).toBe(PublicTxStatus.PENDING_INIT);
      expect(steps[0].isActive).toBe(true);
      expect(steps[0].isCompleted).toBe(true);
      expect(steps[1].status).toBe(PublicTxStatus.IN_PROGRESS);
      expect(steps[1].isActive).toBe(false);
      expect(steps[1].isCompleted).toBe(false);
      expect(steps[2].status).toBe(PublicTxStatus.SUCCESS);
      expect(steps[2].isCompleted).toBe(false);
    });

    test('generates correct timeline for SUCCESS status', () => {
      const tx = txToLifecycle({
        id: 'tx_2',
        type: 'DEPOSIT',
        amountUSD: 10.0,
        status: 'CONFIRMED',
        createdAt: 1000,
        confirmedAt: 2000,
      });

      const steps = generateTimelineSteps(tx);

      expect(steps).toHaveLength(3);
      expect(steps[0].isCompleted).toBe(true);
      expect(steps[1].isCompleted).toBe(true);
      expect(steps[2].status).toBe(PublicTxStatus.SUCCESS);
      expect(steps[2].isCompleted).toBe(true);
    });

    test('generates correct timeline for FAILED status', () => {
      const tx = txToLifecycle({
        id: 'tx_3',
        type: 'DEPOSIT',
        amountUSD: 10.0,
        status: 'FAILED',
        createdAt: 1000,
        confirmedAt: 2000,
      });

      const steps = generateTimelineSteps(tx);

      expect(steps).toHaveLength(3);
      expect(steps[2].status).toBe(PublicTxStatus.FAILED);
      expect(steps[2].label).toBe('Failed');
      expect(steps[2].isCompleted).toBe(true);
    });
  });

  describe('Status helper functions', () => {
    test('isTerminalStatus correctly identifies terminal states', () => {
      expect(isTerminalStatus(PublicTxStatus.SUCCESS)).toBe(true);
      expect(isTerminalStatus(PublicTxStatus.FAILED)).toBe(true);
      expect(isTerminalStatus(PublicTxStatus.REVERSED)).toBe(true);
      expect(isTerminalStatus(PublicTxStatus.EXPIRED)).toBe(true);
      expect(isTerminalStatus(PublicTxStatus.PENDING_INIT)).toBe(false);
      expect(isTerminalStatus(PublicTxStatus.IN_PROGRESS)).toBe(false);
    });

    test('isSuccessStatus correctly identifies success state', () => {
      expect(isSuccessStatus(PublicTxStatus.SUCCESS)).toBe(true);
      expect(isSuccessStatus(PublicTxStatus.FAILED)).toBe(false);
      expect(isSuccessStatus(PublicTxStatus.PENDING_INIT)).toBe(false);
    });

    test('isErrorStatus correctly identifies error states', () => {
      expect(isErrorStatus(PublicTxStatus.FAILED)).toBe(true);
      expect(isErrorStatus(PublicTxStatus.REVERSED)).toBe(true);
      expect(isErrorStatus(PublicTxStatus.EXPIRED)).toBe(true);
      expect(isErrorStatus(PublicTxStatus.SUCCESS)).toBe(false);
      expect(isErrorStatus(PublicTxStatus.PENDING_INIT)).toBe(false);
    });
  });

  describe('PublicTxStatusLabels', () => {
    test('all public statuses have human-readable labels', () => {
      const allStatuses = Object.values(PublicTxStatus);
      for (const status of allStatuses) {
        expect(PublicTxStatusLabels[status]).toBeDefined();
        expect(typeof PublicTxStatusLabels[status]).toBe('string');
        expect(PublicTxStatusLabels[status].length).toBeGreaterThan(0);
      }
    });

    test('labels are user-friendly', () => {
      expect(PublicTxStatusLabels[PublicTxStatus.PENDING_INIT]).toBe('Pending');
      expect(PublicTxStatusLabels[PublicTxStatus.IN_PROGRESS]).toBe('Processing');
      expect(PublicTxStatusLabels[PublicTxStatus.SUCCESS]).toBe('Completed');
      expect(PublicTxStatusLabels[PublicTxStatus.FAILED]).toBe('Failed');
      expect(PublicTxStatusLabels[PublicTxStatus.REVERSED]).toBe('Reversed');
      expect(PublicTxStatusLabels[PublicTxStatus.EXPIRED]).toBe('Expired');
    });
  });
});

describe('Transaction Lifecycle - Activity API Serialization', () => {
  test('all returned statuses belong to the public enum', () => {
    // Simulate API response serialization
    const mockApiTransactions = [
      { status: 'SUCCESS' },
      { status: 'FAILED' },
      { status: 'PENDING_INIT' },
      { status: 'IN_PROGRESS' },
      { status: 'REVERSED' },
      { status: 'EXPIRED' },
    ];

    const validStatuses = Object.values(PublicTxStatus);

    for (const tx of mockApiTransactions) {
      expect(validStatuses).toContain(tx.status);
    }
  });

  test('mapped internal statuses produce valid API responses', () => {
    const internalStatuses = [
      'PENDING',
      'CONFIRMED',
      'FAILED',
      'L2_PENDING',
      'BRIDGE_INIT',
      'SETTLED',
    ];

    const validStatuses = Object.values(PublicTxStatus);

    for (const internal of internalStatuses) {
      const publicStatus = mapInternalStatusToPublicStatus(internal);
      expect(validStatuses).toContain(publicStatus);
    }
  });
});

