import z from 'zod';
import { UserSchema } from '@/app/validators/users';

export type ChatRoomMessageServer = z.infer<typeof ChatRoomMessageServerSchema>;

export const ChatRoomMessageServerSchema = z.object({
	user: UserSchema,
	sent: z.string(),
	message: z.string(),
});
