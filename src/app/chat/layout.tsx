import { UserBadgeClient } from '@/components/user/client-user-badge'
import UserInfo from '@/components/user/user-info'
import ContentGrid from '../components/grids/content-grid'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ContentGrid className="h-dvh grid-rows-[auto_1fr_auto] ">
			<header className="full-width bg-white py-2 shadow-lg">
				<nav className="flex justify-between items-center">
					<h1 className="text-4xl font-bold">Chat</h1>
					<UserBadgeClient />
				</nav>
			</header>
			{children}
			<footer>
				<nav>Footer</nav>
			</footer>
		</ContentGrid>
	)
}
