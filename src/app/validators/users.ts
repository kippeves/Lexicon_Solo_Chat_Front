import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	avatar: z.url(),
});

export const PresenceSchema = z.object({
	type: z.literal('presence'),
	payload: z.object({ users: z.array(UserSchema) }),
});

export type Presence = z.infer<typeof PresenceSchema>;
export type User = z.infer<typeof UserSchema>;
