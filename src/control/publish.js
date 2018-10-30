'use strict';

const userPublish = require('../server/publish');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr } = require('../common/response');
/**
 * 用户登录
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const publish = async function (req, res) {
    const params = {
        nickname: '',
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
    const r = await userPublish(params);
    if (r === 1) return resErr(res);
    return resFun(res, 0, '发表成功');
}

module.exports = publish;
