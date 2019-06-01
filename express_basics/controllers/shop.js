const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
    console.log('GET PRODUCTS ROUTE')
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows, 
            pageTitle: 'All Products', 
            path: '/products'
        })
    })
    .catch(e => console.log(e))
    //can't use ../ cause / refers to root folder on OS not project for web    
    //STATIC
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    //TEMPLATING -- defined templating engine so just file name w/o extension
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log('GET PRODUCT ' + prodId);
    Product.findById(prodId)
    .then(([product]) => {
        res.render('shop/product-detail', {pageTitle: product.title, product: product[0], path: '/products'})
    })
    .catch(e => console.log(e));
}

exports.getIndex = (req, res, next) => {
    console.log('GET INDEX ROUTE')
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', {
            prods: rows, 
            pageTitle: 'Shop', 
            path: '/'
        });
    })
    .catch(e => console.log(e))
}

exports.postCart = (req, res, next) => {
    console.log('POST TO CART');
    const prodId = req.body.productId
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    console.log(prodId)
    res.redirect('/cart')
}

exports.postDelteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })
}

exports.getCart = (req, res, next) => {
    console.log('GET CART ROUTE')
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
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