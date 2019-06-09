const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

//ORDER MATTERS --- TOP TO BOTTOM WITH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
//grants read access to path --- when routing in html ignore public and just use /css
app.use(express.static(path.join(__dirname, 'public')));

//access user across app
app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    // })
    // .catch(e => {
    //     console.log(e)
    // })
    next()
})

//places admin ahead of every route in adminRoutes
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})