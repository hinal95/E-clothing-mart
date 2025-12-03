import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const {currency,getTotalCartAmount,delivery_fee} = useContext(ShopContext)
  return (
    <div className='mt-10 w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'Total'}/>
        </div>

        <div className='mt-10 flex flex-col gap-3'>
            <div className='flex justify-between '>
                <p>SubTotal</p>
                <p>{currency} {getTotalCartAmount()}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Shipping charge</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + delivery_fee}.00</b>
            </div>
            <hr/>
        </div>
    </div>
  )
}

export default CartTotal