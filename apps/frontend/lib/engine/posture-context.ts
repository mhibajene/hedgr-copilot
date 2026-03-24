import type { EnginePosture } from './types';

/** One short sentence per posture: definition only—no banner disclaimers duplicated here. */
export const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {
  normal:
    'Steady conditions; balanced liquidity, core stability, and yield capacity targets.',
  tightening:
    'Shifting toward stronger protection and higher liquidity priority.',
  tightened:
    'Elevated protection with higher liquidity priority than typical.',
  recovery:
    'Moving toward steadier targets while keeping liquidity discipline.',
};
