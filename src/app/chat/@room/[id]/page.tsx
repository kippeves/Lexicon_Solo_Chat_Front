'use client'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Pencil } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useActionState, useId, useState } from 'react'
import { useChat } from '@/app/contexts/chat-context'
import type { ChatRoomEvent } from '@/app/validators/messages'
import { Avatar } from '@/components/ui/avatar'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'
import { usePartyRoom } from '../../utils/createPartyServer'

function ChatRoomPage() {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const { id } = useParams()
	const [events, setEvents] = useState<ChatRoomEvent[]>([])

	const action = async (_: unknown, queryData: FormData) => {
		const message = queryData.get('message')
		try {
			ws.send(JSON.stringify({ type: 'user:message', payload: { message } }))
			return { success: true }
		} catch {
			return { success: false }
		}
	}

	const [_, formAction, isPending] = useActionState(action, null)

	const { ws } = usePartyRoom<ChatRoomEvent>({
		host: hostURI,
		token,
		party: 'room',
		room: id?.toString(),
		onUpdate: (e) => setEvents((prev) => [...prev, e]),
	})

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
	)
}

const Message = ({ event }: { event: ChatRoomEvent }) => {
	const { type, payload } = event
	switch (type) {
		case 'server:message':
			return (
				<li className="flex gap-4 place-items-center">
					<Avatar className="h-14 w-auto">
						<AvatarImage src={payload.user.avatar} />
					</Avatar>
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
			)
	}
}

export default ChatRoomPage
