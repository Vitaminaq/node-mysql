'use strict';

const query = require('../../db/connect');

/**
 * 微信授权
 */
const wechatRegister = async function (params) {
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

/**
 * 该用户是否存在
 */
const isExitUser = async function (openid) {
    try {
        return await query(`select uid from usermessage where openid = ?`, openid);
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const updatePosition = async function ({ uid, latitude, longitude }) {
    try {
        const r = await query(
            `update usermessage set latitude = ?, longitude = ? where uid = ?`, [latitude, longitude, uid]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

const getAll = async function () {
    try {
        const r = await query(
            `select * from usermessage`
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    wechatRegister,
    isExitUser,
    updatePosition,
    getAll
};
