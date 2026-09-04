import { describe, expect, it } from 'vitest';

import fixture from '../../../docs/ops/mobile-native/HEDGR_NATIVE_READINESS_CONTRACT_FIXTURE.json';
import { getMockEngineState } from '../lib/engine/mock';
import type { EnginePosture, EngineState } from '../lib/engine/types';
import { computeBalanceFromLedger } from '../lib/state/balance';
import type { LedgerTxStatus, Tx } from '../lib/state/ledger';
import {
  mapInternalStatusToPublicStatus,
  mapLedgerStatusToPublicStatus,
} from '../lib/tx/status-mapper';
import type { PublicTxStatus } from '../lib/tx/types';

type PortableEngineState = Omit<EngineState, 'notice'>;

describe('MOBILE-NATIVE-READINESS-001 contract fixture', () => {
  it('preserves the synthetic $0 -> +$5 -> -$2 -> $3 balance projection', () => {
    const projection = computeBalanceFromLedger(
      fixture.balance_scenario.transactions as Tx[],
    );

    expect({
      total: projection.total,
      available: projection.available,
      pending: projection.pending,
      currency: projection.currency,
    }).toEqual(fixture.balance_scenario.expected_projection);
  });

  it('preserves ledger and internal status mapping into the public enum', () => {
    for (const [ledgerStatus, publicStatus] of Object.entries(
      fixture.ledger_public_statuses,
    )) {
      expect(mapLedgerStatusToPublicStatus(ledgerStatus as LedgerTxStatus)).toBe(
        publicStatus as PublicTxStatus,
      );
    }

    for (const [internalStatus, publicStatus] of Object.entries(
      fixture.internal_public_statuses,
    )) {
      expect(mapInternalStatusToPublicStatus(internalStatus)).toBe(
        publicStatus as PublicTxStatus,
      );
    }
  });

  it('preserves the deterministic read-only engine-state contract', () => {
    for (const [posture, expected] of Object.entries(fixture.engine_states)) {
      const state = getMockEngineState(posture as EnginePosture);
      const portableState: PortableEngineState = {
        posture: state.posture,
        liquidityTargetPct: state.liquidityTargetPct,
        coreTargetPct: state.coreTargetPct,
        yieldCapPct: state.yieldCapPct,
        updatedAt: state.updatedAt,
      };

      expect(portableState).toEqual(expected);
    }
  });
});
