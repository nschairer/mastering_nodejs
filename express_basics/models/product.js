const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
     'data', 
    'products.json'
)

const getProductsFromFile = (callback) => {
    fs.readFile(p, (e, fileContent) => {
        if(e) {
             return callback([]);
        }
        callback(JSON.parse(fileContent));
    })
}



module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        });
        //have to use arrow function to refer to this
    }

    //static means calling on the class itself, not an instantiated product
    static fetchAll(callback) {
        getProductsFromFile(callback)
    }
}