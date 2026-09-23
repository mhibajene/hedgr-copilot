import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isSyntheticJourneyEnvironment } from '../../../lib/state/synthetic-journey';
import ScenarioStimulus from './ScenarioStimulus';

export const metadata: Metadata = {
  title: 'Sarah’s course savings · Hedgr research',
  robots: { index: false, follow: false },
};

export default function StabilityScenariosPage() {
  if (!isSyntheticJourneyEnvironment()) notFound();
  return <ScenarioStimulus />;
}
