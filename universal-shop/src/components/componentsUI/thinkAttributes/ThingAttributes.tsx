import React, { useEffect } from 'react';
import './ThingAttributes.scss';

interface IAtribut {
    displayValue:string,
    id:string
    value:string,
    __typename:string
}

interface IThingAttributes{
  nameAttribute:string,
  items:IAtribut[],
  currentAttributes:any,
  setCurrentAttributes: any
}

export const ThingAttributes:React.FC<IThingAttributes> = ({nameAttribute, items,currentAttributes,setCurrentAttributes}) => {

	return (
		<div className='thingAttributes'>
			<h5 className='thingAttributes__name'>{nameAttribute}:</h5>
			<div className='thingAttributes__items'>
				{items.map(item => {
					return <div 
						className={
							currentAttributes[nameAttribute] === item.id 
								? 'active-attribute'
								: ''
						}
						key={item.id}
						onClick={() => setCurrentAttributes(
							{...currentAttributes,
								[nameAttribute] : item.id}
						)}
					>{item.value}</div>;
				})}
			</div>
		</div>
	);
};
