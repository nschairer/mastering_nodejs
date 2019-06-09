const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    console.log('GET PRODUCTS ROUTE')
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
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
        res.render('shop/product-detail', {pageTitle: product.title, product: product, path: '/products'})
    })
    .catch(e => console.log(e));
}

exports.getIndex = (req, res, next) => {
    console.log('GET INDEX ROUTE')
    Product.fetchAll()
    .then(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        });
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postCart = (req, res, next) => {
     console.log('POST TO CART');
     const prodId = req.body.productId
     let fetchedCart;
     let newQuantity = 1;
     req.user
     .getCart()
     .then(cart => {
         fetchedCart = cart
        return cart.getProducts({where: {id: prodId}})
     })
     .then(products => {
         let product;
         if(products.length > 0) {
            product = products[0]
         }
         if(product) {
             const oldQuantity = product.cartItem.quantity;
             newQuantity = oldQuantity + 1
             return product;
         }
         return Product.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        })
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postDelteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: {id: prodId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(e => console.log(e))
}

exports.getCart = (req, res, next) => {
    console.log('GET CART ROUTE')
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id)
    //             if(cartProductData) {
    //                 cartProducts.push({productData: product, qty: cartProductData.qty})
    //             }
    //         }

    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products: cartProducts
    //         })
    //     })
    // })
    req.user.getCart()
    .then(cart => {
        return cart.getProducts();
    })
    .then(products => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
        })
    })
    .catch(e => {
        console.log(e)
    })
}


exports.getOrders = (req, res, next) => {
    console.log('GET ORDERS ROUTE')

    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Orders',
            orders: orders
        })
    })
    .catch(e => console.log(e))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })
            );
        })
        .catch(e => console.log(e))
    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders')
    })
    .catch(e => console.log(e))
}