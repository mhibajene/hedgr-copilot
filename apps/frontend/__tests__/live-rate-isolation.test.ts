import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from 'vitest';
import * as preservation from './journey-quality-preservation';

const root = resolve(__dirname, '..');
const source = (name: string) => readFileSync(resolve(root, name), 'utf8');
const adapter = 'lib/live-rate/exchange-rate-api.ts';
const route = 'app/api/live-rate/route.ts';
const row = 'app/(app)/dashboard/LiveRateRow.tsx';
const credit = 'app/(app)/dashboard/RateAttribution.tsx';
const sheet = 'app/(app)/dashboard/CurrencyInsight.tsx';
const dashboard = 'app/(app)/dashboard/page.tsx';

function sourceFiles(directory: string): string[] {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap(entry => {
    const name = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(name) : /\.tsx?$/.test(name) ? [name] : [];
  });
}

test('JOURNEY-REVIEW-001 item 3 (e) provider, route and view imports stay strictly display-only', () => {
  const production = ['app', 'lib', 'components', 'pages', 'src', 'config'].flatMap(directory => {
    return readdirSync(root).includes(directory) ? sourceFiles(directory) : [];
  });
  const references = (text: RegExp) => production.filter(file => text.test(source(file))).sort();
  expect(references(/open\.er-api\.com/)).toEqual([adapter]);
  expect(references(/live-rate\/exchange-rate-api/)).toEqual([route]);
  expect(references(/['"]\/api\/live-rate['"]/)).toEqual([row]);
  expect(references(/from ['"]\.\/LiveRateRow['"]/)).toEqual([sheet]);
  expect(references(/from ['"]\.\/RateAttribution['"]/)).toEqual([dashboard, row].sort());
  expect(source(route)).toContain("export const dynamic = 'force-dynamic';");
  expect(source(credit)).toContain('href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer"');
  expect(source(adapter)).toContain("from 'node:process'");
  expect(source(adapter)).not.toMatch(/next:\s*\{|revalidate|Bank of Zambia/);
  expect(source(row)).not.toMatch(/localStorage|sessionStorage|lib\/(?:engine|state|fx|defi)/);
});

test('JOURNEY-REVIEW-001 item 3 rejects missing, duplicated and unrelated source changes before the historical pins', () => {
  const helper = source('__tests__/journey-quality-preservation.ts');
  const editsRaw = helper.match(/const ITEM_3_EDITS: [^\n]+ = (\{[\s\S]*?\n\});/)?.[1];
  expect(editsRaw, 'item 3 exact source reversal map').toBeDefined();
  const edits = JSON.parse(editsRaw!) as Record<string, [string, string][]>;
  expect(Object.keys(edits).sort()).toEqual([dashboard, sheet].sort());
  expect(edits[sheet]).toHaveLength(4);
  expect(edits[dashboard]).toHaveLength(2);
  const reverse = (preservation as Partial<{ reverseDailyRate: (path: string, value: string) => string }>).reverseDailyRate;
  expect(reverse).toBeTypeOf('function');
  const hashes = {
    [sheet]: '89d50ad679391dee40fa99bb916a18de180d77990c4e8e4004c31af7e2786daf',
    [dashboard]: '0dc28d7fda3688e85744b7bf0c01421923734f1854f9e6136ea0ddf0b1d5e537',
  };
  for (const [path, hash] of Object.entries(hashes)) {
    const current = source(path);
    expect(createHash('sha256').update(reverse!(path, current)).digest('hex')).toBe(hash);
    for (const [before, after] of edits[path]) {
      expect(() => reverse!(path, current.replace(after, () => before))).toThrow(`Item 3 literal count mismatch: ${path}`);
      expect(() => reverse!(path, current + after)).toThrow(`Item 3 literal count mismatch: ${path}`);
    }
    expect(() => reverse!(path, current + '\n')).toThrow(`Item 3 unrelated source drift: ${path}`);
  }
  expect(() => preservation.assertJourneySourceReversals()).not.toThrow();
});
