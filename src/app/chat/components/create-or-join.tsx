import { Button } from '@/components/ui/button'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group'
import Container from './container'

export default function CreateOrJoin() {
	return (
		<Container className="flex justify-evenly py-8 gap-4">
			<Button size={'lg'} className="text-2xl p-8" variant={'outline'}>
				Create Room
			</Button>
			<InputGroup className="p-8 w-100">
				<InputGroupInput className="md:text-2xl" placeholder="Enter Code" />
				<InputGroupAddon align="inline-end">
					<InputGroupButton className="md:text-2xl">Join</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</Container>
	)
}
