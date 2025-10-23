import z from 'zod';
import { LobbyRoomSchema } from '@/app/validators/lobbyroom';
import { UserSchema } from '@/app/validators/users';

export type LobbyServerEvent = z.infer<typeof LobbyServerEventSchema>;

export const LobbyServerEventSchema = z
	.object({
		type: z.literal('create'),
		payload: z.object({ room: LobbyRoomSchema }),
	})
	.or(
		z.object({
			type: z.literal('roomlist'),
			payload: z.object({
				rooms: z.array(LobbyRoomSchema),
			}),
		}),
	)
	.or(
		z.object({
			type: z.literal('close'),
			payload: z.object({ roomId: z.string() }),
		}),
	)
	.or(
		z.object({
			type: z.literal('update'),
			payload: z.object({
				roomId: z.string(),
				users: z.array(UserSchema),
			}),
		}),
	);
