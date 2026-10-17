import { expect, test, type Page } from '@playwright/test';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';

const home = '/dashboard-synthetic-journey';
const key = 'hedgr.simulation.display-currency';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('currency-context@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function seedPosition(page: Page, pending = false) {
  await login(page);
  await page.evaluate(pending => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'insight-example', type: 'deposit', status: pending ? 'pending' : 'settled', amount_zmw: 6000, amount_usd: 300, fx_rate: 20, created_at: 1000, updated_at: 1000 },
    ] }));
    localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 300 }, version: 0 }));
  }, pending);
  await page.goto(home);
  await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
}

async function storedState(page: Page) {
  return page.evaluate(() => Object.fromEntries(
    ['hedgr:ledger', 'hedgr:wallet', 'hedgr.market', 'hedgr.simulation.display-currency'].map(key => [key, localStorage.getItem(key)]),
  ));
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

for (const [currency, rate] of [
  ['ZMW', DANIEL_FIXTURE_RATE_ZMW_PER_USD, ], ['KES', 130, ],
  ['NGN', 1500, ], ['GHS', 15, ], ['PHP', 56, ],
] as const) {
  test(`${currency}: comparison preserves the complete $0 → $5 → $3 journey`, async ({ page }) => {
    test.setTimeout(60000);
    await login(page);
    await page.goto('/orientation');
    await page.getByRole('combobox', { name: 'Display currency for this simulation' }).selectOption(currency);
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
    await expect(page.getByText('No position to compare yet.')).toBeVisible();
    await expect(page.getByTestId('currency-insight-direction')).toHaveCount(0);
    await page.getByRole('link', { name: 'Add simulated deposit', exact: true }).click();
    await expect(page.getByTestId('deposit-fx-block')).toContainText(`${rate.toFixed(2)} ${currency}`);
    await page.getByTestId('deposit-amount').fill(String(rate * 5));
    await expect(page.getByTestId('deposit-balance-change')).toContainText('+$5.00');
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('deposit-confirmation-region')).toContainText('You added $5.00 to your simulated balance');
    await page.goto(home);
    await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toHaveAccessibleDescription('Try example exchange rates');
    await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toContainText('Try example exchange rates');
    await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toHaveAttribute('aria-describedby', 'currency-context-description');
    await page.getByRole('button', { name: 'Currency context', exact: true }).click();
    await expect(page.getByTestId('currency-rate-figure')).toHaveText(`≈ ${currency} ${(5 * rate).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`);
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await expect(page.getByTestId('engine-posture-context')).toHaveText('Your first simulated position is now visible. This is your starting point.');
    await page.goto('/withdraw?journey=class-a-val-002');
    await expect(page.getByTestId('withdraw-fx-block')).toContainText(`${rate.toFixed(2)} ${currency}`);
    await page.getByTestId('withdraw-amount').fill('2');
    await expect(page.getByTestId('withdraw-balance-preview')).toContainText('$5.00 − $2.00 = $3.00');
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute('data-status', 'SUCCESS');
    await page.getByRole('link', { name: 'Review Activity' }).click();
    await page.getByRole('link', { name: 'Back to your position' }).click();
    await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
    const local = (rate * 3).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    await expect(page.getByTestId('local-balance')).toHaveText(`≈ ${currency} ${local} Example figure, not a quote`);
    await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toContainText('Try example exchange rates');
    await page.getByRole('button', { name: 'Currency context', exact: true }).click();
    await expect(page.getByTestId('currency-rate-figure')).toHaveText(`≈ ${currency} ${local}`);
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await expect(page.getByTestId('engine-simulation-attention-answer')).toHaveCount(0);
    await expect(page.getByTestId('engine-posture-context')).toHaveCount(0);
    await expect(page.getByTestId('example-line-chart').locator('[data-chart-label]')).toHaveText('1 change since your last visit');
    const before = await storedState(page);
    const records = JSON.parse(before['hedgr:ledger']!).transactions;
    expect(records).toHaveLength(2);
    expect(records[0]).toMatchObject({ amount_usd: 5, amount_zmw: 135, fx_rate: DANIEL_FIXTURE_RATE_ZMW_PER_USD });
    expect(records[1]).toMatchObject({ amount_usd: 2, type: 'withdrawal' });
    await page.waitForLoadState('networkidle');
    const requests: string[] = [];
    // Focus restoration can reveal links and trigger Next's local JavaScript prefetch.
    // Keep every data/service request in the assertion, excluding only built route assets.
    const onRequest = (request: { url(): string }) => {
      const url = new URL(request.url());
      if (url.origin === new URL(page.url()).origin && url.pathname.startsWith('/_next/static/')) return;
      requests.push(request.url());
    };
    page.on('request', onRequest);
    await page.getByRole('button', { name: 'Currency context', exact: true }).click();
    const summary = page.getByText('How this is calculated', { exact: true });
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('No money moves.', { exact: false })).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.locator('[data-testid="currency-insight"] details')).not.toHaveAttribute('open', '');
    await page.getByRole('button', { name: 'Back to Home' }).click();
    expect(await storedState(page)).toEqual(before);
    expect(requests).toEqual([]);
    page.off('request', onRequest);
    await page.goto('/dashboard?journey=class-a-val-002');
    await page.getByRole('button', { name: 'Currency context', exact: true }).click();
    await expect(page.getByTestId('currency-rate-figure')).toHaveText(`≈ ${currency} ${local}`);
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await page.goto('/dashboard');
    await expect(page.getByTestId('currency-insight')).toHaveCount(0);
    await expect(page.getByTestId('currency-insight-inline')).toHaveCount(0);
    await expect(page.getByTestId('engine-simulation-attention-answer')).toHaveCount(0);
    await expect(page.getByTestId('engine-posture-context')).toHaveText(/^Nothing has changed since \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\. Your position is still \$3\.00\.$/);
    await page.goto(`${home}?scenario=unavailable-data`);
    await expect(page.getByTestId('currency-insight')).toHaveCount(0);
    expect(await storedState(page)).toEqual(before);
    await page.goto(home);
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Restart simulated journey' }).click();
    await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
    await expect(page.getByText('No position to compare yet.')).toBeVisible();
    await expect(page.getByTestId('currency-insight-direction')).toHaveCount(0);
    await expect(page.getByTestId('currency-insight-inline')).toHaveCount(0);
    expect((await storedState(page))[key]).toBe(currency);
  });
}

test('pending position withholds direction and preserves the existing available/pending presentation', async ({ page }) => {
  await seedPosition(page, true);
  await expect(page.getByText('Waiting for the simulated position to settle.')).toBeVisible();
  await expect(page.getByTestId('currency-insight-direction')).toHaveCount(0);
  await expect(page.getByTestId('currency-insight-inline')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-balance')).toContainText('Available in simulation: $0.00');
  await expect(page.getByTestId('dashboard-balance')).toContainText('Pending +300.00 USD');
});

test('preference fallback and hydration never display a stale direction or mismatched currency', async ({ page }) => {
  await seedPosition(page);
  await page.evaluate(key => localStorage.setItem(key, 'invalid'), key);
  await page.reload();
  await page.getByRole('button', { name: 'Currency context', exact: true }).click();
  await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ ZMW 8,100.00');
  await page.getByRole('button', { name: 'Back to Home' }).click();
  await page.evaluate(key => localStorage.setItem(key, 'KES'), key);
  // Observe every DOM commit before hydration, rather than only the settled screenshot.
  await page.addInitScript(() => {
    const mismatches: string[] = [];
    Object.assign(window, { currencyMismatches: mismatches });
    new MutationObserver(() => {
      const headline = document.querySelector('[data-testid="currency-rate-figure"]')?.textContent;
      const estimate = document.querySelector('[data-testid="local-balance"]')?.textContent;
      if (headline && (!headline.includes('KES') || !estimate?.includes('KES'))) mismatches.push(headline);
    }).observe(document, { childList: true, subtree: true, characterData: true });
  });
  await page.reload();
  await page.getByRole('button', { name: 'Currency context', exact: true }).click();
  await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ KES 39,000.00');
  await page.getByRole('button', { name: 'Back to Home' }).click();
  expect(await page.evaluate(() => (window as unknown as { currencyMismatches: string[] }).currencyMismatches)).toEqual([]);
  // The retained clean-start seam is tested by orientation's existing continue action.
  await page.goto('/orientation');
  await page.getByTestId('orientation-continue').click();
  await expect(page.getByText('No position to compare yet.')).toBeVisible();
});

test('blocked preference storage preserves a usable in-session comparison', async ({ page }) => {
  await seedPosition(page);
  await page.addInitScript(key => {
    const get = Storage.prototype.getItem;
    const set = Storage.prototype.setItem;
    Storage.prototype.getItem = function(name) {
      if (name === key) throw new Error('Storage unavailable');
      return get.call(this, name);
    };
    Storage.prototype.setItem = function(name, value) {
      if (name === key) throw new Error('Storage unavailable');
      return set.call(this, name, value);
    };
  }, key);
  await page.reload();
  await page.getByRole('button', { name: 'Currency context', exact: true }).click();
  await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ ZMW 8,100.00');
  await page.getByRole('button', { name: 'Back to Home' }).click();
  await page.getByRole('link', { name: 'Settings', exact: true }).first().click();
  await page.getByRole('button', { name: /Display currency/ }).click();
  await page.getByRole('radio', { name: 'PHP — Philippine peso' }).check();
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await page.getByRole('button', { name: 'Currency context', exact: true }).click();
  await expect(page.getByTestId('currency-rate-figure')).toHaveText('≈ PHP 16,800.00');
  await page.getByRole('button', { name: 'Back to Home' }).click();
  await expect(page.getByTestId('local-balance')).toHaveText('≈ PHP 16,800.00 Example figure, not a quote');
  await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
});

test('inline insight is one keyboard launcher with a complete unchanged shelf and focus return', async ({ page }) => {
  await seedPosition(page);
  const before = await storedState(page);
  const launcher = page.getByRole('button', { name: 'Currency context', exact: true });
  await expect(launcher).toHaveAccessibleDescription('Try example exchange rates');
  await expect(launcher).toContainText('Try example exchange rates');
  await expect(page.getByTestId('currency-insight-inline')).toHaveCount(0);
  await launcher.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Currency context', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTestId('currency-rate-card')).toContainText('$300.00');
  await expect(dialog.getByRole('slider', {name:'Try an example rate'})).toHaveValue('1');
  await expect(dialog).not.toContainText('Day 0');
  await expect(dialog.getByTestId('currency-rate-figure')).toHaveText('≈ ZMW 8,100.00');
  await expect(dialog).toContainText('Three example rates. Not a live rate and not a forecast.');
  await expect(dialog).toContainText('The dollar amount is the same at each rate. The rate sets the local figure.');
  await expect(dialog).not.toContainText('Day 30');
  await expect(dialog.locator('details')).toContainText('This is not your account history or live market data. No money moves.');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(launcher).toBeFocused();
  expect(await storedState(page)).toEqual(before);
});

test('compact KES result retains the reference signal without restoring its full inline component', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await seedPosition(page);
  await page.evaluate(key => localStorage.setItem(key, 'KES'), key);
  await page.reload();
  const section = page.getByTestId('currency-insight');
  const launcher = page.getByRole('button', { name: 'Currency context', exact: true });
  await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 39,000.00 Example figure, not a quote');
  await expect(page.getByTestId('currency-insight-inline')).toHaveCount(0);
  await expect(launcher).toHaveAccessibleDescription('Try example exchange rates');
  await expect(launcher).toContainText('Try example exchange rates');
  await expect(launcher).not.toContainText('Your USD amount is held constant in this comparison.');
  await expect(section.locator('button [data-testid="currency-insight-direction"]')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: testInfo.outputPath('currency-inline-KES300-390.png'), fullPage: true });
});

for (const width of [320, 390, 700, 1280, 1440]) {
  test(`currency context reflows at ${width}px and 200% text with keyboard disclosure`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await seedPosition(page);
    for (const size of [100, 200]) {
      await page.addStyleTag({ content: `html { font-size: ${size}%; }` });
      const section = page.getByTestId('currency-insight');
      const launcher = page.getByRole('button', { name: 'Currency context', exact: true });
      await expect(launcher).toContainText('Try example exchange rates');
      await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toContainText('Try example exchange rates');
      await expect(launcher).toHaveAccessibleDescription('Try example exchange rates');
      expect((await launcher.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
      expect(await launcher.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({ path: testInfo.outputPath(`currency-inline-${width}-${size}.png`), fullPage: true });
      await page.getByRole('button', { name: 'Currency context', exact: true }).click();
      const dialog = page.getByRole('dialog', { name: 'Currency context', exact: true });
      const summary = dialog.locator('summary');
      for (const expanded of [false, true]) {
        if (expanded) {
          await summary.focus();
          await page.keyboard.press('Enter');
          await expect(section.locator('details')).toHaveAttribute('open', '');
          await expect(summary).toBeFocused();
          expect(await summary.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
        }
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
        await expect(dialog.getByText('Three example rates. Not a live rate and not a forecast.')).toBeVisible();
        const observation = (await page.getByTestId('dashboard-current-status').boundingBox())!;
        const utilities = (await page.getByTestId('dashboard-simulation-utilities').boundingBox())!;
        expect(utilities.y).toBeGreaterThanOrEqual(observation.y + observation.height);
        const overflow = await section.evaluate(el => Array.from(el.querySelectorAll('*')).filter(child => child.clientWidth > 0 && child.scrollWidth > child.clientWidth + 1).map(child => child.tagName));
        expect(overflow).toEqual([]);
        await page.screenshot({ path: testInfo.outputPath(`currency-${width}-${size}-${expanded ? 'expanded' : 'collapsed'}.png`), fullPage: true });
      }
      await page.keyboard.press('Space');
      await expect(section.locator('details')).not.toHaveAttribute('open', '');
      await page.getByRole('button', { name: 'Back to Home' }).click();
    }
    expect(errors).toEqual([]);
  });
}
