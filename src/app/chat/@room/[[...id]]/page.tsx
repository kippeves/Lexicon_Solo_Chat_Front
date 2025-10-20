import { Suspense } from 'react';
import { loadEvents, loadRooms } from '@/app/chat/actions';
import ChatRoom from '@/app/components/chat-room';
import Lobby from '@/app/components/lobby';
import Loader from '@/app/components/ui/loader';

async function ChatRoomPage({ params }: PageProps<'/chat/[[...id]]'>) {
	const { id } = await params;
	const roomId = id?.[0];
	const task = roomId ? loadEvents(roomId) : loadRooms();
	return (
		<Suspense fallback={<Loader />}>
			{roomId ? <ChatRoom initData={task} /> : <Lobby task={task} />}
		</Suspense>
	);
}

export default ChatRoomPage;
