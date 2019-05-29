const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utils/path');

const products = [];

//admin/add-product -> GET
router.get('/add-product', (req, res, next) => {
    console.log('GET ADD PRODUCTS')
    //res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
});

//admin/add-product -> POST
router.post('/add-product', (req, res, next) => {
    console.log('POST PRODUCT')
    console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/');
})

exports.routes = router;
exports.products = products;