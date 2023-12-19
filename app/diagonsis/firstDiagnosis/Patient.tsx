'use client';
import React, { useState } from 'react';
import CheckUpCard from './components/CheckUpCard';
import { Button, Divider } from '@nextui-org/react';
import { FriendSvg, MySvg } from '@/components/Icon/AcmeLogo';
import { useFormContext } from 'react-hook-form';

function Patient({ paginate }: { paginate: (newDirection: number) => void }) {
	const { setValue } = useFormContext(); // retrieve all hook methods

	const onSubmit = (chosen_user: string) => {
		setValue('chosen_user', chosen_user);
		paginate(1);
	};

	const onBack = () => {
		paginate(-1);
	};
	return (
		<div className='flex flex-col h-full w-full pt-[4rem]'>
			<div className='flex justify-center items-center h-full gap-28'>
				<div onClick={() => onSubmit('my')}>
					<CheckUpCard>
						{MySvg}
						<span className='mt-[1rem]'>Myself</span>
					</CheckUpCard>
				</div>
				<div onClick={() => onSubmit('otherPerson')}>
					<CheckUpCard>
						{FriendSvg}
						<span className='mt-[1rem]'>Someone else</span>
					</CheckUpCard>
				</div>
			</div>
			<div className='h-[4.6rem] mt-[4rem]'>
				<Divider />
				<div className='flex items-center justify-between p-4'>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default Patient;
