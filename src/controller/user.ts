import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
router.get('/info', (req, res, next) =>{
    const response = {
        username: 'Orangethefish',
        cart: 24
    }
    res.json(response);
})
export default router;