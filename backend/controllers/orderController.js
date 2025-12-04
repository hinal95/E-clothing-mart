import orderModel from '../models/orderModel.js'
import userModel from '../models/UserModel.js'
import Stripe from 'stripe'
// import { currency } from '../../admin/src/App.jsx'


// global variable
const currency = 'inr'
const deliveryCharges = 10
// gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// place order by using cod 
const placeOrders = async (req, res) =>{
  try{
    const {userId, amount, address, items} = req.body
    const orderData = {
       userId,
       items,
       amount,
       address,
       paymentMethod : 'COD',
       payment : false,
       date: Date.now()
    }
    
    const newOrder = new orderModel(orderData)
    await newOrder.save()
    
    await userModel.findByIdAndUpdate(userId, {cartData:{}})
    res.json({success: true, message: 'order placed'})
  }
  catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//place order by using strip
const placeOrdersStripe = async (req,res) =>{
  try{
 const {userId, items, amount, address} = req.body
 const {origin} = req.headers

 const orderData = {
  userId,
  items,
  amount,
  address,
  paymentMethod:"Stripe",
  payment:'false',
  date:Date.now()
 }
 const newOrder = new orderModel(orderData)
 await newOrder.save()

 const line_items = items.map((item)=>({
  price_data: {
    currency:'inr',
    product_data: {
      name: item.name
    },
    unit_amount: item.price * 100
  },
  quantity: item.quantity
 }))

 line_items.push({
  price_data: {
    currency:currency,
    product_data: {
      name: "Delivery Charges"
    },
    unit_amount: deliveryCharges * 100
  },
  quantity: 1
 })

 const session = await stripe.checkout.sessions.create({
   success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
   cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
   line_items,
   mode: 'payment'
 })
 res.json({success:true, session_url:session.url})
}
catch(error){
  console.log(error)
   res.json({success:false, message:error.message})
}
}

//verify stripeMethod
const verifyStripe = async (req,res) =>{
  const {userId, orderId, success} = req.body
  try{
    if(success === 'true'){
       await orderModel.findByIdAndUpdate(orderId, {payment:true})
       await userModel.findByIdAndUpdate(userId, {cartData:{}})
       res.json({success:true})
    } else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  }
  catch(error){
    console.log(error)
     res.json({success:false, message:error.message})
  }
}

// All orders data for admin panel
const allOrders = async (req,res) =>{
 try{
   const orders = await orderModel.find({})
   res.json({success:true, orders})
 }
 catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
 }
}

// User order data for frontend

const userOrders = async (req, res) =>{

  try{
    const { userId } = req.body
    const orders = await orderModel.find({userId})
  
    res.json({success:true, orders})
  }
  catch(error){
     console.log(error)
    res.json({success:false, message:error.message})
  }
}

// update status from admin panel
const updateStatus = async (req, res) =>{
  try{
  const {orderId, status} = req.body
  await orderModel.findByIdAndUpdate(orderId, {status})
  res.json({success:true, message:"status updated"})
  }

catch(error){
  console.log(error)
  res.json({success:false, message:error.message})
}
}
export {allOrders, placeOrders, placeOrdersStripe, userOrders, updateStatus,verifyStripe }