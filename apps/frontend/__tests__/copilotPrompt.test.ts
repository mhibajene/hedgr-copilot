import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, buildContextBlock } from '../lib/server/copilotPrompt';
import type { Environment, DataMode } from '../lib/server/copilotPrompt';

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
  });
});
