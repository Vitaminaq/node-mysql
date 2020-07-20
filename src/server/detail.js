'use strict';

const query = require('../../db/connect');

/**
 * 获取文章详情
 * @param {number} articId   文章id
 * @param {number} nickname  昵称
 * @param {string} field  排序字段
 * @param {string} sort   排序方式
 */
const getArticDetail = async function ({ articId, uid, field, sort, page, limit }) {
    try {
        const r1 = await query(
            `select a.*, b.nickname, b.headimg, b.sex from artic as a, usermessage as b where articId = ? and
            a.uid = b.uid`, [articId]
        );
        if (!uid) return { r1 };
        const r2 = await query(
            `select * from artic_click where articId = ? and uid = ?`,
            [articId, uid]
        );
        return {r1, r2};
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 获取文章评论
 * @param {number} articId   文章id
 * @param {string} field  排序字段
 * @param {string} sort   排序方式
 */
const getArticComment = async function ({ articId, field, sort, page, limit }) {
    try {
        const r = await query(
            `select commentId, uid, msg, creatAt, clicknum from comment where articId = ?
            order by ${field} ${sort} limit ${page * limit}`, [articId]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 查找用户头像昵称
 * @param {number} uid 用户id
 */
const getUserNickname = async (uid) => {
    try {
        const r = await query(
            `select nickname, headimg from usermessage where uid = ?`, [uid]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 当前用户是否点赞该评论
 * @param {number} nickname   昵称
 * @param {string} commentId  评论号
 */
const getIsClickComment = async function ({ uid, commentId }) {
    try {
        const r = await query(
            `select * from comment_click where uid = ? and commentId = ?`,
            [uid, commentId]
        )
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 点赞文章
 * @param {number} params.articId   文章id
 * @param {number} params.nickname  昵称
 */
const clickArtic = async function (params) {
    try {
        const r1 = await query(
            `select acId from artic_click where uid = ?`, [params.uid]
        )
        if (r1[0]) {
            await query(
                `delete from artic_click where uid = ?`, [params.uid]
            );
            await query(
                `update artic set clicknum = clicknum - 1 where articId = ?`, [params.articId]
            )
            return 0;
        } else {
            await query(
                `insert into artic_click set ?`, params
            );
            await query(
                `update artic set clicknum = clicknum + 1 where articId = ?`, [params.articId]
            )
            return 0;
        }
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 发表评论
 * @param {number} articId   文章id
 * @param {number} nickname  昵称
 * @param {string} msg       评论内容
 * @param {string} creatAt   时间
 */
const commentArtic = async function (params) {
    try {
        await query(
            `insert into comment set ?`, params
        )
        const r = query(
            `update artic set commentnum = commentnum + 1 where articId = ?`, [params.articId]
        ) 
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 点赞评论
 * @param {number} commentId   文章id
 * @param {number} nickname    昵称
 */
const clickComment = async function (params) {
    try {
        const r1 = await query(
            `select ccId from comment_click where nickname = ? and commentId = ?`,
            [params.nickname, params.commentId]
        )
        if (r1[0]) {
            await query(
                `delete from comment_click where nickname = ?`, [params.nickname]
            );
            await query(
                `update comment set clicknum = clicknum - 1 where commentId = ?`,
                [params.commentId]
            )
            return 0;
        } else {
            await query(
                `insert into comment_click set ?`, params
            );
            await query(
                `update comment set clicknum = clicknum + 1 where commentId = ?`,
                [params.commentId]
            )
            return 0;
        }
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    getArticDetail,
    getArticComment,
    clickArtic,
    commentArtic,
    clickComment,
    getIsClickComment,
    getUserNickname
};
