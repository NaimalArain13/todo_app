import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const config = async (phase) => {
  /** @type {import("next").NextConfig} */
  const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { dev, isServer }) => {
      // Configure webpack for Service Worker builds
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }
      
      // Use source-map instead of eval-source-map for Service Worker builds
      if (dev) {
        config.devtool = 'source-map';
      }
      
      return config;
    }
  };

  // Temporarily disable Serwist plugin to use our simple Service Worker
  // const withSerwist = (await import('@serwist/next')).default({
  //   swSrc: 'app/sw.ts',
  //   swDest: 'public/sw.js'
  // });
  
  // return withSerwist(nextConfig);
  return nextConfig;
};

export default config;
