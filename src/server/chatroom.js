'use strict';

const query = require('../../db/connect');

/**
 * @param {number} limit  数量
 * @param {number} page   页码
 * @param {string} field  排序字段
 * @param {string} sort   排序方式
 */
const getArtic = async function ({ limit, page, field, sort, uid }) {
    try {
        const r1 = await query(
            `select a.*, b.headimg from artic as a, usermessage as b where 
            a.uid=b.uid order by ${field} ${sort} limit ${page * limit}
            , ${limit}`, {}
        );
        const r2 = await query(
            `select count(*) FROM artic;`
        );
        return {r1, r2};
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 保存浏览数
 * @param {number} params.articId  文章id
 */
const saveView = async function (params) {
    try {
        const r = await query(
            `update artic set viewnum = viewnum + 1 WHERE ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    getArtic,
    saveView
};
