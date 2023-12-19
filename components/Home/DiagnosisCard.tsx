'use client';
import { Code, Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Heart } from '../Icon/AcmeLogo';
import Link from 'next/link';
import { Datum } from '@/constant/Api';
import { getDiseases } from '@/utils/request';
import { convertImageFormat } from '@/utils/convertImageFormat';
import { useRouter } from 'next/navigation';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

function DiagnosisCard() {
	const [dataList, setList] = useState([] as Datum[]);
	const { openConnectModal, connectModalOpen } = useConnectModal();
	const { address, isConnected } = useAccount();
	const router = useRouter();
	const getListFunction = async () => {
		try {
			const res = await getDiseases();
			if (res.ok) {
				setList(res.data.slice(0,6));
			}
		} catch (error) {
			console.log('DiagnosisCard', error);
		}
	};

	useEffect(() => {
		getListFunction();
	}, []);

	return (
		<div>
			<div className='flex justify-center mb-[0.2rem]'>
				<Code color='success'>commonly seen</Code>
			</div>
			<h2
				onClick={() => {
					if (!isConnected) {
						openConnectModal?.();
					}
					if (isConnected || connectModalOpen) {
						router.push(`/diagonsis?Selection=2`);
					}
				}}
				className='text-[2.5rem] text-center p-[2rem] py-0 hover:underline hover:cursor-pointer'
			>
				Presumptive Diagnosis Operator
			</h2>
			<div className='text-center px-[20%] my-[0.4rem]'>
				Identify possible conditions and treatment related to your symptoms.Each classification you choose is handled by multiple specialist disease models. The ability to
				predict multiple conditions by training multiple disease-specific models for multiple conditions.
			</div>
			<div className='gap-8 grid grid-cols-2 max-w-full p-[10rem] pt-[0] justify-items-center'>
				{dataList.map((item) => (
					<div key={item.name} className='flex items-center justify-around'>
						<div>
							<Image shadow='sm' isBlurred width={128} height={128} alt='NextUI Fruit Image with Zoom' src={convertImageFormat(item.icon)} />
						</div>
						<div className='max-w-[50%]'>
							<h3
								className='text-[1.2rem] font-semibold mb-2 hover:underline'
								onClick={() => {
									if (!isConnected) {
										openConnectModal?.();
									}
									if (isConnected || connectModalOpen) {
										router.push(`/diagonsis?Selection=2&name=${item.name}`);
									}
								}}
							>
								{item.name}
							</h3>
							<p className='your-element'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DiagnosisCard;
