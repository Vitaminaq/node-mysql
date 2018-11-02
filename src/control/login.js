'use strict';

const userLogin = require('../server/login');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr } = require('../common/response');
const myCrypto = require('../common/crypto');
const jwt =  require('jsonwebtoken');
const scret = require('../../local-config/token-scret');
const setCookie = require('../middleware/set-cookie');

var serialize = function(name, val, opt) {
    var pairs = [name + '=' + val];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.exppires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join(';');
  };
 
/**
 * 用户登录
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const login = async function (req, res) {
    let params = {
        nickname: '',
        password: ''
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    params.password = myCrypto(params.password);
    const r = await userLogin(params);
    if (r === 1) return resErr(res);
    if (!r[0]) return resFun(res, 10003, '用户名或密码错误');
    const token = jwt.sign({...params}, scret, { expiresIn: 3600 });
    const d = await res.setHeader("Set-Cookie",["a=1;max-age=86400","b=2;max-age=3600"]);
    console.log(res);
    const data = {
        token: token,
        mes: '登陆成功'
    }
    return resFun(res, 0, {...data});
}

module.exports = login;
