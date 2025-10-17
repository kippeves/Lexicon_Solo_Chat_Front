'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { use, useState } from 'react';
import { usePartyRoom } from '@/app/chat/utils/createPartyServer';
import { useChat } from '@/app/contexts/chat-context';
import type { Presence, User } from '@/app/validators/users';

export default function UserList({
	task,
}: {
	task: Promise<User[] | undefined>;
}) {
	const { id } = useParams();
	const serverParams = useChat();
	const initUsers = use(task);
	const [users, setUsers] = useState<User[]>(initUsers ?? []);

	usePartyRoom<Presence>({
		...serverParams,
		party: 'users',
		room: id?.toString() ?? 'main',
		onUpdate: ({ type, payload }) => {
			if (type === 'presence') setUsers(payload.users);
		},
	});

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
