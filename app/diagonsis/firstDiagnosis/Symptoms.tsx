import DiagnosticFramework from '@/components/DiagnosticFramework';
import { Button, Chip, Listbox, ListboxItem } from '@nextui-org/react';
import { Select } from 'antd';
import React, { useState } from 'react';
import { BodyStructure } from './components/data.js';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

function Symptoms({ paginate }: { paginate: (newDirection: number) => void }) {
	const [valueList, setValueList] = useState([] as string[]);
	const { setValue } = useFormContext(); // retrieve all hook methods
	const notify = () =>
		toast.warn('Add at least one symptom', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});

	const onSubmit = () => {
		if (valueList.length <= 0) {
			return notify();
		}
		const generatedStructure = generateBodyStructure(valueList);
		setValue('symptom_list', generatedStructure);
		paginate(1);
	};

	function generateBodyStructure(symptoms: any) {
		const bodyStructure = [];

		for (const area of BodyStructure) {
			const matchingSymptoms = area.options.filter((option) => symptoms.includes(option.label)).map((option) => option.label);

			if (matchingSymptoms.length > 0) {
				bodyStructure.push({
					position: area.options[0].OptGroup,
					symptoms: matchingSymptoms,
				});
			}
		}

		return bodyStructure;
	}

	const onBack = () => {
		paginate(-1);
	};

	const handleClose = (fruitToRemove: any) => {
		setValueList(valueList.filter((fruit) => fruit !== fruitToRemove));
	};

	const handleChange = (value: string | string[], selectedOptions: any) => {
		if (Array.isArray(value)) {
			setValueList(value);
		} else if (typeof value === 'string') {
			const array = value.split(',');
			// console.log(array);
		} else {
		}
	};

	return (
		<DiagnosticFramework
			headText='Add your symptoms'
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
		
			<h3 className='px-8'>Add all the symptoms you have as you can.</h3>
			<div className='py-[1.5rem] px-[1rem] h-[6rem]'>
				<Select
					notFoundContent={
						<div className='text-[1rem]'>
							<div className='flex items-center gap-4 pl-2 my-2'>
								<h2>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 48 48'
										role='img'
										width={25}
										height={25}
										className='ui-icon sc-evidence-search-no-results__icon'
									>
										<g fill-rule='evenodd'>
											<path d='M24 4C12.953 4 4 12.953 4 24s8.953 20 20 20 20-8.953 20-20S35.047 4 24 4zM0 24C0 10.746 10.746 0 24 0s24 10.746 24 24-10.746 24-24 24S0 37.254 0 24zm0 0'></path>
											<path d='M22 16v8h-4v-8zm8 0v8h-4v-8zM16.79 34.898c0-.003 0-.003-1.79-.898s-1.79-.895-1.79-.898h.005v-.008l.008-.012.015-.027c.012-.02.024-.047.04-.075.03-.058.074-.128.124-.21.106-.168.254-.387.453-.637.395-.5.993-1.133 1.844-1.75C17.426 29.125 20.09 28 24 28s6.574 1.125 8.3 2.383a9.286 9.286 0 0 1 1.845 1.75 6.974 6.974 0 0 1 .578.847c.015.028.027.055.039.075l.015.027.008.012v.008h.004c0 .003 0 .003-1.789.898-1.79.895-1.79.895-1.79.898h.005v.004l.004.008.008.012c0 .004 0 .008.003.008a3.1 3.1 0 0 0-.219-.313 5.52 5.52 0 0 0-1.062-1C28.926 32.875 27.09 32 24 32s-4.926.875-5.95 1.617a5.52 5.52 0 0 0-1.062 1 3.1 3.1 0 0 0-.191.27l-.027.043.003-.008.008-.012.004-.008v-.004zm0 0'></path>
										</g>
									</svg>
								</h2>
								<span>No results</span>
							</div>
							<div className='pl-12 mb-2'>Unfortunately, the symptom was not found.</div>
							<ul className='pl-16 mb-2 list-disc'>
								<li className='mb-2'>Please try to enter single words.</li>
								<li>Keep in mind that you can only select symptoms from the autocomplete list.</li>
							</ul>
						</div>
					}
					className=' h-full'
					mode='multiple'
					onSearch={(value) => {
						// console.log(value, 'val');
					}}
					value={valueList}
					maxTagCount={2}
					placeholder='Search, e.g., headache'
					onChange={handleChange}
					style={{ width: '100%' }}
					options={BodyStructure}
				/>
			</div>
			<div className='mb-[1.5rem] mx-[1rem] p-4 h-[16rem] bg-[#fff] overflow-y-auto rounded-lg'>
				{valueList.length ? (
					<div className='flex gap-2 flex-wrap'>
						{valueList.map((fruit, index) => (
							<Chip key={index} onClose={() => handleClose(fruit)} variant='flat'>
								{fruit}
							</Chip>
						))}
					</div>
				) : (
					<div className=' w-full h-full flex justify-center items-center text-[#5f7285]'>Please ensure that all your symptoms are added.</div>
				)}
			</div>
		</DiagnosticFramework>
	);
}

export default Symptoms;
