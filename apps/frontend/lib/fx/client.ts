/**
 * Mode-aware FX contract client — SSoT for fetching the latest FX rate.
 * Mock, stub, and fixed environments use the deterministic same-origin route.
 * Live mode uses the backend contract and never falls back silently.
 */

import { getEnvironmentMode } from '../env/mode';

export interface LatestFxResponse {
  pair: string;
  rate: number;
  /** Unix seconds from backend; formatting happens at UI boundary */
  ts: number;
}

const SANITIZED_ERROR = 'FX service unavailable';

type SameOriginFxResponse = {
  base: string;
  quote: string;
  rate: number;
  ts: number;
};

function getBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) {
    throw new Error(SANITIZED_ERROR);
  }
  try {
    const u = new URL(base);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      throw new Error();
    }
    return base.replace(/\/$/, '');
  } catch {
    throw new Error(SANITIZED_ERROR);
  }
}

/**
 * Fetch latest FX rate from backend contract.
 * @param pair - e.g. "USDZMW"
 * @param signal - Optional AbortSignal for cancellation
 * @returns { pair, rate, ts } with ts as Unix seconds
 * @throws Sanitized error on non-2xx or invalid response (no raw body/message)
 */
export async function fetchLatestFx(
  pair: string,
  signal?: AbortSignal
): Promise<LatestFxResponse> {
  const simulatedMode = getEnvironmentMode() !== 'live';
  const pairMatch = /^USD([A-Z]{3})$/.exec(pair);
  if (!pairMatch) {
    throw new Error(SANITIZED_ERROR);
  }

  const quote = pairMatch[1];
  const url = simulatedMode
    ? `/api/fx?quote=${encodeURIComponent(quote)}`
    : `${getBaseUrl()}/v1/fx/latest?pair=${encodeURIComponent(pair)}`;

  let res: Response;
  try {
    res = await fetch(url, { signal });
  } catch {
    throw new Error(SANITIZED_ERROR);
  }

  if (!res.ok) {
    throw new Error(SANITIZED_ERROR);
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(SANITIZED_ERROR);
  }

  if (data == null || typeof data !== 'object') {
    throw new Error(SANITIZED_ERROR);
  }

  if (simulatedMode) {
    const obj = data as Partial<SameOriginFxResponse>;
    if (
      obj.base !== 'USD' ||
      obj.quote !== quote ||
      typeof obj.rate !== 'number' ||
      !Number.isFinite(obj.rate) ||
      obj.rate <= 0 ||
      typeof obj.ts !== 'number' ||
      !Number.isFinite(obj.ts)
    ) {
      throw new Error(SANITIZED_ERROR);
    }

    return {
      pair,
      rate: obj.rate,
      ts: Math.floor(obj.ts / 1000),
    };
  }

  const obj = data as Partial<LatestFxResponse>;
  if (
    obj.pair !== pair ||
    typeof obj.rate !== 'number' ||
    !Number.isFinite(obj.rate) ||
    obj.rate <= 0 ||
    typeof obj.ts !== 'number' ||
    !Number.isFinite(obj.ts)
  ) {
    throw new Error(SANITIZED_ERROR);
  }

  return {
    pair: obj.pair,
    rate: obj.rate,
    ts: obj.ts,
  };
}
