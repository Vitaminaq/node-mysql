const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cookie = require('cookie-parser');
const setHead = require('./src/middleware/white-list');

// const server = http.createServer(app);
const port = process.env.PORT || 3005; // 设置端口号：3005
// server.listen(`3005`, '0.0.0.0'); // 监听 port[3000]端口
app.listen(port);
console.log('start on port' + port);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.json({limit:'1000mb'}));
app.use(bodyParser.urlencoded({ limit:'1000mb', extended: true }));
const router = express.Router();
const user = require('./src/routes/user');

app.use(cookie());
app.all('*', setHead); //设置白名单,等一些请求头

app.use('/api/user', user(router));

console.log(path.join(__dirname, '/src/public'));
app.use('/static', express.static(path.join(__dirname, '/src/public')));
