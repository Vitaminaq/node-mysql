const mysql = require('mysql');
const cfg = require('./DBconfig');

const pool = mysql.createPool({
    host: cfg.HOST,
    user: cfg.USER,
    password: cfg.PASSWORD,
    database: cfg.DATABASE,
    port: cfg.PORT
});
if (pool) {
    console.log('数据库连接成功');
} else {
    console.log('数据库连接失败，请重试');
}

const query = function (sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (err, vals, fields) {
                conn.release();
                callback(err, vals, fields)
            })
        }
    })
}
module.exports = query;
