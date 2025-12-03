import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import {ShopContext} from '../context/ShopContext'
import ProductItems from './ProductItems';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    // console.log(products)
    const [latestProduct, setlatestProduct] = useState([]);

    useEffect(()=>{
        setlatestProduct(products.slice(0,10));
    },[products])

  return (
    <div>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='my-10 text-center text-lg font-bold'>Quik, pull up a seat!
            it's time to tune in
        </p>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3  py-5 gap-y-6'>
            {latestProduct.map((item,index)=>(
                <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image[0]}/>
            ))}
        </div>
    </div>
    
  )
}

export default LatestCollection