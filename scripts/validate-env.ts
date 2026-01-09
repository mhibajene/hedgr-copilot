const ALLOWED_APP_ENVS = ["dev", "stg", "prod"] as const;
type AppEnv = (typeof ALLOWED_APP_ENVS)[number];

function isAllowedAppEnv(v: string | undefined): v is AppEnv {
  return !!v && (ALLOWED_APP_ENVS as readonly string[]).includes(v);
}
function isValidUrl(v: string | undefined): v is string {
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
}

function main() {
  const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV?.trim();
  const API_BASE_URL = process.env.API_BASE_URL?.trim();
  const POSTHOG_KEY = process.env.POSTHOG_KEY?.trim();
  const SENTRY_DSN = process.env.SENTRY_DSN?.trim();

  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isAllowedAppEnv(NEXT_PUBLIC_APP_ENV)) {
    errors.push(`NEXT_PUBLIC_APP_ENV must be one of ${ALLOWED_APP_ENVS.join(", ")}`);
  }
  // API_BASE_URL is validated at runtime when actually used (not at build time)
  if (!POSTHOG_KEY) warnings.push("Optional POSTHOG_KEY not set (analytics disabled)");
  if (!SENTRY_DSN) warnings.push("Optional SENTRY_DSN not set (error reporting disabled)");
  if (!API_BASE_URL) warnings.push("Optional API_BASE_URL not set (will be validated at runtime when used)");

  if (warnings.length) console.warn(warnings.map(w => `[warn] ${w}`).join("\n"));

  if (errors.length) {
    console.error([
      "❌ Frontend env validation failed:",
      ...errors.map(e => ` - ${e}`),
      "",
      "Fix locally:",
      "  doppler setup -p hedgr-copilot -c dev_config_dev",
      "  doppler run -- pnpm dev",
    ].join("\n"));
    process.exit(1);
  }

  console.log("✅ Frontend env validation passed.");
}
main();
