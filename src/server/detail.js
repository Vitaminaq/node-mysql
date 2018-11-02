'use strict';

const query = require('../../db/connect');

/**
 * 获取文章详情
 * @param {number} articId   文章id
 * @param {number} nickname  昵称
 */
const getArticDetail = async function ({ articId, nickname }) {
    try {
        const r1 = await query(
            `select * from artic where articId = ?`, [articId]
        );
        const r2 = await query(
            `select * from artic_click where articId = ? and name = ?`,
            [articId, nickname]
        );
        return {r1, r2};
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
        const r = await query(
            `insert into artic_click set ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    getArticDetail,
    clickArtic
};
