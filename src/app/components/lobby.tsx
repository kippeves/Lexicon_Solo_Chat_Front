'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { createRoom } from '@/app/chat/actions'
import { usePartyRoom } from '@/app/chat/utils/createPartyServer'
import CreateOrJoin from '@/app/components/create-or-join'
import Loader from '@/app/components/ui/loader'
import { useChat } from '@/app/contexts/chat-context'
import type { LobbyMessage, LobbyRoom } from '@/app/validators/lobby'

export default function Lobby({
	task,
}: {
	task: Promise<LobbyRoom[] | undefined>
}) {
	const { replace } = useRouter()
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const [creating, setCreating] = useState(false)
	const initValues = use(task)
	useEffect(() => {
		console.log(initValues)
	}, [initValues])
	const [rooms, setRooms] = useState<LobbyRoom[]>(initValues ?? [])
	const [events, setEvents] = useState<LobbyMessage[]>([])
	const { connected } = usePartyRoom<LobbyMessage>({
		host: hostURI,
		token,
		party: 'lobby',
		onUpdate: (newEvent) => {
			setEvents((prev) => [...prev, newEvent])
		},
	})

	async function openRoom() {
		setCreating(true)
		await createRoom().then((id) => replace(`/chat/${id}`))
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
	)
}
