import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const frontendRoot = resolve(__dirname, '..');
const sourceRoots = ['app', 'pages', 'components', 'src', 'lib']
  .map((name) => join(frontendRoot, name))
  .filter((dir) => existsSync(dir));
const sourceExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const googleFontImport = /from\s+['"]next\/font\/google['"]/;
const cssPath = join(frontendRoot, 'app/orientation/plus-jakarta-sans.css');
const oflPath = join(frontendRoot, 'app/orientation/fonts/OFL.txt');

function walkSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      files.push(...walkSourceFiles(full));
      continue;
    }
    if (sourceExts.has(extname(entry.name))) files.push(full);
  }
  return files;
}

describe('OPS-E2E-FONT-LOCAL-001 hermetic Plus Jakarta Sans self-host', () => {
  test('no source file imports next/font/google', () => {
    const hits: string[] = [];
    for (const file of sourceRoots.flatMap(walkSourceFiles)) {
      const text = readFileSync(file, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, index) => {
        if (googleFontImport.test(line)) {
          hits.push(`${relative(frontendRoot, file)}:${index + 1}`);
        }
      });
    }
    expect(hits, `unexpected next/font/google imports: ${hits.join(', ')}`).toEqual([]);
  });

  test('every url(...) in plus-jakarta-sans.css resolves to an existing file', () => {
    expect(existsSync(cssPath), 'app/orientation/plus-jakarta-sans.css is missing').toBe(true);
    const css = readFileSync(cssPath, 'utf8');
    const urls = [...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((match) => match[2]);
    expect(urls.length).toBeGreaterThan(0);
    const missing = urls
      .filter((url) => !url.startsWith('data:') && !/^https?:/i.test(url))
      .map((url) => resolve(dirname(cssPath), url))
      .filter((file) => !existsSync(file) || !statSync(file).isFile());
    expect(missing, `unresolved font urls: ${missing.join(', ')}`).toEqual([]);
  });

  test('OFL.txt exists with SIL OFL 1.1 and Plus Jakarta Sans Project Authors', () => {
    expect(existsSync(oflPath), 'app/orientation/fonts/OFL.txt is missing').toBe(true);
    const ofl = readFileSync(oflPath, 'utf8');
    expect(ofl).toContain('SIL OPEN FONT LICENSE Version 1.1');
    expect(ofl).toContain('Plus Jakarta Sans Project Authors');
  });

  test("CSS declares 'Plus Jakarta Sans' and the shipped fallback metrics", () => {
    expect(existsSync(cssPath), 'app/orientation/plus-jakarta-sans.css is missing').toBe(true);
    const css = readFileSync(cssPath, 'utf8');
    expect(css).toContain("font-family: 'Plus Jakarta Sans'");
    expect(css).toContain('98.88%');
    expect(css).toContain('21.15%');
    expect(css).toContain('104.98%');
  });
});
