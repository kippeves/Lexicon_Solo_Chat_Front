import { UserBadgeClient } from '@/components/user/client-user-badge'
import ContentGrid from '../components/grids/content-grid'

export default function RootLayout({
	children,
}: Readonly<{
	users: React.ReactNode
	children: React.ReactNode
}>) {
	return (
		<ContentGrid className="h-dvh grid-rows-[auto_1fr] space-y-4">
			<header className="rounded-lg p-5 bg-white border-b-2">
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
