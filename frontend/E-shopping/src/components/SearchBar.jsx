import React, { useContext, useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

const SearchBar = () => {

    const {search,setSearch,showSearchBar,setShowSearchBar} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(()=>{

   
        if(location.pathname.includes('collection')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    }, [location])

  return showSearchBar && visible ? (
    <div className='border-t border-b flex items-center gap-8 justify-between px-4 bg-gray-100'>
         
            <div className='inline-flex items-center bg-gray-300 border border-gray-300 rounded-full max-w-4xl w-full px-6 my-2'>
                 <input type='text' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} value={search} className='flex-1 outline-none px-3 py-4 cursor-pointer rounded-full'/>
                 <img src={assets.search_icon} className='h-6 cursor-pointer'/>
            </div>
           
          
          <img src={assets.cross_icon} className='w-5 h-5 cursor-pointer'onClick={()=>setShowSearchBar(false)}/>
    </div>
  ) :
  null;
}

export default SearchBar