import { expect, test, type Page } from '@playwright/test';

const HOME = '/dashboard-synthetic-journey';
const JOURNEY = 'journey=class-a-val-002';
type Entry = { txn_ref: string; type: string; status: string; amount_usd: number; amount_zmw: number; fx_rate: number; created_at: number };
const entries = (page: Page): Promise<Entry[]> => page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger') || '{"transactions":[]}').transactions.map(({ txn_ref, type, status, amount_usd, amount_zmw, fx_rate, created_at }: Entry) => ({ txn_ref, type, status, amount_usd, amount_zmw, fx_rate, created_at })));
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('settlement-003@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/\/dashboard/);
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
});
async function confirmDeposit(page: Page) {
  await page.goto(`/deposit?${JOURNEY}`); await page.getByTestId('deposit-amount').fill('1000');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  return (await entries(page))[0];
}
async function settled(page: Page, ref: string) {
  await expect.poll(async () => (await entries(page)).find(t => t.txn_ref === ref)?.status, { timeout: 6000 }).toBe('settled');
}
async function balances(page: Page, amount: number) {
  await page.goto(HOME); await expect(page.getByTestId('usd-balance')).toHaveText(`$${amount.toFixed(2)}`);
  await page.goto(`/activity?${JOURNEY}`); await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText(`$${amount.toFixed(2)}`);
  await page.goto(`/withdraw?${JOURNEY}`);
  await expect(page.locator('main').first().getByText(`$${amount.toFixed(2)}`, { exact: true })).toBeVisible();
  await expect(page.locator('main').first()).toContainText('Simulated balance before this step:');
}
for (const width of [1440, 390]) {
  for (const timing of [0, 500, 1000, 1500, 'settled'] as const) {
    test(`T6 deposit reload ${timing}ms ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 }); const tx = await confirmDeposit(page);
      if (timing === 'settled') await settled(page, tx.txn_ref); else await page.waitForTimeout(timing);
      await page.reload(); await settled(page, tx.txn_ref);
      const after = await entries(page); expect(after).toHaveLength(1);
      expect(after[0]).toMatchObject({ ...tx, status: 'settled' });
      await balances(page, 37.04);
    });
    test(`T7 withdrawal reload ${timing}ms ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 }); const deposit = await confirmDeposit(page); await settled(page, deposit.txn_ref);
      await page.goto(`/withdraw?${JOURNEY}`); await page.getByTestId('withdraw-amount').fill('10');
      await page.getByRole('button', { name: 'Confirm', exact: true }).click();
      const tx = (await entries(page)).find(t => t.type === 'withdrawal')!; expect(tx).toBeTruthy();
      if (timing === 'settled') await settled(page, tx.txn_ref); else await page.waitForTimeout(timing);
      await page.reload(); await settled(page, tx.txn_ref);
      const after = await entries(page); expect(after).toHaveLength(2);
      expect(after.find(t => t.txn_ref === tx.txn_ref)).toMatchObject({ ...tx, status: 'settled' });
      await balances(page, 27.04);
    });
  }
}
