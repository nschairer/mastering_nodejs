const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//handlebars
//const expressHbs = require('express-handlebars');

const app = express();

//app.engine('.hbs', expressHbs({extname: '.hbs', layoutsDir: 'views/layouts/', defaultLayout: 'main'}));//have to do this for handlebars
//set global config values
//make sure pug is installed
app.set('view engine', 'ejs');
//tell express where to find dynamic views
//defaults to views anyways
app.set('views', 'views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

//ORDER MATTERS --- TOP TO BOTTOM WITH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
//grants read access to path --- when routing in html ignore public and just use /css
app.use(express.static(path.join(__dirname, 'public')));

//places admin ahead of every route in adminRoutes
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {console.log('server running on port 3000')});