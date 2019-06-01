const express = require('express');
const path = require('path');
const router = express.Router();

const shopController = require('../controllers/shop');

// const adminData = require('./admin')
// const rootDir = require('../utils/path');
router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

//put dynamic routes last

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart)

router.get('/orders',shopController.getOrders);

router.get('/checkout', shopController.getCheckout);


module.exports = router;