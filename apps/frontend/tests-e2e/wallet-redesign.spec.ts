import { expect, test, type Page } from '@playwright/test';

const home = '/dashboard-synthetic-journey';
async function seed(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('wallet-redesign@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.evaluate(() => {
    const now = Date.now();
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'redesign-deposit', type: 'deposit', status: 'settled', amount_zmw: 10000, amount_usd: 500, fx_rate: 20, created_at: now - 2000, updated_at: now - 2000 },
      { txn_ref: 'redesign-withdraw', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 200, fx_rate: 20, created_at: now - 1000, updated_at: now - 1000 },
    ] }));
    localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 300 }, version: 0 }));
    localStorage.setItem('hedgr.simulation.display-currency', 'ZMW');
  });
  await page.goto(home);
  await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
}
async function financialState(page: Page) {
  return page.evaluate(() => ['hedgr:ledger', 'hedgr:wallet'].map(key => localStorage.getItem(key)));
}
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test('research baseline: navigation, dialog focus, currency and event reconciliation preserve financial state', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page);
  const before = await financialState(page);
  await expect(page.getByRole('heading', { name: 'Your position', exact: true })).toBeVisible();
  await expect(page.getByTestId('engine-posture-context')).toHaveText('Your simulated withdrawal reduced the balance by $200.00.');
  await expect(page.getByRole('link', { name: 'See the activity', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'View Activity', exact: true })).toHaveAttribute('href', '/activity?journey=class-a-val-002');
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Activity', exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('home-390.png'), fullPage: true });
  await page.setViewportSize({ width: 458, height: 956 });
  await page.screenshot({ path: testInfo.outputPath('home-reference.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  const trigger = page.getByRole('button', { name: 'Understand the comparison' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Currency context', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('ZMW 5,700.00');
  await expect(dialog).toContainText('ZMW 6,000.00');
  await page.screenshot({ path: testInfo.outputPath('currency-390.png') });
  await page.setViewportSize({ width: 458, height: 956 });
  await page.screenshot({ path: testInfo.outputPath('currency-reference.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  await dialog.getByText('How this is calculated', { exact: true }).click();
  await expect(dialog).toContainText('It does not mean you held this amount for 30 days.');
  await dialog.getByText('How this is calculated', { exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Back to Home' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByText('How this is calculated', { exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole('combobox', { name: 'Display currency for this simulation' }).selectOption('KES');
  await expect(page.getByTestId('local-balance')).toContainText('KES 39,000.00');
  expect(await financialState(page)).toEqual(before);
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Activity', exact: true }).click();
  await expect(page).toHaveURL(/activity\?journey=class-a-val-002/);
  await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText('$300.00');
  await page.getByTestId('activity-row-withdraw').click();
  const detail = page.locator('details[open]');
  await expect(detail).toContainText('Before$500.00');
  await expect(detail).toContainText('After$300.00');
  await page.screenshot({ path: testInfo.outputPath('activity-390.png'), fullPage: true });
  await page.setViewportSize({ width: 458, height: 956 });
  await page.screenshot({ path: testInfo.outputPath('activity-reference.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByTestId('filter-withdrawals').click();
  await expect(page.getByTestId('activity-row-deposit')).toHaveCount(0);
  await expect(page.getByTestId('activity-result-withdraw')).toContainText('$300.00');
  expect(await financialState(page)).toEqual(before);
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'See what you have and what changed.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Understand the comparison' })).toHaveCount(0);
  await page.goto(`${home}?scenario=unavailable-data`);
  await expect(page.getByRole('heading', { name: 'Your position', exact: true })).toHaveCount(0);
});

test('polished Home accordions preserve keyboard operation, planning and research disclosures', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page);
  const before = await financialState(page);
  const planning = page.getByTestId('research-planning-targets');
  const planningSummary = planning.locator(':scope > summary');
  const disclosures = page.getByTestId('dashboard-disclosures');
  await expect(planningSummary).toContainText('Targets only · No money moved');
  for (const accordion of [planning, disclosures]) {
    await expect(accordion).not.toHaveAttribute('open');
    const summary = accordion.locator(':scope > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(accordion).toHaveAttribute('open', '');
    await expect(summary).toBeFocused();
  }
  for (const label of ['Now', 'Reserve', 'Growth']) {
    await expect(planning.getByText(label, { exact: true }).first()).toBeVisible();
  }
  await expect(planning.getByTestId('engine-allocation-boundary')).toHaveText('These are planning purposes, not separate balances. They do not divide or move simulated money.');
  const values = planning.getByTestId('engine-allocation-values-details');
  await values.locator(':scope > summary').focus();
  await page.keyboard.press('Space');
  await expect(values).toHaveAttribute('open', '');
  await expect(values).toContainText('Percentages describe the simulated planning structure only. They do not show where money is held.');
  for (const key of ['coreTargetPct', 'liquidityTargetPct', 'yieldCapPct']) {
    await expect(values.getByTestId(`engine-allocation-band-${key}`)).toBeVisible();
  }
  await expect(disclosures).toContainText('This research prototype is not a live service. The display currency preference changes illustrative simulation estimates only.');
  await expect(disclosures).toContainText('This research walkthrough creates no real financial exposure. It does not hold assets, accept real deposits, or move money.');
  await expect(disclosures).toContainText('This research prototype is not a bank account and does not accept deposits. No real money is held or moved.');
  await page.screenshot({ path: testInfo.outputPath('home-accordions-open-390.png'), fullPage: true });
  for (const accordion of [planning, disclosures]) {
    const summary = accordion.locator(':scope > summary');
    await summary.focus();
    await page.keyboard.press('Space');
    await expect(accordion).not.toHaveAttribute('open');
    await expect(summary).toBeFocused();
  }
  await expect(planning.getByTestId('engine-allocation-boundary')).not.toBeVisible();
  await expect(disclosures.locator('[data-disclosure-key="risk-warning"]')).not.toBeVisible();
  expect(await financialState(page)).toEqual(before);
});

test('Home presentation supports the query route and stays isolated during navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page);
  const before = await financialState(page);
  await page.goto('/dashboard?journey=class-a-val-002');
  await expect(page.getByRole('heading', { name: 'Your position', exact: true })).toBeVisible();
  await expect(page.getByRole('main')).toHaveCSS('background-color', 'rgb(250, 248, 245)');
  await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
  await expect(page.getByTestId('research-planning-targets')).toBeVisible();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Activity', exact: true }).click();
  await expect(page).toHaveURL(/activity\?journey=class-a-val-002/);
  await expect(page.getByRole('main')).not.toHaveCSS('background-color', 'rgb(250, 248, 245)');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(/settings\?journey=class-a-val-002/);
  await expect(page.getByRole('main')).not.toHaveCSS('background-color', 'rgb(250, 248, 245)');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('main')).toHaveCSS('background-color', 'rgb(250, 248, 245)');
  for (const route of ['/dashboard', `${home}?scenario=unavailable-data`]) {
    await page.goto(route);
    await expect(page.getByRole('main')).not.toHaveCSS('background-color', 'rgb(250, 248, 245)');
    await expect(page.getByTestId('research-planning-targets')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Your position', exact: true })).toHaveCount(0);
  }
  expect(await financialState(page)).toEqual(before);
});

test('research Home, Activity and dialog reflow at narrow/enlarged and desktop widths', async ({ page }, testInfo) => {
  await seed(page);
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const size of ['100%', '200%']) {
      await page.evaluate(size => { document.documentElement.style.fontSize = size; }, size);
      for (const id of ['research-planning-targets', 'dashboard-disclosures']) {
        const details = page.getByTestId(id);
        if (!(await details.evaluate(el => (el as HTMLDetailsElement).open))) {
          await details.locator(':scope > summary').click();
        }
        await expect(details).toHaveAttribute('open', '');
      }
      const balance = await page.getByTestId('dashboard-balance').boundingBox();
      const observation = await page.getByTestId('dashboard-current-status').boundingBox();
      expect(balance).not.toBeNull();
      expect(observation).not.toBeNull();
      if (width < 1024) {
        expect(observation!.y).toBeGreaterThan(balance!.y + balance!.height);
      } else {
        expect(observation!.x).toBeGreaterThan(balance!.x + balance!.width);
      }
      const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
      }).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent?.slice(0, 80) })));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px at ${size}: ${JSON.stringify(overflow)}`).toBe(true);
      await page.getByRole('button', { name: 'Understand the comparison' }).click();
      expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
      await page.getByRole('button', { name: 'Back to Home' }).click();
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Activity', exact: true }).click();
      await page.getByTestId('activity-row-withdraw').click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Activity ${width}px at ${size}`).toBe(true);
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Home', exact: true }).click();
    }
    await page.evaluate(() => { document.documentElement.style.fontSize = '100%'; });
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
  }
});
