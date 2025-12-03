import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import assets from '../assets/assets'

const Orders = ({ token }) => {

  const [order, setOrder] = useState([])

  const loadData = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      // console.log(response.data)
      if (response.data.success) {
        setOrder(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async(event, orderId)=>{
    try{
    const response = await axios.post(backendUrl + "/api/order/status", {orderId, status:event.target.value}, {headers:{token}})
    if(response.data.success){
      await loadData()
    }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [token])

  return (
    <div>
      <h3>Order page</h3>
      <div className='mt-3'>
        {
          order.map((order, index) => (
            <div key={index} className='grid grid-cols-1 gap-9 text-lg md:grid-cols-[1fr_4fr_2fr] lg:grid-cols-[1fr_4fr_2fr_1fr_1fr] lg:text-sm  lg:items-center border items-start py-4 border-gray-300 px-2'>
              <img className='w-12' src={assets.parcel_icon} alt=''></img>
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span></p>
                    } else {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}</span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium text-base'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='mb-2 font-medium'>Items: {order.items.length}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='font-medium'>{currency} {order.amount}</p>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-3 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders