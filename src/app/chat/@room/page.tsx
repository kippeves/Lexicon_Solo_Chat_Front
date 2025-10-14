'use client'
import { useChat } from '@/app/contexts/chat-context'
import type { Message } from '@/app/validators/messages'
import { usePartyRoom } from '../utils/createPartyServer'

function Lobby() {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const handleUpdates = (e: Message) => {
		console.log(e)
	}
	usePartyRoom({
		host: hostURI,
		token,
		party: 'rooms',
		onUpdate: handleUpdates,
	})
	return <div></div>
}

export default Lobby
