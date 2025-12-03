import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {

    const [email, setEmail] =  useState('');
    const [password,setPassword] = useState('');

    const onsubmitHandler = async(e) => {
        try{
          e.preventDefault();
          const response = await axios.post(backendUrl + '/api/user/admin' ,{email,password});
          if(response.data.success){
             setToken(response.data.token)
          }else{
            toast.error(response.data.message)
          }
        }
        catch(error){
          console.log(error);
          toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full top-0 right-0 left-0 bg-black bg-opacity-45 relative'>
        <div className='flex flex-col border shadow-md px-4 py-4 w-[80%] md:w-[70%] lg:w-[40%] lg:h-[60%] bg-gray-50 absolute'>
           <h1 className='font-bold text-xl lg:mt-5'>Admin panel</h1>
           <form onSubmit={onsubmitHandler} className='flex flex-col gap-6'>
           <div className='mt-5  font-medium'>
            <label htmlFor='email'>Email</label> <br/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' name='email' placeholder='Enter your email address' className='outline-none text-sm bg-gray-50 mt-3 w-full' required/>
            <hr/>
            </div> 
            <div className=' font-medium'>
              <label htmlFor='password'>Password</label><br/>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' name='password' placeholder='Enter your password here' className='outline-none text-sm bg-gray-50 mt-3 flex justify-between w-full' required/> 
              <hr/>   
            </div>
            <button type='submit' className='px-6 py-2 text-sm bg-black text-white mt-4 w-full lg:mt-8'>Login</button> 
            </form>  
        </div>
    </div>
  )
}

export default Login