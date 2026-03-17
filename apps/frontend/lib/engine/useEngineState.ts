import { getMockEngineState } from './mock';
import { resolveEngineSimulatorPosture } from './simulator';
import type { EngineState } from './types';

export function useEngineState(): EngineState {
  const search =
    typeof window !== 'undefined' ? window.location.search : undefined;

  return getMockEngineState(resolveEngineSimulatorPosture(search));
}
