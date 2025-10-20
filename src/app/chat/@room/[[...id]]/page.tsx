import { Suspense } from 'react';
import { loadEvents as loadMessages, loadRooms } from '@/app/chat/actions';
import ChatRoom from '@/app/components/chat-room';
import Lobby from '@/app/components/lobby';

async function ChatRoomPage({ params }: PageProps<'/chat/[[...id]]'>) {
	const { id } = await params;
	const roomId = id?.[0];

	if (roomId) {
		const task = loadMessages(roomId);
		return (
			<Suspense>
				<ChatRoom id={roomId} initData={task} />
			</Suspense>
		);
	} else {
		const task = loadRooms();
		return (
			<Suspense>
				<Lobby task={task} />
			</Suspense>
		);
	}
}

export default ChatRoomPage;
