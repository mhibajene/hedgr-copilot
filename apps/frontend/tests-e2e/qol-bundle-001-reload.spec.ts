import { expect, test, type Page } from '@playwright/test';
const JOURNEY = 'journey=class-a-val-002';
type Entry = { txn_ref: string; status: string; amount_usd: number; type: string; created_at: number };
const entries = (page: Page): Promise<Entry[]> => page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger') || '{"transactions":[]}').transactions);
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('qol-reload@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/dashboard/);
  await page.goto('/api/policy'); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
});
async function deposit(page: Page) {
  await page.goto(`/deposit?${JOURNEY}`); await page.getByTestId('deposit-amount').fill('270');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect.poll(async () => (await entries(page)).length).toBe(1);
}
for (const route of ['deposit', 'withdraw'] as const) for (const timing of [0, 500, 1000, 1500, 'settled'] as const) test(`T8 ${route} real reload ${timing}`, async ({ page }) => {
  await deposit(page);
  if (route === 'withdraw') {
    await expect.poll(async () => (await entries(page))[0].status).toBe('settled');
    await page.goto(`/withdraw?${JOURNEY}`); await page.getByTestId('withdraw-amount').fill('1');
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect.poll(async () => (await entries(page)).length).toBe(2);
  }
  const before = await entries(page); const tx = before.at(-1)!;
  if (timing === 'settled') await expect.poll(async () => (await entries(page)).at(-1)?.status).toBe('settled'); else await page.waitForTimeout(timing);
  await page.reload();
  await expect(page.getByTestId(`${route}-amount`)).toHaveCount(0);
  await expect.poll(async () => (await entries(page)).at(-1)?.status).toBe('settled');
  const receipt = page.getByTestId(route === 'deposit' ? 'deposit-confirmed' : 'withdraw-status-title');
  await expect(receipt).toContainText(route === 'deposit' ? 'You added $10.00' : 'You took $1.00');
  await page.reload(); await expect(receipt).toBeVisible();
  const after = await entries(page); expect(after).toHaveLength(before.length);
  expect(after.at(-1)).toMatchObject({ txn_ref: tx.txn_ref, amount_usd: tx.amount_usd, created_at: tx.created_at, status: 'settled' });
  await page.getByRole('link', { name: 'Back to your position', exact: true }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText(route === 'deposit' ? '$10.00' : '$9.00');
  await page.goto(`/activity?${JOURNEY}`); await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText(route === 'deposit' ? '$10.00' : '$9.00');
  await page.goto(`/${route}?${JOURNEY}`); await expect(page.getByTestId(`${route}-amount`)).toBeVisible();
});
test('T9 malformed/deleted/replaced/reset markers cannot restore history', async ({ page }) => {
  await deposit(page); await expect.poll(async () => (await entries(page))[0].status).toBe('settled');
  const key = await page.evaluate(() => Object.keys(sessionStorage)[0]); expect(key).toBeTruthy();
  await page.evaluate(key => sessionStorage.setItem(key, '{broken'), key); await page.reload();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await page.goto('/dashboard-synthetic-journey?reset=1');
  await expect.poll(async () => (await entries(page)).length).toBe(0);
  await page.goto(`/deposit?${JOURNEY}`); await expect(page.getByTestId('deposit-amount')).toBeVisible();
});
