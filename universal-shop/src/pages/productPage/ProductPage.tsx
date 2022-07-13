import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductPageInfo } from '../../components/componentsPage/productPageInfo/ProductPageInfo';
import { Loader } from '../../components/componentsUI/loader/Loader';
import { ProductPageImage } from '../../components/componentsUI/productPageImage/ProductPageImage';
import { PRODUCTS_INFO_QUERY } from '../../query/productInfoQuery';
import './ProductPage.scss';

export const ProductPage: React.FC = () => {
	const thinkId = useParams();
	const {data, loading, error} = useQuery(PRODUCTS_INFO_QUERY(`${ thinkId.id }`));
	const [ load, setLoad ] = useState<boolean>(true);

	useEffect(() => {
		if(!loading){
			setLoad(false);
		}
	}, [ loading ]);
    
	if(error) return ( <div>Something wrong</div>);
	if(load) return <Loader/>;
	return (
		<div className='productPage'>
			<ProductPageImage gallery={data.product.gallery}/>
			<ProductPageInfo {...data.product}/>
		</div>
	);
};
