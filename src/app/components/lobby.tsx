'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createRoom } from '@/app/chat/actions';
import CreateOrJoin from '@/app/components/create-or-join';
import Loader from '@/app/components/ui/loader';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { LobbyServerEvent } from '@/app/validators/lobby/server';
import type { LobbyRoom } from '@/app/validators/lobbyroom';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

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
						return prev.filter((room) => room.id === payload.roomId);
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
			<article className="grow flex flex-col justify-between">
				{creating && <Loader text="Creating Room..." />}
				<Table>
					<TableBody>
						{rooms.map((e, i) => (
							<TableRow key={i}>
								<TableCell className="font-medium">
									<Image
										src={e.createdBy.avatar}
										alt={`Go to ${e.createdBy.name}:s rum`}
										height={50}
										width={50}
										className="rounded-full"
										priority
									/>
								</TableCell>
								<TableCell>{e.createdBy.name}</TableCell>
								<TableCell>
									{e.users.length ? `${e.users.length} användare` : 'Tomt'}
								</TableCell>
								<TableCell>
									<Link href={`/chat/${e.id}`}>Join Room</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<CreateOrJoin onCreating={openRoom} />
			</article>
		)
	);
}
