const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    console.log('GET PRODUCTS ROUTE')
    Product.find()
    .then(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log('GET PRODUCT ' + prodId);
    Product.findById(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            pageTitle: product.title, 
            product: product, 
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(e => console.log(e));
}

exports.getIndex = (req, res, next) => {
    console.log('GET INDEX ROUTE')
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/',
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
        });
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postCart = (req, res, next) => {
     console.log('POST TO CART');
     const prodId = req.body.productId
     Product.findById(prodId)
     .then(product => {
         return req.user.addToCart(product);
     })
     .then(result => {
         console.log(result)
         res.redirect('/cart')
     })
     .catch(e => {
         console.log(e)
     })
}

exports.postDelteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(e => console.log(e))
}

exports.getCart = (req, res, next) => {
    console.log('GET CART ROUTE')
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        console.log(user.cart.items)
        const products = user.cart.items
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(e => {
        console.log(e)
    })
}


exports.getOrders = (req, res, next) => {
    console.log('GET ORDERS ROUTE')
    Order.find({"user.userId":req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        })
    })
    .catch(e => console.log(e))
}

exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        console.log(user.cart.items)
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity, product: {...i.productId._doc}}
        })
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
       return order.save();
    })
    .then(result => {
        return req.user.clearCart()
    })
    .then(result => {
        res.redirect('/orders')
    })
    .catch(e => console.log(e))
}