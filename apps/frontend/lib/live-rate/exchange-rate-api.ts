import { env } from 'node:process';
import { z } from 'zod';

const PROVIDER_URL = 'https://open.er-api.com/v6/latest/USD';
const ATTEMPT_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PROVIDER_AGE_MS = 48 * 60 * 60 * 1000;

const providerResult = z.object({
  result: z.literal('success'),
  base_code: z.literal('USD'),
  time_last_update_unix: z.number().int().positive(),
  rates: z.object({ ZMW: z.number().finite().min(10).max(60) }),
});

type ProviderRate = { rate: number; updatedAt: number };
const unavailable = { rate: null, asOf: null, available: false } as const;

// The single fixed USD/ZMW pair is the implicit key. Each instance has its own window.
let memo: { startedAt: number; result: Promise<ProviderRate | null> } | undefined;

function isFresh(updatedAt: number, now: number) {
  const age = now - updatedAt;
  return age >= 0 && age < MAX_PROVIDER_AGE_MS;
}

async function fetchProviderRate(): Promise<ProviderRate | null> {
  try {
    const response = await fetch(PROVIDER_URL, {
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const { success, data } = providerResult.safeParse(await response.json());
    if (!success) return null;
    const updatedAt = data.time_last_update_unix * 1000;
    if (!isFresh(updatedAt, Date.now())) return null;
    return { rate: data.rates.ZMW, updatedAt };
  } catch {
    return null;
  }
}

export async function readDailyRate() {
  if (env.CI === 'true' || env.CI === '1') return unavailable;

  const now = Date.now();
  if (!memo || now - memo.startedAt >= ATTEMPT_WINDOW_MS) {
    // Defer fetch until the slot exists so overlapping reads share this attempt.
    memo = { startedAt: now, result: Promise.resolve().then(fetchProviderRate) };
  }

  const attempt = memo;
  const result = await attempt.result;
  if (attempt !== memo || !result || !isFresh(result.updatedAt, Date.now())) return unavailable;
  return { rate: result.rate, asOf: new Date(result.updatedAt).toISOString(), available: true } as const;
}
