import type { SarahRead } from '../../../lib/engine/sarah-read';
import { CLASS_A_VAL_002_SARAH_EXAMPLE, SYNTHETIC_JOURNEY_EXAMPLES } from '../../../lib/state/synthetic-journey';
import { formatExampleDate } from '../../../lib/utils/date';
import { HomeHero } from './HomeHero';
import { ExampleCard } from './ExampleCard';
import { ExampleLineChart } from './ExampleLineChart';
import { exampleBalanceSeries } from './lineLabels';
import { RateLine } from './RateLine';
import home from './synthetic-home.module.css';

/** §389: one independent fee observation, using the shared journey presentation. */
export function SarahExampleHome({ read }: { read: SarahRead }) {
  const example = SYNTHETIC_JOURNEY_EXAMPLES.find(item => item.id === CLASS_A_VAL_002_SARAH_EXAMPLE)!;
  const series = exampleBalanceSeries(example.deposits, read.asOf, example.holding);
  const events = example.deposits.map((deposit, index) => ({ id: `deposit-${index}`, at: Date.parse(deposit.at), kind: 'deposit' as const, amount: deposit.amount, currency: deposit.currency }));
  return (
    <section className={`${home.overview} ${home.exampleHome}`} aria-labelledby="dashboard-sarah-label" data-testid="dashboard-sarah-read">
      <div className={home.overviewGrid} data-testid="sarah-home-grid">
        <div className={home.positionPanel}>
          <HomeHero label={`Fictional example · ${example.name}`} labelId="dashboard-sarah-label" usdAmount={read.declaredFee.amount} figureTestId="sarah-read-figure" localTestId="sarah-read-caption" />
          <ExampleLineChart mode="step" series={series} events={events} example />
          <p className="text-sm leading-relaxed text-hedgr-600" data-testid="sarah-read-as-of">Example date: <time dateTime={read.asOf}>{formatExampleDate(read.asOf)}</time></p>
        </div>
        <div className={home.insights}>
          <div className={home.observation}>
            <ExampleCard title="Course fee" testId="sarah-fee-card" rate={<RateLine text={read.explanation.rateAssumption} />} limits={<p className="text-sm leading-relaxed text-hedgr-dark">{read.explanation.limits}</p>}>
              <p className="text-sm leading-relaxed text-hedgr-dark">Due <time dateTime={read.declaredFee.dueDate}>{formatExampleDate(`${read.declaredFee.dueDate}T00:00:00.000Z`)}</time>.</p>
            </ExampleCard>
          </div>
        </div>
      </div>
    </section>
  );
}
