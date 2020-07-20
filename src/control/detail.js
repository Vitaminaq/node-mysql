'use strict';

const {
    getArticDetail,
    clickArtic,
    commentArtic,
    clickComment,
    getIsClickComment,
    getArticComment,
    getUserNickname
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
    };
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    if (!/^[0-9]*$/.test(params.articId)
    ) {
        return resFun(res, 10006);
    }
    const uid = +req.my.uid || 0;
    const r = await getArticDetail({ ...params, uid });
    let isClick = true;
    if (r === 1) return resErr(res);
    if (!r.r2 || !r.r2.length) {
        isClick = false;
    }
    return resSuc(res, {
        ...r.r1[0],
        isClick
    });
}

/**
 * 获取文章评论
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const getArticComments = async function (req, res) {
    const params = {
        articId: req.query.id | '',
        field: 'creatAt',
        sort: 'desc',
        limit: 5,
        page: 1
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const uid = +req.my.uid || 0;
    const r = await getArticComment({ ...params });
    if (r === 1) return resErr(res);
    const commentList = await Promise.all(r.map(async (i) => {
        const result = await getIsClickComment({ uid, commentId: i.commentId });
        if (result === 1) return resErr(res);
        if (result[0]) {
            i.isClickComment = true;
        } else {
            i.isClickComment = false;
        }
        // 查找用户头像
        const hs = await getUserNickname(i.uid);
        if (!hs || !hs.length) {
            i.nickname = `游客${i.uid}`;
            i.headimg = '/static/images/man.png';
        } else {
            i.nickname = hs[0].nickname;
            i.headimg = hs[0].headimg;
        }
        return i;
    }));
    return resSuc(res, {
        list: commentList
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
    const uid = req.my.uid || 0;
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
    const uid = +req.my.uid || 0;
    const headimg = req.cookies.headimg;
    const params = {
        articId: 0,
        uid,
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
