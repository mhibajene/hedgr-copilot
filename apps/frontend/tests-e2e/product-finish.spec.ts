import { expect, test, type Page } from '@playwright/test';

async function seedPosition(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('finish@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await page.evaluate(() => {
    window.localStorage.setItem('hedgr:ledger', JSON.stringify({
      version: 2,
      transactions: [
        { txn_ref: 'finish-deposit', type: 'deposit', status: 'settled', amount_zmw: 10000, amount_usd: 500, fx_rate: 20, created_at: 1000, updated_at: 1000 },
        { txn_ref: 'finish-withdraw', type: 'withdrawal', status: 'settled', amount_zmw: 0, amount_usd: 200, fx_rate: 0, created_at: 2000, updated_at: 2000 },
      ],
    }));
    window.localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: 300 }, version: 0 }));
  });
}

async function expectMainFits(page: Page) {
  await expect.poll(() => page.locator('main').evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname) ? route.continue() : route.abort();
  });
});

for (const synthetic of [true, false]) {
  const family = synthetic ? 'synthetic' : 'default';
  const home = synthetic ? '/dashboard-synthetic-journey' : '/dashboard';
  const route = (path: string) => path + (synthetic ? '?journey=class-a-val-002' : '');

  test(`${family}: mobile framing and enlarged simulation disclosure stay readable`, async ({ page }, testInfo) => {
    await seedPosition(page);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const textSize of [100, 200]) {
        await page.goto(home);
        await page.addStyleTag({ content: `html { font-size: ${textSize}%; }` });
        const framing = page.getByTestId('dashboard-orientation').getByText('Hedgr helps you understand', { exact: false });
        await expect.soft(framing).toBeVisible();
        await expect(framing).toContainText('provides context, not an instruction.');
        const banner = page.getByRole('region', { name: 'Simulation disclosure' });
        const title = banner.getByText('Simulation · no real money', { exact: true });
        const details = page.getByTestId('simulation-technical-details');
        const summary = details.locator('summary');
        const assertReflow = async () => {
          await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
          for (const element of [title, summary, details]) {
            await expect.poll(() => element.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
          }
          const titleBox = (await title.boundingBox())!;
          const summaryBox = (await summary.boundingBox())!;
          const overlapX = Math.min(titleBox.x + titleBox.width, summaryBox.x + summaryBox.width) - Math.max(titleBox.x, summaryBox.x);
          const overlapY = Math.min(titleBox.y + titleBox.height, summaryBox.y + summaryBox.height) - Math.max(titleBox.y, summaryBox.y);
          expect(overlapX <= 1 || overlapY <= 1).toBe(true);
          expect(summaryBox.height).toBeGreaterThanOrEqual(44);
          const bannerBox = (await banner.boundingBox())!;
          expect((await page.getByTestId('app-nav').boundingBox())!.y).toBeGreaterThanOrEqual(bannerBox.y + bannerBox.height);
        };
        await assertReflow();
        if (!synthetic) {
          for (const row of await page.getByRole('region', { name: 'Recent activity' }).getByRole('listitem').all()) {
            const description = row.locator('div');
            await expect.poll(() => description.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
            const left = (await description.boundingBox())!;
            const amount = (await row.locator(':scope > p').boundingBox())!;
            expect(amount.x >= left.x + left.width - 1 || amount.y >= left.y + left.height - 1).toBe(true);
          }
        }
        await summary.focus();
        await page.keyboard.press('Enter');
        await expect(details).toHaveAttribute('open', '');
        await expect(details.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', route('/settings/trust'));
        await assertReflow();
        await page.screenshot({ path: testInfo.outputPath(`${family}-${width}-${textSize}-disclosure.png`), fullPage: true });
        await page.keyboard.press('Enter');
        await expect(details).not.toHaveAttribute('open', '');
      }
    }
  });

  test(`${family}: B2 preserves equal action weight and the factual journey`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await seedPosition(page);
    await page.goto(home);
    await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
    const deposit = page.getByTestId('dashboard-add-simulated-deposit');
    const activity = page.getByTestId('dashboard-view-activity');
    const appearance = (el: Element) => {
      const s = getComputedStyle(el);
      return [s.backgroundColor, s.color, s.borderRadius, s.boxShadow];
    };
    expect(await deposit.evaluate(appearance)).toEqual(await activity.evaluate(appearance));
    expect((await deposit.boundingBox())!.height).toBeGreaterThanOrEqual(64);
    expect((await activity.boundingBox())!.height).toBeGreaterThanOrEqual(64);
    await expect(deposit).toHaveAttribute('href', route('/deposit'));
    await expect(activity).toHaveAttribute('href', route('/activity'));
    await expect(page.getByTestId('dashboard-simulated-withdraw')).toHaveCount(synthetic ? 0 : 1);
    await expect(page.getByTestId('engine-allocation-boundary')).toContainText('not separate balances');
    await expectMainFits(page);
    await page.screenshot({ path: testInfo.outputPath(`${family}-home.png`), fullPage: true });
    await deposit.focus();
    await page.keyboard.press('Tab');
    await expect(activity).toBeFocused();
    await expect(activity).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText('$300.00');
    await page.getByTestId('filter-withdrawals').click();
    await expect(page.getByTestId('filter-withdrawals')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('activity-row-deposit')).toHaveCount(0);
    await expect(page.getByTestId('activity-result-withdraw')).toContainText('$300.00');
    await page.getByTestId('filter-all').click();
    await expectMainFits(page);
    await page.screenshot({ path: testInfo.outputPath(`${family}-activity.png`), fullPage: true });

    await page.goto(route('/withdraw'));
    await page.getByTestId('withdraw-amount').fill('200');
    await expect(page.getByTestId('withdraw-balance-preview')).toContainText('$300.00 − $200.00 = $100.00');
    await expectMainFits(page);
    await page.screenshot({ path: testInfo.outputPath(`${family}-withdraw.png`), fullPage: true });
    await page.getByTestId('withdraw-amount').fill('301');
    await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
    await expect(page.locator('main').getByRole('alert')).toHaveText('Amount exceeds available balance.');

    await page.goto(route('/deposit'));
    await expect(page.getByTestId('deposit-balance-change')).toContainText('+$5.00');
    await expectMainFits(page);
    await page.screenshot({ path: testInfo.outputPath(`${family}-deposit.png`), fullPage: true });
    await page.getByTestId('deposit-amount').fill('0');
    await expect(page.getByRole('button', { name: 'Confirm', exact: true })).toBeDisabled();
  });

  test(`${family}: finish reflows at narrow, desktop and enlarged text sizes`, async ({ page }) => {
    await seedPosition(page);
    for (const width of [320, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of [home, route('/activity'), route('/deposit'), route('/withdraw')]) {
        await page.goto(path);
        await expect(page.locator('main')).toBeVisible();
        await expectMainFits(page);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of [home, route('/activity'), route('/deposit'), route('/withdraw')]) {
      await page.goto(path);
      await page.addStyleTag({ content: 'html { font-size: 200%; }' });
      await expectMainFits(page);
      if (path === home) {
        await expect(page.getByTestId('usd-balance')).toHaveText('$300.00');
        const deposit = page.getByTestId('dashboard-add-simulated-deposit');
        await expect(deposit).toHaveCSS('transition-duration', '0s');
        const lines = await deposit.locator('span').evaluate(el => el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
        expect(lines).toBeLessThanOrEqual(3);
        const depositBox = (await deposit.boundingBox())!;
        const activityBox = (await page.getByTestId('dashboard-view-activity').boundingBox())!;
        expect(activityBox.y).toBeGreaterThanOrEqual(depositBox.y + depositBox.height);
      }
    }
  });
}
