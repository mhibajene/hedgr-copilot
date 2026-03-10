import type { EnginePosture, EngineState } from './types';

const STATIC_UPDATED_AT = '2026-03-08T00:00:00.000Z';

// Provisional notice copy only. Canonical explanatory copy is deferred to MC-S2-006.
const MOCK_ENGINE_STATES: Record<EnginePosture, EngineState> = {
  normal: {
    posture: 'normal',
    liquidityTargetPct: 30,
    coreTargetPct: 50,
    yieldCapPct: 20,
    updatedAt: STATIC_UPDATED_AT,
  },
  tightening: {
    posture: 'tightening',
    liquidityTargetPct: 40,
    coreTargetPct: 45,
    yieldCapPct: 15,
    notice: {
      title: 'Protection posture tightening',
      body: 'Provisional notice: the engine is increasing liquidity targets while conditions remain under review.',
    },
    updatedAt: STATIC_UPDATED_AT,
  },
  tightened: {
    posture: 'tightened',
    liquidityTargetPct: 55,
    coreTargetPct: 35,
    yieldCapPct: 10,
    notice: {
      title: 'Protection posture tightened',
      body: 'Provisional notice: the engine is holding a more defensive target mix with higher liquidity priority.',
    },
    updatedAt: STATIC_UPDATED_AT,
  },
  recovery: {
    posture: 'recovery',
    liquidityTargetPct: 35,
    coreTargetPct: 50,
    yieldCapPct: 15,
    notice: {
      title: 'Protection posture recovering',
      body: 'Provisional notice: the engine is moving toward a steadier target posture while preserving liquidity discipline.',
    },
    updatedAt: STATIC_UPDATED_AT,
  },
};

export function getMockEngineState(
  posture: EnginePosture = 'normal',
): EngineState {
  return MOCK_ENGINE_STATES[posture];
}
