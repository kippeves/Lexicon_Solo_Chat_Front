import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ChatClient from '../components/chat/client'

export default async function ChatPage() {
	const session = getKindeServerSession()
	const token = await session.getIdTokenRaw()

	return token && <ChatClient token={token} />
}
