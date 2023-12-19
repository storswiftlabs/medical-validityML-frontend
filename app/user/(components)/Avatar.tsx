'use client';
import { User } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

function Avatar() {
	const { address } = useAccount();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className='mb-[1rem]'>
			<User
				name={isClient ? address : ''}
				description='Medical'
				avatarProps={{
					className: 'rounded-[10%]',
					size: 'lg',
					src: '/dy.svg',
					alt: 'user',
				}}
			/>
		</div>
	);
}

export default Avatar;
