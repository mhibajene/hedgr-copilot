/**
 * Backend FX contract client — SSoT for fetching latest FX rate.
 * Uses GET /v1/fx/latest?pair=...; does not call any external FX providers.
 */

export interface LatestFxResponse {
  pair: string;
  rate: number;
  /** Unix seconds from backend; formatting happens at UI boundary */
  ts: number;
}

const SANITIZED_ERROR = 'FX service unavailable';

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
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/v1/fx/latest?pair=${encodeURIComponent(pair)}`;

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

  if (
    data == null ||
    typeof data !== 'object' ||
    typeof (data as Record<string, unknown>).pair !== 'string' ||
    typeof (data as Record<string, unknown>).rate !== 'number' ||
    typeof (data as Record<string, unknown>).ts !== 'number'
  ) {
    throw new Error(SANITIZED_ERROR);
  }

  const obj = data as { pair: string; rate: number; ts: number };
  return {
    pair: obj.pair,
    rate: obj.rate,
    ts: obj.ts,
  };
}
