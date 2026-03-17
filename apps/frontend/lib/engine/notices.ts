import type { EngineNotice, EnginePosture } from './types';

export type NonNormalEnginePosture = Exclude<EnginePosture, 'normal'>;

export const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {
  tightening: {
    title: 'Protection posture tightening',
    body: 'The Stability Engine is moving toward a more protective target posture while conditions are reviewed. This is informational and does not indicate that funds have already moved.',
  },
  tightened: {
    title: 'Protection posture tightened',
    body: 'The Stability Engine is holding a more defensive target posture with higher liquidity priority while conditions remain elevated. This is informational and does not indicate executed allocation changes.',
  },
  recovery: {
    title: 'Protection posture recovering',
    body: 'The Stability Engine is moving toward a steadier target posture as conditions stabilize, while liquidity discipline remains in place. This is informational and does not indicate executed allocation changes.',
  },
};
