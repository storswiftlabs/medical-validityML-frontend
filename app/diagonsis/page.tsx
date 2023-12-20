'use client';
import React, { useState } from 'react';
import { Divider } from 'antd';
import { Button } from '@nextui-org/react';
import DiaTable from './components/(table)/DiaTable';
import FirstDiagnosis from './firstDiagnosis/FirstDiagnosis';
import { useSearchParams } from 'next/navigation';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const DiagnosticComponent = ({ title, text, chick }: { title: string; text: string; chick: (e: any) => void }) => {
	return (
		<div className='w-[24rem]'>
			<h3 className='text-[1.5rem] mb-[0.6rem]'>{title}</h3>
			<p className='mb-[2rem]'>{text}</p>
			<div className='flex justify-end'>
				<Button onPress={chick} color='secondary'>
					Getting started
				</Button>
			</div>
		</div>
	);
};

function Page() {
	const pathname = useSearchParams();
	const [content, setContent] = useState<string>(pathname.get('Selection') ?? '0');
	const { openConnectModal, connectModalOpen } = useConnectModal();
	const { address, isConnected } = useAccount();

	const SelectComponents = (content: string) => {
		switch (content) {
			case '0':
				return (
					<div>
						<h2 className='text-center text-[2rem] p-[4rem]'>Identify possible conditions and treatment related to your symptoms. </h2>
						<div className='flex justify-center'>
							<div className='flex items-center'>
								<DiagnosticComponent
									chick={() => {
										if (!isConnected) {
											openConnectModal?.();
											if (connectModalOpen) {
												setContent('1');
											}
											return;
										}
										setContent('1');
									}}
									title='First visit'
									text='Here you can have a brief symptom assessment. The information you provide is secure and will not be shared. The results of your assessment will include:
									Possible causes of your symptoms Advice on next steps.'
								/>
								<Divider className='mx-[2rem] h-full' type='vertical' />
								<DiagnosticComponent
									chick={() => {
										if (!isConnected) {
											openConnectModal?.();
											if (connectModalOpen) {
												setContent('2');
											}
											return;
										}
										setContent('2');
									}}
									title='Return visit'
									text='Based on the symptoms you know
	A brief (2 mins) symptom assessment is performed. The information you provide is secure and will not be shared. Your results will include:
	Advice on what to do next.'
								/>
							</div>
						</div>
					</div>
				);
			case '1':
				return (
					<div className='px-[8rem] pt-[2rem]'>
						<FirstDiagnosis />
					</div>
				);
			case '2':
				return (
					<div className='px-[8rem] pt-[2rem]'>
						<DiaTable />
					</div>
				);
		}
	};

	return <>{SelectComponents(content)}</>;
}

export default Page;
