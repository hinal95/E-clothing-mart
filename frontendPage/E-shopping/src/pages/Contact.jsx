import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import Newletter from '../components/Newletter'
const Contact = () => {
  return (
    <div className='border-t '>
      <div>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
       <div className='flex flex-col md:flex-row gap-10 justify-center mt-10'>
        <div>
          <img src={assets.contact_img} className='w-full md:w-96'/>
        </div>
        <div className='flex flex-col items-start gap-6 my-4'>
         
            <p className='font-semibold text-gray-600 text-lg'>Our Store</p>
            <p className='text-sm text-gray-500'>13, Iskon Temple <br/>
              Hg Road, Ahemdabad, India
            </p>
            <p className='text-sm text-gray-500'>Tel: 913232332 <br/>
              Email: admin@gmail.com
            </p>
            <p className='font-semibold text-gray-600 text-lg'>Careers at Savana</p>
            <p className='text-sm text-gray-500'>Learn more about our teams and job opening</p>
            <button className='border border-black px-7 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white'>Explore jobs</button>
          
        </div>
       </div>
       <Newletter/>
    </div>
  )
}

export default Contact