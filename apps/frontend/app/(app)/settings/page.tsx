import Link from 'next/link';
import {
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
} from '@/lib/state/synthetic-journey';
import { ABOUT_HEDGR_PATH } from '@/lib/narrative/about-hedgr';

const accountRows = [
  { label: 'Email', value: 'user@example.com' },
  { label: 'Display name', value: 'Not set', muted: true },
  { label: 'Verification status', value: 'Not verified' },
];

type SettingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const journey = resolvedSearchParams[CLASS_A_VAL_002_JOURNEY_PARAM];
  const syntheticResearchSettings = Array.isArray(journey)
    ? journey.includes(CLASS_A_VAL_002_JOURNEY_VALUE)
    : journey === CLASS_A_VAL_002_JOURNEY_VALUE;

  return (
    <main className="mx-auto max-w-2xl space-y-7 px-6 pb-28 pt-6 sm:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-hedgr-800 sm:text-4xl">
        Settings
      </h1>

      <section className="space-y-3" data-testid="settings-account">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Account
        </h2>
        <dl className="border-y border-hedgr-100 bg-white">
          {accountRows.map((row) => (
            <div
              key={row.label}
              className="flex min-h-16 items-center justify-between gap-6 border-b border-hedgr-100 py-3 last:border-b-0"
            >
              <dt className="text-sm font-medium text-hedgr-500">
                {row.label}
              </dt>
              <dd
                className={`text-right text-sm font-semibold ${
                  row.muted ? 'italic text-hedgr-400' : 'text-hedgr-800'
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3" data-testid="settings-preferences">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Preferences
        </h2>
        <div className="border-y border-hedgr-100 py-4">
          <h3 className="text-sm font-semibold text-hedgr-800">
            No preferences available yet
          </h3>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-hedgr-500">
            This prototype does not currently offer customer-controlled
            settings.
          </p>
        </div>
      </section>

      <section className="space-y-3" data-testid="settings-trust-information">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Trust &amp; information
        </h2>
        <div className="rounded-2xl border border-hedgr-100 bg-hedgr-100/20 p-5 text-hedgr-800 shadow-sm">
          <h3 className="text-sm font-semibold">About this simulation</h3>
          <p className="mt-2 text-sm leading-relaxed text-hedgr-dark">
            Hedgr is currently using simulated information. Balances,
            transactions and returns shown here are not real. No real customer
            money is held or moved.
          </p>
          <Link
            href="/settings/trust"
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
          >
            Learn more about this simulation
          </Link>
        </div>
        {!syntheticResearchSettings ? (
          <div className="border-y border-hedgr-100 py-2">
            <Link
              href={ABOUT_HEDGR_PATH}
              data-testid="settings-about-hedgr"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
            >
              About Hedgr
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
