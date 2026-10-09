import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const frontendRoot = resolve(__dirname, '..');
const e2eRoot = join(frontendRoot, 'tests-e2e');
const sourceExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
// A string literal (quote or backtick) that starts with a machine-specific absolute filesystem root.
// Routes such as '/dashboard' and URLs such as 'http://127.0.0.1:3000/x' do not match.
const absoluteFsPath =
  /['"`](?:\/(?:opt|Users|home|tmp|var|private|root|mnt|Volumes)\/|[A-Za-z]:[\\/])/;

function walkSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkSourceFiles(full));
      continue;
    }
    if (sourceExts.has(extname(entry.name))) files.push(full);
  }
  return files;
}

describe('OPS-E2E-EVIDENCE-PATH-001 hermetic E2E output paths', () => {
  test('no Playwright spec hard-codes an absolute filesystem path', () => {
    const hits: string[] = [];
    for (const file of walkSourceFiles(e2eRoot)) {
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, index) => {
          if (absoluteFsPath.test(line)) {
            hits.push(`${relative(frontendRoot, file)}:${index + 1}: ${line.trim()}`);
          }
        });
    }
    expect(hits).toEqual([]);
  });
});
