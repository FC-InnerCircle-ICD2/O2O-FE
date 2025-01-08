import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    // SVGR 설정을 더 구체적으로 지정
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            dimensions: false,
          },
        },
      ],
    })
    return config
  },
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flexible.img.hani.co.kr',
      },
    ],
  },
}

export default nextConfig
