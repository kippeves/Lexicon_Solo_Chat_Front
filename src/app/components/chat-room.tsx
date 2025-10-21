'use client';
import { LockKeyhole, Pencil, Trash2 } from 'lucide-react';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { sendMessage } from '@/app/chat/actions';
import { Message } from '@/app/components/ui/message';
import { useChat } from '@/app/contexts/chat-context';
import { usePartyRoom } from '@/app/hooks/usePartyRoom';
import type { ChatRoomInitData } from '@/app/validators/chatroom/initdata';
import type { ChatRoomClientMessage } from '@/app/validators/chatroom/message/client';
import type { ChatRoomMessageServer } from '@/app/validators/chatroom/message/server';
import type { ChatRoomServerEvent } from '@/app/validators/chatroom/server';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

export default function ChatRoom({
	id,
	data,
	isCreator,
}: {
	id: string;
	data: ChatRoomInitData;
	isCreator: boolean;
}) {
	const hostParams = useChat();
	const [messages, setMessages] = useState<ChatRoomMessageServer[]>(
		data?.messages ?? [],
	);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const init: ChatRoomClientMessage = { type: 'init', roomId: id };

	const scrollToBottom = () =>
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

	// biome-ignore lint/correctness/useExhaustiveDependencies: It's necessary.
	useEffect(scrollToBottom, [messages]);

	const groupedMessages = useMemo(() => {
		return messages
			? Object.groupBy(messages, (m) =>
					new Date(m.sent).toLocaleDateString('sv-SE', {
						month: 'long',
						day: '2-digit',
						year: 'numeric',
					}),
				)
			: [];
	}, [messages]);

	const message = async (
		_: ChatRoomClientMessage,
		data: FormData,
	): Promise<ChatRoomClientMessage> => {
		return sendMessage(init, data).then((s) => {
			switch (s.type) {
				case 'error':
					return s;
				case 'init':
				case 'return': {
					return init;
				}
			}
		});
	};

	const [_, formAction, isPending] = useActionState(message, init);
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
					setMessages((prev) => {
						const newMessage = item.payload;
						const insertIndex = prev.findIndex(
							(msg) => new Date(msg.sent) > new Date(newMessage.sent),
						);
						return insertIndex === -1
							? [...prev, newMessage]
							: [
									...prev.slice(0, insertIndex),
									newMessage,
									...prev.slice(insertIndex),
								];
					});
					break;
			}
		},
	});

	const clear = () => ws.send(JSON.stringify({ type: 'clear' }));

	return (
		<article className="h-full flex flex-col gap-4 relative">
			<section className="grow overflow-y-auto">
				{Object.entries(groupedMessages).map(([date, msgs]) => (
					<div key={date} className="mb-4">
						<div className="sticky top-0 bg-white text-center text-gray-600">
							<span className="text-lg font-extrabold">{date}</span>
						</div>
						<ul className="flex flex-col gap-3 py-2">
							{msgs?.map((msg, i) => (
								<Message key={`${date}-${i}`} item={msg} />
							))}
						</ul>
					</div>
				))}
				<div ref={messagesEndRef} />
			</section>
			<section className="flex gap-2">
				<form className="grow" action={formAction}>
					<InputGroup className="gap-2 " aria-disabled={isPending}>
						<InputGroupInput
							placeholder="Message in channel"
							name="message"
							autoFocus
						/>
						<InputGroupAddon className="hover:cursor-default">
							<Pencil />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">
							<InputGroupButton
								className="hover:cursor-pointer "
								disabled={isPending}
								variant={'outline'}
								type="submit"
							>
								Send
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</form>
				{isCreator && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-lg bg-transparent"
							>
								<LockKeyhole className="h-5 w-5" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" side="top" sideOffset={10}>
							<DropdownMenuItem onClick={clear}>
								<Trash2 className="mr-2 h-4 w-4" />
								Clear Messages
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</section>
		</article>
	);
}
