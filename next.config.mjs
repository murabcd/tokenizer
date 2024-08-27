/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = ["gpt-3-encoder", ...config.externals];
    }
    return config;
  },
};

export default nextConfig;
