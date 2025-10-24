import { DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Create({ onCreating }: { onCreating: () => void }) {
	const createRoom = () => onCreating();
	return (
		<div className="flex flex-col gap-2 self-end w-75">
			<Button
				size={'lg'}
				onClick={createRoom}
				className="text-2xl p-8 w-full"
				variant={'outline'}
			>
				<DoorOpen className="h-50 w-auto" />
				Create Room
			</Button>
		</div>
	);
}
