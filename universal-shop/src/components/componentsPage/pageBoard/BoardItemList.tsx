import React from 'react'
import { IProduct } from '../../../types'
import { Loader } from '../../componentsUI/loader/Loader'
import { BoardItem } from '../boardItem/BoardItem'
import './BoardItemList.scss'

interface IBoardItemList{
    products: IProduct[]
}

export const BoardItemList: React.FC<IBoardItemList> = ({products}) => {

  
    return (
        products
            ?  <div className='boardItemList'>{products.map(item => {return <BoardItem key={`${item.id}`} product={item}/>})}</div>
            : <Loader/>
    )

}
