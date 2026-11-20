import { expect, test, type Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('journey-amount-formatting@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto('/api/policy');
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
}

for (const size of [
  { name: 'desktop', width: 1440, height: 1000, text: '100%' },
  { name: 'mobile', width: 390, height: 844, text: '100%' },
  { name: 'narrow with 200% root text', width: 320, height: 568, text: '200%' },
]) {
  test.describe(size.name, () => {
    test.use({ viewport: { width: size.width, height: size.height } });
    test.beforeEach(async ({ context, page }) => {
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        return ['127.0.0.1', 'localhost', '::1'].includes(url.hostname) ? route.continue() : route.abort();
      });
      await login(page);
      await page.addInitScript(text => {
        document.addEventListener('DOMContentLoaded', () => { document.documentElement.style.fontSize = text; });
      }, size.text);
    });

    test('JOURNEY-REVIEW-001 deposit preview and receipt keep the entered ZMW value', async ({ page }) => {
      await page.goto('/deposit?journey=class-a-val-002');
      await page.getByTestId('deposit-amount').fill('5000');
      await expect(page.getByTestId('deposit-balance-change')).toContainText('The simulation shows ZMW 5,000.00 as +$185.19.');
      await page.getByRole('button', { name: 'Confirm', exact: true }).click();
      await expect(page.getByTestId('deposit-confirmation-region')).toContainText('ZMW 5,000.00');
      const rows = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ amount_usd: 185.19, source_local_amount: 5000, source_local_currency: 'ZMW', fx_rate: 27, status: 'settled' });
      await page.getByTestId('deposit-confirmation-region').screenshot({ path: test.info().outputPath('deposit.png') });
    });

    test('JOURNEY-REVIEW-001 withdrawal receipt groups ZMW and USD reconciliation', async ({ page }) => {
      await page.evaluate(() => localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [{
        txn_ref: 'format-seed', type: 'deposit', status: 'settled', amount_usd: 2000, amount_zmw: 54000,
        fx_rate: 27, created_at: 1, updated_at: 1,
      }] })));
      await page.goto('/withdraw?journey=class-a-val-002');
      await page.getByLabel('Amount to simulate (USD)').fill('50');
      await expect(page.getByTestId('withdraw-balance-preview')).toContainText('$1,950.00');
      await page.getByRole('button', { name: 'Confirm', exact: true }).click();
      await expect(page.getByTestId('withdraw-status-region')).toContainText('ZMW 1,350.00');
      await expect(page.getByTestId('withdraw-balance-reconciliation')).toHaveText('$1,950.00');
      const rows = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
      expect(rows).toHaveLength(2);
      expect(rows[1]).toMatchObject({ type: 'withdrawal', amount_usd: 50, status: 'settled' });
      await page.getByTestId('withdraw-status-region').screenshot({ path: test.info().outputPath('withdrawal.png') });
    });

    test('JOURNEY-REVIEW-001 Sarah fee groups USD and preserves the holding', async ({ page }) => {
      await page.goto('/dashboard-synthetic-journey?example=sarah');
      await expect(page.getByTestId('sarah-fee-figure')).toHaveText('$1,000.00 USD');
      await expect(page.getByTestId('sarah-read-figure')).toHaveText('$222.22 USD');
      await expect(page.getByTestId('local-balance-figure')).toHaveText('≈ ZMW 5,999.94');
      expect(await page.evaluate(() => localStorage.getItem('hedgr:ledger'))).toBeNull();
      await page.getByTestId('sarah-fee-card').screenshot({ path: test.info().outputPath('sarah-fee.png') });
    });
  });
}
