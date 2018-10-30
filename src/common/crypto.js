'use strict';

/**
 * 生成加密后的字符串
 * @param {传入字符串} val 
 */
const myCrypto = function (val) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    return hash.update(val).digest('hex');
};

module.exports = myCrypto;
