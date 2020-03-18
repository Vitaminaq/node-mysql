'use strict';
const axios = require('axios');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr, resSuc } = require('../common/response');

const localAxios = axios.create({
    baseURL: 'https://api.weixin.qq.com',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    }
});

/**
 * 重置密码
 * @param {*} req  请求头
 * @param {*} res  响应头
 */
const getUnion = async (req, res) => {
    const { code } = req.body;
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
    const r = await localAxios.get('/sns/jscode2session', params);
    console.log(r, 'jjjjjjjjjjjjjjjjjj');
}

module.exports = {
    getUnion
};
