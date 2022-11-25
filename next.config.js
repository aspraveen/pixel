/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3.amazonaws.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
