const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const config = require('./config/mongo');
const csurf = require('csurf')


const app = express();
const store = new MongoDBStore({
    uri: config.uri,
    collection: 'sessions'
})
const csrfProtection = csurf();

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

app.use(session({
    secret: '1320948iujafksj%dnfaskafdkm$',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(csrfProtection)

app.use((req,res,next) => {
    if(!req.session.user) {
       return next()
    }
    User.findById(req.session.user._id)
    .then(user => {
        //makes mongoose model available to all requests
        req.user = user;
        next()
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
    app.listen(3000);
})
.catch(e => {
    console.log(e)
})