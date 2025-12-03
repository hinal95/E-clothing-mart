import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import auth from '../middleware/auth.js'
import {allOrders, updateStatus, placeOrders, placeOrdersStripe, placeOrdersRazorpay, userOrders, verifyStripe} from '../controllers/orderController.js'

const orderRouter = express.Router();

//Admin feature
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment features
orderRouter.post('/place',auth, placeOrders)
orderRouter.post('/stripe', auth, placeOrdersStripe)
orderRouter.post('/razorpay', auth, placeOrdersRazorpay)

// User feature
orderRouter.post('/userorders', auth, userOrders)

//verify

orderRouter.post('/verifyStripe', auth, verifyStripe)

export default orderRouter;