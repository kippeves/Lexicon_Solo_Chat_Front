import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Route } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserBadgeClient } from '@/components/user/client-user-badge';
import ContentGrid from './components/grids/content-grid';

export default async function Home() {
	const session = await getKindeServerSession();
	const user = await session.getUser();
	return (
		<ContentGrid className="h-dvh items-center">
			<Card className="m-auto w-[40rem] border-0 acrylic">
				<CardContent className="flex flex-col gap-4">
					<h2 className="text-3xl">Hej!</h2>
					{user && (
						<>
							<p>Det ser ut som att du redan är inloggad som:</p>
							<UserBadgeClient />
						</>
					)}
					<Button variant={'outline'} className="w-fit p-8">
						<Link className="text-4xl" href={'/chat' as Route}>
							Gå till chat
						</Link>
					</Button>
				</CardContent>
			</Card>
		</ContentGrid>
	);
}
