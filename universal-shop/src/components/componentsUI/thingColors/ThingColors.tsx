import React from 'react';
import './ThingColors.scss';


interface IAtribut {
    displayValue:string,
    id:string
    value:string,
    __typename:string
}

interface IThingColors{
  nameAttribute:string,
  items:IAtribut[]
  currentAttributes:any,
  setCurrentAttributes: any
}

export const ThingColors:React.FC<IThingColors> = ({nameAttribute, items,currentAttributes, setCurrentAttributes}) => {
	return (
		<div className='thingColors'>
			<div className='thingColors__name'>{nameAttribute}:</div>
			<div className='thingColors__colors'>
				{items.map(item => { 
					return <div 
						className={
							currentAttributes[nameAttribute] === item.id 
								? 'active-color'
								: ''
						}
						key={item.id} 
						style={{backgroundColor: `${ item.value }`}}
						onClick={() => setCurrentAttributes(
							{...currentAttributes,
								[nameAttribute] : item.id}
						)}
					/>;
				})}
			</div>
		</div>
	);
};
