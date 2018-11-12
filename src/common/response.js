const codes = {
    '0':       '请求成功',
    '12000':   '服务器错误',
    '10001':   '必须填字段不能为空',
    '10002':   '此昵称已存在',
    '10003':   '用户名或密码错误',
    '10004':   '上传头像失败',

    /**
     * token相关
     */
    '20000':   '没有token',
    '20001':   'token信息错误'
}

/**
 * 自定义错误返回函数
 */
const resFun = function (res, code, data) {
    res.json({
        code,
        data
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
        data: '服务器内部错误'
    })
}

/**
 * 参数为空
 */
const resEmp = function (res) {
    res.json({
        code: 10001,
        data: '必须填字段不能为空'
    })
}
module.exports = {
    resFun,
    resErr,
    resEmp,
    resSuc
};
