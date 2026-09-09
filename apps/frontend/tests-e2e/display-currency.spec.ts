import { expect, test, type Page } from '@playwright/test';
import { SIMULATION_DISPLAY_CURRENCY_COPY as copy } from '../lib/narrative/orientation-surface';

const key = 'hedgr.simulation.display-currency';
const home = '/dashboard-synthetic-journey';
const settings = '/settings?journey=class-a-val-002';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('display@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function seedPosition(page: Page) {
  await login(page);
  await page.evaluate(() => {
    localStorage.setItem('hedgr.market', 'ZM');
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'display-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1000, updated_at: 1000 },
      { txn_ref: 'display-withdraw', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 2, fx_rate: 0, created_at: 2000, updated_at: 2000 },
    ] }));
    localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 3 }, version: 0 }));
  });
  await page.goto(home);
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
}

async function financialStorage(page: Page) {
  return page.evaluate(() => Object.fromEntries(
    ['hedgr.market', 'hedgr:ledger', 'hedgr:wallet'].map(key => [key, localStorage.getItem(key)]),
  ));
}

async function checkFits(page: Page) {
  await expect.configure({ soft: true }).poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test('entry selection persists through navigation, reload and clean journey restart', async ({ page }) => {
  await login(page);
  await page.goto('/orientation');
  const select = page.getByRole('combobox', { name: copy.label });
  await expect(select).toHaveValue('ZMW');
  await expect(select).toHaveAccessibleDescription(copy.helper);
  await expect(page.getByText('Simulation · no real money', { exact: true })).toBeVisible();
  const disclosure = (await page.getByTestId('orientation-disclosure').boundingBox())!;
  const selector = (await page.getByTestId('simulation-display-currency-entry').boundingBox())!;
  const enter = (await page.getByTestId('orientation-continue').boundingBox())!;
  expect(selector.y).toBeGreaterThanOrEqual(disclosure.y + disclosure.height);
  expect(enter.y).toBeGreaterThanOrEqual(selector.y + selector.height);
  await select.focus();
  await page.keyboard.press('k');
  await page.keyboard.press('Tab');
  await expect(select).toHaveValue('KES');
  await expect(page.getByTestId('orientation-continue')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
  await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 0.00 display estimate');
  await page.goto(settings);
  await expect(page.getByRole('button', { name: /Display currency/ })).toContainText('KES');
  await page.reload();
  await expect(page.getByRole('button', { name: /Display currency/ })).toContainText('KES');
  await page.goto('/orientation');
  await expect(select).toHaveValue('KES');
  await page.getByTestId('orientation-continue').click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 0.00 display estimate');
});

test('all five Settings estimates preserve USD, market, Activity, planning and transaction previews', async ({ page }) => {
  test.setTimeout(90000);
  await seedPosition(page);
  await expect(page.getByTestId('local-balance')).toHaveText('≈ ZMW 60.00 display estimate');
  const originalStorage = await financialStorage(page);
  const planning = await page.getByTestId('engine-allocation-structure').textContent();
  await page.goto('/activity?journey=class-a-val-002');
  const activity = await page.locator('main').textContent();
  for (const [code, amount] of [['ZMW', '60.00'], ['KES', '390.00'], ['NGN', '4,500.00'], ['GHS', '45.00'], ['PHP', '168.00']]) {
    await page.goto(settings);
    await page.getByRole('button', { name: /Display currency/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Display currency', exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleDescription(copy.helper);
    await expect(dialog.getByRole('radio')).toHaveCount(5);
    const requests: string[] = [];
    const onRequest = (request: { url(): string }) => { requests.push(request.url()); };
    page.on('request', onRequest);
    await dialog.getByRole('radio', { name: new RegExp(`^${code} —`) }).check();
    await expect(page.getByRole('button', { name: /Display currency/ })).toContainText(code);
    await dialog.getByRole('button', { name: 'Done', exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Display currency/ })).toBeFocused();
    expect(requests).toEqual([]);
    page.off('request', onRequest);
    expect(await financialStorage(page)).toEqual(originalStorage);
    await page.goto(home);
    await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
    await expect(page.getByTestId('local-balance')).toHaveText(`≈ ${code} ${amount} display estimate`);
    await expect(page.getByTestId('dashboard-synthetic-balance-explainer')).toHaveText('Illustrative simulation value only.');
    expect(await page.getByTestId('engine-allocation-structure').textContent()).toBe(planning);
    await expect(page.getByRole('combobox')).toHaveCount(0);
  }
  await page.goto('/dashboard?journey=class-a-val-002');
  await expect(page.getByTestId('local-balance')).toHaveText('≈ PHP 168.00 display estimate');
  await page.goto('/activity?journey=class-a-val-002');
  expect(await page.locator('main').textContent()).toBe(activity);
  await page.goto('/deposit?journey=class-a-val-002');
  await expect(page.getByTestId('deposit-fx-block')).toContainText('Simulated example rate: 1 USD = 20.00 ZMW');
  await page.getByTestId('deposit-amount').fill('100');
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText('$5.00');
  await expect(page.getByTestId('deposit-balance-change')).toContainText('shows 100 ZMW as +$5.00');
  await expect(page.getByLabel('Simulation currency display')).toHaveCount(0);
  await page.goto('/withdraw?journey=class-a-val-002');
  await page.getByTestId('withdraw-amount').fill('2');
  const withdrawal = page.getByTestId('withdraw-balance-preview');
  for (const amount of ['$3.00', '$2.00', '$1.00']) await expect(withdrawal).toContainText(amount);
  expect(await financialStorage(page)).toEqual(originalStorage);
  await page.goto('/settings/trust?journey=class-a-val-002');
  await expect(page.getByTestId('trust-information')).toContainText('The display currency preference changes illustrative simulation estimates only.');
  await page.goto('/dashboard');
  await expect(page.getByTestId('local-balance')).toHaveText('≈ ZMW 60.00');
  await expect(page.getByTestId('dashboard-synthetic-balance-explainer')).toHaveText('Illustrative position only.');
  await page.goto('/settings');
  await expect(page.getByTestId('settings-preferences')).toContainText('No preferences available yet');
  await page.goto('/deposit?journey=class-a-val-002&scenario=unavailable-data');
  await expect(page.getByTestId('deposit-market-data-continuity')).toContainText('Exchange rate data is temporarily unavailable');
  await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
});

test('invalid or blocked storage does not prevent entry or in-session choices', async ({ page }) => {
  await page.goto('/orientation');
  await page.evaluate(key => localStorage.setItem(key, 'USD'), key);
  await page.reload();
  await expect(page.getByRole('combobox', { name: copy.label })).toHaveValue('ZMW');
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
  const select = page.getByRole('combobox', { name: copy.label });
  await expect(select).toHaveValue('ZMW');
  await select.selectOption('GHS');
  await expect(select).toHaveValue('GHS');
  await expect(page.getByTestId('orientation-continue')).toBeEnabled();
});

for (const width of [320, 390, 1280]) {
  test(`display preference reflows at ${width}px and enlarged text with keyboard dialog access`, async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await seedPosition(page);
    for (const textSize of [100, 200]) {
      await page.goto('/orientation');
      await page.addStyleTag({ content: `html { font-size: ${textSize}%; }` });
      await page.getByRole('combobox', { name: copy.label }).selectOption('KES');
      await checkFits(page);
      await page.screenshot({ path: testInfo.outputPath(`entry-${width}-${textSize}.png`), fullPage: true });
      await page.goto(home);
      await page.addStyleTag({ content: `html { font-size: ${textSize}%; }` });
      await expect(page.getByTestId('local-balance')).toHaveText('≈ KES 390.00 display estimate');
      await checkFits(page);
      await page.screenshot({ path: testInfo.outputPath(`position-${width}-${textSize}.png`), fullPage: true });
      if (width === 390 && textSize === 100) await page.screenshot({ path: testInfo.outputPath('position-mobile.png') });
      await page.goto(settings);
      await page.addStyleTag({ content: `html { font-size: ${textSize}%; }` });
      await checkFits(page);
      await page.screenshot({ path: testInfo.outputPath(`settings-${width}-${textSize}.png`), fullPage: true });
      if (width === 390 && textSize === 100) await page.screenshot({ path: testInfo.outputPath('settings-mobile.png') });
      const trigger = page.getByRole('button', { name: /Display currency/ });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', { name: 'Display currency', exact: true });
      const kes = dialog.getByRole('radio', { name: 'KES — Kenyan shilling' });
      await expect(kes).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(dialog.getByRole('radio', { name: 'NGN — Nigerian naira' })).toBeChecked();
      await expect.poll(() => dialog.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
      await page.keyboard.press('Tab');
      await expect(dialog.getByRole('button', { name: 'Done' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(dialog.getByRole('radio', { name: 'NGN — Nigerian naira' })).toBeFocused();
      await page.screenshot({ path: testInfo.outputPath(`picker-${width}-${textSize}.png`), fullPage: true });
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    }
  });
}
