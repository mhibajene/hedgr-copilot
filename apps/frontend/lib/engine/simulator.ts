import type { EnginePosture } from './types';

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

function getAppEnv(): string {
  // Match the repo-native frontend fallback in config/env.ts.
  return process.env.NEXT_PUBLIC_APP_ENV ?? 'dev';
}

export function isLocalEngineSimulatorEnabled(): boolean {
  if (process.env.CI === 'true') {
    return false;
  }

  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    return false;
  }

  return getAppEnv() === 'dev';
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
