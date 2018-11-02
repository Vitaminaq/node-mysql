'use strict';

const query = require('../../db/connect');

/**
 * 重置密码
 * @param {string} params.username   姓名
 * @param {string} params.sex        性别
 * @param {string} params.password   重置后的密码
 * @param {number} params.age        年龄
 * @param {number} params.updateAt   更新时间
 * @param {number} params.nickname   昵称
 */
const userReset = async function ({ password, updateAt, nickname, username, sex, age }) {
    try {
        const r = await query(
            `update usermessage set password = ?, updateAt = ? where nickname =? and 
            username = ? and sex = ? and age = ?`, [password, updateAt, nickname,username,
            sex, age]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = userReset;
