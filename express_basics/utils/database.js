// const mysql = require('mysql2');
 const sqlConfig = require('../config/sql');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: sqlConfig.databasePwd
// });

// module.exports = pool.promise();


//Sequelize

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', sqlConfig.databasePwd, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;