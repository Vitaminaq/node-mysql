'use strict';

const { createCompany, joinCompany, getUnion, savePosition, getAllMessage, getUserInfo, signOut } = require('../control/wechat');
const decodeToken = require('../common/token');

const routers = (router) => {
    /**
     * 获取union
     */
    router.post('/union', getUnion);
    /**
     * 创建公司
     */
    router.post('/create/company', decodeToken, createCompany);
     /**
     * 加入公司
     */
    router.post('/join/company', decodeToken, joinCompany);
    /**
     * 更新地理位置
     */
    router.post('/update/position', decodeToken, savePosition);
    /**
     * 获取公司成员位置
     */
    router.get('/all/info', decodeToken, getAllMessage);
    /**
     * 获取公司成员位置
     */
    router.get('/user/info', decodeToken, getUserInfo);
    /**
     * 退出公司
     */
    router.post('/user/signout', decodeToken, signOut);
    return router;
}

module.exports = routers;
