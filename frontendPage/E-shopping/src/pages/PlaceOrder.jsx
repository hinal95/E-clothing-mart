import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');
  const {navigate,cartItem,setCartItem, token, products, getTotalCartAmount,backendUrl,delivery_fee} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) =>{
     const name = event.target.name;
     const value = event.target.value;
     setFormData(data => ({...data,[name]:value}))
  }
  
  const HandleSubmit = async (e) => {
   e.preventDefault();
   try{
      let orderItems = []
       for(let items in cartItem){
        for(let item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo  = structuredClone(products.find(product=> product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
       }
       let orderData = {
        address: formData,
        amount: getTotalCartAmount() + delivery_fee,
        items: orderItems
       }

       switch (method) {

        case 'cod':
         const response = await axios.post( backendUrl + '/api/order/place', orderData, {headers:{token}})
         if(response.data.success){
          setCartItem({})
          navigate('/orders')
         } else{
          toast.error(response.data.message)
         }
        break;
        
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else{
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
       }
    }
   catch(error){
    console.log(error)
    toast.error(error.message)
   };
  }

  return (
    <form onSubmit={HandleSubmit} className='flex flex-col items-center justify-center lg:flex-row lg:justify-between border-t lg:px-4 lg:gap-5'>

      {/* ----------left-side-------------------- */}
      <div className='gap-10 w-full md:w-full lg:max-w-[500px]'>
        <div className='text-sm'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className=' flex flex-col gap-6 mt-10'>
          <div className='flex gap-3 '>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First Name' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Last Name' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} type='email' placeholder='Email address' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} type='text' placeholder='Street' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
          <div className='flex gap-3 '>
            <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
            <input required onChange={onChangeHandler} name='state' value={formData.state} type='text' placeholder='State' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
          </div>
         
          <div className='flex gap-3 '>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type='number' placeholder='Zip-code' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} type='number' placeholder='Phone' className='px-3 py-1.5 border border-gray-300 text-sm w-full' />

        </div>
      </div>

      {/* ----------right-side------------- */}
      <div className='min-w-80 mt-10'>
        <div className='text-sm '>
          <CartTotal />
        </div>
        <div>
          <div className='sm:text-sm text-2xl'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>
          <div className='mt-6 flex flex-col md:flex-row gap-4'>
            <div className='flex items-center gap-4 border border-gray-300 px-6 py-2'>
              <p onClick={()=>setMethod('stripe')} className={`h-3 w-3 rounded-full border border-gray-400 cursor-pointer ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='text-sm h-5' />
            </div>
            <div className='flex items-center gap-4 border border-gray-300 px-6 py-2'>
              <p onClick={()=>setMethod('razorpay')} className={`h-3 w-3 rounded-full border border-gray-400 cursor-pointer ${method === 'razorpay' ? 'bg-green-400' : ""}`}></p>
              <img src={assets.razorpay_logo} className='text-sm h-5' />
            </div>
            <div className='flex items-center gap-4 border border-gray-300 px-6 py-2'>
              <p onClick={()=>setMethod('cod')} className={`h-3 w-3 rounded-full border border-gray-400 cursor-pointer ${method === 'cod' ? 'bg-green-400' : ""}`}></p>
              <p className='text-sm font-medium text-gray-400'>CASH IN DELIVERY</p>
            </div>
          </div>
          <button type='submit'  className='text-medium w-full py-3  bg-black md:px-12 md:py-2.5 text-white mt-6'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder