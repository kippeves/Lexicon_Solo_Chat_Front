import { type Signal, useSignal } from '@preact/signals-react'
import type PartySocket from 'partysocket'
import usePartySocket from 'partysocket/react'
import { useState } from 'react'
import type { Message } from '@/app/validators/messages'

export type PartyParams = {
	host: string
	token: string
	party: string
	room?: string
	onUpdate: (e: Message) => void
}
export const usePartyRoom = ({
	host,
	token,
	party,
	onUpdate,
	room = 'main',
}: PartyParams): { connected: boolean; ws: PartySocket } => {
	const [connected, setConnected] = useState(false)
	const params = { host, party, room }

	const ws = usePartySocket({
		...params,
		onError(event) {
			console.log({ message: 'error', event })
		},
		onOpen(_event) {
			setConnected(true)
		},
		onMessage(e) {
			const data = JSON.parse(e.data)
			onUpdate(data as Message)
		},
		query: async () => ({
			token,
		}),
	})
	return { connected, ws }
}
