'use strict';

const query = require('../../db/connect');

/**
 * 
 * @param {number} limit  数量
 * @param {number} page   页码
 * @param {string} field  排序字段
 * @param {string} sort   排序方式
 */
const getArtic = async function ({ limit, page, field, sort }) {
    try {
        const r = await query(
            `select * from artic order by ${field} ${sort} limit ${page * limit}, ${limit}`, {}
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 查找浏览前的浏览数
 * @param {number} params.articId  文章id
 */
const getViewnum = async function (params) {
    try {
        const r = await query(
            `select viewnum from artic where ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 保存浏览数
 * @param {number} viewnum  文章浏览量
 * @param {number} articId  文章id
 */
const saveView = async function ({ viewnum, articId }) {
    try {
        const r = await query(
            `update artic set viewnum = ? WHERE articId = ? `, [viewnum, articId]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    getArtic,
    getViewnum,
    saveView
};
