'use client'
import { useChat } from '@/app/contexts/chat-context'
import type { Message } from '@/app/validators/messages'
import { usePartyServer } from '../utils/createPartyServer'

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
			<div className="flex flex-col">
				<div className="grow bg-white rounded-lg shadow p-4">
					{/* <For each={events} fallback={<p>No Messages</p>}>
						{(item, index) => <div key={index}>{item.data}</div>}
					</For> */}
				</div>
			</div>
		)
	)
}

export default RoomList
