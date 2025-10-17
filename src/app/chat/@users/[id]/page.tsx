import { Suspense } from 'react';
import { getUsers } from '@/app/chat/actions';
import UserList from '@/app/components/user-list';

export default async function Page({ params }: PageProps<'/chat/[id]'>) {
	const { id } = await params;
	const task = getUsers(id);
	return (
		<Suspense>
			<UserList task={task} />
		</Suspense>
	);
}
