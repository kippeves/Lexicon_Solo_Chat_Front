'use client';
import { User2 } from 'lucide-react';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createRoom } from '@/app/chat/actions';
import Create from '@/app/components/create-or-join';
import ContentGrid from '@/app/components/grids/content-grid';
import Loader from '@/app/components/ui/loader';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { LobbyServerEvent } from '@/app/validators/lobby/server';
import type { LobbyRoom } from '@/app/validators/lobbyroom';
import type { User } from '@/app/validators/users';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

export default function Lobby({ token }: { token: string }) {
	const { replace } = useRouter();
	const { host } = useChat();
	const [creating, setCreating] = useState(false);
	const [rooms, setRooms] = useState<LobbyRoom[]>([]);
	const { connected } = usePartyRoom<LobbyServerEvent>({
		host,
		token,
		party: 'lobby',
		onUpdate: (e) => {
			const { type, payload } = e;
			setRooms((prev) => {
				switch (type) {
					case 'roomlist':
						return [...payload.rooms];
					case 'create':
						return [...prev, payload.room];
					case 'close':
						return prev.filter((room) => room.id !== payload.roomId);
					case 'update':
						return prev.map((room) =>
							room.id === payload.roomId
								? { ...room, users: payload.users }
								: room,
						);
					default:
						return prev;
				}
			});
		},
	});

	async function openRoom() {
		setCreating(true);
		const room = await createRoom();
		if (room) replace(`/chat/${room}`);
	}

	return (
		connected && (
			<ContentGrid className="grow flex flex-col">
				{creating && <Loader text="Creating Room..." />}
				{!creating && (
					<>
						<h2 className="ps-8 py-4 text-4xl font-thin">Rooms</h2>
						<div className="flex flex-wrap gap-4 grow">
							{rooms.map((e, i) => (
								<Link
									href={`/chat/${e.id}` as Route}
									key={i}
									prefetch={false}
									className="h-fit flex gap-4 border rounded-xl px-5 py-4 items-center hover:bg-gray-100"
								>
									<Image
										src={e.createdBy.avatar}
										alt={`Go to ${e.createdBy.name}:s rum`}
										height={50}
										width={50}
										className="rounded-full m-auto"
										priority
									/>
									<div className="flex flex-col gap-2">
										<span>{e.createdBy.name}</span>
										<UserCount users={e.users} />
									</div>
								</Link>
							))}
						</div>
						<Create onCreating={openRoom} />
					</>
				)}
			</ContentGrid>
		)
	);
}

const UserCount = ({ users }: { users: User[] }) => {
	const count = users.length;

	const userCount = () => (
		<div className="flex gap-2">
			{count > 0 && count} <User2 className={cn(!count && 'text-gray-300')} />
		</div>
	);

	return count ? (
		<HoverCard openDelay={250}>
			<HoverCardTrigger asChild className="flex gap-2">
				{userCount()}
			</HoverCardTrigger>
			<HoverCardContent>
				<ol>
					{users.map((u, i) => (
						<li key={i}>{u.name}</li>
					))}
				</ol>
			</HoverCardContent>
		</HoverCard>
	) : (
		userCount()
	);
};
