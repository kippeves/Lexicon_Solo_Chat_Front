import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CreateOrJoin({
	onCreating,
}: {
	onCreating: () => void;
}) {
	const createRoom = () => onCreating();
	return (
		<div className="flex flex-col gap-2 self-end w-75">
			<Button
				size={'lg'}
				onClick={createRoom}
				className="text-2xl p-8 w-full"
				variant={'outline'}
			>
				Create Room
			</Button>
			<div className="flex w-fit focus-within:ring-4 ring-gray-300 rounded-lg">
				<Input
					type="text"
					maxLength={8}
					className="md:text-2xl p-7 rounded-r-none focus-visible:ring-0"
					placeholder="Enter Code"
				/>
				<Button
					variant={'default'}
					className="md:text-2xl h-full rounded-l-none border-l-0"
				>
					Join
				</Button>
			</div>
		</div>
	);
}
