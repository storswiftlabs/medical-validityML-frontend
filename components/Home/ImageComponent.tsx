'use client';
import React from 'react';
import { Button } from '../Button';
import Link from 'next/link';

function ImageComponent() {
	return (
		<div className='bg-no-repeat w-full h-[30rem] bg-center bg-cover flex items-center justify-center relative page-banner' style={{ backgroundImage: 'url(/bg_image_1.jpg)' }}>
			<div className='overlay-dark'></div>
			<div className='text-[#fff] z-10 leading-[3rem] px-[10%]'>
				<h2 className='text-[3.5rem] text-center mb-[2rem]'>Medical-ZKML</h2>
				<p className='text-[1.5rem] text-center mb-[2rem]'>
					One-sentence description: A multi-disease multi-model assisted diagnosis and treatment system based on zero-knowledge proof privacy protection and AI technology
				</p>
				<div className='flex justify-center'>
					<Link href='/diagonsis'>
						<Button />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ImageComponent;
