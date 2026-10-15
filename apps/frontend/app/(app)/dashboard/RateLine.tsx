import type { SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';

export function formatExampleRateLine(code: SimulationDisplayCurrency, rate: number): string {
  return `Example rate: ${code} ${rate.toLocaleString('en-US')} per US dollar. Not a live rate.`;
}

type RateLineProps = ({ text: string | undefined } | { code: SimulationDisplayCurrency; rate: number }) & { 'data-testid'?: string };

export function RateLine(props: RateLineProps) {
  return <p className="text-sm leading-relaxed text-hedgr-600" data-component="RateLine" data-testid={props['data-testid']}>{'text' in props ? props.text : formatExampleRateLine(props.code, props.rate)}</p>;
}
