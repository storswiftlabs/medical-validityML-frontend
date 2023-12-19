'use client';
import React from 'react';
import '../index.css';
import { useRouter } from 'next/navigation';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const LinkButton = () => {
	return (
		<button className='cat'>
			<p>Experience Now</p>
			<svg stroke-width='4' stroke='currentColor' viewBox='0 0 24 24' fill='none' className='h-6 w-6' xmlns='http://www.w3.org/2000/svg'>
				<path d='M14 5l7 7m0 0l-7 7m7-7H3' stroke-linejoin='round' stroke-linecap='round'></path>
			</svg>
		</button>
	);
};

function FirstDiagnosis() {
	const router = useRouter();
	const { openConnectModal, connectModalOpen } = useConnectModal();
	const { address, isConnected } = useAccount();
	return (
		<div className='p-4 my-[1rem]'>
			<div className='w-full h-[14rem] bg-[#f6f5f8] rounded-[1rem] pt-[3rem] pl-[8rem] flex'>
				<h2 className='home-diagnosis-h2 font-extrabold text-[2.5rem] flex-1'>First Diagnosis</h2>
				<div className='w-[70%] pr-[8rem] pt-2'>
					<span className='home-diagnosis-text text-[1.2rem]'>
						Here you can have a brief symptom assessment. The information you provide is secure and will not be shared. The results of your assessment will include:
						Possible causes of your symptoms Advice on next steps.
					</span>
					<div
						className='mt-8'
						onClick={() => {
							openConnectModal?.();
							if (!isConnected) {
								openConnectModal?.();
							}

							if (isConnected || connectModalOpen) {
								router.push('/diagonsis?Selection=1');
							}
						}}
					>
						<LinkButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default FirstDiagnosis;
