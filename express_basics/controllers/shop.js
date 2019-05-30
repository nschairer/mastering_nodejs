const Product = require('../models/product');



exports.getProducts = (req, res, next) => {
    console.log('GET PRODUCTS ROUTE')
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    });
    //can't use ../ cause / refers to root folder on OS not project for web    
    //STATIC
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    //TEMPLATING -- defined templating engine so just file name w/o extension
}

exports.getIndex = (req, res, next) => {
    console.log('GET INDEX ROUTE')
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    console.log('GET CART ROUTE')
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getCheckout = (req, res, next) => {
    console.log('GET CHECKOUT ROUTE')
    res.render('shop/checkout', {
        path: 'checkout',
        pageTitle: 'Checkout'
    })
}

exports.getOrders = (req, res, next) => {
    console.log('GET ORDERS ROUTE')
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    })
}