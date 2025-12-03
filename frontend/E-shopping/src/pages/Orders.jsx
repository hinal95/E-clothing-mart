import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([])

  const fetchOrderready = async () => {
    try {
      if (!token) {
       return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if(response.data.success){
        let allorderitem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status,
            item['payment'] = order.payment,
            item['paymentMethod'] = order.paymentMethod,
            item['date'] = order.date,
            allorderitem.push(item)
          })
        })
        setorderData(allorderitem.reverse())
            
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrderready()
  }, [token])

  return (
    <div className='border-t w-full'>
      <div className='flex flex-col'>
        <div >
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className='flex gap-2 flex-col mt-10'>
          {
            orderData.map((item, index) => (
              <div key={index} className='border border-gray-300 px-3 py-1'>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-8 py-1'>
                    <img src={item.image[0]} className='w-20 flex items-start' />
                    <div className='flex flex-col gap-3'>
                      <p className='text-gray-700 font-medium text-base'>{item.name}</p>
                      <div className='flex gap-3 items-center'>
                        <p className='text-sm font-medium'>{currency} {item.price}</p>
                        <p className='text-sm'>Quantity: {item.quantity}</p>
                        <p className='text-sm'>Size: {item.size}</p>
                      </div>
                      <div className='flex flex-col gap-2 text-xs font-medium'>
                        <p >Date: <span className='text-gray-400'> {new Date(item.date).toDateString()}</span></p>
                        <p>PaymentMethod: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <div className='flex gap-3 items-center justify-center'>
                      <p className='w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm text-gray-600'>{item.status}</p>
                    </div>
                  </div>
                  <button onClick={fetchOrderready} className='border py-2 px-7 text-sm'>Track order</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Orders