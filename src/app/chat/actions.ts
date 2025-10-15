'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import PartySocket from 'partysocket'
import { LobbyMessageSchema } from '@/app/validators/lobby'

const user = getKindeServerSession()
const URI = process.env.PARTYKIT

export async function createRoom() {
	try {
		const token = await user.getIdTokenRaw()
		if (!(URI && token)) return
		return await PartySocket.fetch(
			{ host: URI, party: 'lobby', room: 'main' },
			{
				method: 'POST',
				body: JSON.stringify({ action: 'create' }),
				headers: { Authorization: token },
			},
		)
			.then(async (res) => {
				const body = await res.json()
				const { success, data } = await LobbyMessageSchema.safeParseAsync(body)
				if (!success || data.type !== 'create') return
				const { id } = data.payload
				console.log(id)
				return id
			})
			.catch((e) => console.log(e))
	} catch (e) {
		console.log(e)
	}
}

export async function joinRoom(code: string) {
	console.log(code)
}
