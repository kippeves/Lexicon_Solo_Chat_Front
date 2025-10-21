import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { loadInitialDataForRoom, loadRooms } from '@/app/chat/actions';
import ChatRoom from '@/app/components/chat-room';
import Lobby from '@/app/components/lobby';

async function ChatRoomPage({ params }: PageProps<'/chat/[[...id]]'>) {
	const session = getKindeServerSession();
	const info = await session.getIdToken();
	const { id } = await params;
	const roomId = id?.[0];
	if (roomId) {
		const room = await loadInitialDataForRoom(roomId);
		if (!room) return notFound();
		return (
			<Suspense>
				<ChatRoom
					id={roomId}
					isCreator={room?.info.createdBy.id === info?.sub}
					data={room}
				/>
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
