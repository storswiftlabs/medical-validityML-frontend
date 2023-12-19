'use client';
import React from 'react';
import { Slider, Button, SliderValue } from '@nextui-org/react';
import DiagnosticFramework from '@/components/DiagnosticFramework';
import { useFormContext } from 'react-hook-form';

function AgeOld({ paginate }: { paginate: (newDirection: number) => void }) {
	const [value, setValue1] = React.useState<SliderValue>(25);

	const { setValue } = useFormContext(); // retrieve all hook methods

	const onSubmit = () => {
		setValue('age', value);
		paginate(1);
	};

	const onBack = () => {
		paginate(-1);
	};

	return (
		<DiagnosticFramework
			headText='How old are you?'
			footer={
				<>
					<Button onPress={onBack} radius='sm' color='primary'>
						Back
					</Button>
					<Button type='submit' onPress={onSubmit} radius='sm' color='primary'>
						Next
					</Button>
				</>
			}
		>
			<div className='flex-1 p-[2rem] max-h-full flex flex-col'>
				<div className='flex flex-col gap-2 w-full justify-center items-center flex-1'>
					<Slider
						defaultValue={18}
						size='lg'
						showTooltip
						aria-label='Volume'
						color='secondary'
						value={value}
						onChange={setValue1}
						minValue={18}
						maxValue={120}
						renderThumb={(props) => (
							<div
								{...props}
								className='group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing'
							>
								<span className='transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80' />
							</div>
						)}
						startContent={
							<Button
								isIconOnly
								className='border border-[#d6dde3]'
								variant='light'
								radius='full'
								onPress={() => setValue1((prev: any) => (prev > 18 ? prev - 1 : 18))}
							>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width={20} hanging={20} role='img' className='ui-icon ui-button__icon'>
									<path fill='#b284e0' d='M8 22h32v4H8zm0 0'></path>
								</svg>
							</Button>
						}
						endContent={
							<Button
								className='border border-[#d6dde3]'
								isIconOnly
								variant='light'
								radius='full'
								onPress={() => setValue1((prev: any) => (prev < 120 ? prev + 1 : 120))}
							>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' width={20} hanging={20} className='ui-icon ui-button__icon'>
									<path fill='#b284e0' d='M26 8h-4v14H8v4h14v14h4V26h14v-4H26zm0 0'></path>
								</svg>
							</Button>
						}
						className='max-w-[90%]'
					/>
					<p className='text-default-500 font-medium text-small text-left w-full p-[1rem]'>Age Selected : {value}</p>
				</div>
			</div>
		</DiagnosticFramework>
	);
}

export default AgeOld;
