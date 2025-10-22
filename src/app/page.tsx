import { MessageCircleMore } from 'lucide-react';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/app/components/ui/container';
import { Button } from '@/components/ui/button';
import ContentGrid from './components/grids/content-grid';

type Technology = {
	logo: string;
	name: string;
	href: Route;
};

const technologies: Technology[] = [
	{
		logo: 'nextjs.svg',
		name: 'NextJS',
		href: 'http://www.nextjs.org',
	},
	{
		logo: 'partykit.png',
		name: 'PartyKit',
		href: 'https://www.partykit.io',
	},
	{
		logo: 'shadcn.png',
		name: 'shadcn/ui',
		href: 'https://ui.shadcn.com',
	},
	{
		logo: 'kinde.jpg',
		name: 'Kinde',
		href: 'https://www.kinde.com',
	},
	{
		logo: 'zod.webp',
		name: 'Zod',
		href: 'https://zod.dev',
	},
];

const TechnologyListItem = ({ technology }: { technology: Technology }) => {
	return (
		<li>
			<Link
				className="flex items-center justify-baseline gap-4 hover:underline underline-offset-1 min-h-12"
				href={technology.href}
			>
				<span className="w-fit h-auto flex justify-center aspect-auto">
					<Image
						style={{ width: 'auto' }}
						src={`/${technology.logo}`}
						alt={technology.name}
						width={40}
						height={40}
						priority
					/>
				</span>
				<span className="w-fit text-start h-full flex items-center font-light text-xl">
					{technology.name}
				</span>
			</Link>
		</li>
	);
};

export default async function Home() {
	return (
		<ContentGrid className={'h-dvh items-center justify-items-center'}>
			<article className="flex flex-col gap-20 justify-center items-center">
				<Container className="flex flex-col gap-y-6 items-center p-6">
					<span className="flex gap-4 justify-evenly h-12 items-center my-1 w-full">
						<h2 className="text-5xl">Livechat</h2>
					</span>
					<div className="flex justify-baseline gap-10 px-8">
						<div className="flex flex-col gap-y-4 w-[15rem] aspect-3/1">
							<h2 className="text-md font-bold">Synopsis:</h2>
							<p className="text-md font-light wrap-normal">
								A livechat using Kinde for verification and validation, PartyKit
								for WebSocket-eventhandling and NextJS as frontend-framework.
							</p>
						</div>
						<div className="w-fit flex flex-col gap-y-4 aspect-3/4 ">
							<h2 className="text-md font-bold">Technologies used:</h2>
							<ul className="flex flex-col w-fit gap-y-1">
								{technologies.map((t, i) => (
									<TechnologyListItem key={i} technology={t} />
								))}
							</ul>
						</div>
					</div>
					<Button className="flex p  " asChild>
						<Link
							className="focus-visible:underline hover:underline text-xl "
							href={'/chat' as Route}
						>
							<MessageCircleMore />
							Join Chat
						</Link>
					</Button>
				</Container>
			</article>
		</ContentGrid>
	);
}
