import React from 'react'


const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-4'>
        <div >
            <p className='font-bold text-4xl text-pink-600'>S<span className='text-3xl text-green-400'>avana</span></p>
            <p className='text-xs font-medium text-gray-500'>ADMIN PANEL</p>
        </div>
        <div onClick={()=>setToken('')} className='text-sm bg-gray-500 text-white px-7 py-3 rounded-full font-medium cursor-pointer'>Logout</div>
    </div>
  )
}

export default Navbar