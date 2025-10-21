import { cn } from '@/lib/utils';

export default function ContentGrid({
	children,
	...props
}: React.ComponentProps<'div'>) {
	return <div className={cn('content-grid', props.className)}>{children}</div>;
}
