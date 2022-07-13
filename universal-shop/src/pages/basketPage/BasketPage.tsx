import React, { useEffect, useState } from 'react';
import { BasketItem } from '../../components/componentsPage/basketItem/BasketItem';
import { useSelector } from 'react-redux';
import { Button } from '../../components/componentsUI/button/Button';
import './BasketPage.scss';
import { BasketEmpty } from '../../components/componentsUI/basketEmpty/BasketEmpty';
import { IState } from '../../types';

export const BasketPage: React.FC = () => {
	const basket = useSelector((state:any) => state.basket);
	const currentCurrency = useSelector((state:IState) => state.currency);
	const [ total, setTotal ]=useState(0);
	const [taxValue, setTax] =useState(0)
	const [ countItems,setCountItems ] = useState(0);

	useEffect(()=>{
		setCountItems(basket.reduce((prev:number, curr) => prev + curr.count,0)	);
		currentTotal();
		cuurentTax()
		// eslint-disable-next-line
	},[ basket,total,currentCurrency ]);

	const currentTotal =()=>{
		let total:number = 0;
		basket.map(item=>{
			const price = item.prices.filter(item => {if(item.currency.label === currentCurrency.label)return item.amount;});
			total =total + price[0].amount * item.count;
		});
		setTotal(total);
	};

	const cuurentTax =()=>{
		setTax((total/100)* 21)
	}
	
	return (
		<div className='basketPage'>
			<h2 className='basketPage__title'>Cart</h2>
			<div className='basketPage__things-box'>
				{basket.length 
					? basket.map(item => {return <BasketItem key={item.id} {...item}/>;})
					:<BasketEmpty/>
				}
			</div>
			<div className='basketPage__bottom'>
				<span className='basketPage__tax'>Tax 21%: <b>{currentCurrency.symbol}{(taxValue.toFixed(2))}</b></span>
				<span className='basketPage__quantity'>Quantity: <b>{countItems}</b></span>
				<span className='basketPage__total'>Total:  <b>{currentCurrency.symbol}{(total).toFixed(2)}</b></span>
				<Button activeBtn={basket.length } click={()=> alert(1) } nameButton='order'/>
			</div>
		</div>
	);
};
