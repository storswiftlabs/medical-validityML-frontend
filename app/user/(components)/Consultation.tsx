'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Pagination,
	Selection,
	ChipProps,
	Modal,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/react';
import { columns } from './(table)/data';
import '@/components/index.css';
import { CountdownProps } from 'antd/es/statistic/Countdown';
import { fetchList, getDiseaseInfo, getUpDate, postDiagnosticDeletion, postOutcomes, postRecommend } from '@/utils/request';
import { OutcomesType_Data } from '@/constant/Api';
import RenderCell from './RenderCell';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { PlusIcon, SearchIcon } from '@/components/Icon/AcmeLogo';
import { useRouter } from 'next/navigation';

import { debounce } from '@/utils/throttle';
import { toast } from 'react-toastify';

const statusColorMap: Record<string, ChipProps['color']> = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
};

export default function Consultation({ onDataReceived }: { onDataReceived: (length: any) => void }) {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { address } = useAccount();
	const [pagination, setPagination] = useState({
		data: [] as OutcomesType_Data[],
		count: 0,
		page: 0,
		page_size: 10,
	});
	const [isModal, setIsModal] = useState(true);
	const [predictingOutcomes, setPredictingOutcomes] = useState({ result: '', suggestion: [] as string[], nameList: [] as string[], name: '' });
	const [isDel, setIsDel] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [upData, setUpdata] = useState({} as any);
	const [networkPrompt, setNetworkPrompt] = useState(false);
	const notify = () =>
		toast.warn('Network error, failed to view details, please check the network', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});

	const fetchData = useCallback(
		async (address: string, page: number, page_size: number) => {
			let timeoutId: NodeJS.Timeout | null = null;

			try {
				const res = await postOutcomes({ user: address!, page, page_size });
				if (res.data) {
					const timeInSeconds = Math.floor(Date.now() / 1000);
					const hasMatchingItem = res.data.some((item) => {
						return timeInSeconds < item.end_time && item.output === '-1' && item.message === '';
					});

					if (hasMatchingItem && page == 0) {
						timeoutId = setTimeout(() => {
							fetchData(address, page, 10);
						}, 15000);
					} else {
						timeoutId && clearTimeout(timeoutId);
					}
					setPagination((s) => ({ ...s, count: res.count, data: res.data, page, page_size }));
					onDataReceived(res.count);
				}
			} catch (error) {
				// process error
			}
		},
		[onDataReceived]
	);

	const ValidationFunction = async (res: any): Promise<boolean> => {
		const provider = new ethers.providers.JsonRpcProvider('https://calibration.filfox.info/rpc/v1');
		const contract = new ethers.Contract(res?.data?.contract_address, res.data.abi, provider);
		const data = await contract.verify(res.data.proof, [res.data.result]);
		return data;
	};

	useEffect(() => {
		fetchData(address!, 0, 10);
	}, [address, fetchData]);

	const getIntervalFetchData = () => {
		fetchData(address!, pagination.page, pagination.page_size);
	};

	const updatePagination = useMemo(
		() => async (value: string, page: number, page_size: number) => {
			if (value) {
				// const filteredData = allData.filter((item) => item.disease.toLowerCase().includes(value.toLowerCase()));
				const res = await getUpDate({ user: address!, key: value, page, page_size });
				setPagination((s) => ({ ...s, data: res.data, count: res.count, page }));
			} else {
				// setPagination((s) => ({ ...s, data: allData }));
			}
		},
		[address]
	);

	const onPaginationChange = useCallback(
		(page: number) => {
			if (filterValue != '') {
				updatePagination(filterValue, page - 1, 10);
			} else {
				fetchData(address!, page - 1, pagination.page_size);
			}
		},
		[address, fetchData, filterValue, pagination.page_size, updatePagination]
	);

	function splitStringWithRegex(str: string) {
		const regex = /\d+\.[\s\S]+?(?=\d+\.)|\d+\.[\s\S]+$/g;
		const result = str.match(regex);
		return result;
	}

	const handleOpen = async (result: string, name: string) => {
		try {
			const illnessesNameList = await getDiseaseInfo({ disease: name });
			const nameList = illnessesNameList.data.output.result.map((item: any) => item.value);
			const suggestion = await postRecommend({ disease: name });

			if (suggestion?.data) {
				const processedArray = `https://ipfs.io/ipfs/${suggestion.data}`;

				const fetchPromises = await fetchList(processedArray);

				if (fetchPromises != undefined) {
					const strArr = splitStringWithRegex(fetchPromises);
					setPredictingOutcomes({ result, suggestion: strArr || [''], nameList, name });
				} else {
					setNetworkPrompt(true)
					notify();
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsModal(true);
			onOpen();
		}
	};

	const handleOpenDetail = (user: OutcomesType_Data) => {
		setUpdata({ ...user, inputs: JSON.parse(user.inputs) });
		setIsModal(false);
		onOpen();
	};
	const onFinish: CountdownProps['onFinish'] = () => {
		// chronograph trigger
		// location.reload();
		fetchData(address!, pagination.page, pagination.page_size);
		// console.log('finished!');
	};

	useEffect(() => {
		setIsDel(selectedKeys instanceof Set ? selectedKeys.size !== 0 : selectedKeys === 'all');
	}, [selectedKeys]);

	const onSearchChange = useCallback(
		(value?: string) => {
			setSelectedKeys(new Set([]));
			if (value == '') {
				fetchData(address!, 0, 10);
			}
			setFilterValue(value || '');
			updatePagination(value || '', 0, 10);
		},
		[address, fetchData, updatePagination]
	);

	const onDeleteMultipleChoice = useCallback(async () => {
		const keysList = Array.from(selectedKeys, (key: any) => parseInt(key));
		try {
			await postDiagnosticDeletion({ user: address, ids: keysList });
			fetchData(address!, pagination.page, pagination.page_size);
			setFilterValue('');
			setSelectedKeys(new Set([]));
		} catch (err) {
			console.log(err);
		}
	}, [address, fetchData, pagination.page, pagination.page_size, selectedKeys]);

	const onDelete = useCallback(
		async (ids: number) => {
			try {
				await postDiagnosticDeletion({ user: address, ids: [ids] });
				fetchData(address!, pagination.page, pagination.page_size);
				setFilterValue('');
			} catch (err) {
				console.log(err);
			}
		},
		[address, fetchData, pagination.page, pagination.page_size]
	);

	useEffect(() => {
		if (!address) return router.push('/');
	}, [address, router]);

	const viewModal = useCallback(() => {
		if (!networkPrompt) {
			const modalHeader = isModal ? `Diagnosis : ${predictingOutcomes.name}` : 'Records uploaded';
			const modalBody = isModal ? (
				<div>
					<div className='mb-1'>
						<span className=' font-[600]'>The diagnosis is</span> : <div>{predictingOutcomes.result}</div>
					</div>
					<div>
						<span className=' font-[600]'>Results of current disease diagnostic appearances :</span>
					</div>

					<ul className='list-disc px-[2rem]'>
						{predictingOutcomes.nameList.map((item, i) => {
							return (
								<li className='my-[0.4rem]' key={i}>
									{item}
								</li>
							);
						})}
					</ul>
					<div>
						<span className=' font-[600]'>The following are your disease recommendations :</span>
					</div>
					<ul className='list-disc px-[2rem]'>
						{predictingOutcomes.suggestion.map((i) => (
							<li className='my-[0.4rem]' key={i}>
								{i.replace(/"$/, '')}
							</li>
						))}
					</ul>
				</div>
			) : (
				<>
					<ul className='list-disc px-[2rem]'>
						{upData.inputs.map((i: any) => (
							<li className='my-[0.4rem]' key={i}>
								{i.key} : {i.value}
							</li>
						))}
					</ul>
				</>
			);
			return (
				<Modal hideCloseButton size={'2xl'} isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='flex flex-col gap-1'>{modalHeader}</ModalHeader>
								<ModalBody>{modalBody}</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='light' onPress={onClose}>
										Close
									</Button>
									<Button color='primary' onPress={onClose}>
										OK
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			);
		} else {
			<Modal hideCloseButton size={'2xl'} isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>{'12'}</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Close
								</Button>
								<Button color='primary' onPress={onClose}>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>;
		}
	}, [isModal, isOpen, networkPrompt, onClose, predictingOutcomes.name, predictingOutcomes.nameList, predictingOutcomes.result, predictingOutcomes.suggestion, upData.inputs]);

	const topContent = useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						classNames={{
							base: 'w-full sm:max-w-[44%]',
							inputWrapper: 'border-1',
						}}
						placeholder='Search by name...'
						size='sm'
						startContent={<SearchIcon className='text-default-300' />}
						value={filterValue}
						variant='bordered'
						onClear={() => setFilterValue('')}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Button
							onClick={onDeleteMultipleChoice}
							isDisabled={!isDel}
							className='bg-foreground text-background'
							endContent={<PlusIcon width={undefined} height={undefined} />}
							size='sm'
						>
							Delete Check
						</Button>
					</div>
				</div>
			</div>
		);
	}, [filterValue, isDel, onDeleteMultipleChoice, onSearchChange]);

	const bottomContent = useMemo(() => {
		return (
			Math.ceil(pagination.count / pagination.page_size) > 1 && (
				<div className='py-2 px-2 flex justify-between items-center'>
					<Pagination
						showControls
						isDisabled={false}
						classNames={{
							cursor: 'bg-foreground text-background',
						}}
						color='default'
						page={pagination.page + 1}
						total={Math.ceil(pagination.count / pagination.page_size)}
						variant='light'
						onChange={onPaginationChange}
					/>
				</div>
			)
		);
	}, [onPaginationChange, pagination.count, pagination.page, pagination.page_size]);

	const classNames = useMemo(
		() => ({
			wrapper: ['max-h-[382px]', 'max-w-3xl'],
			th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// middle
				'group-data-[middle=true]:before:rounded-none',
				// last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none',
			],
		}),
		[]
	);

	return (
		<>
			<Table
				isCompact
				removeWrapper
				bottomContent={bottomContent}
				bottomContentPlacement='outside'
				checkboxesProps={{
					classNames: {
						wrapper: 'after:bg-foreground after:text-background text-background',
					},
				}}
				classNames={classNames}
				selectedKeys={selectedKeys}
				selectionMode='multiple'
				topContent={topContent}
				topContentPlacement='outside'
				onSelectionChange={(keys: Selection) => {
					if (keys === 'all') {
						const keyList = pagination.data.map((item) => {
							return item.id + '';
						});
						setSelectedKeys(new Set(keyList));
					} else {
						setSelectedKeys(keys);
					}
				}}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn align={'start'} key={column.uid}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={'No more diagnoses were recorded'} items={pagination.data}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									<RenderCell
										getIntervalFetchData={getIntervalFetchData}
										handleOpenDetail={handleOpenDetail}
										onDelete={onDelete}
										ValidationFunction={ValidationFunction}
										onFinish={onFinish}
										user={item}
										columnKey={columnKey}
										handleOpen={handleOpen}
									/>
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			{viewModal()}
		</>
	);
}
