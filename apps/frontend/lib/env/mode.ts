/**
 * Environment mode for trust & custody disclosure.
 * Derived from feature flags only; no backend dependency.
 * AUTH_MODE has highest priority; FX_MODE is evaluated only when AUTH_MODE is not 'mock'.
 */
export type EnvironmentMode = 'mock' | 'stub' | 'live';

export function getEnvironmentMode(): EnvironmentMode {
  if (process.env.NEXT_PUBLIC_AUTH_MODE === 'mock') {
    return 'mock';
  }
  const fxMode = process.env.NEXT_PUBLIC_FX_MODE;
  if (fxMode === 'stub' || fxMode === 'fixed') {
    return 'stub';
  }
  return 'live';
}
