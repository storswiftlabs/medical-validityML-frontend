import { Data, DiseaseData, OperatorList } from '@/constant/Api';
import { getDiseaseInfoApi, getOperatorList } from '@/utils/request';
import { Avatar, Button, Chip } from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import EnterModal from '../components/EnterModal';
import './index.css';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { convertImageFormat } from '@/utils/convertImageFormat';
import { useAccount } from 'wagmi';
import FormData from '@/components/FormData';

function ClosePage({ isLoading, diseasesData }: { isLoading: boolean; diseasesData: DiseaseData }) {
	const { address } = useAccount();
	const router = useRouter();
	const [enterObject, setEnterObject] = useState({} as Data); // Diagnostic information data
	const [operatorList, setOperatorList] = useState<OperatorList[]>([]); // list of operators
	const [isOpen1, setIsOpen1] = useState(false);

	const handleOpen1 = useCallback(async (Name: string, id: number) => {
		try {
			const [res, resp] = await Promise.all([getDiseaseInfoApi({ disease: Name, id }), getOperatorList()]);
			setEnterObject(res.data);
			setOperatorList(resp.data);
			setIsOpen1(true);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const onClose1 = () => {
		setIsOpen1(false);
	};

	return (
		<div className='close-page'>
			<div className='h-full flex flex-col'>
				<div className='flex flex-1'>
					<div className='w-[80%] p-8 flex flex-col justify-between'>
						<div>
							<h2 className='text-[1.6rem] py-4'>Diagnostic suggestion</h2>
							<div className='text-[#1677ff] mb-4'>We have provided you with relevant disease recommendations, please select one for further diagnosis</div>
							<h3 className='text-[1.2rem]'>What kind of medical treatment do you plan to get？</h3>
							<div className='flex gap-4 m-6 max-h-[15rem] overflow-y-auto flex-wrap'>
								{isLoading ? (
									<Skeleton />
								) : diseasesData.diseases != null ? (
									diseasesData.diseases?.map((item, index) => (
										<Chip
											onClick={() => handleOpen1(item.name, diseasesData.id)}
											className='cursor-pointer'
											key={index}
											variant='flat'
											avatar={<Avatar name='JW' size='sm' src={convertImageFormat(item.icon)} />}
										>
											{item.name}
										</Chip>
									))
								) : (
									<div className='text-[#fc376b]'>No matching diagnosis was detected for you. Please try restarting the diagnosis process.</div>
								)}
							</div>
						</div>
						<p className='text-[0.8rem] my-6 text-[#8c8c8c]'>
							The list of possible illnesses may be not complete. The assessment is for information purposes only and not qualified as medical advice, and cannot be
							relied upon as a medical diagnosis.
						</p>
						<div className='w-full px-8'>
							<Button
								className='bg-[#000] w-full'
								onPress={() => {
									router.push('/');
								}}
								radius='sm'
								color='primary'
							>
								Close
							</Button>
						</div>
					</div>
					<div className='w-[20%] bg-[#2f91ea]'>
						<div className='mt-12  flex justify-center'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' width={80} height={80} className='ui-icon ui-card__icon'>
								<g fill='#fff' fill-rule='evenodd'>
									<path d='M35.25 31.5a2.25 2.25 0 1 1 4.501.001 2.25 2.25 0 0 1-4.501-.001zm2.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm0 0'></path>
									<path d='M22.5 2.625A2.626 2.626 0 0 1 25.125 0h1.5c.621 0 1.125.504 1.125 1.125V2.25h.75c2.07 0 3.75 1.68 3.75 3.75v8.25c0 7.617-5.98 13.84-13.5 14.23v9.02c0 4.969 4.031 9 9 9a8.998 8.998 0 0 0 8.973-8.293A6.752 6.752 0 0 1 37.5 24.75a6.75 6.75 0 0 1 .727 13.46C37.859 43.68 33.309 48 27.75 48c-5.8 0-10.5-4.7-10.5-10.5v-9.02c-7.52-.39-13.5-6.613-13.5-14.23V6c0-2.07 1.68-3.75 3.75-3.75h.75V1.125C8.25.504 8.754 0 9.375 0h1.5a2.626 2.626 0 0 1 0 5.25h-1.5A1.125 1.125 0 0 1 8.25 4.125V3.75H7.5A2.25 2.25 0 0 0 5.25 6v8.25C5.25 21.293 10.957 27 18 27s12.75-5.707 12.75-12.75V6a2.25 2.25 0 0 0-2.25-2.25h-.75v.375c0 .621-.504 1.125-1.125 1.125h-1.5A2.626 2.626 0 0 1 22.5 2.625zM25.125 1.5a1.125 1.125 0 0 0 0 2.25h1.125V1.5zm7.125 30a5.251 5.251 0 0 1 5.25-5.25 5.251 5.251 0 0 1 5.25 5.25 5.251 5.251 0 0 1-5.25 5.25 5.251 5.251 0 0 1-5.25-5.25zM9.75 3.75V1.5h1.125a1.125 1.125 0 0 1 0 2.25zm0 0'></path>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<FormData data={enterObject} operatorList={operatorList}  onClose={onClose1}  isOpen={isOpen1} />

			{/* <EnterModal isReset={true} enterObject={enterObject} operatorList={operatorList} isOpen={isOpen1} onClose={onClose1} /> */}
		</div>
	);
}

export default ClosePage;
