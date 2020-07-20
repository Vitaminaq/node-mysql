'use strict';

const { userLogin, getUserHeaderImg, isExitPhone, userRegister } = require('../server/login');
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

/**
 * 用户手机号登录或注册
 */
const onkeyLogin = async (req, res) => {
    let params = {
        phone: '',
        code: ''
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    // 查询手机号
    const r = await isExitPhone(params.phone);
    if (r === 1) return resErr(res);
    // 用户存在 - 登录
    if (r[0]) {
        const token = jwt.sign({uid: r[0].uid}, scret, { expiresIn: 86400 });
        res.cookie('token', token, { path: '/', secure: false, signed: false });
        res.cookie('uid', r[0].uid, { path: '/', secure: false, signed: false });
        return resSuc(res, token);
    } else {
        // delete params.code;
        const rParams = {
            username: '',
            nickname: '',
            sex: '女',
            headimg: '',
            password: '',
            age: '12',
            creatAt: Date.now(),
            // ...params
        }
        if (!params.headimg) {
            if (params.sex === '男') {
                params.headimg = '/static/images/man.png';
            } else {
                params.headimg = '/static/images/woman.png';
            }
        } else {
            const type = params.headimg.split(';')[0].split('image/')[1];
            const imgR = await saveHeaderImg(params.headimg, params.nickname, type);
            if (imgR !== 'ok') return resFun(res, 10004);
            params.headimg = `/static/images/${params.nickname}.${type}`;
        }
        const result = await userRegister(rParams);
        if (result === 1) return resErr(res);
        const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
        res.cookie('token', token, { path: '/', secure: false, signed: false });
        res.cookie('uid', result.insertId, { path: '/', secure: false, signed: false });
        return resSuc(res, token);
    }
}

module.exports = {
    getUserHeaderImgs,
    login,
    onkeyLogin
};
