'use strict';

const { 
    getArticDetail,
    clickArtic 
} = require('../server/detail');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
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
    const nickname = req.cookies.nickname;
    const r = await getArticDetail({...params, nickname});
    let isClick = true;
    if (r === 1) return resErr(res);
    if (!r.r2[0]) {
        isClick = false;
    }
    return resSuc(res, {
        ...r.r1[0],
        isClick: isClick
    });
}


/**
 * 点赞文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const clickArtics = async function (req, res) {
    const params = {
        articId: req.body.id | '',
        creatAt: Date.now()
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const nickname = req.headers.cookie.split(';')[1].split('=')[1];
    const r = await clickArtic({...params, nickname});
    if (r === 1 || !r[0]) return resErr(res);
}

module.exports = {
    getArticDetails,
    clickArtics
};
