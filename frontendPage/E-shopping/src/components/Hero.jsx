import React from 'react'
import { assets } from '../assets/assets'

const Hero = ({ heroData, count, setCount, playStatus, setPlayStatus }) => {

  return (
      <div className='flex flex-col md:mt-32 lg:mt-36 mt-32 w-full'>
        <div className='flex md:py-18 lg:py-20 flex-col text-3xl md:text-5xl font-semibold space-y-3 gap-2 text-blue-300'>
          <p>{heroData.text1}</p>
          <p>{heroData.text2}</p>
          <p>{heroData.text3}</p>

        </div>
        <div className='flex justify-between items-center' >
          <ul className='gap-5 rounded-full flex items-center p-1 list-none'>
            <li onClick={() => setCount(0)} className={count === 0 ? "w-3 h-3  rounded-full" : "w-3 h-3 rounded-full bg-white"}></li>
            <li onClick={() => setCount(1)} className={count === 1 ? "w-3 h-3  rounded-full" : "w-3 h-3 rounded-full bg-white"}></li>
            <li onClick={() => setCount(2)} className={count === 2 ? "w-3 h-3  rounded-full" : "w-3 h-3 rounded-full bg-white"}></li>
          </ul>
          <div className='flex items-center gap-5'>
            <img src={playStatus ? assets.pause_icon : assets.play_icon} className='h-9 cursor-pointer' onClick={() => setPlayStatus(!playStatus)} />
            <p className='text-white font-medium'>see your video</p></div>
        </div>
      </div>

  )
}

export default Hero