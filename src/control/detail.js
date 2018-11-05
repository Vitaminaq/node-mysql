'use strict';

const { 
    getArticDetail,
    clickArtic,
    commentArtic,
    clickComment
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
        articId: req.body.id | '',
        field: 'creatAt',
        sort: 'desc'
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    } 
    const nickname = req.cookies.nickname;
    const r = await getArticDetail({...params, nickname});
    let isClick = true;
    let commentList = null;
    if (r === 1) return resErr(res);
    if (!r.r2[0]) {
        isClick = false;
    }
    if (r.r3[0]) {
        commentList = [...r.r3];
    }
    return resSuc(res, {
        ...r.r1[0],
        isClick,
        commentList
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
    const nickname = req.cookies.nickname;
    const r = await clickArtic({...params, nickname});
    if (r === 1) return resErr(res);
    return resSuc(res, 'ok');
}

/**
 * 评论文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const commentArtics = async (req, res) => {
    const nickname = req.cookies.nickname;
    const params = {
        articId: req.body.id | '',
        nickname: nickname | '',
        msg: req.body.msg | '',
        creatAt: Date.now()
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const r = await commentArtic(params);
    if (r === 1) return resErr(res);
    return resSuc(res, 'ok');
}

/**
 * 点赞评论
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const clickComments = async function (req, res) {
    const params = {
        articId: req.body.id | '',
        ccId: req.body.ccId | '',
        creatAt: Date.now()
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const nickname = req.cookies.nickname;
    const r = await clickComment({...params, nickname});
    if (r === 1) return resErr(res);
    return resSuc(res, 'ok');
}

module.exports = {
    getArticDetails,
    clickArtics,
    commentArtics,
    clickComments
};
