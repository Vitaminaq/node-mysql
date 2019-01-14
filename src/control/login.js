'use strict';

const { userLogin, getUserHeaderImg } = require('../server/login');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');
const jwt =  require('jsonwebtoken');
const scret = require('../../local-config/token-scret');

/**
 * 获取用户头像
 * @param {object} req  请求头
 * @param {object} res  响应头
 */
const getUserHeaderImgs = async function (req, res) {
    const nickname = req.query.nickname || '';
    const r = await getUserHeaderImg(nickname);
    if (r === 1) return resErr(res);
    if (!r[0]) return resSuc(res, {headimg: ''});
    return resSuc(res, r[0]);
}
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
    if (params.nickname.length > 12 || params.password > 12) {
        return resFun(res, 10005, '用户名或密码不能超过12位');
    }
    params.password = myCrypto(params.password);
    const r = await userLogin(params);
    if (r === 1) return resErr(res);
    if (!r[0]) return resFun(res, 10003, '用户名或密码错误');
    const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
    res.cookie('token', token, { path: '/', secure: false, signed: false });
    res.cookie('nickname', params.nickname, { path: '/', secure: false, signed: false });
    res.cookie('headimg', r[0].headimg, { path: '/', secure: false, signed: false });
    res.cookie('uid', r[0].uid, { path: '/', secure: false, signed: false });
    res.cookie('sex', r[0].sex, { path: '/', secure: false, signed: false });
    return resSuc(res, 'ok');
}

module.exports = {
    getUserHeaderImgs,
    login
};
