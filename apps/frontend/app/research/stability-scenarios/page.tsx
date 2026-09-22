import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isSyntheticJourneyEnvironment } from '../../../lib/state/synthetic-journey';
import ScenarioStimulus from './ScenarioStimulus';

export const metadata: Metadata = {
  title: 'Fictional stability examples · Hedgr research',
  robots: { index: false, follow: false },
};

export default function StabilityScenariosPage() {
  if (!isSyntheticJourneyEnvironment()) notFound();
  return <ScenarioStimulus />;
}
