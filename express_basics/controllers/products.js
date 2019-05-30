const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    console.log('GET ADD PRODUCTS')
    //res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
}

exports.postAddProduct = (req, res, next) => {
    console.log('POST PRODUCT')
    console.log('body',req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    console.log('GET SHOP ROUTE')
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length,
            activeShop: true,
            productCSS: true
        });
    });
    //can't use ../ cause / refers to root folder on OS not project for web    
    //STATIC
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    //TEMPLATING -- defined templating engine so just file name w/o extension
}