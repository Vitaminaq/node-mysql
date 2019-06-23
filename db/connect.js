const mysql = require('mysql');
const cfg = require('./DBconfig');
const CreateSchema = require('../sql/create-schema');
const CreateUsermessage = require('../sql/create-usermessage');
const CreateArtic = require('../sql/create-artic');
const CreateArticClick = require('../sql/create-artic_click');
const CreateComment = require('../sql/create-comment');
const CreateCommentClick = require('../sql/create-comment_click');

/**
 * 创建连接池
 */
const options = {
    host: cfg.HOST,
    user: cfg.USER,
    password: cfg.PASSWORD,
    port: cfg.PORT,
    // database: cfg.DATABASE // 开启自动生成数据库，请把这句注释
}
let pool = mysql.createPool(options);

if (pool) {
    console.log('数据库连接成功');
} else {
    console.log('数据库连接失败，请重试');
}

// 当前请求是否在等待
pool.on('enqueue', function () {
    console.log('正在等待可连接插槽');
});

// 连接时
pool.on('acquire', function (connection) {
    console.log('当前连接 %d', connection.threadId);
});

// 监听连接池连接的释放
pool.on('release', function (connection) {
    console.log('连接 %d 释放', connection.threadId);
});

/**
 * 封装数据库查询Promise
 */
const query = function (sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                const c = conn.query(sql, params, (err, result) => {
                    conn.release();
                    if(err) reject(err);
                    else resolve(result);
                });
                console.log(`当前数据库操作 ${c.sql}`);
            }
        });
    });
}

/**
 * 初始化数据库，不建议开启，实际操作，可能会更改用户数据，
 * 自己本地可以玩玩
 */
const init = async () => {
    await query(CreateSchema);
    pool.end();
    pool = mysql.createPool(options);
    console.log(`数据库 ${pool.config.connectionConfig.database} 初始化成功`);
    await query(CreateUsermessage);
    await query(CreateArtic);
    await query(CreateArticClick);
    await query(CreateComment);
    await query(CreateCommentClick);
    console.log(`所有表格初始化成功`);
}

try {
    init();
} catch (e) {
    console.log(`数据库初始化失败${e}`);
}

module.exports = query;
