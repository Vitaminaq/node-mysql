'use strict';

const query = require('../../db/connect');

/**
 * 
 * @param {string} nickname   昵称
 */
const getUserHeaderImg = async function (nickname) {
    try {
        const r = await query(
            'select headimg from usermessage where nickname = ?', [nickname]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}
/**
 * 用户登陆
 * @param {string} params.nickname  昵称
 * @param {string} params.password  密码
 */
const userLogin = async function (params) {
    try {
        const r = await query(
            'select uid, headimg from usermessage where nickname = ? and password = ?', [params.nickname, params.password]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}


/**
 * 检查手机号是否存在
 * @param {string} phone  手机号
 */
const isExitPhone = async function (phone) {
    try {
        return await query(`select uid from usermessage where phone = ?`, phone);
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

// 快捷注册
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
    getUserHeaderImg,
    userLogin,
    isExitPhone,
    userRegister
};
