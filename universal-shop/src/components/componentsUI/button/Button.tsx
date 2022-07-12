import React from 'react';
import './Button.scss';

interface IButton{
	click?: ()=> void,
	activeBtn: boolean,
	nameButton: string
}

export const Button: React.FC<IButton> = ({click,activeBtn,nameButton}) => {

	if(activeBtn){
		return (
			<button 
				className='button'
				onClick={click}
			>{nameButton}</button>
		);
	}
	return null;
};
