import { expect, test } from '@playwright/test';
import {
  DANIEL_FIGURES,
  SARAH_FIGURES,
  formatScenarioAmount,
  localFull,
  localFullSingular,
  localPlural,
  localSingular,
  type ScenarioCurrency,
} from '../lib/research/scenario-fixtures';

const studyEntry = '/orientation?study=stability-scenarios';
const holdPatterns = /30000|30,000|automatically split|Hedgr shows|Hedgr tracks/;

async function enterDaniel(page: import('@playwright/test').Page, currency: ScenarioCurrency = 'ZMW') {
  await page.goto(studyEntry);
  await page.getByRole('combobox').selectOption(currency);
  await page.getByTestId('orientation-continue').click();
  await page.getByTestId('study-continue').click();
  await page.getByTestId('study-to-hedgr').click();
  await page.getByTestId('study-to-reserve').click();
  await expect(page).toHaveURL(/\/research\/reserve-scenario\?v=1$/);
}

test.describe('Daniel reserve scenario', () => {
  test('gates missing and invalid variants and keeps v=2 as a direct URL only', async ({ page }) => {
    await page.goto('/research/reserve-scenario');
    await expect(page.getByTestId('reserve-stimulus')).toHaveCount(0);
    await expect(page).toHaveTitle(/Not Found|404/i);
    await page.goto('/research/reserve-scenario?v=3');
    await expect(page.getByTestId('reserve-stimulus')).toHaveCount(0);
    await page.goto('/research/reserve-scenario?v=2');
    await expect(page.getByTestId('reserve-stimulus')).toBeVisible();
    await expect(page).toHaveTitle('Daniel’s reserve · Hedgr research');
    await page.getByTestId('study-to-facts').click();
    await expect(page.getByTestId('study-panel-after')).toContainText('After the kwacha strengthened against the US dollar');
    await expect(page.getByTestId('study-panel-after')).not.toContainText('Because the kwacha strengthened, it now shows as a smaller amount in kwacha.');
    await expect(page.getByTestId('study-row-label').filter({ hasText: 'What to watch' })).toHaveCount(0);
    await expect(page.getByTestId('study-panel-after')).toContainText('K19,600');
    await expect(page.getByTestId('study-panel-after')).not.toContainText('K23,600');
  });

  test('runs intro, facts, interpreted notes and the existing bridge verbatim', async ({ page }) => {
    await enterDaniel(page);
    const stimulus = page.getByTestId('reserve-stimulus');
    await expect(page).toHaveTitle('Daniel’s reserve · Hedgr research');
    await expect(stimulus).toContainText('Fictional research example · no real money');
    await expect(page.getByTestId('study-common-boundary')).toHaveText('This example uses only the facts on this page. Nothing you do here is saved.');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Daniel’s reserve');
    await expect(page.getByTestId('daniel-intro').getByRole('heading', { level: 2 })).toHaveText('Daniel’s reserve');
    await expect(page.getByTestId('daniel-intro')).toContainText('Here’s a second fictional example: Daniel, a salaried professional, and part of his savings. No real money is involved.');
    await expect(page.getByTestId('study-to-facts')).toHaveText('Continue');

    await page.getByTestId('study-to-facts').click();
    await expect(page.getByRole('heading', { name: 'Daniel’s reserve', level: 2 })).toBeFocused();
    await expect(page.getByTestId('daniel-facts')).toBeVisible();
    await expect(page.getByTestId('daniel-scope')).toHaveText('This is the part of Daniel’s savings he keeps as a reserve. His other money isn’t shown.');
    await expect(page.getByTestId('daniel-condition')).toHaveText('In this example, the dollar-linked portion is USD 800 before and after. Only the exchange rate changes.');
    await expect(page.getByTestId('study-panel-before').getByRole('heading', { name: 'Before the exchange rate moved' })).toBeVisible();
    await expect(page.getByTestId('study-panel-after').getByRole('heading', { name: 'After the kwacha weakened against the US dollar' })).toBeVisible();
    await expect(page.getByTestId('study-panel-before')).toContainText('K17,500 in kwacha. A dollar-linked portion of USD 800. Shown as K21,600 in kwacha, for illustration only. This is not a quote.');
    await expect(page.getByTestId('study-panel-after')).toContainText('Shown as K23,600 in kwacha, for illustration only. This is not a quote.');
    await expect(page.getByTestId('study-panel-before')).toContainText('He may add more from future salary when he can. No fixed amount or schedule. Nothing he adds later is included here.');
    await expect(page.getByTestId('study-panel-before')).toContainText('Something to fall back on if his circumstances change, or to use if an opportunity comes up. When and how he’ll use it isn’t known yet.');
    await expect(page.getByTestId('study-panel-before')).toContainText('If he used the dollar-linked portion in kwacha, what he’d actually receive would depend on how he accessed it, any costs, and the rate at the time. This example doesn’t set any of those.');
    await expect(page.getByTestId('study-row-label').filter({ hasText: 'What to watch' })).toHaveCount(0);
    await expect(page.getByTestId('daniel-facts')).not.toContainText('The dollar-linked portion is counted in US dollars, so its figure in kwacha can change when the exchange rate moves.');
    await expect(page.getByTestId('daniel-facts')).not.toContainText('Because the kwacha weakened, it now shows as a larger amount in kwacha.');
    await expect(page.getByTestId('study-authored-label')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Daniel’s reserve, with Hedgr’s notes' })).toHaveCount(0);
    await expect(page.getByTestId('study-attribution')).toHaveText('This example was written in advance by Hedgr, using only the facts about Daniel on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.');
    await expect(page.getByTestId('study-limits')).toHaveText('This example can’t predict the exchange rate, assume Daniel will add more, or say what he would receive if he used his reserve. The dollar-linked portion is part of Daniel’s fictional situation, and Hedgr plays no part in it in this example. This isn’t financial advice.');
    await expect(page.getByTestId('study-row-marker')).toHaveCount(0);
    await expect(stimulus).not.toContainText(/%|1 USD =|implied|spot|automatically split/);
    await expect(stimulus.locator('input, textarea, form')).toHaveCount(0);

    await page.getByTestId('study-to-interpreted').click();
    await expect(page.getByRole('heading', { name: 'Daniel’s reserve, with Hedgr’s notes' })).toBeFocused();
    await expect(page.getByTestId('study-authored-label')).toHaveText('Research example about a fictional person');
    await expect(page.getByTestId('study-attribution')).toHaveText('This example was written in advance by Hedgr, using only the facts about Daniel on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.');
    await expect(page.getByTestId('study-limits')).toHaveText('This example can’t predict the exchange rate, assume Daniel will add more, or say what he would receive if he used his reserve. The dollar-linked portion is part of Daniel’s fictional situation, and Hedgr plays no part in it in this example. This isn’t financial advice.');
    await expect(page.getByTestId('study-panel-after').getByRole('heading', { name: 'After the kwacha weakened against the US dollar' })).toBeVisible();
    await expect(page.getByTestId('study-row-label').filter({ hasText: 'What to watch' })).toHaveCount(2);
    await expect(page.getByTestId('study-panel-after')).toContainText('Because the kwacha weakened, it now shows as a larger amount in kwacha.');
    await expect(page.getByTestId('study-panel-before')).toContainText('If he used the dollar-linked portion in kwacha, what he’d actually receive would depend on how he accessed it, any costs, and the rate at the time. This example doesn’t set any of those.');
    await expect(page.getByTestId('study-panel-before')).toContainText('He may add more from future salary when he can. No fixed amount or schedule. Nothing he adds later is included here.');
    await expect(page.getByTestId('study-panel-before')).toContainText('Something to fall back on if his circumstances change, or to use if an opportunity comes up. When and how he’ll use it isn’t known yet.');
    await expect(page.getByTestId('study-panel-before')).toContainText('The dollar-linked portion is counted in US dollars, so its figure in kwacha can change when the exchange rate moves. Neither figure tells Daniel exactly what he would receive.');

    await page.getByTestId('study-to-bridge').click();
    await expect(page.getByRole('heading', { name: 'You’ve reached the end of this research example.' })).toBeFocused();
    await expect(page.getByTestId('study-bridge')).toContainText('Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains.');
    await expect(page.getByTestId('study-bridge')).not.toContainText(/made-up money|practice deposit/);
    await expect(page.getByTestId('study-bridge')).toContainText('No real money moves, no account is opened');
    await expect(page.getByTestId('study-simulation-link')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.getByTestId('study-simulation-link')).toHaveCSS('border-radius', '9999px');
    await expect(page.getByTestId('reserve-stimulus')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(stimulus).not.toContainText(holdPatterns);

    await page.getByTestId('study-simulation-link').click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
    await expect(page.getByTestId('dashboard-current-status')).toContainText('Start here');
    await expect(page.getByTestId('dashboard-add-simulated-deposit')).toBeVisible();
  });

  test('keeps Sarah and Daniel on the same stored currency and locked figures', async ({ page }) => {
    for (const currency of ['ZMW', 'NGN', 'KES', 'GHS', 'PHP'] as const) {
      await enterDaniel(page, currency);
      const sarahFee = formatScenarioAmount(currency, SARAH_FIGURES[currency].fee);
      expect(sarahFee).toBeTruthy();
      await page.getByTestId('study-to-facts').click();
      const before = page.getByTestId('study-panel-before');
      const after = page.getByTestId('study-panel-after');
      const held = formatScenarioAmount(currency, DANIEL_FIGURES[currency].held);
      const displayBefore = formatScenarioAmount(currency, DANIEL_FIGURES[currency].displayBefore);
      const displayWeakened = formatScenarioAmount(currency, DANIEL_FIGURES[currency].displayWeakened);
      await expect(before).toContainText(`${held} in ${localFull[currency]}.`);
      await expect(before).toContainText(`Shown as ${displayBefore} in ${localFull[currency]}, for illustration only. This is not a quote.`);
      await expect(after).toContainText(`After ${localFullSingular[currency]} weakened against the US dollar`);
      await expect(after).toContainText(`Shown as ${displayWeakened} in ${localFull[currency]}, for illustration only. This is not a quote.`);
      await expect(after).not.toContainText(`Because ${localSingular[currency]} weakened, it now shows as a larger amount in ${localPlural[currency]}.`);
      await expect(page.getByTestId('study-row-label').filter({ hasText: 'What to watch' })).toHaveCount(0);
      await expect(before).toContainText(`in ${localPlural[currency]}, what he’d actually receive`);
      await expect(page.getByTestId('reserve-stimulus')).not.toContainText(sarahFee);
      await expect(page.getByTestId('study-row-marker')).toHaveCount(0);
      await page.getByTestId('study-to-interpreted').click();
      await expect(page.getByTestId('study-panel-after')).toContainText(`Because ${localSingular[currency]} weakened, it now shows as a larger amount in ${localPlural[currency]}.`);
      await expect(page.getByTestId('study-row-label').filter({ hasText: 'What to watch' })).toHaveCount(2);
    }
  });

  test('keeps controls usable at small width, enlarged text and desktop widths', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await enterDaniel(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const control of ['study-to-facts', 'study-to-interpreted', 'study-to-bridge']) {
      await page.getByTestId(control).focus();
      await expect(page.getByTestId(control)).toBeFocused();
      const box = await page.getByTestId(control).boundingBox();
      expect(box).toBeTruthy();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.getByTestId(control).click();
    }
    await expect(page.getByTestId('study-simulation-link')).toBeVisible();
    for (const width of [320, 390, 640, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
});
