import { Suspense } from 'react'
import { loadEvents } from '@/app/chat/actions'
import ChatRoom from '@/app/components/chat-room'
import Loader from '@/app/components/ui/loader'

async function ChatRoomPage({ params }: PageProps<'/chat/[id]'>) {
	const { id } = await params
	const events = loadEvents(id)
	return (
		<Suspense fallback={<Loader />}>
			<ChatRoom initData={events} />
		</Suspense>
	)
}

export default ChatRoomPage
