import { expect, test } from '@playwright/test';

const studyEntry = '/orientation?study=stability-scenarios';
const preferenceKey = 'hedgr.simulation.display-currency';
const holdPatterns = /30000|30,000|automatically split|Hedgr shows|Hedgr tracks|\bonly\b|with Hedgr|dollar-linked portion|Hedgr plays no part|no longer changes|fully funded|planned|saving for|progress|sufficien/i;
const readings = ['≈ ZMW 19,600.00 · 9 Sep · example rate 24.5', '≈ ZMW 23,600.00 · 25 Sep · example rate 29.5', '≈ ZMW 21,600.00 · 9 Oct · example rate 27'];
async function enterDaniel(page: import('@playwright/test').Page, currency = 'ZMW') {
  await page.goto('/orientation');
  await page.evaluate(({ key, currency }) => localStorage.setItem(key, currency), { key: preferenceKey, currency });
  await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveCount(0);
  expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(currency);
  await page.getByTestId('orientation-continue').click();
  await expect(page.getByTestId('sarah-facts')).toContainText('ZMW 6,000.00');
  for (const control of ['study-continue','study-to-hedgr','study-to-reserve']) await page.getByTestId(control).click();
  await expect(page).toHaveURL(/\/research\/reserve-scenario\?v=1$/);
}
async function facts(page: import('@playwright/test').Page) {
  await expect(page.locator('[data-slot="4"]')).toHaveText('Daniel keeps a reserve in US dollars.');
  await expect(page.locator('[data-slot="5"]')).toHaveText('Situation on 9 October 2026');
  await expect(page.locator('[data-slot="6"]')).toHaveText('He deposited +$500.00 on 12 June 2026 and +$300.00 on 14 August 2026. He holds $800.00.');
  await expect(page.locator('[data-slot="7"] li')).toHaveText(readings);
  await expect(page.locator('[data-slot="7"] p').last()).toHaveText('Example figure, not a quote');
  await expect(page.locator('[data-slot="8"]')).toHaveText('He made two deposits and none since. Each kwacha figure uses the example rate for its date.');
  const text = await page.getByTestId('reserve-stimulus').innerText();
  for (const token of ['+$500.00','+$300.00','$800.00','ZMW 19,600.00','ZMW 23,600.00','ZMW 21,600.00','Example figure, not a quote']) expect(text.split(token).length - 1).toBe(1);
}
async function guards(page: import('@playwright/test').Page) {
  const stimulus = page.getByTestId('reserve-stimulus');
  await expect(stimulus).not.toContainText(holdPatterns);
  await expect(stimulus).not.toContainText(/%|1 USD =|implied|spot|→/);
  await expect(stimulus.locator('input, textarea, form, meter, [role="progressbar"]')).toHaveCount(0);
  await expect(stimulus.locator('[data-testid="study-panel-before"], [data-testid="study-panel-after"], [data-testid="study-row-marker"], [data-testid="study-authored-label"], [data-slot="3"], [data-slot="15"]')).toHaveCount(0);
}

test.describe('RESEARCH-PAGES-REGISTRY-ALIGN-001 reserve', () => {
  test('R10 gates missing and invalid variants and compares complete v1/v2 flows', async ({ page }) => {
    await page.goto('/research/reserve-scenario'); await expect(page.getByTestId('reserve-stimulus')).toHaveCount(0);
    await expect(page).toHaveTitle(/Not Found|404/i);
    await page.goto('/research/reserve-scenario?v=3'); await expect(page.getByTestId('reserve-stimulus')).toHaveCount(0);
    const dom: string[][] = [];
    for (const variant of ['1','2']) {
      await page.goto(`/research/reserve-scenario?v=${variant}`);
      await expect(page).toHaveTitle('Daniel’s reserve · Hedgr research'); await facts(page);
      const stages = [await page.getByTestId('reserve-stimulus').innerHTML()];
      for (const control of ['study-continue','study-to-hedgr','study-to-bridge']) {
        await page.getByTestId(control).click(); stages.push(await page.getByTestId('reserve-stimulus').innerHTML());
      }
      dom.push(stages);
    }
    expect(dom[0]).toEqual(dom[1]);
  });

  test('runs situation, what-if, Hedgr and the existing bridge verbatim', async ({ page }) => {
    await enterDaniel(page); await facts(page); await guards(page);
    await expect(page.locator('[data-slot="1"]')).toHaveText('Fictional example');
    await expect(page.getByTestId('study-common-boundary')).toHaveText('This example uses the facts on this page and nothing else. No real money is involved. Nothing you do here is saved.');
    await page.getByTestId('study-continue').click();
    await expect(page.getByRole('heading', { name: 'What if Daniel needed kwacha?' })).toBeFocused();
    await expect(page.locator('[data-slot="12"]')).toHaveText('Imagine Daniel needed kwacha from his reserve. What he would receive depends on how he takes it out, any costs and the rate on that day. This example does not set them.');
    await expect(page.locator('[data-slot="13"]')).toHaveText('Nothing else about Daniel changes in this scenario.'); await guards(page);
    await page.getByTestId('study-to-hedgr').click();
    await expect(page.getByRole('heading', { name: 'What Hedgr helps Daniel see' })).toBeFocused();
    await expect(page.locator('[data-slot="17"]')).toHaveText('Daniel’s reserve is counted in US dollars. Its kwacha figure changes when the exchange rate changes.');
    await expect(page.getByTestId('study-attribution')).toHaveText('Hedgr wrote this example in advance, from the facts about Daniel on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money.');
    await expect(page.getByTestId('study-limits')).toHaveText('This example does not predict exchange rates. It is not financial advice.'); await guards(page);
    const home = page.getByRole('link', { name: 'See Daniel’s example on Home' });
    await expect(home).toHaveAttribute('href', '/dashboard-synthetic-journey?example=daniel');
    await home.click(); await expect(page).toHaveURL(/\/dashboard-synthetic-journey\?example=daniel$/);
    await expect(page.getByTestId('dashboard-daniel-read')).toBeVisible();
    await page.goBack(); await page.getByTestId('study-continue').click(); await page.getByTestId('study-to-hedgr').click();
    await page.getByTestId('study-to-bridge').click();
    await expect(page.getByRole('heading', { name: 'You’ve reached the end of this research example.' })).toBeFocused();
    await expect(page.getByTestId('study-bridge')).toHaveText('You’ve reached the end of this research example.Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.Continue to the Hedgr simulation');
    await expect(page.getByTestId('study-bridge')).not.toContainText(/made-up money|practice deposit/);
    await expect(page.getByTestId('study-simulation-link')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.getByTestId('study-simulation-link')).toHaveCSS('border-radius', '9999px');
    await expect(page.getByTestId('reserve-stimulus')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await page.getByTestId('study-simulation-link').click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
    await expect(page.getByTestId('dashboard-current-status')).toContainText('Start here');
    await expect(page.getByTestId('dashboard-add-simulated-deposit')).toBeVisible();
  });

  test('R11 keeps both pages ZMW under every preference and another-tab changes', async ({ page, context }) => {
    for (const currency of ['ZMW','NGN','KES','GHS','PHP']) {
      await enterDaniel(page, currency); await facts(page);
      expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(currency);
      const otherTab = await context.newPage(); await otherTab.goto('/orientation');
      const changed = currency === 'NGN' ? 'KES' : 'NGN';
      await otherTab.getByRole('combobox').selectOption(changed); await facts(page);
      for (const control of ['study-continue','study-to-hedgr']) {
        await page.getByTestId(control).click(); await guards(page);
        expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(changed);
      }
      await expect(otherTab.getByRole('combobox')).toHaveValue(changed); await otherTab.close();
      await page.goto(studyEntry); await expect(page.getByRole('combobox')).toHaveCount(0);
      expect(await page.evaluate(key => localStorage.getItem(key), preferenceKey)).toBe(changed);
    }
  });

  test('R16 layout-a11y keeps keyboard controls usable at small width, enlarged text and desktop widths', async ({ page }) => {
    for (const width of [1440,390,320]) {
      await page.setViewportSize({ width, height: 900 }); await enterDaniel(page);
      if (width === 320) await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      for (const control of ['study-continue','study-to-hedgr','study-to-bridge']) {
        for (let step = 0; step < 6 && !await page.getByTestId(control).evaluate(el => el === document.activeElement); step++) await page.keyboard.press('Tab');
        await expect(page.getByTestId(control)).toBeFocused();
        const box = await page.getByTestId(control).boundingBox(); expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        if (control === 'study-to-bridge') {
          // The Home link is the first focus stop after the Hedgr heading.
          await page.getByRole('link', { name: 'See Daniel’s example on Home' }).focus();
          await expect(page.getByRole('link', { name: 'See Daniel’s example on Home' })).toBeFocused();
          await page.keyboard.press('Tab'); await expect(page.getByTestId(control)).toBeFocused();
        }
        await page.keyboard.press('Enter');
      }
      await expect(page.getByTestId('study-simulation-link')).toBeVisible();
      for (const testWidth of [320,390,640,1024,1280,1440]) {
        await page.setViewportSize({ width: testWidth, height: 900 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
    }
  });
});
