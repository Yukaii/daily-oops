const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      path: false,
      fs: false,
    }
    return config
  },
  images: {
    unoptimized: true,
    domains: ['hackmd.io', 'i.imgur.com', 'rawcdn.githack.com'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
