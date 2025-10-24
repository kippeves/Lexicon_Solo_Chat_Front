import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserList from '@/app/components/user-list';

export default async function Page({ params }: PageProps<'/chat/[[...id]]'>) {
	const auth = getKindeServerSession();
	const token = await auth.getIdTokenRaw();
	if (!token) return;
	const { id } = await params;
	const roomId = id?.[0];
	return <UserList token={token} id={roomId} />;
}
