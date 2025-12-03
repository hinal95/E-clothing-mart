import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
// import { products } from '../assets/assets';
import ProductItems from './ProductItems';
import { ShopContext } from '../context/ShopContext';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestseller,setBestSeller] = useState([]);
    
    useEffect(()=>{
        // console.log(products)
        const bestProduct = products.filter((item)=>item.bestseller);
        // console.log("Filtered bestsellers:", bestProduct);
        setBestSeller(bestProduct.slice(0,5));
    },[products])

  return (
    <div className='mt-10'>
        <div>
            <Title text1={"BEST"} text2={"SELLER"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-5 gap-4 pt-10'>
            {bestseller.map((item,index)=>(
                <div key={index} className='text-sm gap-y-2'>
                    <ProductItems id={item._id} name={item.name} image={item.image[0]} price={item.price}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BestSeller