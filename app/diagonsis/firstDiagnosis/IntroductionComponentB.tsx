import { DotIcon, WarnIcon, WarnSvg } from '@/components/Icon/AcmeLogo';
import React, { useMemo, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Divider, Image } from '@nextui-org/react';
import DiagnosticFramework from '@/components/DiagnosticFramework';
import PreviewWindow from './components/PreviewWindow';

function IntroductionComponentB({ paginate }: { paginate: (newDirection: number) => void }) {
	const [selected, setSelected] = React.useState([] as string[]);
	const [isInvalid, setIsInvalid] = useState(false);
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState(false);

	const onSubmit = () => {
		if (selected.length < 2) {
			setIsInvalid(true);
		} else {
			setIsInvalid(false);
			paginate(1);
		}
	};

	const onBack = () => {
		paginate(-1);
		if (isInvalid) {
			setIsInvalid(false);
		}
	};

	const showDrawer = (content: boolean) => {
		setContent(content);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<DiagnosticFramework
			headText='Terms of Service'
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
			<div className='flex flex-1 p-[2rem] pt-[0]'>
				<div className='w-[65%]'>
					<p className='leading-relaxed'>Read the terms of service before performing the symptom assessment.</p>
					<ul className='p-[1rem] leading-relaxed'>
						<li className='flex gap-4'>
							<DotIcon />
							<span>
								<span className='font-semibold'>System assessment is not diagnostic.</span>
								It is provided for informational purposes only and does not constitute qualified medical advice.
							</span>
						</li>
						<li className='flex gap-4 my-[1rem]'>
							<DotIcon />
							<span>
								<span className='font-semibold'>This assessment service is not for emergencies.</span>
								In the event of a medical emergency, please call your local emergency number immediately.
							</span>
						</li>
						<li className='flex gap-4'>
							<DotIcon />
							<span>
								<span className='font-semibold'>Your data provided is secure.</span>
								The information will not be shared or misused.
							</span>
						</li>
					</ul>
					<div className='w-full pl-[1rem] leading-relaxed'>
						<CheckboxGroup value={selected} onValueChange={setSelected}>
							<Checkbox className='w-full items-baseline' isInvalid={!selected.includes('service') && isInvalid} value='service'>
								<span className='text-[#000]'>I have read and accept</span>
								<span
									className='text-[#1471cb] ml-1'
									onClick={(e) => {
										e.preventDefault();
										showDrawer(true);
									}}
								>
									Terms of Service.
								</span>
							</Checkbox>
							{!selected.includes('service') && isInvalid && (
								<div className='text-[0.8rem] flex relative w-[700px] text-[#f31260] items-center gap-1'>
									<WarnIcon fill='#fa514f' />
									<p>Please agree to Terms of Service.</p>
								</div>
							)}
							<Checkbox className='w-full items-baseline' isInvalid={!selected.includes('policy') && isInvalid} value='policy'>
								<span className='text-[#000]'> I agree to have my health information used for assessment.</span>
								<span
									className='text-[#1471cb] ml-1'
									onClick={(e) => {
										e.preventDefault();
										showDrawer(false);
									}}
								>
									<span>Please see the Privacy Policy for more information.</span>
								</span>
							</Checkbox>
							{!selected.includes('policy') && isInvalid && (
								<div className='text-[0.8rem] flex relative w-[700px] text-[#f31260] items-center gap-1'>
									<WarnIcon fill='#fa514f' />
									<p>Please agree to Privacy Policy and the processing of your health information.</p>
								</div>
							)}
						</CheckboxGroup>
						{/* {isInvalid && (
						
						)} */}
					</div>
				</div>
				<div className='flex-1'>
					<WarnSvg />
				</div>
				<PreviewWindow
					headChildren={
						<div>
							<h2 className='text-[1.8rem]'>{content ? 'Terms of Service' : 'Privacy Policy'}</h2>
							<h2 className='text-[1.2rem]'>Last updated: 9/19/2022</h2>
						</div>
					}
					contentChildren={
						<>Consultation is recommended because of the health background and symptoms you have declared, as well as possible conditions they may indicate.</>
					}
					onClose={onClose}
					isOpen={open}
				/>
			</div>
		</DiagnosticFramework>
	);
}
export default IntroductionComponentB;
