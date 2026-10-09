import {
  computeDanielRead,
  DANIEL_FIXTURE_RATE_ZMW_PER_USD,
  type DanielReadInput,
} from '../engine/daniel-read';

/**
 * §359 Daniel on Home — explicitly labelled fictional RUNTIME fixture (not a test golden).
 * One user-declared USD holding at the disclosed Engine fixture rate. The `asOf` is a fixed,
 * deterministic fictional observation basis, not current or freshness evidence. Nothing here
 * reads the ledger, clock, storage or display preference.
 */
export const DANIEL_HOME_FIXTURE_INPUT: Readonly<DanielReadInput> = Object.freeze({
  declaredHoldingUsd: 800,
  fixtureRateZmwPerUsd: DANIEL_FIXTURE_RATE_ZMW_PER_USD,
  asOf: '2026-10-09T00:00:00.000Z',
});

/** Computed once through the Engine; Home renders it verbatim. */
export const DANIEL_HOME_READ = computeDanielRead(DANIEL_HOME_FIXTURE_INPUT);
