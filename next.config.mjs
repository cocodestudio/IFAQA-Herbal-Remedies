import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  reactStrictMode: false,
  transpilePackages: [
    'firebase',
    '@firebase/app',
    '@firebase/auth',
    '@firebase/firestore',
    '@firebase/storage',
    '@firebase/component',
    '@firebase/util',
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      const firebaseStub = path.join(__dirname, 'lib/firebase-ssr-stub.mjs');
      config.resolve.alias = {
        ...config.resolve.alias,
        'firebase/app': firebaseStub,
        'firebase/auth': firebaseStub,
        'firebase/firestore': firebaseStub,
        'firebase/storage': firebaseStub,
      };
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
