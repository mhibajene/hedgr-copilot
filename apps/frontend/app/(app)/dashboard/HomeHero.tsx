import type { ReactNode } from 'react';
import { formatUsd } from '../../../lib/state/last-visit';
import { formatSimulationDisplayFigure, SIMULATION_DISPLAY_ESTIMATE_CAPTION, type SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';
import home from './synthetic-home.module.css';

type HomeHeroProps = {
  label: string;
  labelId: string;
  usdAmount: number;
  currency?: SimulationDisplayCurrency;
  ownSimulation?: boolean;
  figureTestId: string;
  localTestId?: string;
  testId?: string;
  selector?: ReactNode;
  loading?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
};

/** §389: journey-only presentation; the canonical formatter supplies magnitude. */
export function HomeHero({ label, labelId, usdAmount, currency = 'ZMW', ownSimulation = false, figureTestId, localTestId = 'local-balance', testId, selector, loading, isLoading, children }: HomeHeroProps) {
  const magnitude = formatUsd(usdAmount);
  // F5: retain the existing own-simulation sign without changing its numeric input.
  const figure = ownSimulation && usdAmount < 0 ? `$-${magnitude.slice(1)}` : magnitude;
  const Container = ownSimulation ? 'section' : 'div';
  return (
    <Container className={`space-y-1 ${home.position} ${home.journeyHero}`} aria-labelledby={ownSimulation ? labelId : undefined} data-testid={testId} data-component="HomeHero">
      <div className={home.balanceHeading}>
        <p id={labelId} className="text-xs font-semibold tracking-tight text-hedgr-800">{label}</p>
        {selector}
      </div>
      {loading ? (
        <div className={home.amount} data-testid="dashboard-balance-loading" aria-busy="true">
          <span className={`${home.skeleton} ${home.skeletonAmount}`} aria-hidden="true" />
          <span className={`${home.skeleton} ${home.skeletonLine}`} aria-hidden="true" />
        </div>
      ) : isLoading ? (
        <div className={`${home.amount} tabular-nums`}>…</div>
      ) : (
        <div className={`${home.amount} tabular-nums`}>
          <div data-component="UsdFigure" data-testid={ownSimulation ? undefined : figureTestId} aria-label={ownSimulation ? 'USD Balance amount' : undefined}>
            <span data-testid={ownSimulation ? figureTestId : undefined}>{figure}</span>
            <span className={home.usdSuffix} data-component="UsdSuffix"> USD</span>
          </div>
          <div className={home.localFigure} data-testid={localTestId} data-component="LocalFigure">
            <span data-testid="local-balance-figure">{formatSimulationDisplayFigure(usdAmount, currency)}</span>{' '}
            <span data-testid="local-balance-caption">{SIMULATION_DISPLAY_ESTIMATE_CAPTION}</span>
          </div>
        </div>
      )}
      {children}
    </Container>
  );
}
