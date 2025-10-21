import type PartySocket from 'partysocket';
import usePartySocket from 'partysocket/react';
import { useState } from 'react';

export type PartyParams<T> = {
	host: string;
	token: string;
	party: string;
	room?: string;
	onUpdate: (e: T) => void;
};
export const usePartyRoom = <T>({
	host,
	token,
	party,
	onUpdate,
	room = 'main',
}: PartyParams<T>): { connected: boolean; ws: PartySocket } => {
	const [connected, setConnected] = useState(false);
	const params = { host, party, room };

	const ws = usePartySocket({
		...params,
		onError(event) {
			console.log({ message: 'error', event });
		},
		onOpen() {
			setConnected(true);
		},
		onMessage(e) {
			const data = JSON.parse(e.data) as T;
			onUpdate(data);
		},
		query: async () => ({
			token,
		}),
	});
	return { connected, ws };
};
