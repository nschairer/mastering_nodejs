const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');



//ORDER MATTERS --- TOP TO BOTTOM WITH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
//grants read access to path --- when routing in html ignore public and just use /css
app.use(express.static(path.join(__dirname, 'public')));

//access user across app
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(e => {
        console.log(e)
    })
})

//places admin ahead of every route in adminRoutes
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//associations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem })


sequelize
//.sync({force: true})
.sync()
.then(result => {
    return User.findByPk(1)
})
.then(user => {
    if(!user) {
        return User.create({name: 'Noah', email: 'test@test.com'})
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000, () => {console.log('server running on port 3000')});
})
.catch(e => {
    console.log(e)
})

