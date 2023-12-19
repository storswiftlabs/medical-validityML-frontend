'use client';
import React, { useState } from 'react';
import CheckUpCard from './components/CheckUpCard';
import { Button, Divider } from '@nextui-org/react';
import { FemaleSvg, Male, WarnIcon } from '@/components/Icon/AcmeLogo';
import PreviewWindow from './components/PreviewWindow';
import { useFormContext } from 'react-hook-form';

function Sex({ paginate }: { paginate: (newDirection: number) => void }) {
	const [open, setOpen] = useState(false);
	const { setValue } = useFormContext(); // retrieve all hook methods

	const onSubmit = (gender:string) => {
		setValue('gender', gender);
		paginate(1);
	};

	const onBack = () => {
		paginate(-1);
	};
	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};
	return (
		<div className='flex flex-col h-full w-full'>
			<div className='flex justify-center items-center h-[28rem] gap-28 relative'>
				<div onClick={()=>onSubmit('female')}>
					<CheckUpCard>
						{FemaleSvg}
						<span className='mt-[1rem]'>Female</span>
					</CheckUpCard>
				</div>
				<div onClick={()=>onSubmit('male')}>
					<CheckUpCard>
						{Male}
						<span className='mt-[1rem]'>Male</span>
					</CheckUpCard>
				</div>
				<div onClick={showDrawer} className='absolute text-[#0f5496] flex items-center gap-2 left-[2rem] bottom-[2rem] cursor-pointer'>
					<WarnIcon fill={'#0f5496'} /> What should I select?
				</div>
			</div>
			<div className='h-[4.6rem]'>
				<Divider />
				<div className='flex items-center justify-between p-4'>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					<div></div>
				</div>
				<PreviewWindow
					contentChildren={
						<p>
							Gender and sex are a spectrum broader than just female and male. However, this symptom assessment technology can currently differentiate between female
							and male sexes only. To continue the interview, please select the sex assigned to you at birth.
						</p>
					}
					onClose={onClose}
					isOpen={open}
				/>
			</div>
		</div>
	);
}

export default Sex;
