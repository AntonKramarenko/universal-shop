
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAttributesItem, changeCountItem } from '../../../store/basket';
import {  IPrice } from '../../../types';
import { BasketItemImage } from '../../componentsUI/basketItemImage/BasketItemImage';
import { BusketItemCount } from '../../componentsUI/busketItemCount/BusketItemCount';
import { ThingColors } from '../../componentsUI/thingColors/ThingColors';
import { ThingAttributes } from '../../componentsUI/thinkAttributes/ThingAttributes';
import './BasketItem.scss';


interface IAtribut {
    displayValue:string,
    id:string,
    value:string,
    __typename:string
}
interface IAttributes {
    id:string,
    items:IAtribut[]
    name:string,
    type:string
}

interface IBasketItem{
    attributes:IAttributes[],
    brand: string,
    gallery: string[],
    id:string,
    inStock: boolean,
    name: string,
    prices:IPrice[],
    selectAttributes: any,
    count:number
}

export const BasketItem: React.FC<IBasketItem> = (props) => {
	const {id,name, brand,gallery,attributes,prices,selectAttributes,count} = props;
	const currentCurrency = useSelector((state:any) => state.currency);
	const [ currentAttributes, setCurrentAttributes ] = useState(selectAttributes);
	const dispatch = useDispatch();

	useEffect(()=>{
		changeAttributesHandler();
		// eslint-disable-next-line 
	},[ currentAttributes ]);

    
	const priceItem = prices.map((item:any) => {
		if(item.currency.label === currentCurrency.label){
			return  `${ item.currency.symbol } ${ (item.amount* count).toFixed(2) }`;
		}});

	const setItemCountHandler =(value:number)=>{
		dispatch(changeCountItem({id: id, count: value}));
	};

	const changeAttributesHandler =()=>{
		let currentId = id.split('-').slice( 0 , -(Object.values(currentAttributes).length)).join('-');
		let newThingId =currentId+'-'+ Object.values(currentAttributes).join('-');
		dispatch(changeAttributesItem({id:id,newId:newThingId,currentAttributes:currentAttributes,count:count}));
	};
	return (
		<div className='basketItem'>
			<div className='basketItem__info'>
				<h3 className='basketItem__title'>{brand}</h3>
	            <h4 className='basketItem__sub-title'>{name}</h4>
				<div className='basketItem__price'>{priceItem}</div>
				{attributes.map((attr) => {  
					if(attr.name === 'Color'){
						return <ThingColors
							key={attr.id} 
							nameAttribute={attr.name} 
							items={attr.items} 
							currentAttributes={currentAttributes} 
							setCurrentAttributes={setCurrentAttributes} 
						/>;
					}
					return <ThingAttributes 
						key={attr.id} 
						nameAttribute={attr.name} 
						items={attr.items} 
						currentAttributes={currentAttributes} 
						setCurrentAttributes={setCurrentAttributes}
					/>;
				})}
			</div>
			<div className='basketItem__right'>
				<BusketItemCount value={count} setItemCountHandler={setItemCountHandler}/>
				<BasketItemImage gallery={gallery} />
			</div>
		</div>
	);
};
