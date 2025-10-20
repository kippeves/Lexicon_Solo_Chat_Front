import z from 'zod';
import { LobbyRoomSchema } from '@/app/validators/lobbyroom';
import { UserSchema } from '@/app/validators/users';

export type LobbyServerEvent = z.infer<typeof LobbyServerEventSchema>;

export const LobbyServerEventSchema = z
	.object({
		type: z.literal('create'),
		payload: LobbyRoomSchema,
	})
	.or(
		z.object({
			type: z.literal('close'),
			payload: z.object({ roomId: z.string() }),
		}),
	)
	.or(
		z.object({
			type: z.literal('join'),
			payload: z.object({
				roomId: z.string(),
				user: UserSchema,
			}),
		}),
	)
	.or(
		z.object({
			type: z.literal('leave'),
			payload: z.object({
				roomId: z.string(),
				id: z.string(),
			}),
		}),
	);
