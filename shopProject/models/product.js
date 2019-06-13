const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Product {
    constructor(title,price,description,imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description
        this.imageUrl = imageUrl
        this._id = id ? new mongodb.ObjectId(id) : null
        this.userId = userId
    }


    save() {
        const db = getDb();
        let dbOp;
        if(this._id) {
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})
            //update
        } else {
            dbOp = db.collection('products').insertOne(this)
            //insert
        }
        return dbOp
        .then(result => {
            console.log('Deleted product')
        })
        .catch(e => {
            console.log(e)
        })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
        .then(products => {
            console.log(products)
            return products
        })
        .catch(e => {
            console.log(e)
        });
    }

    static findById(prodId) {
        const db = getDb()
        return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
        .then(product => {
            console.log(product)
            return product
        })
        .catch(e => {
            console.log(e)
        })
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
        .then(result => {

        })
        .catch(e => {
            console.log(e)
        });
    }

}


module.exports = Product;