const express = require('express');
const path = require('path');
const router = express.Router();

const productsController = require('../controllers/products');

// const adminData = require('./admin')
// const rootDir = require('../utils/path');
router.get('/', productsController.getProducts);

module.exports = router;