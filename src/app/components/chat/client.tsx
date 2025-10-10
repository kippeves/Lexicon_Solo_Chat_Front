'use client'

import { signal } from '@preact/signals-react'
import { For } from '@preact/signals-react/utils'
import { useChat } from '@/app/contexts/chat-context'
import { Spinner } from '@/components/ui/spinner'

const messages = signal<string[]>([])

export default function ChatClient() {
	const { connected } = useChat()
	return (
		<div className="breakout grid grid-rows-[75%_25%] space-y-4">
			{!connected && (
				<div className="h-full w-full flex flex-col justify-center items-center ">
					<Spinner className="w-40 h-auto" />
				</div>
			)}

			{connected && (
				<>
					<div className="bg-white rounded-lg shadow p-4">
						<For each={messages} fallback={<p>No Messages</p>}>
							{(item, index) => <div key={index}>{item}</div>}
						</For>
					</div>
					<div className="bg-white rounded-lg shadow"></div>
				</>
			)}
		</div>
	)
}
