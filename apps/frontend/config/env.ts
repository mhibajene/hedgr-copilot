// Frontend env validation & typing (no external deps).
// Required: NEXT_PUBLIC_APP_ENV ∈ {dev,stg,prod}, API_BASE_URL (valid URL)
// Optional: POSTHOG_KEY, SENTRY_DSN

const ALLOWED_APP_ENVS = ["dev", "stg", "prod"] as const;
export type AppEnv = (typeof ALLOWED_APP_ENVS)[number];

export type Env = {
  NEXT_PUBLIC_APP_ENV: AppEnv;
  API_BASE_URL: string;
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
  const POSTHOG_KEY = from.POSTHOG_KEY?.trim();
  const SENTRY_DSN = from.SENTRY_DSN?.trim();

  if (!isAllowedAppEnv(NEXT_PUBLIC_APP_ENV)) {
    errors.push(`NEXT_PUBLIC_APP_ENV must be one of ${ALLOWED_APP_ENVS.join(", ")}`);
  }
  if (!isValidUrl(API_BASE_URL)) {
    errors.push("API_BASE_URL must be a valid http(s) URL");
  }

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
    API_BASE_URL: API_BASE_URL as string,
    ...(POSTHOG_KEY ? { POSTHOG_KEY } : {}),
    ...(SENTRY_DSN ? { SENTRY_DSN } : {}),
  };
}

export const env: Env = buildEnv(process.env);
export const _buildEnvFor = buildEnv;
