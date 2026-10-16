import type { EngineNotice, EnginePosture } from './types';

export type NonNormalEnginePosture = Exclude<EnginePosture, 'normal'>;

export const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {
  tightening: {
    title: 'Targets are changing',
    body: 'When the Reserve target goes up, the target for earning can go down. These are targets, not your balance.',
  },
  tightened: {
    title: 'Targets are set higher than usual',
    body: 'These are targets, not your balance.',
  },
  recovery: {
    title: 'Targets are returning to usual',
    body: 'These are targets, not your balance.',
  },
};
