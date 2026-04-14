'use client';

import { useState } from 'react';
import { mockRetailDashboard } from './mock-data';

type VariantId = 'control' | 'a' | 'b';

const VARIANT_TABS: { id: VariantId; label: string; short: string }[] = [
  { id: 'control', label: 'Control', short: 'Control' },
  { id: 'a', label: 'Variant A — C3-R2', short: 'A' },
  { id: 'b', label: 'Variant B — C3-R2 + C4', short: 'B' },
];

const REVIEW_META: Record<
  VariantId,
  {
    name: string;
    testing: string;
    risk: string;
    disclosureNote: string;
  }
> = {
  control: {
    name: 'Control',
    testing: 'Centerline C3 stack as a comparison anchor (money → stability → actions → activity → trust → disclosure).',
    risk: 'Mid-layer congestion: actions, activity, and allocation can compete for attention without extra separation.',
    disclosureNote: 'Learn more',
  },
  a: {
    name: 'Variant A — C3-R2',
    testing: 'Stronger visual and semantic separation between Primary Actions and Activity / money state, without adding explanatory blocks.',
    risk: 'Separation may read as artificial segmentation or push activity toward a footer-like afterthought.',
    disclosureNote: 'Learn more (same as Control — label not under test)',
  },
  b: {
    name: 'Variant B — C3-R2 + C4',
    testing: 'Same structure as Variant A; alternate disclosure entry labels only (C4 semantic companion).',
    risk: 'Softer labels may understate seriousness; role clarity may remain unresolved even if tone improves.',
    disclosureNote: 'How this works · Protection details · Allocation details (prototype critique set)',
  },
};

function PrototypeBanner() {
  return (
    <div
      className="rounded-lg border border-amber-500/40 bg-amber-950/80 px-3 py-2 text-center text-xs text-amber-100 sm:text-sm"
      data-testid="prototype-retail-spike-banner"
    >
      Exploratory prototype — mock data only — not production behavior
    </div>
  );
}

function ReviewCaption({ variant }: { variant: VariantId }) {
  const m = REVIEW_META[variant];
  return (
    <aside
      className="mt-4 rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-3 text-left text-xs text-zinc-400 sm:text-[13px]"
      aria-label="Review notes for this variant"
    >
      <div className="font-medium text-zinc-300">{m.name}</div>
      <dl className="mt-2 space-y-1.5">
        <div>
          <dt className="text-zinc-500">What is being tested</dt>
          <dd className="text-zinc-400">{m.testing}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Main risk</dt>
          <dd className="text-zinc-400">{m.risk}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Disclosure label(s)</dt>
          <dd className="text-zinc-400">{m.disclosureNote}</dd>
        </div>
      </dl>
    </aside>
  );
}

function PortfolioAndStability() {
  const d = mockRetailDashboard;
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-900/90 via-violet-900/85 to-zinc-900 p-5 shadow-lg ring-1 ring-white/10">
      <div className="text-xs font-medium uppercase tracking-wide text-violet-200/80">{d.portfolioLabel}</div>
      <p className="mt-1 font-semibold tabular-nums text-3xl tracking-tight text-white sm:text-4xl">{d.portfolioValue}</p>
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="text-xs text-violet-200/70">{d.stability.title}</div>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-medium text-white">{d.stability.status}</span>
          <span className="text-xs text-violet-200/60">{d.stability.note}</span>
        </div>
      </div>
    </div>
  );
}

function PrimaryActions({ grouped }: { grouped: boolean }) {
  const { actions } = mockRetailDashboard;
  const inner = (
    <div className="flex justify-center gap-10">
      {actions.map((a) => (
        <button
          key={a.id}
          type="button"
          className="flex flex-col items-center gap-2 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/80"
          disabled
          aria-disabled="true"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800/80 text-zinc-200">
            {a.id === 'top-up' ? (
              <span className="text-2xl font-light leading-none">+</span>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </span>
          <span className="text-xs text-zinc-400">{a.label}</span>
        </button>
      ))}
    </div>
  );

  if (!grouped) {
    return <div className="pt-1">{inner}</div>;
  }

  return (
    <section className="rounded-2xl border border-zinc-700/60 bg-zinc-900/40 p-4 ring-1 ring-white/5">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Primary actions</h2>
      <p className="mt-0.5 text-[11px] text-zinc-600">Illustrative — does not move funds.</p>
      <div className="mt-3">{inner}</div>
    </section>
  );
}

function ActivityList({ inset }: { inset: boolean }) {
  const d = mockRetailDashboard;
  const wrap = inset
    ? 'rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 ring-1 ring-black/20'
    : 'rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3';

  return (
    <div className={wrap}>
      <h2 className="text-xs font-medium text-zinc-400">{d.activitySectionTitle}</h2>
      <ul className="mt-3 space-y-3">
        {d.activity.map((row) => (
          <li key={row.title + row.subtitle} className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-3 last:border-0 last:pb-0">
            <div className="min-w-0">
              <div className="truncate text-sm text-zinc-200">{row.title}</div>
              <div className="text-xs text-zinc-500">{row.subtitle}</div>
            </div>
            <div className="shrink-0 text-right text-sm tabular-nums text-zinc-300">{row.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AllocationTrust() {
  const { allocation } = mockRetailDashboard;
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
      <h2 className="text-xs font-medium text-zinc-400">{allocation.title}</h2>
      <ul className="mt-3 space-y-2">
        {allocation.rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-300">{row.name}</span>
            <span className="tabular-nums text-zinc-500">{row.pct}%</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">{allocation.footnote}</p>
    </section>
  );
}

function DisclosureEntry({ variant }: { variant: VariantId }) {
  if (variant === 'b') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
        <button type="button" className="text-violet-300/90 underline-offset-4 hover:underline" disabled aria-disabled="true">
          How this works
        </button>
        <button type="button" className="text-zinc-400 underline-offset-4 hover:text-zinc-300 hover:underline" disabled aria-disabled="true">
          Protection details
        </button>
        <button type="button" className="text-zinc-400 underline-offset-4 hover:text-zinc-300 hover:underline" disabled aria-disabled="true">
          Allocation details
        </button>
      </div>
    );
  }
  return (
    <div className="text-center">
      <button type="button" className="text-sm text-violet-300/90 underline-offset-4 hover:underline" disabled aria-disabled="true">
        Learn more
      </button>
    </div>
  );
}

function ControlStack() {
  return (
    <div className="space-y-5">
      <PortfolioAndStability />
      <PrimaryActions grouped={false} />
      <ActivityList inset={false} />
      <AllocationTrust />
      <DisclosureEntry variant="control" />
    </div>
  );
}

function VariantAStack() {
  return (
    <div className="space-y-5">
      <PortfolioAndStability />
      <PrimaryActions grouped />
      <div className="relative border-t border-zinc-700/90 pt-8">
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-zinc-950 px-2 text-[10px] uppercase tracking-wider text-zinc-500">
          <span className="h-px w-8 bg-zinc-700" aria-hidden />
          Money state
          <span className="h-px w-8 bg-zinc-700" aria-hidden />
        </div>
        <ActivityList inset />
      </div>
      <AllocationTrust />
      <DisclosureEntry variant="a" />
    </div>
  );
}

function VariantBStack() {
  return (
    <div className="space-y-5">
      <PortfolioAndStability />
      <PrimaryActions grouped />
      <div className="relative border-t border-zinc-700/90 pt-8">
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-zinc-950 px-2 text-[10px] uppercase tracking-wider text-zinc-500">
          <span className="h-px w-8 bg-zinc-700" aria-hidden />
          Money state
          <span className="h-px w-8 bg-zinc-700" aria-hidden />
        </div>
        <ActivityList inset />
      </div>
      <AllocationTrust />
      <DisclosureEntry variant="b" />
    </div>
  );
}

export function RetailDashboardPrototype() {
  const [variant, setVariant] = useState<VariantId>('control');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-4 sm:px-5">
        <PrototypeBanner />

        <header className="mt-5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Prototype / retail dashboard</p>
          <h1 className="mt-1 text-lg font-semibold text-zinc-100">C3 exploration — three variants</h1>
        </header>

        <div
          className="mt-5 flex rounded-xl border border-zinc-700 bg-zinc-900/50 p-1"
          role="tablist"
          aria-label="Dashboard variant"
        >
          {VARIANT_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={variant === t.id}
              className={`flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium transition-colors sm:text-[13px] ${
                variant === t.id ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-white/10' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setVariant(t.id)}
            >
              <span className="sm:hidden">{t.short}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6" role="tabpanel">
          {variant === 'control' && <ControlStack />}
          {variant === 'a' && <VariantAStack />}
          {variant === 'b' && <VariantBStack />}
        </div>

        <ReviewCaption variant={variant} />

        <p className="mt-8 text-center text-[11px] text-zinc-600">
          Switch tabs to compare. This route is not linked from production navigation.
        </p>
      </div>
    </div>
  );
}
