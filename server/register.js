const query = require('../db/connect');
const {resFun, resErr} = require('../common/response');

const isExitNickname = function (nickname) {
    console.log(nickname);
    query(`select uid from usermessage where nickname = "${nickname}"`, function (err, vals) {
        console.log(err, 11111111);
        console.log(vals, 22222222)
        if (err) {
            return err;
        } else {
            return vals;
        }
    });
}

/**
 * 用户注册
 * @param {*} params 
 */
const userRegister = function (req, res, params) {
    console.log(params);
    const { name, nickname, sex, headimg, password, age, creatAt } = params;
    query(`select uid from usermessage where nickname = "${nickname}"`,
    function (err,vals,fields) {
        if (err) {
            console.log(err);
            resErr(res);
        } else {
            if (vals[0]) {
                resFun(res, 200, '此昵称已存在');
            } else {
                query(`insert into usermessage (username, nickname, sex, headimg, password, age, creatAt)
                values ("${name}", "${nickname}", "${sex}",
                "${headimg}", "${password}", "${age}", "${creatAt}")`,
                function (err, vals, fields) {
                    if (err) {
                        resErr(res);
                        console.log(err);
                    } else {
                        res.insertId = vals.insertId;
                        resFun(res, 200, '注册成功');
                    }
                });
            }
        }
    });
    return;
}

module.exports = {
    isExitNickname,
    userRegister
};
