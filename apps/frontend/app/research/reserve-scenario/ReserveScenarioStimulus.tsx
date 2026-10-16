'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DANIEL_SCENARIO,
  DANIEL_OBSERVATION,
  DANIEL_READINGS,
  formatScenarioDate,
  formatScenarioUsd,
} from '../../../lib/research/scenario-fixtures';
import { ResearchScenario, type ResearchStage } from '../ResearchChrome';

type Variant = '1' | '2';

// Both admitted variants deliberately render the same registry-aligned page (§398).
export default function ReserveScenarioStimulus({ variant }: { variant: Variant }) {
  void variant; // Route admission is validated by page.tsx; presentation is identical.
  const [stage, setStage] = useState<ResearchStage>('situation');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (stage === 'situation') return;
    stageHeading.current?.focus({ preventScroll: true });
    stageHeading.current?.closest('main')?.scrollIntoView({ block: 'start' });
  }, [stage]);
  const [first, second] = DANIEL_SCENARIO.deposits;
  return <ResearchScenario
    stage={stage}
    onStageChange={setStage}
    stageHeading={stageHeading}
    title={DANIEL_SCENARIO.name}
    testId="reserve-stimulus"
    factsTestId="daniel-facts"
    headline="Daniel keeps a reserve in US dollars."
    situationDate={formatScenarioDate(DANIEL_OBSERVATION.asOf)}
    depositsAndHolding={`He deposited ${formatScenarioUsd(first.amount, true)} on ${formatScenarioDate(first.at)} and ${formatScenarioUsd(second.amount, true)} on ${formatScenarioDate(second.at)}. He holds ${formatScenarioUsd(DANIEL_OBSERVATION.declaredHolding.amount)}.`}
    differingFact={<>
      <p>In kwacha, his reserve showed as:</p>
      <ul className="mt-3 space-y-2">{DANIEL_READINGS.map(reading => <li key={reading}>{reading}</li>)}</ul>
      <p className="mt-3 text-sm text-hedgr-700">Example figure, not a quote</p>
    </>}
    lockedLine="He made two deposits and none since. Each kwacha figure uses the example rate for its date."
    whatIfHeading="What if Daniel needed kwacha?"
    whatIfBody="Imagine Daniel needed kwacha from his reserve. What he would receive depends on how he takes it out, any costs and the rate on that day. This example does not set them."
    whatIfClosing="Nothing else about Daniel changes in this scenario."
    hedgrHeading="What Hedgr helps Daniel see"
    hedgrBody="Daniel’s reserve is counted in US dollars. Its kwacha figure changes when the exchange rate changes."
    homeLink={{ href: '/dashboard-synthetic-journey?example=daniel', label: 'See Daniel’s example on Home' }}
    attribution="Hedgr wrote this example in advance, from the facts about Daniel on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money."
  />;
}
