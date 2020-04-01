const express = require('express');
const app = express();
const path = require('path');
const cookie = require('cookie-parser');
const setHead = require('./src/middleware/white-list');

const port = process.env.PORT || 3005; // 设置端口号：3005
app.listen(port);
console.log('start on port' + port);

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "20mb"}));

const router = express.Router();
const wechat = require('./src/routes/wechat');

app.use(cookie());
app.all('*', setHead); //设置白名单,等一些请求头

app.use('/api/wechat', wechat(router));

// 设置静态文件路由
app.use('/static', (req, res, next) => {
    res.setHeader("Content-Type", "image/jpeg");
    next();
}, express.static(
    path.join(__dirname, '/src/public')
));
