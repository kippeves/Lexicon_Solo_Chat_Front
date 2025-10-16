import type { Signal } from '@preact/signals-react'
import { For } from '@preact/signals-react/utils'
import Image from 'next/image'
import type { User } from '@/app/validators/users'

export default function UserList({ users }: { users: Signal<User[]> }) {
	return (
		<For each={users}>
			{(item) => (
				<figure
					key={item.id}
					className="flex flex-col items-center gap-2 w-25 text-center "
				>
					<Image
						src={item.avatar}
						alt={item.name}
						width={96}
						height={96}
						className="rounded-md"
						priority
					/>
					<figcaption>
						<span className="text-wrap">{item.name}</span>
					</figcaption>
				</figure>
			)}
		</For>
	)
}
