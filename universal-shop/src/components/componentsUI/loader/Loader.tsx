import React from 'react';
import './Loader.scss';

export const Loader = () => {
	return (
		<div className='spinner-container'>
			<div className='spinner-path'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
