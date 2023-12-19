'use client';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import NavigationBar from '@/components/NavigationBar';
import '@rainbow-me/rainbowkit/styles.css';
import { AvatarComponent, connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli, sepolia, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const { chains, publicClient, webSocketPublicClient } = configureChains([sepolia, goerli, mainnet], [publicProvider()]);

	const projectId = process.env.PROJECT_ID || '';

	const connectors = connectorsForWallets([
		{
			groupName: 'Recommended',
			wallets: [
				metaMaskWallet({
					chains: chains,
					projectId,
				}),
			],
		},
	]);

	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors,
		publicClient,
		webSocketPublicClient,
	});

	const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
		return <Image alt='avatar' src={'/dy.svg'} width={size} height={size} style={{ borderRadius: 10 }} />;
	};

	return (
		<html lang='en'>
			<body id='root' className='min-h-screen max-w-screen'>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider modalSize='compact' chains={chains} avatar={CustomAvatar}>
						<NextUIProvider>
							<ToastContainer limit={3} />
							<NavigationBar />
							<div className='pt-[1%] min-h-full'>{children}</div>
						</NextUIProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</body>
		</html>
	);
}
