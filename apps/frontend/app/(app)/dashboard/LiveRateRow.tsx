import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RateAttribution, useRateAttributionMount } from './RateAttribution';

const MAX_PROVIDER_AGE_MS = 48 * 60 * 60 * 1000;
const displayDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

type DailyRate = { value: number; updatedAt: number };
type AttributedRate = DailyRate & { mount: HTMLDivElement };

function isFresh(updatedAt: number, now: number) {
  const age = now - updatedAt;
  return age >= 0 && age < MAX_PROVIDER_AGE_MS;
}

async function requestDailyRate(): Promise<DailyRate | null> {
  try {
    const response = await fetch('/api/live-rate', {
      cache: 'no-store',
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
    });
    if (!response.ok) return null;
    const { rate, asOf, available } = await response.json();
    if (available !== true || typeof rate !== 'number' || !Number.isFinite(rate) ||
        rate < 10 || rate > 60 || typeof asOf !== 'string') return null;
    const updatedAt = Date.parse(asOf);
    return isFresh(updatedAt, Date.now()) ? { value: rate, updatedAt } : null;
  } catch {
    return null;
  }
}

export function useDailyRate(eligible: boolean, opened: boolean): AttributedRate | null {
  const mount = useRateAttributionMount();
  const attempt = useRef<Promise<DailyRate | null> | null>(null);
  const [rate, setRate] = useState<DailyRate | null>(null);

  useEffect(() => {
    if (!eligible || !opened || !mount) return;
    attempt.current ??= requestDailyRate();
    let current = true;
    void attempt.current.then(result => {
      if (current) setRate(result);
    });
    return () => { current = false; };
  }, [eligible, opened, mount]);

  useEffect(() => {
    if (!rate) return;
    const expiresIn = rate.updatedAt + MAX_PROVIDER_AGE_MS - Date.now();
    const expire = setTimeout(() => setRate(null), Math.max(expiresIn, 0));
    return () => clearTimeout(expire);
  }, [rate]);

  return eligible && opened && mount && rate && isFresh(rate.updatedAt, Date.now())
    ? { ...rate, mount }
    : null;
}

export function LiveRateRow({ rate }: { rate: AttributedRate }) {
  return (
    <>
      <dl>
        <dt>Daily rate</dt>
        <dd>1 USD = {rate.value.toFixed(2)} ZMW</dd>
        <dd>As of {displayDate.format(rate.updatedAt)}. Not used in any figure on this sheet.</dd>
      </dl>
      {createPortal(<RateAttribution />, rate.mount)}
    </>
  );
}
