'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import PartySocket from 'partysocket';
import type { ChatRoomClientEvent } from '@/app/validators/chatroom/client';
import type { ChatRoomClientMessage } from '@/app/validators/chatroom/message/client';
import type { ChatRoomMessageServer } from '@/app/validators/chatroom/message/server';
import type { ChatRoomServerEvent } from '@/app/validators/chatroom/server';
import type { LobbyClientEvent } from '@/app/validators/lobby/client';
import { LobbyServerEventSchema } from '@/app/validators/lobby/server';
import type { LobbyRoom } from '@/app/validators/lobbyroom';
import type { User } from '@/app/validators/users';

const user = getKindeServerSession();
const host = process.env.PARTYKIT;
const room = 'main';

export async function loadEvents(id: string) {
	const token = await user.getIdTokenRaw();
	if (!(host && token)) throw 'No Credentials';
	return await PartySocket.fetch(
		{ host, party: 'room', room: id },
		{
			method: 'GET',
			headers: { Authorization: token },
		},
	).then(async (res) => {
		const result = await res.json();
		return result as ChatRoomMessageServer[];
	});
}

export async function sendMessage(
	params: ChatRoomClientMessage,
	queryData: FormData,
): Promise<ChatRoomClientMessage> {
	const errorMsg = (message: string): ChatRoomClientMessage => ({
		type: 'error',
		error: message,
	});
	if (params.type !== 'init') return errorMsg('Cannot resend the same value');
	const id = params?.roomId;
	const message = queryData.get('message')?.toString();
	const token = await user.getIdTokenRaw();
	if (!(host && token && message)) return errorMsg('Something went very wrong');
	if (message?.length === 0) return errorMsg('Cannot send a empty message');
	try {
		const action: ChatRoomClientEvent = {
			type: 'message',
			payload: { message },
		};
		await PartySocket.fetch(
			{ host, party: 'room', room: id },
			{
				body: JSON.stringify(action),
				method: 'POST',
				headers: { Authorization: token },
			},
		).then(async (res) => {
			if (res.ok) {
				const result = await res.json();
				return result as ChatRoomServerEvent[];
			}
		});
		return { type: 'return', success: true };
	} catch {
		return { type: 'return', success: false };
	}
}

export async function loadRooms(): Promise<LobbyRoom[] | undefined> {
	const token = await user.getIdTokenRaw();
	if (!(host && token)) return undefined;
	return await PartySocket.fetch(
		{ host, party: 'lobby', room: 'main', path: 'rooms' },
		{
			method: 'GET',
			headers: { Authorization: token },
		},
	).then(async (res) => {
		return await res.json();
	});
}

export async function getUsers(id?: string) {
	const token = await user.getIdTokenRaw();
	if (!(host && token)) return undefined;
	return await PartySocket.fetch(
		{ host, party: 'users', room: id ?? 'main' },
		{
			method: 'GET',
			headers: { Authorization: token },
		},
	).then(async (res) => {
		return (await res.json()) as User[];
	});
}

export async function createRoom() {
	try {
		const token = await user.getIdTokenRaw();
		if (!(host && token)) return;
		const action: LobbyClientEvent = { type: 'create', payload: {} };
		return await PartySocket.fetch(
			{ host, party: 'lobby', room },
			{
				method: 'POST',
				body: JSON.stringify(action),
				headers: { Authorization: token },
			},
		).then(async (res) => {
			const body = await res.json();
			const { success, data } =
				await LobbyServerEventSchema.safeParseAsync(body);
			if (!success || data.type !== 'create') return;
			const { id } = data.payload;
			return id;
		});
	} catch (e) {
		console.log(e);
	}
}
