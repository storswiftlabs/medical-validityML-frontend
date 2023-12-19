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

const FormData: React.FC = () => {
	const fileRef = useRef<HTMLInputElement>(null);
	const [[page, direction], setPage] = useState([0, 0]);

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
				return <MyForm />;
			case 1:
				return <>2</>;
			default:
				return <></>;
		}
	};

	const onFinish = (values: any) => {
		paginate(1);
		console.log('Received values of form: ', values);
	};

	const MyForm = () => {
		return (
			<Form colon={false} labelAlign='left' labelCol={{ span: 8 }} name='complex-form' onFinish={onFinish} className='grid grid-cols-2 gap-4 w-full'>
				<Form.Item label={<span className=' text-[#773247] mr-[0.4rem] text-[1.2rem]'>{'name1'}</span>}>
					<Form.Item name='username' noStyle rules={[{ required: true, message: 'Username is required' }]}>
						<Input variant='bordered' id='inp' className='w-[18rem] enter-input' style={{ width: 260 }} placeholder='Please input' />
					</Form.Item>
				</Form.Item>
				<Form.Item label='Username'>
					<Form.Item name='username12' noStyle rules={[{ required: true, message: 'Username is required' }]}>
						<Input variant='bordered' id='inp' className='w-[18rem] enter-input' style={{ width: 260 }} placeholder='Please input' />
					</Form.Item>
				</Form.Item>
				<Form.Item className='my-mpdal' label='12'>
					<Form.Item name={'1222'} rules={[{ required: true, message: 'Username' }]}>
						<Select disallowEmptySelection variant='bordered' className='w-[18rem] h-[2rem] my-select' placeholder='Select province'>
							<SelectItem key='Zhejiang'>Zhejiang</SelectItem>
							<SelectItem key='Jiangsu'>Jiangsu</SelectItem>
						</Select>
					</Form.Item>
				</Form.Item>
				<Form.Item label=' ' colon={false}>
					<ButtonA ref={fileRef} type='primary' htmlType='submit' className='hidden'>
						Submit
					</ButtonA>
				</Form.Item>
			</Form>
		);
	};

	return (
		<>
			<Modal className='z-50 ' hideCloseButton scrollBehavior='inside' size={'5xl'} isOpen={true}>
				<ModalContent>
					<ModalHeader className='flex gap-1'>{headerText(page)}</ModalHeader>
					<ModalBody className='flex flex-row  max-w-full'>
						<AnimatePresence initial={false} custom={direction}>
							{IsAnimationComponent(page)}
						</AnimatePresence>
					</ModalBody>
					<ModalFooter>
						{page === 0 ? (
							<Button color='danger' variant='light' onPress={() => {}}>
								Close
							</Button>
						) : page === 2 ? (
							<></>
						) : (
							<Button
								color='primary'
								onClick={() => {
									// reset(); // Empty Data react hooks form
									paginate(-1);
								}}
							>
								Back
							</Button>
						)}

						{page === 1 ? (
							<Button
								// isDisabled={judgingFunction(selectedKeys)}
								color='primary'
								onPress={() => {
									paginate(1);
									// submitEvent();
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
									fileRef.current?.click();
									// isValid && paginate(1);
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
