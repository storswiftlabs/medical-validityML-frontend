import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';

const PreviewWindow = ({
	isOpen,
	onClose,
	headChildren,
	contentChildren,
}: {
	isOpen: boolean;
	onClose: () => void;
	headChildren?: React.ReactNode;
	contentChildren: React.ReactNode;
}) => {
	return (
		<Drawer styles={{ body: { padding: '0' } }} width={640} placement='right' closable={false} onClose={onClose} open={isOpen}>
			<div className='site-description-item-profile-p p-[2.5rem] pb-[2rem] bg-[#f3f5f7]'>
				<div onClick={onClose} className='flex justify-end cursor-pointer'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' width={32} height={32} className='ui-icon ui-button__icon'>
						<path d='M42 8.82 39.18 6 24 21.18 8.82 6 6 8.82 21.18 24 6 39.18 8.82 42 24 26.82 39.18 42 42 39.18 26.82 24zm0 0'></path>
					</svg>
				</div>
				{headChildren ? headChildren : <p className='text-[1.8rem]'>Why this recommendation?</p>}
			</div>
			<div className='p-[2.5rem] text-lg'>{contentChildren}</div>
		</Drawer>
	);
};

export default PreviewWindow;
