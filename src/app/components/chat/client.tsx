'use client'

import { signal, useSignal } from '@preact/signals-react'
import { For } from '@preact/signals-react/utils'
import usePartySocket from 'partysocket/react'

const messages = signal<string[]>([])

export default function ChatClient({ token }: { token: string }) {
	usePartySocket({
		host: '192.168.2.40:1999', // or localhost:1999 in dev
		room: 'chat',
		maxRetries: 1,
		onMessage(e) {
			messages.value = [...messages.value, e.data]
		},
		// optionally, pass an object of query string parameters to add to the request
		query: async () => ({
			token,
		}),
	})
	return (
		<div>
			<For each={messages} fallback={<div>No Messages</div>}>
				{(item, index) => <div key={index}>{item}</div>}
			</For>
		</div>
	)
}
