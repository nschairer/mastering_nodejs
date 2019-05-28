const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log('GET SHOP ROUTE')
    res.send('hello from the shop middleware!');
});

module.exports = router;