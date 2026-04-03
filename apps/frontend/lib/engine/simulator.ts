import type { EnginePosture } from './types';
import { isLocalDevSimulationSeamEnabled } from '../dev/local-simulation-guard';

export const ENGINE_POSTURE_QUERY_PARAM = 'enginePosture';

const DEFAULT_ENGINE_POSTURE: EnginePosture = 'normal';
const ENGINE_POSTURES: readonly EnginePosture[] = [
  'normal',
  'tightening',
  'tightened',
  'recovery',
];

function isEnginePosture(value: string | null): value is EnginePosture {
  return typeof value === 'string' && ENGINE_POSTURES.includes(value as EnginePosture);
}

export function isLocalEngineSimulatorEnabled(): boolean {
  return isLocalDevSimulationSeamEnabled();
}

export function resolveEngineSimulatorPosture(
  search: string | undefined,
): EnginePosture {
  // The simulator is a local development aid only, not a product/runtime control surface.
  if (!isLocalEngineSimulatorEnabled() || !search) {
    return DEFAULT_ENGINE_POSTURE;
  }

  const posture = new URLSearchParams(search).get(ENGINE_POSTURE_QUERY_PARAM);
  return isEnginePosture(posture) ? posture : DEFAULT_ENGINE_POSTURE;
}
