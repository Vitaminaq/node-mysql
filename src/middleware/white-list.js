const list = require('../../local-config/white-list');
// 跨域白名单设置
const whiteList = function(req, res, next) {
    // if (list.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Content-Type, authorization, Cache-Control");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Max-Age', 60);
        res.setHeader("Content-Type", ["text/html", "image/jpeg"]);
    // } else {
    //     return;
    // }
    if (req.method === 'OPTIONS') {
        return next();
    }
    next();
};

module.exports = whiteList;