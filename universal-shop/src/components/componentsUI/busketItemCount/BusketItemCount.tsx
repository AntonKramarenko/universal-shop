import React from 'react';
import './BusketItemCount.scss'

interface IBusketItemCount{
	value:number,
	setItemCountHandler:(value:number)=>void
}

export const BusketItemCount: React.FC<IBusketItemCount> = ({value,setItemCountHandler}) => {
	return (
		<div className='busketItemCount'>
			<div className='busketItemCount__count' onClick={()=> setItemCountHandler(1)}>+</div>
			<div className='busketItemCount__value' >{value}</div>
			<div className='busketItemCount__count' onClick={()=> setItemCountHandler(-1)}>-</div>
		</div>
	);
};
