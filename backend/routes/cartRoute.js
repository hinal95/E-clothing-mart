import express from 'express'
import { addCart, getCart, updateCart } from '../controllers/cartController.js';
import auth from '../middleware/auth.js';


const cartRouter = express.Router();

cartRouter.post('/add',auth, addCart);
cartRouter.post('/update',auth, updateCart);
cartRouter.post('/get',auth, getCart)


export default cartRouter
