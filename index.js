const express = require('express');
const app = express();
const cookie = require('cookie-parser');

const port = process.env.PORT || 3005; // 设置端口号：3005
app.listen(port); // 监听 port[3000]端口
console.log('start on port' + port);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const user = require('./src/routes/user');

app.use(cookie());
console.log(cookie.JSONCookies);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8088");
    res.header("Access-Control-Allow-Headers", "Content-Type, authorization, Cache-Control");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', 60);
    res.setHeader("Content-Type", "text/html");
    next();
});

app.use('/api/user', user(router));
