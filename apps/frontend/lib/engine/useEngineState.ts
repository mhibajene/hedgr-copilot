import { getMockEngineState } from './mock';
import type { EngineState } from './types';

export function useEngineState(): EngineState {
  return getMockEngineState();
}
