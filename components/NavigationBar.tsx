'use client';
import React, { useEffect, useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Avatar, Button, Tooltip } from '@nextui-org/react';
import { AcmeLogo } from './Icon/AcmeLogo';
import { usePathname } from 'next/navigation';
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import Link from 'next/link.js';
import './index.css';
import { postUser } from '@/utils/request';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function NavigationBar() {
	const [isClient, setIsClient] = useState(false);
	const pathname = usePathname();
	const { chain, chains } = useNetwork();
	const { disconnect } = useDisconnect();
	const router = useRouter();
	const [isOk, setIsOk] = useState(true);
	const { openChainModal, chainModalOpen } = useChainModal();

	const { isConnected, address } = useAccount({
		async onConnect({ address, connector, isReconnected }) {
			if (connector) {
				// console.log(connector, 'connector');
			}
		},
	});
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		address && connectedUser(address);
	}, [isConnected, address]);

	const connectedUser = async (address: `0x${string}`) => {
		const res = await postUser({ address });
	};

	useEffect(() => {
		if (chain?.name != 'Goerli' && chain?.name != 'Sepolia' && chain?.name != 'Ethereum') {
			openChainModal?.();
		}
	}, [chain, chainModalOpen, disconnect, openChainModal, router]);

	const name = {
		item: [
			'flex',
			'relative',
			'h-full',
			'items-center',
			"data-[active=true]:after:content-['']",
			'data-[active=true]:after:absolute',
			'data-[active=true]:after:bottom-0',
			'data-[active=true]:after:left-0',
			'data-[active=true]:after:right-0',
			'data-[active=true]:after:h-[2px]',
			'data-[active=true]:after:rounded-[2px]',
			'data-[active=true]:after:bg-[#7828c8]',
		],
	};

	const navbarItem = [
		{
			name: 'Home',
			link: '/',
		},
		{
			name: 'Diagonsis',
			link: '/diagonsis',
		},
		{
			name: 'Suggestion',
			link: '/suggestion',
		},
		//TODO:to be developed
		// {
		//     name: 'About',
		//     link: '/about',
		// },
	];

	return (
		<Navbar position='static' maxWidth='full' classNames={name}>
			<div className=' flex items-center mr-[2rem]'>
				{/* {chain && <div>Connected to {chain.name}</div>} */}
				<AcmeLogo />
				<p className='font-bold text-inherit'>Medical</p>
			</div>

			<NavbarContent className='hidden sm:flex gap-12' justify='center'>
				{navbarItem.map((item) => (
					<NavbarItem key={item.name + ''} isActive={pathname === item.link}>
						<Link color={pathname === item.link ? `secondary` : 'foreground'} className='font-extrabold' href={item.link}>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			{isClient ? (
				<>
					<NavbarContent as='div' justify='end'>
						{isConnected && (
							<>
								<Tooltip
									showArrow
									placement='left'
									content='Click to go to Personal Centre'
									classNames={{
										base: 'py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400',
										arrow: 'bg-neutral-400 dark:bg-white',
									}}
								>
									<Link href='/user' className='linkButton'>
										<Avatar
											isBordered
											isFocusable
											//@ts-ignore
											color='#f31260'
											as='button'
											className='transition-transform '
											name='Jason Hughes'
											size='sm'
											src='/dy.svg'
										/>
									</Link>
								</Tooltip>
							</>
						)}
					</NavbarContent>
					<ConnectButton showBalance={false} accountStatus='address' />
				</>
			) : (
				<></>
			)}
		</Navbar>
	);
}
