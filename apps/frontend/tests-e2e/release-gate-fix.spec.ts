import { expect, test, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const HOME = '/dashboard-synthetic-journey';
const KEY = 'hedgr.simulation.display-currency';
const FAILURE = "The example rate didn't load. This simulation uses a fixed example rate, not market data.";
const CONFIRM = 'Confirm turns on once the example rate loads.';
const NOW = Date.parse('2026-10-18T04:00:00Z');
test.use({ timezoneId: 'UTC' });
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: NOW }); await page.clock.setFixedTime(NOW);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('release-gate-fix-001@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/\/dashboard/);
});
async function seed(page: Page, currency = 'ZMW', amount = 0) {
  await page.goto('/api/policy');
  await page.evaluate(({ currency, amount, key }) => {
    localStorage.clear(); sessionStorage.clear(); localStorage.setItem(key, currency);
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: amount ? [{ txn_ref: 'release-gate-fix-001', type: 'deposit', status: 'settled', amount_usd: amount, amount_zmw: amount * 27, fx_rate: 27, created_at: 1000, updated_at: 1000 }] : [] }));
  }, { currency, amount, key: KEY });
}
async function viewport(page: Page, width: number, scale: number) {
  await page.setViewportSize({ width, height: 1000 });
  if (scale === 2) {
    await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => { document.documentElement.style.setProperty('font-size', '200%', 'important'); }));
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  }
}
for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) {
  test(`RELEASE-GATE-FIX-001 T1 unavailable rates ${width}`, async ({ page }) => {
    await seed(page, 'ZMW', 5);
    await page.route('**/api/fx?**', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
    for (const route of ['deposit', 'withdraw']) {
      await page.goto(`/${route}?journey=class-a-val-002&scenario=unavailable-data`); await viewport(page, width, scale);
      const panel = page.getByTestId(`${route}-market-data-continuity`);
      await expect(panel).toContainText(FAILURE); await expect(panel).toContainText(CONFIRM);
      await expect(panel.locator('dt').last()).toHaveText('What is paused');
      await expect(panel.locator('dd').last()).toHaveText(CONFIRM);
      await expect(panel).not.toContainText(/payment method|We could not load current market data|Confirm stays off/);
      await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
      if (route === 'deposit') await expect(page.getByTestId('deposit-conversion-preview')).toHaveText(CONFIRM);
    }
  });
  test(`RELEASE-GATE-FIX-001 T2 valid rate empty and zero ${width}`, async ({ page }) => {
    await seed(page); await page.goto('/deposit?journey=class-a-val-002'); await viewport(page, width, scale);
    await expect(page.getByTestId('deposit-fx-block')).toBeVisible();
    for (const value of ['', '0']) {
      await page.getByTestId('deposit-amount').fill(value);
      await expect(page.getByTestId('deposit-conversion-preview')).toHaveText('Enter an amount to see it at the example rate.');
      await expect(page.getByTestId('deposit-conversion-preview')).not.toContainText(/unavailable|didn't load/);
    }
  });
  test(`RELEASE-GATE-FIX-001 T3 Settings ${width}`, async ({ page }) => {
    await page.goto('/settings?journey=class-a-val-002'); await viewport(page, width, scale);
    const account = page.getByTestId('settings-account');
    await expect(account.getByRole('heading')).toHaveText('Example profile');
    await expect(account).toContainText('Placeholder details. This simulation has no real account.');
    await expect(account).toContainText('Email (placeholder)'); await expect(account).toContainText('user@example.com');
    await expect(account).toContainText('Display name'); await expect(account).toContainText('Not set');
    await expect(account).not.toContainText(/Verification status|Not verified/);
    await expect(page.getByTestId('settings-trust-information')).toContainText('Balances and transactions shown here are not real.');
    await expect(page.getByTestId('settings-trust-information')).not.toContainText('returns shown');
  });
  test(`RELEASE-GATE-FIX-001 T4 study reset ${width}`, async ({ page }) => {
    for (const currency of ['PHP', 'NGN']) for (const example of ['own', 'daniel']) {
      await seed(page, currency, 5); await page.goto(`${HOME}?example=${example}&reset=1&study=1`); await viewport(page, width, scale);
      await expect.poll(() => page.evaluate(key => localStorage.getItem(key), KEY)).toBe('ZMW');
      await expect(page.getByTestId(example === 'own' ? 'local-balance-figure' : 'daniel-read-caption')).toContainText('ZMW');
      expect(new URL(page.url()).searchParams.has('study')).toBe(false);
    }
    await seed(page, 'NGN', 5); await page.goto(`${HOME}?example=sarah&reset=1&study=1`);
    expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe('NGN');
    expect(new URL(page.url()).searchParams.has('study')).toBe(false);
    await seed(page, 'PHP', 5); await page.goto(`${HOME}?study=1`); await expect(page.getByTestId('local-balance-figure')).toContainText('PHP');
    expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe('PHP');
    await seed(page); await page.goto('/orientation');
    await page.getByRole('combobox', { name: 'Display currency for this simulation' }).selectOption('KES');
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByTestId('local-balance-figure')).toContainText('KES');
    expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe('KES');
    await page.goto('/api/policy'); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    await page.goto('/orientation?study=stability-scenarios'); await page.getByTestId('orientation-continue').click();
    await page.getByTestId('study-continue').click(); await page.getByTestId('study-to-hedgr').click();
    await page.getByRole('link', { name: 'Next: Daniel’s reserve', exact: true }).click();
    await page.getByTestId('study-continue').click(); await page.getByTestId('study-to-hedgr').click(); await page.getByTestId('study-to-bridge').click();
    await expect(page.getByTestId('study-simulation-link')).toHaveAttribute('href', `${HOME}?reset=1&study=1`);
    await page.getByTestId('study-simulation-link').click();
    await expect(page.getByTestId('local-balance-figure')).toContainText('ZMW');
    expect(await page.evaluate(key => localStorage.getItem(key), KEY)).toBe('ZMW');
  });
  test(`RELEASE-GATE-FIX-001 T5 receipts and preview ${width}`, async ({ page }) => {
    await seed(page); await page.goto('/deposit?journey=class-a-val-002'); await viewport(page, width, scale);
    await page.getByTestId('deposit-amount').fill('1000'); await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    const receipt = page.getByTestId('deposit-confirmation-region'); await expect(receipt).toBeVisible();
    await expect(receipt.locator('dl').getByText(/Balance now/).locator('..')).toHaveText('Balance now $37.04');
    await expect(receipt.locator('dl')).not.toContainText('→');
    await page.goto('/withdraw?journey=class-a-val-002'); await viewport(page, width, scale);
    await page.getByTestId('withdraw-amount').fill('10');
    await expect(page.getByTestId('withdraw-balance-preview')).toContainText('What would remain: $27.04');
    await expect(page.getByTestId('withdraw-balance-preview')).not.toContainText(/−| = /);
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute('data-status', 'SUCCESS');
    await expect(page.getByTestId('withdraw-balance-reconciliation').locator('..').locator('..')).toHaveText('Balance now $27.04');
  });
  test(`RELEASE-GATE-FIX-001 T5 Withdraw receipt ${width}`, async ({ page }) => {
    await seed(page, 'ZMW', 37.04); await page.goto('/withdraw?journey=class-a-val-002'); await viewport(page, width, scale);
    await page.getByTestId('withdraw-amount').fill('10'); await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute('data-status', 'SUCCESS');
    await expect(page.getByTestId('withdraw-balance-reconciliation').locator('..').locator('..')).toHaveText('Balance now $27.04');
  });
  test(`RELEASE-GATE-FIX-001 T6 Sarah hero ${width}`, async ({ page }) => {
    await seed(page); await page.goto(`${HOME}?example=sarah`); await viewport(page, width, scale);
    const hero = page.locator('[data-component="HomeHero"]'); await expect(hero).toContainText('ZMW 6,000.00');
    await expect(hero).not.toContainText(/USD|≈|Example figure, not a quote|1000/);
    await expect(page.getByTestId('sarah-fee-card')).toContainText('$1000.00');
    await expect(page.getByTestId('sarah-fee-card')).toContainText('This read does not establish whether Sarah can pay the fee.');
  });
  test(`RELEASE-GATE-FIX-001 T7 example counts ${width}`, async ({ page }) => {
    for (const example of ['sarah', 'daniel']) {
      await page.goto(`${HOME}?example=${example}`); await viewport(page, width, scale);
      const chart = page.getByTestId('example-line-chart'); await expect(chart.locator('[data-chart-label]')).toHaveCount(0);
      await expect(chart.getByRole('button', { name: 'All changes · example dates', exact: true })).toBeVisible();
      const dots = chart.getByTestId('chart-event-dot'); expect(await dots.count()).toBeGreaterThan(0);
      for (const dot of await dots.all()) await expect(dot).toHaveAccessibleName(/^(Deposit|Withdrawal), \d+ [A-Z][a-z]{2}$/);
      await expect(chart).not.toContainText(/\d+ changes?/);
    }
  });
  for (const [currency, amount, usd, local] of [['ZMW', '100', 3.70, 'ZMW 100.00'], ['ZMW', '1000', 37.04, 'ZMW 1,000.00'], ['NGN', '100', .07, 'NGN 100.00']] as const) {
    test(`RELEASE-GATE-FIX-001 T8 ${currency} ${amount} ${width}`, async ({ page }) => {
      await seed(page, currency); await page.goto('/deposit?journey=class-a-val-002'); await viewport(page, width, scale);
      await page.getByTestId('deposit-amount').fill(amount); await page.getByRole('button', { name: 'Confirm', exact: true }).click();
      await expect(page.getByTestId('deposit-confirmation-region')).toContainText(local);
      const rows = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
      expect(rows).toHaveLength(1); expect(rows[0]).toMatchObject({ amount_usd: usd, fx_rate: 27, amount_zmw: +(usd * 27).toFixed(2), status: 'settled' });
      await page.goto('/activity?journey=class-a-val-002'); await viewport(page, width, scale);
      await expect(page.getByTestId('activity-row-deposit')).toContainText(local);
      await page.goto(HOME); await viewport(page, width, scale); await page.getByRole('button', { name: 'All changes', exact: true }).click();
      await expect(page.getByTestId('chart-event-list')).toContainText(local);
      await expect(page.getByTestId('usd-balance')).toHaveText(`$${usd.toFixed(2)}`);
    });
  }
}

test('RELEASE-GATE-FIX-001 T9 immutable Engine and rate controls', () => {
  const root = resolve(__dirname, '..');
  const paths = [...readdirSync(resolve(root, 'lib/engine')).map(p => `lib/engine/${p}`), ...readdirSync(resolve(root, '__tests__')).filter(p => p.startsWith('engine-')).map(p => `__tests__/${p}`)];
  const digest = createHash('sha256').update(paths.sort().map(path => `${path}\0${createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex')}`).join('\n')).digest('hex');
  expect(digest).toBe('f51054d38c7f895a58230d49757f6baa09595846b7b0b77c6525a4a930b2e481');
});
