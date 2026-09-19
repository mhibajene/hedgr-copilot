import { useRef } from 'react';
import wallet from '../research-wallet.module.css';
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
  redesigned?: boolean;
};

export function CurrencyInsight({
  usdAmount, currency, latestDisplayRate, ready, pending = false,
  example = makeCurrencyExample(latestDisplayRate), redesigned = false,
}: CurrencyInsightProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  if (!ready) return null;
  const result = compareCurrencyExample({ usdAmount, latestDisplayRate, example, pending });
  const comparison = result.kind === 'comparison' ? result : null;
  const headline = comparison
    ? comparison.direction === 'equal' ? 'No exchange-rate difference'
      : comparison.direction === 'rounded-zero' ? 'No difference at this display precision'
        : `${currency} ${formatComparisonCents(comparison.deltaCents, true)} ${comparison.direction} from the rate change`
    : result.kind === 'empty' ? 'No position to compare yet.' : 'Currency comparison unavailable.';

  if (redesigned) {
    const limit = 'FX comparison only—not earnings, purchasing power, guaranteed protection or a conversion quote.';
    return (
      <section className={`${wallet.context} ${styles.refined}`} aria-label="Currency context" data-testid="currency-insight">
        <p className={styles.period}>30-day example · Simulated</p>
        {comparison && (comparison.direction === 'higher' || comparison.direction === 'lower') ? <>
          <p className={styles.estimateLabel}>Change in {currency} estimate</p>
          <p className={styles.summary} data-testid="currency-insight-headline">
            <span className={styles.difference} data-testid="currency-insight-difference">{currency} {formatComparisonCents(comparison.deltaCents, true)}</span>{' '}
            <span className={styles.cause}><span className={styles.direction} aria-hidden="true" data-testid="currency-insight-direction" data-direction={comparison.direction} />{comparison.direction} from the rate change</span>
          </p>
        </> : <p className={wallet.headline} data-testid="currency-insight-headline">
          {comparison ? <span className={styles.direction} aria-hidden="true" data-testid="currency-insight-direction">—</span> : null}
          <span>{headline}</span>
        </p>}
        {comparison ? <>
          <p>Your USD amount is held constant in this comparison.</p>
          <button ref={triggerRef} type="button" className={wallet.link} aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()}>Understand the comparison</button>
          <p className={wallet.limit}>{limit}</p>
          <dialog ref={dialogRef} className={wallet.dialog} aria-labelledby="currency-context-title" onClose={() => triggerRef.current?.focus()} onKeyDown={event => {
            if (event.key !== 'Tab') return;
            const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, summary');
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}>
            <div className={wallet.dialogStrip}>Simulation · No real money</div>
            <div className={wallet.page}>
              <div className={wallet.dialogHeader}>
                <button type="button" onClick={() => dialogRef.current?.close()}>Back to Home</button>
                <h2 id="currency-context-title">Currency context</h2>
              </div>
              <p>30-day example · Simulated</p>
              <h3 className={wallet.dialogTitle}>Same USD amount.<br />{comparison.direction === 'equal' ? 'Same local estimate.' : comparison.direction === 'rounded-zero' ? 'Same estimate at this display precision.' : 'Different local estimate.'}</h3>
              <p>This example applies two exchange rates to the same ${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 20 })}.</p>
              <div className={wallet.comparison}>
                <dl>
                  <div className={wallet.comparisonRow}><dt>Day 0<span>1 USD = {comparison.earlierRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt><dd>{currency} {formatComparisonCents(comparison.earlierCents)}</dd></div>
                  <div className={wallet.comparisonRow}><dt>Day 30<span>1 USD = {comparison.latestRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt><dd>{currency} {formatComparisonCents(comparison.latestCents)}</dd></div>
                </dl>
                <p className={wallet.headline}>{headline}</p>
              </div>
              <section><h2>What this means</h2><p>{comparison.direction === 'equal' ? 'The exchange rates are equal in this comparison.' : 'Only the exchange rate changes in this comparison.'}</p></section>
              <section><h2>What this does not show</h2><p>{limit}</p></section>
              <p className={wallet.comparison}>Invented research example. Not your account history or live market data.</p>
              <details><summary>How this is calculated</summary>
                <p>Invented research fixture: scenario day 0 and scenario day 30. This is not your account history or live market data.</p>
                <p>The current USD {usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 20 })} is applied to both rates. It does not mean you held this amount for 30 days.</p>
                <p>Both estimates are rounded to two decimals; the difference uses those rounded amounts. Deposits, withdrawals, yield and asset-price changes are excluded, as are fees and spreads. No money has moved.</p>
              </details>
            </div>
          </dialog>
        </> : result.kind === 'unavailable' ? <p>{result.reason}</p> : null}
      </section>
    );
  }

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
