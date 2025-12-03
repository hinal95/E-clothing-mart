import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] =  useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory]  = useState('Topwear')
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false) 

  const onsubmitHandler = async(e)=>{
    try{
     e.preventDefault();

     const formData = new FormData();

     formData.append('name', name);
     formData.append('description', description);
     formData.append('category', category);
     formData.append('subCategory', subCategory);
     formData.append('price', price);
     formData.append('sizes',JSON.stringify(sizes));
     formData.append('bestseller', bestseller);

     image1 && formData.append('image1',image1)
     image2 && formData.append('image2',image2)
     image3 && formData.append('image3',image3)
     image4 && formData.append('image4',image4)
     
     const response =  await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}})
     if(response.data.success){
      toast.success(response.data.message)
      setName('');
      setDescription('');
      setImage1(false)
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setPrice('')
     }else{
      toast.error(response.data.message)
     }
  }
  
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
}
  return (
    <div>
      <form onSubmit={onsubmitHandler}>
        <div className='flex flex-col items-start gap-4'>
          <p className=' font-bold'>Upload Image</p>
          <div className='flex gap-3 items-center'>
            <label htmlFor='image1'>
               <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} className='w-20 cursor-pointer'/>
            </label>
            <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' className='hidden'/>
            <label htmlFor='image2'>
               <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} className='w-20 cursor-pointer'/>
            </label>
            <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' className='hidden'/>
            <label htmlFor='image3'>
               <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} className='w-20 cursor-pointer'/>
            </label>
            <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3' className='hidden'/>
             <label htmlFor='image4'>
               <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} className='w-20 cursor-pointer'/>
            </label>
            <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id='image4' className='hidden'/>
          </div>
          <div className='w-full'>
            <p className='mb-3 font-bold'>Product name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='enter product name' className='sm:w-[500px] px-3 py-2' required/>
          </div>
          <div className='w-full '>
            <p className='mb-3 font-bold'>Product description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type='text' placeholder='enter product detail' className='sm:w-[500px] px-3 py-2'/>
          </div>
          <div className='flex flex-col sm:flex-row gap-10 w-full'>
            <div>
              <p className='mb-2 font-bold'>Product category</p>
              <select onChange={(e)=>setCategory(e.target.value)} className='px-3 py-2'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                </select>
            </div>
            <div>
              <p className='mb-2 font-bold'>Sub category</p>
              <select onChange={(e)=>setSubCategory(e.target.value)} className='px-3 py-2'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
                </select>
            </div>
            <div>
              <p className='mb-2 font-bold'>Product price</p>
             <input onChange={(e)=>setPrice(e.target.value)} value={price} type='number' placeholder='24' className='px-3 py-1.5 w-[40%]'></input>
            </div>
          </div>
          <div>
            <p className='mb-2 font-bold'>Product sizes</p>
            <div className='flex flex-col sm:flex-row items-center gap-3'>
              <div onClick={()=>setSizes(prev=> prev.includes('S') ? prev.filter(item=> item !== 'S') : [...prev,'S'])}>
                <p className={ `${sizes.includes('S') ? 'bg-[#c6ecd1]' : 'bg-slate-200'} px-4 py-2  cursor-pointer`}>S</p>
              </div>
              <div onClick={(()=>setSizes(prev=> prev.includes('M') ? prev.filter(item=> item!== 'M') : [...prev,'M']))}>
                <p className={ `${sizes.includes('M') ? 'bg-[#c6ecd1]' : 'bg-slate-200'} px-4 py-2  cursor-pointer`}>M</p>
              </div>
               <div onClick={(()=>setSizes(prev=> prev.includes('L') ? prev.filter(item=> item!== 'L') : [...prev,'L']))}>
                <p className={ `${sizes.includes('L') ? 'bg-[#c6ecd1]' : 'bg-slate-200'} px-4 py-2  cursor-pointer`}>L</p>
              </div>
             <div onClick={(()=>setSizes(prev=> prev.includes('XL') ? prev.filter(item=> item!== 'XL') : [...prev,'XL']))}>
                <p className={ `${sizes.includes('XL') ? 'bg-[#c6ecd1]' : 'bg-slate-200'} px-4 py-2  cursor-pointer`}>XL</p>
              </div>
               <div onClick={(()=>setSizes(prev=> prev.includes('XXL') ? prev.filter(item=> item!== 'XXL') : [...prev,'XXL']))}>
                <p className={ `${sizes.includes('XXL') ? 'bg-[#c6ecd1]' : 'bg-slate-200'} px-4 py-2  cursor-pointer`}>XXL</p>
              </div>
            </div>
          </div>
          <div className='flex gap-3'>
            <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestseller'/>
            <label htmlFor='bestseller' className='font-medium'>Add to Bestseller</label>
          </div>
          <button type='submit' className='text-white bg-black w-28 px-3 py-2'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default Add