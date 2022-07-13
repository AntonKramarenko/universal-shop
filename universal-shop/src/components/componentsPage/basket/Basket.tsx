import React, { useEffect, useState } from 'react';
import BasketIcon from '../../../assets/img/shoping_list.png';
import { BasketItem } from '../basketItem/BasketItem';
import { Button } from '../../componentsUI/button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BasketEmpty } from '../../componentsUI/basketEmpty/BasketEmpty';
import './Basket.scss';
import { addToBasketFromLocalStorage } from '../../../store/basket';

export const Basket: React.FC = () => {
	const [ countItems,setCountItems ] = useState(0);
	const [ isVisible,setVisible ] = useState(false);
	const [ total, setTotal ]=useState(0);
	const basket = useSelector((state:any) => state.basket);
	const currentCurrency = useSelector((state:any) => state.currency);
	const navigate = useNavigate();
	const dispatch = useDispatch();


	useEffect(()=>{
		getDatafromLocalStorage()
	},[])

	useEffect(()=>{
		setCountItems(basket.reduce((prev:number, curr) => prev + curr.count,0));
		currentTotal();
		if(basket.length > 0){
			localStorage.setItem('universalShop::basket', JSON.stringify(basket))
		}
	},[ basket,currentCurrency ]);


	const getDatafromLocalStorage =()=>{
		const currentStorage = localStorage.getItem('universalShop::basket')
		if(currentStorage?.length && currentStorage.length > 0){
			dispatch(addToBasketFromLocalStorage(JSON.parse(currentStorage)))
		}
	}

	const currentTotal =()=>{
		let total:number = 0;
		basket.map(item=>{
			const price = item.prices.filter(item => {if(item.currency.label === currentCurrency.label)return item.amount;});
			total =total + price[0].amount * item.count;
		});
		setTotal(total);
	};

	return (
		<div className='basket'>
			<div className='basket__icon' onClick={()=> setVisible(!isVisible)}>
				{countItems > 0 ? <div className='basket__counts'>{countItems}</div> : null}
				<img src={BasketIcon} alt='basket'/>
			</div>
			{isVisible && <div className='basket__body'>
				<h4 className='basket__title'><b>My bag,</b> {countItems} items</h4>
				<div className='basket__things-box'>
					{basket.length 
						? basket.map(item => {return <BasketItem key={item.id} {...item}/>;})
						: <BasketEmpty/>
					}
				</div>
				<div className='basket__total'>
					<div className='basket__total-title'>Total</div>
					<div className='basket__total-count'>{(total.toFixed(2))}{currentCurrency.symbol}</div>
				</div>
				<div className='basket__btns'>
					<Button 
						activeBtn={true} 
						click={()=> navigate('/basket')} 
						nameButton='View bag'
					/>
					<Button  activeBtn={true} nameButton='CHECK OUT'/>
				</div>
			</div>}
		</div>
	);
};
