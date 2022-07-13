import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  addThingToBasket } from '../../../store/basket';
import { IPrice } from '../../../types';
import { Button } from '../../componentsUI/button/Button';
import { ThingColors } from '../../componentsUI/thingColors/ThingColors';
import { ThingAttributes } from '../../componentsUI/thinkAttributes/ThingAttributes';
import './ProductPageInfo.scss';

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

interface IProductPageInfo{
    brand:string,
    name: string,
    attributes:IAttributes[],
    description: string,
    id:string,
    inStock:boolean,
    prices: IPrice[],
	gallery:string[]
}

export const ProductPageInfo: React.FC<IProductPageInfo> = (props) => {
	const {attributes,brand,description,id, inStock,name,prices,gallery} = props;
	const currentCurrency = useSelector((state:any) => state.currency);
	const dispatch = useDispatch();
	const [ currentAttributes, setCurrentAttributes ] = useState({});
	
	const priceItem = prices.map((item:any) => {
		if(item.currency.label === currentCurrency.label){
			return  `${ item.currency.symbol } ${ item.amount }`;
		}});

	useEffect(()=>{
		startSelectAttributes(attributes);
		// eslint-disable-next-line
	},[]);

	const startSelectAttributes =(attributes)=>{
		let startAttributes = {};
		attributes.map((attr:IAttributes) => {
			startAttributes = {...startAttributes,[attr.name]: attr.items[0].id };
		});
		setCurrentAttributes(startAttributes);		
	};

	const basketAddHandler =()=>{
		let thingId =id+'-'+ Object.values(currentAttributes).join('-');
		let thingValues={id: thingId,name:name,brand:brand,count: 1,selectAttributes: currentAttributes,attributes: attributes,inStock:inStock,prices:prices,gallery:gallery};

		dispatch(addThingToBasket(thingValues));
	};
	
	return (
		<div className='productPageInfo'>
			<h3 className='productPageInfo__title'>{brand}</h3>
			<h4 className='productPageInfo__sub-title'>{name}</h4>
			{attributes.map((attr:IAttributes) => {  
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
			<h5 className='productPageInfo__price'>
				<div className='productPageInfo__price-title'>Price:</div>
				{priceItem}
			</h5>
			<Button nameButton='ADD TO CART' click={basketAddHandler} activeBtn={inStock}/>
			<p 
				className='productPageInfo__description'
				dangerouslySetInnerHTML={{__html: description}}
			/>
		</div>
	);
};