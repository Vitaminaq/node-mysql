'use strict';

const query = require('../../db/connect');

/**
 * 获取文章详情
 * @param {number} articId   文章id
 * @param {number} nickname  昵称
 * @param {string} field  排序字段
 * @param {string} sort   排序方式
 */
const getArticDetail = async function ({ articId, nickname, field, sort }) {
    try {
        const r1 = await query(
            `select * from artic where articId = ?`, [articId]
        );
        const r2 = await query(
            `select * from artic_click where articId = ? and nickname = ?`,
            [articId, nickname]
        );
        const r3 = await query(
            `select commentId, nickname, msg, creatAt from comment where articId = ? order by ${field} ${sort}`, [articId]
        )
        return {r1, r2, r3};
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 点赞文章
 * @param {number} articId   文章id
 * @param {number} nickname  昵称
 */
const clickArtic = async function (params) {
    try {
        const r1 = await query(
            `select acId from artic_click where nickname = ?`, [params.nickname]
        )
        if (r1[0]) {
            await query(
                `delete from artic_click where nickname = ?`, [params.nickname]
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
        const r = await query(
            `insert into comment set ?`, params
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
 * @param {number} nickname  昵称
 */
const clickComment = async function (params) {
    try {
        const r1 = await query(
            `select ccId from comment_click where nickname = ?`, [params.nickname]
        )
        if (r1[0]) {
            await query(
                `delete from comment_click where nickname = ?`, [params.nickname]
            );
            await query(
                `update artic set commentnum = commentnum - 1 where articId = ?`, [params.articId]
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

module.exports = {
    getArticDetail,
    clickArtic,
    commentArtic,
    clickComment
};
