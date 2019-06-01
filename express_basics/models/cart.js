const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
     'data', 
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch previous cart
        fs.readFile(p, (e, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!e) {
                cart = JSON.parse(fileContent)
            }
             // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // Add new product/ increase quantity
            if(existingProduct) {
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), e => {
                console.log(e)
            })
        })
       
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (e, fileContent) => {
            if(e) {
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)}
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), e => {
                console.log(e)
            })

        })
    }

    static getCart(cb) {
        fs.readFile(p, (e, fileContent) => {
            if(e) {
                console.log(e)
                cb(null);
            }
            const cart = JSON.parse(fileContent);
            cb(cart);
        })
    }

}