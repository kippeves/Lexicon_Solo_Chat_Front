'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import PartySocket from 'partysocket'
import { LobbyMessageSchema, type LobbyRoom } from '@/app/validators/lobby'

const user = getKindeServerSession()
const host = process.env.PARTYKIT
const room = 'main'

export async function loadEvents(id: string) {
	const token = await user.getIdTokenRaw()
	if (!(host && token)) return undefined
	return await PartySocket.fetch(
		{ host, party: 'room', room: id },
		{
			method: 'GET',
			headers: { Authorization: token },
		},
	).then(async (res) => {
		if (res.ok) {
			const result = await res.json()
			return result
		}
	})
}

export async function loadRooms() {
	const token = await user.getIdTokenRaw()
	if (!(host && token)) return undefined
	return await PartySocket.fetch(
		{ host, party: 'lobby', room: 'main', path: 'rooms' },
		{
			method: 'GET',
			headers: { Authorization: token },
		},
	).then(async (res) => {
		if (res.ok) {
			return (await res.json()) as LobbyRoom[]
		}
	})
}

export async function createRoom() {
	try {
		const token = await user.getIdTokenRaw()
		if (!(host && token)) return
		return await PartySocket.fetch(
			{ host, party: 'lobby', room },
			{
				method: 'POST',
				body: JSON.stringify({ action: 'create' }),
				headers: { Authorization: token },
			},
		).then(async (res) => {
			const body = await res.json()
			const { success, data } = await LobbyMessageSchema.safeParseAsync(body)
			if (!success || data.type !== 'create') return
			const { id } = data.payload
			return id
		})
	} catch (e) {
		console.log(e)
	}
}

export async function joinRoom(code: string) {
	console.log(code)
}
