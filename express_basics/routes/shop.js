const express = require('express');
const path = require('path');
const router = express.Router();

const adminData = require('./admin')
const rootDir = require('../utils/path');


router.get('/', (req, res, next) => {
    console.log('GET SHOP ROUTE')
    //can't use ../ cause / refers to root folder on OS not project for web    
    //STATIC
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    //TEMPLATING -- defined templating engine so just file name w/o extension
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;