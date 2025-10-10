import { UserBadgeClient } from '@/components/user/client-user-badge'
import ContentGrid from '../components/grids/content-grid'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ContentGrid className="h-dvh grid-rows-[auto_1fr] space-y-4">
			<header className="full-width bg-white py-2 border-b-2">
				<nav className="flex justify-between items-center">
					<h1 className="text-4xl font-bold">Chat</h1>
					<UserBadgeClient />
				</nav>
			</header>
			{children}
			<footer />
		</ContentGrid>
	)
}
