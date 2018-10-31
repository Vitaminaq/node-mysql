'use strict';

const { getArticDetail, getViewnum, saveView } = require('../server/detail');
const { resEmp, resFun, resErr } = require('../common/response');
const isEmpty = require('../common/isEmpty');

/**
 * 获取文章详情
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const getArticDetails = async function (req, res) {
    const params = {
        articId: req.body.id | ''
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    } 
    const r = await getArticDetail(params);
    if (r === 1 || !r[0]) return resErr(res);
    return resFun(res, 0, {...r[0]});
}

/**
 * 浏览文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const saveViews = async function (req, res) {
    const params = {
        articId: req.body.id | ''
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }   
    const r = await getViewnum(params);
    if (r === 1 || !r[0]) return resErr(res);
    let result;
    if (r[0]) {
        result = await saveView({viewnum: ++r[0].viewnum, articId: params.articId});
    }
    if (result === 1) return resErr(res);
    return resFun(res, 0, '浏览成功');
}

module.exports = {
    getArticDetails,
    saveViews
};
