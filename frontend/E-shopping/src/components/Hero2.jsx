import React from 'react'
import { assets } from '../assets/assets'
const Hero2 = () => {
  return (
    <div className='mt-36 md:mt-52 lg:mt-44 border w-full'>
         <div className='flex flex-col md:flex-row items-center sm:flex-col'>
              {/* left side of container */}
              <div className='w-full flex flex-col md:py-20 lg:py-20 sm:py-20 py-20 items-center sm:flex-col md:flex-col justify-center md:px-5 sm:px-5  sm:items-center space-y-6'>
                <div className='flex items-center gap-3 text-gray-600'>
                  <p className='w-10 sm:w-16 h-0.5 bg-gray-600 md:w-14 '></p>
                  <p className='font-bold md:text-lg sm:text-base text-sm'>OUR BESTSELLER</p>
                </div>
                <h2 className='prata-regular text-2xl sm:text-3xl md:text-3xl leading-relaxed bg-gradient-to-l from-pink-500 to-yellow-300 bg-clip-text text-transparent'>NEW COLLECTIONS</h2>
                <div className='flex items-center gap-3 text-gray-600'>
                  <p className='font-bold md:text-lg sm:text-base text-sm'>SHOP NOW</p>
                  <p className='w-10 sm:w-16 md:w-14 h-0.5 bg-gray-600'></p>
                </div>
              </div>
              {/* right side of container */}
              <div className=''>
                <img src={assets.hero_img}/>
              </div>
            </div>
    </div>
  )
}

export default Hero2