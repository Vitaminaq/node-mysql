'use strict';

const express = require('express');
const router = express.Router();
const register = require('../control/register');
const login = require('../control/login');
const { getArtics, saveViews }= require('../control/chatroom');
const { getArticDetails }= require('../control/detail');
const publish = require('../control/publish');
const decodeToken = require('../common/token');

/**
 * 用户注册
 */
router.post('/register', (req, res) => register(req, res));

/**
 * 用户登录
 */
router.post('/login', (req, res) => login(req, res));

/**
 * 获取文章
 */
router.get('/chatroom',
    (req, res, next) => decodeToken(req, res, next),
    (req, res) => getArtics(req, res)
);

/**
 * 浏览文章
 */
router.post('/view',
    (req, res, next) => decodeToken(req, res, next),
    (req, res) => saveViews(req, res)
);

/**
 * 发表文章
 */
router.post('/publish', 
    (req, res, next) => decodeToken(req, res, next),
    (req, res) => publish(req, res)
);

/**
 * 获取文章详情
 */
router.post('/detail',
    (req, res, next) => decodeToken(req, res, next),
    (req, res) => getArticDetails(req, res)
);

module.exports = router;
