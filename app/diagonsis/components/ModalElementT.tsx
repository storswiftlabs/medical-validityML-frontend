'use client';
import { CountdownProps } from 'antd/es/statistic/Countdown';
import React from 'react';

function ModalElementT({ value, current }: { value: number; current: number }) {
	// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
	// const onFinish: CountdownProps['onFinish'] = () => {
	// 	console.log('finished!');
	// };

	return (
		<div className='min-h-[16rem] flex flex-col gap-8 items-center justify-center'>
			<h2 className='font-semibold'>The forecast results are being generated, please wait patiently...</h2>
			<p>Details of the results can be found in the Personal Center</p>
		</div>
	);
}

export default ModalElementT;
