import React from 'react';
import '../index.css';

function CheckUpCard({ children }: { children: React.ReactNode }) {
	return (
		<div className='cardA'>
            {children}
		</div>
	);
}

export default CheckUpCard;
