import { AuthenticationIcon, DotIcon } from '@/components/Icon/AcmeLogo';
import React, { useState } from 'react';
import { Button,Image } from '@nextui-org/react';
import DiagnosticFramework from '@/components/DiagnosticFramework';

const DotText = ['Possible causes of symptoms.', 'Recommendations on what to do next.'];

const AboutText = ['Verifiable machine learning models using STARKs.'];

function IntroductionComponentA({ paginate }: { paginate: (newDirection: number) => void }) {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};
	return (
		<DiagnosticFramework
			headText='Check your symptoms'
			footer={
				<>
					<div></div>
					<Button
						onPress={() => {
							paginate(1);
						}}
						radius='sm'
						color='primary'
					>
						Next
					</Button>
				</>
			}
		>
			<div className='flex flex-1 p-[2rem] pt-[0]'>
				<div className='w-[60%]'>
					<p className='leading-relaxed'>Take a short (3 mins) symptom assessment. The information you give is safe and won’t be shared. Your results will include:</p>
					<ul className='p-[1rem] leading-relaxed'>
						{DotText.map((item, index) => (
							<li key={index} className='flex gap-4'>
								<DotIcon /> <span>{item}</span>
							</li>
						))}
					</ul>
					<h3
						onClick={() => {
							showDrawer();
						}}
						className='mt-[2rem]'
					>
						About this symptom checker
					</h3>
					<div className='p-[1rem] leading-relaxed'>
						{AboutText.map((item, index) => (
							<p className='flex items-center gap-4' key={index}>
								<AuthenticationIcon />
								{item}
							</p>
						))}
					</div>
				</div>
				<div className='flex-1'>
					<Image alt='NextUI hero Image' src='https://iconfont.alicdn.com/p/illus/preview_image/WyXLRVsfNont/313e7957-74d2-4464-8cd9-df28643a2abb.png' />
					<Image
						className='mt-[3rem]'
						alt='NextUI hero Image'
						src='https://iconfont.alicdn.com/p/illus/preview_image/WyXLRVsfNont/149ff3af-46fd-45d6-b221-53eefb9d0231.png'
					/>
				</div>
			</div>
		</DiagnosticFramework>
	);
}

export default IntroductionComponentA;
