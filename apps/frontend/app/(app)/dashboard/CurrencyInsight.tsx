import { useRef, useState } from 'react';
import wallet from '../research-wallet.module.css';
import type { SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';
import { computeRateFigure, formatRateCents, ZMW_EXAMPLE_RATES } from '../../../lib/narrative/simulation-currency-insight';
import styles from './currency-insight.module.css';

type CurrencyInsightProps = {
  usdAmount: number;
  currency: SimulationDisplayCurrency;
  latestDisplayRate: number;
  ready: boolean;
  pending?: boolean;
  /** The frozen Home rate line already supplies the non-ZMW limit. */
  rateLineOnHome?: boolean;
};

export function CurrencyInsight({
  usdAmount, currency, latestDisplayRate, ready, pending = false, rateLineOnHome = false,
}: CurrencyInsightProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [stop, setStop] = useState(1);
  const [opened, setOpened] = useState(false);
  if (!ready) return null;
  const selectedRate = currency === 'ZMW' ? ZMW_EXAMPLE_RATES[stop] : latestDisplayRate;
  const result = computeRateFigure({ usdAmount, rate: selectedRate, pending });
  const validDisplayRate = Number.isFinite(latestDisplayRate) && latestDisplayRate > 0;
  if (result.kind !== 'figure' || !validDisplayRate) {
    return <section className={styles.context} aria-label="Currency context" data-testid="currency-insight">
      <p data-testid="currency-insight-headline">{result.kind === 'empty' ? 'No position to compare yet.' : 'Currency comparison unavailable.'}</p>
      {result.kind === 'unavailable' ? <p>{result.reason}</p> : !validDisplayRate ? <p>The latest example rate is unavailable.</p> : null}
    </section>;
  }
  const localFigure = `${currency} ${formatRateCents(result.cents)}`;
  return (
    <section className={styles.context} aria-label="Currency context" data-testid="currency-insight">
      <button ref={triggerRef} type="button" className={styles.launcher} aria-label="Currency context" aria-describedby="currency-context-description" aria-haspopup="dialog" onClick={() => {
        setStop(1);
        setOpened(true);
        dialogRef.current?.showModal();
      }}>
        <span>Currency context</span>
        <span id="currency-context-description" className={styles.launcherSubtitle}>Try example exchange rates</span>
      </button>
      <dialog ref={dialogRef} className={`${wallet.dialog} ${styles.dialog}`} aria-labelledby="currency-context-title" onClose={() => { setOpened(false); triggerRef.current?.focus(); }} onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, input, summary');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
        <div className={wallet.dialogStrip}>Simulation · No real money</div>
        <div className={wallet.page}>
          <div className={wallet.dialogHeader}>
            <button type="button" onClick={() => dialogRef.current?.close()}>Back to Home</button>
            <h2 id="currency-context-title">Currency context</h2>
          </div>
          {opened ? <>
          <div className={styles.card} data-testid="currency-rate-card">
            <p className={styles.usd}>${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className={styles.local} data-testid="currency-rate-figure" aria-live="polite" aria-atomic="true">≈ {localFigure}</p>
          </div>
          {currency === 'ZMW' ? <div className={styles.slider}>
            <label htmlFor="currency-example-rate">Try an example rate</label>
            <input id="currency-example-rate" type="range" min="0" max="2" step="1" value={stop} aria-valuetext={`Example rate ZMW ${selectedRate} per US dollar, about ${localFigure}`} onChange={event => setStop(Number(event.currentTarget.value))} />
            <div className={styles.stops}>{ZMW_EXAMPLE_RATES.map(rate => <span key={rate}>ZMW {rate}</span>)}</div>
            <p className={styles.limit}>Three example rates. Not a live rate and not a forecast.</p>
          </div> : !rateLineOnHome ? <p className={styles.limit}>Example rate: {currency} {latestDisplayRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} per US dollar. Not a live rate.</p> : null}
          <section className={styles.meaning}><h2>What this means</h2><p>The dollar amount is the same at each rate. The rate sets the local figure.</p></section>
          <details className={styles.calculation}><summary>How this is calculated</summary>
            <p>Your US dollar amount is multiplied by each example rate and rounded to two decimal places. Deposits, withdrawals, fees and spreads are not included. This is not your account history or live market data. No money moves.</p>
          </details>
          </> : null}
        </div>
      </dialog>
    </section>
  );
}
