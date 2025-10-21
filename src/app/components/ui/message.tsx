import Image from 'next/image';
import { memo } from 'react';
import type { ChatRoomMessageServer } from '@/app/validators/chatroom/message/server';

export const Message = memo(({ item }: { item: ChatRoomMessageServer }) => {
	const { message, sent, user } = item;

	return (
		<li className="flex gap-4 place-items-center p-2 hover:bg-gray-50">
			<Image
				alt={user.name}
				src={user.avatar}
				height={55}
				width={55}
				priority={false}
				placeholder="empty"
				className="rounded-full"
			/>
			<div className="flex flex-col justify-evenly">
				<p className="flex gap-2">
					<span className="font-medium">{user.name}</span>
					<span className="font-light text-gray-400">
						{new Date(sent).toLocaleTimeString('sv-SE', {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</p>
				<p>{message}</p>
			</div>
		</li>
	);
});

Message.displayName = 'Message';
