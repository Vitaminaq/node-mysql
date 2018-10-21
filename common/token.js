const jwt =  require('jsonwebtoken');
const { resFun } = require('../common/response');
const scret = require('../local-config/token-scret');

const decodeToke = function (req, res, next) {
    const token = req.headers.authorization;
    if(!token) return resFun(res, 403, '没有token');
    jwt.verify(token, scret, function (err, decode) {
        if (err) return resFun(res, 11220, 'token信息错误');
        return next();
    })
    return;
}

module.exports = decodeToke;
