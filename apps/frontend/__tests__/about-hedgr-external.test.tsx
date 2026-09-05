// @vitest-environment jsdom
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import Page, { generateMetadata } from '../app/about-hedgr-review/page';

vi.mock('next/image', () => ({ default: ({ src, alt, width, height }: Record<string, unknown>) => React.createElement('img', { src, alt, width, height }) }));

const brief = readFileSync(resolve(__dirname, '../../../docs/ops/about-external/ABOUT_HEDGR_V03_BRIEF.md'), 'utf8');
const pageCopy = brief.slice(brief.indexOf('## 01.'), brief.indexOf('\n---', brief.indexOf('## 01.')));
const normalize = (text: string) => text.replace(/^#{2,3} /gm, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const approvedBlocks = pageCopy.trim().split(/\n\s*\n/).map(normalize);

describe('D-125 external About frozen narrative and publication contract', () => {
  beforeEach(() => { vi.stubEnv('NODE_ENV', 'development'); vi.stubEnv('VERCEL', ''); });
  afterEach(() => vi.unstubAllEnvs());

  test('renders every approved block in order, preserving all emphasis and eight sections', () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<Page />), 'text/html');
    expect([...document.querySelectorAll('main h2, main h3, main p')].map(el => normalize(el.textContent ?? ''))).toEqual(approvedBlocks);
    expect(document.querySelectorAll('main section')).toHaveLength(8);
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect([...document.querySelectorAll('strong')].map(el => el.textContent)).toEqual([...pageCopy.matchAll(/\*\*(.*?)\*\*/g)].map(match => match[1]));
    expect(document.querySelector('main')?.textContent).not.toMatch(/—|What we are still learning/);
    expect(document.querySelector('form, button, input, details, script')).toBeNull();
    expect([...document.querySelectorAll('a')].map(el => el.getAttribute('href'))).toEqual(['#about-hedgr']);
  });

  test('metadata retains the early current-capability limitation without stronger claims', () => {
    const description = 'Today, Hedgr is in research and product testing. The experience uses simulated information and does not hold or move real customer money.';
    expect(generateMetadata()).toEqual({
      title: 'About Hedgr', description, robots: { index: false, follow: false },
      openGraph: { title: 'About Hedgr', description, type: 'website' },
      twitter: { card: 'summary', title: 'About Hedgr', description },
    });
  });

  test.each(['production', 'test', ''])('publishes accepted page and metadata when NODE_ENV=%s', mode => {
    vi.stubEnv('NODE_ENV', mode);
    expect(renderToStaticMarkup(<Page />)).toContain('Build financial stability when your currency is unpredictable.');
    expect(generateMetadata().robots).toEqual({ index: false, follow: false });
  });

  test('publishes in hosted Vercel production environments', () => {
    vi.stubEnv('VERCEL', '1');
    vi.stubEnv('NODE_ENV', 'production');
    expect(renderToStaticMarkup(<Page />)).toContain('Build financial stability when your currency is unpredictable.');
    expect(generateMetadata().robots).toEqual({ index: false, follow: false });
  });
});
