const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    console.log('GET ADD PRODUCTS')
    //res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
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

exports.postEditProduct = (req, res, next) => {
    
}

exports.getEditProduct = (req, res, next) => {
    console.log('GET EDIT PRODUCT')
    const editMode = req.query.edit;
    if(!editMode) {
       return res.redirect('/')
    }

    const prodId = req.params.productId
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
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