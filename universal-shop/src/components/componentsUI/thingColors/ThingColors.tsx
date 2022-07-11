import React from 'react'
import './ThingColors.scss'

interface IAttributesItems {
  id:string,
  items:[]
  name:string,
  value:string
}

interface IThingColors{
  name:string,
  items:IAttributesItems[]
}

export const ThingColors:React.FC<IThingColors> = ({name, items}) => {



  return (
    <div className='thingColors'>
      <div className="thingColors__name">{name}:</div>
      <div className="thingColors__colors">
      {items.map(item => {       
        return <div key={item.id} style={{backgroundColor: `${item.value}`}}></div>
      })}
      </div>
    </div>
  )
}
