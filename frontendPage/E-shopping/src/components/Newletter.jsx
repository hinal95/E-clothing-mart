import React from 'react'

const Newletter = () => {

    const onSubmitHandler =(event)=>{
       event.preventDefault();
    }
  return (
    <div className='mt-20 text-center'>
        <p className='text-[22px] font-semibold text-gray-700 mb-3'>Subscribe now and get 20% off</p>
        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, consequatur voluptatum? Molestias eum nesciunt error .</p>

        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 mt-7 flex items-center m-auto my-4 mx-auto border pl-3 gap-3'>
            <input type='email' placeholder='Enter your email' className='w-full outline-none sm:flex-1' required ></input>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newletter