export const FX_RATE_ZMW_PER_USD = 20;
export function zmwToUsd(amountZMW: number): number { return +(amountZMW / FX_RATE_ZMW_PER_USD).toFixed(2); }

