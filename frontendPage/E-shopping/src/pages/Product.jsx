import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('');
  const [select, setSelect] = useState('')

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item)
        setImage(item.image[0])
        return null;
      }
    })

  }
  useEffect(() => {
    fetchProduct();
  }, [productId])

  return productData ? (
    <div className='border-t-2 border-b-2 pt-10 transition-opacity ease-in duration-500 opacity-100 pb-10'>
      {/* --------product-data--------- */}
      <div className='flex gap-12 flex-col sm:flex-row '>
        {/* ----------product-image------------ */}
        <div className='flex-1 gap-4 flex flex-col-reverse sm:flex-row'>
          <div className='overflow-x-auto sm:overflow-y-scroll flex sm:flex-col justify-normal w-full sm:w-[18.5%] gap-3'>
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer mb-2' />
            ))}
          </div>
          <div className='w-full sm:w-[83.5%]'>
            <img src={image} className='w-full h-auto' />
          </div>
        </div>
        {/* -----------product-info------------ */}
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3' />
            <img src={assets.star_icon} alt="" className='w-3' />
            <img src={assets.star_icon} alt="" className='w-3' />
            <img src={assets.star_dull_icon} alt="" className='w-3' />
            <p className='font-medium pl-2'>(123)</p>
          </div>
          <p className='font-medium text-3xl mt-5'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-400 w-4/5'>{productData.description}</p>
          <div className='flex my-8 flex-col'>
            <p className='font-medium text-l'>Select Sizes</p>
            <div className='flex gap-3 my-5'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSelect(item)} key={index} className={`bg-gray-200 border-2 px-4 py-2.5 ${item === select ? "border-orange-400" : ""}`}>{item}</button>
              ))}
            </div>
            <button onClick={()=>addToCart(productData._id,select)} className='my-3 py-4 px-4 text-white bg-black w-full lg:w-1/2 active:bg-gray-700 text-sm'>ADD TO CART</button>
            <hr className='w-4/5 bg-gray-400 my-3' />
            <div className='text-gray-400 text-sm gap-1'>
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>East return & exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
        {/*----------------- description $ review section--------- */}
        <div className='mt-20'>
          <div className='flex gap-4 text-sm'>
            <p className='border border-black px-5 py-3 bg-gray-200'>Description</p>
            <p className='border border-black px-5 py-3 bg-gray-200'>Reviews (123)</p>
          </div>
          <div className='border border-black mt-5 px-5 py-5 gap-3 text-sm text-gray-400 flex flex-col'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Saepe quas obcaecati harum, ducimus omnis laboriosam nobis quod, 
              et non incidunt laudantium nesciunt libero nisi voluptatem velit consectetur mollitia atque rerum!</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse quae non dolor magni! Quasi sequi veniam magnam, rem esse est. Molestiae rerum sit fuga doloribus optio impedit. Illo, tempore enim!</p>
          </div>
        </div>
        {/* ------------------related items----------------- */}
        <div >
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
        </div>
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product