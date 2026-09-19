import { expect, test, type Page } from '@playwright/test';

async function seed(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('baseline@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.evaluate(() => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'baseline-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1000, updated_at: 1000 },
      { txn_ref: 'baseline-withdraw', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 2, fx_rate: 0, created_at: 2000, updated_at: 2000 },
    ] }));
    localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 3 }, version: 0 }));
  });
}

async function unchangedState(page: Page) {
  return page.evaluate(() => [localStorage.getItem('hedgr:ledger'), localStorage.getItem('hedgr:wallet')]);
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

for (const synthetic of [false, true]) {
  const family = synthetic ? 'synthetic' : 'default';
  const route = (path: string) => path === '/dashboard' && synthetic ? '/dashboard-synthetic-journey' : path + (synthetic ? '?journey=class-a-val-002' : '');
  test(`${family}: shared baseline reflows without changing journey data or feature eligibility`, async ({ page }, testInfo) => {
    await seed(page);
    const before = await unchangedState(page);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/dashboard', '/activity', '/settings']) {
        await page.goto(route(path));
        await expect(page.getByTestId('shared-baseline-shell')).toBeVisible();
        await expect(page.getByRole('main')).toHaveCSS('background-color', 'rgb(250, 248, 245)');
        const nav = page.getByRole('navigation', { name: 'Primary', exact: true });
        await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', route('/dashboard'));
        await expect(nav.getByRole('link', { name: 'Activity', exact: true })).toHaveAttribute('href', route('/activity'));
        await expect(nav.getByRole('link', { name: 'Settings', exact: true })).toHaveAttribute('href', route('/settings'));
        if (path === '/dashboard') {
          await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
          await expect(page.getByTestId('currency-insight')).toHaveCount(synthetic ? 1 : 0);
          if (synthetic) {
            const delta = await page.getByTestId('currency-insight-difference').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
            const balance = await page.getByLabel('USD Balance amount', { exact: true }).evaluate(el => parseFloat(getComputedStyle(el).fontSize));
            expect(delta).toBeLessThan(balance);
            await expect(page.getByTestId('currency-insight-direction')).toHaveAttribute('data-direction', 'higher');
          }
        }
        if (path === '/activity') {
          const balance = page.getByTestId('activity-balance-reconciliation');
          await expect(balance).toHaveCSS('background-color', 'rgb(31, 39, 71)');
          await expect(balance.getByRole('heading')).toHaveCSS('color', 'rgb(255, 255, 255)');
          const amountSize = await page.getByTestId('activity-delta-withdraw').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
          const balanceSize = await page.getByTestId('activity-reconciliation-remaining').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
          expect(amountSize).toBeLessThan(balanceSize);
          await expect(page.getByTestId('activity-result-withdraw')).toHaveCSS('background-color', 'rgb(248, 237, 231)');
        }
        if (path === '/settings') {
          await expect(page.getByTestId('simulation-display-currency-settings')).toHaveCount(synthetic ? 1 : 0);
          await expect(page.getByTestId('settings-about-hedgr')).toHaveCount(synthetic ? 0 : 1);
        }
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
        await page.screenshot({ path: testInfo.outputPath(`${family}-${path.slice(1)}-${width}.png`), fullPage: true });
        await page.addStyleTag({ content: 'html { font-size: 200%; }' });
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
        await page.screenshot({ path: testInfo.outputPath(`${family}-${path.slice(1)}-${width}-enlarged.png`), fullPage: true });
      }
    }
    expect(await unchangedState(page)).toEqual(before);
  });

  test(`${family}: keyboard details and filters preserve completed balance evidence`, async ({ page }) => {
    await seed(page);
    await page.goto(route('/activity'));
    const before = await unchangedState(page);
    const row = page.getByTestId('activity-row-withdraw');
    await row.focus();
    await page.keyboard.press('Enter');
    if (synthetic) {
      await expect(page.locator('details[open]')).toContainText('Before$5.00');
      await expect(page.locator('details[open]')).toContainText('After$3.00');
      await page.keyboard.press('Enter');
      await expect(page.locator('details[open]')).toHaveCount(0);
    } else {
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
    }
    await page.getByTestId('filter-withdrawals').click();
    await expect(page.getByTestId('activity-row-deposit')).toHaveCount(0);
    await expect(page.getByTestId('activity-result-withdraw')).toContainText('$3.00');
    await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText('$3.00');
    expect(await unchangedState(page)).toEqual(before);
  });
}
