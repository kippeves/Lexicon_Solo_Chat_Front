'use client'

import CreateOrJoin from './create-or-join'
import RoomList from './room-list'
import UserList from './user-list'

export default function ChatClient() {
	return (
		<div className="grid grid-rows-[1fr_auto_auto] p-0 space-y-4">
			<RoomList />
			<CreateOrJoin />
			<UserList />
		</div>
	)
}
