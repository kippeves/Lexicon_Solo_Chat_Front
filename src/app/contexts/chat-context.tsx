'use client'
import * as React from 'react'

type ChatProviderProps = {
	host: string
	token: string
	children: React.ReactNode
}

const ChatStateContext = React.createContext<
	{ host: string; token: string } | undefined
>(undefined)

function ChatProvider({ host, token, children }: ChatProviderProps) {
	// NOTE: you *might* need to memoize this value
	// Learn more in http://kcd.im/optimize-context
	const value = { host, token }
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
