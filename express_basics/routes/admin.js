const express = require('express');
const path = require('path');
const router = express.Router();
// const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');


//admin/add-product -> GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

//admin/add-product -> POST
router.post('/add-product', adminController.postAddProduct)

module.exports = router;
