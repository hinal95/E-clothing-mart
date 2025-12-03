import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItems = ({id,name,image,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='cursor-pointer'>
    <div className='overflow-hidden'>
        <img src={image} className='hover:scale-110 ease-in-out'/>
    </div>
        <p className='text-sm pt-3 text-gray-500'>{name}</p>
        <p className='font-semibold text-gray-600 text-sm'>{currency}{price}</p>
   </Link>
  )
}

export default ProductItems