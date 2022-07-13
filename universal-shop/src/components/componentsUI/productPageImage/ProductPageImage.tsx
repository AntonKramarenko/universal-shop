import React, { useState } from 'react'
import './ProductPageImage.scss'

interface IProductPagesImage{
    gallery: string[]
}

export const ProductPageImage: React.FC<IProductPagesImage> = (gallery) => {
  const [currentImg,setCurrentImg]= useState(gallery.gallery[0])
  
  return (
    <div className='productPageImage'>
      <div className="productPageImage__selectImgs">
        {gallery.gallery.map(item =>{
          return (<div 
            key={item}
            className="productPageImage__img" 
            onClick={()=>setCurrentImg(item)}
            >
                <img src={item} alt="" />
            </div>
          )
        })}
      </div>
      <div className="productPageImage__currentImg">
        <img src={currentImg} alt="Product" />
      </div>
   
    </div>
  )
}
