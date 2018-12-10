'use strict';

const userPublish = require('../server/publish');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
/**
 * 用户登录
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const publish = async function (req, res) {
    const params = {
        uid: req.cookies.uid,
        title: '',
        msg: '',
        viewnum: 0,
        clicknum: 0,
        commentnum: 0,
        creatAt: Date.now()
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    if (/^[0-9]*$/.test(params.uid)) {
        return resFun(res, 10006);
    }
    if (String(params.title).length > 100 || String(params.msg).length > 6000) {
        return resFun(res, 10010);
    }
    const r = await userPublish(params);
    if (r === 1) return resErr(res);
    return resSuc(res, '发表成功');
}

module.exports = publish;
