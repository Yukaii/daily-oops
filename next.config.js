const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
  },
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hackmd.io',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'rawcdn.githack.com',
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
