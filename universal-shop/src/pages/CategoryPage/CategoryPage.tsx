import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BoardItemList } from '../../components/componentsPage/pageBoard/BoardItemList'
import { CATEGORY_PRODUCTS } from '../../query/categoryProductsQuery'
import { addCategoryProducts } from '../../store/categoryProducts'

import './CategoryPage.scss'

interface ICategoryPage {
  categoryName: string
}

export const CategoryPage: React.FC<ICategoryPage> = ({categoryName}) => {
  const {data, loading, error} = useQuery(CATEGORY_PRODUCTS(categoryName))
  const [loadPage, setLoadPage] = useState<boolean>(true)
  const productsPage = useSelector((state:any) => state.categoryProducts)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!loading){
      dispatch(addCategoryProducts(data))
      setLoadPage(false)
    }
  },[loading])
  
  if(error) return ( <div>Something wrong</div>)
  if(loadPage) return <div>Loading</div>
  return (
    <div className='categoryPage'>
        <h1 className='categoryPage__title'>{categoryName}</h1>
        <BoardItemList  products={productsPage[categoryName]} />
    </div>
  )
}
