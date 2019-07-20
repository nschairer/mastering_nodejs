const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1] === 'true'
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };

exports.postSignup = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email:email})
    .then(userDoc => {
        if(userDoc) {
            return res.redirect('/signup')
        }
        return bcrypt.hash(password, 12)
    })
    .then(hashedpwd => {
        const user = new User({
            name: name,
            email: email,
            password: hashedpwd,
            cart: { items : []}
        })
        return user.save()
    })
    .then(result => {
        res.redirect('/login')
    })
    .catch(e => console.log(e))

};

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
