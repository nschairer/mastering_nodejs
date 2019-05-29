const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const names = []

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.render('home')
})
app.get('/users', (req, res, next) => {
    res.render('users', {users: names})
})
app.post('/users', (req, res, next) => {
    names.push(...req.body.name.split(', '))
    console.log(names)
    res.redirect('/users')
})

app.listen(3000)