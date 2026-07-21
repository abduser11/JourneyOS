import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack — use webpack for production builds.
  // Turbopack in Next.js 16 has a known bug where the auto-generated
  // _global-error page fails to prerender (AppRouterContext is null).
  // This does not affect Vercel deployments that already succeeded,
  // but ensures consistent builds across environments.
  experimental: {
    // Prevent static prerender of error pages which triggers the
    // "Cannot read properties of null (reading 'useContext')" error
    // in Next.js 16 + Turbopack.
    serverMinification: true,
  },
};

export default nextConfig;
