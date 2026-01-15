import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  /* config options here */
  redirects() {
    return [
      {
        source: '/',
        destination: '/landing-page',
        permanent: true
      }
    ]
  },
};

export default nextConfig;
