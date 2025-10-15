import type { Signal } from '@preact/signals-react'
import { For } from '@preact/signals-react/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import type { User } from '@/app/validators/users'

export default function UserList({ users }: { users: Signal<User[]> }) {
	return (
		<For each={users} fallback={<p>No Messages</p>}>
			{(item) => (
				<div
					key={item.id}
					className="flex flex-col gap-3 w-30 justify-center text-center"
				>
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
			)}
		</For>
	)
}
