'use client'
import { useChat } from '@/app/contexts/chat-context'
import type { Message } from '@/app/validators/messages'
import { usePartyServer } from '../utils/createPartyServer'
import Container from './container'

function RoomList() {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const handleUpdates = (e: Message) => {
		console.log(e)
	}
	const { connected } = usePartyServer({
		host: hostURI,
		token,
		party: 'rooms',
		onUpdate: handleUpdates,
	})
	return (
		connected && (
			<Container className="flex flex-col">
				{/* <For each={events} fallback={<p>No Messages</p>}>
						{(item, index) => <div key={index}>{item.data}</div>}
					</For> */}
			</Container>
		)
	)
}

export default RoomList
