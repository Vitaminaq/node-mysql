'use strict';

const { isExitNickname, userRegister } = require('../server/register');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr } = require('../common/response');
const myCrypto = require('../common/crypto');

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
        headimg: '1',
        password: '',
        age: '',
        creatAt: Date.now()
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    params.password = myCrypto(params.password);
    let result;
    const r = await isExitNickname(params.nickname);
    if (r === 1) return resErr(res);
    if (!r[0]) {
       result = await userRegister(params);
       if (result === 1) return resErr(res);
       return resFun(res, 0, '注册成功'); 
    } else {
       result = '此昵称已存在'
       return resFun(res, 10002, result);
    }
}

module.exports = register;
