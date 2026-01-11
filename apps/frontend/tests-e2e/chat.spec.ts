import { test, expect, Page } from '@playwright/test';

// Block analytics + external calls for test hermeticity (allow local app traffic)
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

// Stable viewport dimensions to eliminate responsive variance in CI
const VIEWPORT = { width: 1280, height: 720 };

// ============================================================================
// Test Helpers - DRY login/navigation logic
// ============================================================================

/** Complete login flow and navigate directly to chat page */
async function loginAndGoToChat(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Wait for auth to complete (redirects to dashboard)
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  
  // Navigate directly to chat - no nav dependency
  await page.goto('/chat');
  await expect(page).toHaveURL(/\/chat/, { timeout: 10_000 });
}

/** Complete login and wait for dashboard to be ready */
async function loginAndWaitForDashboardReady(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  await expect(page.getByTestId('app-nav')).toBeVisible({ timeout: 10_000 });
}

// ============================================================================
// Test Suite
// ============================================================================

test.describe('Chat Page', () => {
  test.beforeEach(async ({ page, context }) => {
    // Pin viewport to eliminate responsive variance in CI
    await page.setViewportSize(VIEWPORT);

    // Block analytics + external calls for test hermeticity (allow local app traffic)
    await context.route('**/*', (route) => {
      const url = route.request().url();

      // 1) Block analytics / telemetry (hermetic)
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();

      // 2) Allow local app requests (Next assets, navigation, same-origin APIs)
      const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//i.test(url);
      if (isLocalOrigin) {
        // Block Copilot chat API to ensure stub-only behavior
        if (url.includes('/api/chat')) return route.abort();
        return route.continue();
      }

      // 3) Block any external calls (OpenAI/Anthropic/etc.)
      return route.abort();
    });
  });

  test('renders chat interface', async ({ page }) => {
    await loginAndGoToChat(page);

    // Verify chat interface elements
    await expect(page.getByTestId('chat-disclaimer')).toBeVisible();
    await expect(page.getByTestId('chat-input')).toBeVisible();
    await expect(page.getByTestId('chat-send-button')).toBeVisible();
  });

  test('sends message and shows typing indicator', async ({ page }) => {
    await loginAndGoToChat(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Verify user message appears
    const userMessage = page.getByTestId('chat-message-user').first();
    await expect(userMessage).toBeVisible({ timeout: 2000 });
    await expect(userMessage).toContainText('hedgr');

    // Verify typing indicator appears
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });
  });

  test('shows assistant reply after typing', async ({ page }) => {
    await loginAndGoToChat(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Wait for typing indicator
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });

    // Wait for assistant reply (stub has 500-1500ms delay)
    const assistantMessage = page.getByTestId('chat-message-assistant').first();
    await expect(assistantMessage).toBeVisible({ timeout: 3000 });
    await expect(assistantMessage).toContainText('Hedgr is a savings platform');
  });

  test('disclaimer is always visible', async ({ page }) => {
    await loginAndGoToChat(page);

    // Verify disclaimer is visible
    const disclaimer = page.getByTestId('chat-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('Hedgr Copilot is for educational support only');
    await expect(disclaimer).toContainText('Not financial advice');

    // Send a message
    await page.getByTestId('chat-input').fill('test');
    await page.getByTestId('chat-send-button').click();

    // Verify disclaimer is still visible after sending message
    await expect(disclaimer).toBeVisible();
  });

  test('shows offline banner when network is offline', async ({ page, context }) => {
    await loginAndGoToChat(page);

    // Simulate offline
    await context.setOffline(true);

    // Verify offline banner appears
    await expect(page.getByTestId('chat-offline-banner')).toBeVisible({ timeout: 2000 });
    await expect(page.getByTestId('chat-offline-banner')).toContainText('offline');

    // Simulate online
    await context.setOffline(false);

    // Verify offline banner disappears
    await expect(page.getByTestId('chat-offline-banner')).not.toBeVisible({ timeout: 2000 });
  });

  test('handles multiple messages', async ({ page }) => {
    await loginAndGoToChat(page);

    // Send first message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').first()).toBeVisible({ timeout: 3000 });

    // Send second message
    await page.getByTestId('chat-input').fill('How do I save?');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').last()).toBeVisible({ timeout: 3000 });

    // Verify both messages are present
    const userMessages = page.getByTestId('chat-message-user');
    const assistantMessages = page.getByTestId('chat-message-assistant');
    await expect(userMessages).toHaveCount(2);
    await expect(assistantMessages).toHaveCount(2);
  });
});

// ============================================================================
// Navigation Test Suite (isolated) - verifies nav link presence
// If this fails, investigate: feature flag, env gating, or test ID changes
// ============================================================================

test.describe('Navigation - Copilot Link', () => {
  test.beforeEach(async ({ page, context }) => {
    // Pin viewport to eliminate responsive variance
    await page.setViewportSize(VIEWPORT);

    // Block analytics only (allow all local traffic for nav test)
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
      return route.continue();
    });
  });

  test('Copilot nav link is visible on dashboard', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);

    // Look for at least one visible Copilot link in the nav
    const copilotLinks = page.getByTestId('nav-copilot-link');
    const linkCount = await copilotLinks.count();

    // If no links exist at all, fail with actionable message
    if (linkCount === 0) {
      // Dump nav HTML for debugging
      const nav = page.getByTestId('app-nav');
      const navHtml = await nav
        .evaluate((el) => (el instanceof HTMLElement ? el.innerHTML : ''))
        .catch(() => '<unable to read nav>');

      throw new Error(
        `No nav-copilot-link elements found. This may indicate:\n` +
          `  - Feature flag is disabled for test@hedgr.app in CI\n` +
          `  - data-testid="nav-copilot-link" was renamed\n` +
          `  - Copilot feature is not enabled in current environment\n\n` +
          `Nav HTML (truncated):\n${navHtml.slice(0, 2000)}`,
      );
    }

    // Check if at least one is visible
    let anyVisible = false;
    for (let i = 0; i < linkCount; i++) {
      const visible = await copilotLinks.nth(i).isVisible().catch(() => false);
      if (visible) {
        anyVisible = true;
        break;
      }
    }

    expect(anyVisible, 'At least one nav-copilot-link should be visible').toBe(true);
  });
});
