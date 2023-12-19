'use client';
import React, { useEffect } from 'react';
import Avatar from './(components)/Avatar';
import TabsHead from './(components)/TabsHead';
import { watchAccount } from '@wagmi/core';
import { useAccount } from 'wagmi';

function Page() {
	const { address } = useAccount();
	const unwatch = watchAccount((account) => {
		if (address !== account.address) {
			location.reload();
		}
	});

	return (
		<div className='px-[10rem] pt-[2rem]'>
			<Avatar />
			<TabsHead />
		</div>
	);
}

export default Page;
