import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UserBadgeClient } from '@/components/user/client-user-badge'
import ContentGrid from '../components/grids/content-grid'
import Container from '../components/ui/container'
import { ChatProvider } from '../contexts/chat-context'

export default async function RootLayout({
	room,
	users,
}: LayoutProps<'/chat'>) {
	const user = getKindeServerSession()
	const token = await user.getIdTokenRaw()
	const host = process.env.PARTYKIT
	if (!(host && token)) return notFound()
	return (
		<ContentGrid className="h-dvh grid-rows-[auto_1fr] pt-3 space-y-4">
			<header className="rounded-lg p-5 bg-white border-b-2">
				<nav className="flex justify-between items-center">
					<Link href={'/chat'}>
						<h1 className="text-4xl font-bold">Chat</h1>
					</Link>
					<UserBadgeClient />
				</nav>
			</header>
			<ChatProvider host={host} token={token}>
				<div className="grid grid-rows-[1fr_auto] p-0 space-y-4">
					<Container className="flex flex-col">{room}</Container>
					<Container className="flex gap-4">{users}</Container>
				</div>
			</ChatProvider>
			<footer />
		</ContentGrid>
	)
}
