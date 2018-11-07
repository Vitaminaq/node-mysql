'use strict';

const register = require('../control/register');
const login = require('../control/login');
const reset = require('../control/reset');
const { getArtics, saveViews }= require('../control/chatroom');
const { 
    getArticDetails,
    clickArtics,
    commentArtics,
    clickComments
}= require('../control/detail');
const publish = require('../control/publish');
const decodeToken = require('../common/token');

const routers = (router) => {
    /**
     * 用户注册
     */
    router.post('/register', register);

    /**
     * 用户登录
     */
    router.post('/login', login);

    /**
     * 重置密码
     */
    router.post('/reset', reset);

    /**
     * 获取文章
     */
    router.get('/chatroom', getArtics);

    /**
     * 浏览文章
     */
    router.post('/view', decodeToken, saveViews);

    /**
     * 发表文章
     */
    router.post('/publish', decodeToken, publish);

    /**
     * 获取文章详情
     */
    router.post('/detail', decodeToken, getArticDetails);

    /**
     * 点赞文章
     */
    router.post('/agree/artic', decodeToken, clickArtics);

    /**
     * 评论文章
     */
    router.post('/comment', decodeToken, commentArtics);

    /**
     * 点赞评论
     */
    router.post('/agree/comment', decodeToken, clickComments);
    return router;
}

module.exports = routers;
