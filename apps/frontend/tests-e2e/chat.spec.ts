import { test, expect } from '@playwright/test';

// Block analytics and external calls for test hermeticity
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

test.describe('Chat Page', () => {
  test.beforeEach(async ({ context, page }) => {
    // Block analytics
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
      return route.continue();
    });

    // Block all network requests to ensure stub-only behavior
    await context.route('**/*', (route) => {
      const url = route.request().url();
      // Allow same-origin requests for navigation, but block external API calls
      if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
        return route.continue();
      }
      // Block any external API calls
      if (url.includes('/api/chat') || url.includes('openai') || url.includes('anthropic')) {
        return route.abort();
      }
      return route.continue();
    });
  });

  test('navigates to chat page and renders interface', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Navigate to chat
    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

    // Verify chat interface elements
    await expect(page.getByTestId('chat-disclaimer')).toBeVisible();
    await expect(page.getByTestId('chat-input')).toBeVisible();
    await expect(page.getByTestId('chat-send-button')).toBeVisible();
  });

  test('sends message and shows typing indicator', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

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
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

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
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

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
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

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
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByTestId('nav-copilot-link').click();
    await expect(page).toHaveURL(/\/chat/);

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
