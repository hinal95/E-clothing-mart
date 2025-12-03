import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { setShowSearchBar, getCartCount, token, setToken, setCartItem, navigate } = useContext(ShopContext);

  const LogOut = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
    navigate('/login')
  }

  return (
    <div className='flex justify-between py-8 items-center'>
      <div>
        <Link to='/'>
          <h1 className='text-3xl text-lime-300'><span className='text-5xl font-serif font-bold text-pink-600'>S</span>avana</h1>
        </Link>

      </div>
      <div >
        <ul className='hidden lg:flex items-center gap-12 pl-16 list-none'>
          <NavLink to='/'><li>Home</li></NavLink>
          <NavLink to='/collection'><li>Collection</li></NavLink>
          <NavLink to='/about'><li>About</li></NavLink>
          <NavLink to='/contact'><li>Contact</li></NavLink>
        </ul>
      </div>
      <div className='flex gap-10 items-center'>
        <img src={assets.search_icon} className='h-5 cursor-pointer' onClick={() => setShowSearchBar(true)} />
        <div className='group relative gap-10 flex items-center'>
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='h-5 cursor-pointer' />
          {/* Dropdown-menu-------- */}
          {token &&
            <div className='group-hover:block hidden absolute right-0 top-2 dropdown-menu pt-6'>
              <div className='bg-slate-300 w-36 h-32 flex flex-col items-center justify-center rounded-md gap-2'>
                <p className='cursor-pointer hover:bg-black hover:w-full hover:text-center hover:p-1 hover:text-white'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:bg-black hover:w-full hover:text-center hover:p-1 hover:text-white'>Orders</p>
                <p onClick={LogOut} className='cursor-pointer hover:bg-black hover:w-full hover:text-center hover:p-1 hover:text-white'>Logout</p>
              </div> </div>}
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='h-5 min-w-5' />
          <p className='absolute w-3.5 h-3.5 aspect-square rounded-full text-[9px] bg-black leading-4 text-center text-white top-3 left-[9px] bottom-3'>{getCartCount()}</p>
        </Link>
        <img src={assets.menu_icon} className='w-5 sm:hidden cursor-pointer' onClick={() => setOpenMenu(true)} />

      </div>

      {/* sidebar menu for smaller screen */}
      {openMenu ? <div className='absolute bg-black/85 h-full w-full bottom-0 overflow-hidden transition-all top-0 left-0 right-0  px-7 text-white'>

        {/* //for menu link */}
        <div className='flex flex-col justify-center items-center mt-36 text-2xl space-y-10 py-10 '>
          <NavLink onClick={() => setOpenMenu(false)} to='/'>Home</NavLink>
          <NavLink onClick={() => setOpenMenu(false)} to='/collection'>collection</NavLink>
          <NavLink onClick={() => setOpenMenu(false)} to='/about'>About</NavLink>
          <NavLink onClick={() => setOpenMenu(false)} to='/contact'>Contact</NavLink>
        </div>
        {/* close button */}
        <div className='absolute right-10 text-3xl font-medium top-5'> <button onClick={() => setOpenMenu(false)} >x</button></div>
      </div>
        : <div className='w-0 h-0'></div>}

    </div>
  )
}

export default Navbar