'use strict';

const userLogin = require('../server/login');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr } = require('../common/response');
const myCrypto = require('../common/crypto');
const jwt =  require('jsonwebtoken');
const scret = require('../../local-config/token-scret');
 
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
    const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
    // res.setHeader('Set-Cookie', `token = ${token}`);
    res.cookie('token', token, { path: '/', secure: false, signed: false });
    res.cookie('nickname', params.nickname, { path: '/', secure: false, signed: false });
    res.cookie('headimg', r[0].headimg, { path: '/', secure: false, signed: false });
    const data = {
        token: token,
        mes: '登陆成功'
    }
    return resFun(res, 0, {...data});
}

module.exports = login;
