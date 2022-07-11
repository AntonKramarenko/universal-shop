import './BoardItem.scss'
import { IProduct } from '../../../types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


interface IBoardItem{
    product:IProduct
}


export const BoardItem: React.FC<IBoardItem> = (product) => {
  const currentCurrency = useSelector((state:any) => state.currency)
  const {id, inStock, name, prices,category} = product.product
  const navigate = useNavigate()

  
  const priceItem = prices.map((item:any) => {
         if(item.currency.label === currentCurrency.label){
             return  `${item.currency.symbol} ${item.amount}`
    }})

  return (
    <div className='boardItem' onClick={()=> navigate(`/${category}/${id}`) }>
        <div className="boardItem__img">
            <img src={product.product.gallery[0]} alt="product" />
        </div>
        <div className="boardItem__content">
            <h5 className="boardItem__content-title">{name}</h5>
            <span className="boardItem__content-price">{priceItem}</span>
        </div>
    </div>
  )
}