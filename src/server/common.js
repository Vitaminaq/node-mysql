'use strict';

const query = require('../../db/connect');

/**
 * 获取某人是否点赞某文章
 * @param {number} articId   文章id
 * @param {number} uid       用户id
 */
const isClickArtic = async function ({ articId, uid }) {
    try {
        const r = await query(
            `select * from artic_click where articId = ? and uid = ?`,
            [articId, uid]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    isClickArtic
}