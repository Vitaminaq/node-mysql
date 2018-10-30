'use strict';

const query = require('../../db/connect');

/**
 * 获取文章
 * @param {number} params.limit  数量
 * @param {number} params.page  页数
 */
const getArtic = async function (params) {
    const {limit, page} = params;
    try {
        const r = await query(
            `select * from artic order by articId limit ${page * limit}, ${limit}`, {}
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
 * @param {number} params.articId  文章id
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
