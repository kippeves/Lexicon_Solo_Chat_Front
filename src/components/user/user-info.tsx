import { Mail } from 'lucide-react';
import type { UserBadgeProps } from '@/app/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function UserInfo({ user }: UserBadgeProps) {
	// Get initials for avatar fallback
	const getInitials = (name: string | null | undefined) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		user && (
			<div className="flex items-center gap-4">
				<Avatar className="h-16 w-16">
					<AvatarImage
						src={user.picture || undefined}
						alt={user.given_name || 'User'}
					/>
					<AvatarFallback className="text-lg">
						{getInitials(user.given_name || user.family_name)}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 space-y-1">
					<h2 className="text-xl font-semibold text-foreground">
						{user.given_name} {user.family_name}
					</h2>
					{user.email && (
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Mail className="h-3 w-3" />
							{user.email}
						</div>
					)}
				</div>
			</div>
		)
	);
}

export default UserInfo;
