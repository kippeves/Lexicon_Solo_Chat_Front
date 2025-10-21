import type React from 'react';
import { cn } from '@/lib/utils';

function Container({
	children,
	className,
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div className={cn('bg-white rounded-lg shadow p-4', className)}>
			{children}
		</div>
	);
}

export default Container;
