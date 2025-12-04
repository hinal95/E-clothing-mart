import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
    

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [search,setSearch] = useState("");
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate = useNavigate()
    
    const addToCart = async(itemId,size) => {
        let cartData = structuredClone(cartItem);

        if(!size){
            toast.error('select size')
            return;
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }

        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItem(cartData);

        if(token){
          try{
            await axios.post(backendUrl +'/api/cart/add', {itemId,size}, { headers: { token } })
          }
          catch(error){
            console.log(error)
            toast.error(error.message)
          }
        }
    }
      
    const getCartCount = ()=>{
        let totalCount = 0;
        for (let items in cartItem){
            for(let item in cartItem[items]){
                try{
                  if(cartItem[items][item]>0){
                    totalCount += cartItem[items][item]
                  }
                }
                catch(error){
                    console.log(error) 
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity)=>{
         
        const cartData = structuredClone(cartItem);

        cartData[itemId][size] = quantity;
        setCartItem(cartData)
        if(token){
         try{
            await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, { headers: { token } })
          }
          catch(error){
            console.log(error)
            toast.error(error.message)
          }
        }
    }

    const getTotalCartAmount = ()=>{
      if (!products || products.length === 0) return 0;
      let totalAmount = 0;
      for(let productId in cartItem){
        const itemInfo = products.find((product)=>product._id === productId);
        for(let size in cartItem[productId]){
            try{
               if(cartItem[productId][size]>0){
                totalAmount += itemInfo.price * cartItem[productId][size];
               }
            }
            catch(error){
              console.log(error)
            }
        }
      }
      return totalAmount;
    }
    
    const getProductList = async() =>{
     try{
        const response = await axios.get(backendUrl+ '/api/product/list');
           if(response.data.success){
              // console.log(response.data.products)
              setProducts(response.data.products)
               toast.success(response.data.message)
             } else{
                toast.error(response.data.message)
            }
        }
      catch(error){
       console.log(error)
       toast.error(error.message)
      }
    }

    const getCartItem = async(token) =>{
      try{
        const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
        if(response.data.success){
          setCartItem(response.data.cartData)
         
        } else{
          toast.error(response.data.message)
        }
      }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
    
    useEffect(()=>{
      getProductList();
    },[])
    
    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getCartItem(localStorage.getItem('token'))
      }
    },[])

    const value ={
      products, currency, delivery_fee,showSearchBar,setShowSearchBar,
      search, setSearch, cartItem, setCartItem, addToCart, getCartCount,
      updateQuantity,getTotalCartAmount, navigate , backendUrl ,token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
