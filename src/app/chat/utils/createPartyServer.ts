import { useSignal } from '@preact/signals-react'
import usePartySocket from 'partysocket/react'
import type { Message } from '@/app/validators/messages'

type ServerParams = {
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
}: ServerParams) => {
	const connected = useSignal(false)
	const params = { host, party, room }

	usePartySocket({
		...params,
		onError(event) {
			console.log({ message: 'error', event })
		},
		onOpen(_event) {
			connected.value = true
		},
		onMessage(e) {
			onUpdate(JSON.parse(e.data) as Message)
		},
		query: async () => ({
			token,
		}),
	})
	return { connected }
}
