import z from 'zod'
import { UserSchema } from './users'

export const MessageSchema = z.object({
	type: z.literal('presence'),
	payload: z.object({ users: z.array(UserSchema) }),
})

export type Message = z.infer<typeof MessageSchema>
