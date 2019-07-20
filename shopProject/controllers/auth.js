const User = require('../models/user');


exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1] === 'true'
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    User.findById('5d29409deda95a3fa69b2db5')
    .then(user => {
        req.session.isLoggedIn = true
        req.session.user = user;
        req.session.save((e) => {
            console.log(e)
            res.redirect('/')
        })
    })
    .catch(e => {
        console.log(e)
    })
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

//session stores hashed session id as a cookie, then server retreives session data with id
