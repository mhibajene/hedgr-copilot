import type { EngineNotice, EnginePosture } from './types';

export type NonNormalEnginePosture = Exclude<EnginePosture, 'normal'>;

export const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {
  tightening: {
    title: 'Stability protection is tightening',
    body: 'The system is moving toward a more protective mix while conditions are reviewed. When protection and the reserve take priority, the conservative yield target can be lower. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',
  },
  tightened: {
    title: 'Stability protection is elevated',
    body: 'The system is holding a more protective mix with the reserve prioritized while conditions stay elevated. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',
  },
  recovery: {
    title: 'Stability protection is easing',
    body: 'The system is moving toward steadier targets as conditions stabilize, with reserve discipline still in view. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',
  },
};
