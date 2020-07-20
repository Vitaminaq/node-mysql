const jwt =  require('jsonwebtoken');
const { resFun } = require('./response');
const scret = require('../../local-config/token-scret');

// 解密
const deJwt = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, scret, function (err, decode) {
            if (err) resolve();
            resolve(decode);
        });
    })
}

const getToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    !req.my && (req.my = {});
    const token = req.cookies.token || req.headers.authorization || '';
    token && (req.my.token = token);
    if (!token || token === 'null') {
        req.my.uid = 0;
        return next();
    }
    console.log(`当前请求token ${token}`);
    const r = await deJwt(token);
    if (r && r.uid) {
        req.my.uid = r.uid;
    }
    return next();
}

const decodeToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    const token = req.my.token;
    if(!token || token === 'null') return resFun(res, 20000, '没有token');
    console.log(`当前时间 ${new Date()}`);
    console.log(`当前token值 ${token}`);
    const r = await deJwt(token);
    if (!r) return resFun(res, 20001, 'token信息错误');
    return next();
}

module.exports = {
    getToken,
    decodeToken,
    deJwt
};
