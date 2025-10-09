import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'

export default async function ChatPage() {
	const session = getKindeServerSession()
	const user = await session.getUser()
	return <p>Test</p>
}
