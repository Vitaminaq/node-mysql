const resFun = function (res, code, data) {
    res.json({
        code,
        data
    })
}

const resErr = function (res) {
    res.json({
        code: 12000,
        data: '服务器错误'
    })
}

const resEmp = function (res) {
    res.json({
        code: 10001,
        data: '必须填字段不能为空'
    })
}
module.exports = {
    resFun,
    resErr,
    resEmp
};
