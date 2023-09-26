import express from 'express';

interface cartItem{
    image: string,
    name: string,
    price: string
}

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
        const filtered = cartItems.filter((item, index) => {
            return cartItems.findIndex(i => i.name === item.name) === index;
          });
        for(let cartItem of filtered){
            console.log(cartItem);
        }
        res.status(200).json({ message: 'Received' }); 
    }catch(err){
        console.log(err);
    }
})
export default router;