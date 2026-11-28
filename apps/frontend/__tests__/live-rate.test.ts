import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const provider = 'https://open.er-api.com/v6/latest/USD';
const unavailable = { rate: null, asOf: null, available: false };
const day = 86_400_000;
const start = Date.parse('2026-11-27T12:00:00Z');
const providerTime = start - 3_600_000;
let clock: number;
let upstream: ReturnType<typeof vi.fn<typeof fetch>>;

const adapter = () => import('../lib/live-rate/exchange-rate-api');
const route = () => import('../app/api/live-rate/route');

function payload(rate: unknown = 20.58, updated = providerTime) {
  return {
    result: 'success',
    base_code: 'USD',
    time_last_update_unix: updated / 1000,
    rates: { ZMW: rate, EUR: 0.90 },
    otherProviderMetadata: 'must not leave the route',
  };
}

beforeEach(() => {
  vi.resetModules();
  clock = start;
  vi.spyOn(Date, 'now').mockImplementation(() => clock);
  vi.stubEnv('CI', '');
  upstream = vi.fn<typeof fetch>().mockImplementation(async () => Response.json(payload()));
  vi.stubGlobal('fetch', upstream);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('JOURNEY-REVIEW-001 item 3 amended upstream control', () => {
  test.each(['true', '1'])('CI=%s returns unavailable with zero upstream attempts', async (ci) => {
    vi.stubEnv('CI', ci);
    const { readDailyRate } = await adapter();
    expect(await readDailyRate()).toEqual(unavailable);
    expect(upstream).toHaveBeenCalledTimes(0);
  });

  test('import and route registration are inert, and GET exposes only the minimal result', async () => {
    const { GET, dynamic } = await route();
    expect(dynamic).toBe('force-dynamic');
    expect(GET).toHaveLength(0);
    expect(upstream).toHaveBeenCalledTimes(0);
    const timeout = vi.spyOn(AbortSignal, 'timeout');
    const reply = await GET();
    expect(reply.headers.has('access-control-allow-origin')).toBe(false);
    expect(reply.headers.has('access-control-allow-credentials')).toBe(false);
    expect(reply.headers.has('set-cookie')).toBe(false);
    expect(await reply.json()).toEqual({ rate: 20.58, asOf: new Date(providerTime).toISOString(), available: true });
    expect(upstream).toHaveBeenCalledExactlyOnceWith(provider, {
      cache: 'no-store',
      redirect: 'error',
      signal: expect.any(AbortSignal),
    });
    expect(timeout).toHaveBeenCalledExactlyOnceWith(5000);
  });

  test('concurrent cold reads claim exactly one attempt and share its result', async () => {
    let complete!: (response: Response) => void;
    upstream.mockReturnValueOnce(new Promise(resolve => { complete = resolve; }));
    const { readDailyRate } = await adapter();
    const callers = [readDailyRate(), readDailyRate(), readDailyRate()];
    await vi.waitFor(() => expect(upstream).toHaveBeenCalledTimes(1));
    complete(Response.json(payload()));
    const expected = { rate: 20.58, asOf: new Date(providerTime).toISOString(), available: true };
    expect(await Promise.all(callers)).toEqual([expected, expected, expected]);
    clock += day - 1;
    expect(await readDailyRate()).toEqual(expected);
    expect(upstream).toHaveBeenCalledTimes(1);
    clock++;
    expect(await readDailyRate()).toEqual(expected);
    expect(upstream).toHaveBeenCalledTimes(2);
  });

  test.each([10, 60])('accepts exact inclusive band endpoint %s', async (rate) => {
    upstream.mockResolvedValueOnce(Response.json(payload(rate)));
    expect((await (await adapter()).readDailyRate()).rate).toBe(rate);
  });

  const failedResponses: [string, () => Promise<Response>][] = [
    ['429', async () => new Response(null, { status: 429 })],
    ['non-2xx', async () => new Response(null, { status: 503 })],
    ['timeout', async () => { throw new DOMException('timeout', 'TimeoutError'); }],
    ['network', async () => { throw new TypeError('unreachable'); }],
    ['malformed JSON', async () => new Response('not json')],
    ['provider failure', async () => Response.json({ ...payload(), result: 'error' })],
    ['incorrect base', async () => Response.json({ ...payload(), base_code: 'EUR' })],
    ['missing timestamp', async () => Response.json({ ...payload(), time_last_update_unix: undefined })],
    ['missing ZMW', async () => Response.json({ ...payload(), rates: { EUR: 1 } })],
    ['string rate', async () => Response.json(payload('20.58'))],
    ['non-finite', async () => new Response('{"result":"success","base_code":"USD","time_last_update_unix":1795777200,"rates":{"ZMW":1e999}}')],
    ['below band', async () => Response.json(payload(9.99))],
    ['above band', async () => Response.json(payload(60.01))],
    ['stale provider date', async () => Response.json(payload(20.58, start - 2 * day))],
    ['future provider date', async () => Response.json(payload(20.58, start + 1000))],
  ];

  test.each(failedResponses)('%s is unavailable and consumes the window without a retry', async (_, failing) => {
    upstream.mockImplementationOnce(failing);
    const { readDailyRate } = await adapter();
    expect(await Promise.all([readDailyRate(), readDailyRate()])).toEqual([unavailable, unavailable]);
    clock += day - 1;
    expect(await readDailyRate()).toEqual(unavailable);
    expect(upstream).toHaveBeenCalledTimes(1);
    clock++;
    expect((await readDailyRate()).available).toBe(true);
    expect(upstream).toHaveBeenCalledTimes(2);
  });

  test.each(failedResponses.filter(([label]) => label === '429' || label === 'timeout'))(
    'new-window %s discards a still-fresh prior rate and makes no further attempt in that window',
    async (_, failing) => {
      const { readDailyRate } = await adapter();
      expect((await readDailyRate()).rate).toBe(20.58);
      clock += day;
      upstream.mockImplementationOnce(failing);
      expect(await readDailyRate()).toEqual(unavailable);
      expect(await readDailyRate()).toEqual(unavailable);
      expect(upstream).toHaveBeenCalledTimes(2);
    },
  );

  test('memoised success expires at provider-time 48 hours checked on every read', async () => {
    upstream.mockResolvedValueOnce(Response.json(payload(20.58, start - 2 * day + 1000)));
    const { readDailyRate } = await adapter();
    expect((await readDailyRate()).available).toBe(true);
    clock += 999;
    expect((await readDailyRate()).available).toBe(true);
    clock++;
    expect(await readDailyRate()).toEqual(unavailable);
    expect(upstream).toHaveBeenCalledTimes(1);
  });
});
