import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const review = process.env.ABOUT_EXTERNAL_REVIEW_TEST === 'true';
const route = '/about-hedgr-review';

if (!review) {
  test('external About thesis remains unavailable in production', async ({ request }) => {
    for (const path of [route, `${route}?review=true`, `${route}?journey=class-a-val-002`]) {
      const response = await request.get(path);
      expect(response.status()).toBe(404);
      expect(await response.text()).not.toContain('Build financial stability when your currency is unpredictable.');
    }
  });
} else {
  test('approved thesis renders accessibly with no external requests or product controls', async ({ page }, testInfo) => {
    const external: string[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url()); });
    await page.goto(route);
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
    await expect(page).toHaveTitle('About Hedgr');
    const brief = readFileSync(resolve(__dirname, '../../../docs/ops/about-external/ABOUT_HEDGR_V03_BRIEF.md'), 'utf8');
    const copy = brief.slice(brief.indexOf('## 01.'), brief.indexOf('\n---', brief.indexOf('## 01.')));
    const normalize = (text: string) => text.replace(/^#{2,3} /gm, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
    expect((await main.locator('h2, h3, p').allTextContents()).map(normalize)).toEqual(copy.trim().split(/\n\s*\n/).map(normalize));
    await expect(main.locator('section')).toHaveCount(8);
    await expect(main.locator('section').first().getByText(/Today, Hedgr is in research/)).toBeVisible();
    await expect(main.locator('section').nth(6).getByText(/It does not provide live custody/)).toBeVisible();
    await expect(main.locator('form, input, button, details')).toHaveCount(0);
    await expect(page.locator('a')).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(main).toBeFocused();
    const description = 'Today, Hedgr is in research and product testing. The experience uses simulated information and does not hold or move real customer money.';
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      await expect(page.locator(selector)).toHaveAttribute('content', description);
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const metrics = await main.evaluate(element => {
      const luminance = (rgb: string) => {
        const values = rgb.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(n => n / 255).map(n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
        return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
      };
      return [...element.querySelectorAll('h1, h2, h3, p')].map(node => {
        let background = 'rgb(255, 255, 255)';
        for (let parent: Element | null = node; parent; parent = parent.parentElement) {
          const candidate = getComputedStyle(parent).backgroundColor;
          if (candidate !== 'rgba(0, 0, 0, 0)' && candidate !== 'transparent') { background = candidate; break; }
        }
        const style = getComputedStyle(node);
        const fg = luminance(style.color), bg = luminance(background);
        return { contrast: (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05), width: node.getBoundingClientRect().width };
      });
    });
    expect(Math.min(...metrics.map(item => item.contrast))).toBeGreaterThanOrEqual(4.5);
    expect(Math.max(...metrics.map(item => item.width))).toBeLessThanOrEqual(1056);
    expect(await main.locator('section p').first().evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(640);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath('about-hedgr-full.png'), fullPage: true });
    await main.locator('section').nth(6).scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath('about-hedgr-current-stage.png') });
    await page.setViewportSize({ width: 320, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
  });
}
