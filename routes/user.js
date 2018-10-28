const express = require('express');
const router = express.Router();
const query = require('../db/connect');
const {resFun, resErr, resEmp} = require('../common/response');
const isEmpty = require('../common/isEmpty');
const register = require('../control/register');

const uuid = require('node-uuid');
const jwt =  require('jsonwebtoken');
const scret = require('../local-config/token-scret');
const decodeToken = require('../common/token');

/**
 * 用户注册
 */
router.post('/register', (req, res) => register(req, res));

/**
 * 用户登录
 */
router.post('/login', function (req, res) {
    const params = {
        nickname: '',
        password: ''
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    query(`select id from usermessage where nickname = "${req.body.nickname}"
    and password = "${req.body.password}"`,
    function (err,vals,fields) {
        if (err) {
            resErr(res);
        } else {
            if (vals[0]) {
                const token = jwt.sign({...params}, scret, { expiresIn: 3600 });
                const data = {
                    token: token,
                    mes: '登陆成功'
                }
                resFun(res, 200, {...data});
            } else {
                resFun(res, 200, '用户名或密码错误');
            }
        }
    });
});

/**
 * 获取文章
 */
router.get('/chatroomsg', function (req, res) {
    decodeToken(req, res, () => {
        query(`select * from artic`,
        function (err,vals,fields) {
            if (err) {
                resErr(res);
            } else {
                if (vals[0]) {
                    resFun(res, 200, vals);
                } else {
                    resFun(res, 200, '暂无数据');
                }
            }
        });
    });
});

/**
 * 发表文章
 */
router.post('/publish', function (req, res) {
    const params = {
        id: uuid.v1(),
        nickname: '',
        title: '',
        msg: '',
        viewnum: 0,
        createtime: Date.now()
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    decodeToken(req, res, () => {
        query(`insert into artic (id, nickname, title, msg, viewnum, createtime)
        values ("${params.id}", "${params.nickname}", "${params.title}", "${params.msg}",
        "${params.viewnum}", "${params.createtime}")`,
        function (err,vals,fields) {
            if (err) {
                console.log(err);
                resErr(res);
            } else {
                resFun(res, 200, '发表成功');
            }
        });
    });
});

module.exports = router;
