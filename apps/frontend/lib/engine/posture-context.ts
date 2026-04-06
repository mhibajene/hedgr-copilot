import type { EnginePosture } from './types';

/** One short sentence per posture: definition only—no banner disclaimers duplicated here. */
export const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {
  normal:
    'Conditions look steady. Targets balance liquidity, core stability, and growth capacity.',
  tightening:
    'Shifting toward stronger protection and higher liquidity priority.',
  tightened:
    'More protective than usual, with liquidity prioritized.',
  recovery:
    'Easing toward steadier targets while keeping liquidity discipline.',
};
