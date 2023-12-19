import DiagnosticFramework from '@/components/DiagnosticFramework';
import { WarnIcon } from '@/components/Icon/AcmeLogo';
import { Button} from '@nextui-org/react';
import { Divider, Form, Button as ButtonAnd, Input, Radio } from 'antd';
import React, { useRef, useState } from 'react';
import PreviewWindow from './components/PreviewWindow';
import { HealthStatus } from '@/type';

function SelectionProcess({ paginate, medicalTreatmentChoice }: { paginate: (newDirection: number) => void; medicalTreatmentChoice: (myArray: HealthStatus) => void }) {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);
	const fileRef = useRef<HTMLInputElement>(null);
	const SelectList = [
		{
			name: 'I have diabetes',
			key: 'diabetes',
		},
		{
			name: 'I’m overweight or obese',
			key: 'obese',
		},
		{
			name: 'I have hypertension',
			key: 'hypertension',
		},
		{
			name: 'I have smoked cigarettes for at least 10 years',
			key: 'smoking',
		},
		{
			name: 'I have history of anemia',
			key: 'anemia',
		},
		{
			name: 'I have high cholesterol',
			key: 'cholesterol',
		},
	];
	const onSubmit = () => {
		fileRef.current?.click();
	};

	const onBack = () => {
		paginate(-1);
	};

	const onFinish = (values: any) => {
		if (values) {
			medicalTreatmentChoice(values);
			paginate(1);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const showDrawer = (index: number) => {
		setOpen(true);
		var val = '';
		switch (index) {
			case 0:
				val = 'Please answer YES if a doctor has ever said he|she has diabetes.';
				break;
			case 1:
				val = `Overweight or obesity may be determined by calculating the body mass index (BMI). The BMI is calculated by dividing the person's weight in kilograms by the height in meters and dividing the result again by the height in meters. BMI above 25 in an adult indicates overweight, and above 30 indicates obesity. In teenagers, BMI is assessed with growth charts – 85th-95th percentile is overweight, above 95th is obese. Current BMI can also be assessed with online BMI calculators.`;
				break;
			case 2:
				val = `Diagnosed hypertension refers to the condition where a medical professional has confirmed high blood pressure in a patient. This definition excludes isolated instances of self-measured high blood pressure without a prior official diagnosis or treatment of hypertension.`;
				break;
			case 3:
				val = `Confirm this option if you currently smoke cigarettes or if you have smoked cigarettes for at least 10 years in the past.`;
				break;
			case 4:
				val = `Anemia is a common condition that typically refers to a series of symptoms caused by a lower than normal level of red blood cells and hemoglobin in the body. The red blood cells in the human body are primarily responsible for carrying oxygen to various parts of the body, and when the quantity or quality of red blood cells is insufficient, it can lead to inadequate delivery of oxygen to the body's tissues and organs, resulting in symptoms such as fatigue, weakness, dizziness, shortness of breath, pale skin, and rapid heartbeat.`;
				break;
			case 5:
				val = `Elevated cholesterol values in a healthy person are considered to be: total cholesterol above 190 mg/dl (5.0 mmol/l) or LDL fraction above 115 mg/dl (3.0 mmol/l). However, cholesterol levels may be considered elevated even at lower values in people with chronic diseases, e.g., diabetes, kidney disease, hypertension, or smoking cigarettes.`;
				break;
			default:
				break;
		}
		setText(val);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<DiagnosticFramework
			headText='Please check all the statements that apply!'
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
			<div>
				<p className='px-8'>All those questions are single-selected.</p>
				<Divider className='mb-1' />
				<Form name='basic' className='process-form px-4' onFinish={onFinish} onFinishFailed={onFinishFailed}>
					{SelectList.map((item, index) => (
						<>
							<Form.Item
								key={index}
								label={<div className='text-[1.2rem]'>{item.name}</div>}
								name={item.key}
								rules={[{ required: true, message: 'Please select one answer' }]}
							>
								<Radio.Group size='large'>
									<Radio value={'yes'}>Yes</Radio>
									<Radio value={'no'}>No</Radio>
									<Radio value={'unknown'}>Don’t know</Radio>
								</Radio.Group>
							</Form.Item>
							<div className='px-1 text-[#1470c8] pb-2 flex items-center gap-1 '>
								<span className='cursor-pointer'>
									<WarnIcon fill={'#1470c8'} />
								</span>
								<span className='cursor-pointer' onClick={() => showDrawer(index)}>
									What does it mean?
								</span>
							</div>
							<Divider className='mt-1 mb-1' />
						</>
					))}

					<ButtonAnd className='opacity-0' ref={fileRef} htmlType='submit'>
						Submit
					</ButtonAnd>
				</Form>
				<PreviewWindow headChildren={<div className='text-[1.8rem]'>Explanation</div>} contentChildren={<p>{text}</p>} onClose={onClose} isOpen={open} />
			</div>
		</DiagnosticFramework>
	);
}

export default SelectionProcess;
