const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
})

app.use('/add-product', (req, res, next) => {
    console.log('product middleware')
    res.send('add products!');
});


app.use('/', (req, res, next) => {
    console.log('in home page')
    res.send('hello from the final middleware!');
});

app.listen(3000, () => {console.log('server running on port 3000')});