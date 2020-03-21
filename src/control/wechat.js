'use strict';
const axios = require('axios');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');
const { wechatRegister, isExitUser, updatePosition, getAll } = require('../server/wechat');
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
    console.log('拦截器生效', config);
    return config;
});
localAxios.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

/**
 * 微信授权
 * @param {*} req  请求头
 * @param {*} res  响应头
 */
const getUnion = async (req, res) => {
    const { code, avatarUrl, nickName } = req.body;
    console.log(req.body, 'hhhhhhhhhhhhhhhhhhhh');
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
    console.log(er[0].uid, 'yyyyqqqqqqqqqqqqqqqqqqqqq')
    let realUid = er[0].uid;
    if(!realUid) {
        const userInfo = {
            openid: r.openid,
            session_key: r.session_key,
            avatarUrl,
            nickname: nickName || '',
            username: '',
            creatAt: Date.now(),
            latitude: '',
            longitude: ''
        }
        const wr = await wechatRegister(userInfo);
        const ur = await isExitUser(r.openid);
        realUid = ur[0].uid;
    }
    const token = jwt.sign({...params}, scret, { expiresIn: 86400 });
    res.cookie('token', token, { path: '/', secure: false, signed: false });
    res.cookie('uid', realUid, { path: '/', secure: false, signed: false });
    return resSuc(res, {
        token,
        uid: realUid
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
 * 查询所有信息
 */
const getAllMessage = async (req, res) => {
    const r = await getAll();
    console.log(r, 'jjjjjjjjjjjjjjjjjj');
    return resSuc(res, r);
}

module.exports = {
    getUnion,
    savePosition,
    getAllMessage
};
