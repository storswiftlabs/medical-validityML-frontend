import React from 'react';
import { Divider } from 'antd';
import { Slider, Button, SliderValue } from '@nextui-org/react';
function DiagnosticFramework({ headText, children, footer }: { headText: string; children: React.ReactNode; footer: React.ReactNode }) {
	return (
		<div className='flex flex-col h-full'>
			<div className='flex-1 p-[1rem] max-h-full flex flex-col'>
				<h2 className='text-[1.6rem] font-semibold p-[1rem] px-8'>{headText}</h2>
				{children}
			</div>
			<div className='h-[4.6rem]'>
				<Divider className='m-[0]' />
				<div className='flex items-center justify-between p-4'>{footer}</div>
			</div>
		</div>
	);
}

export default DiagnosticFramework;
