import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'

// Fresh virtual mocks per test (no real packages required)
let ph: { init: ReturnType<typeof vi.fn>; capture: ReturnType<typeof vi.fn> }
let sentry: { init: ReturnType<typeof vi.fn> }

async function loadAnalytics() {
  // Import the SUT AFTER mocks & env are set, so module state reflects current test.
  const mod = await import('../lib/analytics')
  return mod
}

beforeEach(() => {
  ph = { init: vi.fn(), capture: vi.fn() }
  sentry = { init: vi.fn() }

  vi.resetModules()
  vi.clearAllMocks()
  vi.unstubAllEnvs()

  // Client-only gate: make code think it's running in a browser
  ;(globalThis as any).window = {}

  // Provide virtual modules so runtime doesn't try to resolve real packages.
  // Use doMock for dynamic imports to work properly
  vi.doMock('posthog-js', () => ({ default: ph } as any))
  vi.doMock('@sentry/browser', () => ({ default: sentry } as any))
  
  // Reset the initialized state for each test
  vi.resetModules()
})

afterEach(() => {
  // Clean up the window stub to avoid bleed between tests
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete (globalThis as any).window
})

describe('analytics env gating', () => {
  it('no-ops outside dev even if keys are set', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod')
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'ph_test')
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_HOST', 'https://ph.example')
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'dsn_test')

    const { initAnalytics, track } = await loadAnalytics()
    await initAnalytics()
    track('evt')

    expect(ph.init).not.toHaveBeenCalled()
    expect(ph.capture).not.toHaveBeenCalled()
    expect(sentry.init).not.toHaveBeenCalled()
  })

  it('no-ops in dev when keys are missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev')
    // No PostHog/Sentry keys
    const { initAnalytics, track } = await loadAnalytics()
    await initAnalytics()
    track('evt')

    expect(ph.init).not.toHaveBeenCalled()
    expect(ph.capture).not.toHaveBeenCalled()
    expect(sentry.init).not.toHaveBeenCalled()
  })

  it('initializes PostHog in dev when key+host present and captures events', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev')
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'ph_test')
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_HOST', 'https://ph.example')

    const { initAnalytics, track, resetAnalytics } = await loadAnalytics()
    resetAnalytics() // Reset state before test
    await initAnalytics()
    track('evt', { a: 1 })

    expect(ph.init).toHaveBeenCalledTimes(1)
    const [key, opts] = (ph.init as any).mock.calls[0]
    expect(key).toBe('ph_test')
    expect(opts).toMatchObject({
      api_host: 'https://ph.example',
    })
    expect(ph.capture).toHaveBeenCalledWith('evt', { a: 1 })
  })

  it('initializes Sentry in dev when DSN present', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev')
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'dsn_test')

    const { initAnalytics, resetAnalytics } = await loadAnalytics()
    resetAnalytics() // Reset state before test
    
    await initAnalytics()

    expect(sentry.init).toHaveBeenCalledTimes(1)
    expect((sentry.init as any).mock.calls[0][0]).toMatchObject({
      dsn: 'dsn_test',
      tracesSampleRate: 0,
    })
  })
})