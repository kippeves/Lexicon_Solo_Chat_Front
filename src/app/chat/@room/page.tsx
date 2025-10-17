import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { loadRooms } from '@/app/chat/actions'
import Lobby from '@/app/components/lobby'

function LobbyPage() {
	const URI = process.env.PARTYKIT
	if (!URI) return notFound()

	const task = loadRooms()

	return (
		task && (
			<Suspense>
				<Lobby task={task} />
			</Suspense>
		)
	)
}

export default LobbyPage
