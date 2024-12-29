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
}

export default nextConfig
