import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    // Universal-link association files must be served as JSON. Without the
    // explicit content type iOS and Android refuse them, which silently breaks
    // deep links — and therefore referral installs. These replace the headers
    // block that used to live in vercel.json.
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ];
  },
};

export default nextConfig;
