const jwt =  require('jsonwebtoken');
const { resFun } = require('./response');
const scret = require('../../local-config/token-scret');

const decodeToke = function (req, res, next) {
    // const token = req.headers.authorization;
    const token = req.headers.cookie.split(';')[0].split('=')[1];
    console.log(`当前token值${req.headers.cookie.split(';')[0].split('=')[1]}${new Date()}`);
    if(!token) return resFun(res, 20000, '没有token');
    jwt.verify(token, scret, function (err, decode) {
        if (err) return resFun(res, 20001, 'token信息错误');
        return next();
    })
    return;
}

module.exports = decodeToke;
