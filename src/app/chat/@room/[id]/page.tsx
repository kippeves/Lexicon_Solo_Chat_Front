'use client'
import { useParams } from 'next/navigation'
import { useChat } from '@/app/contexts/chat-context'
import type { Message } from '@/app/validators/messages'
import { usePartyRoom } from '../../utils/createPartyServer'

function ChatRoomPage() {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const { id } = useParams()

	const handleUpdates = (e: Message) => {
		console.log(e)
	}
	usePartyRoom({
		host: hostURI,
		token,
		party: 'room',
		room: id?.toString(),
		onUpdate: handleUpdates,
	})
	return <div>{id}</div>
}

export default ChatRoomPage
