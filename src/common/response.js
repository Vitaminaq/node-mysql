const codes = {
    '0':       '请求成功',
    '12000':   '服务器错误',

    '10001':   '必须填字段不能为空',
    '10002':   '此昵称已存在',
    '10003':   '用户名或密码错误',
    '10004':   '上传头像失败',
    '10005':   '用户名或密码不能超过12位',
    '10006':   '参数错误',
    '10007':   '姓名不能超过6位',
    '10008':   '性别参数错误',
    '10009':   '年龄必须为数字',
    '10010':   '请求参数超出规定长度',
    /**
     * token相关
     */
    '20000':   '没有token',
    '20001':   'token信息错误',

    /**
     * 微信相关
     */
    '30000': '授权失败'
}

/**
 * 自定义错误返回函数
 */
const resFun = function (res, code) {
    res.json({
        code,
        data: codes[`${code}`]
    })
}

/**
 * 请求成功
 */
const resSuc = function (res, data) {
    res.json({
        code: 0,
        data: data
    })
}

/**
 * 内部错误
 */
const resErr = function (res) {
    res.json({
        code: 12000,
        data: codes[`${code}`]
    })
}

/**
 * 参数为空
 */
const resEmp = function (res) {
    res.json({
        code: 10001,
        data: codes[code]
    })
}
module.exports = {
    resFun,
    resErr,
    resEmp,
    resSuc
};
