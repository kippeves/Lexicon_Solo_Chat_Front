'use client';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { use, useActionState, useId, useState } from 'react';
import { sendMessage } from '@/app/chat/actions';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { ChatRoomClientMessage } from '@/app/validators/chatroom/message/client';
import type { ChatRoomMessageServer } from '@/app/validators/chatroom/message/server';
import type { ChatRoomServerEvent } from '@/app/validators/chatroom/server';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

export default function ChatRoom({
	id,
	initData,
}: {
	id: string;
	initData: Promise<ChatRoomMessageServer[]>;
}) {
	const hostParams = useChat();
	const [messages, setMessages] = useState<ChatRoomMessageServer[]>(
		use(initData) ?? [],
	);
	const init: ChatRoomClientMessage = { type: 'init', roomId: id };
	const [_, formAction, isPending] = useActionState(sendMessage, init);
	const { ws } = usePartyRoom<ChatRoomServerEvent>({
		...hostParams,
		party: 'room',
		room: id?.toString(),
		onUpdate: (item) => {
			switch (item.type) {
				case 'clear':
					setMessages([]);
					break;
				case 'message':
					setMessages((prev) =>
						[...prev, item.payload].sort((a, b) => {
							return new Date(a.sent).valueOf() - new Date(b.sent).valueOf();
						}),
					);
					break;
			}
		},
	});

	function plonk(): void {
		ws.send(JSON.stringify({ type: 'clear' }));
	}

	return (
		<article className="h-full flex flex-col gap-4">
			<ul className="grow flex flex-col gap-3">
				{messages.map((e, i) => (
					<Message key={i} item={e} />
				))}
			</ul>
			<button type="button" onClick={() => plonk()}>
				Clear
			</button>
			<form action={formAction}>
				<InputGroup className="gap-2" aria-disabled={isPending}>
					<InputGroupInput
						placeholder="Message in channel"
						name="message"
						id={useId()}
						disabled={isPending}
					/>
					<InputGroupAddon>
						<Pencil />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							disabled={isPending}
							size={'sm'}
							variant={'default'}
							type="submit"
						>
							Send
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</form>
		</article>
	);
}

const Message = ({ item }: { item: ChatRoomMessageServer }) => {
	const { message, sent, user } = item;
	return (
		<li className="flex gap-4 place-items-center">
			<Image
				alt={user.name}
				src={user.avatar}
				height={55}
				width={55}
				priority
				placeholder="empty"
				className="rounded-full"
			/>
			<div className="flex flex-col justify-evenly">
				<p className="flex gap-2">
					<span>{user.name}</span>
					<span className="font-light text-gray-400">
						{new Date(sent).toLocaleString('sv-SE', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</p>
				<p>{message}</p>
			</div>
		</li>
	);
};
