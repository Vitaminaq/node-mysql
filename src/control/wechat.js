'use strict';
const axios = require('axios');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const { createCp, joinCp, isJoinCp, wechatRegister, isExitUser, updatePosition, getCompanyAll, updateCid, getCid, userInfo, userType, getCompanyName, signoutCompany } = require('../server/wechat');
const jwt =  require('jsonwebtoken');
const scret = require('../../local-config/token-scret');

const localAxios = axios.create({
    baseURL: 'https://api.weixin.qq.com',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
});
localAxios.interceptors.request.use((config) => {
    console.log('拦截器生效');
    return config;
});
localAxios.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

/**
 * 创建公司
 */
const createCompany = async (req, res) => {
    const { name } = req.body;
    const { uid } = req.headers;
    const r = await createCp({ name, uid });
    if (r === 1) return resErr(res);
    const cid = r.insertId;
    const r1 = await updateCid(+uid, +cid);
    if (r1 === 1) return resErr(res);
    return resSuc(res, {
        cid
    });
}

/**
 * 加入公司
 */
const joinCompany = async (req, res) => {
    const { cid, type } = req.body;
    const { uid } = req.headers;
    const r = await joinCp({ cid: +cid, type, uid: +uid });
    if (r === 1) return resErr(res);
    const r1 = await updateCid(+uid, +cid);
    if (r1 === 1) return resErr(res);
    return resSuc(res, {
        cid
    });
}

/**
 * 微信授权
 * @param {*} req  请求头
 * @param {*} res  响应头
 */
const getUnion = async (req, res) => {
    const { code, avatarUrl, nickName } = req.body;
    const params = {
        appid: 'wx6a73315e44f61c38',
        secret: '022cc28a34d8de7df0cd255100c8970b',
        js_code: code,
        grant_type: 'authorization_code'
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }

    const r = await localAxios.get('/sns/jscode2session', { params });
    // 授权不成功，则抛出异常
    if (!r.openid) return resFun(res, 30000);
    const er = await isExitUser(r.openid);

    let realUid = er[0] && er[0].uid || 0;
    if(!realUid) {
        const userInfo = {
            openid: r.openid,
            session_key: r.session_key,
            avatarUrl,
            nickname: nickName || '',
            username: '',
            creatAt: Date.now(),
            latitude: '',
            longitude: '',
            cid: 0
        }
        const wr = await wechatRegister(userInfo);
        const ur = await isExitUser(r.openid);
        realUid = ur[0] && ur[0].uid || 0;
    }
    // 查询有没有加入公司
    const rjc = await isJoinCp(realUid);
    // 创建token
    const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
    return resSuc(res, {
        token,
        uid: realUid,
        cid: rjc[0] && rjc[0].cid || 0
    });
}

/**
 * 储存地理位置
 */
const savePosition = async (req, res) => {
    const { latitude, longitude } = req.body;
    const { uid } = req.headers;
    const r = await updatePosition({ latitude, longitude, uid: +uid });
    return resSuc(res, 'ok');
}

/**
 * 获取用户信息
 */
const getUserInfo = async (req, res) => {
    const { uid } = req.headers;
    const cr = await userInfo(+uid || 0);
    if (!cr || !cr[0]) return resErr(res);
    // 查询用户身份信息
    const r = await userType(+uid || 0);
    if (!r || !r[0]) return resErr(res);
    // 查询公司名称
    const nr = await getCompanyName(cr[0].cid);
    return resSuc(res, { ...cr[0], ...r[0], cname: nr && nr.length && nr[0].name || ''});
}

/**
 * 查询公司员工所有位置信息
 */
const getAllMessage = async (req, res) => {
    const { uid } = req.headers;
    const cr = await getCid(+uid || 0);
    if (!cr || !cr[0]) return resErr(res);
    const r = await getCompanyAll(cr[0].cid);
    return resSuc(res, r);
}

const signOut = async (req, res) => {
    const { uid, cid } = req.headers;
    const r = await signoutCompany(+cid, +uid);
    return resSuc(res, '退出成功');
}

module.exports = {
    joinCompany,
    createCompany,
    getUnion,
    savePosition,
    getAllMessage,
    getUserInfo,
    signOut
};
