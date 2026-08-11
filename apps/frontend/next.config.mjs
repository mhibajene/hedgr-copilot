/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hedgr/ui'],
  async rewrites() {
    return [
      {
        source: '/dashboard-synthetic-journey',
        destination: '/dashboard?journey=class-a-val-002',
      },
    ];
  },
  webpack: (config) => {
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
