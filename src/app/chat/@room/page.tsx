'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createRoom } from '@/app/chat/actions'
import CreateOrJoin from '@/app/components/create-or-join'
import Loader from '@/app/components/ui/loader'
import { useChat } from '@/app/contexts/chat-context'
import type { LobbyMessage } from '@/app/validators/lobby'
import { usePartyRoom } from '../utils/createPartyServer'

function Lobby() {
	const { replace } = useRouter()
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const [creating, setCreating] = useState(false)
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
				<ul>
					{events.map((e, i) => (
						<li key={i}>{JSON.stringify(e.payload)}</li>
					))}
				</ul>
				<CreateOrJoin onCreating={openRoom} />
			</article>
		)
	)
}

export default Lobby
