import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const HOME = '/dashboard-synthetic-journey';
const JOURNEY = 'journey=class-a-val-002';
const SCENARIO = `${JOURNEY}&scenario=unavailable-data`;
test.use({ timezoneId: 'UTC' });
test.beforeEach(async ({ page, context }) => {
  // Network containment only; successful FX is the real same-origin stub response.
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('release-gate-fix-003@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.addInitScript(() => {
    const frames: string[] = [];
    (window as unknown as { rateFrames: string[] }).rateFrames = frames;
    new MutationObserver(() => {
      if (!location.search.includes('journey=class-a-val-002') || !location.search.includes('scenario=unavailable-data')) return;
      const main = document.querySelector('main');
      if (main && /Updated at|1 USD =/.test(main.textContent || '')) frames.push(main.textContent || '');
    }).observe(document, { childList: true, subtree: true, characterData: true });
  });
});
async function deposit(page: Page) {
  await page.goto(`/deposit?${JOURNEY}`);
  await page.getByTestId('deposit-amount').fill('1000');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions[0].status)).toBe('settled');
}
async function panel(page: Page, route: string) {
  const p = page.getByTestId(`${route}-market-data-continuity`);
  if (route === 'withdraw') {
    await expect(page.getByText("This example has no rate set, so the local amount and Confirm aren't available.", { exact: true })).toBeVisible();
    await expect(p).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Back to Home', exact: true })).toHaveAttribute('href', HOME);
  } else {
    await expect(p).toBeVisible();
    await expect(p).toContainText("The example rate didn't load. This simulation uses a fixed example rate, not market data.");
  }
  await expect(page.getByTestId(`${route}-fx-block`)).toHaveCount(0);
  await expect(page.locator('main').first()).not.toContainText(/Updated at|1 USD =/);
  if (route === 'deposit') await expect(page.locator('main').first()).toContainText('Confirm turns on once the example rate loads.');
  else await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as { rateFrames: string[] }).rateFrames)).toEqual([]);
}
for (const width of [1440, 390]) {
  for (const route of ['deposit', 'withdraw']) {
    for (const balance of route === 'withdraw' ? ['zero', 'settled'] : ['zero']) {
      test(`T1 successful FX ${route} ${balance} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        if (balance === 'settled') await deposit(page);
        const response = page.waitForResponse(r => new URL(r.url()).pathname === '/api/fx' && r.request().method() === 'GET');
        await page.goto(`/${route}?${SCENARIO}`);
        const fx = await response; expect(fx.status()).toBeGreaterThanOrEqual(200); expect(fx.status()).toBeLessThan(300);
        await panel(page, route);
        if (route === 'withdraw') {
          await expect(page.getByTestId('withdraw-no-funds')).toHaveCount(0);
          await expect(page.getByTestId('local-balance')).toHaveCount(0);
          await expect(page.getByTestId('withdraw-amount')).toHaveCount(0);
          await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toHaveCount(0);
          await expect(page.getByTestId('withdraw-balance-preview')).toHaveCount(0);
        }
      });
      test(`T2 failing FX ${route} ${balance} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        if (balance === 'settled') await deposit(page);
        await page.route('**/api/fx?**', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
        await page.goto(`/${route}?${SCENARIO}`); await panel(page, route);
      });
    }
  }
  test(`T3 T8 T9 Sarah shared USD and exact local figure ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await page.goto(`${HOME}?example=sarah`);
    const hero = page.locator('[data-component="HomeHero"]');
    await expect(hero.locator('[data-component="UsdFigure"]')).toHaveText('$222.22 USD');
    await expect(hero.getByTestId('local-balance-figure')).toHaveText('≈ ZMW 5,999.94');
    await expect(hero.getByTestId('local-balance-caption')).toHaveText('Example figure, not a quote');
    await expect(hero.locator('[data-component="LocalFigure"]')).toHaveCount(1);
    await expect(hero).not.toContainText(/6,000|1000/);
    await expect(page.getByTestId('sarah-fee-card')).toContainText('$1000.00 USD');
    await expect(page.getByTestId('sarah-fee-card')).toContainText('This read does not establish whether Sarah can pay the fee.');
    await expect(page.locator('main').first()).not.toContainText(/\b(?:sufficiency|progress|gap|funded|enough)\b/i);
  });
  test(`T4 Daniel and source-free own hero preserve output ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await page.goto(`${HOME}?example=daniel`);
    const hero = page.locator('[data-component="HomeHero"]');
    await expect(hero).toHaveText('Fictional example · Daniel’s reserve$800.00 USD≈ ZMW 21,600.00 Example figure, not a quote');
    await page.goto(HOME);
    await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
    await expect(page.getByTestId('local-balance-figure')).toHaveText('≈ ZMW 0.00');
  });
  test(`T5 no-journey successful FX keeps ordinary block ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 }); await deposit(page);
    // This disables only the dev-default primary condition, with no journey marker.
    for (const route of ['deposit', 'withdraw']) {
      await page.goto(`/${route}?scenario=unavailable-data`);
      await expect(page.getByTestId(`${route}-fx-block`)).toContainText('1 USD =');
      await expect(page.getByTestId(`${route}-fx-block`)).toContainText('Updated at');
      if (route === 'withdraw') {
        await expect(page.locator('main').getByTestId('local-balance')).toHaveText('≈ ZMW 740.80');
      }
    }
  });
}

test('T9 protected HomeHero source hash', () => {
  expect(createHash('sha256').update(readFileSync(resolve(__dirname, '../app/(app)/dashboard/HomeHero.tsx'))).digest('hex')).toBe('d6d8ce3c9faf0b3188c113e644f6b89023d5ff2a6b475f0f0e83e0573a7d97ef');
});
