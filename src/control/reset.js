'use strict';

const userReset = require('../server/reset');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const myCrypto = require('../common/crypto');

/**
 * 重置密码
 * @param {*} req  请求头
 * @param {*} res  响应头
 */
const reset = async (req, res) => {
    let params = {
        password: '',
        nickname: '',
        username: '',
        sex: '',
        age: '',
        updateAt: Date.now()
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    params.password = myCrypto(params.password);
    const r = await userReset(params);
    if (r === 1) return resErr(res);
    resSuc(res, '重置成功');
}

module.exports = reset;
