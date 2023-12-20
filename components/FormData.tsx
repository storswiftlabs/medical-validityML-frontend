'use client';
import { Button as ButtonA, Form, Space, Tooltip, Typography } from 'antd';
import {
	Button,
	Select,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	SelectItem,
	Link,
} from '@nextui-org/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Data, OperatorList } from '@/constant/Api';
import ModalElementT from '@/app/diagonsis/components/ModalElementT';
import { postPrediction } from '@/utils/request';
import { useAccount } from 'wagmi';

const FormData = ({ data, operatorList, isOpen, onClose }: { onClose: () => void; data: Data; operatorList: OperatorList[]; isOpen: boolean }) => {
	const fileRef = useRef<HTMLInputElement>(null);
	const [[page, direction], setPage] = useState([0, 0]);
	const [selectedKeys, setSelectedKeys] = useState<any>(new Set(['Choose the engine you need']));
	const selectedValue = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys]);
	const [value, setValue1] = useState(0);
	const { address } = useAccount();
	const [isBack, setIsBack] = useState(false);
	const [subResult, setSubResult] = useState({} as any);

	const judgingFunction = (setArr: any) => {
		const setArray = Array.from(setArr);
		return setArray[0] === 'Choose the engine you need';
	};

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const headerText = (page: number) => {
		switch (page) {
			case 0:
				return 'Enter or select the symptoms';
			case 1:
				return 'Choose a diagnostic engine';
			case 2:
				return 'Please be patient';
			default:
				break;
		}
	};

	const IsAnimationComponent = (type: number) => {
		switch (type) {
			case 0:
				return <MyItemForm />;
			case 1:
				return <ModalElementB />;
			default:
				return (
					<div className='flex justify-center items-center flex-col w-full'>
						<ModalElementT current={3} value={value} />
					</div>
				);
		}
	};

	const onFinish = async (values: { [x: string]: any }) => {
		console.log('Received values of form: ', values);

		let result = {
			user: address,
			name: data.name,
			module: Array.from(selectedKeys)[0],
			inputs: [] as any[],
		};

		for (let key in values) {
			let matchedInput = data.inputs.find((item) => item.name === key);
			if (matchedInput) {
				result.inputs.push({
					name: matchedInput.name,
					index: matchedInput.index,
					'select-key': matchedInput.input_method === 'input' ? String(values[key]) : matchedInput.select.find((i) => Number(i.value) == Number(values[key]))?.key, //
					'select-value': String(values[key]),
				});
			}
		}

		setSubResult(result);
		paginate(1);
	};

	function getSelectKeyByName(name: string) {
		const filteredItems = subResult?.inputs?.filter((item: any) => item.name === name);
		const selectKeys = filteredItems.map((item: any) => item['select-value']);
		return selectKeys;
	}

	const MyItemForm = () => {
		return (
			<>
				{data?.inputs?.map((item, index) => {
					if (item.input_method === 'input') {
						console.log(item, 'item');
						return (
							<Form.Item key={index} label={<span className='whitespace-normal text-[#773247] mr-[0.4rem] text-[1rem] max-w-[18rem]'>{item.name}</span>}>
								<Form.Item
									initialValue={isBack ? getSelectKeyByName(item.name) : item.default ? item.default.value : ''}
									name={item.name}
									noStyle
									rules={[
										{
											required: true,
											message: item.warn,
											validator: (_, value) => {
												if (Number.isNaN(Number(value))) {
													return Promise.reject('');
												}
												const decimalPlaces = value.toString().split('.')[1]?.length || 0;
												if (value.toString().split('.')[1]?.length != undefined && decimalPlaces == 0) {
													return Promise.reject('');
												}

												if (decimalPlaces > item.input_decimal_length) {
													return Promise.reject('');
												}
												if (value >= item.input_min && value <= item.input_max) {
													return Promise.resolve();
												} else {
													return Promise.reject('');
												}
											},
										},
									]}
								>
									<Input variant='bordered' id='inp' className='max-w-[18rem] enter-input' style={{ width: 260 }} placeholder='Please input' />
								</Form.Item>
							</Form.Item>
						);
					} else {
						return (
							<Form.Item
								key={index}
								className='my-mpdal'
								label={<span className='whitespace-normal text-[#773247] mr-[0.4rem] text-[1rem] max-w-[18rem]'>{item.name}</span>}
							>
								<Form.Item
									initialValue={isBack ? getSelectKeyByName(item.name) : item.default ? String(item.default.value) : ''}
									name={item.name}
									rules={[{ required: true, message: 'Please select' }]}
								>
									<Select
										defaultSelectedKeys={isBack ? getSelectKeyByName(item.name) : item.default ? String(item.default.value) : ''}
										disallowEmptySelection
										variant='bordered'
										className='max-w-[18rem] h-[2rem] my-select'
										placeholder='Select'
									>
										{item.select.map((animal) => (
											<SelectItem className='h-[2rem] pt-0' key={animal.value} value={animal.key}>
												{animal.key}
											</SelectItem>
										))}
									</Select>
								</Form.Item>
							</Form.Item>
						);
					}
				})}
			</>
		);
	};

	const ModalElementB = () => {
		const modal = [...selectedKeys];

		return (
			<div className='min-h-[16rem] flex justify-center items-center flex-col w-full'>
				<Dropdown>
					<DropdownTrigger>
						<Button variant='bordered' className='capitalize min-w-[10rem]'>
							<div className=' mr-[1rem]'>{selectedValue}</div>
							<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='19590' width='20' height='20'>
								<path
									d='M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z'
									p-id='19591'
								></path>
							</svg>
						</Button>
					</DropdownTrigger>
					<DropdownMenu variant='flat' disallowEmptySelection selectionMode='single' selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
						{operatorList.map((item, index) => (
							<DropdownItem key={item.name}>{item.name}</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
				{/* //TODO Description of the engine to be added */}
				<div className=' w-[60%] text-center'>
					{modal[0] == 'Choose the engine you need' ? 'Models vary in accuracy and focus' : operatorList.find((item) => item.name === modal[0])?.description}
				</div>
			</div>
		);
	};

	return (
		<>
			<Modal
				onClose={() => {
					onClose();
					setPage([0, 0]); // Returns the first component
					setSelectedKeys(new Set(['Choose the engine you need']));
					setIsBack(false);
				}}
				className='z-50 '
				hideCloseButton
				scrollBehavior='inside'
				size={'5xl'}
				isOpen={isOpen}
			>
				<ModalContent>
					<ModalHeader className='flex gap-1'>{headerText(page)}</ModalHeader>
					<ModalBody className='flex flex-row  max-w-full'>
						<AnimatePresence initial={false} custom={direction}>
							<Form
								colon={false}
								labelAlign='left'
								labelCol={{ span: 8 }}
								name='complex-form'
								onFinish={onFinish}
								className={page == 0 ? 'grid grid-cols-2 gap-1 w-full' : 'w-full'}
							>
								{IsAnimationComponent(page)}
								<Form.Item label=''>
									<ButtonA
										onClick={() => {
											console.log('');
										}}
										ref={fileRef}
										type='primary'
										htmlType='submit'
										className='hidden'
									>
										Submit
									</ButtonA>
								</Form.Item>
							</Form>
						</AnimatePresence>
					</ModalBody>
					<ModalFooter>
						{page === 0 ? (
							<Button color='danger' variant='light' onPress={onClose}>
								Close
							</Button>
						) : page === 2 ? (
							<></>
						) : (
							<Button
								color='primary'
								onClick={() => {
									setIsBack(true);
									paginate(-1);
								}}
							>
								Back
							</Button>
						)}

						{page === 1 ? (
							<Button
								isDisabled={judgingFunction(selectedKeys)}
								color='primary'
								onClick={async () => {
									// fileRef.current?.click();
									const result = { ...subResult, module: Array.from(selectedKeys)[0] };
									try {
										const ForecastData = await postPrediction(result);
										paginate(1);
									} catch (error) {
										console.error('Error:', error);
									}
								}}
							>
								Submit
							</Button>
						) : page === 2 ? (
							<Link href='/user'>
								<Button color='primary'>Go</Button>
							</Link>
						) : (
							<Button
								color='primary'
								onClick={() => {
									console.log(fileRef.current);
									if (fileRef.current != null) {
										fileRef.current.click();
									}
								}}
							>
								Next
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default FormData;
