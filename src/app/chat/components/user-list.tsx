import { useSignal } from '@preact/signals-react'
import { For } from '@preact/signals-react/utils'
import { useChat } from '@/app/contexts/chat-context'
import type { Message } from '@/app/validators/messages'
import type { User } from '@/app/validators/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePartyServer } from '../utils/createPartyServer'
import Container from './container'

function UserList() {
	const { host: hostURI, token } = useChat()
	if (hostURI === undefined) throw 'lol'
	const users = useSignal<User[]>([])
	const handleUpdates = (e: Message) => {
		const { payload } = e
		console.log(payload)
		users.value = payload.users
	}

	const { connected } = usePartyServer({
		host: hostURI,
		token,
		party: 'users',
		onUpdate: handleUpdates,
	})

	return (
		connected && (
			<Container className="flex items-center gap-4 px-6 py-3 overflow-x-auto">
				<For each={users} fallback={<p>No Messages</p>}>
					{(item) => (
						<div key={item.id}>
							<div className="flex flex-col gap-3 w-30 justify-center text-center">
								<Avatar className="w-30 h-auto">
									<AvatarImage src={item.avatar} />
									<AvatarFallback>
										{[
											...item.name
												.split(' ')
												.map((v) => v[0].toUpperCase())
												.join(''),
										]}
									</AvatarFallback>
								</Avatar>
								<p className="wrap-anywhere">{item.name}</p>
							</div>
						</div>
					)}
				</For>
			</Container>
		)
	)
}

export default UserList
