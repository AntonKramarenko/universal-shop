import React, { useEffect, useState } from 'react';
import { Header } from './components/componentsPage/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { addCategories } from './store/categories';
import { GET_ALL_CATEGORIES } from './query/getCategoryQuery';
import { ICategory } from './types';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { ProductPage } from './pages/productPage/ProductPage';


function App() {
  const dispatch = useDispatch()
  const {data, loading, error} = useQuery(GET_ALL_CATEGORIES)
  const [load, setLoad] = useState<boolean>(true)
  const categories:ICategory[]  = useSelector((state:any)  => state.categories)

  useEffect(()=>{
      if(!loading){
          dispatch(addCategories(data.categories)); 
          setLoad(false)
      }
  },[loading])

  const routes = categories.map((category:ICategory, index:number) => {
    if(index === 0){
      return (
      <>
       <Route key={`/${category.name}`}  path={`/${category.name}`}  element={<CategoryPage categoryName={category.name} />} />
       <Route key={`/${category.name}`}  path={`/${category.name}/:id`}  element={<ProductPage/>} />
       <Route path="*" key={`/${category.name}${index}`}  element={ <Navigate to={`/${category.name}`} /> } />
      </>
      )
    }else {
      return (
        <>
        <Route key={`/${ category.name}`}  path={`/${category.name}`}  element={<CategoryPage categoryName={category.name}/>} />
        <Route key={`/${category.name}${index}`} path={`/${category.name}/:id`}  element={<ProductPage/>} />
        </>
      )
    }
  })

  if(error) return ( <div>Something wrong</div>)
  if(load) return <div>Loading</div>

  return (
    <div className='app'>
      {categories.length && <Header categoryLinks={categories}/>}
      <Routes>
        {routes}
      </Routes>
    </div>
  );
}

export default App;