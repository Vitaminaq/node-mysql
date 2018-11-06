const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const setHead = require('./src/middleware/white-list');

const port = process.env.PORT || 3005; // 设置端口号：3005
app.listen(port); // 监听 port[3000]端口
console.log('start on port' + port);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const user = require('./src/routes/user');

app.use(cookie());
app.all('*', setHead); //设置白名单,等一些请求头

app.use('/api/user', user(router));
