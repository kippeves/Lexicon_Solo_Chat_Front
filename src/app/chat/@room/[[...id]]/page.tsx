import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { loadInitialDataForRoom } from '@/app/chat/actions';
import ChatRoom from '@/app/components/chat-room';
import Lobby from '@/app/components/lobby';

async function ChatRoomPage({ params }: PageProps<'/chat/[[...id]]'>) {
	const { getIdToken, getIdTokenRaw } = getKindeServerSession();
	const info = await getIdToken();
	const token = await getIdTokenRaw();
	if (!token) return;
	const { id } = await params;

	const roomId = id?.[0];
	if (roomId) {
		const room = await loadInitialDataForRoom(roomId);
		console.log(room);
		if (!room) return notFound();
		return (
			<Suspense>
				<ChatRoom
					token={token}
					id={roomId}
					isCreator={room?.info.createdBy.id === info?.sub}
					data={room}
				/>
			</Suspense>
		);
	} else {
		return (
			<Suspense>
				<Lobby token={token} />
			</Suspense>
		);
	}
}

export default ChatRoomPage;
