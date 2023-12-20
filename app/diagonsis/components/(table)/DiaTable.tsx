'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, User, Pagination, useDisclosure, Tooltip } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import EnterModal from '../EnterModal';
import { columnsList } from './data';
import '@/components/index.css';
import { Data, Datum, OperatorList } from '@/constant/Api';
import { getDiseaseInfo, getDiseases, getOperatorList, predictionReload } from '@/utils/request';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@/components/Icon/AcmeLogo';
import { convertImageFormat } from '@/utils/convertImageFormat';
import FormData from '@/components/FormData';

export default function DiaTable() {
	const { address, isConnected } = useAccount();
	const [isOpen1, setIsOpen1] = useState(false);
	const { onOpen } = useDisclosure();
	const [allData, setAllData] = useState<Datum[]>([]); // Receive all data
	const [filterValue, setFilterValue] = useState(''); // input box
	const searchParams = useSearchParams();
	const [enterObject, setEnterObject] = useState({} as Data); // Diagnostic information data
	const [operatorList, setOperatorList] = useState<OperatorList[]>([]); // list of operators
	const search = searchParams.get('source');
	const searchName = searchParams.get('name');
	const searchId = searchParams.get('id');
	const [isReset, setIsReset] = useState(searchName && searchId ? true :false);
	const router = useRouter();

	const [pagination, setPagination] = useState({
		data: [] as Datum[],
		count: 0, // aggregate
		pageNum: 1, // current page
		pageSize: 10, // item count (of a consignment etc)
		total: 0, //How many pages
	});

	const onPaginationChange = useCallback(
		//Pagination switching
		(page: number) => {
			setPagination((prevPagination) => ({
				...prevPagination,
				pageNum: page,
				data: allData.slice((page - 1) * prevPagination.pageSize, page * prevPagination.pageSize),
			}));
		},
		[allData]
	);

	useEffect(() => {
		if (!isConnected) {
			return router.push('/')
		}
	}, [isConnected, router]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getDiseases();
				if (res.ok) {
					setAllData(res.data);
					setPagination((prevPagination) => ({ ...prevPagination, count: res.count }));
				}
			} catch (error) {
				alert(error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		// Getting the first page of data on initial load
		setPagination((p) => ({
			...p,
			total: Math.ceil(allData.length / pagination.pageSize),
			data: allData.slice((p.pageNum - 1) * p.pageSize, p.pageNum * p.pageSize),
		}));
	}, [allData, pagination.pageSize]);

	const handleOpen1 = useCallback(
		async (Name: string, searchId?: string | null) => {
			try {
				if (searchName && searchId && isReset) {
					const [res, resp] = await Promise.all([predictionReload({ user: address!, id: Number(searchId) }), getOperatorList()]);
					setEnterObject(res.data);
					setOperatorList(resp.data);
				} else {
					const [res, resp] = await Promise.all([getDiseaseInfo({ disease: Name }), getOperatorList()]);
					setEnterObject(res.data);
					setOperatorList(resp.data);
				}
			} catch (error) {}
			setIsOpen1(true);
		},
		[address, router, searchName]
	);

	const onClose1 = () => {
		setIsReset(false);
		setIsOpen1(false);
	};

	const renderCell = useCallback(
		(item: Datum, columnKey: React.Key, index: number) => {
			switch (columnKey) {
				case 'id':
					return <div>{index + 1}</div>;
				case 'name':
					return (
						<User
							avatarProps={{ radius: 'full', size: 'sm', src: convertImageFormat(item.icon) }}
							classNames={{
								description: 'text-default-500',
							}}
							name={item.name}
						/>
					);
				case 'description':
					return (
						<div className='py-[1rem]'>
							<Tooltip
								isDismissable={true}
								size='sm'
								placement='top'
								delay={0}
								closeDelay={0}
								motionProps={{
									variants: {
										exit: {
											opacity: 0,
											transition: {
												duration: 0.1,
												ease: 'easeIn',
											},
										},
										enter: {
											opacity: 1,
											transition: {
												duration: 0.15,
												ease: 'easeOut',
											},
										},
									},
								}}
								className='bg-[#dee1e6] w-[40rem]'
								content={item.description}
							>
								<span className='containerText1 w-[30rem] '>{item.description}</span>
							</Tooltip>
						</div>
					);
				case 'actions':
					return (
						<Button onClick={() => handleOpen1(item.name)} color='primary' variant='faded'>
							Enter Diagnosis
						</Button>
					);
			}
		},
		[handleOpen1]
	);

	const updatePagination = useMemo(
		() => (value: string) => {
			if (value) {
				const filteredData = allData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
				setPagination((s) => ({ ...s, data: filteredData }));
			} else {
				setPagination((s) => ({ ...s, data: allData }));
			}
		},
		[allData]
	);

	const onSearchChange = useCallback(
		(value?: string) => {
			setFilterValue(value || '');
			updatePagination(value || '');
		},
		[updatePagination]
	);

	const handleOpen = useCallback(() => {
		onOpen();
	}, [onOpen]);

	useEffect(() => {
		if (search) {
			handleOpen();
		} else if (searchName) {
			if (searchId) {
				handleOpen1(searchName, searchId);
			} else {
				handleOpen1(searchName);
			}
		}
	}, [search, searchName, handleOpen, handleOpen1, router, searchId]);

	const TopContent = useMemo(() => {
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
					{/* //TODO:Image upload diagnostic function */}
					{/* <div className='flex gap-3'>
                        <Button onPress={() => handleOpen()} className='bg-foreground text-background' endContent={<PlusIcon width={undefined} height={undefined} />} size='sm'>
                            Upload the cases
                        </Button>
                    </div> */}
				</div>
			</div>
		);
	}, [filterValue, onSearchChange]);

	const hasSearchFilter = Boolean(filterValue);

	const BottomContent = useMemo(() => {
		return (
			pagination.total > 1 && (
				<div className='py-2 px-2 flex justify-between items-center'>
					<Pagination
						showControls
						isDisabled={hasSearchFilter}
						classNames={{
							cursor: 'bg-foreground text-background',
						}}
						color='default'
						page={pagination.pageNum}
						total={pagination.total}
						variant='light'
						onChange={onPaginationChange}
					/>
				</div>
			)
		);
	}, [pagination, hasSearchFilter, onPaginationChange]);

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
				bottomContent={BottomContent}
				bottomContentPlacement='outside'
				showSelectionCheckboxes={false}
				classNames={classNames}
				topContent={TopContent}
				topContentPlacement='outside'
				className='p-[1rem] pt-[0] w-full'
			>
				<TableHeader columns={columnsList}>
					{(column) => (
						<TableColumn key={column.uid} align={'center'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={'No presumptive diagnosis operator found'} items={pagination.data}>
					{pagination.data.map((item, index) => (
						<TableRow key={index}>{(columnKey) => <TableCell>{renderCell(item, columnKey, index)}</TableCell>}</TableRow>
					))}
				</TableBody>
			</Table>
			{/* //TODO:Image upload diagnostic function */}
			{/* <CasesModal operatorList={operatorList} isOpen={isOpen} onClose={onClose} /> */}
			<FormData data={enterObject} operatorList={operatorList}  onClose={onClose1}  isOpen={isOpen1} />
			{/* <EnterModal isReset={isReset} enterObject={enterObject} operatorList={operatorList} isOpen={isOpen1} onClose={onClose1} /> */}
		</>
	);
}
