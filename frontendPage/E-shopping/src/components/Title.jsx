import React from 'react'

const Title = ({text1,text2}) => {

  return (
    <div className='mt-20'>
    <div className='flex justify-center items-center gap-3'>
        <p className='text-3xl sm:text-4xl text-teal-500 font-semibold'>{text1}   <span className='text-teal-700'>{text2}</span></p>
        <p className='sm:w-10 w-9 bg-teal-600 h-0.5'></p>
        
    </div>
        
    </div>
  )
}

export default Title