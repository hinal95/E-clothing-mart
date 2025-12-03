import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { cartItem, products, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (let items in cartItem) {
        for (let item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItem, products])

  return (
    <div className='border-t-2'>
      <div>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className='mt-10'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='grid grid-cols-[2fr,2fr,0.5fr,0.5fr] border py-2 px-3 items-center gap-5'>

              <img src={productData.image[0]} className='w-16 sm:w-20' />
              <div>
                <p>{productData.name}</p>
                <div className='flex py-2 gap-4'>
                  <p>{currency} {productData.price}</p>
                  <p className='bg-gray-100 px-4 py-2 border'>{item.size}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <input onChange={(e) => e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='max-w-16 border  px-3 py-2' type='number' min={1} defaultValue={item.quantity} />
              </div>

              <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='h-4 cursor-pointer' />
            </div>
          )
        })}
      </div>

      <div className='flex justify-end'>
        <div className='w-full sm:w-[500px]'>
          <CartTotal />
          <div className='flex justify-end w-full pt-4'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm px-10 py-3'>PROCCED TO CHECKOUT</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart