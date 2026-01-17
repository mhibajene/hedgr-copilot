import { describe, it, expect } from 'vitest';
import { deriveRecommendation } from '../lib/server/copilotSignals';
import type {
  CopilotSignals,
  MarketSignal,
  YieldSignal,
  UserSignal,
  CopilotRecommendation,
} from '../lib/server/copilotSignals';

// ============================================================================
// Test Fixtures
// ============================================================================

const stableMarket: MarketSignal = {
  fxVolatilityLevel: 'low',
  marketStatus: 'normal',
};

const elevatedMarket: MarketSignal = {
  fxVolatilityLevel: 'elevated',
  marketStatus: 'normal',
};

const highVolatilityMarket: MarketSignal = {
  fxVolatilityLevel: 'high',
  marketStatus: 'normal',
};

const uncertainMarket: MarketSignal = {
  fxVolatilityLevel: 'low',
  marketStatus: 'uncertain',
};

const stableYield: YieldSignal = {
  yieldAvailability: 'normal',
  yieldRiskLevel: 'low',
};

const elevatedYield: YieldSignal = {
  yieldAvailability: 'normal',
  yieldRiskLevel: 'elevated',
};

const uncertainYield: YieldSignal = {
  yieldAvailability: 'uncertain',
  yieldRiskLevel: 'low',
};

const stableUser: UserSignal = {
  recentDeposit: false,
  liquiditySensitivity: 'low',
};

const recentDepositUser: UserSignal = {
  recentDeposit: true,
  liquiditySensitivity: 'low',
};

const highSensitivityUser: UserSignal = {
  recentDeposit: false,
  liquiditySensitivity: 'high',
};

// ============================================================================
// Tests
// ============================================================================

describe('copilotSignals', () => {
  describe('deriveRecommendation', () => {
    // ────────────────────────────────────────────────────────────────────────
    // Missing Signals → wait
    // ────────────────────────────────────────────────────────────────────────

    describe('missing signals → wait', () => {
      it('returns wait when market signal is missing', () => {
        const signals: CopilotSignals = {
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when yield signal is missing', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when user signal is missing', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when all signals are missing', () => {
        const signals: CopilotSignals = {};
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when only environment is provided', () => {
        const signals: CopilotSignals = {
          environment: { environment: 'prod' },
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Invalid Signal Fields → wait
    // ────────────────────────────────────────────────────────────────────────

    describe('invalid signal fields → wait', () => {
      it('returns wait when market.fxVolatilityLevel is invalid', () => {
        const signals: CopilotSignals = {
          market: { fxVolatilityLevel: 'invalid' as any, marketStatus: 'normal' },
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when market.marketStatus is invalid', () => {
        const signals: CopilotSignals = {
          market: { fxVolatilityLevel: 'low', marketStatus: 'invalid' as any },
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when yield.yieldAvailability is invalid', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: { yieldAvailability: 'invalid' as any, yieldRiskLevel: 'low' },
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when yield.yieldRiskLevel is invalid', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: { yieldAvailability: 'normal', yieldRiskLevel: 'invalid' as any },
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when user.recentDeposit is not a boolean', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: { recentDeposit: 'yes' as any, liquiditySensitivity: 'low' },
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when user.liquiditySensitivity is invalid', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: { recentDeposit: false, liquiditySensitivity: 'invalid' as any },
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when market signal fields are undefined', () => {
        const signals: CopilotSignals = {
          market: { fxVolatilityLevel: undefined as any, marketStatus: undefined as any },
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Unsafe Conditions → wait
    // ────────────────────────────────────────────────────────────────────────

    describe('unsafe conditions → wait', () => {
      it('returns wait when fxVolatilityLevel is high', () => {
        const signals: CopilotSignals = {
          market: highVolatilityMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when marketStatus is uncertain', () => {
        const signals: CopilotSignals = {
          market: uncertainMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when yieldAvailability is uncertain', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: uncertainYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when liquiditySensitivity is high', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: highSensitivityUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when multiple unsafe conditions are present', () => {
        const signals: CopilotSignals = {
          market: { fxVolatilityLevel: 'high', marketStatus: 'uncertain' },
          yield: uncertainYield,
          user: highSensitivityUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Conflicting Signals → wait
    // ────────────────────────────────────────────────────────────────────────

    describe('conflicting signals → wait', () => {
      it('returns wait when marketStatus is normal but yieldAvailability is uncertain', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: uncertainYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when market is stable but user has high liquidity sensitivity', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: highSensitivityUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Stable Conditions → proceed
    // ────────────────────────────────────────────────────────────────────────

    describe('stable conditions → proceed', () => {
      it('returns proceed when all conditions are stable (low sensitivity)', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('returns proceed when all conditions are stable (medium sensitivity)', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: { recentDeposit: false, liquiditySensitivity: 'medium' },
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('returns proceed when all conditions are stable with recent deposit', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: { recentDeposit: true, liquiditySensitivity: 'low' },
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('returns proceed regardless of environment signal', () => {
        const signals: CopilotSignals = {
          environment: { environment: 'dev' },
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Cautious Conditions → proceed_cautiously
    // ────────────────────────────────────────────────────────────────────────

    describe('cautious conditions → proceed_cautiously', () => {
      it('returns proceed_cautiously when elevated volatility + elevated yield risk + recent deposit', () => {
        const signals: CopilotSignals = {
          market: elevatedMarket,
          yield: elevatedYield,
          user: recentDepositUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed_cautiously');
      });

      it('returns proceed_cautiously with medium liquidity sensitivity', () => {
        const signals: CopilotSignals = {
          market: elevatedMarket,
          yield: elevatedYield,
          user: { recentDeposit: true, liquiditySensitivity: 'medium' },
        };
        expect(deriveRecommendation(signals)).toBe('proceed_cautiously');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Fallback → wait
    // ────────────────────────────────────────────────────────────────────────

    describe('fallback → wait', () => {
      it('returns wait when conditions do not match stable or cautious (elevated volatility, no recent deposit)', () => {
        const signals: CopilotSignals = {
          market: elevatedMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when elevated volatility but low yield risk', () => {
        const signals: CopilotSignals = {
          market: elevatedMarket,
          yield: stableYield,
          user: recentDepositUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when elevated yield risk but low volatility', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: elevatedYield,
          user: recentDepositUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });

      it('returns wait when reduced yield availability with elevated volatility (no cautious match)', () => {
        // "reduced" is not unsafe, but elevated volatility + reduced availability
        // doesn't match cautious (needs elevated yield risk) or stable (needs low volatility)
        const signals: CopilotSignals = {
          market: elevatedMarket,
          yield: { yieldAvailability: 'reduced', yieldRiskLevel: 'low' },
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('wait');
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Determinism
    // ────────────────────────────────────────────────────────────────────────

    describe('determinism', () => {
      it('generates identical output for same inputs', () => {
        const signals: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        const result1 = deriveRecommendation(signals);
        const result2 = deriveRecommendation(signals);
        expect(result1).toBe(result2);
      });

      it('generates identical output for equivalent objects', () => {
        const signals1: CopilotSignals = {
          market: { fxVolatilityLevel: 'low', marketStatus: 'normal' },
          yield: { yieldAvailability: 'normal', yieldRiskLevel: 'low' },
          user: { recentDeposit: false, liquiditySensitivity: 'low' },
        };
        const signals2: CopilotSignals = {
          market: { fxVolatilityLevel: 'low', marketStatus: 'normal' },
          yield: { yieldAvailability: 'normal', yieldRiskLevel: 'low' },
          user: { recentDeposit: false, liquiditySensitivity: 'low' },
        };
        expect(deriveRecommendation(signals1)).toBe(deriveRecommendation(signals2));
      });

      it('is consistent across multiple calls', () => {
        const testCases: Array<{ signals: CopilotSignals; expected: CopilotRecommendation }> = [
          { signals: {}, expected: 'wait' },
          { signals: { market: stableMarket, yield: stableYield, user: stableUser }, expected: 'proceed' },
          { signals: { market: elevatedMarket, yield: elevatedYield, user: recentDepositUser }, expected: 'proceed_cautiously' },
          { signals: { market: highVolatilityMarket, yield: stableYield, user: stableUser }, expected: 'wait' },
        ];

        for (const { signals, expected } of testCases) {
          for (let i = 0; i < 10; i++) {
            expect(deriveRecommendation(signals)).toBe(expected);
          }
        }
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Environment Signal Exclusion
    // ────────────────────────────────────────────────────────────────────────

    describe('environment signal exclusion', () => {
      it('does not affect recommendation in dev environment', () => {
        const signals: CopilotSignals = {
          environment: { environment: 'dev' },
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('does not affect recommendation in stg environment', () => {
        const signals: CopilotSignals = {
          environment: { environment: 'stg' },
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('does not affect recommendation in prod environment', () => {
        const signals: CopilotSignals = {
          environment: { environment: 'prod' },
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(signals)).toBe('proceed');
      });

      it('produces same result with or without environment signal', () => {
        const withEnv: CopilotSignals = {
          environment: { environment: 'prod' },
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        const withoutEnv: CopilotSignals = {
          market: stableMarket,
          yield: stableYield,
          user: stableUser,
        };
        expect(deriveRecommendation(withEnv)).toBe(deriveRecommendation(withoutEnv));
      });
    });

    // ────────────────────────────────────────────────────────────────────────
    // Return Type Validation
    // ────────────────────────────────────────────────────────────────────────

    describe('return type validation', () => {
      it('always returns a valid CopilotRecommendation', () => {
        const validRecommendations = ['proceed', 'proceed_cautiously', 'wait'];
        const testCases: CopilotSignals[] = [
          {},
          { market: stableMarket },
          { market: stableMarket, yield: stableYield },
          { market: stableMarket, yield: stableYield, user: stableUser },
          { market: highVolatilityMarket, yield: stableYield, user: stableUser },
          { market: elevatedMarket, yield: elevatedYield, user: recentDepositUser },
        ];

        for (const signals of testCases) {
          const result = deriveRecommendation(signals);
          expect(validRecommendations).toContain(result);
        }
      });

      it('never throws regardless of input', () => {
        const edgeCases = [
          {},
          { market: null as any },
          { market: undefined },
          { market: {} as any },
          { market: stableMarket, yield: null as any, user: stableUser },
          { market: stableMarket, yield: stableYield, user: { recentDeposit: null as any, liquiditySensitivity: 'low' } },
        ];

        for (const signals of edgeCases) {
          expect(() => deriveRecommendation(signals)).not.toThrow();
        }
      });
    });
  });
});
