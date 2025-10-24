import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers/AuthProvider';

const sans = Geist({
	variable: '--font-ext-sans',
	weight: ['300', '400', '600', '700'],
});

const mono = Geist_Mono({
	variable: '--font-ext-mono',
	weight: ['400', '600'],
});

export const metadata: Metadata = {
	title: 'WS Chat',
	description: 'Created using NextJS & PartyKit',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang="en">
				<body
					className={`${sans.variable} ${mono.variable} antialiased h-dvh bg-gradient-to-r from-slate-500 to-slate-800`}
				>
					<main className="h-dvh flex flex-col">{children}</main>
				</body>
			</html>
		</AuthProvider>
	);
}
