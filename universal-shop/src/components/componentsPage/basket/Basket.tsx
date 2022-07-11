import React from 'react'
import './Basket.scss'

import BasketIcon from '../../../assets/img/shoping_list.png'

export const Basket: React.FC = () => {

  return (
    <div className='basket'>
        <div className="basket__icon">
            <img src={BasketIcon} alt="basket"/>
        </div>
    </div>
  )
}
