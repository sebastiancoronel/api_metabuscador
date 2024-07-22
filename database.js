// const mysql = require('mysql2');
const mysql = require('mysql2/promise');

// module.exports = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456789',
//     database: 'seek_crawler'
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'seek_crawler'
  });
  
  module.exports = pool;