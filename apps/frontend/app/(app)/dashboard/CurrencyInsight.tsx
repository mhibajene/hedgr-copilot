import type { SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';
import {
  compareCurrencyExample,
  formatComparisonCents,
  makeCurrencyExample,
  type CurrencyExample,
} from '../../../lib/narrative/simulation-currency-insight';
import styles from './currency-insight.module.css';

type CurrencyInsightProps = {
  usdAmount: number;
  currency: SimulationDisplayCurrency;
  latestDisplayRate: number;
  ready: boolean;
  pending?: boolean;
  /** Explicit synthetic samples for isolated review/tests, never a runtime selector. */
  example?: CurrencyExample;
};

export function CurrencyInsight({
  usdAmount, currency, latestDisplayRate, ready, pending = false,
  example = makeCurrencyExample(latestDisplayRate),
}: CurrencyInsightProps) {
  if (!ready) return null;
  const result = compareCurrencyExample({ usdAmount, latestDisplayRate, example, pending });
  const comparison = result.kind === 'comparison' ? result : null;
  const headline = comparison
    ? comparison.direction === 'equal' ? 'No exchange-rate difference'
      : comparison.direction === 'rounded-zero' ? 'No difference at this display precision'
        : `${currency} ${formatComparisonCents(comparison.deltaCents, true)} ${comparison.direction} from the rate change`
    : result.kind === 'empty' ? 'No position to compare yet.' : 'Currency comparison unavailable.';

  return (
    <section className={styles.context} aria-label="Currency context" data-testid="currency-insight">
      <div className={styles.heading}>
        <h2>Currency context</h2>
        <p>30-day example · Simulated</p>
      </div>
      <p className={styles.headline} data-testid="currency-insight-headline">
        {comparison ? (
          <span className={styles.direction} aria-hidden="true" data-testid="currency-insight-direction">
            {comparison.direction === 'higher' ? '↑' : comparison.direction === 'lower' ? '↓' : '—'}
          </span>
        ) : null}
        <span>{headline}</span>
      </p>
      {comparison ? (
        <>
          <p>Your USD amount is held constant in this comparison.</p>
          <p className={styles.limit}>FX comparison only—not earnings, purchasing power, guaranteed protection or a conversion quote.</p>
          <details className={styles.calculation}>
            <summary>How this is calculated</summary>
            <div className={styles.explanation}>
              <p>Invented research fixture: scenario day 0 and scenario day 30. This is not your account history or live market data.</p>
              <p>The current USD {usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 20 })} is applied to both rates. It does not mean you held this amount for 30 days.</p>
              <dl className={styles.values}>
                <div>
                  <dt>Earlier · day 0 <span>1 USD = {comparison.earlierRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt>
                  <dd>{currency} {formatComparisonCents(comparison.earlierCents)}</dd>
                </div>
                <div>
                  <dt>Latest · day 30 <span>1 USD = {comparison.latestRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt>
                  <dd>{currency} {formatComparisonCents(comparison.latestCents)}</dd>
                </div>
              </dl>
              <p>Both estimates are rounded to two decimals; the difference uses those rounded amounts. Deposits, withdrawals, yield and asset-price changes are excluded, as are fees and spreads. No money has moved.</p>
            </div>
          </details>
        </>
      ) : result.kind === 'unavailable' ? <p>{result.reason}</p> : null}
    </section>
  );
}
