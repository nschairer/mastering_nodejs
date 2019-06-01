const mysql = require('mysql2');
const sqlConfig = require('../config/sql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: sqlConfig.databasePwd
});

module.exports = pool.promise();