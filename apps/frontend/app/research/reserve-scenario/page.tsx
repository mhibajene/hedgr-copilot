import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isSyntheticJourneyEnvironment } from '../../../lib/state/synthetic-journey';
import ReserveScenarioStimulus from './ReserveScenarioStimulus';

export const metadata: Metadata = {
  title: 'Daniel’s reserve · Hedgr research',
  robots: { index: false, follow: false },
};

type ReserveScenarioPageProps = {
  searchParams: Promise<{ v?: string | string[] }>;
};

export default async function ReserveScenarioPage({ searchParams }: ReserveScenarioPageProps) {
  if (!isSyntheticJourneyEnvironment()) notFound();
  const raw = (await searchParams).v;
  const variant = Array.isArray(raw) ? raw[0] : raw;
  if (variant !== '1' && variant !== '2') notFound();
  return <ReserveScenarioStimulus variant={variant} />;
}
