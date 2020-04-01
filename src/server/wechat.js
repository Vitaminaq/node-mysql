'use strict';

const query = require('../../db/connect');

/**
 * 查询有没有加入公司
 */
const isJoinCp = async (uid) => {
    try {
        return await query(`select id from member where uid = ?`, uid);
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 创建公司
 */
const createCp = async (params) => {
    try {
        const r = await query(
            `insert into company set ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 加入公司
 */
const joinCp = async (params) => {
    try {
        const r = await query(
            `insert into member set ?`, params
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 更新用户信息表cid
 */
const updateCid = async (uid, cid) => {
    try {
        const r = await query(
            `update usermessage set cid = ? where uid = ?`, [cid, uid]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}
/**
 * 获取cid 
 */
const getCid = async (uid) => {
    try {
        return query(`select cid from usermessage where uid = ?`, uid);
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

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
        return query(`select uid from usermessage where openid = ?`, openid);
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

const getCompanyAll = async function (cid) {
    try {
        const r = await query(
            `select * from usermessage where cid = ?`, cid
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = {
    isJoinCp,
    createCp,
    joinCp,
    wechatRegister,
    isExitUser,
    updatePosition,
    getCompanyAll,
    updateCid,
    getCid
};
