import { expect, test, type Page } from '@playwright/test';

const home = '/dashboard-synthetic-journey';
async function seed(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('scope-first@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.evaluate(() => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'scope-deposit', type: 'deposit', status: 'settled', amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1000, updated_at: 1000 },
      { txn_ref: 'scope-withdraw', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 2, fx_rate: 0, created_at: 2000, updated_at: 2000 },
    ] }));
    localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 3 }, version: 0 }));
    localStorage.setItem('hedgr.simulation.display-currency', 'GHS');
  });
  await page.goto(home);
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1024 }]) {
  test(`approved scope-first reference at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await seed(page);
    const scope = page.getByTestId('dashboard-balance-scope');
    await expect(scope.locator('dt, dd')).toHaveText([
      'This balance shows', 'Your simulated Hedgr balance and activity',
      'This balance doesn’t tell you', 'When funds would be available to withdraw',
    ]);
    await expect(page.getByTestId('dashboard-balance')).toContainText('Simulated Hedgr balance');
    await expect(page.getByTestId('local-balance')).toHaveText('≈ GHS 45.00 display estimate');
    await expect(page.getByTestId('engine-posture-context')).toHaveText('Your simulated withdrawal reduced the balance by $2.00.');
    await expect(page.getByText('This is an observation from the simulation, not a guarantee.')).toBeVisible();
    const utilities = page.getByTestId('dashboard-simulation-utilities');
    const deposit = page.getByTestId('dashboard-add-simulated-deposit');
    const activity = page.getByTestId('dashboard-view-activity');
    await expect(utilities.locator(':scope > a').first()).toHaveAttribute('data-testid', 'dashboard-add-simulated-deposit');
    await expect(utilities.locator(':scope > a').last()).toHaveAttribute('data-testid', 'dashboard-view-activity');
    await expect(deposit).toHaveAttribute('href', '/deposit?journey=class-a-val-002');
    await expect(activity).toHaveAttribute('href', '/activity?journey=class-a-val-002');
    await page.mouse.move(0, 0);
    await expect(deposit).toHaveCSS('background-color', 'rgb(31, 39, 71)');
    await expect(deposit).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(activity).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(activity).toHaveCSS('color', 'rgb(70, 88, 160)');
    const depositBox = (await deposit.boundingBox())!;
    const activityBox = (await activity.boundingBox())!;
    expect(depositBox.height).toBeGreaterThanOrEqual(44);
    expect(activityBox.height).toBeGreaterThanOrEqual(44);
    expect(depositBox.y + depositBox.height).toBeLessThanOrEqual(activityBox.y + 1);
    const nav = page.getByRole('navigation', { name: 'Primary', exact: true });
    await expect(nav).toHaveCount(1);
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', home);
    await expect(nav.getByRole('link', { name: 'Activity', exact: true })).toHaveAttribute('href', '/activity?journey=class-a-val-002');
    await expect(nav.getByRole('link', { name: 'Settings', exact: true })).toHaveAttribute('href', '/settings?journey=class-a-val-002');
    await expect(nav).toHaveCSS('position', viewport.width < 1024 ? 'fixed' : 'static');
    const navBox = (await nav.boundingBox())!;
    if (viewport.width < 1024) expect(navBox.y + navBox.height).toBeCloseTo(viewport.height, 0);
    else expect(navBox.y).toBeLessThan((await page.getByRole('main').boundingBox())!.y);
    const observation = (await page.getByTestId('dashboard-current-status').boundingBox())!;
    const balance = (await page.getByTestId('dashboard-balance').boundingBox())!;
    if (viewport.width < 1024) expect(observation.y).toBeGreaterThan((await scope.boundingBox())!.y);
    else expect(observation.x).toBeGreaterThan(balance.x + balance.width);
    await expect(page.getByTestId('currency-insight-headline')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Currency context', exact: true })).toBeVisible();
    // Keep the login pointer off actions when capturing their resting appearance.
    await page.mouse.move(0, 0);
    await page.screenshot({ path: testInfo.outputPath(`scope-first-GHS3-${viewport.width}.png`), fullPage: true });
    await page.screenshot({ path: testInfo.outputPath(`scope-first-GHS3-${viewport.width}-viewport.png`) });
  });
}

test('scope and responsive navigation are isolated to explicit eligible Home', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await seed(page);
  await page.goto('/dashboard?journey=class-a-val-002');
  await expect(page.getByTestId('dashboard-balance-scope')).toBeVisible();
  for (const path of ['/dashboard', `${home}?scenario=unavailable-data`, '/activity?journey=class-a-val-002', '/settings?journey=class-a-val-002']) {
    await page.goto(path);
    await expect(page.getByTestId('dashboard-balance-scope')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Primary', exact: true })).toHaveCSS('position', 'fixed');
    if (path === '/dashboard') {
      await expect(page.getByTestId('dashboard-balance')).toContainText('Your current position');
      await expect(page.getByTestId('dashboard-add-simulated-deposit')).toHaveCSS('background-color', 'rgb(250, 248, 245)');
    }
  }
});

test('scope, actions and retained disclosures reflow at 320px and enlarged text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await seed(page);
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (const id of ['dashboard-balance-scope', 'dashboard-simulation-utilities']) {
    const region = page.getByTestId(id);
    expect(await region.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
  }
  for (const id of ['dashboard-add-simulated-deposit', 'dashboard-view-activity']) {
    expect((await page.getByTestId(id).boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  for (const id of ['research-planning-targets', 'dashboard-disclosures']) {
    const details = page.getByTestId(id);
    await details.locator(':scope > summary').focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
  }
  await expect(page.getByTestId('engine-allocation-boundary')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Restart simulated journey' })).toBeVisible();
});
