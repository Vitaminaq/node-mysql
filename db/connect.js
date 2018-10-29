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

const query = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                conn.query(sql,(err, result) => {
                    conn.release();
                    if(err) reject(err);
                    else resolve(result);
                });
            }
        });
    })
}
module.exports = query;
