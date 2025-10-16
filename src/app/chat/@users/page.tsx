'use client'
import { useSignal } from '@preact/signals-react'
import UserList from '@/app/components/user-list'
import { useChat } from '@/app/contexts/chat-context'
import type { Presence, User } from '@/app/validators/users'
import { usePartyRoom } from '../utils/createPartyServer'

export default function Page() {
	const serverParams = useChat()
	const users = useSignal<User[]>([])

	const { connected } = usePartyRoom<Presence>({
		...serverParams,
		party: 'users',
		onUpdate: ({ type, payload }) => {
			if (type === 'presence') users.value = payload.users
		},
	})

	return connected && <UserList users={users} />
}
