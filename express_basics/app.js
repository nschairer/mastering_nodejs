const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//ORDER MATTERS --- TOP TO BOTTOM WITH MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
//grants read access to path --- when routing in html ignore public and just use /css
app.use(express.static(path.join(__dirname, 'public')));

//places admin ahead of every route in adminRoutes
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000, () => {console.log('server running on port 3000')});