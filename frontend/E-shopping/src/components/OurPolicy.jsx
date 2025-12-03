import React from 'react'
import {assets} from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col md:flex-row justify-around text-center  md:gap-3 gap-12 mt-20'>
        <div className='space-y-1 text-sm '>
            <img src={assets.exchange_icon} className='h-10 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
         <div className='space-y-1 text-sm'>
            <img src={assets.quality_icon} className='h-10 m-auto mb-5'/>
            <p className='font-semibold'>7 Days Return policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
         <div className='space-y-1 text-sm'>
            <img src={assets.support_img} className='h-10 m-auto mb-5'/>
            <p className='font-semibold'>Best Customer support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy