import express from 'express';
import { cartItem } from '../../interfaces';
import addData from '../models/modify_cart';
const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
router.get('/info', (req, res, next) =>{
    const response = {
        username: 'orangethefish',
        cart: 24
    }
    res.json(response);
})

router.post('/update-cart', (req, res, next) =>{
    try{
        const cartItems: cartItem[] = req.body;
        const uniqueCartItems = new Set();
        // Add each cart item to the set.
        cartItems.forEach((cartItem) => {
            uniqueCartItems.add(cartItem);
        });
        // Convert the set back to an array.
        const filteredCartItems = Array.from(uniqueCartItems) as cartItem[];
        // Update the prices and timestamps of the filtered cart items.
        filteredCartItems.forEach((cartItem) => {
            const newPrice = Number(cartItem.price.replace(/\D/g, ""));
            cartItem.price = newPrice;
        });
        // Add the filtered cart items to the database.
        addData(filteredCartItems);
        res.status(200).json({ message: 'Received' }); 
    }catch(err){
        console.log(err);
    }
})
export default router;