'use client';
import React, { useMemo, useRef, useState, useCallback } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalElementT from './ModalElementT';
import { CameraIcon } from '@/components/Icon/AcmeLogo';

export default function CasesModal({ isOpen, onClose, operatorList }: { isOpen: boolean; onClose: () => void; operatorList: string[] }) {
	//TODO:to be developed
	const fileRef = useRef<HTMLInputElement>(null);
	const [pictureArr, setPictureArr] = useState<(string | File)[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<any>(new Set(['Choose the engine you need']));
	const [value, setValue] = useState(0);
	const selectedValue = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys]);
	const ModalElementA = useCallback(() => {
		return (
			<>
				<div className='flex justify-between min-h-[16rem] w-full '>
					<div className='w-[49%] min-h-[16rem]  flex flex-col gap-2 justify-center items-center border-r-[1px]'>
						<input
							type='file'
							ref={fileRef}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target?.files && e.target?.files[0];
								file && setPictureArr([...pictureArr, file]);
								const reader = new FileReader();
								reader.onload = function () {
									const dataURL = reader.result as string;
									// setPictureArr([...pictureArr, dataURL])
								};
								file && reader.readAsDataURL(file);
							}}
							className='w-0 h-0 none'
						/>

						<Button as={'div'} onClick={() => fileRef.current?.click()} className='w-[120px] h-[120px]' isIconOnly color='warning' variant='faded'>
							<CameraIcon />
						</Button>

						<p> Uploading form local</p>
					</div>
					<div className='w-[50%] min-h-[16rem] flex justify-center items-center'>
						<Image alt='' width='200' height='200' src='https://lm-app-online.bj.bcebos.com/static/apps/qr-code-4.png' />
					</div>
				</div>
				{/* <div className='flex gap-4 justify-center'>
					{pictureArr.map((item, index) => {
						return (
							<>
								<Chip
									onClose={() => {
										setPictureArr((pict) => pict.filter((_, pictureIndex) => pictureIndex !== index));
									}}
								>
									{item?.name}
								</Chip>
							</>
						);
					})}
				</div> */}
			</>
		);
	}, [pictureArr]);

	const ModalElementB = useCallback(() => {
		return (
			<div className='min-h-[16rem] flex justify-center items-center'>
				<Dropdown>
					<DropdownTrigger>
						<Button variant='bordered' className='capitalize min-w-[10rem]'>
							<span className='mr-[1rem]'>{selectedValue}</span>
							<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='19590' width='20' height='20'>
								<path
									d='M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z'
									p-id='19591'
								></path>
							</svg>
						</Button>
					</DropdownTrigger>
					<DropdownMenu variant='flat' disallowEmptySelection selectionMode='single' selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
						{operatorList.map((item) => (
							<DropdownItem key={item}>{item}</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}, [selectedValue, selectedKeys, operatorList]);

	const AnimationComponent = [ModalElementA, ModalElementB];

	const variants = {
		enter: (direction: number) => {
			return {
				x: direction > 0 ? 1000 : -1000,
				display: 'none',
			};
		},
		center: {
			zIndex: 1,
			x: 0,
			display: 'block',
			opacity: 1,
		},
		exit: (direction: number) => {
			return {
				zIndex: 0,
				x: direction < 0 ? 1000 : -1000,
				display: 'none',
			};
		},
	};

	const [[page, direction], setPage] = useState([0, 0]);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const judgingFunction = (setArr: any) => {
		const setArray = Array.from(setArr);
		return setArray[0] === 'Choose the engine you need';
	};

	const headerText = (page: number) => {
		switch (page) {
			case 0:
				return 'Upload the diagnosis report';
			case 1:
				return 'Choosing a diagnostic engine';
			case 2:
				return 'Please be patient';
			default:
				break;
		}
	};

	const footerButton = (page: number) => {};

	return (
		<>
			<Modal
				hideCloseButton
				size={'5xl'}
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setPictureArr([]);
				}}
			>
				<ModalContent>
					{(onClose: any) => (
						<>
							<ModalHeader className='flex gap-1'>{headerText(page)}</ModalHeader>
							<ModalBody className='flex flex-row overflow-hidden max-w-full'>
								<AnimatePresence initial={false} custom={direction}>
									{page === 2 ? (
										<motion.div
											className='w-full'
											key={3}
											custom={direction}
											variants={variants}
											initial='enter'
											animate={page === 2 ? 'center' : 'exit'}
											exit='exit'
											transition={{
												x: { type: 'spring', stiffness: 100, damping: 30 },
												opacity: { duration: 0.2 },
											}}
											dragElastic={1}
										>
											<ModalElementT current={1} value={value} />
										</motion.div>
									) : (
										AnimationComponent.map((Component, index) => (
											<motion.div
												className='w-full'
												key={Component.name}
												custom={direction}
												variants={variants}
												initial='enter'
												animate={page === index ? 'center' : 'exit'}
												exit='exit'
												transition={{
													x: { type: 'spring', stiffness: 100, damping: 30 },
													opacity: { duration: 0.2 },
												}}
												dragElastic={1}
											>
												{page === 2 ? <></> : <Component />}
											</motion.div>
										))
									)}
								</AnimatePresence>
							</ModalBody>

							<ModalFooter>
								{page === 0 ? (
									<Button color='danger' variant='light' onPress={onClose}>
										Close
									</Button>
								) : (
									<Button color='primary' onClick={() => paginate(-1)}>
										Back
									</Button>
								)}
								{page === 1 ? (
									<Button
										isDisabled={judgingFunction(selectedKeys)}
										color='primary'
										onClick={() => {
											paginate(1);
											// onClose()
										}}
									>
										Submit
									</Button>
								) : page === 2 ? (
									<Button color='primary'>View</Button>
								) : (
									<Button isDisabled={pictureArr.length <= 0} color='primary' onClick={() => paginate(1)}>
										Next
									</Button>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
