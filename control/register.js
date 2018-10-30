const { isExitNickname, userRegister } = require('../server/register');
const isEmpty = require('../common/isEmpty');
const { resEmp, resFun, resErr } = require('../common/response');
const crypto = require('crypto');
const hash = crypto.createHash('md5');

/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 */
const register = async function (req, res) {
    let params = {
        username: '',
        nickname: '',
        sex: '',
        headimg: '1',
        password: '',
        age: '',
        creatAt: Date.now()
    }
    Object.assign(params, req.body);
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    params.password = hash.update(params.password).digest('hex');
    let result;
    const r = await isExitNickname(params.nickname);
    if (r === 1) return resErr(res);
    if (!r[0]) {
       result = await userRegister(params);
       if (result === 1) return resErr(res);
       return resFun(res, 0, result); 
    } else {
       result = '此昵称已存在'
       return resFun(res, 10002, result);
    }
}

module.exports = register;
