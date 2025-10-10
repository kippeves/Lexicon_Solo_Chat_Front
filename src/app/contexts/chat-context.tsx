'use client'
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type PartySocket from 'partysocket'
import usePartySocket from 'partysocket/react'
import * as React from 'react'

type ChatProviderProps = { token: string; children: React.ReactNode }

const ChatStateContext = React.createContext<
	{ events: string[]; connected: boolean; server: PartySocket } | undefined
>(undefined)

function ChatProvider({ token, children }: ChatProviderProps) {
	const [events, setEvents] = React.useState<string[]>([])
	const [connected, setConnected] = React.useState(false)

	const ws = usePartySocket({
		host: '192.168.2.40:1999', // or localhost:1999 in dev
		party: 'lobby',
		room: 'main',
		maxRetries: 1,
		onOpen(_event) {
			setConnected(true)
		},
		onMessage(e) {
			setEvents((prevEvents) => [...prevEvents, e.data])
		},
		query: async () => ({
			token,
		}),
	})

	// NOTE: you *might* need to memoize this value
	// Learn more in http://kcd.im/optimize-context
	const value = { events, server: ws, connected }
	return (
		<ChatStateContext.Provider value={value}>
			{children}
		</ChatStateContext.Provider>
	)
}

function useChat() {
	const context = React.useContext(ChatStateContext)
	if (context === undefined) {
		throw new Error('useChat must be used within a ChatProvider')
	}
	return context
}

export { ChatProvider, useChat }
