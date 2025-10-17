import { Suspense } from 'react';
import { getUsers } from '@/app/chat/actions';
import UserList from '@/app/components/user-list';

export default function Page() {
	const task = getUsers();
	return (
		<Suspense>
			<UserList task={task} />
		</Suspense>
	);
}
