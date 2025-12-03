import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import {ShopContext} from '../context/ShopContext'
import ProductItem from '../components/ProductItems'

const Collection = () => {
   const {products, search, showSearchBar} = useContext(ShopContext)
   const [showFilter, setShowFilter] = useState(false);
   const [filterProducts, setFilterProducts] = useState([])
   const [category, setCategory] = useState([]);
   const [subCategory, setSubCategory] = useState([]);
   const [sortType, setSortType] = useState('relavent');

   const toggleCategory = (e) =>{
      if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(item=>item !== e.target.value));
      }
      else{
        setCategory(prev=> [...prev,e.target.value]);
      }
   }

   const toggleSubCategory =(e) =>{
     if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
     }
     else{
      setSubCategory(prev=> [...prev, e.target.value])
     }
   }

   const applyfilter =()=>{
     let productsCopy = products.slice();   //make a copy of all products

     if(search && showSearchBar){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
     }

      if(category.length >0){               //check if user selected categories
        productsCopy = productsCopy.filter(item => category.includes(item.category))  //keep only products whose category is in the selected list
      }

      if(subCategory.length >0){
         productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
      }

      setFilterProducts(productsCopy);
   }

   const sortProduct =()=>{
      let sortCopy = filterProducts.slice();   //make copy of filter products
        
      switch(sortType){

        case  'Low-High':
        setFilterProducts(sortCopy.sort((a,b)=>(a.price - b.price)))
        break;
        
        case  'High-Low':
        setFilterProducts(sortCopy.sort((a,b)=>(b.price - a.price)))
        break;

        default : 
        applyfilter();  // fallback: just filter without sorting
        break;
      }
   }

   // On mount (first render), set filterProducts to all products
   useEffect(()=>{
    setFilterProducts(products);
  },[products])
  
    // Whenever category, subCategory, search and showSearchBar changes → reapply filters
   useEffect(()=>{
    applyfilter();
   },[category, subCategory, search, showSearchBar])
   
   // Whenever sortType changes → run sorting
   useEffect(()=>{
    sortProduct();
   },[sortType])
  return (

    <div className='flex md:flex-row flex-col gap-3 border-t'>
      {/* <p className='text-xl'  >FILTERS</p> */}
      <div className='mt-10 '>
        <p onClick={() => setShowFilter(!showFilter)} className='text-xl flex gap-3 items-center'> FILTER
          <img src={assets.dropdown_icon} className={`h-5  ${showFilter ? '' : 'rotate-90'}`} />
        </p>
        <div className={`${showFilter ? 'hidden' : ''}`}>
          <div className='border mt-10 min-w-60 w-60 flex flex-col px-4 py-3 '>
            <p className='text-gray-600 text-md font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 my-3 px-2'>
              <p className='flex gap-2'><input type='checkbox' value={'Men'} onChange={toggleCategory}/> Men </p>
              <p className='flex gap-2'><input type='checkbox' value={'Women'} onChange={toggleCategory}/> Women </p>
              <p className='flex gap-2'><input type='checkbox' value={'Kids'} onChange={toggleCategory}/> Kids </p>
            </div>
          </div>
          <div className='border mt-10 min-w-60 w-60 flex flex-col px-4 py-3'>
            <p className='text-gray-600 text-md font-medium'>TYPES</p>
            <div className='flex flex-col gap-2 my-3 px-2'>
              <p className='flex gap-2'> <input type='checkbox' onChange={toggleSubCategory} value={'Topwear'}/> Topwear </p>
              <p className='flex gap-2'> <input type='checkbox' onChange={toggleSubCategory} value={'Bottomwear'}/> Bottomwear </p>
              <p className='flex gap-2'> <input type='checkbox' onChange={toggleSubCategory} value={'Winterwear'}/> Winterwear </p>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex items-center lg:flex-row lg:justify-between px-4 flex-col gap-10 text-center'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-400 p-2 text-sm text-gray-700'>
              <option value={'relavent'}>Sort By: relavent</option>
              <option value={'Low-High'}>Sort By: Low-High</option>
              <option value={'High-Low'}>Sort By: High-Low</option>
            </select>
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5 gap-y-6 px-4 gap-4'>
        {/* map products */}
        {filterProducts.map((item,index)=>(
          <div key={index}>
             <ProductItem id={item._id} name={item.name} image={item.image[0]} price={item.price}/>
          </div>
        ))}
      </div>
      </div>
    
    </div>


  )
}

export default Collection