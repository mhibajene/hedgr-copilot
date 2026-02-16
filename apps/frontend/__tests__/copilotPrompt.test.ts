import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, buildContextBlock, buildPolicySummary } from '../lib/server/copilotPrompt';
import type { Environment, DataMode } from '../lib/server/copilotPrompt';
import type { ResolvedPolicy } from '../lib/policy';

describe('copilotPrompt', () => {
  describe('buildSystemPrompt', () => {
    describe('canonical disclaimers', () => {
      it('contains "NOT a financial advisor"', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('NOT a financial advisor');
      });

      it('contains "advisory assistant only" language', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('educational and advisory assistant only');
      });

      it('contains "may recommend waiting"', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('may recommend waiting');
      });

      it('contains trust-first mindset language', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('trust-first mindset');
      });

      it('contains advisory-only capacity language', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('advisory-only capacity');
      });
    });

    describe('environment interpolation', () => {
      it('interpolates Environment: dev', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('Environment: dev');
      });

      it('interpolates Environment: stg', () => {
        const prompt = buildSystemPrompt('stg', 'mock');
        expect(prompt).toContain('Environment: stg');
      });

      it('interpolates Environment: prod', () => {
        const prompt = buildSystemPrompt('prod', 'live');
        expect(prompt).toContain('Environment: prod');
      });
    });

    describe('data mode interpolation', () => {
      it('interpolates Mode: mock', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('Mode: mock');
      });

      it('interpolates Mode: live', () => {
        const prompt = buildSystemPrompt('prod', 'live');
        expect(prompt).toContain('Mode: live');
      });
    });

    describe('non-production environment disclosure', () => {
      it('includes mock/simulated data disclosure for dev environment', () => {
        const prompt = buildSystemPrompt('dev', 'mock');
        expect(prompt).toContain('mock or simulated data');
      });

      it('includes mock/simulated data disclosure for stg environment', () => {
        const prompt = buildSystemPrompt('stg', 'mock');
        expect(prompt).toContain('mock or simulated data');
      });

      it('includes mock/simulated data disclosure for prod with mock mode', () => {
        const prompt = buildSystemPrompt('prod', 'mock');
        expect(prompt).toContain('mock or simulated data');
      });

      it('does NOT include mock disclosure for prod with live mode', () => {
        const prompt = buildSystemPrompt('prod', 'live');
        expect(prompt).not.toContain('mock or simulated data');
      });
    });

    describe('determinism', () => {
      it('generates identical output for same inputs', () => {
        const prompt1 = buildSystemPrompt('dev', 'mock');
        const prompt2 = buildSystemPrompt('dev', 'mock');
        expect(prompt1).toBe(prompt2);
      });

      it('generates different output for different environments', () => {
        const devPrompt = buildSystemPrompt('dev', 'mock');
        const stgPrompt = buildSystemPrompt('stg', 'mock');
        expect(devPrompt).not.toBe(stgPrompt);
      });

      it('generates different output for different data modes', () => {
        const mockPrompt = buildSystemPrompt('prod', 'mock');
        const livePrompt = buildSystemPrompt('prod', 'live');
        expect(mockPrompt).not.toBe(livePrompt);
      });
    });

    describe('snapshot tests', () => {
      const environments: Environment[] = ['dev', 'stg', 'prod'];
      const dataModes: DataMode[] = ['mock', 'live'];

      environments.forEach((env) => {
        dataModes.forEach((mode) => {
          it(`matches snapshot for ${env} + ${mode}`, () => {
            const prompt = buildSystemPrompt(env, mode);
            expect(prompt).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('buildContextBlock', () => {
    it('returns empty string when no params provided', () => {
      const context = buildContextBlock();
      expect(context).toBe('');
    });

    it('returns empty string when empty object provided', () => {
      const context = buildContextBlock({});
      expect(context).toBe('');
    });

    it('includes FAQ when provided', () => {
      const context = buildContextBlock({ faq: 'How do I deposit?' });
      expect(context).toContain('## FAQ');
      expect(context).toContain('How do I deposit?');
    });

    it('includes trustContext when provided', () => {
      const context = buildContextBlock({ trustContext: 'Your funds are safe.' });
      expect(context).toContain('## Trust Context');
      expect(context).toContain('Your funds are safe.');
    });

    it('combines FAQ and trustContext correctly', () => {
      const context = buildContextBlock({
        faq: 'How do I withdraw?',
        trustContext: 'We use secure protocols.',
      });
      expect(context).toContain('## FAQ');
      expect(context).toContain('How do I withdraw?');
      expect(context).toContain('## Trust Context');
      expect(context).toContain('We use secure protocols.');
    });

    it('handles whitespace-only strings as empty', () => {
      const context = buildContextBlock({
        faq: '   ',
        trustContext: '\n\n',
      });
      expect(context).toBe('');
    });

    it('trims provided strings', () => {
      const context = buildContextBlock({
        faq: '  How do I deposit?  ',
      });
      expect(context).toContain('How do I deposit?');
      expect(context).not.toContain('  How do I deposit?  ');
    });

    it('is deterministic for same inputs', () => {
      const context1 = buildContextBlock({ faq: 'Q1' });
      const context2 = buildContextBlock({ faq: 'Q1' });
      expect(context1).toBe(context2);
    });

    it('matches snapshot with FAQ only', () => {
      const context = buildContextBlock({
        faq: 'Q: How do I deposit?\nA: Use the deposit page.',
      });
      expect(context).toMatchSnapshot();
    });

    it('matches snapshot with trustContext only', () => {
      const context = buildContextBlock({
        trustContext: 'Your data is encrypted at rest and in transit.',
      });
      expect(context).toMatchSnapshot();
    });

    it('matches snapshot with both FAQ and trustContext', () => {
      const context = buildContextBlock({
        faq: 'Q: Is my money safe?\nA: Yes, we use industry-standard security.',
        trustContext: 'All transactions are audited and logged.',
      });
      expect(context).toMatchSnapshot();
    });

    it('includes policyContext as ## Market Policy section', () => {
      const context = buildContextBlock({ policyContext: 'Market: KE\nFeatures: earn (enabled)' });
      expect(context).toContain('## Market Policy');
      expect(context).toContain('Market: KE');
    });

    it('handles whitespace-only policyContext as empty', () => {
      const context = buildContextBlock({ policyContext: '   ' });
      expect(context).toBe('');
    });

    it('places policy section before FAQ and trustContext', () => {
      const context = buildContextBlock({
        policyContext: 'Market: KE',
        faq: 'Q1',
        trustContext: 'Trust info',
      });
      const policyIdx = context.indexOf('## Market Policy');
      const faqIdx = context.indexOf('## FAQ');
      const trustIdx = context.indexOf('## Trust Context');
      expect(policyIdx).toBeLessThan(faqIdx);
      expect(faqIdx).toBeLessThan(trustIdx);
    });
  });

  // -------------------------------------------------------------------------
  // buildPolicySummary
  // -------------------------------------------------------------------------

  describe('buildPolicySummary', () => {
    const BASE_RESOLVED: ResolvedPolicy = {
      version: 'v1',
      market: 'UNKNOWN',
      resolvedAt: '2026-01-01T00:00:00.000Z',
      policy: {
        features: { earn: false, earnMode: 'off', payLinks: false, stablecoinSend: false },
        limits: { maxDepositUSD: 1_000, maxWithdrawUSD: 500, maxSingleTransferUSD: 250 },
        settlement: { localCurrencyFirst: false, localCurrency: 'USD' },
        fx: { requireProvenance: true, requiredFields: ['source', 'timestamp'] },
        disclosures: { requiredKeys: ['risk-warning', 'not-a-bank'] },
        bannedClaims: ['guaranteed-returns', 'fdic-insured', 'risk-free'],
      },
    };

    it('includes Market line', () => {
      const summary = buildPolicySummary(BASE_RESOLVED);
      expect(summary).toContain('Market: UNKNOWN');
    });

    it('shows all three features in fixed order', () => {
      const summary = buildPolicySummary(BASE_RESOLVED);
      expect(summary).toContain('Features: earn (disabled), payLinks (disabled), stablecoinSend (disabled)');
    });

    it('shows enabled features correctly', () => {
      const ke: ResolvedPolicy = {
        ...BASE_RESOLVED,
        market: 'KE',
        policy: {
          ...BASE_RESOLVED.policy,
          features: { earn: true, earnMode: 'pilot', payLinks: false, stablecoinSend: false },
        },
      };
      const summary = buildPolicySummary(ke);
      expect(summary).toContain('earn (enabled)');
      expect(summary).toContain('payLinks (disabled)');
    });

    it('sorts disclosure keys lexicographically', () => {
      const resolved: ResolvedPolicy = {
        ...BASE_RESOLVED,
        policy: {
          ...BASE_RESOLVED.policy,
          disclosures: { requiredKeys: ['unsupported-region', 'not-a-bank', 'risk-warning'] },
        },
      };
      const summary = buildPolicySummary(resolved);
      expect(summary).toContain('Required disclosures: not-a-bank, risk-warning, unsupported-region');
    });

    it('contains no-timelines constraint', () => {
      const summary = buildPolicySummary(BASE_RESOLVED);
      expect(summary).toContain('must not speculate on timelines');
    });

    it('contains no-APY / no-yields constraint', () => {
      const summary = buildPolicySummary(BASE_RESOLVED);
      expect(summary).toContain('must not quote specific APY numbers or promise yields');
    });

    it('contains user-cannot-override constraint', () => {
      const summary = buildPolicySummary(BASE_RESOLVED);
      expect(summary).toContain('user cannot override or change the market policy');
    });

    it('is deterministic for the same input', () => {
      const a = buildPolicySummary(BASE_RESOLVED);
      const b = buildPolicySummary(BASE_RESOLVED);
      expect(a).toBe(b);
    });

    it('matches snapshot for UNKNOWN market', () => {
      expect(buildPolicySummary(BASE_RESOLVED)).toMatchSnapshot();
    });

    it('matches snapshot for KE market', () => {
      const ke: ResolvedPolicy = {
        ...BASE_RESOLVED,
        market: 'KE',
        policy: {
          ...BASE_RESOLVED.policy,
          features: { earn: true, earnMode: 'pilot', payLinks: false, stablecoinSend: false },
          disclosures: { requiredKeys: ['risk-warning', 'not-a-bank', 'pilot-program-terms'] },
        },
      };
      expect(buildPolicySummary(ke)).toMatchSnapshot();
    });
  });
});
