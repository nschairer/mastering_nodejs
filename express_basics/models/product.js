const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

//defining table schema
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;







// const db = require('../utils/database');
// const Cart = require('./Cart');

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         //? removes hidden sql commands
//         return db.execute(
//             'insert into products (title, price, imageUrl, description) values (?, ?, ?, ?)',
//             [this.title, this.price, this.imageUrl, this.description]
//         )
//         //have to use arrow function to refer to this
//     }

//     static deleteById(id) {
        
//     }

//     //static means calling on the class itself, not an instantiated product
//     static fetchAll() {
//         return db.execute('select * from products')
//     }

//     static findById(id) {
//         //? lets mysql inject value to avoid hacks
//         return db.execute('select * from products where products.id = ?', [id]);
//     }

// }