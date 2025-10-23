'use client';
import * as React from 'react';

type ChatProviderProps = {
	host: string;
	children: React.ReactNode;
};

const ChatStateContext = React.createContext<{ host: string } | undefined>(
	undefined,
);

function ChatProvider({ host, children }: ChatProviderProps) {
	if (!host) return;
	const value = { host };
	return (
		<ChatStateContext.Provider value={value}>
			{children}
		</ChatStateContext.Provider>
	);
}

function useChat() {
	const context = React.useContext(ChatStateContext);
	if (context === undefined) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
}

export { ChatProvider, useChat };
