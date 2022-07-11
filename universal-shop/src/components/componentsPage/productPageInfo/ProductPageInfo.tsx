import React from 'react';
import { useSelector } from 'react-redux';
import { IPrice } from '../../../types';
import { Button } from '../../componentsUI/button/Button';
import { ThingColors } from '../../componentsUI/thingColors/ThingColors';
import { ThingAttributes } from '../../componentsUI/thinkAttributes/ThingAttributes';
import './ProductPageInfo.scss';

interface IAttributes {
    id:string,
    items:[]
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
    prices: IPrice[]
}

export const ProductPageInfo: React.FC<IProductPageInfo> = (props) => {
	const {attributes,brand,description,id, inStock,name,prices} = props;
	const currentCurrency = useSelector((state:any) => state.currency);

	const priceItem = prices.map((item:any) => {
		if(item.currency.label === currentCurrency.label){
			return  `${ item.currency.symbol } ${ item.amount }`;
		}});
    
	return (
		<div className='productPageInfo'>
			<h3 className="productPageInfo__title">{brand}</h3>
			<h4 className="productPageInfo__sub-title">{name}</h4>

			{attributes.map(attr =>{        
				if(attr.name === 'Color'){
					return <ThingColors key={attr.id} name={attr.name} items={attr.items}/>
				}
				return <ThingAttributes key={attr.id} name={attr.name} items={attr.items}/>
			})}
			<h5 className='productPageInfo__price'>
				<div className="productPageInfo__price-title">Price:</div>
				{priceItem}
			</h5>
			<Button/>
			<p 
				className="productPageInfo__description"
				dangerouslySetInnerHTML={{__html: description}}
			/>
		</div>
	);
};
