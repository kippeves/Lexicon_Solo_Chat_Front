import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Home() {
	const session = await getKindeServerSession()
	const isAuth = await session.isAuthenticated()
	return (
		<div>
			{!isAuth && <AuthBlock />}
			{isAuth && <LogoutLink>Glorp</LogoutLink>}
		</div>
	)
}

function AuthBlock() {
	return (
		<>
			<LoginLink>Sign in</LoginLink>
			<RegisterLink>Sign up</RegisterLink>
		</>
	)
}
