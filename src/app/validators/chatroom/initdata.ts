import z from 'zod';
import { ChatRoomMessageServerSchema } from '@/app/validators/chatroom/message/server';
import { LobbyRoomSchema } from '@/app/validators/lobbyroom';

export type ChatRoomInitData = z.infer<typeof ChatRoomInitDataSchema>;

export const ChatRoomInitDataSchema = z.object({
	info: LobbyRoomSchema,
	messages: z.array(ChatRoomMessageServerSchema),
});
