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
    const product = new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId: req.user._id
    })
    product
    .save()
    .then(result => {
        console.log('Created Product')
        res.redirect('/admin/products')
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
    Product.findById(prodId)
    .then(product => {
        product.title = updatedTitle
        product.price = updatedPrice
        product.description = updatedDesc
        product.imageUrl = updatedImageUrl
        return product.save()
    })
    .then(result => {
        console.log('Updated Product!')
        res.redirect('/admin/products')
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getEditProduct = (req, res, next) => {
    console.log('GET EDIT PRODUCT')
    const editMode = req.query.edit;
    if(!editMode) {
       return res.redirect('/')
    }

    const prodId = req.params.productId
    Product.findById(prodId)
    .then(product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
    .catch(e => {
        console.log(e)
    })
}

exports.getProducts = (req, res, next) => {
    console.log('GET ADMIN PRODUCTS')
    Product.find()
    // .select('title price imageUrl -_id')
    // .populate('userId', 'name')
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId =  req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log('Destroyed product')
        res.redirect('/admin/products');

    })
    .catch(e => {
        console.log(e)
    })
}