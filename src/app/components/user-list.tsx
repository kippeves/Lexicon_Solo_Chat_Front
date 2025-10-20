'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useChat } from '@/app/contexts/chat-context';
import { type PartyParams, usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { Presence, User } from '@/app/validators/users';

export default function UserList({ id }: { id?: string }) {
	const serverParams = useChat();
	const [users, setUsers] = useState<User[]>([]);

	const params: PartyParams<Presence> = {
		...serverParams,
		party: 'users',
		room: id?.toString() ?? 'main',
		onUpdate: ({ payload }) => setUsers(payload.users),
	};

	usePartyRoom<Presence>(params);

	return (
		<>
			{users.map((item) => (
				<figure
					key={item.id}
					className="flex flex-col items-center gap-2 w-25 text-center "
				>
					<Image
						src={item.avatar}
						alt={item.name}
						width={96}
						height={96}
						placeholder="empty"
						className="rounded-md"
						loading="eager"
					/>
					<figcaption>
						<span className="text-wrap">{item.name}</span>
					</figcaption>
				</figure>
			))}
		</>
	);
}
