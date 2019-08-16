const express = require('express');
const path = require('path');
const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth')

// const adminData = require('./admin')
// const rootDir = require('../utils/path');
router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

// //put dynamic routes last

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart)

router.post('/cart-delete-item', isAuth, shopController.postDelteProduct)

router.get('/orders', isAuth,shopController.getOrders);

router.post('/create-order', isAuth, shopController.postOrder);



module.exports = router;