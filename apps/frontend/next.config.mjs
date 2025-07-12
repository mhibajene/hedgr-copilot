// apps/frontend/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next to compile our shared UI package with SWC
  transpilePackages: ['@hedgr/ui'],

  // Optional: allow HMR from your Replit preview URL
  // allowedDevOrigins: ['https://<your-replit-subdomain>.repl.co'],

  // Preserve other flags
  reactStrictMode: true,
  // …images, i18n, env, etc.
};

export default nextConfig;