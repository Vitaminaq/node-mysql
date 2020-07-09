const jwt =  require('jsonwebtoken');
const { resFun } = require('./response');
const scret = require('../../local-config/token-scret');

const getToken = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    const token = req.cookies.token || req.headers.authorization || '';
    req.my = {};
    req.my.uid = 0;
    if (!token || token === 'null') return next();
    req.my = {};
    req.my.token = token;
    console.log(`当前请求token ${token}`);
    // 解密token
    jwt.verify(token, scret, function (err, decode) {
        if (err) return resFun(res, 20001, 'token信息错误');
        if (decode.uid) {
            req.my.uid = decode.uid
        }
    })
    return next();
}

const decodeToken = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    const token = req.my.token;
    if(!token || token === 'null') return resFun(res, 20000, '没有token');
    console.log(`当前时间 ${new Date()}`);
    console.log(`当前token值 ${token}`);
    console.log(`当前用户 ${req.cookies.nickname}`);
    jwt.verify(token, scret, function (err, decode) {
        if (err) return resFun(res, 20001, 'token信息错误');
    })
    return next();
}

module.exports = {
    getToken,
    decodeToken
};
