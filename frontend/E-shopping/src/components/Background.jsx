import React from 'react'
import { assets } from '../assets/assets'

const Background = ({count,playStatus}) => {

  if(playStatus){
   return (
     <iframe
      className="w-full lg:h-screen h-1/2 absolute top-24 -z-10 left-0 right-0 "
      src="https://www.youtube.com/embed/IfWYDcVfBVo?autoplay=1&loop=1&mute=1&controls=0&playlist=IfWYDcVfBVo"
      title="Gucci Spring Summer 2025 Fashion Show"
      allow="autoplay; fullscreen"></iframe>
    )
  }

  else if(count===0){
    return(
    <img src={assets.background1} className='w-full lg:h-screen h-1/2 -z-10 absolute left-0 right-0 bottom-0 top-24 object-cover transition-opacity duration-500 ease-in-out opacity-100'/>
    )
  }
  else if(count===1){
    return(
        <img src={assets.hero} className='w-full lg:h-screen h-1/2 -z-10 absolute left-0 right-0 bottom-0 top-24 object-cover transition-opacity duration-500 ease-in-out opacity-100'/>
    )
  }
  else if(count===2){
    return(
      <img src={assets.hero2} className='w-full lg:h-screen h-1/2 -z-10 absolute left-0 right-0 bottom-0 top-24 object-cover transition-opacity duration-500 ease-in-out opacity-100'/>
    )
  }
}

export default Background