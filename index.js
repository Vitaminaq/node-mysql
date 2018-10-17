const express = require('express');
const app = express();
const mysql = require('mysql');
// const dbConfig = require('../db/DBConfig');

// const pool = mysql.createPool( dbConfig.mysql );

const port = process.env.PORT || 3005; // 设置端口号：3005
app.listen(port); // 监听 port[3000]端口
console.log('start on port' + port);

// const connect = require('./db/connect');
// // 连接数据库
// connect();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const user = require('./routes/user');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "text/html; charset=utf-8");
    next();
});

app.use('/api/user', user);
