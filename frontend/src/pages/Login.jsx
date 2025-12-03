import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {

      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } 
      else {
        const response = await axios.post(backendUrl+ '/api/user/login', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
         toast.error(response.data.message)
        }

      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
   if(token){
    navigate('/')
   }
  },[token])

  return (
    <div className='border-t w-full'>
      <form onSubmit={onsubmitHandler} className='mt-10 flex flex-col items-center gap-3 sm:gap-1 w-[90%] m-auto sm:max-w-[450px] border border-gray-300 py-5 bg-gray-50'>
        <div className='inline-flex gap-3 items-center'>
          <p className='text-3xl '>{currentState}</p>
          <hr className='border w-8 border-gray-800 mx-2 mt-1' />
        </div>
        <div className='mt-5 flex flex-col gap-4'>
          {currentState === 'Login' ? ''
            : <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Name' className='text-sm border-gray-300 px-3 py-2 border w-full sm:w-[400px]' />}
          <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email' className='text-sm border-gray-300 px-3 py-2 border w-full sm:w-[400px]' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='text-sm border-gray-300 px-3 py-2 border w-full sm:w-[400px]' />
        </div>
        <div className='flex flex-col sm:flex-row gap-3 sm:justify-between mt-1 items-center w-full sm:w-[400px]'>
          <p className='text-sm'>Forget your password?</p>
          <div>
            {currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className='text-sm cursor-pointer'>Create Account</p> : <p onClick={() => setCurrentState('Login')} className='text-sm cursor-pointer'>Login here</p>}
          </div>
        </div>
        <div className='mt-5'>
          <button type='submit' className='bg-black text-white text-sm px-12 py-2'>{currentState === 'Login' ? 'Sign IN' : "Sign Up"}</button>
        </div>
      </form>
    </div>
  )
}

export default Login