'use strict';

const { getArtic, saveView } = require('../server/chatroom');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const isEmpty = require('../common/isEmpty');

/**
 * 获取全部文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const getArtics = async function (req, res) {
    const params = {
        limit: 10,
        page: 0,
        field: 'creatAt',
        sort: 'desc'
    }
    Object.assign(params, req.query);
    if (!/^[0-9]*$/.test(params.limit) || !/^[0-9]*$/.test(params.page)) {
        return resFun(res, 10006);
    }
    const r = await getArtic(params);
    if (r === 1) return resErr(res);
    const data = {
        list: [...r.r1],
        pageIndex: +params.page,
        pageSize: +params.limit,
        total: +r.r2 | 0
    }
    return resSuc(res, {...data});
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
    if (!/^[0-9]*$/.test(Number(params.articId))) {
        return resFun(res, 10006);
    }
    const r = await saveView(params);
    if (r === 1) return resErr(res);
    return resSuc(res, 'ok');
}

module.exports = {
    getArtics,
    saveViews
};
