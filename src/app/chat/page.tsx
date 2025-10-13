import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'
import { ChatProvider } from '../contexts/chat-context'
import ChatClient from './components/client'

export default async function ChatPage() {
	const user = getKindeServerSession()
	const token = await user.getIdTokenRaw()
	const host = process.env.PARTYKIT
	if (!host) return notFound()
	return (
		token && (
			<ChatProvider host={host} token={token}>
				<ChatClient />
			</ChatProvider>
		)
	)
}
