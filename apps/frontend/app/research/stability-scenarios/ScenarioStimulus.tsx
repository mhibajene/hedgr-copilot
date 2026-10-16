'use client';

import {
  SARAH_SCENARIO,
  SARAH_OBSERVATION,
  formatScenarioAmount,
  formatScenarioDate,
  formatScenarioUsd,
} from '../../../lib/research/scenario-fixtures';
import { ResearchScenario } from '../ResearchChrome';

export default function ScenarioStimulus() {
  const [first, second] = SARAH_SCENARIO.deposits;
  return <ResearchScenario
    title={SARAH_SCENARIO.name}
    testId="stability-stimulus"
    factsTestId="sarah-facts"
    headline="Sarah has a postgraduate course fee to pay."
    situationDate={formatScenarioDate(SARAH_OBSERVATION.asOf)}
    depositsAndHolding={`She deposited ${formatScenarioAmount(first.amount)} on ${formatScenarioDate(first.at)} and ${formatScenarioAmount(second.amount)} on ${formatScenarioDate(second.at)}. She holds ${formatScenarioAmount(SARAH_SCENARIO.holding.amount)}.`}
    differingFact={<p data-testid="course-fee">Her course fee is {formatScenarioUsd(SARAH_OBSERVATION.declaredFee.amount)} USD, due on {formatScenarioDate(SARAH_OBSERVATION.declaredFee.dueDate)}.</p>}
    lockedLine="This read does not establish whether Sarah can pay the fee."
    whatIfHeading="What if the course provider took kwacha?"
    whatIfBody="Imagine the provider offered to take payment in kwacha. How much kwacha it would ask for depends on terms the provider sets. This example does not set them."
    whatIfClosing="Nothing else about Sarah changes in this scenario."
    hedgrHeading="What Hedgr helps Sarah see"
    hedgrBody="Sarah holds kwacha. Her fee is in US dollars. The number of kwacha it takes to pay a US dollar fee changes when the exchange rate changes."
    homeLink={{ href: '/dashboard-synthetic-journey?example=sarah', label: 'See Sarah’s example on Home' }}
    attribution="Hedgr wrote this example in advance, from the facts about Sarah on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money."
    nextLink={{ href: '/research/reserve-scenario?v=1', label: 'Next: Daniel’s reserve' }}
  />;
}
