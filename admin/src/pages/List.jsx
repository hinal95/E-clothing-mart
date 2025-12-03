import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list,setList] = useState([]);

  const fetchList =async() =>{
    try{
      const response = await axios.get( backendUrl + '/api/product/list');
      console.log(response.data)
      setList(response.data.products)
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }
    catch(error){
     console.log(error);
     toast.error(error.message)
    }
  }
  
  const removeProduct = async(id)=>{
   try{
      const response = await axios.post( backendUrl + '/api/product/remove',{id}, {headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
   }
   catch(error){
     console.log(error);
     toast.error(error.message)
   }
  }

  useEffect(()=>{
   fetchList();
  },[])

  return (
    <div>
     <div className='hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-emerald-600 bg-[#d7eadd]'>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
     </div>
     {/* ---------------adding product------ */}
     <div className='mt-3 flex flex-col gap-2'>
      {list.map((item,index)=>(
        <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border px-3 py-2 md:gap-3'>
          <img src={item.image[0]} className='w-12' alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency} {item.price}</p>
          <p onClick={()=>removeProduct(item._id)} className='text-center cursor-pointer'>X</p>
        </div>
      ))}
     </div>
    </div>
  )
}

export default List