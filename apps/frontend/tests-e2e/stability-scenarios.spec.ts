import { expect, test } from '@playwright/test';

const studyEntry = '/orientation?study=stability-scenarios';

async function enterStudy(page: import('@playwright/test').Page) {
  await page.goto(studyEntry);
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/research\/stability-scenarios$/);
}

test.describe('Research Two-Beat Sarah example', () => {
  test('keeps ordinary orientation and presents A1 facts without prompts or premature interpretation', async ({ page }) => {
    await page.goto('/orientation');
    await expect(page.getByTestId('orientation-continue')).toHaveText('Enter Hedgr');
    await expect(page.getByTestId('orientation-continue')).toHaveAttribute('href', '/dashboard-synthetic-journey?reset=1');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose how local estimates are shown.');

    await page.goto(studyEntry);
    await expect(page.getByTestId('orientation-disclosure')).toContainText('No real money moves');
    await expect(page.getByTestId('orientation-data-boundary')).toContainText('Do not enter real personal or financial information.');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('Choose the currency used for Sarah’s fictional savings amounts.');
    await expect(page.locator('#simulation-display-currency-helper')).toContainText('not converted estimates');
    await expect(page.getByTestId('orientation-continue')).toHaveText('Continue to Sarah’s example');
    await page.getByTestId('orientation-continue').click();

    const stimulus = page.getByTestId('stability-stimulus');
    await expect(stimulus).toContainText('Fictional research example · no real money');
    await expect(page.getByTestId('study-common-boundary')).toHaveText('Only the information shown here is being considered. No response is entered or saved on this page.');
    await expect(page.getByTestId('sarah-facts')).toContainText('Sarah already has K6,000 set aside');
    await expect(page.getByTestId('sarah-facts')).toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('course-fee')).toHaveText('The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.');
    await expect(page.getByTestId('sarah-lived-caution')).toHaveCount(0);
    await expect(page.getByTestId('study-hedgr-explanation')).toHaveCount(0);
    await expect(stimulus).not.toContainText(/what can you conclude|in your own words|what would you still need to know|does this change|what changes in your interpretation/i);
    await expect(stimulus.locator('input, textarea, form')).toHaveCount(0);
  });

  test('moves from Sarah’s fee change to attributed Hedgr explanation and a simulation bridge', async ({ page }) => {
    await enterStudy(page);
    const commonBoundary = await page.getByTestId('study-common-boundary').innerText();
    await page.getByTestId('study-continue').click();
    await expect(page.getByRole('heading', { name: 'Sarah’s changed course fee', level: 2 })).toBeFocused();
    await expect(page.getByTestId('sarah-facts')).toContainText('Sarah already has K6,000 set aside');
    await expect(page.getByTestId('sarah-facts')).toContainText('Those contributions have not happened yet');
    await expect(page.getByTestId('course-fee')).toHaveText('The provider now fixes the course fee at K29,500 payable in Zambian kwacha on 1 October 2027, instead of USD 1,000 payable in US dollars.');
    await expect(page.getByTestId('sarah-lived-caution')).toContainText('that currency mismatch no longer applies');
    await expect(page.getByTestId('sarah-lived-caution')).toContainText('remain open');
    await expect(page.getByTestId('study-hedgr-explanation')).toHaveCount(0);

    await page.getByTestId('study-to-hedgr').click();
    const explanation = page.getByTestId('study-hedgr-explanation');
    await expect(explanation.getByRole('heading', { name: 'How Hedgr would put this' })).toBeFocused();
    await expect(explanation.getByTestId('study-attribution')).toHaveText('This is an authored research example for Sarah’s fictional situation. It is not Hedgr reading your money, not Stability Engine output, and not a live financial assessment.');
    await expect(explanation.getByTestId('study-limits')).toHaveText('This example cannot predict the future exchange rate, assume Sarah’s planned contributions will happen, or establish that the course will be fully funded. It is not financial advice.');
    await expect(explanation).toContainText('When the fee is later stated in kwacha instead, that particular currency mismatch no longer applies');
    expect(await page.getByTestId('study-common-boundary').innerText()).toBe(commonBoundary);
    await expect(page.getByTestId('course-fee')).toHaveCount(0);

    await page.getByTestId('study-to-bridge').click();
    await expect(page.getByRole('heading', { name: 'You’ve reached the end of this research example.' })).toBeFocused();
    await expect(page.getByTestId('study-bridge')).toContainText('No real money moves, no account is opened');
    await expect(page.getByTestId('study-simulation-link')).toHaveAttribute('href', '/dashboard-synthetic-journey');
    await expect(page.getByText('Review the introduction')).toBeVisible();
    await expect(page.getByTestId('stability-stimulus')).not.toContainText(/in your own words|what can you conclude|what would you still need to know|does this change|what changes in your interpretation/i);
    await expect(page.getByTestId('stability-stimulus').locator('input, textarea, form')).toHaveCount(0);

    await page.getByTestId('study-simulation-link').click();
    await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
    await expect(page.getByText('Start with a simulated deposit')).toBeVisible();
    await expect(page.getByText('What Hedgr notices')).toHaveCount(0);
    await expect(page.getByTestId('dashboard-add-simulated-deposit')).toBeVisible();
  });

  test('keeps each selected denomination consistent across both beats', async ({ page }) => {
    for (const [currency, prefix, name] of [
      ['ZMW', 'K', 'kwacha'],
      ['KES', 'KES ', 'Kenyan shillings'],
      ['NGN', 'NGN ', 'Nigerian naira'],
      ['GHS', 'GHS ', 'Ghanaian cedis'],
      ['PHP', 'PHP ', 'Philippine pesos'],
    ] as const) {
      await page.goto(studyEntry);
      await page.getByRole('combobox').selectOption(currency);
      await page.getByTestId('orientation-continue').click();
      await expect(page.getByTestId('sarah-facts')).toContainText(`${prefix}6,000`);
      await expect(page.getByTestId('sarah-facts')).toContainText(`${prefix}2,000`);
      await expect(page.getByTestId('course-fee')).toContainText('USD 1,000');
      await page.getByTestId('study-continue').click();
      await expect(page.getByTestId('course-fee')).toContainText(`${prefix}29,500 payable in`);
      await expect(page.getByTestId('sarah-lived-caution')).toContainText(`fee now fixed in ${name}`);
      await page.getByTestId('study-to-hedgr').click();
      await expect(page.getByTestId('study-hedgr-explanation')).toContainText(`Sarah is saving in ${name}`);
      await expect(page.getByTestId('study-hedgr-explanation')).toContainText(`fee is later stated in ${name} instead`);
      await expect(page.getByTestId('study-attribution')).toContainText('not Stability Engine output');
    }
  });

  test('pins the selected denomination even if another tab changes the preference', async ({ page, context }) => {
    await page.goto(studyEntry);
    await page.getByRole('combobox').selectOption('KES');
    await page.getByTestId('orientation-continue').click();
    const otherTab = await context.newPage();
    await otherTab.goto('/orientation');
    await otherTab.getByRole('combobox').selectOption('NGN');
    await expect(page.getByTestId('sarah-facts')).toContainText('KES 6,000');
    await page.getByTestId('study-continue').click();
    await expect(page.getByTestId('course-fee')).toContainText('KES 29,500');
    await page.getByTestId('study-to-hedgr').click();
    await expect(page.getByTestId('study-hedgr-explanation')).toContainText('Kenyan shillings');
    await otherTab.close();
  });

  test('keeps every Continue operable at small width and enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await enterStudy(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (const button of ['study-continue', 'study-to-hedgr', 'study-to-bridge']) {
      await page.getByTestId(button).focus();
      await expect(page.getByTestId(button)).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.getByTestId(button).click();
    }
    await expect(page.getByTestId('study-simulation-link')).toBeVisible();
    for (const width of [320, 390, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
});
