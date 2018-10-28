const { isExitNickname, userRegister } = require('../server/register');
const isEmpty = require('../common/isEmpty');
const {resEmp} = require('../common/response');

/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 */
const register = async function (req, res) {
    let params = {
        nickname: '',
        name: '',
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
    const result = await isExitNickname(params.nickname);
    console.log(result, 33333333333);
    // const result = await userRegister(req, res, params);
    return result;
}

module.exports = register;
