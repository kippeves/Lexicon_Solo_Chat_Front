'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PartySocket } from 'partysocket';
import type { ChatRoomClientEvent } from '@/app/validators/chatroom/client';
import type { ChatRoomInitData } from '@/app/validators/chatroom/initdata';
import type { ChatRoomClientMessage } from '@/app/validators/chatroom/message/client';
import type { LobbyClientEvent } from '@/app/validators/lobby/client';
import { LobbyServerEventSchema } from '@/app/validators/lobby/server';
import type { LobbyRoom } from '@/app/validators/lobbyroom';
import type { User } from '@/app/validators/users';

const host = process.env.PARTYKIT;
const room = 'main';

const checkCredentials = async () => {
	const user = getKindeServerSession();
	const token = await user.getIdTokenRaw();
	if (!(host && token)) throw new Error('No Credentials');
	return token;
};

interface FetchWithAuthParams {
	path: string;
	options: RequestInit;
	party: string;
	room: string;
	id?: string;
}

const fetchWithAuth = async <T>(
	params: FetchWithAuthParams,
): Promise<T | undefined> => {
	const { path, options, party, room, id } = params;
	try {
		const token = await checkCredentials();
		if (!host) throw new Error('No Host Defined');
		const res = await PartySocket.fetch(
			{ host, party, room: id ?? room, path },
			{
				...options,
				headers: { ...options.headers, Authorization: token },
			},
		);
		if (!res.ok) return undefined;
		const result = await res.json();
		return result as T;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};

export async function loadInitialDataForRoom(id: string) {
	return fetchWithAuth<ChatRoomInitData>({
		path: '',
		options: { method: 'GET' },
		party: 'room',
		room: id,
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

	if (params.type !== 'init') return errorMsg('Only init allowed');

	const id = params?.roomId;
	const message = queryData.get('message')?.toString();
	if (!message?.trim()) return errorMsg('Cannot send a empty message');

	try {
		const action: ChatRoomClientEvent = {
			type: 'message',
			payload: { message },
		};
		await fetchWithAuth({
			path: '',
			options: {
				method: 'POST',
				body: JSON.stringify(action),
			},
			party: 'room',
			room: id,
		});
		return { type: 'return', success: true };
	} catch {
		return { type: 'return', success: false };
	}
}

export async function loadRooms(): Promise<LobbyRoom[] | undefined> {
	try {
		return await fetchWithAuth<LobbyRoom[]>({
			path: 'rooms',
			options: { method: 'GET' },
			party: 'lobby',
			room: 'main',
		});
	} catch (error) {
		return undefined;
	}
}

export async function getUsers(id?: string): Promise<User[] | undefined> {
	try {
		return await fetchWithAuth<User[]>({
			path: '',
			options: { method: 'GET' },
			party: 'users',
			room: 'main',
			id,
		});
	} catch (error) {
		return undefined;
	}
}

export async function createRoom(): Promise<string | undefined> {
	try {
		const action: LobbyClientEvent = { type: 'create', payload: {} };
		const body = await fetchWithAuth({
			path: '',
			options: {
				method: 'POST',
				body: JSON.stringify(action),
			},
			party: 'lobby',
			room,
		});
		const { success, data } = await LobbyServerEventSchema.safeParseAsync(body);
		if (!success || data.type !== 'create') return undefined;
		const { id } = data.payload;
		return id;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}
