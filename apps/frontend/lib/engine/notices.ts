import type { EngineNotice, EnginePosture } from './types';

export type NonNormalEnginePosture = Exclude<EnginePosture, 'normal'>;

export const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {
  tightening: {
    title: 'Stability protection is tightening',
    body: 'The Stability Engine is shifting toward a more protective target mix while conditions are reviewed. When protection and the reserve take priority, conservative yield in these targets can be lower. This is informational guidance about system intent—not your ledger balance, holdings, or confirmed positions.',
  },
  tightened: {
    title: 'Stability protection is elevated',
    body: 'The Stability Engine is holding a more protective target mix with the reserve prioritized while conditions stay elevated. This is informational guidance about system intent—not your ledger balance, holdings, or confirmed positions.',
  },
  recovery: {
    title: 'Stability protection is easing',
    body: 'The Stability Engine is moving toward steadier targets as conditions stabilize, with reserve discipline still in view. This is informational guidance about system intent—not your ledger balance, holdings, or confirmed positions.',
  },
};
