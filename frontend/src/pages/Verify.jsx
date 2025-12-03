import { useContext } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const Verify = () => {
    const [SearchParams, setSearchParams] = useSearchParams()
    const {token, navigate, setCartItem, backendUrl} = useContext(ShopContext)

    const success = SearchParams.get('success')
    const orderId = SearchParams.get('orderId')

    const verifyPayemnt = async () =>{
    try{
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/verifyStripe', {orderId,success}, {headers:{token}})
      if(response.data.success){
        setCartItem({})
        navigate('/orders')
      } else{
        navigate('/cart')
      }
    } 
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
    }

    useEffect(()=>{
        verifyPayemnt()
    },[token])

    return (
      <div></div>
    )
}
export default Verify 
