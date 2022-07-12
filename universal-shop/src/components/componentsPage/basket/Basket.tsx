import React, { useState } from 'react';
import './Basket.scss';

import BasketIcon from '../../../assets/img/shoping_list.png';
import { BasketItem } from '../basketItem/BasketItem';
import { Button } from '../../componentsUI/button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Basket: React.FC = () => {
	const [ isVisible,setVisible ] = useState(false);
	const basket = useSelector((state:any) => state.basket);
	const navigate = useNavigate();


	return (
		<div className='basket'>
			<div className='basket__icon' onClick={()=> setVisible(!isVisible)}>
				<img src={BasketIcon} alt='basket'/>
			</div>
			{isVisible && <div className='basket__body'>
				<h4 className='basket__title'>My bag, 3 items</h4>
				<div className='basket__things-box'>
				{basket.length 
					? basket.map(item => {return <BasketItem {...item}/>})
					:<div>Basket empty</div>
				}
			</div>
				<div className='basket__total'>
          <div className="basket__total-title">Total</div>
          <div className="basket__total-count">200$</div>
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
