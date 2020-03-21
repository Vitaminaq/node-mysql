const jwt =  require('jsonwebtoken');
const { resFun } = require('./response');
const scret = require('../../local-config/token-scret');

const decodeToke = function (req, res, next) {
    const token = req.cookies.token || req.headers.token;
    if(!token) return resFun(res, 20000, '没有token');
    console.log(`当前时间 ${new Date()}`);
    console.log(`当前token值 ${token}`);
    // console.log(`当前用户 ${req.cookies.nickname}`);
    jwt.verify(token, scret, function (err, decode) {
        if (err) return resFun(res, 20001, 'token信息错误');
    })
    return next();
}

module.exports = decodeToke;
