const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    console.log('GET ADD PRODUCTS')
    //res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('admin/add-product', {
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title,imageUrl,description,price);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    console.log('GET ADMIN PRODUCTS')
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });
}