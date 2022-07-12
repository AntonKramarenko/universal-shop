import React, { useState } from 'react';
import './BasketItemImage.scss';

interface IBasketItemImage{
    gallery: string[],
}

export const BasketItemImage:React.FC<IBasketItemImage> = ({gallery}) => {
	const [ currentImg, setCurrentImg ] = useState(gallery[0]);
	const [ currentCountImg,setCurrentCountImg ] = useState(1);

	const changeCurrentImgHandler = (value:number) => {
		let length = gallery.length;
		if(currentCountImg + value < 0){return setCurrentCountImg(length-1);}
		if(currentCountImg + value > length){return setCurrentCountImg(0);}
		setCurrentCountImg(currentCountImg + value);
		setCurrentImg(gallery[currentCountImg]);
	};

	return (
		<div className='basketItemImage'>
			<div className='basketItemImage__img'>
				{gallery.length >= 2 
					? <div className='basketItemImage__img-changers'>
						<div className='basketItemImage__img-changer'onClick={() => changeCurrentImgHandler(1)} >+</div>
						<div className='basketItemImage__img-changer' onClick={() => changeCurrentImgHandler(-1)}>-</div>
					</div>
					: null}
				<img src={currentImg} alt='' />
			</div>
		</div>
	);
};
