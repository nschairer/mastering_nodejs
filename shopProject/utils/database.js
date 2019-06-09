const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoConfig = require('../config/mongo');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(mongoConfig.uri, {useNewUrlParser: true})
    .then(client => {
        console.log('Connected Mongodb!')
        _db = client.db();
        callback()
    })
    .catch(e => {
        console.log(e)
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db
    } 
    throw 'No database found..'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb



//SQL
// // const mysql = require('mysql2');
//  const sqlConfig = require('../config/sql');

// // const pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     database: 'node-complete',
// //     password: sqlConfig.databasePwd
// // });

// // module.exports = pool.promise();


// //Sequelize

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node-complete', 'root', sqlConfig.databasePwd, {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;