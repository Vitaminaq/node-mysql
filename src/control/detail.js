'use strict';

const {
    getArticDetail,
    clickArtic,
    commentArtic,
    clickComment,
    getIsClickComment
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
        sort: 'desc',
        limit: 6,
        page: 1
    };
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    if (!/^[0-9]*$/.test(params.articId) ||
        !/^[0-9]*$/.test(params.limit) ||
        !/^[0-9]*$/.test(params.page)
    ) {
        return resFun(res, 10006);
    }
    const uid = req.cookies.uid;
    const r = await getArticDetail({ ...params, uid });
    let isClick = true;
    let commentList = [];
    if (r === 1) return resErr(res);
    if (!r.r3 || !r.r3.length) {
        isClick = false;
    } else {
        commentList = await Promise.all(r.r3.map(async (i) => {
            const result = await getIsClickComment({ nickname, commentId: i.commentId });
            if (result === 1) return resErr(res);
            if (result[0]) {
                i.isClickComment = true;
            } else {
                i.isClickComment = false;
            }
            return i;
        }));
    }
    return resSuc(res, {
        ...r.r1[0],
        ...r.r2 && r.r2[0],
        isClick,
        commentList
    });
}

/**
 * 获取文章评论
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const getArticComments = async function (req, res) {
    const params = {
        articId: req.body.id | '',
        field: 'creatAt',
        sort: 'desc',
        limit: 5,
        page: 1
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const nickname = req.cookies.nickname;
    const r = await getArticComment({ ...params });
    if (r === 1) return resErr(res);
    const commentList = await Promise.all(r.map(async (i) => {
        const result = await getIsClickComment({ nickname, commentId: i.commentId });
        if (result === 1) return resErr(res);
        if (result[0]) {
            i.isClickComment = true;
        } else {
            i.isClickComment = false;
        }
        return i;
    }));
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
    const uid = req.cookies.uid || 1;
    const r = await clickArtic({ ...params, uid });
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
    const headimg = req.cookies.headimg;
    const params = {
        articId: 0,
        nickname: nickname,
        headimg: headimg,
        msg: '',
        clicknum: 0,
        creatAt: Date.now()
    }
    Object.assign(params, req.body);
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
        commentId: req.body.commentId | '',
        creatAt: Date.now()
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const nickname = req.cookies.nickname;
    const r = await clickComment({ ...params, nickname });
    if (r === 1) return resErr(res);
    return resSuc(res, 'ok');
}

module.exports = {
    getArticDetails,
    getArticComments,
    clickArtics,
    commentArtics,
    clickComments
};
