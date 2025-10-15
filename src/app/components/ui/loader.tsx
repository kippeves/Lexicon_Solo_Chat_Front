import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

function Loader({ text }: { text?: string }) {
	return (
		<div className={cn('h-full flex-col justify-center flex')}>
			<div className="flex flex-col gap-4 justify-center text-center">
				<Spinner className="w-50 h-auto m-auto" />
				{text && <p className="text-2xl">{text}</p>}
			</div>
		</div>
	)
}

export default Loader
