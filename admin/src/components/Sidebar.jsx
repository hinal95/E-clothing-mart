import React from 'react'
import assets from '../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='min-h-screen w-[18%] border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 px-4 py-3 border-gray-300 border-r-0 border' to='/add'>
             <img src={assets.add_icon} className=' w-5 h-5'/>
             <p className='text-sm hidden md:block'>Add Item</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 px-4 py-3 border-gray-300 border-r-0 border' to='/list'>
              <img src={assets.order_icon} alt=""  className=' w-5 h-5'/>
              <p className='text-sm hidden md:block'>List items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 px-4 py-3 border-gray-300 border-r-0 border' to='/order'>
              <img src={assets.order_icon} alt=""  className=' w-5 h-5'/>
              <p className='text-sm hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar