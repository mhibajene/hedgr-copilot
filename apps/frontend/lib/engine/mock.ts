import { ENGINE_NOTICE_COPY } from './notices';
import type { EnginePosture, EngineState } from './types';

const STATIC_UPDATED_AT = '2026-03-08T00:00:00.000Z';

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
    notice: ENGINE_NOTICE_COPY.tightening,
    updatedAt: STATIC_UPDATED_AT,
  },
  tightened: {
    posture: 'tightened',
    liquidityTargetPct: 55,
    coreTargetPct: 35,
    yieldCapPct: 10,
    notice: ENGINE_NOTICE_COPY.tightened,
    updatedAt: STATIC_UPDATED_AT,
  },
  recovery: {
    posture: 'recovery',
    liquidityTargetPct: 35,
    coreTargetPct: 50,
    yieldCapPct: 15,
    notice: ENGINE_NOTICE_COPY.recovery,
    updatedAt: STATIC_UPDATED_AT,
  },
};

export function getMockEngineState(
  posture: EnginePosture = 'normal',
): EngineState {
  return MOCK_ENGINE_STATES[posture];
}
