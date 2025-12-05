import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/image/**',
      },
      {
        pathname: '/api/**',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      '*.yaml': {
        loaders: ['yaml-loader'],
        as: '*.json',
      },
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.json',
      },
    },
  },
}

export default nextConfig
