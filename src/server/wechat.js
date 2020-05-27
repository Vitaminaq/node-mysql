'use strict';

const query = require('../../db/connect');

/**
 * 查询有没有加入公司
 */
const isJoinCp = async (uid) => {
    try {
        return query(`select id from member where uid = ?`, uid);
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
        // 更新用户身份
        await query(
            `update member set type = 1`
        )
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
        // 查询该公司所属
        const u = await query(
            `select uid from company where id = ?`, params.cid
        );
        console.log(u, 'kkkkkkkkkkkkkkkkkkkkkk');
        if(+u[0].uid === +params.uid) {
            // 更新用户身份
            await query(
                `update member set type = 1 where uid = ?`, params.uid
            )
        }
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

/**
 * 更新用户信息表cid
 */
const updateCid = async (uid, cid, type) => {
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

const userInfo = async function (uid) {
    try {
        const r = await query(
            `select * from usermessage where uid = ?`, uid
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

// 获取用户身份
const userType = async function (uid) {
    try {
        const r = await query(
            `select type from member where uid = ?`, uid
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

// 查询公司名称
const getCompanyName = async function (cid) {
    try {
        const r = await query(
            `select name from company where id = ?`, cid
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

// 退出公司
const signoutCompany = async function (cid, uid) {
    try {
        const r = await query(
            `DELETE FROM member WHERE cid=? & uid=?`, [cid, uid]
        );
        await query(
            `update usermessage set cid = 0 where uid = ?`, uid
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
    getCid,
    userInfo,
    userType,
    getCompanyName,
    signoutCompany
};
