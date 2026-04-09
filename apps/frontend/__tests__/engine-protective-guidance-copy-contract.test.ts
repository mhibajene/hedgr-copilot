import { describe, expect, test } from 'vitest';
import {
  ENGINE_PROTECTIVE_GUIDANCE_FRAMING,
  ENGINE_PROTECTIVE_GUIDANCE_POINTS,
  ENGINE_PROTECTIVE_GUIDANCE_TITLE,
} from '../lib/engine/protective-guidance-copy';
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from './engine-trust-framing-denylist';

const PROTECTIVE_GUIDANCE_COPY_SEGMENTS: readonly string[] = [
  ENGINE_PROTECTIVE_GUIDANCE_TITLE,
  ENGINE_PROTECTIVE_GUIDANCE_FRAMING,
  ...ENGINE_PROTECTIVE_GUIDANCE_POINTS,
];

describe('ENGINE_PROTECTIVE_GUIDANCE copy contract', () => {
  test.each(
    PROTECTIVE_GUIDANCE_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s has non-empty shipped copy', (_, text) => {
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test.each(
    PROTECTIVE_GUIDANCE_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s avoids execution, accounting, and hype framing drift', (_, text) => {
    const lower = text.toLowerCase();
    for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(lower).not.toContain(forbidden);
    }
    expect(lower).not.toMatch(/\bexecuted\b/);
    expect(lower).not.toMatch(/\bguaranteed\b/);
  });
});
