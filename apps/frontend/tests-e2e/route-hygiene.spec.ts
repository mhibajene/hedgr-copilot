import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//i.test(url)) {
      return route.continue();
    }
    return route.abort();
  });
});

test('root and legacy trust paths resolve to current destinations', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: /log in/i })).toBeVisible();

  await page.goto('/docs/trust');
  await expect(page).toHaveURL(/\/settings\/trust$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'About this simulation' })
  ).toBeVisible();
  await expect(page.getByText('Who holds my funds?')).toHaveCount(0);
  await expect(page.getByTestId('environment-badge')).toHaveCount(0);
});

test('synthetic Trust navigation keeps the research boundary intact', async ({
  page,
}) => {
  await page.goto('/dashboard-synthetic-journey');

  const simulationDetails = page.getByTestId('simulation-technical-details');
  await simulationDetails.locator(':scope > summary').click();
  const trustLink = simulationDetails.getByRole('link', {
    name: 'Learn more',
    exact: true,
  });
  await expect(trustLink).toHaveAttribute(
    'href',
    '/settings/trust?journey=class-a-val-002'
  );

  await trustLink.click();
  await expect(page).toHaveURL(
    /\/settings\/trust\?journey=class-a-val-002$/
  );
  const backToSettings = page.getByRole('link', {
    name: 'Back to Settings',
    exact: true,
  });
  await expect(backToSettings).toHaveAttribute(
    'href',
    '/settings?journey=class-a-val-002'
  );

  await backToSettings.click();
  await expect(page).toHaveURL(/\/settings\?journey=class-a-val-002$/);
  await expect(
    page.getByRole('link', { name: 'About Hedgr', exact: true })
  ).toHaveCount(0);
});

test('retired prototype and DeFi API routes return not found', async ({
  request,
}) => {
  const retiredPaths = [
    '/prototype',
    '/prototype/retail-dashboard',
    '/prototype/synthetic-withdrawal',
    '/api/defi',
  ];

  for (const path of retiredPaths) {
    const response = await request.get(path);
    expect(response.status(), `${path} should be retired`).toBe(404);
  }
});

test('governed synthetic journey entries remain available', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
  await expect(
    page
      .getByTestId('dashboard-balance')
      .getByText('Your current position', { exact: true })
  ).toBeVisible();

  await page.goto('/dashboard?journey=class-a-val-002');
  await expect(page).toHaveURL(/\/dashboard\?journey=class-a-val-002$/);
  await expect(
    page
      .getByTestId('dashboard-balance')
      .getByText('Your current position', { exact: true })
  ).toBeVisible();
});
