const express = require('express');
const router = express.Router();
const query = require('../db/connect');

const uuid = require('node-uuid');

router.post('/register', function (req, res) {
    query(`select id from usermessage where nickname = ${req.body.nickname}`,
    function (err,vals,fields) {
       console.log(err, vals, fields);
    });
    res.json({mes: '成功'});
});

module.exports = router;
