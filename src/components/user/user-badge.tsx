import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import type { UserBadgeProps } from '@/app/types';
import { Card, CardContent } from '@/components/ui/card';
import UserInfo from './user-info';

export function UserBadge({ user }: UserBadgeProps) {
	return (
		user && (
			<Card className="w-full max-w-md ">
				<CardContent className="space-y-6">
					<UserInfo user={user} />
					<p>
						Är det här inte du? (<LogoutLink>Logga ut</LogoutLink>)
					</p>
				</CardContent>
			</Card>
		)
	);
}
