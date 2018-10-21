const resFun = function (res, code, data) {
    res.json({
        code,
        data
    })
}

const resErr = function (res) {
    res.json({
        code: 500,
        data: '服务器错误'
    })
}

const resEmp = function (res) {
    res.json({
        code: 200,
        data: '必须填字段不能为空'
    })
}
module.exports = {
    resFun,
    resErr,
    resEmp
};
