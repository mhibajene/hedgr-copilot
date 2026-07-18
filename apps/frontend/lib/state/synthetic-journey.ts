import { isSupportedQuote } from '../../config/market';
import { getAuthMode } from '../auth/mode';
import { getFixedRate } from '../fx';

export const CLASS_A_VAL_002_JOURNEY_PARAM = 'journey';
export const CLASS_A_VAL_002_JOURNEY_VALUE = 'class-a-val-002';
export const CLASS_A_VAL_002_SCENARIO_PARAM = 'scenario';
export const CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO = 'unavailable-data';

function getSearchParams(search?: string): URLSearchParams {
  if (!search) return new URLSearchParams();
  return new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
}

/**
 * CLASS-A-VAL-002 is a product-validation seam, never a live-capability mode.
 * It is available only with mock auth and a non-live fixed/stub FX posture.
 */
export function isSyntheticJourneyEnvironment(): boolean {
  const fxMode = process.env.NEXT_PUBLIC_FX_MODE;
  const isNonLiveFx = fxMode !== 'live' && fxMode !== 'coingecko';

  return getAuthMode() === 'mock' && isNonLiveFx;
}

export function isSyntheticJourneyPrimaryCondition(search?: string): boolean {
  if (!isSyntheticJourneyEnvironment()) return false;

  const params = getSearchParams(search);
  const explicitlyRequested =
    params.get(CLASS_A_VAL_002_JOURNEY_PARAM) === CLASS_A_VAL_002_JOURNEY_VALUE;
  const isUnavailableDataScenario =
    params.get(CLASS_A_VAL_002_SCENARIO_PARAM) ===
    CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO;

  if (isUnavailableDataScenario) return false;

  const isAutomatedUnitTest =
    process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
  const isLocalValidationDefault =
    !isAutomatedUnitTest && (process.env.NEXT_PUBLIC_APP_ENV ?? 'dev') === 'dev';

  return explicitlyRequested || isLocalValidationDefault;
}

export function isSyntheticJourneyUnavailableDataScenario(search?: string): boolean {
  if (!isSyntheticJourneyEnvironment()) return false;

  const params = getSearchParams(search);
  return (
    params.get(CLASS_A_VAL_002_JOURNEY_PARAM) === CLASS_A_VAL_002_JOURNEY_VALUE &&
    params.get(CLASS_A_VAL_002_SCENARIO_PARAM) ===
      CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO
  );
}

/** Fixed, explicitly simulated preview rate. Never a production quote or fallback. */
export function getSyntheticJourneyRate(quote: string): number {
  if (!isSupportedQuote(quote)) {
    throw new Error(`Unsupported synthetic journey quote: ${quote}`);
  }
  return getFixedRate(quote);
}

export function getSyntheticJourneyHref(
  pathname: '/dashboard' | '/deposit' | '/withdraw' | '/activity',
  options: { unavailableData?: boolean } = {},
): string {
  const params = new URLSearchParams({
    [CLASS_A_VAL_002_JOURNEY_PARAM]: CLASS_A_VAL_002_JOURNEY_VALUE,
  });

  if (options.unavailableData) {
    params.set(
      CLASS_A_VAL_002_SCENARIO_PARAM,
      CLASS_A_VAL_002_UNAVAILABLE_DATA_SCENARIO,
    );
  }

  return `${pathname}?${params.toString()}`;
}
