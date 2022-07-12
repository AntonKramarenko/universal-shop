import React from 'react';
import './BasketPage.scss';
import { BasketItem } from '../../components/componentsPage/basketItem/BasketItem';
import { useSelector } from 'react-redux';
import { Button } from '../../components/componentsUI/button/Button';

export const BasketPage: React.FC = () => {
	const basket = useSelector((state:any) => state.basket);
	
	return (
		<div className='basketPage'>
			<h2 className='basketPage__title'>Cart</h2>
			<div className='basketPage__things-box'>
				{basket.length 
					? basket.map(item => {return <BasketItem key={item.id} {...item}/>;})
					:<div>Basket empty</div>
				}
			</div>
			<div className='basketPage__bottom'>
				<span className='basketPage__tax'>Tax 21%: <b>$42.00</b></span>
				<span className='basketPage__quantity'>Quantity: <b>{basket.length}</b></span>
				<span className='basketPage__total'>Total:  <b>$402.00</b></span>
				<Button activeBtn={basket.length } click={()=> alert(1) } nameButton='order'/>
			</div>
		</div>
	);
};
