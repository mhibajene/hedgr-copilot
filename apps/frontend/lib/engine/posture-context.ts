import type { EnginePosture } from './types';

/** One short sentence per posture: definition only—no banner disclaimers duplicated here. */
export const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {
  normal:
    'Conditions look steady. Most stays in your stable balance, with conservative yield and a reserve held ready.',
  tightening:
    'Shifting toward stronger protection, with more weight on the reserve.',
  tightened:
    'More protective than usual, with the reserve prioritized.',
  recovery:
    'Easing toward steadier targets while keeping reserve discipline.',
};
