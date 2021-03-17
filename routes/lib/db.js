var mysql = require('mysql');
// 建立資料庫連線
var pool = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'gameshop',
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10
});
module.exports = pool;