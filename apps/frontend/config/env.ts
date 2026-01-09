// Frontend env validation & typing (no external deps).
// Required: NEXT_PUBLIC_APP_ENV ∈ {dev,stg,prod}
// Optional: API_BASE_URL (validated at runtime when used), POSTHOG_KEY, SENTRY_DSN

const ALLOWED_APP_ENVS = ["dev", "stg", "prod"] as const;
export type AppEnv = (typeof ALLOWED_APP_ENVS)[number];

export type Env = {
  NEXT_PUBLIC_APP_ENV: AppEnv;
  API_BASE_URL?: string;
  NEXT_PUBLIC_AUTH_MODE?: string;
  NEXT_PUBLIC_BALANCE_FROM_LEDGER?: string;
  NEXT_PUBLIC_FEATURE_COPILOT_ENABLED?: string;
  POSTHOG_KEY?: string;
  SENTRY_DSN?: string;
};

function isAllowedAppEnv(v: string | undefined): v is AppEnv {
  return !!v && (ALLOWED_APP_ENVS as readonly string[]).includes(v);
}

function isValidUrl(v: string | undefined): v is string {
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function warnOptional(key: string) {
  if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
    // eslint-disable-next-line no-console
    console.warn(`[env] Optional key ${key} is not set. Feature will be disabled.`);
  }
}

function buildEnv(from: NodeJS.ProcessEnv): Env {
  const errors: string[] = [];

  const NEXT_PUBLIC_APP_ENV = from.NEXT_PUBLIC_APP_ENV?.trim();
  const API_BASE_URL = from.API_BASE_URL?.trim();
  const NEXT_PUBLIC_AUTH_MODE = from.NEXT_PUBLIC_AUTH_MODE?.trim();
  const NEXT_PUBLIC_BALANCE_FROM_LEDGER = from.NEXT_PUBLIC_BALANCE_FROM_LEDGER?.trim();
  const NEXT_PUBLIC_FEATURE_COPILOT_ENABLED = from.NEXT_PUBLIC_FEATURE_COPILOT_ENABLED?.trim();
  const POSTHOG_KEY = from.POSTHOG_KEY?.trim();
  const SENTRY_DSN = from.SENTRY_DSN?.trim();

  if (!isAllowedAppEnv(NEXT_PUBLIC_APP_ENV)) {
    errors.push(`NEXT_PUBLIC_APP_ENV must be one of ${ALLOWED_APP_ENVS.join(", ")}`);
  }
  // API_BASE_URL is validated at runtime when actually used (not at build time)

  if (errors.length) {
    const help = [
      "Env validation failed for frontend:",
      ...errors.map((e) => ` - ${e}`),
      "",
      "Fix:",
      " - If running locally, ensure Doppler config provides these keys.",
      " - Example:",
      "     doppler setup -p hedgr-copilot -c dev_config_dev",
      "     doppler run -- pnpm dev",
    ].join("\n");
    throw new Error(help);
  }

  if (!POSTHOG_KEY) warnOptional("POSTHOG_KEY");
  if (!SENTRY_DSN) warnOptional("SENTRY_DSN");

  return {
    NEXT_PUBLIC_APP_ENV: NEXT_PUBLIC_APP_ENV as AppEnv,
    ...(API_BASE_URL ? { API_BASE_URL } : {}),
    ...(NEXT_PUBLIC_AUTH_MODE ? { NEXT_PUBLIC_AUTH_MODE } : {}),
    ...(NEXT_PUBLIC_BALANCE_FROM_LEDGER ? { NEXT_PUBLIC_BALANCE_FROM_LEDGER } : {}),
    ...(NEXT_PUBLIC_FEATURE_COPILOT_ENABLED ? { NEXT_PUBLIC_FEATURE_COPILOT_ENABLED } : {}),
    ...(POSTHOG_KEY ? { POSTHOG_KEY } : {}),
    ...(SENTRY_DSN ? { SENTRY_DSN } : {}),
  };
}

/**
 * Get and validate API_BASE_URL at runtime.
 * Call this function when making API calls that require API_BASE_URL.
 * 
 * @throws Error if API_BASE_URL is missing or invalid
 * @returns Valid API_BASE_URL string
 */
export function getApiBaseUrl(): string {
  const apiBaseUrl = env.API_BASE_URL || process.env.API_BASE_URL?.trim();
  
  if (!apiBaseUrl) {
    throw new Error(
      'API_BASE_URL is required but not set. ' +
      'Set it in your environment or Doppler config. ' +
      'Example: API_BASE_URL=http://localhost:3000'
    );
  }
  
  if (!isValidUrl(apiBaseUrl)) {
    throw new Error(
      `API_BASE_URL must be a valid http(s) URL, got: ${apiBaseUrl}`
    );
  }
  
  return apiBaseUrl;
}

/**
 * Check if Copilot feature is enabled.
 * Requires explicit 'true' value to be enabled.
 */
export function isCopilotEnabled(): boolean {
  return env.NEXT_PUBLIC_FEATURE_COPILOT_ENABLED === 'true';
}

export const env: Env = buildEnv(process.env);
export const _buildEnvFor = buildEnv;
