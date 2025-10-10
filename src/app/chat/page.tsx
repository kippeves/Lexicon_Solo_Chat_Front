import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ChatClient from '../components/chat/client'
import { ChatProvider } from '../contexts/chat-context'

export default async function ChatPage() {
	const user = getKindeServerSession()
	const token = await user.getAccessTokenRaw()
	return (
		token && (
			<ChatProvider token={token}>
				<ChatClient />
			</ChatProvider>
		)
	)
}
