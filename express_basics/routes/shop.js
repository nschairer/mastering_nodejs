const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../utils/path');


router.get('/', (req, res, next) => {
    console.log('GET SHOP ROUTE')
    //can't use ../ cause / refers to root folder on OS not project for web
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;