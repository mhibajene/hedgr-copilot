/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hedgr/ui'],
  webpack: (config, { isServer }) => {
    // Handle optional analytics modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'posthog-js': false,
      '@sentry/browser': false,
    };
    return config;
  },
};
export default nextConfig;