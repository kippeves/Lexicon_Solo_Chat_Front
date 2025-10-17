'use client'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { use, useActionState, useId, useState } from 'react'
import { usePartyRoom } from '@/app/chat/utils/createPartyServer'
import { useChat } from '@/app/contexts/chat-context'
import type { ChatRoomEvent } from '@/app/validators/messages'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'

export default function ChatRoom({
	initData,
}: {
	initData: Promise<ChatRoomEvent[] | undefined>
}) {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const { id } = useParams()
	const initEventData = use(initData)
	const [events, setEvents] = useState<ChatRoomEvent[]>(initEventData ?? [])

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
					<Image
						alt={payload.user.name}
						src={payload.user.avatar}
						height={55}
						width={55}
						priority
						placeholder="blur"
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
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
			)
	}
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str)
