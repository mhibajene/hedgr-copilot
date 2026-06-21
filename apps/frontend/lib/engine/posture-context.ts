import type { EnginePosture } from './types';

/** One short sentence per posture: definition only—no banner disclaimers duplicated here. */
export const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {
  normal:
    'Within expected range. Stable balance remains the primary lane, with conservative yield and reserve capacity kept visible.',
  tightening:
    'Protective posture is increasing. Reserve targets are more prominent while conditions are reviewed.',
  tightened:
    'Protective posture is elevated. Reserve targets stay prioritized until conditions ease.',
  recovery:
    'Within expected range. Targets are easing toward steadier posture while reserve discipline remains visible.',
};
