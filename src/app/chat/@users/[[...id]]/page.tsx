import UserList from '@/app/components/user-list';

export default async function Page({ params }: PageProps<'/chat/[[...id]]'>) {
	const { id } = await params;
	const roomId = id?.[0];
	return <UserList id={roomId} />;
}
