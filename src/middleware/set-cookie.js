const setCookie = (res, token) => {
    return res.writeHeader(200,{
        'Set-Cookie': [`token=${token}`]
    });
}

module.exports = setCookie;
