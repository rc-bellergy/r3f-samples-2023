/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: "akamai",
    path: "/",
  }
}

module.exports = nextConfig
