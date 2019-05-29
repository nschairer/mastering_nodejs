const products = [];

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
    console.log(req.body);
    products.push({title: req.body.title});
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    console.log('GET SHOP ROUTE')
    //can't use ../ cause / refers to root folder on OS not project for web    
    //STATIC
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    //TEMPLATING -- defined templating engine so just file name w/o extension
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length,
        activeShop: true,
        productCSS: true
    });
}