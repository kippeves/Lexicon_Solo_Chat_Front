'use client';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { use, useActionState, useId, useState } from 'react';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { ChatRoomEvent } from '@/app/validators/messages';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

export default function ChatRoom({
	initData,
}: {
	initData: Promise<ChatRoomEvent[] | undefined>;
}) {
	const { host: hostURI, token } = useChat();
	if (hostURI === undefined) throw 'lol';
	const { id } = useParams();
	const initEventData = use(initData);
	const [events, setEvents] = useState<ChatRoomEvent[]>(initEventData ?? []);

	const action = async (_: unknown, queryData: FormData) => {
		const message = queryData.get('message');
		try {
			ws.send(JSON.stringify({ type: 'user:message', payload: { message } }));
			return { success: true };
		} catch {
			return { success: false };
		}
	};

	const [_, formAction, isPending] = useActionState(action, null);

	const { ws } = usePartyRoom<ChatRoomEvent>({
		host: hostURI,
		token,
		party: 'room',
		room: id?.toString(),
		onUpdate: (e) => setEvents((prev) => [...prev, e]),
	});

	return (
		<article className="h-full flex flex-col gap-4">
			<ul className="grow flex flex-col gap-3">
				{events.map((e, i) => (
					<Message key={i} event={e} />
				))}
			</ul>
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

const Message = ({ event }: { event: ChatRoomEvent }) => {
	const { type, payload } = event;
	switch (type) {
		case 'server:message':
			return (
				<li className="flex gap-4 place-items-center">
					<Image
						alt={payload.user.name}
						src={payload.user.avatar}
						height={55}
						width={55}
						priority
						placeholder="empty"
						className="rounded-full"
					/>
					<div className="flex flex-col justify-evenly">
						<p className="flex gap-2">
							<span>{payload.user.name}</span>
							<span className="font-light text-gray-400">
								{new Date(payload.sent).toLocaleString('sv-SE', {
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</p>
						<p>{payload.message}</p>
					</div>
				</li>
			);
	}
};
