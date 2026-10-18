// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as journey from '../lib/state/synthetic-journey';
import { isSyntheticJourneyPrimaryCondition } from '../lib/state/synthetic-journey';
(globalThis as typeof globalThis & { React: typeof React }).React = React;
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
// Render the actual client module with boundary leaves stubbed; production aliases stay unchanged.
function AppLayoutClient(props: { children: React.ReactNode }) {
  const source = readFileSync(resolve(__dirname, '../app/(app)/layout.client.tsx'), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const exports: { AppLayoutClient?: React.ComponentType<{ children: React.ReactNode }> } = {};
  runInNewContext(js, { React, exports, require: (name: string) => {
    if (name === 'react') return React;
    if (name === 'next/navigation') return { usePathname, useSearchParams };
    if (name === 'next/image') return ({ alt }: { alt: string }) => <span aria-label={alt} />;
    if (name === 'next/link') return ({ children, ...anchor }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...anchor}>{children}</a>;
    if (name.endsWith('.css')) return {};
    if (name.includes('synthetic-journey')) return journey;
    if (name.includes('config/env')) return { isCopilotEnabled: () => true };
    if (name === '../../components') return { TrustDisclosureBanner: ({ learnMoreUrl, syntheticResearch }: { learnMoreUrl: string; syntheticResearch: boolean }) => <a href={learnMoreUrl} data-synthetic={String(syntheticResearch)}>Trust</a> };
    throw new Error(`Unexpected layout import: ${name}`);
  } });
  return React.createElement(exports.AppLayoutClient!, props);
}
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });
test.each(['/dashboard', '/deposit', '/withdraw', '/activity', '/settings', '/settings/trust'])(
  'RELEASE-GATE-FIX-002 T1 all layout anchors stay contained on scenario %s', (pathname) => {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
    vi.stubEnv('NEXT_PUBLIC_FEATURE_COPILOT_ENABLED', 'true');
    const query = 'journey=class-a-val-002&scenario=unavailable-data';
    vi.mocked(usePathname).mockReturnValue(pathname);
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(query) as ReturnType<typeof useSearchParams>);
    expect(isSyntheticJourneyPrimaryCondition(query, pathname)).toBe(false);
    const { container } = render(<AppLayoutClient><main>Unchanged scenario content</main></AppLayoutClient>);
    expect(container.querySelector('[data-synthetic]')?.getAttribute('data-synthetic')).toBe('false');
    const toggle = container.querySelector('[data-testid="nav-toggle"]');
    for (const open of [false, true]) {
      if (toggle && open) fireEvent.click(toggle);
      for (const anchor of container.querySelectorAll('a')) {
        const url = new URL(anchor.href, 'http://localhost');
        expect(url.pathname === '/dashboard-synthetic-journey' || url.searchParams.get('journey') === 'class-a-val-002', `${pathname}: ${anchor.textContent} -> ${anchor.getAttribute('href')}`).toBe(true);
        expect(url.pathname).not.toBe('/chat');
        if (anchor.getAttribute('aria-label') === 'Hedgr Home') expect(url.pathname).toBe('/dashboard-synthetic-journey');
      }
    }
  },
);
