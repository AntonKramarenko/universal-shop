import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CURRENCIES_QUERY } from '../../../query/currenciesQuery';
import { changeCurrentCurrency } from '../../../store/currentCurrency';
import { ICurrency } from '../../../types';
import './SelectCurrency.scss'


export const SelectCurrency: React.FC = () => {
  const {data, loading, error} = useQuery(CURRENCIES_QUERY)
  const currency = useSelector((state:any) => state.currency)
  const dispatch = useDispatch()
  const [currencies, settCurrencies] = useState<ICurrency[]>([])
  const[isActiveBody, setIsActiveBody] = useState<boolean>(false)

  useEffect(()=>{
    if(!loading){
      settCurrencies(data.currencies)
      dispatch(changeCurrentCurrency(data.currencies[0]))
    }
  },[loading])

  const setCUrrentCurrencyHandler = (value: ICurrency)=>{
    dispatch(changeCurrentCurrency(value))
  }

  return (
    <div className='selectCurrency' onClick={()=> setIsActiveBody(!isActiveBody)}>
       <div className="selectCurrency__header">
       <span className='selectCurrency__title'>{currency.symbol} </span>
        <div className='selectCurrency__icon'>{
                isActiveBody 
                    ? <span>&and;</span>
                    : <span>&or;</span>
            }</div>
       </div>

        <div className={isActiveBody ? 'selectCurrency__body selectCurrency__body-active': 'selectCurrency__body '}>
            {
              currencies.map(item => {
                return <span 
                  key={item.label} 
                  onClick={()=> setCUrrentCurrencyHandler(item)}
                 >
                    {item.symbol} {item.label}
                  </span>
              })
            }
        </div>
    </div>
  )
}
