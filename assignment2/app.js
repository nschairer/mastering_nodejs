const express = require('express');
const app = express();

//ordering matters, if using / first it would send that response
app.use('/users', (req, res, next) => {
    console.log('first middleware')
    res.send('USERS PAGE')
});


app.use('/', (req, res, next) => {
    console.log('second middleware')
    res.send('HOME PAGE')
});

app.listen(3000);