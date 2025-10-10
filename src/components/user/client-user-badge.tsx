'use client'

import { LogoutLink, useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import { LogOut, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function UserBadgeClient() {
	const { user, isLoading } = useKindeAuth()

	if (isLoading) {
		return (
			<Card className="w-fit border-0 shadow-none box-content">
				<CardContent className="flex gap-4 justify-evenly">
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
					</div>
				</CardContent>
			</Card>
		)
	}
	// Get initials for avatar fallback
	const getInitials = (name: string | null | undefined) => {
		if (!name) return 'U'
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	return (
		user && (
			<Card className="w-fit p-0 border-0 shadow-none box-content bg-none">
				<CardContent className="flex gap-4 justify-evenly">
					<div className="flex gap-4 items-center ">
						<div className="h-20 w-auto shadow rounded-full border-gray-500 border-2 p-[0.15rem]">
							<Avatar className="h-full w-auto">
								<AvatarImage
									src={user.picture || undefined}
									alt={user.given_name || 'User'}
								/>
								<AvatarFallback className="text-lg">
									{getInitials(user.given_name || user.family_name)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex-1 space-y-1">
							<h3 className="text-xl font-semibold text-foreground">
								{user.given_name} {user.family_name}
							</h3>
							{user.email && (
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Mail className="h-3 w-3" />
									{user.email}
								</div>
							)}

							<LogoutLink className="text-end hover:underline">
								Logga ut
							</LogoutLink>
						</div>
					</div>
				</CardContent>
			</Card>
		)
	)
}
