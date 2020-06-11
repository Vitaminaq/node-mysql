'use strict';

const { isExitNickname, userRegister } = require('../server/register');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');
const saveHeaderImg = require('../common/fs');

/**
 * 用户注册
 * @param {*} req  请求头
 * @param {*} res  响应头
 */
const register = async (req, res) => {
    let params = {
        username: '',
        nickname: '',
        sex: '',
        headimg: '',
        password: '',
        age: '',
        creatAt: Date.now()
    }
    Object.assign(params, req.body);
    if (!params.headimg) {
        params.headimg = '1';
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    if (String(params.username).length > 6) {
        return resFun(res, 10007);
    }
    if (String(params.nickname).length > 12 || String(params.nickname).length < 1) {
       return resFun(res, 10005);
    }
    if (params.sex !== '男' && params.sex !== '女') {
        return resFun(res, 10008);
    }
    if (!/^[0-9]*$/.test(params.age)) {
        return resFun(res, 10009);
    }
    params.password = myCrypto(params.password);
    let result;
    const r = await isExitNickname(params.nickname);
    if (r === 1) return resErr(res);
    if (r[0]) return resFun(res, 10002);
    if (params.headimg === '1') {
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
    result = await userRegister(params);
    if (result === 1) return resErr(res);
    return resSuc(res, '注册成功');
}

module.exports = register;
