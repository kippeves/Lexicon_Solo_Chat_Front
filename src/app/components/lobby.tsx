'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { createRoom } from '@/app/chat/actions';
import CreateOrJoin from '@/app/components/create-or-join';
import Loader from '@/app/components/ui/loader';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { LobbyMessage, LobbyRoom } from '@/app/validators/lobby';

export default function Lobby({
	task,
}: {
	task: Promise<LobbyRoom[] | undefined>;
}) {
	const { replace } = useRouter();
	const { host: hostURI, token } = useChat();
	if (hostURI === undefined) throw 'lol';
	const [creating, setCreating] = useState(false);
	const initValues = use(task);
	const [rooms, setRooms] = useState<LobbyRoom[]>(initValues ?? []);
	const { connected } = usePartyRoom<LobbyMessage>({
		host: hostURI,
		token,
		party: 'lobby',
		onUpdate: ({ type, payload }) => {
			setRooms((prev) => {
				switch (type) {
					case 'create':
						return [...prev, payload];
					case 'close':
						return prev.filter((room) => room.id !== payload.roomId);
					case 'join': {
						const { roomId, user } = payload;
						return prev.map((room) =>
							room.id === roomId
								? { ...room, users: [...room.users, user] }
								: room,
						);
					}
					case 'leave': {
						const { id: userId, roomId } = payload;
						return prev.map((room) =>
							room.id === roomId
								? {
										...room,
										users: room.users.filter((u) => u.id !== userId),
									}
								: room,
						);
					}
					default:
						return prev;
				}
			});
		},
	});

	async function openRoom() {
		setCreating(true);
		await createRoom().then((id) => replace(`/chat/${id}`));
	}

	return (
		connected && (
			<article className="grow flex flex-col justify-between">
				{creating && <Loader text="Creating Room..." />}
				<section className="flex flex-wrap  grow gap-3">
					{rooms.map((e, i) => (
						<Link key={i} href={`/chat/${e.id}`}>
							<Image
								src={e.createdBy.avatar}
								alt={`Go to ${e.createdBy.name}:s rum`}
								height={200}
								width={200}
								className="rounded-full"
								priority
							/>
						</Link>
					))}
				</section>
				<CreateOrJoin onCreating={openRoom} />
			</article>
		)
	);
}
