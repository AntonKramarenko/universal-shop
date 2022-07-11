import React from 'react'
import './ThingAttributes.scss'
interface IAttributesItems {
  id:string,
  items:[]
  name:string,
  value:string
}

interface IThingAttributes{
  name:string,
  items:IAttributesItems[]
}

export const ThingAttributes:React.FC<IThingAttributes> = ({name, items}) => {

  return (
    <div className="thingAttributes">
      <h5 className="thingAttributes__name">{name}:</h5>
      <h5 className="thingAttributes__items">
      {items.map(item => {
        return <div key={item.id}>{item.value}</div>
      })}
      </h5>
    </div>
  )
}
