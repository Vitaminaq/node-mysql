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

module.exports = {
    getUserHeaderImg,
    userLogin
};
