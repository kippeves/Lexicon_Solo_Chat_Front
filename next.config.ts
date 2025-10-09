import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		minimumCacheTTL: 604800, // 7 days
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
		],
	},
}

export default nextConfig
