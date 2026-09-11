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

test('zero-USD simulated deposit preserves the position and Activity until a valid correction', async ({ page }) => {
  await seedPosition(page);
  await page.goto('/orientation');
  await page.getByRole('combobox', { name: copy.label }).selectOption('NGN');
  await page.goto('/deposit?journey=class-a-val-002');
  await page.waitForLoadState('networkidle');
  const before = await financialStorage(page);
  const amount = page.getByRole('textbox', { name: 'Simulated deposit amount', exact: true });
  const confirm = page.getByRole('button', { name: 'Confirm', exact: true });
  for (const input of ['1', '7']) {
    await amount.fill(input);
    await expect(confirm).toBeDisabled();
    await expect(amount).toHaveAttribute('aria-invalid', 'true');
    await expect(amount).toHaveAccessibleDescription('Enter an amount that rounds to at least $0.01 in this simulation.');
    await expect(page.getByTestId('deposit-conversion-preview')).toContainText('+$0.00');
    await expect(page.getByTestId('deposit-confirmation-region')).toHaveCount(0);
    expect(await financialStorage(page)).toEqual(before);
  }
  await page.reload();
  await page.waitForLoadState('networkidle');
  expect(await financialStorage(page)).toEqual(before);
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await page.getByRole('link', { name: 'View Activity', exact: true }).click();
  await expect(page.getByText('2 simulated entries', { exact: true })).toBeVisible();

  await page.goto('/deposit?journey=class-a-val-002');
  await amount.fill('7');
  await expect(confirm).toBeDisabled();
  await amount.fill('8');
  await expect(confirm).toBeEnabled();
  await expect(amount).toHaveAttribute('aria-invalid', 'false');
  await expect(page.locator('#deposit-amount-error')).toHaveCount(0);
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText('+$0.01');
  await confirm.click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText('increased by $0.01');
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.01');
  await page.getByRole('link', { name: 'View Activity', exact: true }).click();
  await expect(page.getByText('3 simulated entries', { exact: true })).toBeVisible();
  const records = JSON.parse((await financialStorage(page))['hedgr:ledger']!).transactions;
  expect(records).toHaveLength(3);
  expect(records[2]).toMatchObject({ type: 'deposit', amount_usd: 0.01, amount_zmw: 0.2, fx_rate: 20 });
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

test('all five Settings estimates preserve USD, market, Activity and planning with aligned transaction previews', async ({ page }) => {
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
    // Finish route chunk prefetching before measuring preference-caused traffic.
    await page.waitForLoadState('networkidle');
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
  await expect(page.getByTestId('deposit-fx-block')).toContainText('Simulated example rate: 1 USD = 56.00 PHP');
  await page.getByTestId('deposit-amount').fill('280');
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText('$5.00');
  await expect(page.getByTestId('deposit-balance-change')).toContainText('shows 280 PHP as +$5.00');
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
      for (const route of ['deposit', 'withdraw']) {
        await page.goto(`/${route}?journey=class-a-val-002`);
        await page.addStyleTag({ content: `html { font-size: ${textSize}%; }` });
        await expect(page.getByTestId(`${route}-fx-block`)).toContainText('1500.00 NGN');
        await page.getByTestId(`${route}-amount`).fill(route === 'deposit' ? '7500' : '2');
        await checkFits(page);
        await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeEnabled();
        await page.screenshot({ path: testInfo.outputPath(`${route}-${width}-${textSize}.png`), fullPage: true });
      }
    }
  });
}


for (const [currency, rate, localFive, localThree] of [
  ['ZMW', 20, '100.00', '60.00'],
  ['KES', 130, '650.00', '390.00'],
  ['NGN', 1500, '7,500.00', '4,500.00'],
  ['GHS', 15, '75.00', '45.00'],
  ['PHP', 56, '280.00', '168.00'],
] as const) {
  test(`${currency}: deposit, withdrawal, Activity and Home preserve the equivalent USD journey`, async ({ page }) => {
    test.setTimeout(60000);
    await login(page);
    await page.goto('/orientation');
    await page.getByRole('combobox', { name: copy.label }).selectOption(currency);
    await page.getByTestId('orientation-continue').click();
    await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
    const marketBefore = await page.evaluate(() => localStorage.getItem('hedgr.market'));
    const requests: string[] = [];
    page.on('request', request => { requests.push(request.url()); });
    await page.getByRole('link', { name: 'Add simulated deposit' }).click();
    await expect(page).toHaveURL(/\/deposit\?journey=class-a-val-002$/);
    await page.reload();
    await expect(page.getByTestId('deposit-fx-block')).toHaveText(`Simulated example rate: 1 USD = ${rate.toFixed(2)} ${currency}`);
    const input = page.getByTestId('deposit-amount');
    await expect(page.locator('label[for="deposit-amount"]')).toHaveText(`Amount to simulate (${currency})`);
    await expect(input).toHaveAccessibleName('Simulated deposit amount');
    await input.fill(String(rate * 5));
    await expect(page.getByTestId('deposit-balance-change')).toContainText(`shows ${rate * 5} ${currency} as +$5.00`);
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('deposit-confirmation-region')).toContainText('simulated balance increased by $5.00');
    const deposits = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
    expect(deposits).toHaveLength(1);
    expect(deposits[0]).toMatchObject({ type: 'deposit', status: 'settled', amount_usd: 5, amount_zmw: 100, fx_rate: 20 });
    await page.getByRole('link', { name: 'Continue to simulated withdrawal' }).click();
    await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002$/);
    await expect(page.getByTestId('withdraw-fx-block')).toHaveText(`Simulated example rate: 1 USD = ${rate.toFixed(2)} ${currency}`);
    await expect(page.getByTestId('local-balance')).toHaveText(`≈ ${currency} ${localFive} display estimate`);
    await page.getByLabel('Amount to simulate (USD)', { exact: true }).fill('2');
    await expect(page.getByTestId('withdraw-balance-preview')).toContainText('$5.00 − $2.00 = $3.00');
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute('data-status', 'SUCCESS');
    await page.getByRole('link', { name: 'Review simulated activity' }).click();
    await page.getByRole('link', { name: 'Return to current position' }).click();
    await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
    await expect(page.getByTestId('local-balance')).toHaveText(`≈ ${currency} ${localThree} display estimate`);
    await page.reload();
    await expect(page.getByTestId('local-balance')).toHaveText(`≈ ${currency} ${localThree} display estimate`);
    const records = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
    expect(records).toHaveLength(2);
    expect(records[0]).toEqual(deposits[0]);
    expect(records[1]).toMatchObject({ type: 'withdrawal', status: 'settled', amount_usd: 2 });
    expect(await page.evaluate(() => localStorage.getItem('hedgr.market'))).toBe(marketBefore);
    expect(requests.filter(url => /USD(?:KES|NGN|GHS|PHP)|\/v1\/deposits/.test(url))).toEqual([]);
    await page.getByRole('link', { name: 'View Activity', exact: true }).click();
    await expect(page.locator('main')).toContainText('$5.00');
    await expect(page.locator('main')).toContainText('$2.00');
    const storageBeforeDefault = await financialStorage(page);
    await page.goto('/deposit');
    await page.getByTestId('deposit-amount').fill('100');
    await expect(page.getByTestId('deposit-conversion-preview')).toContainText('shows 100 ZMW as +$5.00');
    await page.goto('/withdraw');
    await expect(page.getByTestId('local-balance')).toHaveText('≈ ZMW 60.00');
    await page.goto('/deposit?journey=class-a-val-002&scenario=unavailable-data');
    await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
    await expect(page.getByTestId('deposit-market-data-continuity')).toBeVisible();
    expect(await financialStorage(page)).toEqual(storageBeforeDefault);
  });
}
