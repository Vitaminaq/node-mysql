'use strict';

const query = require('../../db/connect');

/**
 * 检查注册昵称是否已存在
 * @param {string} nickname  用户昵称 
 */
const isExitNickname = async function (nickname) {
    try {
        return await query(`select uid from usermessage where nickname = ?`, nickname);
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 用户注册
 * @param {string} params.username  姓名
 * @param {string} params.nickname  昵称
 * @param {string} params.sex       性别
 * @param {string} params.headimg   头像
 * @param {string} params.password  密码
 * @param {number} params.age       年龄
 * @param {number} params.creatAt   注册时间
 */
const userRegister = async function (params) {
    try {
        const r = await query(
            `insert into usermessage set ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    isExitNickname,
    userRegister
};
