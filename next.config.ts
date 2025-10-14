import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	typedRoutes: true,
	env: {
		KINDE_SITE_URL:
			process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
		KINDE_POST_LOGOUT_REDIRECT_URL:
			process.env.KINDE_POST_LOGOUT_REDIRECT_URL ??
			`https://${process.env.VERCEL_URL}`,
		KINDE_POST_LOGIN_REDIRECT_URL:
			process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
			`https://${process.env.VERCEL_URL}/chat`,
	},
	images: {
		minimumCacheTTL: 604800, // 7 days
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/a/**',
			},
			{
				protocol: 'https',
				hostname: 'https://cdn.discordapp.com',
				port: '',
				pathname: '/avatars/**',
			},
		],
	},
}

export default nextConfig
