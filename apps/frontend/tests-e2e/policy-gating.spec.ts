import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Mock policy payloads (must match ResolvedPolicy schema from lib/policy/schema.ts)
// ---------------------------------------------------------------------------

const SHARED_POLICY_FIELDS = {
  limits: { maxDepositUSD: 10_000, maxWithdrawUSD: 5_000, maxSingleTransferUSD: 2_500 },
  settlement: { localCurrencyFirst: false, localCurrency: 'USD' },
  fx: { requireProvenance: true, requiredFields: ['source', 'timestamp'] },
  disclosures: { requiredKeys: ['risk-warning', 'not-a-bank'] },
  bannedClaims: ['guaranteed-returns', 'fdic-insured', 'risk-free'],
};

/** UNKNOWN market — earn disabled */
const POLICY_EARN_OFF = {
  version: 'v1' as const,
  market: 'UNKNOWN' as const,
  resolvedAt: '2026-01-01T00:00:00.000Z',
  policy: {
    features: { earn: false, earnMode: 'off' as const, payLinks: false, stablecoinSend: false },
    ...SHARED_POLICY_FIELDS,
  },
};

/** KE market — earn enabled */
const POLICY_EARN_ON = {
  version: 'v1' as const,
  market: 'KE' as const,
  resolvedAt: '2026-01-01T00:00:00.000Z',
  policy: {
    features: { earn: true, earnMode: 'pilot' as const, payLinks: false, stablecoinSend: false },
    ...SHARED_POLICY_FIELDS,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

async function clearAppStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    window.localStorage.clear();
  });
}

async function loginAndGoToDashboard(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
    return route.continue();
  });

  await page.goto('/');
  await clearAppStorage(page);
  await page.reload();
  await clearAppStorage(page);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Dashboard policy gating', () => {
  test('earn tile is hidden when policy returns earn=false', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_OFF) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toHaveCount(0);
  });

  test('earn tile is visible when policy returns earn=true', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_ON) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toBeVisible();
  });

  test('earn tile is hidden when policy fetch fails', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'simulated failure' }) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Navigation policy gating (MC2-3)
//
// Gated nav links use a `shipped` flag — routes that don't exist yet are
// hidden regardless of policy. These tests confirm the deny-by-default
// behaviour: gated links must never leak into the nav while unshipped.
// ---------------------------------------------------------------------------

test.describe('Navigation policy gating', () => {
  test('gated nav links are hidden when policy disallows feature', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_OFF) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });

  test('gated nav links stay hidden even when policy allows feature (route unshipped)', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_ON) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });

  test('gated nav links are hidden when policy fetch fails', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'simulated failure' }) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });
});

// §384: these literals are independent of the runtime copy constant.
const S18_TITLE = 'Example annual yield (APY)';
const S18_QUALIFIER = 'Illustrative example values, not live targets or advice';

async function s18HermeticEarnPolicy(page: import('@playwright/test').Page) {
  await page.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.route('**/api/policy', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_ON) }));
}

async function expectS18BrowserLock(page: import('@playwright/test').Page) {
  const tile = page.getByTestId('dashboard-earn-tile');
  await expect(tile).toBeVisible();
  const title = tile.getByText(S18_TITLE, { exact: true });
  const qualifier = tile.getByText(S18_QUALIFIER, { exact: true });
  const value = tile.getByText('5.00%', { exact: true });
  for (const part of [title, qualifier, value]) {
    await expect(part).toHaveCount(1);
    await expect(part).toBeVisible();
  }
  await expect(tile.getByText('Return rate (context)', { exact: true })).toHaveCount(0);
  expect(await tile.ariaSnapshot()).toBe(`- text: ${S18_TITLE}\n- text: ${S18_QUALIFIER}\n- text: 5.00%`);
  const geometry = await tile.evaluate((element, copy) => {
    const children = Array.from(element.children) as HTMLElement[];
    return {
      text: children.map(child => child.textContent?.trim()),
      ordered: children.every((child, i) => i === 0 || !!(children[i - 1].compareDocumentPosition(child) & Node.DOCUMENT_POSITION_FOLLOWING)),
      exposed: children.every(child => {
        for (let node: HTMLElement | null = child; node && element.contains(node); node = node.parentElement) {
          const style = getComputedStyle(node);
          if (node.matches('[hidden], [inert], [aria-hidden="true"]') || style.display === 'none' || style.visibility === 'hidden' || style.order !== '0' || style.flexDirection.includes('reverse')) return false;
        }
        return true;
      }),
      // Check text fragments, not only boxes: wrapping must remain inside tile.
      contained: children.every(child => {
        const range = document.createRange(); range.selectNodeContents(child);
        const box = element.getBoundingClientRect();
        return Array.from(range.getClientRects()).every(rect => rect.left >= box.left && rect.right <= box.right && rect.top >= box.top && rect.bottom <= box.bottom);
      }),
      rootFontSize: getComputedStyle(document.documentElement).fontSize,
      lock: copy,
    };
  }, [S18_TITLE, S18_QUALIFIER, '5.00%']);
  expect(geometry.text).toEqual(geometry.lock);
  expect(geometry.ordered).toBe(true);
  expect(geometry.exposed).toBe(true);
  expect(geometry.contained).toBe(true);
  return geometry;
}

test('S18 visible default Home earn tile keeps the exact lock and reading order', async ({ page }) => {
  await s18HermeticEarnPolicy(page);
  await loginAndGoToDashboard(page);
  for (const [width, height, rootFontSize] of [[1440, 1000, '16px'], [390, 844, '16px'], [320, 900, '32px']] as const) {
    await page.setViewportSize({ width, height });
    await page.evaluate(size => { document.documentElement.style.fontSize = size; }, rootFontSize);
    await page.getByTestId('dashboard-earn-tile').scrollIntoViewIfNeeded();
    const geometry = await expectS18BrowserLock(page);
    expect(geometry.rootFontSize).toBe(rootFontSize);
    const box = await page.getByTestId('dashboard-earn-tile').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    await test.info().attach(`s18-${width}-${rootFontSize}`, { body: await page.getByTestId('dashboard-earn-tile').screenshot(), contentType: 'image/png' });
  }
});

test('S18 journeys hide the earn tile even when earn is enabled', async ({ page }) => {
  await s18HermeticEarnPolicy(page);
  await loginAndGoToDashboard(page);
  for (const route of ['/dashboard?journey=class-a-val-002', '/dashboard-synthetic-journey']) {
    for (const example of ['own', 'daniel', 'sarah']) {
      await page.goto(`${route}${route.includes('?') ? '&' : '?'}example=${example}`);
      await expect(page.getByRole('combobox', { name: 'Choose an example' })).toHaveValue(example);
      await expect(page.getByTestId('dashboard-earn-tile')).toHaveCount(0);
    }
  }
  await page.goto('/dashboard');
  await expectS18BrowserLock(page);
});
