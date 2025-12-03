import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className='grid md:grid-cols-[2fr_1fr_1fr] mt-20 w-full py-4 grid-cols-2 gap-10 px-3'>
        
        <div>
            <p className='text-2xl font-medium text-lime-300'><span className='text-5xl font-serif text-pink-600 font-bold'>S</span>avana</p>
            <p className='text-gray-500 text-balance py-3 text-sm w-3/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ipsa provident quod. 
                Necessitatibus, vel animi debitis corrupti deleniti 
                quam dolorem id voluptatum dolore ab iste. Nulla impedit cum quo libero?</p>
        </div>
        <div>
            <p className='text-lg text-gray-600 font-medium'>COMPANY</p>
            <ul className='text-sm text-gray-500 py-3 space-y-2'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-lg text-gray-600 font-medium'>GET IN TOUCH</p>
            <ul className='text-sm text-gray-500 py-3 space-y-2'>
                <li>+1-212-456-7890</li>
                <li>contact@savana.com</li>
            </ul>
        </div>
    </div>
       <div className='text-center py-10 space-y-4'>
            <hr className='bg-gray-400'/>
            <p className='text-sm '>Copyright2025@savana.com-All right reserved</p>
        </div>
    </div>
  )
}

export default Footer