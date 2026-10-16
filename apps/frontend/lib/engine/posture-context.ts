import type { EnginePosture } from './types';

/** One short sentence per posture: definition only. No banner disclaimers duplicated here. */
export const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {
  normal:
    'Within the usual range. The main target is the largest of the three planning targets.',
  tightening:
    'The Reserve target is going up while conditions are reviewed.',
  tightened:
    'The Reserve target is higher than usual until conditions ease.',
  recovery:
    'Within the usual range. Targets are returning to their usual levels.',
};
