import { expect, test } from '@playwright/test';

// CLASS-A-VAL-002-STABILITY-LEDGER-ONLY-001 (§344): the ledger is the only balance source.
// A stale balance left by the retired wallet mode must never reach Home (the §327 / §341 probe).
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route =>
    ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

for (const home of ['/dashboard', '/dashboard-synthetic-journey']) {
  test(`${home}: a settled $5 ledger deposit shows $5.00 despite a stale $7 wallet balance`, async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('ledger-only@hedgr.test');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId('usd-balance')).toBeVisible();
    await page.evaluate(() => {
      const at = Date.now() - 2 * 3600_000;
      localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
        { txn_ref: 'ledger-only-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: at, updated_at: at },
      ] }));
      localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 7 }, version: 0 }));
    });

    await page.goto(home);

    await expect(page.getByTestId('usd-balance')).toHaveText('$5.00');
  });
}
