const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const config = require('./config/mongo');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');
const User = require('./models/user');

//ORDER MATTERS --- TOP TO BOTTOM WITH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
//grants read access to path --- when routing in html ignore public and just use /css
app.use(express.static(path.join(__dirname, 'public')));

//access user across app
app.use((req, res, next) => {
    User.findById('5d29409deda95a3fa69b2db5')
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
app.use(authRoutes)
app.use(errorController.get404);

mongoose.connect(config.uri, {useNewUrlParser: true})
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Noah',
                email: 'noah@test.com',
                cart: {
                    items:[]
                }
            })
            user.save()
        }
    })
    app.listen(3000);
})
.catch(e => {
    console.log(e)
})