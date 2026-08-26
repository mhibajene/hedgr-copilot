'use client';

import React from 'react';
import { usePolicy } from '../lib/policy/usePolicy';

// ---------------------------------------------------------------------------
// Disclosure keys & copy — single source of truth
// ---------------------------------------------------------------------------

export type DisclosureKey =
  | 'risk-warning'
  | 'not-a-bank'
  | 'pilot-program-terms'
  | 'unsupported-region';

export type DisclosureContext = 'default' | 'synthetic-research';

/**
 * Human-readable copy for each disclosure key.
 * Tone: factual, plain-language, no hype, no numbers.
 */
export const DISCLOSURE_COPY: Record<DisclosureKey, string> = {
  'risk-warning':
    'Digital assets carry risk and may lose value. You should only deposit what you can afford to lose.',
  'not-a-bank':
    'Hedgr is not a bank. Deposits are not insured by any government agency.',
  'pilot-program-terms':
    'This feature is part of a limited pilot. Terms may change.',
  'unsupported-region':
    'Your region is not fully supported. Some features may be restricted.',
};

export const SYNTHETIC_RESEARCH_DISCLOSURE_COPY: Record<DisclosureKey, string> = {
  'risk-warning':
    'This research walkthrough creates no real financial exposure. It does not hold assets, accept real deposits, or move money.',
  'not-a-bank':
    'This research prototype is not a bank account and does not accept deposits. No real money is held or moved.',
  'pilot-program-terms':
    'This research walkthrough may change as the prototype is revised.',
  'unsupported-region':
    'This research prototype is not a live service in the selected country. The country control changes simulated currency display only.',
};

/**
 * Display priority — lower index = shown first.
 * Keys not listed here are appended after the prioritised ones.
 */
const DISCLOSURE_PRIORITY: readonly DisclosureKey[] = [
  'unsupported-region',
  'risk-warning',
  'not-a-bank',
  'pilot-program-terms',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isKnownKey(key: string): key is DisclosureKey {
  return key in DISCLOSURE_COPY;
}

function sortByPriority(keys: DisclosureKey[]): DisclosureKey[] {
  const prioritySet = new Set<DisclosureKey>(DISCLOSURE_PRIORITY);
  const prioritised: DisclosureKey[] = [];
  const rest: DisclosureKey[] = [];

  for (const k of DISCLOSURE_PRIORITY) {
    if (keys.includes(k)) prioritised.push(k);
  }
  for (const k of keys) {
    if (!prioritySet.has(k)) rest.push(k);
  }

  return [...prioritised, ...rest];
}

// ---------------------------------------------------------------------------
// Presenter (pure — no hooks)
// ---------------------------------------------------------------------------

function DisclosureList({
  keys,
  testId,
  context,
}: {
  keys: string[];
  testId: string;
  context: DisclosureContext;
}) {
  if (keys.length === 0) return null;

  const knownKeys: DisclosureKey[] = [];
  for (const key of keys) {
    if (isKnownKey(key)) {
      knownKeys.push(key);
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn(`[PolicyDisclosure] Unknown disclosure key skipped: "${key}"`);
    }
  }

  if (knownKeys.length === 0) return null;

  const ordered = sortByPriority(knownKeys);
  const copy =
    context === 'synthetic-research'
      ? SYNTHETIC_RESEARCH_DISCLOSURE_COPY
      : DISCLOSURE_COPY;

  return (
    <section data-testid={testId} aria-labelledby="policy-disclosures-heading">
      <h2 id="policy-disclosures-heading" className="sr-only">
        Important disclosures
      </h2>
      <ul
        className={`list-inside list-disc space-y-2 leading-relaxed text-gray-500 ${
          context === 'synthetic-research' ? 'text-sm' : 'text-xs'
        }`}
      >
        {ordered.map((key) => (
          <li key={key} data-disclosure-key={key}>
            {copy[key]}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Hook-backed variant (calls usePolicy)
// ---------------------------------------------------------------------------

function PolicyDisclosureFromHook({
  testId,
  context,
}: {
  testId: string;
  context: DisclosureContext;
}) {
  const { status, policy } = usePolicy();

  if (status !== 'ready' || !policy) return null;

  return (
    <DisclosureList
      keys={policy.disclosures.requiredKeys}
      testId={testId}
      context={context}
    />
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export type PolicyDisclosureProps = {
  /** Override keys instead of reading from usePolicy(). */
  keys?: string[];
  /** Select copy that matches the participant context without changing policy keys. */
  context?: DisclosureContext;
  'data-testid'?: string;
};

/**
 * Renders policy-required disclosure statements.
 *
 * When a `keys` prop is supplied the component is a pure presenter and
 * does **not** call `usePolicy()`, making it safe for use outside a
 * policy context.
 */
export function PolicyDisclosure({
  keys,
  context = 'default',
  'data-testid': testId = 'policy-disclosures',
}: PolicyDisclosureProps) {
  if (keys !== undefined) {
    return <DisclosureList keys={keys} testId={testId} context={context} />;
  }
  return <PolicyDisclosureFromHook testId={testId} context={context} />;
}

export default PolicyDisclosure;
