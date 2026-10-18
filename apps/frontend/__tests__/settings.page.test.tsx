// @vitest-environment jsdom
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { expect, test } from 'vitest';
import * as journey from '../lib/state/synthetic-journey';
import * as narrative from '../lib/narrative/about-hedgr';
(globalThis as typeof globalThis & { React: typeof React }).React = React;
test('RELEASE-GATE-FIX-001 T3 async server Settings renders locked placeholder details', async () => {
  // Execute the unchanged async server module with its client leaf and CSS stubbed.
  const source = readFileSync(resolve(__dirname, '../app/(app)/settings/page.tsx'), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React } }).outputText;
  const exports: { default?: (props: { searchParams: Promise<Record<string, string>> }) => Promise<React.ReactElement> } = {};
  runInNewContext(js, { React, exports, require: (name: string) => {
    if (name.includes('synthetic-journey')) return journey;
    if (name.includes('about-hedgr')) return narrative;
    if (name.includes('SimulationDisplayCurrencySelector')) return { SimulationDisplayCurrencySelector: () => <div /> };
    if (name === 'next/link') return { default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a> };
    if (name.endsWith('.css')) return { default: {} };
    throw new Error(`Unexpected Settings import: ${name}`);
  } });
  const SettingsPage = exports.default!;
  const html = renderToStaticMarkup(await SettingsPage({ searchParams: Promise.resolve({}) }));
  for (const text of ['Example profile', 'Placeholder details. This simulation has no real account.', 'Email (placeholder)', 'user@example.com', 'Not set', 'Balances and transactions shown here are not real.']) expect(html).toContain(text);
  expect(html).not.toMatch(/Verification status|Not verified|returns shown/);
});
