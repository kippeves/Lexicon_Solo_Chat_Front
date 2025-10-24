import type { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { UserBadgeClient } from '@/components/user/client-user-badge';
import ContentGrid from '../components/grids/content-grid';
import Container from '../components/ui/container';
import { ChatProvider } from '../contexts/chat-context';

export default async function RootLayout({
	room,
	users,
}: LayoutProps<'/chat'>) {
	const host = process.env.PARTYKIT;
	if (!host) return notFound();
	return (
		<ContentGrid className="grow h-dvh grid-rows-[auto_1fr_auto] pt-3 space-y-4">
			<header className="rounded-lg p-5 bg-white border-b-2">
				<nav className="flex justify-between items-center ps-4">
					<Link href={'/chat' as Route}>
						<h1 className="text-4xl font-bold">Chat</h1>
					</Link>
					<UserBadgeClient />
				</nav>
			</header>
			<ChatProvider host={host}>
				<div className="grid grid-rows-[1fr_auto] overflow-y-auto p-0 space-y-4">
					<Container className="flex flex-col grow overflow-y-auto">
						{room}
					</Container>
					<Container className="flex gap-4 h-45">{users}</Container>
				</div>
			</ChatProvider>
			<footer />
		</ContentGrid>
	);
}
