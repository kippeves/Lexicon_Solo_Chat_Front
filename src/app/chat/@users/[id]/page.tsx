'use client'
import { useSignal } from '@preact/signals-react'
import { useParams } from 'next/navigation'
import UserList from '@/app/components/user-list'
import { useChat } from '@/app/contexts/chat-context'
import type { User } from '@/app/validators/users'
import { usePartyRoom } from '../../utils/createPartyServer'

export default function Page() {
	const { id } = useParams()
	const serverParams = useChat()
	const users = useSignal<User[]>([])

	const { connected } = usePartyRoom({
		...serverParams,
		party: 'users',
		room: id?.toString(),
		onUpdate: ({ type, payload }) => {
			if (type === 'presence') users.value = payload.users
		},
	})
	return connected && <UserList users={users} />
}
