import z from 'zod';
import { ChatRoomMessageServerSchema } from '@/app/validators/chatroom/message/server';
import { UserSchema } from '@/app/validators/users';

export type ChatRoomServerEvent = z.infer<typeof ChatRoomServerEventSchema>;

export const ChatRoomServerEventSchema = z
	.object({
		type: z.literal('join'),
		payload: z.object({
			user: UserSchema,
		}),
	})
	.or(
		z.object({
			type: z.literal('leave'),
			payload: z.object({
				user: UserSchema,
			}),
		}),
	)
	.or(
		z.object({
			type: z.literal('message'),
			payload: ChatRoomMessageServerSchema,
		}),
	)
	.or(
		z.object({
			type: z.literal('clear'),
		}),
	)
	.or(
		z.object({
			type: z.literal('close'),
			payload: z
				.object({
					admin: z.boolean(),
				})
				.optional(),
		}),
	);
